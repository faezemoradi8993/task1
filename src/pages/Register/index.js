import React from "react";
import Input from "../../components/elements/input";
import { useForm, Controller } from "react-hook-form";
import Button from "./../../components/elements/button/index";
import { useUserRegister } from "../../api";

function Register() {
  const {
    data:registerData,
    mutate,
    isLoading,
    error: registerLoginError,
  } = useUserRegister();

  const {
    control,
    handleSubmit,
    formState: { errors: registerFormErrors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      firstName: "faeze",
      nicName: "",
      lastName: "",
      mobile: "",
      password: "",
      user: "",
    },
  });
  const onSubmit = (data) => {
    mutate({
      user: data.user,
      firstname: data.firstName,
      lastname: data.lastName,
      mobile: data.mobile,
      username: data.nicName,
      password: data.password,
    });
    console.log(registerData,"registerData");
    console.log(registerLoginError,"registerLoginError");

  };

  return (
    <div className="px-4">
      <h1 className="w-full py-4 text-right border-b-blue-300 border-[1px] border-transparent font-bold mb-8 ">
        فرم ثبت نام
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-5">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input type="text" label="نام خانوادگی" {...field} />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => <Input type="text" label="نام" {...field} />}
          />
        </div>
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-5">
          <Controller
            name="user"
            control={control}
            render={({ field }) => (
              <Input type="email" label="ایمیل" {...field} />
            )}
          />
          <Controller
            name="mobile"
            control={control}
            render={({ field }) => (
              <Input type="mobile" label="موبایل" {...field} />
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-5">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input type="password" label="پسورد" {...field} />
              )}
          />
              <Controller
                name="nicName"
                control={control}
                render={({ field }) => (
                  <Input type="text" label="نام کاربری" {...field} />
                )}
              />
        </div>
        <div className="w-full flex items-center justify-center mt-4">
          <Button title="ثبت نام" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Register;
