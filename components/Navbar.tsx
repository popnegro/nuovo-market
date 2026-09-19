'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  MapPin, 
  Settings2, 
  Menu, 
  X, 
  Store, 
  ChevronRight, 
  ShoppingBag, 
  Apple, 
  Beef, 
  Scissors, 
  Wrench, 
  Dog, 
  Heart,
  ExternalLink
} from 'lucide-react';
import { CATEGORIES } from '@/lib/data';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Store': return <Store size={16} />;
      case 'ShoppingBag': return <ShoppingBag size={16} />;
      case 'Apple': return <Apple size={16} />;
      case 'Beef': return <Beef size={16} />;
      case 'Scissors': return <Scissors size={16} />;
      case 'Wrench': return <Wrench size={16} />;
      case 'Dog': return <Dog size={16} />;
      case 'Heart': return <Heart size={16} />;
      default: return <Store size={16} />;
    }
  };

  return (
    <>
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <strong>SmartBarrio</strong>
          <span>Comercios locales de Mendoza · Presencia digital & WhatsApp directo</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <Link href="/nuovo-market" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#f97316', color: '#fff', padding: '2px 9px', borderRadius: '4px', fontWeight: 700 }}>
            <span>Landing Nuovo Market</span>
            <ExternalLink size={12} />
          </Link>
          <Link href="/kioscos/nuovo-market" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <span>Demo Perfil</span>
            <ExternalLink size={12} />
          </Link>
          <Link href="/admin" style={{ background: '#d7ef47', color: '#172019' }}>
            Panel Admin
          </Link>
        </div>
      </div>

      <header className="public-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          <Link href="/" className="brand">
            <span className="brand-mark">SB</span>
            <span>SmartBarrio</span>
          </Link>

          <div className="location-pill-nav" style={{ display: 'none' }}>
            <MapPin size={13} style={{ color: '#164a36' }} />
            <span>Mendoza, Arg</span>
          </div>

          <nav className="desktop-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '12px' }}>
            <Link 
              href="/" 
              className={`nav-link-item ${pathname === '/' ? 'active' : ''}`}
            >
              Inicio
            </Link>
            <Link 
              href="/#categorias" 
              className="nav-link-item"
            >
              Categorías
            </Link>
            <Link 
              href="/kioscos" 
              className={`nav-link-item ${pathname.startsWith('/kioscos') && pathname !== '/kioscos/nuovo-market' ? 'active' : ''}`}
            >
              Kioscos
            </Link>
            <Link 
              href="/kioscos/nuovo-market" 
              className={`nav-link-item ${pathname === '/kioscos/nuovo-market' ? 'active' : ''}`}
            >
              Nuovo Market
            </Link>
            <Link 
              href="/#destacados" 
              className="nav-link-item"
            >
              Destacados
            </Link>
          </nav>
        </div>

        <div className="public-nav-right">
          <span className="demo-pill" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <MapPin size={12} style={{ color: '#164a36' }} />
            Mendoza
          </span>

          <Link href="/admin" className="btn secondary small" style={{ display: 'inline-flex' }}>
            <Settings2 size={15} />
            <span>Panel Admin</span>
          </Link>

          <button 
            className="icon-btn mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-drawer">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e6ebe6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>Navegación SmartBarrio</strong>
            <button className="icon-btn" onClick={() => setMobileOpen(false)} aria-label="Cerrar menú"><X size={18} /></button>
          </div>
          <div style={{ padding: '14px 16px', display: 'grid', gap: '4px' }}>
            <Link 
              href="/" 
              onClick={() => setMobileOpen(false)}
              className="mobile-nav-item"
              style={{ fontWeight: pathname === '/' ? '700' : '500' }}
            >
              <span>Inicio</span>
              <ChevronRight size={16} />
            </Link>
            <Link 
              href="/nuovo-market" 
              onClick={() => setMobileOpen(false)}
              className="mobile-nav-item"
              style={{ background: '#fff7ed', color: '#c2410c', fontWeight: '800', border: '1px solid #fed7aa' }}
            >
              <span>🔥 Landing: Nuovo Market</span>
              <ExternalLink size={16} />
            </Link>
            <Link 
              href="/kioscos/nuovo-market" 
              onClick={() => setMobileOpen(false)}
              className="mobile-nav-item"
              style={{ background: '#f0f6ee', color: '#164a36', fontWeight: '700' }}
            >
              <span>Demo Perfil: Nuovo Market</span>
              <ExternalLink size={16} />
            </Link>
            <Link 
              href="/admin" 
              onClick={() => setMobileOpen(false)}
              className="mobile-nav-item"
              style={{ background: '#172019', color: '#d7ef47', fontWeight: '700' }}
            >
              <span>Panel de Administración</span>
              <ChevronRight size={16} />
            </Link>

            <div style={{ margin: '14px 0 6px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.1em', color: '#728077', fontWeight: 800 }}>
              Las 8 Categorías
            </div>

            {CATEGORIES.map(cat => (
              <Link 
                key={cat.slug}
                href={`/${cat.slug}`}
                onClick={() => setMobileOpen(false)}
                className="mobile-nav-item"
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {getCategoryIcon(cat.icon)}
                  {cat.name}
                </span>
                <span style={{ fontSize: '11px', color: '#828e85' }}>{cat.merchantCount}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
