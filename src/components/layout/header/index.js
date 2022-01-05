import React from "react";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/solid";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="text-center h-[70px] shadow-lg fixed z-50 top-0 right-0 w-full flex items-center justify-between px-5 bg-[#312e81]">
      <div className="flex ">
        <Link to="/shoppingCart" className="mr-5">
          <ShoppingCartIcon className="w-8 p-1  bg-blue-200 rounded-md text-black hover:shadow-lg hover:text-blue-500 cursor-pointer" />
        </Link>
        <Link to="/favoriteProducts" className="" >
          <HeartIcon className="w-8 p-1 bg-blue-200 rounded-md text-black hover:shadow-lg hover:text-red-500 cursor-pointer" />
        </Link>
      </div>
      <Link to="/" className="font-bold text-white"> فروشگاه اینترنتی تکنوسان</Link>
    </div>
  );
}

export default Header;
