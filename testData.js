// ============================================================
// testData.js — Centralized test data for all test suites
// Change values here once; all tests pick it up automatically
// ============================================================

export const BASE_URL = 'https://automationteststore.com/';

// --- User credentials ---
export const validUser = {
  loginname: 'littlegaient',
  password: 'hinata',
};

export const invalidUser = {
  loginname: 'wronguser',
  password: 'wrongpass',
};

// --- Registration form data ---
export const newUser = {
  firstname: 'hinata',
  lastname: 'shoyo',
  email: 'hinata@g.com',
  address: 'tokyo, japan',
  city: 'tokyo',
  postcode: '123456',
  countryId: '107',
  zoneId: '1697',
  loginname: 'littlegaint',
  password: 'hinata',
};

// --- Navigation menu items ---
export const navLinks = [
  'Home',
  'Apparel & accessories',
  'Makeup',
  'Skincare',
  'Fragrance',
  'Hair Care',
  'Books',
];

// --- Search terms ---
export const searchTerms = {
  fragrance: 'fragrance',
};

// --- Cart data ---
export const cartData = {
  updatedQuantity: '13',
  cartItemLocatorId: '#cart_quantity51',
};

// --- Expected error messages ---
export const errorMessages = {
  invalidLogin: 'Error: Incorrect login or password provided.',
};