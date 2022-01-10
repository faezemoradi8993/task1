import { useQuery, useMutation } from "react-query";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { storeData } from "../utilities";
import { useNavigate } from "react-router-dom";
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
export const useUserLogin = (body) => {
  const navigate=useNavigate()
  return useMutation((body) => userLogin(body), {
    onError: (r) => {
      console.log(r, "err");
    },
    onSuccess: (r) => {
      console.log(r, "success");
      storeData("token",r.token)
      toast.success(`${r.user.first_name}  ${r.user.last_name} با موفقیت ثبت نام شدید`)
      navigate("")
    },
    onMutate: (r) => {
      console.log(r, "Mutate");
    },
    onSettled: (r) => {
      console.log(r, "settled");
    },
  });
};
//register
export const userRegister = async (body) => {
  return await api.post(`auth/register`, body);
};
export const useUserRegister = (body) => {
  return useMutation((body) => userRegister(body), {
    onError: (r) => {
      console.log(r, "err");
      toast.error(r)
    },
    onSuccess: (r) => {
      console.log(r, "success");
      storeData("token",r.data.data.token)
      toast.success(`${r.data.data.user.first_name}  ${r.data.data.user.last_name} با موفقیت ثبت نام شدید`)
    },
    onMutate: (r) => {
      console.log(r, "Mutate");
    },
    onSettled: (r) => {
      console.log(r, "settled");
    },
  });
};

//login
// export const userLogin = async (body) => {
//   console.log(body);
//   return await api.post(`auth/login`, body);
// };
// export const useUserLogin = (body) => {
//   console.log(body);
//   return useMutation(userLogin(body), {
//     onSuccess: (res) => {
//       console.log(res);
//       storeData("token", res.token);
//       console.log("done login");
//     },
//     onError: (err) => {
//       console.log(err);
//     },
//     onSettled: () => {},
//   });
// };
// //register
// export const userRegister = async (body) => {
//   return await api.post(`auth/register`, body);
// };
// export const useUserRegister = (body) => {
//   return useMutation(userRegister(body), {
//     onSuccess: (res) => {
//       console.log(res);
//       // storeData("token", res.token);
//       console.log("done register");
//     },
//     onError: (err) => {
//       console.log(err);
//     },
//     onSettled: () => {},
//   });
// };
