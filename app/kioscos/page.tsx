'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreCard from '@/components/StoreCard';
import { FEATURED_STORES } from '@/lib/data';
import { 
  Store, 
  MapPin, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export default function KioscosPage() {
  const [search, setSearch] = useState('');
  
  const allKioscos = [
    FEATURED_STORES.find(s => s.slug === 'nuovo-market')!,
    FEATURED_STORES.find(s => s.slug === 'kiosco-el-triangulo-las-heras')!,
    {
      id: 'kiosco-la-esquina',
      slug: 'kiosco-la-esquina',
      name: 'Kiosco La Esquina',
      categorySlug: 'kioscos',
      categoryName: 'Kiosco',
      description: 'Pausa rápida, bebidas frías, café al paso, cigarrillos y golosinas en el centro mendocino.',
      tagline: 'Abierto temprano para acompañar tu jornada en Mendoza.',
      address: 'Av. Las Heras 742, Ciudad de Mendoza',
      zone: 'Ciudad de Mendoza',
      hours: '07:30–23:00 hs',
      phone: '261 555 1040',
      wa: '5492615551040',
      accent: 'orange' as const,
      path: '/kioscos/nuovo-market',
      productsSummary: 'Golosinas, alfajores, bebidas frías, recargas SUBE y cigarrillos.',
      promos: ['Café al paso + alfajor por $2.500'],
      badges: ['Verificado', 'Atención Rápida']
    },
    {
      id: 'kiosco-san-martin',
      slug: 'kiosco-san-martin',
      name: 'Kiosco San Martín 24hs',
      categorySlug: 'kioscos',
      categoryName: 'Kiosco',
      description: 'Atención ininterrumpida las 24 horas. Amplia variedad en bebidas, snacks y tabaco.',
      tagline: 'Nunca cierra: tu salvación a cualquier hora en Mendoza.',
      address: 'Av. San Martín 1820, Ciudad de Mendoza',
      zone: 'Ciudad de Mendoza',
      hours: 'Abierto 24 Horas',
      phone: '261 555 3399',
      wa: '5492615553399',
      accent: 'orange' as const,
      path: '/kioscos/nuovo-market',
      productsSummary: 'Bebidas energizantes, hielo, snacks, chocolates y tabaco.',
      badges: ['24 Horas', 'Hielo y Bebidas']
    }
  ];

  const filtered = allKioscos.filter(k => 
    k.name.toLowerCase().includes(search.toLowerCase()) ||
    k.description.toLowerCase().includes(search.toLowerCase()) ||
    k.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="site-wrapper">
      <Navbar />

      <main className="category-view-page">
        {/* BREADCRUMB */}
        <div className="content-container">
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link href="/" className="bread-link">Inicio</Link>
            <ChevronRight size={14} className="bread-sep" />
            <span className="bread-current">Kioscos</span>
          </nav>
        </div>

        {/* CATEGORY HERO */}
        <section className="category-hero-banner orange-theme">
          <div className="content-container">
            <div className="cat-hero-flex">
              <div>
                <div className="cat-hero-eyebrow">
                  <span className="dot orange"></span>
                  <span>CATEGORÍA DESTACADA · MENDOZA</span>
                </div>
                <h1 className="cat-hero-title">Kioscos de Barrio</h1>
                <p className="cat-hero-desc">
                  Bebidas frías, alfajores, snacks, cigarrillos, recargas y todo lo que necesitás al paso. 
                  Encontrá los kioscos más cercanos con catálogo y atención directa por WhatsApp.
                </p>
                <div className="cat-hero-tags">
                  <span>Bebidas frías</span>
                  <span>Golosinas</span>
                  <span>Snacks & Papas</span>
                  <span>Cigarrillos</span>
                  <span>Recargas</span>
                </div>
              </div>

              <div className="cat-stat-card">
                <span className="cat-stat-num">14</span>
                <span className="cat-stat-lbl">Kioscos activos en Mendoza</span>
                <p className="cat-stat-sub">Catálogos actualizados y pedidos sin intermediarios.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FLAGSHIP STORE BANNER: NUOVO MARKET */}
        <section className="flagship-banner-section">
          <div className="content-container">
            <div className="flagship-card">
              <div className="flagship-badge">
                <Sparkles size={14} />
                <span>COMERCIO PILOTO DIGITALIZADO</span>
              </div>
              <div className="flagship-body">
                <div>
                  <h2 className="flagship-title">Nuovo Market · Kiosco de Barrio</h2>
                  <p className="flagship-text">
                    Visitá la experiencia completa de <strong>Nuovo Market</strong>: explorá su catálogo por rubros, 
                    precios vigentes y hacé tu pedido por WhatsApp directamente al mostrador.
                  </p>
                  <div className="flagship-meta">
                    <span><MapPin size={14} /> Av. Las Heras 742, Ciudad de Mendoza</span>
                    <span><Clock size={14} /> 08:00 a 23:30 hs</span>
                    <span><CheckCircle2 size={14} /> WhatsApp verificado</span>
                  </div>
                </div>

                <div className="flagship-actions">
                  <Link href="/kioscos/nuovo-market" className="btn primary flagship-btn">
                    <span>Ver catálogo completo de Nuovo Market</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH & LIST OF STORES */}
        <section className="category-stores-section">
          <div className="content-container">
            <div className="section-header-block">
              <div>
                <h2 className="section-heading">Kioscos disponibles en Mendoza</h2>
                <p className="section-subtext">Comercios de cercanía con atención personalizada.</p>
              </div>

              <div className="cat-search-box">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Buscar kiosco por nombre o calle..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="cat-search-input"
                />
              </div>
            </div>

            {filtered.length > 0 ? (
              <div className="stores-grid-modern">
                {filtered.map(store => (
                  <StoreCard key={store.id} store={store} />
                ))}
              </div>
            ) : (
              <div className="empty-results-box">
                <Search size={34} className="empty-icon" />
                <h3>No se encontraron kioscos</h3>
                <p>No hay coincidencias para &ldquo;{search}&rdquo; en esta categoría.</p>
                <button 
                  onClick={() => setSearch('')} 
                  className="btn secondary small"
                >
                  Ver todos los kioscos
                </button>
              </div>
            )}
          </div>
        </section>

        {/* EXPLORE OTHER CATEGORIES */}
        <section className="other-cats-section">
          <div className="content-container">
            <div className="other-cats-box">
              <h3>¿Buscás otro rubro?</h3>
              <p>Explorá las demás categorías comerciales de SmartBarrio Mendoza:</p>
              <div className="other-cats-links">
                <Link href="/minimercados">Minimercados</Link>
                <Link href="/verdulerias">Verdulerías</Link>
                <Link href="/carnicerias">Carnicerías</Link>
                <Link href="/peluquerias-barberias">Peluquerías & Barberías</Link>
                <Link href="/ferreterias">Ferreterías</Link>
                <Link href="/petshops">PetShops</Link>
                <Link href="/sexshops">Sexshops</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
