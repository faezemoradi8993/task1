import { useQuery, useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { storeData } from "../utilities";
import { useNavigate } from "react-router-dom";
import { useTokenContext, useUserContext } from "../context";
import { useQueryClient } from "react-query";
import { getData } from "./../utilities/index";
const baseURL = "https://api.technosun.ir/v1";
const api = axios.create({ baseURL: `${baseURL}/`, timeout: 10000 });
//get product list by cid
export const getProductLists = async (cid, page) => {
  const data = await api.get(
    `product?page=${page}&cid=${cid.queryKey[1]}&per_page=5`
  );
  return data;
};
export const useProductLists = (id) => {
  return useQuery(["productList", id], (id) => getProductLists(id));
};
//get product details by id
export const getProductDetails = async (id) => {
  const data = await api.get(`product/${Number(id.queryKey[1])}`);
  return data;
};
export const useProductDetails = (id) => {
  return useQuery(["product", id], (id) => getProductDetails(id));
};
//login
export const userLogin = async (body) => {
  const { data } = await api.post(`auth/login`, body);
  return data?.data;
};
export const useUserLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser } = useUserContext();
  return useMutation(userLogin, {
    onError: (r) => {
      toast.error(r?.response?.data?.data?.message);
    },
    onSuccess: (r) => {
      console.log(r, "success");
      storeData("token", r?.token);
      setUser(r?.user.first_name);
      queryClient.setQueriesData("user", r?.user);
      toast.success(
        `${r?.user?.first_name}  ${r?.user?.last_name} عزیز با موفقیت وارد شدید`
      );
      navigate("/");
    },
    onMutate: (r) => {},
    onSettled: (r) => {},
  });
};
//register
export const userRegister = async (body) => {
  return await api.post(`auth/register`, body);
};
export const useUserRegister = () => {
  const navigate = useNavigate();
  const { setToken } = useTokenContext();
  const { setUser } = useUserContext();
  return useMutation(userRegister, {
    onError: (r) => {
      console.log(r?.response?.data?.data?.message);
      toast.error(r?.response?.data?.data?.message);
    },
    onSuccess: (r) => {
      console.log(r, "success");
      setToken(r.data.data.token);
      setUser(r.data.data.user.first_name);
      toast.success(
        `${r.data.data.user.first_name}  ${r.data.data.user.last_name}  عزیز  با موفقیت ثبت نام شدید برای ورود لاگین کنید`
      );
      navigate("/login");
    },
    onMutate: (r) => {},
    onSettled: (r) => {},
  });
};

//cart
//get cart list
export const getCartLists = async (page) => {
  const token = getData("token");
  const data = await api.get(`cart/list?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
export const useCartLists = (page) => {
  return useQuery(["cartList", page], getCartLists(page));
};
//add product to cart list
export const AddToCard = async (data) => {
  const token = getData("token");
  return await api.post(
    `cart/add?quantity=${data.quantity}&product_id=${data.id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
export const useAddToCard = () => {
  return useMutation(AddToCard, {
    onError: (r) => {
      console.log(r, "err");
    },
    onSuccess: (r) => {
      console.log(r, "success");
      // toast.success("اضافه شد ");
    },
    onMutate: (r) => {
      console.log(r, "Mutate");
    },
    onSettled: (r) => {
      console.log(r, "settled");
    },
  });
};
