const PRODUCTS = [
  {
    id: 'anillo-aurora',
    nombre: 'Anillo Aurora',
    slug: 'anillo-aurora',
    categoria: 'Anillos',
    material: 'Oro',
    precio: 450,
    rating: 4.8,
    nuevo: true,
    stock: 12,
    talla: '6-8',
    peso: '4 g',
    descripcion: 'Anillo en oro amarillo de 18k con incrustaciones de brillantes corte baguette.',
    imagenes: [
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80',
      'assets/img/products/product-2.jpg',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
    ],
    imageKeyword: 'anillo oro brillante'
  },
  {
    id: 'anillo-solstice',
    nombre: 'Anillo Solstice',
    slug: 'anillo-solstice',
    categoria: 'Anillos',
    material: 'Plata',
    precio: 180,
    rating: 4.6,
    nuevo: false,
    stock: 20,
    talla: '5-9',
    peso: '3 g',
    descripcion: 'Plata 925 con baño de rodio y circonias de alto brillo en patrón envolvente.',
    imagenes: [
      'assets/img/products/product-2.jpg',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80',
      'assets/img/products/product-4.jpg'
    ],
    imageKeyword: 'anillo plata minimalista'
  },
  {
    id: 'collar-constella',
    nombre: 'Collar Constella',
    slug: 'collar-constella',
    categoria: 'Collares',
    material: 'Oro',
    precio: 620,
    rating: 4.9,
    nuevo: true,
    stock: 8,
    talla: '45 cm',
    peso: '12 g',
    descripcion: 'Collar de oro amarillo de 18k con dije central inspirado en constelaciones.',
    imagenes: [
      'https://images.unsplash.com/photo-1518544801976-3e159e6abb92?auto=format&fit=crop&w=800&q=80',
      'assets/img/products/product-4.jpg',
      'assets/img/products/product-5.jpg'
    ],
    imageKeyword: 'collar oro constelacion'
  },
  {
    id: 'collar-luna-nova',
    nombre: 'Collar Luna Nova',
    slug: 'collar-luna-nova',
    categoria: 'Collares',
    material: 'Plata',
    precio: 260,
    rating: 4.7,
    nuevo: false,
    stock: 16,
    talla: '42 cm',
    peso: '9 g',
    descripcion: 'Collar de plata 925 con baño de rodio y dije de madreperla tallada.',
    imagenes: [
      'assets/img/products/product-4.jpg',
      'assets/img/products/product-5.jpg',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
    ],
    imageKeyword: 'collar plata madreperla'
  },
  {
    id: 'aretes-aurum',
    nombre: 'Aretes Aurum',
    slug: 'aretes-aurum',
    categoria: 'Aretes',
    material: 'Oro',
    precio: 340,
    rating: 4.5,
    nuevo: false,
    stock: 24,
    talla: '2 cm',
    peso: '6 g',
    descripcion: 'Aretes tipo aro en oro amarillo con textura martillada de acabado espejo.',
    imagenes: [
      'assets/img/products/product-5.jpg',
      'assets/img/products/product-6.jpg',
      'assets/img/products/product-1.jpg'
    ]
  },
  {
    id: 'aretes-nebula',
    nombre: 'Aretes Nebula',
    slug: 'aretes-nebula',
    categoria: 'Aretes',
    material: 'Plata',
    precio: 150,
    rating: 4.4,
    nuevo: true,
    stock: 30,
    talla: '3 cm',
    peso: '5 g',
    descripcion: 'Aretes colgantes en plata 925 con cristales flotantes en degradé.',
    imagenes: [
      'assets/img/products/product-6.jpg',
      'assets/img/products/product-1.jpg',
      'assets/img/products/product-2.jpg'
    ]
  },
  {
    id: 'pulsera-eden',
    nombre: 'Pulsera Eden',
    slug: 'pulsera-eden',
    categoria: 'Pulseras',
    material: 'Oro',
    precio: 520,
    rating: 4.8,
    nuevo: false,
    stock: 10,
    talla: '18 cm',
    peso: '14 g',
    descripcion: 'Pulsera articulada en oro amarillo con eslabones geométricos pulidos.',
    imagenes: [
      'assets/img/products/product-1.jpg',
      'assets/img/products/product-3.jpg',
      'assets/img/products/product-5.jpg'
    ]
  },
  {
    id: 'pulsera-luz',
    nombre: 'Pulsera Luz',
    slug: 'pulsera-luz',
    categoria: 'Pulseras',
    material: 'Plata',
    precio: 210,
    rating: 4.5,
    nuevo: false,
    stock: 18,
    talla: '19 cm',
    peso: '11 g',
    descripcion: 'Pulsera de plata 925 con baño de rodio y charms intercambiables.',
    imagenes: [
      'assets/img/products/product-2.jpg',
      'assets/img/products/product-4.jpg',
      'assets/img/products/product-6.jpg'
    ]
  },
  {
    id: 'anillo-aurora-rosa',
    nombre: 'Anillo Aurora Rosa',
    slug: 'anillo-aurora-rosa',
    categoria: 'Anillos',
    material: 'Oro Rosa',
    precio: 490,
    rating: 4.9,
    nuevo: true,
    stock: 9,
    talla: '6-7',
    peso: '4 g',
    descripcion: 'Oro rosa de 18k con diamantes champagne y banda ergonómica.',
    imagenes: [
      'assets/img/products/product-3.jpg',
      'assets/img/products/product-4.jpg',
      'assets/img/products/product-5.jpg'
    ]
  },
  {
    id: 'collar-helia',
    nombre: 'Collar Helia',
    slug: 'collar-helia',
    categoria: 'Collares',
    material: 'Acero',
    precio: 130,
    rating: 4.3,
    nuevo: false,
    stock: 25,
    talla: '50 cm',
    peso: '16 g',
    descripcion: 'Acero quirúrgico hipoalergénico con baño en oro rosa y dije solar.',
    imagenes: [
      'assets/img/products/product-4.jpg',
      'assets/img/products/product-5.jpg',
      'assets/img/products/product-6.jpg'
    ]
  },
  {
    id: 'aretes-zenit',
    nombre: 'Aretes Zénit',
    slug: 'aretes-zenit',
    categoria: 'Aretes',
    material: 'Acero',
    precio: 95,
    rating: 4.2,
    nuevo: false,
    stock: 40,
    talla: '1.5 cm',
    peso: '4 g',
    descripcion: 'Mini aros en acero quirúrgico con baño en oro amarillo y cierre seguro.',
    imagenes: [
      'assets/img/products/product-5.jpg',
      'assets/img/products/product-6.jpg',
      'assets/img/products/product-1.jpg'
    ]
  },
  {
    id: 'pulsera-orbita',
    nombre: 'Pulsera Órbita',
    slug: 'pulsera-orbita',
    categoria: 'Pulseras',
    material: 'Acero',
    precio: 160,
    rating: 4.4,
    nuevo: true,
    stock: 22,
    talla: '20 cm',
    peso: '13 g',
    descripcion: 'Pulsera en acero con esferas flotantes y baño en oro blanco.',
    imagenes: [
      'assets/img/products/product-6.jpg',
      'assets/img/products/product-1.jpg',
      'assets/img/products/product-2.jpg'
    ]
  }
];

const BRAND_CONFIG = {
  BRAND_NAME: 'JF Joyas',
  TAGLINE: 'Elegancia que perdura',
  CURRENCY: 'USD',
  PHONE_WHATSAPP: '+593 99 999 9999',
  EMAIL: 'ventas@jfjoyas.com'
};
