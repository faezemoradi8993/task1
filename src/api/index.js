import { useQuery } from "react-query";
import axios from "axios";
const baseURL = "https://api.technosun.ir/v1";
//get product list by cid
export const getProductLists = (cid) => {
  const data = axios.get(`${baseURL}/product?page=1&cid=${cid.queryKey[1]}&per_page=10`);
  return data;
};
export const useGetProductLists = (id) => {
  return useQuery(["productList", id],(id)=> getProductLists(id));
};
//get priduct details by id
export const getProductDetails = (id) => {
  const data = axios.get(`${baseURL}/product/${Number(id.queryKey[1])}`);
  return data;
};
export const useGetProductDetails = (id) => {
  return useQuery(["product",id],(id)=> getProductDetails(id));
};
