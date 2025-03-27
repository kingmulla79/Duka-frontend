import React, { useEffect } from "react";
import Ecommerce from "../../../../public/assets/ecommerce.svg";
import Blog from "../../../../public/assets/blog.webp";
import Business from "../../../../public/assets/money-tree.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { styles } from "@/app/styles/style";
import Image from "next/image";

const Display = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  });
  return (
    <>
      <h3 className="font-Poppins text-black dark:text-white font-bold text-[18px] md:text-[25px] text-center">
        Why use our services
      </h3>
      <div className="py-10 grid place-items-center md:w-[90%] md:mx-auto">
        {/* {" "}
        gap-y-28 */}
        <div className="min-h-screen flex justify-center items-center bg-shopping247 bg-cover bg-center bg-no-repeat bg-fixed">
          <div
            className="800px:w-[55%] w-[75%] relative border rounded-lg !bg-[rgba(255,255,255,0.8)] bg-no-repeat dark:bg-gradient-to-b dark:from-[rgb(17,24,39,0.8)] dark:to-[rgba(8,11,18,0.8)] shadow-lg p-8 space-y-4"
            data-aos="fade-up"
          >
            <Image
              src={Ecommerce}
              width={50}
              height={50}
              alt="Ecommerce"
              className="size-12 absolute -top-5"
            />
            <h3 className={`text-2xl font-bold ${styles.label}`}>
              24/7 Shopping and Customer Support
            </h3>
            <p
              className={`text-base leading-relaxed tracking-wide ${styles.label}`}
            >
              We understand that waiting for your order can be frustrating,
              which is why we offer fast and reliable shipping. With real-time
              tracking, estimated delivery dates, and express options,
              you&#39;ll know exactly when to expect your package. We partner
              with trusted carriers to ensure safe and timely delivery. Also,
              having a question or need assistance? Our dedicated customer
              support team is available around the clock to help you. Whether
              through live chat, email, or phone, we&#39;re here to provide
              quick and efficient solutions to ensure you have a smooth shopping
              experience.
            </p>
          </div>
        </div>
        <div className="min-h-screen flex justify-center items-center bg-personalized bg-cover bg-center bg-no-repeat bg-fixed">
          <div
            className="800px:w-[55%] w-[75%] relative border rounded-lg !bg-[rgba(255,255,255,0.8)] bg-no-repeat dark:bg-gradient-to-b dark:from-[rgb(17,24,39,0.8)] dark:to-[rgba(8,11,18,0.8)] shadow-lg p-8 space-y-4"
            data-aos="fade-up"
          >
            <Image
              src={Blog}
              alt="webApp"
              width={50}
              height={50}
              className="w-[70px] absolute -top-6"
            />
            <h3 className={`text-2xl font-bold ${styles.label}`}>
              Personalized Shopping Experience
            </h3>
            <p
              className={`text-base leading-relaxed tracking-wide ${styles.label}`}
            >
              We use advanced AI-driven recommendations to personalize your
              shopping experience. Based on your browsing history, preferences,
              and past purchases, we suggest products that match your needs,
              making shopping faster, easier, and more enjoyable. Our growing
              community of satisfied customers speaks for itself. With thousands
              of positive reviews and repeat shoppers, we&#39;ve built a
              reputation for reliability, quality, and outstanding service. Join
              our happy customers and experience the difference today!
            </p>
          </div>
        </div>
        <div className="min-h-screen flex justify-center items-center bg-saletag bg-cover bg-no-repeat bg-fixed bg-center">
          <div
            className="800px:w-[55%] w-[75%] relative border rounded-lg shadow-lg !bg-[rgba(255,255,255,0.8)] bg-no-repeat dark:bg-gradient-to-b dark:from-[rgb(17,24,39,0.8)] dark:to-[rgba(8,11,18,0.8)]  p-8 space-y-4"
            data-aos="fade-up"
          >
            <Image
              src={Business}
              width={50}
              height={50}
              alt="Business"
              className="size-14 absolute -top-6"
            />
            <h3 className={`text-2xl font-bold ${styles.label}`}>
              Best Price Guarantee
            </h3>
            <p
              className={`text-base leading-relaxed tracking-wide ${styles.label}`}
            >
              We are committed to offering the lowest prices on all our
              products. If you find a lower price elsewhere, we&#39;ll match it
              or beat it. Our exclusive discounts, seasonal sales, and special
              promotions ensure that you always get the best deal available. We
              alse guarantee the safety of your investment through secure
              payment options, including credit/debit cards, PayPal, and digital
              wallets, all protected by industry-leading encryption technology.
              Shop with confidence, knowing your transactions are safe from
              fraud and unauthorized access.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Display;
