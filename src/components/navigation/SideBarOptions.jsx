/* eslint-disable react/prop-types */
// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import api from '../../API/axios';

// import {
//     AiOutlineUser,
//     AiOutlineHome,
//     AiOutlineShoppingCart
// } from "react-icons/ai";

// import {
//     BiBookAlt
// } from "react-icons/bi";

// import {
//     BsTruck
// } from "react-icons/Bs";

export const SideBarOptions = ({ selected }) => {

    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //     try {
    //         const token = localStorage.getItem("x-token");
    //         const response = await api.get('/user/token', {
    //             headers: {
    //                 "x-token": token
    //             }
    //         });
    //         // console.log(response);
    //         setUser(response.data.user);
    //     } catch (error) {
    //         console.error(error);
    //     }
    //     };
    //     fetchUser();
    // }, []);

    return (
        <>
            <li className="p-4">
                <Link to="/admin/home" className={`flex text-xp py-2 px-4 rounded ${selected === "/admin/home" ? 'bg-custom-celeste' : 'bg-white w-full'} `}>
                    {/* <div className='bg-white w-full flex rounded'> */}
                        {/* <AiOutlineHome className="mr-4 mb-0 mt-1 text-black" /> */}
                        <span className="text-black">INICIO</span>
                    {/* </div> */}
                </Link>
            </li>

            <li className="p-4 pt-0">
                <Link to='/admin/users' className={`flex text-xp py-2 px-4 rounded  ${selected === "/admin/users" ? 'bg-custom-celeste' : 'bg-white w-full'} `}>
                    {/* <AiOutlineUser className="mr-4 mb-0 mt-1 text-black" /> */}
                    <span className="text-black">USUARIOS</span>
                </Link>
            </li>

            <li className="p-4 pt-0">
                <Link to='/admin/books' className={`flex text-xp py-2 px-4 rounded   ${selected === "/admin/books" ? 'bg-custom-celeste' : 'bg-white w-full'} `}>
                    {/* <BiBookAlt className="mr-4 mb-0 mt-1 text-black" /> */}
                    <span className="text-black">LIBROS</span>
                </Link>
            </li>

            <li className="p-4 pt-0">
                <Link to='/admin/sales' className={`flex text-xp py-2 px-4 rounded  ${selected === "/admin/sales" ? 'bg-custom-celeste' : 'bg-white w-full'} `}>
                    {/* <AiOutlineShoppingCart className="mr-4 mb-0 mt-1 text-black" /> */}
                    <span className="text-black">VENTAS</span>
                </Link>
            </li>
            <li className="p-4 pt-0">
                <Link to='/admin/shoppings' className={`flex text-xp py-2 px-4 rounded ${selected === "/admin/shoppings" ? 'bg-custom-celeste' : 'bg-white w-full'} `}>
                    {/* <BsTruck className="mr-4 mb-0 mt-1 text-black" /> */}
                    <span className="text-black">COMPRAS</span>
                </Link>
            </li>
            <li className="p-4 pt-0">
                <Link to='/admin/providers' className={`flex text-xp py-2 px-4 rounded ${selected === "/admin/providers" ? 'bg-custom-celeste' : 'bg-white w-full'} `}>
                {/* <AiOutlineUser className="mr-4 mb-0 mt-1 text-black" /> */}
                    <span className="text-black">PROVEEDOR</span>
                </Link>
            </li>
            <li className="p-4 pt-0">
                <Link to='/admin/roles' className={`flex text-xp py-2 px-4 rounded ${selected === "/admin/roles" ? 'bg-custom-celeste' : 'bg-white w-full'} `}>
                {/* <AiOutlineUser className="mr-4 mb-0 mt-1 text-black" /> */}
                    <span className="text-black">ROL</span>
                </Link>
            </li>
            <li className="p-4 pt-0">
                <Link to='/admin/categories' className={`flex text-xp py-2 px-4 rounded ${selected === "/admin/categories" ? 'bg-custom-celeste' : 'bg-white w-full'} `}>
                {/* <AiOutlineUser className="mr-4 mb-0 mt-1 text-black" /> */}
                    <span className="text-black">CATEGORIA</span>
                </Link>
            </li>
            <li className="p-4 pt-0">
                <Link to='/admin/bitacora' className={`flex text-xp py-2 px-4 rounded ${selected === "/admin/bitacora" ? 'bg-custom-celeste' : 'bg-white w-full'} `}>
                {/* <AiOutlineUser className="mr-4 mb-0 mt-1 text-black" /> */}
                    <span className="text-black">BITACORA</span>
                </Link>
            </li>
        </>
    )
}