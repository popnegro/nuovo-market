export interface Category {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  accent: 'orange' | 'teal' | 'green' | 'red' | 'blue' | 'amber' | 'violet' | 'pink';
  icon: string;
  merchantCount: number;
  popularItems: string[];
}

export interface Store {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  description: string;
  tagline: string;
  address: string;
  zone: string;
  hours: string;
  phone: string;
  wa: string;
  accent: 'orange' | 'teal' | 'green' | 'red' | 'blue' | 'amber' | 'violet' | 'pink';
  isHighlighted?: boolean;
  path: string;
  productsSummary: string;
  promos?: string[];
  badges: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  inStock: boolean;
  tag?: string;
}

export type Product = ProductItem;
export type Comercio = Store;

export const CATEGORIES: Category[] = [
  {
    slug: 'kioscos',
    name: 'Kioscos',
    shortName: 'Kioscos',
    description: 'Bebidas frías, snacks, golosinas, cigarrillos, recargas y compras rápidas al paso.',
    accent: 'orange',
    icon: 'Store',
    merchantCount: 14,
    popularItems: ['Bebidas frías', 'Golosinas', 'Snacks', 'Cigarrillos']
  },
  {
    slug: 'minimercados',
    name: 'Minimercados',
    shortName: 'Minimercados',
    description: 'Almacén de barrio, lácteos, fiambres, panificados y productos de limpieza.',
    accent: 'teal',
    icon: 'ShoppingBag',
    merchantCount: 9,
    popularItems: ['Lácteos', 'Almacén', 'Bebidas', 'Limpieza']
  },
  {
    slug: 'verdulerias',
    name: 'Verdulerías',
    shortName: 'Verdulerías',
    description: 'Frutas y verduras frescas de estación, bolsones económicos y hortalizas de Mendoza.',
    accent: 'green',
    icon: 'Apple',
    merchantCount: 11,
    popularItems: ['Bolsones familiares', 'Paltas', 'Tomates', 'Cítricos']
  },
  {
    slug: 'carnicerias',
    name: 'Carnicerías',
    shortName: 'Carnicerías',
    description: 'Cortes vacunos de primera calidad, combos para el asado mendocino, pollo y cerdo.',
    accent: 'red',
    icon: 'Beef',
    merchantCount: 8,
    popularItems: ['Combo Asado', 'Vacío', 'Costillares', 'Chorizo artesanal']
  },
  {
    slug: 'peluquerias-barberias',
    name: 'Peluquerías & Barberías',
    shortName: 'Peluquerías & Barberías',
    description: 'Cortes modernos y tradicionales, perfilado de barba y reserva de turnos por WhatsApp.',
    accent: 'blue',
    icon: 'Scissors',
    merchantCount: 12,
    popularItems: ['Fade & Degradé', 'Barba y Toalla', 'Corte Clásico', 'Cera y Pomadas']
  },
  {
    slug: 'ferreterias',
    name: 'Ferreterías',
    shortName: 'Ferreterías',
    description: 'Herramientas manuales y eléctricas, tornillería, plomería, electricidad y urgencias.',
    accent: 'amber',
    icon: 'Wrench',
    merchantCount: 7,
    popularItems: ['Herramientas', 'Cerrajería', 'Pinturas', 'Adhesivos']
  },
  {
    slug: 'petshops',
    name: 'PetShops',
    shortName: 'PetShops',
    description: 'Alimentos balanceados de primeras marcas, accesorios, golosinas caninas y antiparasitarios.',
    accent: 'violet',
    icon: 'Dog',
    merchantCount: 6,
    popularItems: ['Alimento balanceado', 'Pipetas', 'Juguetes', 'Comederos']
  },
  {
    slug: 'sexshops',
    name: 'Sexshops',
    shortName: 'Sexshops',
    description: 'Boutique para adultos, bienestar íntimo, cosmética sensual y envíos en paquetes 100% discretos.',
    accent: 'pink',
    icon: 'Heart',
    merchantCount: 5,
    popularItems: ['Cosmética íntima', 'Aceites de masaje', 'Lencería', 'Bienestar']
  }
];

export const MENDOZA_ZONES = [
  'Todas las zonas',
  'Ciudad de Mendoza',
  'Godoy Cruz',
  'Guaymallén',
  'Las Heras',
  'Luján de Cuyo',
  'Maipú',
  'Quinta Sección',
  'Sexta Sección',
  'Barrio Bombal'
];

