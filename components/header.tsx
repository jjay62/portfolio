import React from "react";
import { PortfolioClickableBrand } from "@/components/PortfolioClickableBrand";

const Header = () => {
  return (
    <nav className="bg-gray-850 text-white py-6 border-b border-white/30 sticky top-0 z-50 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950">
      <div className="container mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6">
        <div className="min-w-0 justify-self-start">
          <h1 className="text-white text-2xl font-bold tracking-wide uppercase">
            <PortfolioClickableBrand className="inline-block cursor-pointer select-none rounded-md px-0.5 outline-offset-4 hover:text-blue-200/90">
              portfolio
            </PortfolioClickableBrand>
          </h1>
        </div>
        <ul className="flex flex-row flex-wrap justify-center gap-6 text-sm font-bold uppercase text-white">
          <li>
            <a
              href="#hero"
              className="hover:text-gray-200 transition-all duration-300 hover:underline"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#personal-about"
              className="hover:text-gray-200 transition-all duration-300 hover:underline"
            >
              Over mij
            </a>
          </li>
          <li>
            <a
              href="#kennis"
              className="hover:text-gray-200 transition-all duration-300 hover:underline"
            >
              Kennis
            </a>
          </li>
          <li>
            <a
              href="#projecten"
              className="hover:text-gray-200 transition-all duration-300 hover:underline"
            >
              Projecten
            </a>
          </li>
        </ul>
        <div className="min-w-0" aria-hidden />
      </div>
    </nav>
  );
};

export default Header;