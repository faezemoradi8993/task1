import React, { useEffect } from "react";
import Input from "../../components/elements/input";
import { useForm, Controller } from "react-hook-form";
import Button from "./../../components/elements/button";
import { useNavigate } from "react-router-dom";
import { getData } from "../../utilities";
import { useUserLogin } from "../../api";

function Login() {
  const {data, mutate,error: loginApiError } = useUserLogin();
  const {
    control,
    handleSubmit,
    formState: { errors: loginFormErrors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
   mutate({ user: data.userName, password: data.password });
  };
  // if user logged , redirect to profile
  const history = useNavigate();
  useEffect(() => {
    const token = getData("token");
    if (token) {
      history("/");
    }
  }, [history]);
  // end

  return (
    <div className="px-4">
      <h1 className="w-full py-4 text-right border-b-blue-300 border-[1px] border-transparent font-bold mb-8 ">
        فرم ورود
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-5">
          <Controller
            name="userName"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                label="ایمیل"
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: { value: true, message: "fill it" },
            }}
            render={({ field }) => (
              <Input
                type="password"
                error={loginFormErrors?.password?.message || loginApiError?.data?.message}
                label="پسورد"
               {...field}
              />
            )}
          />
        </div>
        <div className="w-full flex items-center justify-center mt-4">
          <Button title="ورود" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Login;
