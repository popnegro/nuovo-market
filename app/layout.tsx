import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SmartBarrio',
  description: 'Presencia digital para comercios locales de Mendoza con catálogo interactivo, WhatsApp y panel de administración.',
  openGraph: {
    title: 'SmartBarrio',
    description: 'Presencia digital para comercios locales de Mendoza con catálogo interactivo, WhatsApp y panel de administración.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
