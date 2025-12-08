import { querySales } from '../services/salesService.js';

/**
 * Parse comma-separated query parameter into array
 * @param {string} param - Query parameter value
 * @returns {Array} - Parsed array
 */
const parseArrayParam = (param) => {
  if (!param) return [];
  return param.split(',').map(item => item.trim()).filter(Boolean);
};

/**
 * GET /api/sales - Query sales records
 */
export const getSales = async (req, res) => {
  try {
    const {
      search,
      regions,
      genders,
      productCategories,
      tags,
      paymentMethods,
      ageMin,
      ageMax,
      dateFrom,
      dateTo,
      sortBy,
      sortOrder,
      page,
      pageSize
    } = req.query;

    const options = {
      search,
      regions: parseArrayParam(regions),
      genders: parseArrayParam(genders),
      productCategories: parseArrayParam(productCategories),
      tags: parseArrayParam(tags),
      paymentMethods: parseArrayParam(paymentMethods),
      ageMin: ageMin ? parseInt(ageMin) : undefined,
      ageMax: ageMax ? parseInt(ageMax) : undefined,
      dateFrom,
      dateTo,
      sortBy,
      sortOrder,
      page: page ? parseInt(page) : undefined,
      pageSize: pageSize ? parseInt(pageSize) : undefined
    };

    const result = await querySales(options);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getSales:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
