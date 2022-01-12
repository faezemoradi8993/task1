import { useEffect } from "react";
import axios from "axios";
import { useTokenContext } from "../context";
import { getData, removeData } from "../utilities";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AxiosInterceptor = () => {
  const baseURL = "https://api.technosun.ir/v1";
  const history = useNavigate();
  const { setToken } = useTokenContext();

  // axios.interceptors
  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        console.log(config);
        Object.assign(config, { baseURL: `${baseURL}/` });
        Object.assign(config, { timeout: 10000 });
        const token = getData("token");
        if (token) {
          Object.assign(config.headers, { Authorization: "Bearer " + token });
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        console.log(response);
        if (response?.data === "401 / Unauthorized") {
          setToken(null);
          removeData("token");
          toast.error("لاگین کنید", { id: 1 });
        }
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }, [setToken, history]);
  // end

  return null;
};

export default AxiosInterceptor;
