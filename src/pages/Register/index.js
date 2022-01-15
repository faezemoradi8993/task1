import React from "react";
import Input from "../../components/elements/input";
import { useForm, Controller } from "react-hook-form";
import Button from "./../../components/elements/button/index";
import { useUserRegister } from "../../api";

function Register() {
  const { mutate } = useUserRegister();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstname: "faeze",
      username: "",
      lastname: "",
      mobile: "",
      password: "",
      user: "",
    },
  });
  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="px-4">
      <h1 className="w-full py-4 text-right border-b-blue-300 border-[1px] border-transparent font-bold mb-8 ">
        فرم ثبت نام
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-5">
          <Controller
            name="firstname"
            control={control}
            render={({ field }) => <Input type="text" label="نام " {...field} />}
          />
          <Controller
            name="lastname"
            control={control}
            render={({ field }) => <Input type="text" label=" نام خانوادگی " {...field} />}
          />
        </div>
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-5">
          <Controller
            name="user"
            control={control}
            render={({ field }) => <Input type="email" label="ایمیل" {...field} />}
          />
          <Controller
            name="mobile"
            control={control}
            render={({ field }) => <Input type="mobile" label="موبایل" {...field} />}
          />
        </div>
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-5">
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Input type="password" label="پسورد" {...field} />}
          />
          <Controller
            name="username"
            control={control}
            render={({ field }) => <Input type="text" label="نام کاربری" {...field} />}
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
