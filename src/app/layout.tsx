import type { Metadata, Viewport } from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'LAEYNE Studio Lash',
  description: 'Sistema de gestão premium para lash designer',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'LAEYNE',
    startupImage: [
      { url: '/splash/splash-1170x2532.png', media: '(device-width:390px) and (device-height:844px) and (-webkit-device-pixel-ratio:3)' },
      { url: '/splash/splash-1284x2778.png', media: '(device-width:428px) and (device-height:926px) and (-webkit-device-pixel-ratio:3)' },
      { url: '/splash/splash-1125x2436.png', media: '(device-width:375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3)' },
      { url: '/splash/splash-1242x2688.png', media: '(device-width:414px) and (device-height:896px) and (-webkit-device-pixel-ratio:3)' },
      { url: '/splash/splash-828x1792.png',  media: '(device-width:414px) and (device-height:896px) and (-webkit-device-pixel-ratio:2)' },
      { url: '/splash/splash-750x1334.png',  media: '(device-width:375px) and (device-height:667px) and (-webkit-device-pixel-ratio:2)' },
      { url: '/splash/splash-1536x2048.png', media: '(device-width:768px) and (device-height:1024px) and (-webkit-device-pixel-ratio:2)' },
      { url: '/splash/splash-2048x2732.png', media: '(device-width:1024px) and (device-height:1366px) and (-webkit-device-pixel-ratio:2)' },
    ],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-57x57.png',   sizes: '57x57'   },
      { url: '/icons/icon-60x60.png',   sizes: '60x60'   },
      { url: '/icons/icon-72x72.png',   sizes: '72x72'   },
      { url: '/icons/icon-76x76.png',   sizes: '76x76'   },
      { url: '/icons/icon-114x114.png', sizes: '114x114' },
      { url: '/icons/icon-120x120.png', sizes: '120x120' },
      { url: '/icons/icon-144x144.png', sizes: '144x144' },
      { url: '/icons/icon-152x152.png', sizes: '152x152' },
      { url: '/icons/icon-167x167.png', sizes: '167x167' },
      { url: '/icons/icon-180x180.png', sizes: '180x180' },
    ],
  },
  other: {
    'mobile-web-app-capable':  'yes',
    'msapplication-TileColor': '#0A0A0A',
    'msapplication-TileImage': '/icons/icon-144x144.png',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0A0A0A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased">
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
