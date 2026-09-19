'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreCard from '@/components/StoreCard';
import { FEATURED_STORES } from '@/lib/data';
import { ChevronRight, Search, Apple } from 'lucide-react';

export default function VerduleriasPage() {
  const [search, setSearch] = useState('');

  const stores = [
    FEATURED_STORES.find(s => s.slug === 'verduleria-don-pedro')!,
    {
      id: 'frutas-guaymallen',
      slug: 'frutas-guaymallen',
      name: 'Verdulería & Frutas Guaymallén',
      categorySlug: 'verdulerias',
      categoryName: 'Verdulería',
      description: 'Llegadas directas del Mercado Cooperativo. Precios mayoristas para familias y comercios.',
      tagline: 'Frescura inigualable y bolsones de 8kg a precios insuperables.',
      address: 'Bandera de los Andes 2400, Guaymallén, Mendoza',
      zone: 'Guaymallén',
      hours: '07:00–14:00 / 17:00–21:00 hs',
      phone: '261 555 7711',
      wa: '5492615557711',
      accent: 'green' as const,
      path: '/verdulerias',
      productsSummary: 'Tomates, papas del sur, cebollas, manzanas rojas, uvas de mesa y verduras de hoja.',
      promos: ['Bolsón super económico 8kg: $15.000'],
      badges: ['Precios Mayoristas', 'Directo del Mercado']
    },
    {
      id: 'la-huerta-godoy-cruz',
      slug: 'la-huerta-godoy-cruz',
      name: 'La Huerta de Godoy Cruz',
      categorySlug: 'verdulerias',
      categoryName: 'Verdulería',
      description: 'Vegetales agroecológicos, frutos secos, legumbres y ensaladas lavadas listas para consumir.',
      tagline: 'Comé rico y sano con productos cuidados desde la huerta.',
      address: 'San Martín Sur 1220, Godoy Cruz, Mendoza',
      zone: 'Godoy Cruz',
      hours: '08:30–20:30 hs',
      phone: '261 555 8320',
      wa: '5492615558320',
      accent: 'green' as const,
      path: '/verdulerias',
      productsSummary: 'Hojas verdes hidropónicas, hongos frescos, paltas premium y frutos secos.',
      badges: ['Agroecológico', 'Listas para Consumir']
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
            <span className="bread-current">Verdulerías</span>
          </nav>
        </div>

        <section className="category-hero-banner green-theme">
          <div className="content-container">
            <div className="cat-hero-flex">
              <div>
                <div className="cat-hero-eyebrow">
                  <span className="dot green"></span>
                  <span>CATEGORÍA · MENDOZA</span>
                </div>
                <h1 className="cat-hero-title">Verdulerías & Fruterías</h1>
                <p className="cat-hero-desc">
                  Frutas y verduras frescas del día, cosechas de la región de Cuyo, bolsones familiares 
                  y ensaladas listas. Pedí tus bolsones semanales directo por WhatsApp.
                </p>
                <div className="cat-hero-tags">
                  <span>Bolsones familiares</span>
                  <span>Frutas de estación</span>
                  <span>Hortalizas</span>
                  <span>Paltas & Tomates</span>
                  <span>Verduras agroecológicas</span>
                </div>
              </div>

              <div className="cat-stat-card">
                <span className="cat-stat-num">11</span>
                <span className="cat-stat-lbl">Verdulerías en Mendoza</span>
                <p className="cat-stat-sub">Fruta y verdura del día con entrega en tu barrio.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="category-stores-section">
          <div className="content-container">
            <div className="section-header-block">
              <div>
                <h2 className="section-heading">Verdulerías disponibles</h2>
                <p className="section-subtext">Comercios de Mendoza con producción fresca garantizada.</p>
              </div>

              <div className="cat-search-box">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Buscar verdulería o producto..."
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
                <h3>No se encontraron verdulerías</h3>
                <p>No hay coincidencias para &ldquo;{search}&rdquo; en esta categoría.</p>
                <button 
                  onClick={() => setSearch('')} 
                  className="btn secondary small"
                >
                  Ver todas las verdulerías
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
