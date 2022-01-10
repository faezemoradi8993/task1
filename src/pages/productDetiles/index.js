import { useParams, useNavigate } from "react-router-dom";
import { useProductDetails } from "../../api";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/solid";
import Button from "../../components/elements/button";
function ProductDetiles() {
  const history = useNavigate();
  const params = useParams();
  const { data, isLoading } = useProductDetails(params.id);
  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center text-3xl text-blue-500">
        ..در حال بارگذاری
      </div>
    );
  return (
    <div className="flex flex-col items-end">
      <Button title=" بازگشت" onClick={() => history(-1)} />

      <div className="my-5 p-5 relative w-full  bg-white">
        <img
          className="w-[200px] mx-auto shadow-lg"
          src={data?.data?.data?.thumbnail}
          alt={data?.data?.data?.title}
        />
        <div className=" flex flex-col absolute w-10 top-5 left-5  ">
          <ShoppingCartIcon className="p-2 border-2 border-blue-900 hover:scale-110 hover:shadow-lg hover:bg-green-600 hover:text-white bg-green-200 cursor-pointer rounded-lg" />
          <HeartIcon className="p-2 border-2 border-blue-900 mt-5 hover:scale-110 hover:shadow-lg hover:bg-red-600 hover:text-white bg-red-200 cursor-pointer rounded-lg" />
        </div>

        <h1 className="border-blue-100 font-bold text-xl text-blue-900 text-right mt-3">
          {data?.data?.data?.title}
        </h1>
        <h2 className=" text-right text-gray-500 ">
          {data?.data?.data?.second_title}
        </h2>
        <h1 className="text-right text-gray-400 text-sm">
          شناسه محصول: {data?.data?.data?.id}
        </h1>
        <h1 className="text-left"> تومان {data?.data?.data?.price}</h1>
      </div>
      <div className="bg-white flex-1  p-5 w-full shadow-lg">
        <h3 className="border-2 border-transparent border-b-blue-200 text-right pb-4 mb-4">
          مشخصات کلی
        </h3>
        <ul className="text-right ">
          <li className="p-2 border-2 border-transparent border-b-blue-50">
            {data?.data?.data?.excerpt[0]}
          </li>
          <li className="p-2 border-2 border-transparent border-b-blue-50">
            {data?.data?.data?.excerpt[1]}
          </li>
          <li className="p-2 border-2 border-transparent border-b-blue-50">
            {data?.data?.data?.excerpt[2]}
          </li>
          <li className="p-2 border-2 border-transparent border-b-blue-50">
            {data?.data?.data?.excerpt[3]}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProductDetiles;
