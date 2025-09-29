import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from './components/NavBar';

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
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2025 Deen Shop. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}