import Link from 'next/link';
import { MapPin, Clock3, MessageCircle, ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { Store } from '@/lib/data';

interface Props {
  store: Store;
}

export default function StoreCard({ store }: Props) {
  const initials = store.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('');

  return (
    <article className="store-card-modern">
      <div className="store-card-top">
        <div className={`store-avatar-box ${store.accent}`}>
          <span>{initials}</span>
        </div>

        <div className="store-meta-info">
          <div className="store-category-row">
            <span className={`cat-pill ${store.accent}`}>{store.categoryName}</span>
            <span className="verified-badge">
              <CheckCircle2 size={13} />
              <span>Verificado</span>
            </span>
          </div>
          <h3 className="store-title">{store.name}</h3>
        </div>
      </div>

      <p className="store-tagline">{store.tagline}</p>

      <div className="store-details-list">
        <div className="store-detail-row">
          <MapPin size={14} className="detail-icon" />
          <span>{store.address}</span>
        </div>
        <div className="store-detail-row">
          <Clock3 size={14} className="detail-icon" />
          <span>{store.hours}</span>
        </div>
      </div>

      {store.promos && store.promos.length > 0 && (
        <div className="store-promo-highlight">
          <small>PROMO ACTIVA</small>
          <strong>{store.promos[0]}</strong>
        </div>
      )}

      <div className="store-card-actions">
        <Link href={store.path} className="btn primary store-view-btn">
          <span>Ver catálogo</span>
          <ArrowUpRight size={15} />
        </Link>

        <a 
          href={`https://wa.me/${store.wa}?text=${encodeURIComponent(`Hola ${store.name}, vi su comercio en SmartBarrio y quisiera hacerles una consulta.`)}`}
          target="_blank"
          rel="noreferrer"
          className="btn secondary wa-store-btn"
          aria-label={`Contactar a ${store.name} por WhatsApp`}
        >
          <MessageCircle size={15} />
          <span>WhatsApp</span>
        </a>
      </div>
    </article>
  );
}
