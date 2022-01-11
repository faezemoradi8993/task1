import React from "react";
import { useCartLists } from "../../api";
import { useState } from "react";

function ShoppingCart() {
  const [page, setPage] = useState(1);
  const { data } = useCartLists(page);
  console.log(data?.data?.data?.items);
  return (
    <div>
      <h1>ShoppingCart</h1>
      {data?.data?.data?.items.map((p) => (
        <div className="flex">
          <h2 key={p?.id}>{p?.title}</h2>
          <img className="w-8" src={p?.thumbnail} alt="pic" />
        </div>
      ))}
    </div>
  );
}

export default ShoppingCart;
