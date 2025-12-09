import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the SaleRecord model
import { SaleRecord } from '../src/models/saleRecord.js';

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/truestate';
const CSV_FILE_PATH = path.join(__dirname, '../data/truestate_assignment_dataset.csv');
const BATCH_SIZE = 1000; // Import in batches to avoid memory issues

/**
 * Parse CSV date format to JavaScript Date
 * Handles formats like "DD-MM-YYYY" or "DD/MM/YYYY"
 */
function parseDate(dateString) {
  if (!dateString) return null;
  
  const parts = dateString.split(/[-\/]/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  
  return new Date(dateString);
}

/**
 * Parse tags from string to array
 */
function parseTags(tagsString) {
  if (!tagsString) return [];
  return tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
}

/**
 * Parse numeric value safely
 */
function parseNumber(value) {
  if (value === undefined || value === null || value === '') return undefined;
  const num = parseFloat(value);
  return isNaN(num) ? undefined : num;
}

/**
 * Parse integer value safely
 */
function parseInt(value) {
  if (value === undefined || value === null || value === '') return undefined;
  const num = Number.parseInt(value, 10);
  return isNaN(num) ? undefined : num;
}

/**
 * Transform CSV row to match SaleRecord schema
 */
function transformRow(row) {
  return {
    transactionId: row.transaction_id || row.TransactionID,
    date: parseDate(row.date || row.Date),
    customerId: row.customer_id || row.CustomerID,
    customerName: row.customer_name || row.CustomerName,
    phoneNumber: row.phone_number || row.PhoneNumber,
    gender: row.gender || row.Gender,
    age: parseInt(row.age || row.Age),
    customerRegion: row.customer_region || row.CustomerRegion,
    productId: row.product_id || row.ProductID,
    productCategory: row.product_category || row.ProductCategory,
    productBrand: row.product_brand || row.ProductBrand,
    productName: row.product_name || row.ProductName,
    quantity: parseInt(row.quantity || row.Quantity),
    unitPrice: parseNumber(row.unit_price || row.UnitPrice),
    totalAmount: parseNumber(row.total_amount || row.TotalAmount),
    discountPercentage: parseNumber(row.discount_percentage || row.DiscountPercentage),
    finalAmount: parseNumber(row.final_amount || row.FinalAmount),
    paymentMethod: row.payment_method || row.PaymentMethod,
    transactionStatus: row.transaction_status || row.TransactionStatus,
    shippingAddress: row.shipping_address || row.ShippingAddress,
    deliveryStatus: row.delivery_status || row.DeliveryStatus,
    tags: parseTags(row.tags || row.Tags),
    employeeId: row.employee_id || row.EmployeeID,
    employeeName: row.employee_name || row.EmployeeName,
    storeLocation: row.store_location || row.StoreLocation,
    loyaltyPoints: parseInt(row.loyalty_points || row.LoyaltyPoints),
    feedback: row.feedback || row.Feedback,
    rating: parseNumber(row.rating || row.Rating)
  };
}

/**
 * Import CSV data to MongoDB
 */
async function importCSV() {
  console.log('🚀 Starting CSV import...');
  console.log(`📁 CSV File: ${CSV_FILE_PATH}`);
  console.log(`🗄️  MongoDB URI: ${MONGODB_URI}`);

  try {
    // Connect to MongoDB
    console.log('\n📡 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI, {
      dbName: 'truestate'
    });
    console.log('✅ Connected to MongoDB Atlas - Database: truestate');

    // Check if collection already has data
    const existingCount = await SaleRecord.countDocuments();
    if (existingCount > 0) {
      console.log(`\n⚠️  Warning: Collection already has ${existingCount} records`);
      console.log('Do you want to clear existing data? (Press Ctrl+C to cancel)');
      
      // Wait 5 seconds before proceeding
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      console.log('🗑️  Clearing existing data...');
      await SaleRecord.deleteMany({});
      console.log('✅ Existing data cleared');
    }

    // Read and parse CSV file
    console.log('\n📖 Reading CSV file...');
    
    let totalProcessed = 0;
    let totalImported = 0;
    let errors = 0;

    return new Promise((resolve, reject) => {
      const records = [];
      const pendingWrites = [];

      const stream = fs.createReadStream(CSV_FILE_PATH).pipe(csv());

      stream.on('data', (row) => {
        try {
          const record = transformRow(row);
          records.push(record);
          totalProcessed++;

          // Import in batches
          if (records.length >= BATCH_SIZE) {
            const batch = [...records];
            records.length = 0; // Clear array
            
            // Create promise for this batch
            const writePromise = SaleRecord.insertMany(batch, { ordered: false })
              .then(() => {
                totalImported += batch.length;
                console.log(`✨ Imported ${totalImported} records...`);
              })
              .catch((err) => {
                // Handle duplicate key errors
                if (err.writeErrors) {
                  totalImported += (batch.length - err.writeErrors.length);
                  errors += err.writeErrors.length;
                  console.log(`⚠️  ${err.writeErrors.length} duplicate/error records skipped`);
                } else {
                  console.error(`❌ Batch import error: ${err.message}`);
                  errors += batch.length;
                }
              });
            
            pendingWrites.push(writePromise);
          }
        } catch (err) {
          errors++;
          console.error(`❌ Error processing row: ${err.message}`);
        }
      });

      stream.on('end', async () => {
        try {
          // Wait for all pending writes to complete
          console.log('\n⏳ Waiting for pending writes to complete...');
          await Promise.all(pendingWrites);
          
          // Import remaining records
          if (records.length > 0) {
            console.log(`\n📝 Importing final ${records.length} records...`);
            try {
              await SaleRecord.insertMany(records, { ordered: false });
              totalImported += records.length;
            } catch (err) {
              if (err.writeErrors) {
                totalImported += (records.length - err.writeErrors.length);
                errors += err.writeErrors.length;
              }
            }
          }

          console.log('\n✅ CSV import completed!');
          console.log(`📊 Statistics:`);
          console.log(`   Total rows processed: ${totalProcessed}`);
          console.log(`   Successfully imported: ${totalImported}`);
          console.log(`   Errors/Duplicates: ${errors}`);
          
          resolve();
        } catch (error) {
          reject(error);
        }
      });      stream.on('error', (error) => {
          console.error('❌ Error reading CSV file:', error);
          reject(error);
        });
    });

  } catch (error) {
    console.error('❌ Import failed:', error);
    throw error;
  } finally {
    // Close MongoDB connection
    await mongoose.connection.close();
    console.log('\n👋 MongoDB connection closed');
  }
}

// Run import
importCSV()
  .then(() => {
    console.log('\n🎉 Import process finished successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Import process failed:', error);
    process.exit(1);
  });
