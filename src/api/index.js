import { useQuery, useMutation } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { storeData } from "../utilities";
import { useNavigate } from "react-router-dom";
import { useTokenContext, useUserContext } from "../context";
import { useQueryClient } from "react-query";
import { getData } from "./../utilities/index";
const baseURL = "https://api.technosun.ir/v1";
//to do : solve token remove in logout 
const token=getData("token")
const api = axios.create({ baseURL: `${baseURL}/`, timeout: 10000 ,headers: {'Authorization': 'Bearer '+token}});
//get product list by cid
export const getProductLists = async (cid, page) => {
  const data = await api.get(
    `product?page=${page}&cid=${cid.queryKey[1]}&per_page=5`
  );
  return data;
};
export const useProductLists = (cid) => {
  return useQuery(["productList", cid], (cid) => getProductLists(cid));
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
      storeData("token", r?.token);
      setUser(r?.user.first_name);
      queryClient.setQueriesData("user", r?.user);
      queryClient.setQueriesData("token", r?.token);
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
      toast.error(r?.response?.data?.data?.message);
    },
    onSuccess: (r) => {
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
export const getCartLists = async () => {
  const data = await api.get(`cart/list`);
  return data;
};
export const useCartLists = () => {
  return useQuery("cartList",()=> getCartLists());
};
//add product to cart list
export const AddToCard = async (data) => {
  return await api.post(
    `cart/add?quantity=${data.quantity}&product_id=${data.id}`
  );
};
export const useAddToCard = () => {
  return useMutation(AddToCard, {
    onError: (r) => {
    },
    onSuccess: (r) => {
      // toast.success("اضافه شد ");
    },
    onMutate: (r) => {
    },
    onSettled: (r) => {
    },
  });
};
