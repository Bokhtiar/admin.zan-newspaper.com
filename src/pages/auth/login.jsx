import { useState, useEffect } from "react";
import { FaRocket } from "react-icons/fa";
import { PasswordInput, TextInput } from "../../components/input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/button";
import newsIcon from "../../assets/icon/JPG Logo.jpg";
import { NetworkServices } from "../../network";
import { networkErrorHandeller, setToken } from "../../utils/helper";
import { Toastify } from "../../components/toastify";

export default function Login() {
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rocketPosition, setRocketPosition] = useState({ left: 0, bottom: 0 });
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let interval;

    if (loading) {
      // Start the rocket movement when loading
      let pos = 0;

      interval = setInterval(() => {
        // Move the rocket up and to the right
        if (pos < 350) {
          pos += 5; // Increment position
          setRocketPosition({
            left: pos, // Move right
            bottom: pos, // Move up
          });
        } else {
          clearInterval(interval); // Stop when the rocket reaches the top right
        }
      }, 30); // Adjust speed as necessary
    }

    return () => clearInterval(interval); // Cleanup interval on unmount or when loading changes
  }, [loading]);

  const onSubmit = async (data) => {
    console.log("data", data);
    setLoading(true); // Set loading to true
    try {
      setLoading(true);

      // FormData object creation
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      // API call
      const response = await NetworkServices.Authentication.login(formData);

      console.log("response",response)

      if (response.status === 200) {
        setToken(response.data.data.token);
        Toastify.Success("Login successfully done");
        navigate("/dashboard");
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-black to-pink-800 opacity-50 blur-3xl"></div>

      <div
        className="absolute"
        style={{
          left: `${rocketPosition.left}px`,
          bottom: `${rocketPosition.bottom}px`,
        }}
      >
        <FaRocket className="w-20 h-20 text-white " />
      </div>

      {loading ? (
        ""
      ) : (
        <>
          <div
            className="relative w-[400px] p-8 rounded-lg shadow-2xl bg-black/25 border border-gray-800 
                   backdrop-blur-lg flex flex-col items-center transition-all duration-500 ease-in-out"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className={`absolute inset-0 rounded-lg border-2 ${
                isHovered ? "border-glow" : "border-gray-800"
              }`}
            ></div>

            <div className="flex justify-center">
              <img
                src={newsIcon}
                alt="Logo"
                className="w-20 h-20 rounded-full shadow-lg border-gray-300"
              />
            </div>

            <h2 className="text-white text-2xl font-semibold text-center my-6">
              Login
            </h2>

            <form
              className="px-4 w-full z-50"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                    className="w-full"
                  />
                </label>
              </div>

              <div className="my-4">
                <label className="block">
                  <PasswordInput
                    name="password"
                    control={control}
                    label="Password *"
                    type="password"
                    placeholder="Enter password"
                    rules={{ required: "Password is required" }}
                    error={errors.password?.message}
                    className="w-full"
                  />
                </label>
              </div>

              <div className="my-4 flex justify-center">
                <PrimaryButton loading={loading} name="submit" />
              </div>

              <p className="text-gray-500"> Don't have an account? <Link to='/register'>
              <span className="text-[#7c5cc4]">Register</span>
              </Link> </p>
            </form>
          </div>
        </>
      )}

      <style>
        {`
          @keyframes neonGlow {
            0% { border-color: #ff0066; box-shadow: 0 0 10px #ff0066; }
            50% { border-color: #ff33cc; box-shadow: 0 0 20px #ff33cc; }
            100% { border-color: #ff0066; box-shadow: 0 0 10px #ff0066; }
          }
          .border-glow {
            animation: neonGlow 2s infinite alternate;
          }
        `}
      </style>
    </div>
  );
}
