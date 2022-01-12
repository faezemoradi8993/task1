import React from "react";
import { useState } from "react";
import Button from "../../components/elements/button";
import { useNavigate } from "react-router-dom";
import { XIcon } from "@heroicons/react/solid";
import { useRemoveFromFavorite, useFavoriteLists } from "../../api";

function FavoriteProducts() {
  const history = useNavigate();
  const [page, setPage] = useState(1);
  const { data } = useFavoriteLists(page);
  const { mutate: removeMutate } = useRemoveFromFavorite();
  console.log(data?.data?.data?.items.length === 0);
  return (
    <div className="flex flex-col items-end">
      <div className="flex w-full pb-3 justify-end items-center border-b-2 border-b-blue-100 mb-5">
        <h1 className="font-bold text-right mr-3 ">لیست علاقه مندی ها</h1>
        <Button title=" بازگشت" onClick={() => history(-1)} />
      </div>
      <div className="flex flex-col w-full ">
        {data?.data?.data?.items.length === 0 ? (
          <div className="w-full h-[300px] flex items-center justify-center">
            هیچ کالایی در لیست علاقه مندی های شما وجود ندارد
          </div>
        ) : (
          <div>
            {data?.data?.data?.items?.items.map((p) => (
              <div
                key={p?.id}
                className="flex items-center justify-between bg-white mb-2 px-2 hover:shadow-md"
              >
                <Button
                  title={<XIcon className="w-4" />}
                  type="danger"
                  style={{ width: "30px", height: "30px" }}
                  onClick={() => removeMutate(p?.id)}
                />
                <div className="flex flex-1 justify-end  text-[11px] py-2  ">
                  <h2 className="text-right">{p?.title}</h2>
                  <img className="w-8 ml-3" src={p?.thumbnail} alt="pic" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoriteProducts;
