import { useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { removeToken } from "../../utils/helper";
import { useContext} from "react";
import { ThemeContext } from "../ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
export const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const logout = () => {
    removeToken();
    navigate("/");
  };

  const gradientStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
    width: "100%",
  };



  return (
    <>
      <div className="bg-blue-50  sticky top-0 z-50   ">
        <div className="bg-blue-50 " style={gradientStyle}>
          <div className="dark:bg-gray-400 navbar px-10">
            {/* responsive navbar start */}
            <div className="navbar-start ">
              <button
                aria-controls="sidebar"
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(!sidebarOpen);
                }}
                className="z-99999 block rounded-sm border border-stroke bg-white dark:bg-slate-600 p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
              >
                <GiHamburgerMenu />
              </button>
            </div>
            {/* responsive navbar end */}

            <div className="navbar-end mt-1">
              <div className="flex">
                {/* <label className="swap swap-rotate mr-0  md:mr-5  ">
                  <input type="checkbox" onChange={handleToggle} />
                  <svg
                    className="swap-on fill-current w-6 h-10 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>
                  <svg
                    className="swap-off fill-current w-6 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label> */}
                <button
                  onClick={toggleTheme}
                  className="p-2   text-gray-900 dark:text-white"
                >
                  {theme === "light" ? (
                    <FaMoon size={20} />
                  ) : (
                    <FaSun size={20} />
                  )}
                </button>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <div className="indicator">
                      {/* <IoIosNotifications className="text-xl" />
                      <span className="badge badge-sm indicator-item ">8</span> */}
                      <div class="relative flex items-center justify-center    ">
                        <div class="relative w-10 h-10 rounded-full   text-white flex items-center justify-center  ">
                          <div class="absolute top-0 right-0 flex items-center justify-center"></div>
                          <div class="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full z-10">
                            <span class="animate-wave absolute inline-flex w-5 h-5 rounded-full bg-blue-500 opacity-75"></span>
                            <span class="animate-wave absolute inline-flex w-5 h-5 rounded-full bg-blue-500 opacity-50"></span>
                            <span class="absolute inline-flex w-5 h-5 rounded-full bg-blue-500"></span>
                            <span class="absolute text-white font-bold text-[11px]">
                              9
                            </span>
                          </div>

                          {/* <span class="text-lg font-bold">🔔</span> */}
                          <IoIosNotifications className="text-xl text-gray-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                  >
                    <div className="card-body">
                      <div className="card-actions">
                        <button className="btn btn-primary btn-block">
                          View Notification
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a className="justify-between text-black">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li>
                      <a className="text-black">Settings</a>
                    </li>
                    <li onClick={() => logout()}>
                      <a className="text-black">Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
          
    </>
  );
};
