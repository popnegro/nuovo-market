'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreCard from '@/components/StoreCard';
import { FEATURED_STORES } from '@/lib/data';
import { ChevronRight, Search, ShoppingBag } from 'lucide-react';

export default function MinimercadosPage() {
  const [search, setSearch] = useState('');

  const stores = [
    FEATURED_STORES.find(s => s.slug === 'mini-mercado-san-juan')!,
    FEATURED_STORES.find(s => s.slug === 'minimercado-maipu-centro')!,
    {
      id: 'almacen-los-andes',
      slug: 'almacen-los-andes',
      name: 'Almacén Los Andes',
      categorySlug: 'minimercados',
      categoryName: 'Minimercado',
      description: 'Fiambres de primera, quesos por pieza o al corte, pan casero y bebidas frías.',
      tagline: 'Tradición y buena atención en Barrio Bombal.',
      address: 'Almirante Brown 820, Barrio Bombal, Godoy Cruz',
      zone: 'Barrio Bombal',
      hours: '08:00–14:00 / 17:30–21:30 hs',
      phone: '261 555 4100',
      wa: '5492615554100',
      accent: 'teal' as const,
      path: '/minimercados',
      productsSummary: 'Quesos, fiambres, vinos mendocinos, conservas y panadería.',
      promos: ['Picada para 3 personas: $14.900'],
      badges: ['Fiambrería Propia', 'Vinos de Autor']
    },
    {
      id: 'mercado-quinta',
      slug: 'mercado-quinta',
      name: 'Mercado de la Quinta',
      categorySlug: 'minimercados',
      categoryName: 'Minimercado',
      description: 'Minimarket premium con productos importados, pastas frescas, bebidas y productos sin TACC.',
      tagline: 'Variedad seleccionada en el corazón de la Quinta Sección.',
      address: 'Rufino Ortega 310, Quinta Sección, Mendoza',
      zone: 'Quinta Sección',
      hours: '08:30–22:00 hs',
      phone: '261 555 6210',
      wa: '5492615556210',
      accent: 'teal' as const,
      path: '/minimercados',
      productsSummary: 'Sin TACC, productos orgánicos, quesos especiales y congelados.',
      badges: ['Productos Gourmet', 'Sin TACC']
    }
  ];

  const filtered = stores.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase()) ||
    s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="site-wrapper">
      <Navbar />

      <main className="category-view-page">
        <div className="content-container">
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link href="/" className="bread-link">Inicio</Link>
            <ChevronRight size={14} className="bread-sep" />
            <span className="bread-current">Minimercados</span>
          </nav>
        </div>

        <section className="category-hero-banner teal-theme">
          <div className="content-container">
            <div className="cat-hero-flex">
              <div>
                <div className="cat-hero-eyebrow">
                  <span className="dot teal"></span>
                  <span>CATEGORÍA · MENDOZA</span>
                </div>
                <h1 className="cat-hero-title">Minimercados & Almacenes</h1>
                <p className="cat-hero-desc">
                  Compras de todos los días, almacén completo, lácteos, fiambres, bebidas y panificados cerca de vos.
                  Hacé tus compras rápidas o pedí envío directo por WhatsApp.
                </p>
                <div className="cat-hero-tags">
                  <span>Almacén</span>
                  <span>Lácteos & Fiambres</span>
                  <span>Panadería</span>
                  <span>Limpieza</span>
                  <span>Bebidas</span>
                </div>
              </div>

              <div className="cat-stat-card">
                <span className="cat-stat-num">9</span>
                <span className="cat-stat-lbl">Minimercados en Mendoza</span>
                <p className="cat-stat-sub">Atención de barrio y envíos express a domicilio.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="category-stores-section">
          <div className="content-container">
            <div className="section-header-block">
              <div>
                <h2 className="section-heading">Minimercados disponibles</h2>
                <p className="section-subtext">Comercios de cercanía con stock diario en Mendoza.</p>
              </div>

              <div className="cat-search-box">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Buscar minimercado o almacén..."
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
                <h3>No se encontraron minimercados</h3>
                <p>No hay coincidencias para &ldquo;{search}&rdquo; en esta categoría.</p>
                <button 
                  onClick={() => setSearch('')} 
                  className="btn secondary small"
                >
                  Ver todos los minimercados
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
