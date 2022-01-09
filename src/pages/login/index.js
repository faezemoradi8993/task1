import React from "react";
import Input from "../../components/elements/input";
import { useForm, Controller } from "react-hook-form";
import Button from "./../../components/elements/button/index";

function Login() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
          firstName: "",
          lastName: "",
        },
      });
      const onSubmit = (data) => console.log(data);
    
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
            render={() => <Input type="text" label="نام خانوادگی" />}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => <Input type="text" label="نام" />}
          />
        </div>
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-5">
          <Controller
            name="mobile"
            control={control}
            render={() => <Input type="mobile" label="موبایل" />}
          />
          <Controller
            name="userName"
            control={control}
            render={({ field }) => <Input type="text" label="نام کاربری" />}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-end space-x-0 ">
          <Controller
            name="password"
            control={control}
            render={() => <Input type="password" label="پسورد" />}
          />
        </div>
        <div className="w-full flex items-center justify-center mt-4">
          <Button title="ثبت نام" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Login;
