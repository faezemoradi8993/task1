import React from "react";
import { useCartLists } from "../../api";
import { useState } from "react";

function ShoppingCart() {
  const [page, setPage] = useState(1);
  const { data } = useCartLists(page);
  return (
    <div>
      <h1>ShoppingCart</h1>
      {data?.map((p) => (
        <h2 key={p?.id}>{"hi"}</h2>
      ))}
    </div>
  );
}

export default ShoppingCart;
