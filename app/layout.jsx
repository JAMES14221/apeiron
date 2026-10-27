import './globals.css';
import CosmicBackground from '../components/CosmicBackground';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Aperio Research - Illuminating the Frontiers of Scientific Inquiry',
  description: 'A student-initiated platform designed to democratize the research experience.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CosmicBackground />
        <Navbar />
        <main className="main-content-wrap">{children}</main>
      </body>
    </html>
  );
}
