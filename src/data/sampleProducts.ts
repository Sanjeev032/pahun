export type SampleProduct = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description: string;
};

export const sampleProducts: SampleProduct[] = [
  {
    id: 'premium-tshirt-01',
    name: 'Premium Organic Cotton T‑Shirt',
    price: 2499,
    category: 'men',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=900',
    rating: 4.8,
    description:
      'Tailored crew‑neck tee in ultra‑soft organic cotton with a clean, minimal silhouette designed for everyday luxury.',
  },
  {
    id: 'oversized-hoodie-01',
    name: 'Oversized Fleece Hoodie',
    price: 4499,
    category: 'women',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=900',
    rating: 4.9,
    description:
      'Relaxed oversized hoodie in brushed fleece with extended sleeves and tonal drawcords for a cocooned streetwear look.',
  },
  {
    id: 'street-jacket-01',
    name: 'Technical Streetwear Jacket',
    price: 6999,
    category: 'men',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=900',
    rating: 4.7,
    description:
      'Lightweight technical jacket with matte finish hardware, structured shoulders and articulated sleeves for elevated motion.',
  },
  {
    id: 'cargo-pants-01',
    name: 'Tapered Cargo Pants',
    price: 3999,
    category: 'unisex',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=900',
    rating: 4.6,
    description:
      'Slim‑tapered cargo trousers with utility pockets, clean seams and a soft brushed handfeel for all‑day wear.',
  },
  {
    id: 'lux-sweatshirt-01',
    name: 'Luxury Loopback Sweatshirt',
    price: 3799,
    category: 'unisex',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=900',
    rating: 4.9,
    description:
      'Loopback terry sweatshirt with refined rib trims, dropped shoulders and a subtle embroidered monogram.',
  },
];

