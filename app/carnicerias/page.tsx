'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreCard from '@/components/StoreCard';
import { FEATURED_STORES } from '@/lib/data';
import { ChevronRight, Search, Beef } from 'lucide-react';

export default function CarniceriasPage() {
  const [search, setSearch] = useState('');

  const stores = [
    FEATURED_STORES.find(s => s.slug === 'carniceria-la-cabana')!,
    {
      id: 'carniceria-los-amigos',
      slug: 'carniceria-los-amigos',
      name: 'Carnicería Los Amigos',
      categorySlug: 'carnicerias',
      categoryName: 'Carnicería',
      description: 'Cortes especiales, asado con cuero, milanesas preparadas y combos para la semana.',
      tagline: 'Las mejores milanesas y cortes tiernos de la Sexta Sección.',
      address: 'Jorge A. Calle 650, Sexta Sección, Mendoza',
      zone: 'Sexta Sección',
      hours: '08:30–13:30 / 17:00–21:00 hs',
      phone: '261 555 9011',
      wa: '5492615559011',
      accent: 'red' as const,
      path: '/carnicerias',
      productsSummary: 'Milanesas de nalga, bife de chorizo, entraña, pechito de cerdo y chorizos bombón.',
      promos: ['2kg de milanesas preparadas: $16.800'],
      badges: ['Cortes Tiernizados', 'Milanesas Caseras']
    },
    {
      id: 'boutique-de-carnes-lujan',
      slug: 'boutique-de-carnes-lujan',
      name: 'Boutique de Carnes Luján',
      categorySlug: 'carnicerias',
      categoryName: 'Carnicería',
      description: 'Carne envasada al vacío, madurada, cortes para ahumar y embutidos gourmet.',
      tagline: 'Experiencia parrillera premium en Chacras de Coria y Luján.',
      address: 'Italia 5400, Chacras de Coria, Luján de Cuyo',
      zone: 'Luján de Cuyo',
      hours: '09:00–14:00 / 17:00–21:00 hs',
      phone: '261 555 4910',
      wa: '5492615554910',
      accent: 'red' as const,
      path: '/carnicerias',
      productsSummary: 'Tomahawk, T-bone, entraña americana, chorizos con queso provolone y carbón quebracho.',
      badges: ['Carne Madurada', 'Cortes de Autor']
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
            <span className="bread-current">Carnicerías</span>
          </nav>
        </div>

        <section className="category-hero-banner red-theme">
          <div className="content-container">
            <div className="cat-hero-flex">
              <div>
                <div className="cat-hero-eyebrow">
                  <span className="dot red"></span>
                  <span>CATEGORÍA · MENDOZA</span>
                </div>
                <h1 className="cat-hero-title">Carnicerías & Parrilla</h1>
                <p className="cat-hero-desc">
                  Los mejores cortes vacunos para el asado mendocino, cerdo, pollo, milanesas caseras 
                  y combos parrilleros con asesoramiento de carniceros de confianza.
                </p>
                <div className="cat-hero-tags">
                  <span>Combos de Asado</span>
                  <span>Costillar & Vacío</span>
                  <span>Milanesas de Nalga</span>
                  <span>Embutidos artesanales</span>
                  <span>Cortes especiales</span>
                </div>
              </div>

              <div className="cat-stat-card">
                <span className="cat-stat-num">8</span>
                <span className="cat-stat-lbl">Carnicerías en Mendoza</span>
                <p className="cat-stat-sub">Combos para el fin de semana y pedidos listos para retirar.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="category-stores-section">
          <div className="content-container">
            <div className="section-header-block">
              <div>
                <h2 className="section-heading">Carnicerías disponibles</h2>
                <p className="section-subtext">Calidad garantizada y preparación a tu gusto.</p>
              </div>

              <div className="cat-search-box">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Buscar carnicería o corte..."
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
                <h3>No se encontraron carnicerías</h3>
                <p>No hay coincidencias para &ldquo;{search}&rdquo; en esta categoría.</p>
                <button 
                  onClick={() => setSearch('')} 
                  className="btn secondary small"
                >
                  Ver todas las carnicerías
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
