'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreCard from '@/components/StoreCard';
import { FEATURED_STORES } from '@/lib/data';
import { ChevronRight, Search, Dog } from 'lucide-react';

export default function PetshopsPage() {
  const [search, setSearch] = useState('');

  const stores = [
    FEATURED_STORES.find(s => s.slug === 'patitas-petshop')!,
    {
      id: 'huellitas-veterinaria-lujan',
      slug: 'huellitas-veterinaria-lujan',
      name: 'Huellitas Pet & Farmacia',
      categorySlug: 'petshops',
      categoryName: 'PetShop',
      description: 'Atención veterinaria, farmacia, vacunas, alimentos medicados y accesorios para perros y gatos.',
      tagline: 'Cuidado profesional para tu compañero de cuatro patas.',
      address: 'Sarmiento 410, Luján de Cuyo, Mendoza',
      zone: 'Luján de Cuyo',
      hours: '09:00–13:00 / 16:30–20:30 hs',
      phone: '261 555 9300',
      wa: '5492615559300',
      accent: 'violet' as const,
      path: '/petshops',
      productsSummary: 'Alimentos medicados Urinary, Hepatic, collares Seresto, pipetas Frontline y camas ortopédicas.',
      promos: ['Combo alimento 15kg + snack dental de regalo'],
      badges: ['Farmacia Veterinaria', 'Alimentos Medicados']
    },
    {
      id: 'mundo-animal-guaymallen',
      slug: 'mundo-animal-guaymallen',
      name: 'Mundo Animal PetShop',
      categorySlug: 'petshops',
      categoryName: 'PetShop',
      description: 'Venta suelta y por bolsa cerrada de las mejores marcas. Rascadores, arneses y golosinas naturales.',
      tagline: 'Precios mayoristas en alimentos balanceados en Guaymallén.',
      address: 'Libertad 850, Villa Nueva, Guaymallén',
      zone: 'Guaymallén',
      hours: '09:00–20:00 hs',
      phone: '261 555 1290',
      wa: '5492615551290',
      accent: 'violet' as const,
      path: '/petshops',
      productsSummary: 'Eukanuba, Dog Chow, Cat Chow, piedras sanitarias de bentonita y transportadoras.',
      badges: ['Venta Suelta y Bolsa', 'Delivery Rápido']
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
            <span className="bread-current">PetShops</span>
          </nav>
        </div>

        <section className="category-hero-banner violet-theme">
          <div className="content-container">
            <div className="cat-hero-flex">
              <div>
                <div className="cat-hero-eyebrow">
                  <span className="dot violet"></span>
                  <span>CATEGORÍA · MENDOZA</span>
                </div>
                <h1 className="cat-hero-title">PetShops & Mascotas</h1>
                <p className="cat-hero-desc">
                  Alimentos balanceados para perros y gatos, farmacia veterinaria, pipetas antipulgas, 
                  juguetes y accesorios. Delivery de bolsas pesadas directo a tu puerta en Mendoza.
                </p>
                <div className="cat-hero-tags">
                  <span>Alimento balanceado</span>
                  <span>Pipetas & Antiparasitarios</span>
                  <span>Piedras sanitarias</span>
                  <span>Golosinas & Snacks</span>
                  <span>Envíos a domicilio</span>
                </div>
              </div>

              <div className="cat-stat-card">
                <span className="cat-stat-num">6</span>
                <span className="cat-stat-lbl">PetShops en Mendoza</span>
                <p className="cat-stat-sub">Delivery de bolsas pesadas sin costo adicional según zona.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="category-stores-section">
          <div className="content-container">
            <div className="section-header-block">
              <div>
                <h2 className="section-heading">PetShops disponibles</h2>
                <p className="section-subtext">Nutrición y cuidado garantizado para tus mascotas.</p>
              </div>

              <div className="cat-search-box">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Buscar petshop o marca..."
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
                <h3>No se encontraron petshops</h3>
                <p>No hay coincidencias para &ldquo;{search}&rdquo; en esta categoría.</p>
                <button 
                  onClick={() => setSearch('')} 
                  className="btn secondary small"
                >
                  Ver todos los petshops
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
