import Link from "next/link";
import React from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="border border-[#0000000e] dark:border-[#ffffff1c]" />
        <br />
        <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex flex-col text-center place-content-center sm:grid gap-8 sm:grid-cols-2 md:flex md:flex-row md:justify-between md:text-left">
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                About
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="text-[13px] sm:text-[16px] md:text-[16px] text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-[13px] sm:text-[16px] md:text-[16px] text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-[13px] sm:text-[16px] md:text-[16px] text-black dark:text-gray-300 dark:hover:text-white"
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
                <li>
                  <Link
                    href="/profile"
                    className="text-[13px] sm:text-[16px] md:text-[16px] text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-[13px] sm:text-[16px] md:text-[16px] text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Home
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Social Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="https://www.youtube.com"
                    className="text-[13px] sm:text-[16px] md:text-[16px] text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    <YouTubeIcon /> Youtube
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/"
                    className="text-[13px] sm:text-[16px] md:text-[16px] text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    <InstagramIcon /> Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/kingmulla79"
                    className="text-[13px] sm:text-[16px] md:text-[16px] text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    <GitHubIcon /> Github
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3">
                Contact Info
              </h3>
              <p className="text-[13px] sm:text-[16px] md:text-[16px] text-black dark:text-gray-300 dark:hover:text-white pb-2">
                <LocalPhoneIcon /> +254740455275
              </p>

              <p className="text-[13px] sm:text-[16px] md:text-[16px] text-black dark:text-gray-300 dark:hover:text-white pb-2">
                {" "}
                <BusinessIcon /> Ofafa Jericho Along Shule Road
              </p>
              <p className="text-[13px] sm:text-[16px] md:text-[16px] text-black dark:text-gray-300 dark:hover:text-white pb-2">
                <a href="mailto:prelovedbagske@outlook.com">
                  <EmailIcon /> thomasodhiambo800@gmail.com
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
