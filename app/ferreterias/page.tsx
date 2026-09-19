'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreCard from '@/components/StoreCard';
import { FEATURED_STORES } from '@/lib/data';
import { ChevronRight, Search, Wrench } from 'lucide-react';

export default function FerreteriasPage() {
  const [search, setSearch] = useState('');

  const stores = [
    FEATURED_STORES.find(s => s.slug === 'ferreteria-el-andino')!,
    {
      id: 'ferreteria-industrial-cuyo',
      slug: 'ferreteria-industrial-cuyo',
      name: 'Ferretería Industrial Cuyo',
      categorySlug: 'ferreterias',
      categoryName: 'Ferretería',
      description: 'Herramientas eléctricas DeWalt, Bosch, soldadoras, compresores, elementos de seguridad y bulonería pesada.',
      tagline: 'Equipamiento profesional para talleres y empresas de construcción.',
      address: 'Costanera y Reconquista, Guaymallén, Mendoza',
      zone: 'Guaymallén',
      hours: '08:00–18:30 hs',
      phone: '261 555 3800',
      wa: '5492615553800',
      accent: 'amber' as const,
      path: '/ferreterias',
      productsSummary: 'Amoladoras, taladros percutores, discos de corte, electrodos y botas de seguridad.',
      promos: ['Descuento por compra en cantidad para gremios'],
      badges: ['Distribuidor Oficial', 'Factura A']
    },
    {
      id: 'ferreteria-san-martin-sur',
      slug: 'ferreteria-san-martin-sur',
      name: 'Ferretería San Martín Sur',
      categorySlug: 'ferreterias',
      categoryName: 'Ferretería',
      description: 'Plomería termofusión, sanitarios, llaves térmicas, cables normalizados y pinturas.',
      tagline: 'Soluciones rápidas para tu casa o departamento en Godoy Cruz.',
      address: 'Av. San Martín Sur 1890, Godoy Cruz, Mendoza',
      zone: 'Godoy Cruz',
      hours: '08:30–13:00 / 16:30–20:00 hs',
      phone: '261 555 8420',
      wa: '5492615558420',
      accent: 'amber' as const,
      path: '/ferreterias',
      productsSummary: 'Caños IPS, llaves de paso, pegamentos, siliconas, enchufes y focos LED.',
      badges: ['Atención Urgencias', 'Stock Completo']
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
            <span className="bread-current">Ferreterías</span>
          </nav>
        </div>

        <section className="category-hero-banner amber-theme">
          <div className="content-container">
            <div className="cat-hero-flex">
              <div>
                <div className="cat-hero-eyebrow">
                  <span className="dot amber"></span>
                  <span>CATEGORÍA · MENDOZA</span>
                </div>
                <h1 className="cat-hero-title">Ferreterías & Materiales</h1>
                <p className="cat-hero-desc">
                  Herramientas, tornillería, plomería, electricidad, cerrajería y artículos para reparaciones del hogar.
                  Consultá por fotos o medidas directamente a los ferreteros de Mendoza.
                </p>
                <div className="cat-hero-tags">
                  <span>Herramientas manuales</span>
                  <span>Plomería & Gas</span>
                  <span>Electricidad</span>
                  <span>Pintura & Selladores</span>
                  <span>Tornillería</span>
                </div>
              </div>

              <div className="cat-stat-card">
                <span className="cat-stat-num">7</span>
                <span className="cat-stat-lbl">Ferreterías en Mendoza</span>
                <p className="cat-stat-sub">Consultá stock y compatibilidad por WhatsApp con foto.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="category-stores-section">
          <div className="content-container">
            <div className="section-header-block">
              <div>
                <h2 className="section-heading">Ferreterías disponibles</h2>
                <p className="section-subtext">Asesoramiento técnico directo de ferreteros con experiencia.</p>
              </div>

              <div className="cat-search-box">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Buscar ferretería o material..."
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
                <h3>No se encontraron ferreterías</h3>
                <p>No hay coincidencias para &ldquo;{search}&rdquo; en esta categoría.</p>
                <button 
                  onClick={() => setSearch('')} 
                  className="btn secondary small"
                >
                  Ver todas las ferreterías
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
