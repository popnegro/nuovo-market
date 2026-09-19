'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreCard from '@/components/StoreCard';
import { FEATURED_STORES } from '@/lib/data';
import { ChevronRight, Search, Heart, Shield } from 'lucide-react';

export default function SexshopsPage() {
  const [search, setSearch] = useState('');

  const stores = [
    FEATURED_STORES.find(s => s.slug === 'intimo-boutique')!,
    {
      id: 'sensaciones-mendoza',
      slug: 'sensaciones-mendoza',
      name: 'Sensaciones Boutique Adultos',
      categorySlug: 'sexshops',
      categoryName: 'Sexshop',
      description: 'Cosmética sensual, lencería de autor, aceites térmicos, juegos de pareja y asesoría profesional sin tabúes.',
      tagline: 'Experiencia boutique elegante y envíos 100% discretos en todo Cuyo.',
      address: 'Garibaldi 220, Ciudad de Mendoza',
      zone: 'Ciudad de Mendoza',
      hours: '11:00–20:30 hs',
      phone: '261 555 3580',
      wa: '5492615553580',
      accent: 'pink' as const,
      path: '/sexshops',
      productsSummary: 'Lubricantes íntimos al agua, velas aromáticas para masaje, lencería y juegos para parejas.',
      promos: ['Envío en caja opaca termosellada sin leyendas'],
      badges: ['100% Confidencial', 'Asesoramiento Personalizado']
    },
    {
      id: 'placer-y-bienestar-godoy-cruz',
      slug: 'placer-y-bienestar-godoy-cruz',
      name: 'Placer & Bienestar Íntimo',
      categorySlug: 'sexshops',
      categoryName: 'Sexshop',
      description: 'Bienestar sexual consciente, lubricantes naturales hipoalergénicos, copas menstruales y cosmética.',
      tagline: 'Cuidado y autoconocimiento con productos seguros para tu salud.',
      address: 'Pellegrini 780, Godoy Cruz, Mendoza',
      zone: 'Godoy Cruz',
      hours: '10:30–19:30 hs',
      phone: '261 555 4990',
      wa: '5492615554990',
      accent: 'pink' as const,
      path: '/sexshops',
      productsSummary: 'Aceites bio, geles biocompatibles, productos de salud íntima y masajes.',
      badges: ['Productos Certificados', 'Entrega Discreta']
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
            <span className="bread-current">Sexshops</span>
          </nav>
        </div>

        <section className="category-hero-banner pink-theme">
          <div className="content-container">
            <div className="cat-hero-flex">
              <div>
                <div className="cat-hero-eyebrow">
                  <span className="dot pink"></span>
                  <span>CATEGORÍA · MENDOZA</span>
                </div>
                <h1 className="cat-hero-title">Sexshops & Bienestar Íntimo</h1>
                <p className="cat-hero-desc">
                  Boutiques de bienestar para adultos, cosmética sensorial, aceites de masaje y lencería. 
                  Asesoramiento confidencial, catálogo privado y envíos en paquetes 100% neutros y discretos.
                </p>
                <div className="cat-hero-tags">
                  <span>Cosmética íntima</span>
                  <span>Aceites para masaje</span>
                  <span>Lencería</span>
                  <span>Empaque 100% discreto</span>
                  <span>Asesoramiento privado</span>
                </div>
              </div>

              <div className="cat-stat-card">
                <span className="cat-stat-num">5</span>
                <span className="cat-stat-lbl">Boutiques en Mendoza</span>
                <p className="cat-stat-sub">Privacidad absoluta y asesoría profesional por WhatsApp.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="category-stores-section">
          <div className="content-container">
            <div className="section-header-block">
              <div>
                <h2 className="section-heading">Sexshops disponibles</h2>
                <p className="section-subtext">Tiendas verificadas con compromiso total de discreción y seguridad.</p>
              </div>

              <div className="cat-search-box">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Buscar tienda o producto..."
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
                <h3>No se encontraron sexshops</h3>
                <p>No hay coincidencias para &ldquo;{search}&rdquo; en esta categoría.</p>
                <button 
                  onClick={() => setSearch('')} 
                  className="btn secondary small"
                >
                  Ver todos los comercios
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
