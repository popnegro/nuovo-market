'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { NUOVO_MARKET_PRODUCTS, ProductItem } from '@/lib/data';
import { 
  MapPin, 
  Clock3, 
  Phone, 
  MessageCircle, 
  ChevronRight, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Search, 
  CheckCircle2, 
  Share2, 
  Settings2,
  Navigation,
  ArrowLeft,
  ExternalLink,
  X
} from 'lucide-react';

export default function NuovoMarketPage() {
  const [selectedCat, setSelectedCat] = useState('Todos');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [copied, setCopied] = useState(false);

  const categories = ['Todos', 'Bebidas', 'Snacks', 'Golosinas', 'Cigarrillos', 'Almacén'];

  const filteredProducts = useMemo(() => {
    return NUOVO_MARKET_PRODUCTS.filter(p => {
      const matchesCat = selectedCat === 'Todos' || p.category === selectedCat;
      const matchesSearch = !search.trim() || 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCat, search]);

  const addToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const count = prev[id] || 0;
      if (count <= 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: count - 1 };
    });
  };

  const cartTotalItems = Object.values(cart).reduce((sum, q) => sum + q, 0);

  const cartTotalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = NUOVO_MARKET_PRODUCTS.find(p => p.id === id);
    return sum + (product ? product.price * qty : 0);
  }, 0);

  const generateWhatsAppUrl = () => {
    const lines: string[] = ['Hola Nuovo Market! Quiero hacer este pedido desde SmartBarrio:'];
    Object.entries(cart).forEach(([id, qty]) => {
      const product = NUOVO_MARKET_PRODUCTS.find(p => p.id === id);
      if (product) {
        lines.push(`• ${qty}x ${product.name} ($${(product.price * qty).toLocaleString('es-AR')})`);
      }
    });
    lines.push(`Total estimado: $${cartTotalPrice.toLocaleString('es-AR')}`);
    lines.push('¿Tienen disponibilidad para preparar el pedido?');
    return `https://wa.me/5492615551040?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const shareStore = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="site-wrapper">
      <Navbar />

      <main className="store-profile-page">
        {/* BREADCRUMB */}
        <div className="content-container">
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link href="/" className="bread-link">Inicio</Link>
            <ChevronRight size={14} className="bread-sep" />
            <Link href="/kioscos" className="bread-link">Kioscos</Link>
            <ChevronRight size={14} className="bread-sep" />
            <span className="bread-current">Nuovo Market</span>
          </nav>
        </div>

        {/* STORE HERO HEADER */}
        <section className="store-hero-section">
          <div className="content-container">
            <div className="store-hero-card">
              <div className="store-hero-main">
                <div className="store-badge-status">
                  <span className="dot orange"></span>
                  <span>Kiosco de Barrio · Ciudad de Mendoza</span>
                  <span className="verified-pill">
                    <CheckCircle2 size={13} />
                    <span>Verificado por SmartBarrio</span>
                  </span>
                </div>

                <h1 className="store-main-name">Nuovo Market</h1>
                <p className="store-main-desc">
                  Tu kiosco de confianza sobre Av. Las Heras. Bebidas heladas, golosinas, alfajores artesanales, 
                  snacks, cigarrillos y recargas al paso. Hacé tu pedido online y retiralo sin esperar o consultá por delivery.
                </p>

                <div className="store-meta-grid">
                  <div className="store-meta-col">
                    <MapPin size={16} />
                    <div>
                      <strong>Av. Las Heras 742</strong>
                      <small>Ciudad de Mendoza</small>
                    </div>
                  </div>
                  <div className="store-meta-col">
                    <Clock3 size={16} />
                    <div>
                      <strong>08:00 a 23:30 hs</strong>
                      <small>Lunes a Domingos</small>
                    </div>
                  </div>
                  <div className="store-meta-col">
                    <Phone size={16} />
                    <div>
                      <strong>261 555 1040</strong>
                      <small>Teléfono de línea</small>
                    </div>
                  </div>
                </div>

                <div className="store-actions-row">
                  <a 
                    href="https://wa.me/5492615551040?text=Hola%20Nuovo%20Market,%20quiero%20hacer%20una%20consulta."
                    target="_blank"
                    rel="noreferrer"
                    className="btn primary"
                  >
                    <MessageCircle size={18} />
                    <span>WhatsApp Directo</span>
                  </a>
                  <a href="tel:2615551040" className="btn secondary">
                    <Phone size={16} />
                    <span>Llamar</span>
                  </a>
                  <button onClick={shareStore} className="btn secondary">
                    <Share2 size={16} />
                    <span>{copied ? '¡URL Copiada!' : 'Compartir'}</span>
                  </button>
                  <Link href="/nuovo-market" className="btn secondary" style={{ borderColor: '#fed7aa', color: '#c2410c', background: '#fff7ed' }}>
                    <ExternalLink size={16} />
                    <span>Ver Landing Page</span>
                  </Link>
                  <Link href="/admin" className="btn secondary admin-quick-btn">
                    <Settings2 size={16} />
                    <span>Panel de Control</span>
                  </Link>
                </div>
              </div>

              <div className="store-hero-visual orange">
                <div className="visual-badge">Kiosco de Barrio</div>
                <div className="visual-initials">NM</div>
                <div className="visual-caption">
                  <MapPin size={14} />
                  <span>Av. Las Heras 742 · Mendoza</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROMO BANNER */}
        <div className="content-container">
          <div className="store-special-promo">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="promo-badge-tag">PROMO DEL DÍA</span>
              <strong>2 gaseosas 500ml + snack a precio especial de barrio.</strong>
            </div>
            <span style={{ fontSize: '12px', color: '#526057' }}>Consultá disponibilidad por WhatsApp</span>
          </div>
        </div>

        {/* CATALOG & INTERACTIVE ORDER SECTION */}
        <section className="catalog-section">
          <div className="content-container">
            <div className="catalog-layout">
              {/* CATALOG MAIN CONTENT */}
              <div className="catalog-content">
                <div className="catalog-controls">
                  <div className="cat-filter-tabs">
                    {categories.map(c => (
                      <button
                        key={c}
                        onClick={() => setSelectedCat(c)}
                        className={`cat-tab-btn ${selectedCat === c ? 'active' : ''}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <div className="catalog-search-wrap">
                    <Search size={16} />
                    <input 
                      type="text"
                      placeholder="Buscar producto..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="catalog-search-input"
                    />
                  </div>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="empty-results-box">
                    <Search size={34} className="empty-icon" />
                    <h3>No encontramos productos</h3>
                    <p>No hay coincidencias para &ldquo;{search}&rdquo; en esta sección.</p>
                    <button 
                      onClick={() => { setSearch(''); setSelectedCat('Todos'); }} 
                      className="btn secondary small"
                    >
                      Ver todo el catálogo
                    </button>
                  </div>
                ) : (
                  <div className="products-list-grid">
                    {filteredProducts.map(p => {
                      const quantity = cart[p.id] || 0;
                      return (
                        <article key={p.id} className={`product-item-card ${quantity > 0 ? 'in-cart' : ''}`}>
                          <div className="product-item-info">
                            <div className="product-item-top">
                              <span className="product-cat-tag">{p.category}</span>
                              {p.tag && <span className="product-highlight-tag">{p.tag}</span>}
                            </div>
                            <h3 className="product-name">{p.name}</h3>
                            <p className="product-desc">{p.description}</p>
                            <div className="product-price">
                              ${p.price.toLocaleString('es-AR')}
                            </div>
                          </div>

                          <div className="product-item-action">
                            {quantity === 0 ? (
                              <button 
                                onClick={() => addToCart(p.id)}
                                className="add-product-btn"
                                aria-label={`Agregar ${p.name}`}
                              >
                                <Plus size={16} />
                                <span>Agregar</span>
                              </button>
                            ) : (
                              <div className="quantity-controls">
                                <button onClick={() => removeFromCart(p.id)} className="qty-btn" aria-label="Restar">
                                  <Minus size={14} />
                                </button>
                                <span className="qty-value">{quantity}</span>
                                <button onClick={() => addToCart(p.id)} className="qty-btn" aria-label="Sumar">
                                  <Plus size={14} />
                                </button>
                              </div>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* CART / WHATSAPP ORDER SIDEBAR */}
              <aside className="order-sidebar">
                <div className="order-panel-box">
                  <div className="order-panel-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ShoppingBag size={18} style={{ color: '#164a36' }} />
                      <h3 style={{ margin: 0, fontSize: '16px' }}>Tu Pedido</h3>
                    </div>
                    {cartTotalItems > 0 && (
                      <button 
                        onClick={() => setCart({})}
                        className="clear-cart-link"
                      >
                        Vaciar
                      </button>
                    )}
                  </div>

                  {cartTotalItems === 0 ? (
                    <div className="empty-cart-state">
                      <ShoppingBag size={34} style={{ color: '#96a59b', marginBottom: '10px' }} />
                      <p style={{ margin: '0 0 6px', fontWeight: 600, fontSize: '13px' }}>Tu pedido está vacío</p>
                      <small style={{ color: '#728077', fontSize: '11px' }}>
                        Hacé click en &ldquo;Agregar&rdquo; en cualquier producto para armar tu mensaje de WhatsApp.
                      </small>
                    </div>
                  ) : (
                    <div className="cart-items-list">
                      {Object.entries(cart).map(([id, qty]) => {
                        const product = NUOVO_MARKET_PRODUCTS.find(p => p.id === id);
                        if (!product) return null;
                        return (
                          <div key={id} className="cart-item-row">
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <strong style={{ display: 'block', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {product.name}
                              </strong>
                              <small style={{ color: '#728077', fontSize: '11px' }}>
                                ${product.price.toLocaleString('es-AR')} c/u
                              </small>
                            </div>

                            <div className="cart-qty-inline">
                              <button onClick={() => removeFromCart(id)} className="mini-qty-btn" aria-label="Restar una unidad"><Minus size={11} /></button>
                              <span style={{ fontSize: '12px', fontWeight: 700 }}>{qty}</span>
                              <button onClick={() => addToCart(id)} className="mini-qty-btn" aria-label="Sumar una unidad"><Plus size={11} /></button>
                            </div>

                            <span style={{ fontSize: '12px', fontWeight: 800, minWidth: '60px', textAlign: 'right' }}>
                              ${(product.price * qty).toLocaleString('es-AR')}
                            </span>
                          </div>
                        );
                      })}

                      <div className="cart-total-footer">
                        <div className="cart-total-row">
                          <span>Total estimado:</span>
                          <strong>${cartTotalPrice.toLocaleString('es-AR')}</strong>
                        </div>

                        <a 
                          href={generateWhatsAppUrl()}
                          target="_blank"
                          rel="noreferrer"
                          className="btn primary full-width wa-checkout-btn"
                        >
                          <MessageCircle size={18} />
                          <span>Enviar pedido por WhatsApp</span>
                        </a>

                        <small style={{ display: 'block', color: '#79857d', fontSize: '10px', marginTop: '10px', textAlign: 'center' }}>
                          El mensaje se abre automáticamente en tu WhatsApp con el detalle de items.
                        </small>
                      </div>
                    </div>
                  )}
                </div>

                {/* STORE LOCATION / CONTACT CARD */}
                <div className="store-info-box" style={{ marginTop: '16px' }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '.08em', color: '#728077' }}>
                    Información del Comercio
                  </h4>
                  <div style={{ display: 'grid', gap: '10px', fontSize: '12px' }}>
                    <div>
                      <strong>Ubicación:</strong>
                      <p style={{ margin: '2px 0 0', color: '#68756d' }}>Av. Las Heras 742, Ciudad, Mendoza</p>
                    </div>
                    <div>
                      <strong>Horario de atención:</strong>
                      <p style={{ margin: '2px 0 0', color: '#68756d' }}>Lunes a Domingos de 08:00 a 23:30 hs</p>
                    </div>
                    <div>
                      <strong>Medios de pago en mostrador:</strong>
                      <p style={{ margin: '2px 0 0', color: '#68756d' }}>Efectivo, Débito, Mercado Pago, Transferencia</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* MOBILE FLOATING CART CHECKOUT BAR */}
        {cartTotalItems > 0 && (
          <div className="mobile-floating-cart-bar" id="mobile-cart-bar">
            <div className="mobile-cart-info">
              <span className="mobile-cart-badge">{cartTotalItems}</span>
              <div>
                <small className="mobile-cart-label">Total estimado</small>
                <strong className="mobile-cart-total">${cartTotalPrice.toLocaleString('es-AR')}</strong>
              </div>
            </div>
            <a 
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="btn primary mobile-cart-cta"
            >
              <MessageCircle size={17} />
              <span>Pedir por WhatsApp</span>
            </a>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
