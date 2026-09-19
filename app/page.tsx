'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import StoreCard from '@/components/StoreCard';
import { CATEGORIES, FEATURED_STORES, MENDOZA_ZONES } from '@/lib/data';
import { 
  Search, 
  MapPin, 
  Store, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Zap, 
  TrendingUp, 
  Settings2,
  X
} from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState('Todas las zonas');

  // Filtered categories based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return CATEGORIES;
    const query = searchQuery.toLowerCase();
    return CATEGORIES.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query) ||
      c.popularItems.some(item => item.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Filtered stores based on search query and selected zone
  const filteredStores = useMemo(() => {
    return FEATURED_STORES.filter(store => {
      const matchesZone = selectedZone === 'Todas las zonas' || store.zone === selectedZone || store.address.toLowerCase().includes(selectedZone.toLowerCase());
      if (!matchesZone) return false;
      
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        store.name.toLowerCase().includes(query) ||
        store.categoryName.toLowerCase().includes(query) ||
        store.description.toLowerCase().includes(query) ||
        store.productsSummary.toLowerCase().includes(query) ||
        store.address.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, selectedZone]);

  const nuovoMarket = FEATURED_STORES.find(s => s.slug === 'nuovo-market') || FEATURED_STORES[0];

  return (
    <div className="site-wrapper">
      <Navbar />

      <main>
        {/* HERO SECTION WITH VALUE PROPOSITION */}
        <section className="home-hero-section">
          <div className="hero-container">
            <div className="hero-badge-row">
              <span className="hero-location-pill">
                <MapPin size={13} />
                <span>Mendoza · Red de Comercio de Barrio</span>
              </span>
              <span className="hero-status-pill">
                <Sparkles size={13} />
                <span>0% Comisiones de intermediación</span>
              </span>
            </div>

            <h1 className="hero-main-title">
              Tu barrio a un toque.<br />
              <span className="title-highlight">Comercios locales de Mendoza</span> sin intermediarios.
            </h1>

            <p className="hero-subtext">
              Descubrí los comercios de cercanía de tu zona: consultá catálogos digitales actualizados, 
              precios reales y contactá o hacé tus pedidos <strong>directamente por WhatsApp</strong>.
            </p>

            {/* SEARCH & LOCATION CONTROL PANEL */}
            <div className="search-control-box">
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input 
                  type="text"
                  placeholder="Buscar productos (ej: bebidas, asado, pan), comercios o rubros..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  id="home-search-input"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="clear-search-btn"
                    aria-label="Limpiar búsqueda"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              <div className="location-select-wrapper">
                <MapPin size={16} className="loc-icon" />
                <select 
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="zone-select"
                  id="home-zone-select"
                >
                  {MENDOZA_ZONES.map(z => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* TRUST & VALUE PILLARS */}
            <div className="hero-stats-row">
              <div className="stat-item">
                <div className="stat-icon-wrap"><Zap size={15} /></div>
                <div>
                  <strong>WhatsApp Directo</strong>
                  <small>Pedidos sin recargos</small>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon-wrap"><ShieldCheck size={15} /></div>
                <div>
                  <strong>Comercios Verificados</strong>
                  <small>Identidad y dirección real</small>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon-wrap"><Clock size={15} /></div>
                <div>
                  <strong>Catálogo Actualizado</strong>
                  <small>Precios y stock del día</small>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon-wrap"><TrendingUp size={15} /></div>
                <div>
                  <strong>8 Rubros Barriales</strong>
                  <small>Kioscos, almacenes y más</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SPOTLIGHT BANNER: NUOVO MARKET DEMO */}
        <section className="spotlight-section">
          <div className="spotlight-wrap">
            <div className="spotlight-card">
              <div className="spotlight-badge-top">
                <span className="spotlight-kicker">DEMO DESTACADA</span>
                <span className="badge-kiosco">Categoría Kioscos</span>
              </div>

              <div className="spotlight-content">
                <div>
                  <h2 className="spotlight-title">Nuovo Market · Kiosco de Barrio</h2>
                  <p className="spotlight-desc">
                    Experiencia interactiva de comercio local: catálogo de bebidas, snacks, golosinas y cigarrillos 
                    con carrito de compras y envío directo a WhatsApp.
                  </p>
                  <div className="spotlight-details">
                    <span><MapPin size={14} /> Av. Las Heras 742, Ciudad de Mendoza</span>
                    <span><Clock size={14} /> Abierto hoy hasta las 23:30 hs</span>
                  </div>
                </div>

                <div className="spotlight-actions">
                  <Link href="/kioscos/nuovo-market" className="btn primary spotlight-btn">
                    <span>Explorar catálogo Nuovo Market</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link href="/admin" className="btn secondary spotlight-admin-btn">
                    <Settings2 size={16} />
                    <span>Ver cómo lo administra el dueño</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8 CATEGORIES SECTION */}
        <section className="categories-main-section" id="categorias">
          <div className="content-container">
            <div className="section-header-block">
              <div>
                <span className="section-eyebrow">ARQUITECTURA DE COMERCIO LOCAL</span>
                <h2 className="section-heading">Elegí una categoría</h2>
                <p className="section-subtext">
                  Cada categoría cuenta con su propia ruta directa y comercios seleccionados en Mendoza.
                </p>
              </div>
              <div className="category-count-badge">
                <span>{filteredCategories.length} de 8 categorías</span>
              </div>
            </div>

            {filteredCategories.length === 0 ? (
              <div className="empty-results-box">
                <p>No encontramos categorías que coincidan con &ldquo;{searchQuery}&rdquo;.</p>
                <button onClick={() => setSearchQuery('')} className="btn secondary small">
                  Restablecer búsqueda
                </button>
              </div>
            ) : (
              <div className="categories-grid-modern">
                {filteredCategories.map(category => (
                  <CategoryCard key={category.slug} category={category} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FEATURED STORES SECTION */}
        <section className="stores-main-section" id="destacados">
          <div className="content-container">
            <div className="section-header-block">
              <div>
                <span className="section-eyebrow">RED DE CERCANÍA EN MENDOZA</span>
                <h2 className="section-heading">Comercios destacados</h2>
                <p className="section-subtext">
                  Negocios de barrio con presencia digital activa y atención personalizada.
                </p>
              </div>
              <div className="location-filter-indicator">
                <MapPin size={14} />
                <span>{selectedZone}</span>
              </div>
            </div>

            {filteredStores.length === 0 ? (
              <div className="empty-results-box">
                <p>No se encontraron comercios en {selectedZone} con ese criterio.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedZone('Todas las zonas'); }} 
                  className="btn secondary small"
                >
                  Ver todos los comercios
                </button>
              </div>
            ) : (
              <div className="stores-grid-modern">
                {filteredStores.map(store => (
                  <StoreCard key={store.id} store={store} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="how-it-works-section" id="como-funciona">
          <div className="content-container">
            <div className="section-header-block center-text">
              <span className="section-eyebrow">SIMPLE, RÁPIDO Y DIRECTO</span>
              <h2 className="section-heading">Cómo funciona SmartBarrio</h2>
              <p className="section-subtext">
                Pensado para el comercio real: sin registro obligatorio para el cliente y sin comisiones abusivas.
              </p>
            </div>

            <div className="how-steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3 className="step-title">Descubrí tu comercio</h3>
                <p className="step-desc">
                  Encontrá el kiosco, minimercado, verdulería o servicio más cercano en tu barrio de Mendoza.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">2</div>
                <h3 className="step-title">Elegí tus productos</h3>
                <p className="step-desc">
                  Navegá el catálogo digital con fotos, descripciones y precios actualizados del día.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">3</div>
                <h3 className="step-title">Pedí directo por WhatsApp</h3>
                <p className="step-desc">
                  El pedido se arma automáticamente y viaja directo al WhatsApp del comerciante. Sin intermediarios.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA MERCHANTS BANNER */}
        <section className="merchant-cta-section">
          <div className="content-container">
            <div className="merchant-cta-card">
              <div className="cta-left">
                <span className="cta-kicker">¿TENÉS UN COMERCIO EN MENDOZA?</span>
                <h2 className="cta-title">Sumá tu negocio a SmartBarrio</h2>
                <p className="cta-desc">
                  Publicá tu catálogo en minutos, recibí pedidos ordenados por WhatsApp y controlá tus ventas desde un panel intuitivo.
                </p>
                <div className="cta-buttons-row">
                  <a 
                    href="https://wa.me/5492615551040?text=Hola,%20tengo%20un%20comercio%20en%20Mendoza%20y%20quiero%20conocer%20SmartBarrio." 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn primary"
                  >
                    <MessageCircle size={17} />
                    <span>Hablar con un asesor</span>
                  </a>
                  <Link href="/admin" className="btn secondary">
                    <Settings2 size={17} />
                    <span>Ver panel de demostración</span>
                  </Link>
                </div>
              </div>

              <div className="cta-right-box">
                <div className="benefit-row">
                  <CheckCircle2 size={16} />
                  <span>Sin costo de instalación inicial</span>
                </div>
                <div className="benefit-row">
                  <CheckCircle2 size={16} />
                  <span>Catálogo cargado en 24 horas</span>
                </div>
                <div className="benefit-row">
                  <CheckCircle2 size={16} />
                  <span>Código QR para tu mostrador</span>
                </div>
                <div className="benefit-row">
                  <CheckCircle2 size={16} />
                  <span>Soporte local en Mendoza</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
