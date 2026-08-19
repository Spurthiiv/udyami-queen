// Detailed Product Details panel data.
// - categoryDefaults: fields that are the same for every product in a category
//   (manufacturer, seller, FSSAI, customer care, etc.) — fill these once per category.
// - productOverrides: fields specific to one product (nutrition values, key features,
//   shelf life, unit) — keyed by product id (matches products.js keys).
//
// Any field left blank/omitted simply won't render in the panel — no "N/A" clutter.
// Add more entries to productOverrides as you get real nutrition data per product.

export const categoryDefaults = {
  pickles: {
    manufacturerName: 'Udyami Queens Producer Collective',
    manufacturerAddress: 'Rajajinagar, Bengaluru - 560010, Karnataka',
    fssaiLicense: '10023045001234',
    customerCareEmail: 'support@udyamiqueens.com',
    countryOfOrigin: 'India',
    returnPolicy:
      'Only replacement of the item is permitted, within 24 hours of delivery, if it is found to be of poor quality, damaged or incorrect.',
    seller: 'Udyami Queens Seller Network',
    sellerFssai: '10023045005678',
  },
  'spice-chutney-powders': {
    manufacturerName: 'Udyami Queens Producer Collective',
    manufacturerAddress: 'Rajajinagar, Bengaluru - 560010, Karnataka',
    fssaiLicense: '10023045001234',
    customerCareEmail: 'support@udyamiqueens.com',
    countryOfOrigin: 'India',
    returnPolicy:
      'Only replacement of the item is permitted, within 24 hours of delivery, if it is found to be of poor quality, damaged or incorrect.',
    seller: 'Udyami Queens Seller Network',
    sellerFssai: '10023045005678',
  },
  'fresh-dairy': {
    manufacturerName: 'Udyami Queens Dairy Collective',
    manufacturerAddress: 'Rajajinagar, Bengaluru - 560010, Karnataka',
    fssaiLicense: '10013043000520',
    customerCareEmail: 'support@udyamiqueens.com',
    countryOfOrigin: 'India',
    returnPolicy:
      'Only replacement of the item is permitted, within 24 hours of delivery, if it is found to be of poor quality, damaged or incorrect. Perishable dairy items must be reported immediately on delivery.',
    seller: 'Udyami Queens Seller Network',
    sellerFssai: '10023045005678',
  },
  'fresh-batters': {
    manufacturerName: 'Udyami Queens Producer Collective',
    manufacturerAddress: 'Rajajinagar, Bengaluru - 560010, Karnataka',
    fssaiLicense: '10013043000520',
    customerCareEmail: 'support@udyamiqueens.com',
    countryOfOrigin: 'India',
    returnPolicy:
      'Only replacement of the item is permitted, within 24 hours of delivery, if it is found to be of poor quality, damaged or incorrect.',
    seller: 'Udyami Queens Seller Network',
    sellerFssai: '10023045005678',
  },
};

// Fallback used for any category not listed above, so the panel still shows
// the common compliance fields instead of nothing.
export const genericDefaults = {
  manufacturerName: 'Udyami Queens Producer Collective',
  manufacturerAddress: 'Rajajinagar, Bengaluru - 560010, Karnataka',
  fssaiLicense: '10023045001234',
  customerCareEmail: 'support@udyamiqueens.com',
  countryOfOrigin: 'India',
  returnPolicy:
    'Only replacement of the item is permitted, within 24 hours of delivery, if it is found to be of poor quality, damaged or incorrect.',
  seller: 'Udyami Queens Seller Network',
  sellerFssai: '10023045005678',
};

// Product-specific fields — add real values here as you collect them per product.
// Leave a field out entirely if it doesn't apply (e.g. pickles won't have Cholesterol).
export const productOverrides = {
  1: {
    // Homemade Mango Pickle (250 g)
    processingType: 'Traditionally Preserved',
    biologicalSource: 'Raw Mango',
    sugarProfile: 'No Added Sugar',
    totalFat: '2 g',
    sodium: '450 mg',
    calories: '90 Kcal',
    serveSize: '20 g',
    keyFeatures:
      'Handpicked raw mangoes, traditional spices, cold-pressed oil, no preservatives',
    unit: '250 g',
    shelfLife: '6 months (unrefrigerated, unopened)',
    disclaimer:
      'Every effort is made to maintain the accuracy of all information. Actual product packaging may vary.',
  },
  32: {
    // Fresh Curd (500 g)
    processingType: 'Pasteurized & Cultured',
    biologicalSource: 'Cow Milk',
    sugarProfile: 'No Added Sugar',
    proteinPer100g: '3.4 g',
    totalCarbsPer100g: '4.7 g',
    totalSugarPer100g: '4.7 g',
    addedSugarsPer100g: '0 g',
    totalFatPer100g: '3.5 g',
    saturatedFatPer100g: '2.2 g',
    unsaturatedFatPer100g: '1.3 g',
    transFatPer100g: '0 g',
    cholesterolPer100g: '10 mg',
    sodiumPer100g: '45 mg',
    calciumPer100g: '0.12 g',
    caloriesPer100g: '61 Kcal',
    serveSize: '100 g',
    keyFeatures: 'Set overnight, thick and creamy, no added preservatives',
    unit: '500 g',
    shelfLife: '24 hrs (refrigerated)',
    disclaimer:
      'Every effort is made to maintain the accuracy of all information. Actual product packaging may vary.',
  },
};

// Merges category defaults + generic fallback + product-specific overrides
// into one object the UI can render from.
export function getProductDetails(product) {
  if (!product) return {};
  const catDefaults = categoryDefaults[product.category] || genericDefaults;
  const overrides = productOverrides[product.id] || {};
  return { ...catDefaults, ...overrides };
}