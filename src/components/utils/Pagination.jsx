// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

import { useEffect, useState } from "react";

// Funcion para calcular la cantidad de paginas en teniendo la cantidad de elementos por paginas
// parametros de entrada la cantidad total de registros y la cantidad de regitros a mostrar (limit)

/* let pagActual = 12;
let pagActualXPage = 6;

let cantPages = (pagActual, pagActualXPage) => {
  let cantPage = Math.trunc(pagActual / pagActualXPage);
  if (pagActual % pagActualXPage === 0) {
      return cantPage;
  }
  return ++cantPage;
}
 */



// eslint-disable-next-line react/prop-types
export default function Pagination({ pagActual, regTotal, onPageChange }) {

    // Funcion para calcular la cantidad de paginas en teniendo la cantidad de elementos por paginas
    // parametros de entrada la cantidad total de registros y la cantidad de regitros a mostrar (limit)

// let pagActual = 12;
// let pagActualXPage = 6;
    const [cantPage, setCantPage] = useState(0);

useEffect(() => {
    console.log(pagActual);
    cantPages(pagActual);

  }, []);

    let cantPages = (pag) => {
    let cantPage = Math.trunc(pag / 6);
    if (pagActual % 6 === 0) {
        setCantPage(cantPage);
    }
    setCantPage(++cantPage);
    }

    const showPagination = (cantPage) => {
      const pag = [];
      for (let i = 1; i <= cantPage; i++) {
        pag.push(
          <a
          key={i}
          href="#"
          aria-current="page"
          className="relative z-10 inline-flex items-center bg-custom-celeste px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          {i}
        </a>
        );
      }
      return pag;
    };
    // let showPagination = (cantPage) => {
    //     for (let i = 0; i <= cantPage; i++) {
    //         return (

    //         );
    //     }
    // }


    
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              {/* <span className="sr-only">Previous</span> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </a>
            {
             showPagination(cantPage)
            }

            {/* <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              2
            </a> */}
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              {/* <span className="sr-only">Next</span> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
