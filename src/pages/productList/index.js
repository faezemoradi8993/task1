import React, { useState } from "react";
import { useGetProductLists } from "../../api";
import { Link } from "react-router-dom";
import Button from "../../components/elements/button";

function ProductList() {
  const [length, setLength] = useState(10);
  const [id, setId] = useState(195);
  const { data, isLoading } = useGetProductLists(id);
  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center text-3xl text-white">
        is loading ..
      </div>
    );
  return (
    <div>
      <div className="w-full flex justify-between items-center space-x-5 px-3 border-transparent pb-5 border-b-4 border-b-white ">
        <Button
          title="موس"
          isActive={id === 161 ? true : false}
          onClick={() => setId(161)}
        />
        <Button
          title="کیبورد"
          isActive={id === 172 ? true : false}
          onClick={() => setId(172)}
        />
        <Button
          title="فلش"
          isActive={id === 208 ? true : false}
          onClick={() => setId(208)}
        />
        <Button
          title="هندزفری"
          isActive={id === 195 ? true : false}
          onClick={() => setId(195)}
        />
      </div>
      {data?.data?.data?.items.slice(0, length).map((d) => (
        <Link
          key={d.id}
          className="group flex items-center justify-between hover:shadow-lg p-5 bg-gray-200 m-3 hover:bg-white"
          to={`product/${d.id}`}
        >
          <p className="self-end">{d.price} تومان</p>
          <div className="flex">
            <p className="mr-3">{d.title}</p>
            <img
              className="w-[90px] group-hover:shadow-lg"
              src={d?.thumbnail}
              alt={d.title}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
export default ProductList;
