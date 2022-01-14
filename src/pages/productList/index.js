import React, { useState } from "react";
import { useProductLists } from "../../api";
import { Link } from "react-router-dom";
import Button from "../../components/elements/button";

function ProductList() {
  const loadMoreButtonRef = React.useRef();
  const [id, setId] = useState(195);
  const {
    status,
    data:AllProducts,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useProductLists(id);
  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center text-xl text-blue-500">
        ..در حال بارگذاری
      </div>
    );

  return (
    <div className="text-sm">
      <div className="w-full flex justify-between items-center space-x-5  border-transparent pb-3 border-b-4 border-b-white ">
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
      {AllProducts?.data?.data?.items.map((d) => (
        <Link
          key={d.id}
          className="group flex items-center justify-between hover:shadow-md p-3 bg-white my-3 text-[10px] "
          to={`product/${d.id}`}
        >
          <p className="self-end">{d.price} تومان</p>
          <div className="flex text-right">
            <p className="mr-3">{d.title}</p>
            <div className="w-[60px] h-[60px] bg-white">
              <img
                className="w-[60px] group-hover:shadow-lg"
                src={d?.thumbnail}
                alt={d.title}
              />
            </div>
          </div>
        </Link>
      ))}
      <div className="w-full flex items-center justify-center">
        <Button
          ref={loadMoreButtonRef}
          title={
            isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load Newer"
              : "Nothing more to load"
          }
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        />
      </div>
      <div>
        {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
      </div>
    </div>
  );
}
export default ProductList;
