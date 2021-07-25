import Head from "next/head";
import Link from "next/link";
import React from "react";

const Header = ({ currentPage = "home" }) => {
  return (
    <>
      <Head>
        <title>
          {/* {currentPage.charAt(0).toUpperCase() + currentPage.slice(1) + " | "} */}
          Covid-19 in Vietnam{" "}
        </title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <div className="h-16 flex space-between bg-white border-gray-100 rounded-b-2xl border-b-2 flex justify-center items-center w-full ">
        <div className="flex space-x-7 justify-center">
          <Link href="/world">
            <a
              className={
                currentPage == "world"
                  ? `cursor-pointer hover:text-gray-700 text-gray-800 font-bold`
                  : `cursor-pointer hover:text-gray-700 text-gray-500`
              }
            >
              Thế giới
            </a>
          </Link>
          <Link href="/">
            <a
              className={
                currentPage == "home"
                  ? `cursor-pointer hover:text-gray-700 text-gray-800 font-bold`
                  : `cursor-pointer hover:text-gray-700 text-gray-500`
              }
            >
              Trang chủ
            </a>
          </Link>
          <Link href="/news">
            <a
              className={
                currentPage == "news"
                  ? `cursor-pointer hover:text-gray-700 text-gray-800 font-bold`
                  : `cursor-pointer hover:text-gray-700 text-gray-500`
              }
            >
              Tin tức
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
