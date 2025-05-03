import React, { useState, useRef } from "react";
import { FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller, setToken } from "../../utils/helper";

const Login = () => {
  const [focusField, setFocusField] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  console.log("inputValues", inputValues);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    passwordRef.current.focus();
  };

  const validateFields = () => {
    const newErrors = { email: "", password: "" };
    if (!inputValues.email) {
      newErrors.email = "email is required.";
    }
    if (!inputValues.password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      setBtnLoading(true);
      const response = await NetworkServices.Authentication.login(inputValues);
      const queryParams = new URLSearchParams(location.search);
      const redirectFrom = queryParams.get("redirectFrom") || "/dashboard";

      if (response.status === 200) {
        if (response?.data?.data?.user?.role == "admin") {
          setToken(response?.data?.data?.token);
          navigate(redirectFrom);
          Toastify.Success("Login successfully done");
        } else {
          Toastify.Error("Invalid user role");
        }
        setBtnLoading(false);
      }
    } catch (error) {
      setBtnLoading(false);
      networkErrorHandeller(error);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-200 to-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/image/bg/starry-night.webp')" }}
      ></div>
      <div className="relative w-96 p-8 bg-white/30 rounded-lg shadow-lg text-white border border-white">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <div className="space-y-6">
          {/* email Input */}
          <div className="relative ">
            <label
              htmlFor="email"
              className={`absolute left-3 text-sm transition-all cursor-text ${
                focusField === "email" || inputValues.email
                  ? "-top-3 left-3  text-white"
                  : "top-6 text-white"
              }`}
            >
              email
            </label>
            <input
              id="email"
              type="text"
              value={inputValues.email}
              className="w-full p-3 pr-10 text-white outline-none border-b-2 bg-transparent noselect"
              onFocus={() => setFocusField("email")}
              onBlur={() => setFocusField("")}
              onDrag="return false"
              onChange={(e) => {
                setInputValues({ ...inputValues, email: e.target.value });
                if (errors.email) {
                  setErrors({ ...errors, email: "" });
                }
              }}
              onPaste={(e) => e.preventDefault()}
              onDrop={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
            <span className="absolute right-3 top-6 text-white">
              <FaRegUser />
            </span>
            {errors.email && (
              <label className="text-red-500 text-xs mt-1">
                {errors.email}
              </label>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <label
              htmlFor="pass"
              className={`absolute left-3 text-sm transition-all cursor-text ${
                focusField === "password" || inputValues.password
                  ? "-top-3 left-3  text-white"
                  : "top-6 text-white"
              }`}
            >
              Password
            </label>
            <input
              id="pass"
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              value={inputValues.password}
              className="w-full p-3 pr-10 text-white outline-none border-b-2 bg-transparent"
              onFocus={() => setFocusField("password")}
              onBlur={() => setFocusField("")}
              onChange={(e) => {
                setInputValues({ ...inputValues, password: e.target.value });
                if (errors.password) {
                  setErrors({ ...errors, password: "" });
                }
              }}
            />
            <button
              type="button"
              className="absolute right-3 top-6 text-white focus:outline-none cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <label className="text-red-500 text-xs mt-1">
                {errors.password}
              </label>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}

          <button
            className="w-full bg-white text-gray-600 py-2 rounded-lg font-bold transition cursor-pointer flex items-center justify-center gap-2"
            onClick={handleSubmit}
            disabled={btnloading}
          >
            {btnloading && (
              <svg
                className="animate-spin h-5 w-5 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {btnloading ? "Logging in..." : "Login"}
          </button>

          {/* Register Link */}
          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <Link to="register" className="font-bold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
