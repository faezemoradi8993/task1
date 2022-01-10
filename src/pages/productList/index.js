import React, { useState } from "react";
import { useProductLists } from "../../api";
import { Link } from "react-router-dom";
import Button from "../../components/elements/button";

function ProductList() {
  const [page, setPage] = useState(0);

  const [id, setId] = useState(195);
  const { data, isLoading } = useProductLists(id,page);
  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center text-3xl text-blue-500">
        ..در حال بارگذاری
      </div>
    );
  return (
    <div className="text-sm">
      <div className="w-full flex justify-between items-center space-x-5  border-transparent pb-5 border-b-4 border-b-white ">
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
      {data?.data?.data?.items.map((d) => (
        <Link
          key={d.id}
          className="group flex items-center justify-between hover:shadow-md p-5 bg-white my-3 text-[12px] "
          to={`product/${d.id}`}
        >
          <p className="self-end">{d.price} تومان</p>
          <div className="flex text-right">
            <p className="mr-3">{d.title}</p>
            <img
              className="w-[90px] group-hover:shadow-lg"
              src={d?.thumbnail}
              alt={d.title}
            />
          </div>
        </Link>
      ))}
      <div className="w-full flex items-center justify-center">
        <Button title="موارد بیشتر" onClick={()=>setPage(page+1)} />
      </div>
    </div>
  );
}
export default ProductList;
