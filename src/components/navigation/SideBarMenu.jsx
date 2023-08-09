// import {
//   BiLogOut
// } from "react-icons/bi";

import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { LogoutModal } from "../utils";

import { SideBarOptions as Admin } from "./SideBarOptions";
import { SideBarOptionsEmployee as Employee } from "./SideBarOptionsEmployee";
import { SideBarOptionsClient as Client } from "./SideBarOptionsClient";
import { SideBarOptionsProvider as Provider } from "./SideBarOptionsProvider";
import api from "../../API/axios";

export const SideBarMenu = ({ redirecTo = "admin" }) => {
  const [selected, setSelected] = useState("");
  const location = useLocation();

  // const { logout, getUser } = useProvider();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [user, setUser] = useState({});

  useEffect(() => {
      try {
        const token = localStorage.getItem("x-token");
        api.get("/usuario/token", {
          headers: {
            "x-token": token,
          },
        }).then((response) => {
            setUser(response.data.usuario);
        });
      } catch (error) {
        console.error(error);
      }
  }, []);

  const handleRute = () => {
    setSelected(location.pathname);
  };

  const handleLogout = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleOk = () => {
    // logout();
    const token = localStorage.getItem('x-token');
    console.log("token", token);

    api.post("/auth/logout", null, {
      headers: {
        "x-token": token
      }
    })
    .then((res) => {
      console.log("Respuesta correcta", res);
      navigate("/login");
    })
    .catch((err) => {
      console.log("Error con la peticion", err);
      navigate("/login");
    })
  };

  const switchOptions = (rol, selected) => {
    switch (rol) {
      case "admin":
        return <Admin selected={selected} />;
      case "client":
        return <Client selected={selected} />;
      case "employee":
        return <Employee selected={selected} />;
      case "provider":
        return <Provider selected={selected} />;
      default:
        break;
    }
  };

  useEffect(() => {
    handleRute();
  }, [location]);

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex">
        <aside className="overflow-hidden bg-custom-grey text-gray-300 flex-shrink-0 w-64 flex flex-col justify-between">
          <div>
            <nav>
              <ul>{switchOptions(redirecTo, selected)}</ul>
            </nav>
          </div>

          <div className="p-4 pt-0 mb-3">
            <p className="text-black mb-2 px-2">{user.nombre}</p>
            <button
              onClick={handleLogout}
              className="flex text-xp py-2 bg-white px-4 rounded hover:bg-custom-celeste w-full"
            >
              {/* <BiLogOut className="mr-4 mb-0 mt-1 text-black" /> */}
              <span className="text-black">SALIR</span>
            </button>
          </div>
        </aside>
        <Outlet />
      </div>
      {showModal && (
        <LogoutModal handleCancel={handleCancel} handleOk={handleOk} />
      )}
    </>
  );
};
