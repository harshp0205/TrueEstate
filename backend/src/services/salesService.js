import { SaleRecord } from '../models/saleRecord.js';

/**
 * Query sales records with filtering, sorting, and pagination
 * @param {Object} options - Query options
 * @returns {Promise<Object>} - Paginated sales results
 */
export async function querySales(options = {}) {
  const {
    search,
    regions = [],
    genders = [],
    ageMin,
    ageMax,
    productCategories = [],
    tags = [],
    paymentMethods = [],
    dateFrom,
    dateTo,
    sortBy = 'date',
    sortOrder = 'desc',
    page = 1,
    pageSize = 10
  } = options;

  // Check for invalid age range
  if (ageMin !== undefined && ageMax !== undefined && ageMin > ageMax) {
    return {
      items: [],
      page: 1,
      pageSize,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
      invalidRange: true
    };
  }

  // Build filter object
  const filter = {};

  // Search filter (customer name or phone number)
  if (search) {
    filter.$or = [
      { customerName: { $regex: search, $options: 'i' } },
      { phoneNumber: { $regex: search, $options: 'i' } }
    ];
  }

  // Region filter
  if (regions.length > 0) {
    filter.customerRegion = { $in: regions };
  }

  // Gender filter
  if (genders.length > 0) {
    filter.gender = { $in: genders };
  }

  // Age range filter
  if (ageMin !== undefined || ageMax !== undefined) {
    filter.age = {};
    if (ageMin !== undefined) {
      filter.age.$gte = ageMin;
    }
    if (ageMax !== undefined) {
      filter.age.$lte = ageMax;
    }
  }

  // Product category filter
  if (productCategories.length > 0) {
    filter.productCategory = { $in: productCategories };
  }

  // Tags filter (matches if any selected tag exists)
  if (tags.length > 0) {
    filter.tags = { $in: tags };
  }

  // Payment method filter
  if (paymentMethods.length > 0) {
    filter.paymentMethod = { $in: paymentMethods };
  }

  // Date range filter
  if (dateFrom || dateTo) {
    filter.date = {};
    if (dateFrom) {
      filter.date.$gte = new Date(dateFrom);
    }
    if (dateTo) {
      filter.date.$lte = new Date(dateTo);
    }
  }

  // Build sort object
  const sort = {};
  const order = sortOrder === 'asc' ? 1 : -1;
  
  switch (sortBy) {
    case 'quantity':
      sort.quantity = order;
      break;
    case 'customerName':
      sort.customerName = order;
      break;
    case 'date':
    default:
      sort.date = order;
      break;
  }

  // Pagination
  const pageNum = Math.max(1, parseInt(page) || 1);
  const limit = Math.max(1, parseInt(pageSize) || 10);
  const skip = (pageNum - 1) * limit;

  // Execute query
  const [items, totalItems] = await Promise.all([
    SaleRecord.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    SaleRecord.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  return {
    items,
    page: pageNum,
    pageSize: limit,
    totalItems,
    totalPages,
    hasNextPage: pageNum < totalPages,
    hasPrevPage: pageNum > 1
  };
}
