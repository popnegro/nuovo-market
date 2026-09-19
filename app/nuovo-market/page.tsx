'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { NUOVO_MARKET_PRODUCTS, ProductItem } from '@/lib/data';
import { 
  MapPin, 
  Clock3, 
  Phone, 
  MessageCircle, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Search, 
  CheckCircle2, 
  Share2, 
  ExternalLink,
  Sparkles,
  Zap,
  Coffee,
  Beer,
  ShieldCheck,
  ChevronDown,
  Navigation,
  ArrowRight,
  Store,
  CreditCard,
  Flame,
  Star
} from 'lucide-react';

interface ComboItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  badge: string;
  productIds: string[];
}

const FEATURED_COMBOS: ComboItem[] = [
  {
    id: 'combo-previa',
    name: 'Combo Previa Mendocina',
    desc: '2 Cervezas Andes Origen Rubia 473ml + 1 Papas Lays Clásicas 85g.',
    price: 6400,
    badge: 'Popular',
    productIds: ['p4', 'p4', 'p5']
  },
  {
    id: 'combo-merienda',
    name: 'Combo Merienda Premium',
    desc: '1 Alfajor Havanna 70% Cacao + 1 Coca-Cola 500ml fría.',
    price: 3900,
    badge: 'Recomendado',
    productIds: ['p8', 'p1']
  },
  {
    id: 'combo-energia',
    name: 'Combo Estudio & Trabajo',
    desc: '1 Monster Energy 473ml + 1 Chocolate Cofler Block 110g.',
    price: 5300,
    badge: 'Promo',
    productIds: ['p3', 'p10']
  }
];

