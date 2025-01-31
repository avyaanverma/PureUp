import React from "react";
import minilogo from "../../../assets/logomini.png";

export const Footer = () => {
  return (
    <footer className="bg-green-900"> {/* Fixed green color in both modes */}
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://PurUp.com/" className="flex items-center">
              <img src={minilogo} className="h-8 me-3" alt="PurUp Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                PureUp
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase">
                Resources
              </h2>
              <ul className="text-gray-300 font-medium">
                <li className="mb-4">
                  <a href="https://PureUp.com/" className="hover:underline">
                    PureUp
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase">
                Follow us
              </h2>
              <ul className="text-gray-300 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/themesberg/PurUp"
                    className="hover:underline"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:underline"
                  >
                    Store
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase">
                Legal
              </h2>
              <ul className="text-gray-300 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-300 sm:text-center">
            © 2024{" "}
            <a href="https://PureUp.com/" className="hover:underline">
              PureUp™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
