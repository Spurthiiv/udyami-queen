const images = import.meta.glob('/src/assets/login-hero.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const path = Object.keys(images)[0];
export const loginHeroImage = path ? images[path] : null;