export const FEATURED_STORES: Store[] = [
  {
    id: 'nuovo-market',
    slug: 'nuovo-market',
    name: 'Nuovo Market',
    categorySlug: 'kioscos',
    categoryName: 'Kiosco',
    description: 'Kiosco de barrio tradicional con catálogo completo en línea, bebidas al paso y pedidos express por WhatsApp.',
    tagline: 'Todo para tu pausa diaria, abierto hasta la medianoche en Ciudad de Mendoza.',
    address: 'Av. Las Heras 742, Ciudad, Mendoza',
    zone: 'Ciudad de Mendoza',
    hours: '08:00–23:30 hs (Lunes a Domingos)',
    phone: '261 555 1040',
    wa: '5492615551040',
    accent: 'orange',
    isHighlighted: true,
    path: '/kioscos/nuovo-market',
    productsSummary: 'Gaseosas frías, energizantes, alfajores artesanales, snacks, cigarrillos y golosinas.',
    promos: ['Combo 2 gaseosas 500ml + snack a precio especial'],
    badges: ['Comercio Verificado', 'Atención por WhatsApp', 'Catálogo Digital']
  },
  {
    id: 'mini-mercado-san-juan',
    slug: 'mini-mercado-san-juan',
    name: 'Mini Mercado San Juan',
    categorySlug: 'minimercados',
    categoryName: 'Minimercado',
    description: 'Compras del día cerca de tu casa. Variedad en lácteos, fiambres al peso, almacén y bebidas.',
    tagline: 'Almacén completo y envíos sin cargo en compras mayores a $18.000.',
    address: 'San Juan 1350, Ciudad, Mendoza',
    zone: 'Ciudad de Mendoza',
    hours: '07:30–22:30 hs',
    phone: '261 555 8855',
    wa: '5492615558855',
    accent: 'teal',
    isHighlighted: true,
    path: '/minimercados',
    productsSummary: 'Lácteos, embutidos, panificados del día, bebidas y artículos de limpieza.',
    promos: ['Envío gratis hasta 3 km en pedidos por WhatsApp'],
    badges: ['Verificado', 'Delivery Propio', 'Atención Local']
  },
  {
    id: 'verduleria-don-pedro',
    slug: 'verduleria-don-pedro',
    name: 'Verdulería Don Pedro',
    categorySlug: 'verdulerias',
    categoryName: 'Verdulería',
    description: 'Frutas y verduras seleccionadas del Mercado Cooperativo de Guaymallén. Calidad y frescura garantizada.',
    tagline: 'Bolsones familiares de 6kg con variedad de verduras y frutas de estación.',
    address: 'Arístides Villanueva 420, Quinta Sección, Mendoza',
    zone: 'Quinta Sección',
    hours: '08:00–20:30 hs',
    phone: '261 555 3110',
    wa: '5492615553110',
    accent: 'green',
    isHighlighted: true,
    path: '/verdulerias',
    productsSummary: 'Paltas Hass, tomates perita, cítricos del litoral, bolsones y aromáticas frescas.',
    promos: ['Bolsón familiar 6kg: $12.500'],
    badges: ['Directo del Productor', 'Frutas Seleccionadas']
  },
  {
    id: 'carniceria-la-cabana',
    slug: 'carniceria-la-cabana',
    name: 'Carnicería La Cabaña',
    categorySlug: 'carnicerias',
    categoryName: 'Carnicería',
    description: 'Cortes vacunos de novillo de primera calidad, cerdo seleccionado y combos listos para la parrilla.',
    tagline: 'El mejor asado de Godoy Cruz con asesoramiento personalizado.',
    address: 'Belgrano 1120, Godoy Cruz, Mendoza',
    zone: 'Godoy Cruz',
    hours: '08:30–13:30 / 17:00–21:00 hs',
    phone: '261 555 7820',
    wa: '5492615557820',
    accent: 'red',
    isHighlighted: true,
    path: '/carnicerias',
    productsSummary: 'Vacío, costillar, colita de cuadril, chorizos caseros y matambre tiernizado.',
    promos: ['Combo Asado para 4 personas con carbón de regalo'],
    badges: ['Carne Certificada', 'Especialistas en Asado']
  },
  {
    id: 'barberia-co-mendoza',
    slug: 'barberia-co-mendoza',
    name: 'Barbería & Co. Mendoza',
    categorySlug: 'peluquerias-barberias',
    categoryName: 'Peluquería & Barbería',
    description: 'Espacio especializado en cortes masculinos contemporáneos, diseño de barba y tratamiento capilar.',
    tagline: 'Atención con turno programado por WhatsApp para no hacer fila.',
    address: 'Sarmiento 350, Ciudad, Mendoza',
    zone: 'Ciudad de Mendoza',
    hours: '10:00–20:00 hs (Martes a Sábado)',
    phone: '261 555 9400',
    wa: '5492615559400',
    accent: 'blue',
    isHighlighted: true,
    path: '/peluquerias-barberias',
    productsSummary: 'Corte fade, corte clásico a tijera, arreglo de barba con toalla caliente, pomadas mate.',
    promos: ['20% OFF en combo corte + barba los miércoles'],
    badges: ['Turnos por WhatsApp', 'Profesionales Certificados']
  },
  {
    id: 'ferreteria-el-andino',
    slug: 'ferreteria-el-andino',
    name: 'Ferretería El Andino',
    categorySlug: 'ferreterias',
    categoryName: 'Ferretería',
    description: 'Soluciones inmediatas para reparaciones del hogar, plomería, electricidad, pintura y obra menor.',
    tagline: 'Más de 30 años acompañando a los vecinos de Mendoza con el mejor asesoramiento técnico.',
    address: 'Belgrano 1635, Ciudad, Mendoza',
    zone: 'Ciudad de Mendoza',
    hours: '08:00–19:30 hs (Sábados mediodía)',
    phone: '261 555 6633',
    wa: '5492615556633',
    accent: 'amber',
    isHighlighted: true,
    path: '/ferreterias',
    productsSummary: 'Herramientas manuales, siliconas, canillas, lámparas LED, tornillos y fijaciones.',
    promos: ['Consulta por compatibilidad de repuestos vía WhatsApp con foto'],
    badges: ['Asesoramiento Técnico', 'Amplio Stock']
  },
  {
    id: 'patitas-petshop',
    slug: 'patitas-petshop',
    name: 'Patitas PetShop',
    categorySlug: 'petshops',
    categoryName: 'PetShop',
    description: 'Todo para tus mascotas: alimentos balanceados súper premium, golosinas, accesorios y farmacia veterinaria.',
    tagline: 'Delivery express de bolsas de alimento balanceado en toda el área metropolitana.',
    address: 'España 890, Ciudad, Mendoza',
    zone: 'Ciudad de Mendoza',
    hours: '09:00–20:00 hs',
    phone: '261 555 4520',
    wa: '5492615554520',
    accent: 'violet',
    isHighlighted: true,
    path: '/petshops',
    productsSummary: 'Royal Canin, Pro Plan, Sieger, pipetas antipulgas, collares reflectivos y juguetes.',
    promos: ['Envío gratis de bolsas de 15kg o más en Ciudad y Godoy Cruz'],
    badges: ['Envíos a Domicilio', 'Marcas Oficiales']
  },
  {
    id: 'intimo-boutique',
    slug: 'intimo-boutique',
    name: 'Íntimo Boutique',
    categorySlug: 'sexshops',
    categoryName: 'Sexshop',
    description: 'Tienda de bienestar y placer con asesoría profesional, productos certificados y entregas discretas.',
    tagline: 'Envíos en caja sellada sin inscripciones para tu total privacidad y comodidad.',
    address: 'San Martín 1540, Ciudad, Mendoza',
    zone: 'Ciudad de Mendoza',
    hours: '10:00–21:00 hs',
    phone: '261 555 6200',
    wa: '5492615556200',
    accent: 'pink',
    isHighlighted: true,
    path: '/sexshops',
    productsSummary: 'Aceites para masajes sensoriales, cosmética íntima, lencería y productos de bienestar.',
    promos: ['Empaque 100% neutro y seguro en todos los pedidos'],
    badges: ['Empaque 100% Discreto', 'Asesoramiento Privado']
  },
  {
    id: 'kiosco-el-triangulo-las-heras',
    slug: 'kiosco-el-triangulo-las-heras',
    name: 'Kiosco El Triángulo',
    categorySlug: 'kioscos',
    categoryName: 'Kiosco',
    description: 'Bebidas frías, cigarrillos, golosinas, recargas SUBE y snacks en Las Heras.',
    tagline: 'Tu kiosco de paso rápido y atención amigable en Las Heras.',
    address: 'San Miguel 1420, Las Heras, Mendoza',
    zone: 'Las Heras',
    hours: '08:00–23:00 hs',
    phone: '261 555 4220',
    wa: '5492615554220',
    accent: 'orange',
    isHighlighted: true,
    path: '/kioscos/nuovo-market',
    productsSummary: 'Gaseosas frías, alfajores mendocinos, cigarrillos, snacks y golosinas.',
    promos: ['2 alfajores + gaseosa 500ml con descuento'],
    badges: ['Comercio Verificado', 'Atención por WhatsApp']
  },
  {
    id: 'minimercado-maipu-centro',
    slug: 'minimercado-maipu-centro',
    name: 'Minimercado Maipú Centro',
    categorySlug: 'minimercados',
    categoryName: 'Minimercado',
    description: 'Almacén completo, fiambres al peso, lácteos, panadería y bebidas en el centro de Maipú.',
    tagline: 'Todo para tu despensa diaria a pasos de la plaza departamental de Maipú.',
    address: 'Pescara 340, Maipú, Mendoza',
    zone: 'Maipú',
    hours: '08:00–21:30 hs',
    phone: '261 555 5810',
    wa: '5492615555810',
    accent: 'teal',
    isHighlighted: true,
    path: '/minimercados',
    productsSummary: 'Lácteos, fiambres, artículos de almacén, bebidas y pan fresco.',
    promos: ['Envío a domicilio en Maipú centro sin cargo'],
    badges: ['Comercio Verificado', 'Atención Local']
  }
];

