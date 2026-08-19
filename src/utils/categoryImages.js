// Eagerly imports every image found in src/assets/categories/
// Falls back to the colored circle if a category has no image yet.
const images = import.meta.glob('/src/assets/categories/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const categoryImageMap = {};
for (const path in images) {
  const filename = path.split('/').pop(); // "pickles.jpg"
  const slug = filename.split('.')[0]; // "pickles"
  categoryImageMap[slug] = images[path];
}

export function getCategoryImage(slug) {
  return categoryImageMap[slug] || null;
}