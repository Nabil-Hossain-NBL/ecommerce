import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '../components/NavBar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Deen Shop',
  description: 'E-commerce platform with modern design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-100`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}