export const NUOVO_MARKET_PRODUCTS: ProductItem[] = [
  { id: 'p1', name: 'Coca-Cola 500ml', category: 'Bebidas', price: 1800, description: 'Sabor original, fría al instante.', inStock: true, tag: 'Más vendido' },
  { id: 'p2', name: 'Agua Mineral Villavicencio 500ml', category: 'Bebidas', price: 1200, description: 'Sin gas, directo de los Andes.', inStock: true },
  { id: 'p3', name: 'Monster Energy 473ml', category: 'Bebidas', price: 2900, description: 'Lata verde tradicional ultra fría.', inStock: true, tag: 'Promo' },
  { id: 'p4', name: 'Cerveza Andes Origen Rubia 473ml', category: 'Bebidas', price: 2400, description: 'Cerveza mendocina clásica.', inStock: true },
  { id: 'p5', name: 'Papas Lays Clásicas 85g', category: 'Snacks', price: 2100, description: 'Papas fritas crujientes con sal.', inStock: true },
  { id: 'p6', name: 'Doritos Queso 90g', category: 'Snacks', price: 2300, description: 'Tortillas de maíz con sabor a queso.', inStock: true },
  { id: 'p7', name: 'Mani Salado Pehuamar 120g', category: 'Snacks', price: 1500, description: 'Maní tostado seleccionado.', inStock: true },
  { id: 'p8', name: 'Alfajor Havanna 70% Cacao', category: 'Golosinas', price: 2400, description: 'Alfajor relleno con dulce de leche bañado en chocolate amargo.', inStock: true, tag: 'Destacado' },
  { id: 'p9', name: 'Alfajor Guaymallén Blanco', category: 'Golosinas', price: 800, description: 'El clásico argentino de todos los días.', inStock: true },
  { id: 'p10', name: 'Chocolate Cofler Block 110g', category: 'Golosinas', price: 2800, description: 'Chocolate con leche con maní entero.', inStock: true },
  { id: 'p11', name: 'Chicles Beldent Menta', category: 'Golosinas', price: 900, description: 'Pack de 10 unidades sin azúcar.', inStock: true },
  { id: 'p12', name: 'Cigarrillos Marlboro Box 20', category: 'Cigarrillos', price: 4200, description: 'Caja original de 20 unidades.', inStock: true },
  { id: 'p13', name: 'Cigarrillos Philip Morris Box 20', category: 'Cigarrillos', price: 3800, description: 'Caja regular.', inStock: true },
  { id: 'p14', name: 'Yerba Mate Playadito 500g', category: 'Almacén', price: 2800, description: 'Elaborada con palo, suave.', inStock: true },
  { id: 'p15', name: 'Galletitas Chocolinas 250g', category: 'Almacén', price: 1900, description: 'Galletitas de chocolate para postres o merienda.', inStock: true }
];
