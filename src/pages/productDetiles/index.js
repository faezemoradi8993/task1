import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/solid";
import Button from "../../components/elements/button";
import { useAddToCard, useAddToFavorite, useProductDetails } from "../../api";
function ProductDetiles() {
  const history = useNavigate();
  const params = useParams();
  const { data, isLoading } = useProductDetails(params.id);
  const { mutate: AddToCartMutate } = useAddToCard();
  const { mutate: AddToFavoriteMutate } = useAddToFavorite();
  const addToCartHandler = () => {
    AddToCartMutate({ id: params.id, quantity: 1 });
  };
  const addToFavoriteHandler = () => {
    AddToFavoriteMutate(params.id);
  };
  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center text-xl text-blue-500">
        ..در حال بارگذاری
      </div>
    );
  return (
    <div className="flex flex-col items-end">
      <Button title=" بازگشت" onClick={() => history(-1)} />

      <div className="my-5 p-5 relative w-full  bg-white shadow-lg">
        <div className="w-[120px] h-[120px] bg-white mx-auto">
          <img
            className="w-[120px] mx-auto "
            src={data?.data?.data?.thumbnail}
            alt={data?.data?.data?.title}
          />
        </div>

        <div className=" flex flex-col absolute w-10 top-5 left-5 ">
          <ShoppingCartIcon
            onClick={addToCartHandler}
            className={
              "p-2 border-2 border-white hover:scale-110 hover:shadow-lg hover:bg-green-600 hover:text-white bg-green-200 cursor-pointer rounded-lg"
            }
          />
          <HeartIcon
            onClick={data?.data?.data?.favorite ? null : addToFavoriteHandler}
            className={
              data?.data?.data?.favorite
                ? "p-2 border-2 border-white mt-5  hover:shadow-lg bg-red-600 text-white  rounded-lg"
                : "p-2 border-2 border-white mt-5 hover:scale-110 hover:shadow-lg hover:bg-red-600 hover:text-white bg-red-200 cursor-pointer rounded-lg"
            }
          />
        </div>

        <h1 className="border-blue-100 font-bold text-sm text-blue-900 text-right mt-3">
          {data?.data?.data?.title}
        </h1>
        <h2 className="text-[11px]  text-right text-gray-500 ">
          {data?.data?.data?.second_title}
        </h2>
        <h1 className="text-[11px]  text-right text-gray-400 ">
          شناسه محصول: {data?.data?.data?.id}
        </h1>
        <h1 className="text-left"> تومان {data?.data?.data?.price}</h1>
      </div>
      <div className="bg-white flex-1  p-5 w-full shadow-lg">
        <h3 className="border-2 border-transparent border-b-blue-200 text-right font-semibold pb-4 mb-4">
          مشخصات کلی
        </h3>
        <ul className="text-right text-[11px]">
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
