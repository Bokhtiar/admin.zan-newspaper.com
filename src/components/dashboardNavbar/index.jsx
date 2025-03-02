import { useNavigate } from "react-router-dom";

import { IoIosNotifications } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { removeToken } from "../../utils/helper";
export const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/");
  };

  const gradientStyle = {
    // background: "#E5E7E9",
    // Adjust the gradient colors and image URL as needed
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
    width: "100%",
  };

  return (
    <>
      <div className="bg-blue-50 sticky top-0 z-50   ">
        <div className="bg-blue-50" style={gradientStyle}>
          <div className="navbar rounded-lg  px-10">
            {/* responsive navbar start */}
            <div className="navbar-start ">
              <button
                aria-controls="sidebar"
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(!sidebarOpen);
                }}
                className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
              >
                <GiHamburgerMenu />
              </button>
              {/* <Link className="" to="/">
                  <img
                    height={16}
                    width={60}
                    className="d-block border  rounded-md"
                    src= {logo}
                    alt=""
                  />
                </Link> */}
            </div>
            {/* responsive navbar end */}

            <div className="navbar-end mt-1 ">
              <div className="flex">
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
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li onClick={() => logout()}>
                      <a>Logout</a>
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