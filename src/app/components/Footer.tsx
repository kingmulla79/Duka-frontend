import Link from "next/link";
import React from "react";
import { FaYoutube } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="border border-[#0000000e] dark:border-[#ffffff1c]" />
        <br />
        <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                About
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Quick Links
              </h3>
              <ul className="space-y-4">
                {/* <li>
                  <Link
                    href="/papers"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Papers
                  </Link>
                </li> */}
                <li>
                  <Link
                    href="/profile"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    My Account
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="/paper-dashboard"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li> */}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Social Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="https://www.youtube.com/channel/UCMmy1Qfc4szvYAfxa_bcPyQ"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white flex flex-row"
                  >
                    <div className="align-middle pt-1">
                      <FaYoutube />
                    </div>{" "}
                    <p className="pl-2">Youtube</p>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/kenyattauniversity/"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white flex flex-row"
                  >
                    <div className="align-middle pt-1">
                      <FaSquareInstagram />
                    </div>{" "}
                    <p className="pl-2">Instagram</p>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/kingmulla79"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white flex flex-row"
                  >
                    <div className="align-middle pt-1">
                      <FaGithub />
                    </div>
                    <div className="pl-2">Github</div>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3">
                Contact Info
              </h3>
              <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                Call Us: +254740455275
              </p>

              <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                {" "}
                Address: Ofafa Jericho Along Shule Road,
              </p>
              <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                <a href="mailto:prelovedbagske@outlook.com">
                  thomasodhiambo800@gmail.com
                </a>
              </p>
            </div>
          </div>
          <br />
          <p className="text-center text-black dark:text-white">
            Copyright © 2025 Ecommerce | All Rights Reserved
          </p>
        </div>
        <br />
      </footer>
    </>
  );
};

export default Footer;
