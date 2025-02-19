import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/button";
import ZanIcon from "../../assets/icon/ZanIcon.jpg";
import { useState } from "react";

import { FaRegEye } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";
import { PasswordInput, TextInput } from "../../components/input";

const inputStyle =
  "mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1";

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // navigate("/dashboard");
    // try {
    //     setLoading(true);
    //     const response = await NetworkServices.Authentication.login(data);
    //     if (response.status === 200) {
    //         setToken(response.data.data.token);
    //         navigate("/dashboard");
    //         setLoading(false);
    //     }
    // } catch (error) {
    //     setLoading(false);
    //     networkErrorHandeller(error);
    // }
  };

  // useEffect(() => {
  //     if (getToken()) {
  //         navigate("/dashboard");
  //     }
  // }, [navigate]);

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="border rounded-lg" style={{ width: "350px" }}>
        <img
          height={60}
          width={60}
          className="mx-auto d-block border border-green-100 rounded-full mt-3"
          src={ZanIcon}
          alt=""
        />
        <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
          {/* email */}
          <div className="my-4">
            <label className="block">
              <TextInput
                name="email"
                control={control}
                label="Email *"
                type="text"
                placeholder="Enter Email"
                rules={{ required: "Email is required" }} 
                error={errors.email?.message} 
              />
            </label>
          </div>
          {/* password */}
          <div className="my-4 ">
 
            <label className="block">
              <PasswordInput
                name="password"
                control={control}
                label="Password *"
                type="password"
                placeholder="Enter password"
                rules={{ required: "password is required" }}
                error={errors.password?.message}
              />
            </label>
          </div>
          {/* submit button */}
          <div className="my-4 flex justify-center">
            <PrimaryButton loading={loading} name="submit" />
          </div>
        </form>
      </div>
    </section>
  );
};