export default function NuovoMarketLandingPage() {
  const [selectedCat, setSelectedCat] = useState('Todos');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const addComboToCart = (combo: ComboItem) => {
    setCart(prev => {
      const next = { ...prev };
      combo.productIds.forEach(pid => {
        next[pid] = (next[pid] || 0) + 1;
      });
      return next;
    });
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

  const clearCart = () => setCart({});

  const cartTotalItems = Object.values(cart).reduce((sum, q) => sum + q, 0);

  const cartTotalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = NUOVO_MARKET_PRODUCTS.find(p => p.id === id);
    return sum + (product ? product.price * qty : 0);
  }, 0);

  const generateWhatsAppUrl = (customText?: string) => {
    if (customText) {
      return `https://wa.me/5492615551040?text=${encodeURIComponent(customText)}`;
    }
    const lines: string[] = ['Hola Nuovo Market! Quiero hacer este pedido desde su Landing Page:'];
    Object.entries(cart).forEach(([id, qty]) => {
      const product = NUOVO_MARKET_PRODUCTS.find(p => p.id === id);
      if (product) {
        lines.push(`• ${qty}x ${product.name} ($${(product.price * qty).toLocaleString('es-AR')})`);
      }
    });
    lines.push(`Total estimado: $${cartTotalPrice.toLocaleString('es-AR')}`);
    lines.push('¿Me confirman disponibilidad para retirar por el local de Av. Las Heras? ¡Muchas gracias!');
    return `https://wa.me/5492615551040?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const shareStore = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => prev === index ? null : index);
  };

  return (
    <div className="nuovo-landing-root">
      {/* TOP NOTIFICATION / STATUS STRIP */}
      <aside className="nuovo-topstrip" id="nuovo-topstrip">
        <div className="nuovo-topstrip-inner">
          <div className="nuovo-topstrip-left">
            <span className="nuovo-live-dot"></span>
            <span><strong>Abierto ahora:</strong> 08:00 a 23:30 hs · Av. Las Heras 742, Ciudad de Mendoza</span>
          </div>
          <div className="nuovo-topstrip-right">
            <span className="nuovo-delivery-pill">⚡ Take Away sin filas en 3 min</span>
            <Link href="/kioscos/nuovo-market" className="nuovo-back-link">
              <Store size={14} />
              <span>Ver en Red SmartBarrio</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* DEDICATED HEADER / NAVIGATION */}
      <header className="nuovo-header" id="nuovo-header">
        <div className="nuovo-header-inner">
          <div className="nuovo-brand-group">
            <Link href="/nuovo-market" className="nuovo-brand-link">
              <div className="nuovo-brand-badge">NM</div>
              <div className="nuovo-brand-text">
                <span className="nuovo-brand-title">NUOVO MARKET</span>
                <span className="nuovo-brand-sub">Kiosco & Drugstore Express</span>
              </div>
            </Link>
          </div>

          <nav className="nuovo-nav-menu" aria-label="Navegación Nuovo Market">
            <a href="#promos" className="nuovo-nav-link">Promos</a>
            <a href="#beneficios" className="nuovo-nav-link">Beneficios</a>
            <a href="#catalogo" className="nuovo-nav-link">Catálogo & Precios</a>
            <a href="#ubicacion" className="nuovo-nav-link">Ubicación</a>
            <a href="#faq" className="nuovo-nav-link">Preguntas</a>
          </nav>

          <div className="nuovo-header-actions">
            <a 
              href={generateWhatsAppUrl('Hola Nuovo Market! Estoy viendo su Landing Page y quiero hacer una consulta.')}
              target="_blank"
              rel="noreferrer"
              className="nuovo-cta-wa"
              id="header-wa-cta"
            >
              <MessageCircle size={17} />
              <span>WhatsApp Directo</span>
            </a>
            <a 
              href="#catalogo" 
              className="nuovo-cart-indicator"
              aria-label="Ver carrito de compras"
              id="header-cart-btn"
            >
              <ShoppingBag size={18} />
              {cartTotalItems > 0 && <span className="nuovo-cart-counter">{cartTotalItems}</span>}
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="nuovo-hero-section" id="hero">
          <div className="nuovo-container">
            <div className="nuovo-hero-grid">
              <div className="nuovo-hero-copy">
                <div className="nuovo-hero-tag">
                  <Sparkles size={14} className="text-amber-500" />
                  <span>Tu Kiosco de Confianza en el Centro de Mendoza</span>
                </div>
                <h1 className="nuovo-hero-h1">
                  Todo lo que necesitás al paso, <span className="nuovo-highlight">fresco, helado</span> y al mejor precio de barrio.
                </h1>
                <p className="nuovo-hero-lead">
                  Bebidas al instante, golosinas, chocolates Havanna, snacks crujientes, cigarrillos y artículos de almacén exprés. 
                  Armá tu pedido online y pasalo a retirar sin hacer filas por nuestro local sobre Av. Las Heras.
                </p>

                <div className="nuovo-hero-cta-group">
                  <a href="#catalogo" className="btn primary large nuovo-glow-btn" id="hero-catalog-cta">
                    <ShoppingBag size={19} />
                    <span>Ver Catálogo y Armar Pedido</span>
                  </a>
                  <a 
                    href="https://wa.me/5492615551040?text=Hola%20Nuovo%20Market!%20Quiero%20consultar%20por%20un%20producto."
                    target="_blank"
                    rel="noreferrer"
                    className="btn secondary large"
                    id="hero-wa-btn"
                  >
                    <MessageCircle size={18} />
                    <span>Escribir por WhatsApp</span>
                  </a>
                </div>

                <div className="nuovo-social-proof-strip">
                  <div className="nuovo-sp-item">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Comercio Verificado en Mendoza</span>
                  </div>
                  <div className="nuovo-sp-item">
                    <CreditCard size={16} className="text-blue-600" />
                    <span>Mercado Pago, Débito y Efectivo</span>
                  </div>
                  <div className="nuovo-sp-item">
                    <Clock3 size={16} className="text-amber-600" />
                    <span>Abierto de 08:00 a 23:30 hs</span>
                  </div>
                </div>
              </div>

              <div className="nuovo-hero-card-col">
                <div className="nuovo-store-feature-card">
                  <div className="nuovo-card-header">
                    <div className="nuovo-hero-emblem">
                      <span>NM</span>
                    </div>
                    <div>
                      <h3 className="nuovo-hero-store-title">Nuovo Market</h3>
                      <p className="nuovo-hero-store-sub">Av. Las Heras 742 · Ciudad</p>
                    </div>
                    <span className="nuovo-badge-open">Abierto</span>
                  </div>

                  <div className="nuovo-hero-highlights">
                    <div className="nuovo-hl-box">
                      <Zap size={18} className="text-amber-500" />
                      <div>
                        <strong>Retiro Express</strong>
                        <small>Tu bolsa lista al llegar</small>
                      </div>
                    </div>
                    <div className="nuovo-hl-box">
                      <Beer size={18} className="text-blue-500" />
                      <div>
                        <strong>Heladeras a -2°C</strong>
                        <small>Bebidas heladas reales</small>
                      </div>
                    </div>
                    <div className="nuovo-hl-box">
                      <Coffee size={18} className="text-orange-600" />
                      <div>
                        <strong>Almacén & Kiosco</strong>
                        <small>Todo lo del día a mano</small>
                      </div>
                    </div>
                  </div>

                  <div className="nuovo-promo-callout">
                    <div className="flex items-center gap-2">
                      <Flame size={18} className="text-orange-500" />
                      <strong className="text-sm">Promo Destacada de la Semana</strong>
                    </div>
                    <p className="text-xs text-stone-600 mt-1">
                      2 gaseosas 500ml + papas fritas clásicas a precio preferencial de barrio.
                    </p>
                    <a href="#promos" className="nuovo-quick-link mt-2">
                      <span>Ver promociones y combos</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>

                  <div className="nuovo-quick-contact-row">
                    <a href="tel:2615551040" className="nuovo-icon-action" aria-label="Llamar a Nuovo Market">
                      <Phone size={16} />
                      <span>261 555 1040</span>
                    </a>
                    <button onClick={shareStore} className="nuovo-icon-action" aria-label="Compartir link">
                      <Share2 size={16} />
                      <span>{copied ? '¡Copiado!' : 'Compartir'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFICIOS / POR QUÉ ELEGIRNOS */}
        <section className="nuovo-section bg-stone-50" id="beneficios">
          <div className="nuovo-container">
            <div className="nuovo-section-head">
              <span className="nuovo-pill-tag">Ventajas de Barrio</span>
              <h2 className="nuovo-section-title">¿Por qué comprar en Nuovo Market?</h2>
              <p className="nuovo-section-desc">
                Cuidamos cada detalle para que comprar sea rápido, cómodo y con la atención cálida que caracteriza al comercio mendocino.
              </p>
            </div>

            <div className="nuovo-benefits-grid">
              <article className="nuovo-benefit-card">
                <div className="nuovo-benefit-icon bg-blue-100 text-blue-700">
                  <Zap size={22} />
                </div>
                <h3>Bebidas Siempre Heladas</h3>
                <p>Nuestras heladeras trabajan a temperatura óptima para que tus gaseosas, cervezas y energizantes estén listas para disfrutar.</p>
              </article>

              <article className="nuovo-benefit-card">
                <div className="nuovo-benefit-icon bg-amber-100 text-amber-700">
                  <ShoppingBag size={22} />
                </div>
                <h3>Take Away en 3 Minutos</h3>
                <p>Armá tu pedido desde esta web, mandás el mensaje a WhatsApp y cuando pasás por el local tu pedido ya está empaquetado y listo.</p>
              </article>

              <article className="nuovo-benefit-card">
                <div className="nuovo-benefit-icon bg-emerald-100 text-emerald-700">
                  <CreditCard size={22} />
                </div>
                <h3>Pagos Ágiles y Claros</h3>
                <p>Pagá con QR de Mercado Pago, transferencia bancaria al instante, tarjeta de débito o efectivo al momento de retirar.</p>
              </article>

              <article className="nuovo-benefit-card">
                <div className="nuovo-benefit-icon bg-orange-100 text-orange-700">
                  <MapPin size={22} />
                </div>
                <h3>Ubicación Estratégica</h3>
                <p>En plena Av. Las Heras 742, a pasos del microcentro, con acceso fácil para paradas rápidas y compras al paso.</p>
              </article>
            </div>
          </div>
        </section>

        {/* COMBOS Y PROMOS EXCLUSIVAS */}
        <section className="nuovo-section" id="promos">
          <div className="nuovo-container">
            <div className="nuovo-section-head">
              <span className="nuovo-pill-tag bg-orange-100 text-orange-800">Ahorrá en tu compra</span>
              <h2 className="nuovo-section-title">Combos del Día y Promociones</h2>
              <p className="nuovo-section-desc">
                Seleccionamos las combinaciones más pedidas por nuestros vecinos para que las sumes a tu pedido con un solo clic.
              </p>
            </div>

            <div className="nuovo-combos-grid">
              {FEATURED_COMBOS.map(combo => (
                <div key={combo.id} className="nuovo-combo-card">
                  <div className="nuovo-combo-badge">{combo.badge}</div>
                  <h3 className="nuovo-combo-title">{combo.name}</h3>
                  <p className="nuovo-combo-desc">{combo.desc}</p>
                  <div className="nuovo-combo-price-row">
                    <div>
                      <small className="text-stone-500 block text-xs">Precio Especial</small>
                      <strong className="nuovo-combo-price">${combo.price.toLocaleString('es-AR')}</strong>
                    </div>
                    <button 
                      onClick={() => addComboToCart(combo)}
                      className="btn primary small nuevo-combo-btn"
                      aria-label={`Agregar ${combo.name} al pedido`}
                    >
                      <Plus size={15} />
                      <span>Agregar al Pedido</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE CATALOG & WHATSAPP ORDER SECTION */}
        <section className="nuovo-section bg-stone-50" id="catalogo">
          <div className="nuovo-container">
            <div className="nuovo-section-head">
              <span className="nuovo-pill-tag">Catálogo Completo</span>
              <h2 className="nuovo-section-title">Elegí tus productos y armá tu pedido</h2>
              <p className="nuovo-section-desc">
                Explorá precios actualizados, sumá productos a tu canasta y generá el pedido oficial por WhatsApp para retirar sin esperas.
              </p>
            </div>

            <div className="catalog-layout">
              {/* PRODUCTS COLUMN */}
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
                      placeholder="Buscar por nombre o marca..."
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
                                <button onClick={() => removeFromCart(p.id)} className="qty-btn" aria-label="Restar una unidad">
                                  <Minus size={14} />
                                </button>
                                <span className="qty-value">{quantity}</span>
                                <button onClick={() => addToCart(p.id)} className="qty-btn" aria-label="Sumar una unidad">
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

              {/* CART SIDEBAR */}
              <aside className="catalog-sidebar">
                <div className="cart-sidebar-card">
                  <div className="cart-card-head">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ShoppingBag size={18} className="text-emerald-700" />
                      <strong>Tu Pedido</strong>
                    </div>
                    {cartTotalItems > 0 && (
                      <button onClick={clearCart} className="cart-clear-btn">
                        Vaciar
                      </button>
                    )}
                  </div>

                  {cartTotalItems === 0 ? (
                    <div className="cart-empty-state">
                      <div className="cart-empty-icon">
                        <ShoppingBag size={28} />
                      </div>
                      <p className="cart-empty-title">Tu canasta está vacía</p>
                      <small className="cart-empty-subtitle">
                        Hacé clic en &ldquo;Agregar&rdquo; en cualquiera de nuestros productos para armar tu pedido.
                      </small>
                    </div>
                  ) : (
                    <div className="cart-active-state">
                      <div className="cart-items-scroll">
                        {Object.entries(cart).map(([id, qty]) => {
                          const product = NUOVO_MARKET_PRODUCTS.find(p => p.id === id);
                          if (!product) return null;
                          return (
                            <div key={id} className="cart-line-item">
                              <div className="cart-item-title-group">
                                <span className="cart-item-name">{product.name}</span>
                                <small className="cart-item-unit-price">${product.price.toLocaleString('es-AR')} c/u</small>
                              </div>

                              <div className="cart-qty-inline">
                                <button onClick={() => removeFromCart(id)} className="mini-qty-btn" aria-label="Restar una unidad">
                                  <Minus size={11} />
                                </button>
                                <span style={{ fontSize: '12px', fontWeight: 700 }}>{qty}</span>
                                <button onClick={() => addToCart(id)} className="mini-qty-btn" aria-label="Sumar una unidad">
                                  <Plus size={11} />
                                </button>
                              </div>

                              <span style={{ fontSize: '12px', fontWeight: 800, minWidth: '60px', textAlign: 'right' }}>
                                ${(product.price * qty).toLocaleString('es-AR')}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="cart-summary-box">
                        <div className="cart-summary-row">
                          <span>Total ({cartTotalItems} items)</span>
                          <strong className="cart-total-amount">${cartTotalPrice.toLocaleString('es-AR')}</strong>
                        </div>
                        <small className="cart-summary-note">
                          * Precios sujetos a stock al momento de enviar el mensaje a WhatsApp.
                        </small>
                      </div>

                      <a 
                        href={generateWhatsAppUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="btn primary full-width wa-checkout-btn"
                        id="sidebar-wa-submit-btn"
                      >
                        <MessageCircle size={18} />
                        <span>Enviar Pedido por WhatsApp</span>
                      </a>
                    </div>
                  )}

                  <div className="cart-help-strip">
                    <CheckCircle2 size={15} className="text-emerald-600" />
                    <span>Confirmación directa e inmediata con el personal de Nuovo Market</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* UBICACION & CONTACTO */}
        <section className="nuovo-section" id="ubicacion">
          <div className="nuovo-container">
            <div className="nuovo-section-head">
              <span className="nuovo-pill-tag">Dónde Estamos</span>
              <h2 className="nuovo-section-title">Vení a conocernos a Av. Las Heras</h2>
              <p className="nuovo-section-desc">
                Estamos en una de las avenidas más transitadas y comerciales de Mendoza. Fácil de estacionar rápido o pasar a pie.
              </p>
            </div>

            <div className="nuovo-location-grid">
              <div className="nuovo-loc-info-card">
                <div className="nuovo-loc-item">
                  <div className="nuovo-loc-icon"><MapPin size={20} /></div>
                  <div>
                    <strong>Dirección del Local</strong>
                    <p>Av. Las Heras 742, Ciudad de Mendoza (entre Perú y 25 de Mayo)</p>
                  </div>
                </div>

                <div className="nuovo-loc-item">
                  <div className="nuovo-loc-icon"><Clock3 size={20} /></div>
                  <div>
                    <strong>Horarios de Atención</strong>
                    <p>Lunes a Domingos: 08:00 a 23:30 hs (Abierto feriados)</p>
                  </div>
                </div>

                <div className="nuovo-loc-item">
                  <div className="nuovo-loc-icon"><Phone size={20} /></div>
                  <div>
                    <strong>Contacto & WhatsApp</strong>
                    <p>WhatsApp: +54 9 261 555-1040 · Tel: 261 555 1040</p>
                  </div>
                </div>

                <div className="nuovo-loc-item">
                  <div className="nuovo-loc-icon"><CreditCard size={20} /></div>
                  <div>
                    <strong>Formas de Pago</strong>
                    <p>Efectivo, Mercado Pago con QR, Transferencias y Tarjetas de Débito</p>
                  </div>
                </div>

                <div className="nuovo-loc-actions">
                  <a 
                    href="https://maps.google.com/?q=Av.+Las+Heras+742,+Mendoza" 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn primary"
                    id="maps-direction-btn"
                  >
                    <Navigation size={17} />
                    <span>Cómo Llegar con Google Maps</span>
                  </a>
                  <a 
                    href="tel:2615551040" 
                    className="btn secondary"
                  >
                    <Phone size={17} />
                    <span>Llamar al Local</span>
                  </a>
                </div>
              </div>

              <div className="nuovo-map-preview-card">
                <div className="nuovo-map-mockup">
                  <div className="nuovo-map-pin-badge">
                    <MapPin size={18} className="text-white" />
                    <span>Nuovo Market · Av. Las Heras 742</span>
                  </div>
                  <div className="nuovo-map-coords">
                    Ciudad de Mendoza · Microcentro
                  </div>
                </div>
                <div className="nuovo-map-footer">
                  <span>Puntos de referencia cercanos: Plaza Independencia (6 cuadras), Calle San Martín (4 cuadras).</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIOS VECINALES */}
        <section className="nuovo-section bg-stone-50" id="testimonios">
          <div className="nuovo-container">
            <div className="nuovo-section-head">
              <span className="nuovo-pill-tag">Comunidad Vecinal</span>
              <h2 className="nuovo-section-title">Lo que dicen quienes nos eligen</h2>
              <p className="nuovo-section-desc">
                Vecinos, trabajadores de la zona y transeúntes que confían en nosotros todos los días.
              </p>
            </div>

            <div className="nuovo-testimonials-grid">
              <div className="nuovo-testimonial-card">
                <div className="nuovo-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p>&ldquo;Paso siempre antes de entrar a la oficina sobre Las Heras. Las gaseosas están verdaderamente heladas y te atienden con una sonrisa siempre.&rdquo;</p>
                <div className="nuovo-author">
                  <strong>Facundo R.</strong>
                  <small>Vecino de Ciudad</small>
                </div>
              </div>

              <div className="nuovo-testimonial-card">
                <div className="nuovo-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p>&ldquo;El sistema de mandar el pedido por WhatsApp es comodísimo. Salgo del trabajo, paso por la vereda y ya me tienen la bolsa armada. Un 10.&rdquo;</p>
                <div className="nuovo-author">
                  <strong>Mariana S.</strong>
                  <small>Clienta habitual</small>
                </div>
              </div>

              <div className="nuovo-testimonial-card">
                <div className="nuovo-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p>&ldquo;Tienen una variedad tremenda de golosinas y alfajores. El Havanna de chocolate amargo siempre en stock y a precio justo.&rdquo;</p>
                <div className="nuovo-author">
                  <strong>Ignacio G.</strong>
                  <small>Las Heras / Mendoza</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PREGUNTAS FRECUENTES (FAQ) */}
        <section className="nuovo-section" id="faq">
          <div className="nuovo-container max-w-3xl">
            <div className="nuovo-section-head">
              <span className="nuovo-pill-tag">Dudas Habituales</span>
              <h2 className="nuovo-section-title">Preguntas Frecuentes</h2>
              <p className="nuovo-section-desc">
                Todo lo que necesitás saber antes de hacer tu pedido o visitarnos.
              </p>
            </div>

            <div className="nuovo-faq-list">
              {[
                {
                  q: '¿Cómo funciona el pedido por WhatsApp?',
                  a: 'Elegís los productos desde el catálogo de esta página, hacés clic en "Enviar Pedido por WhatsApp", y se abrirá tu aplicación con el detalle de items y el monto total ya calculado. El equipo de Nuovo Market te responderá al instante confirmando el retiro.'
                },
                {
                  q: '¿Tienen servicio de entrega o delivery?',
                  a: 'Nuestro servicio principal es Take Away sin filas en el local de Av. Las Heras 742. Para pedidos en zonas aledañas del centro, podés consultar al WhatsApp disponibilidad y costo de cadetería barrial.'
                },
                {
                  q: '¿Qué formas de pago puedo utilizar?',
                  a: 'Aceptamos transferencias por Mercado Pago (CVU/Alias), QR en el local, tarjetas de débito y efectivo al momento de retirar.'
                },
                {
                  q: '¿Disponen de recargas de SUBE y telefonía?',
                  a: 'Sí, contamos con terminal habilitada para carga de tarjeta SUBE y recargas virtuales de todas las empresas de telefonía móvil.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="nuovo-faq-item">
                  <button 
                    onClick={() => toggleFaq(idx)} 
                    className="nuovo-faq-toggle"
                    aria-expanded={openFaq === idx}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className={`nuovo-faq-arrow ${openFaq === idx ? 'rotated' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="nuovo-faq-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="nuovo-bottom-cta">
          <div className="nuovo-container">
            <div className="nuovo-cta-card">
              <div className="nuovo-cta-card-content">
                <span className="nuovo-cta-tag">Atención Inmediata</span>
                <h2>¿Necesitás algo ahora mismo?</h2>
                <p>Escribinos directamente al WhatsApp del local y te preparamos lo que busques en minutos.</p>
                <div className="nuovo-cta-card-actions">
                  <a 
                    href="https://wa.me/5492615551040?text=Hola%20Nuovo%20Market!%20Quiero%20hacer%20un%20pedido%20urgente."
                    target="_blank"
                    rel="noreferrer"
                    className="btn primary large nuovo-glow-btn"
                  >
                    <MessageCircle size={19} />
                    <span>Mandar WhatsApp a Nuovo Market</span>
                  </a>
                  <a href="#catalogo" className="btn secondary large bg-white">
                    <ShoppingBag size={18} />
                    <span>Armar Pedido Online</span>
                  </a>
                </div>
              </div>
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

      {/* DEDICATED FOOTER */}
      <footer className="nuovo-footer">
        <div className="nuovo-container">
          <div className="nuovo-footer-grid">
            <div>
              <div className="nuovo-brand-link mb-3">
                <div className="nuovo-brand-badge">NM</div>
                <div className="nuovo-brand-text">
                  <span className="nuovo-brand-title">NUOVO MARKET</span>
                  <span className="nuovo-brand-sub">Mendoza, Argentina</span>
                </div>
              </div>
              <p className="text-sm text-stone-500 max-w-sm">
                Kiosco y drugstore barrial sobre Av. Las Heras 742. Bebidas frías, golosinas, cigarrillos y atención cercana todos los días.
              </p>
            </div>

            <div>
              <h4 className="nuovo-footer-title">Navegación</h4>
              <ul className="nuovo-footer-links">
                <li><a href="#hero">Inicio</a></li>
                <li><a href="#beneficios">Beneficios</a></li>
                <li><a href="#promos">Combos & Promociones</a></li>
                <li><a href="#catalogo">Catálogo Interactivo</a></li>
                <li><a href="#ubicacion">Ubicación y Horarios</a></li>
              </ul>
            </div>

            <div>
              <h4 className="nuovo-footer-title">Red SmartBarrio</h4>
              <ul className="nuovo-footer-links">
                <li><Link href="/">Marketplace SmartBarrio</Link></li>
                <li><Link href="/kioscos">Directorio de Kioscos</Link></li>
                <li><Link href="/kioscos/nuovo-market">Perfil en SmartBarrio</Link></li>
                <li><Link href="/admin">Panel de Comercio</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="nuovo-footer-title">Contacto</h4>
              <p className="text-sm text-stone-600 mb-2">Av. Las Heras 742, Mendoza</p>
              <p className="text-sm text-stone-600 mb-2">Tel: 261 555 1040</p>
              <p className="text-sm text-stone-600 mb-3">Horario: 08:00 a 23:30 hs</p>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 size={12} />
                <span>Comercio Verificado</span>
              </span>
            </div>
          </div>

          <div className="nuovo-footer-bottom">
            <p>© {new Date().getFullYear()} Nuovo Market. Todos los derechos reservados.</p>
            <p className="flex items-center gap-2">
              <span>Impulsado por</span>
              <Link href="/" className="font-semibold text-emerald-800 hover:underline">
                SmartBarrio Mendoza
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
