import React, { useState } from "react";
import Button from "../../components/elements/button";
import { useNavigate } from "react-router-dom";
import { XIcon } from "@heroicons/react/solid";
import { useRemoveFromCard, useCartLists } from "../../api";

function ShoppingCart() {
  const history = useNavigate();
  const [page, setPage] = useState(1);
  const { data } = useCartLists(page);
  const { mutate: removeMutate } = useRemoveFromCard();
  console.log(data);
  return (
    <div className="flex flex-col items-end">
      <div className="flex w-full pb-3 justify-end items-center border-b-2 border-b-blue-100 mb-5">
        <h1 className="font-bold text-right mr-3 ">سبد خرید</h1>
        <Button title=" بازگشت" onClick={() => history(-1)} />
      </div>
      <div className="flex flex-col w-full ">
        {data?.data?.data?.items.length === 0 ? (
          <div className="w-full h-[300px] flex items-center justify-center">
            هیچ کالایی در سبد شما وجود ندارد
          </div>
        ) : (
          <div>
            {data?.data?.data?.items.map((p) => (
              <div
                key={p?.id}
                className="flex items-center justify-between bg-white mb-2 px-2 hover:shadow-md"
              >
                <Button
                  title={<XIcon className="w-4" />}
                  type="danger"
                  style={{ width: "30px", height: "30px" }}
                  onClick={() => removeMutate(p?.key)}
                />
                <div className="flex flex-1 justify-between items-center  text-[11px] py-2 pl-2 ">
                  <h2 className="mr-2 bg-gray-100 p-1 ">
                    قیمت کل : {p?.total}
                  </h2>
                  <h2 className="mr-2 bg-gray-100 p-1 ">
                    تعداد : {p?.quantity}
                  </h2>
                  <h2 className="mr-2 bg-gray-100 p-1 ">
                    قیمت واحد : {p?.price}
                  </h2>
                  <h2 className="text-right">{p?.title}</h2>
                  <img className="w-8 ml-3" src={p?.thumbnail} alt="pic" />
                </div>
              </div>
            ))}
            <div className="mt-3 border-t-2 border-t-blue-200 w-full">
              <div className="flex items-center justify-between bg-white mb-2 p-2 ">
                <Button title="پرداخت" onClick={() => console.log("پرداخت")} />
                <div className="flex flex-1 justify-end items-center text-[11px] py-2  ">
                  <h2 className="mr-2 bg-gray-100 p-1 ">
                    قیمت کل : {data?.data?.data?.total_price}
                  </h2>
                  <h2 className="mr-2 bg-gray-100 p-1 ">
                    تعداد : {data?.data?.data?.total_count}
                  </h2>

                  <h2 className="text-right">{}</h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
