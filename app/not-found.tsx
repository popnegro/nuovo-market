import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: '20px' }}>
      <div>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>404 - Página no encontrada</h1>
        <p style={{ color: '#69746c', marginBottom: '16px' }}>La página que buscás no existe o fue movida.</p>
        <Link href="/" style={{ display: 'inline-block', padding: '10px 18px', background: '#164a36', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
