import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch sales records with filtering, sorting, and pagination
 * @param {Object} params - Query parameters
 * @returns {Promise} - Sales data response
 */
export const fetchSales = async (params = {}) => {
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
    sortBy,
    sortOrder,
    page,
    pageSize,
  } = params;

  // Build query parameters
  const queryParams = {};

  // Add scalar params
  if (search) queryParams.search = search;
  if (ageMin !== undefined) queryParams.ageMin = ageMin;
  if (ageMax !== undefined) queryParams.ageMax = ageMax;
  if (dateFrom) queryParams.dateFrom = dateFrom;
  if (dateTo) queryParams.dateTo = dateTo;
  if (sortBy) queryParams.sortBy = sortBy;
  if (sortOrder) queryParams.sortOrder = sortOrder;
  if (page) queryParams.page = page;
  if (pageSize) queryParams.pageSize = pageSize;

  // Convert arrays to comma-separated strings
  if (regions.length > 0) {
    queryParams.regions = regions.join(',');
  }
  if (genders.length > 0) {
    queryParams.genders = genders.join(',');
  }
  if (productCategories.length > 0) {
    queryParams.productCategories = productCategories.join(',');
  }
  if (tags.length > 0) {
    queryParams.tags = tags.join(',');
  }
  if (paymentMethods.length > 0) {
    queryParams.paymentMethods = paymentMethods.join(',');
  }

  try {
    const response = await api.get('/sales', { params: queryParams });
    return response.data;
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }
};

export default api;
