import Link from 'next/link';
import { CATEGORIES } from '@/lib/data';
import { MapPin, MessageCircle, Store, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-wrap">
        <div className="footer-grid">
          <div className="footer-col-brand">
            <div className="brand" style={{ marginBottom: '14px' }}>
              <span className="brand-mark">SB</span>
              <span>SmartBarrio</span>
            </div>
            <p style={{ fontSize: '13px', color: '#68756d', lineHeight: '1.6', margin: '0 0 16px', maxWidth: '320px' }}>
              La plataforma de presencia digital, catálogo interactivo y pedidos directos por WhatsApp para comercios barriales de Mendoza.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#164a36', fontWeight: 600 }}>
              <MapPin size={15} />
              <span>Mendoza, Argentina</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '.1em', color: '#728077', margin: '0 0 14px', fontWeight: 800 }}>
              Categorías de Barrio
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', fontSize: '13px' }}>
              {CATEGORIES.map(c => (
                <Link key={c.slug} href={`/${c.slug}`} className="footer-link">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '.1em', color: '#728077', margin: '0 0 14px', fontWeight: 800 }}>
              Accesos Directos
            </h4>
            <div style={{ display: 'grid', gap: '8px', fontSize: '13px' }}>
              <Link href="/kioscos/nuovo-market" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Store size={14} />
                <span>Demo: Nuovo Market</span>
                <ExternalLink size={12} />
              </Link>
              <Link href="/admin" className="footer-link">
                Panel de Administración
              </Link>
              <Link href="/#como-funciona" className="footer-link">
                Cómo funciona
              </Link>
              <a 
                href="https://wa.me/5492615551040?text=Hola%20SmartBarrio,%20quiero%20sumar%20mi%20comercio" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-link"
                style={{ color: '#164a36', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <MessageCircle size={14} />
                <span>Sumá tu comercio a SmartBarrio</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 SmartBarrio Mendoza. Todos los derechos reservados.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Comercio de proximidad sin comisiones de intermediarios</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
