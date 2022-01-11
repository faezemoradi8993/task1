import { useEffect } from "react";
import axios from "axios";
import { useQueryClient } from "react-query";
import { useTokenContext } from "../context/Index";
// import useDeviceInfo from "../hook/useDeviceInfo";
// import { refreshToken } from "./api";
import { getData } from "../utility/helperFunction";
import { useHistory } from "react-router-dom";
const AxiosInterceptor = () => {
  const baseURL = "https://api.technosun.ir/v1";
  const api = axios.create({ baseURL: `${baseURL}/`, timeout: 10000 });
  const queryClient = useQueryClient();

  const history = useHistory();

  const { setToken } = useTokenContext();

  // axios.interceptors
  useEffect(() => {
    api.interceptors.request.use(
      (config) => {
        const token = getData("token");
        if (token) {
          config.headers["Authorization"] = "bearer " + token;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      (response) => {
        return response;
      },
      function (error) {
        // const originalRequest = error.config;

        // if (
        //   error?.response?.status === 401 &&
        //   (originalRequest.url === "/auth/refresh" || originalRequest.url === "/device/set")
        // ) {
        //   queryClient.removeQueries("user", { exact: true });
        //   setToken(null);
        //   removeData("token");
        //   return Promise.reject(error);
        // }

        // if (error?.response?.status === 401 && !originalRequest._retry) {
        //   originalRequest._retry = true;
        //   refreshToken().then((res) => {
        //     if (res.status === 200) {
        //       if (res.data?.data?.token) {
        //         setToken(res.data.data.token);
        //         storeData("token", res.data.data.token);
        //       }
        //       if (res.data?.data?.user) {
        //         queryClient.setQueryData("user", res.data.data.user);
        //       }
        //       return axios(originalRequest);
        //     }
        //   });
        // }

        // if (error?.response?.status === 404) {
        //   if (
        //     originalRequest.url.indexOf("/product/") !== -1 ||
        //     originalRequest.url.indexOf("/order/show/") !== -1 ||
        //     originalRequest.url.indexOf("/post/show/") !== -1
        //   ) {
        //     history.replace("/404");
        //   }
        // }

        return Promise.reject(error);
      }
    );
  }, [queryClient, setToken, history]);
  // end

  return null;
};

export default AxiosInterceptor;
