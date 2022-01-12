import React, { useEffect } from "react";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { getData, removeData } from "../../../utilities";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../../../context";
import { useQueryClient } from "react-query";
import Badge from "../../elements/badge";


function Header() {
  const { setToken } = useTokenContext();
  const queryClient = useQueryClient();
  const firstname = getData("firstname");
  var token = getData("token");
  // if user logged , redirect to profile
  const history = useNavigate();
  useEffect(() => {
    token = getData("token");
  }, [history]);
  // end

  return (
    <div className="text-center h-[70px] shadow-lg fixed z-50 top-0 right-0 w-full flex items-center justify-between px-5 bg-[#312e81] text-[12px]">
      <div className="flex items-center">
        {!token && (
          <>
            <Link to="/register" className="text-white mx-4">
              ثبت نام
            </Link>
            <Link to="/login" className="text-white mx-1">
              ورود
            </Link>
          </>
        )}
        {token && (
          <>
            <Link to="/shoppingCart" className="mr-5 relative">
              <ShoppingCartIcon className="w-8 p-1 bg-blue-200 rounded-md text-black hover:shadow-lg hover:text-blue-500 cursor-pointer" />
              <Badge content={0} />
            </Link>
            <Link to="/favoriteProducts" className="">
              <HeartIcon className="w-8 p-1 bg-blue-200 rounded-md text-black hover:shadow-lg hover:text-red-500 cursor-pointer" />
            </Link>
            <p
              onClick={() => {
                removeData("token");
                removeData("lastname");
                removeData("firstname");
                queryClient.setQueriesData("token", "");
                setToken("");
                history("/");
              }}
              className="text-white mx-4 cursor-pointer"
            >
              خروج
            </p>
            <p className="text-white mx-4 cursor-pointer">
              {firstname} عزیز خوش آمدید
            </p>
          </>
        )}
      </div>
      <Link to="/" className="font-bold text-white">
        فروشگاه اینترنتی تکنوسان
      </Link>
    </div>
  );
}

export default Header;
