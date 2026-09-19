'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreCard from '@/components/StoreCard';
import { FEATURED_STORES } from '@/lib/data';
import { ChevronRight, Search, Scissors } from 'lucide-react';

export default function PeluqueriasBarberiasPage() {
  const [search, setSearch] = useState('');

  const stores = [
    FEATURED_STORES.find(s => s.slug === 'barberia-co-mendoza')!,
    {
      id: 'salon-estilo-mendoza',
      slug: 'salon-estilo-mendoza',
      name: 'Salón & Estudio Arístides',
      categorySlug: 'peluquerias-barberias',
      categoryName: 'Peluquería & Estética',
      description: 'Colorimetría, balayage, nutrición capilar, alisados y estilismo unisex.',
      tagline: 'Tendencias en cabello y cuidado capilar en Arístides Villanueva.',
      address: 'Arístides Villanueva 550, Ciudad de Mendoza',
      zone: 'Ciudad de Mendoza',
      hours: '09:30–20:30 hs (Lunes a Sábado)',
      phone: '261 555 7120',
      wa: '5492615557120',
      accent: 'blue' as const,
      path: '/peluquerias-barberias',
      productsSummary: 'Coloración LOréal, tratamientos de keratina, corte mujer, peinados para eventos.',
      promos: ['Nutrición profunda + peinado los martes con 15% OFF'],
      badges: ['Unisex', 'Colorimetría']
    },
    {
      id: 'the-barber-club-godoy-cruz',
      slug: 'the-barber-club-godoy-cruz',
      name: 'The Barber Club Godoy Cruz',
      categorySlug: 'peluquerias-barberias',
      categoryName: 'Barbería',
      description: 'Barbería clásica, afeitado tradicional con navaja y toalla caliente, café de cortesía y música de vinilo.',
      tagline: 'El ritual del buen corte masculino a pasos de la plaza departamental.',
      address: 'Perito Moreno 340, Godoy Cruz, Mendoza',
      zone: 'Godoy Cruz',
      hours: '10:00–21:00 hs',
      phone: '261 555 6400',
      wa: '5492615556400',
      accent: 'blue' as const,
      path: '/peluquerias-barberias',
      productsSummary: 'Fade con navaja, perfilado de barba, exfoliación facial y ceras modeladoras.',
      badges: ['Toalla Caliente', 'Turnos Online']
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
            <span className="bread-current">Peluquerías & Barberías</span>
          </nav>
        </div>

        <section className="category-hero-banner blue-theme">
          <div className="content-container">
            <div className="cat-hero-flex">
              <div>
                <div className="cat-hero-eyebrow">
                  <span className="dot blue"></span>
                  <span>CATEGORÍA · MENDOZA</span>
                </div>
                <h1 className="cat-hero-title">Peluquerías & Barberías</h1>
                <p className="cat-hero-desc">
                  Cortes clásicos, fades, diseño de barba, colorimetría y tratamientos capilares. 
                  Conocé los estilos de cada profesional y reservá tu turno directo por WhatsApp.
                </p>
                <div className="cat-hero-tags">
                  <span>Corte Fade & Degradé</span>
                  <span>Barba con toalla caliente</span>
                  <span>Colorimetría</span>
                  <span>Tratamientos capilares</span>
                  <span>Turnos WhatsApp</span>
                </div>
              </div>

              <div className="cat-stat-card">
                <span className="cat-stat-num">12</span>
                <span className="cat-stat-lbl">Profesionales en Mendoza</span>
                <p className="cat-stat-sub">Reservá tu horario al instante sin esperas innecesarias.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="category-stores-section">
          <div className="content-container">
            <div className="section-header-block">
              <div>
                <h2 className="section-heading">Peluquerías & Barberías disponibles</h2>
                <p className="section-subtext">Estudios y salones con turnos directos por WhatsApp.</p>
              </div>

              <div className="cat-search-box">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Buscar salón o profesional..."
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
                <h3>No se encontraron peluquerías o barberías</h3>
                <p>No hay coincidencias para &ldquo;{search}&rdquo; en esta categoría.</p>
                <button 
                  onClick={() => setSearch('')} 
                  className="btn secondary small"
                >
                  Ver todos los profesionales
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
