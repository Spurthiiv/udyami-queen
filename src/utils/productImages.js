const images = import.meta.glob('/src/assets/products/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const productImageMap = {};
for (const path in images) {
  const filename = path.split('/').pop();
  const id = filename.split('.')[0];
  productImageMap[id] = images[path];
}

export function getProductImage(productId) {
  return productImageMap[String(productId)] || null;
}