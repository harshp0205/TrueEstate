import mongoose from 'mongoose';

const saleRecordSchema = new mongoose.Schema({
  // Customer fields
  customerId: { type: String },
  customerName: { type: String },
  phoneNumber: { type: String },
  gender: { type: String },
  age: { type: Number },
  customerRegion: { type: String },
  customerType: { type: String },
  
  // Product fields
  productId: { type: String },
  productName: { type: String },
  brand: { type: String },
  productCategory: { type: String },
  tags: [{ type: String }],
  
  // Sales fields
  quantity: { type: Number },
  pricePerUnit: { type: Number },
  discountPercentage: { type: Number },
  totalAmount: { type: Number },
  finalAmount: { type: Number },
  
  // Operational fields
  date: { type: Date },
  paymentMethod: { type: String },
  orderStatus: { type: String },
  deliveryType: { type: String },
  storeId: { type: String },
  storeLocation: { type: String },
  salespersonId: { type: String },
  employeeName: { type: String }
}, {
  timestamps: true,
  collection: 'salerecords' // Explicitly set collection name
});

// Indexes
saleRecordSchema.index({ date: -1 });
saleRecordSchema.index({ customerName: 1 });
saleRecordSchema.index({ customerRegion: 1 });
saleRecordSchema.index({ productCategory: 1 });

export const SaleRecord = mongoose.model('SaleRecord', saleRecordSchema);
