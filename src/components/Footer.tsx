import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube } from "lucide-react";

interface FooterImage {
  name: string;
  imageUrl: string;
}

const paymentMethods: FooterImage[] = [
  {
    name: "bKash",
    imageUrl: "https://i.ibb.co.com/FnPHgdL/bkash.png",
  },
  {
    name: "Nagad",
    imageUrl: "https://i.ibb.co.com/MV7F1ty/nagad.png",
  },
  {
    name: "Rocket",
    imageUrl: "	https://i.ibb.co.com/jW8bW1C/rocket.png",
  },
  {
    name: "VISA",
    imageUrl: "	https://i.ibb.co.com/brVKzvx/visa.png",
  },
];

const shippingPartners: FooterImage[] = [
  {
    name: "Pathao",
    imageUrl: "	https://i.ibb.co.com/VjnfDGR/pathao.jpg",
  },
  {
    name: "REDX",
    imageUrl: "https://i.ibb.co.com/xhcfGJh/redx.png",
  },
  {
    name: "SteadFast",
    imageUrl: "https://i.ibb.co.com/NLxRSRJ/steadfast.png",
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white px-3 py-2 rounded">
                <span className="text-black font-bold text-xl">D</span>
              </div>
              <div>
                <span className="text-white font-bold text-xl">DEEN </span>
                <span className="text-blue-500 font-bold text-xl">FASHION</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Deen Fashion BD is your go-to destination for premium Islamic and
              modest clothing in Bangladesh. We bring you elegant abayas,
              stylish panjabis, comfortable kurtas, hijabs, and more — all
              designed to reflect your values with fashion. Experience reliable
              service, affordable prices, and fast delivery across the country.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              INFORMATION
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/shipment-policy"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Shipment Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/care-instructions"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Care Instructions
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              QUICK LINK
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/new-arrival"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  New Arrival
                </Link>
              </li>
              <li>
                <Link
                  href="/offer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Offer
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">PROFILE</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/order-tracking"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div>
              <h4 className="text-white font-semibold mb-4">Payment System:</h4>
              <div className="flex items-center gap-3 flex-wrap">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="bg-white rounded px-3 py-2 w-20 h-10 flex items-center justify-center"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={method.imageUrl}
                        alt={`payment method ${method.name}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">
                Shipping Partner:
              </h4>
              <div className="flex items-center gap-3 flex-wrap">
                {shippingPartners.map((partner) => (
                  <div
                    key={partner.name}
                    className="bg-white rounded px-3 py-2 w-20 h-10 flex items-center justify-center"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={partner.imageUrl}
                        alt={`shipping partner ${partner.name}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">
                Our Social Links:
              </h4>
              <div className="flex items-center gap-3">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="bg-blue-600 hover:bg-blue-700 p-3 rounded transition-colors"
                >
                  <Facebook size={20} />
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 hover:opacity-90 p-3 rounded transition-opacity"
                >
                  <Instagram size={20} />
                </Link>
                <Link
                  href="https://tiktok.com"
                  target="_blank"
                  className="bg-black hover:bg-gray-900 border border-white p-3 rounded transition-colors"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </Link>
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  className="bg-red-600 hover:bg-red-700 p-3 rounded transition-colors"
                >
                  <Youtube size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Deen Fashion BD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
