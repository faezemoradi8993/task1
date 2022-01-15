import { useQuery, useMutation, useInfiniteQuery } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { storeData } from "../utilities";
import { useNavigate } from "react-router-dom";
import { useTokenContext, useUserContext } from "../context";
import { useQueryClient } from "react-query";

export const getProductLists = async ({ pageParam = 1, queryKey }) => {
  const [key, cid] = queryKey;
  const { data } = await axios.get("/product", {
    params: {
      page: pageParam,
      cid: cid,
      per_page: 5,
    },
  });
  return data?.data;
};

export const useProductLists = (cid) => {
  return useInfiniteQuery(["productList", cid], getProductLists, {
    getNextPageParam: (lastPage) => {
      return lastPage?.next_page ? lastPage?.page + 1 : null;
    },
  });
};

//get product details by id
export const getProductDetails = async ({ queryKey }) => {
  const data = await axios.get(`product/${Number(queryKey[1])}`);
  return data;
};
export const useProductDetails = (id) => {
  return useQuery(["product", id], getProductDetails);
};
//login
export const userLogin = async (body) => {
  const { data } = await axios.post(`auth/login`, body);
  return data?.data;
};
export const useUserLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser } = useUserContext();
  const { setToken } = useTokenContext();

  return useMutation(userLogin, {
    onError: (r) => {
      toast.error(r?.response?.data?.data?.message, { toastId: 1 });
    },
    onSuccess: (r) => {
      storeData("token", r?.token);
      storeData("firstname", r?.user?.first_name);
      storeData("lastname", r?.user?.last_name);
      setUser(r?.user.first_name);
      setToken(r?.token);
      queryClient.setQueriesData("user", r?.user);
      queryClient.setQueriesData("token", r?.token);
      toast.success(`${r?.user?.first_name}  ${r?.user?.last_name} عزیز با موفقیت وارد شدید`, { toastId: 1 });
      navigate("/");
    },
    onMutate: (r) => {},
    onSettled: (r) => {},
  });
};
//register
export const userRegister = async (body) => {
  return await axios.post(`auth/register`, body);
};
export const useUserRegister = () => {
  const navigate = useNavigate();

  const { setUser } = useUserContext();
  return useMutation(userRegister, {
    onError: (r) => {
      toast.error(r?.response?.data?.data?.message, { toastId: 1 });
    },
    onSuccess: (r) => {
      setUser(r.data.data.user.first_name);
      toast.success(
        `${r.data.data.user.first_name}  ${r.data.data.user.last_name}  عزیز  با موفقیت ثبت نام شدید برای ورود لاگین کنید`,
        { toastId: 1 }
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
  const data = await axios.get(`cart/list`);
  return data.data;
};
export const useCartLists = (option = {}) => {
  return useQuery("cartList", () => getCartLists(), option);
};
//add product to cart list
export const AddToCard = async (data) => {
  return await axios.post(`cart/add?quantity=${data.quantity}&product_id=${data.id}`);
};
export const useAddToCard = () => {
  const queryClient = useQueryClient();

  return useMutation(AddToCard, {
    onError: (r) => {
      toast.error(r?.response?.data?.data?.message);
    },
    onSuccess: (r) => {
      queryClient.refetchQueries("cartList");
      //مشکل داره وقتی لاگین نیس
      toast.success("کالا با موفقیت به سبد خرید اضافه شد", { toastId: 1 });
    },
    onMutate: (r) => {},
    onSettled: (r) => {},
  });
};
//remove from cart by key
export const removeFromCard = async (key) => {
  return await axios.delete(`cart/remove?key=${key}`);
};
export const useRemoveFromCard = () => {
  const queryClient = useQueryClient();
  return useMutation(removeFromCard, {
    onError: (r) => {
      toast.error(r?.response?.data?.data?.message, { toastId: 1 });
    },
    onSuccess: (r) => {
      toast.success("کالا با موفقیت حذف شد", { toastId: 1 });
      queryClient.refetchQueries("cartList");
    },
    onMutate: (r) => {},
    onSettled: (r) => {},
  });
};

//favorite
//get favorite list
export const getFavoriteLists = async () => {
  const data = await axios.get(`favorite/list`);
  return data;
};
export const useFavoriteLists = () => {
  return useQuery("favorite", getFavoriteLists);
};
//add product to favorite list
export const AddToFavorite = async (id) => {
  // const queryClient = useQueryClient();
  // queryClient.refetchQueries(["product", id]);
  return await axios.post(`favorite/add?product_id=${id}`);
};
export const useAddToFavorite = (id) => {
  const queryClient = useQueryClient();
  return useMutation(AddToFavorite, {
    onError: (r) => {
      toast.error(r?.response?.data?.data?.message, { toastId: 1 });
    },
    onSuccess: (r) => {
      const productId = r.request.responseURL.substring(r.request.responseURL.indexOf("=") + 1);
      toast.success("کالا با موفقیت به لیست علاقه مندی ها اضافه شد", {
        toastId: 1,
      });
      queryClient.refetchQueries(["product", productId]);
      //درجا رنگ دکمه قرمز بشه
      //id رو نمیخونه چرا
    },
    onMutate: (r) => {},
    onSettled: (r) => {},
  });
};
//remove from cart by key
export const removeFromFavorite = async (id) => {
  return await axios.delete(`favorite/remove/${id}`);
};
export const useRemoveFromFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation(removeFromFavorite, {
    onError: (r) => {
      toast.error(r?.response?.data?.data?.message, { toastId: 1 });
    },
    onSuccess: (r) => {
      toast.success("کالا با موفقیت از لیست علاقه مندی ها حذف شد", {
        toastId: 1,
      });
      queryClient.refetchQueries("favorite");
      queryClient.refetchQueries("cardList");
    },
    onMutate: (r) => {},
    onSettled: (r) => {},
  });
};
