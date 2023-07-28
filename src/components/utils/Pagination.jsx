// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

import { useEffect, useState } from "react";

const items = [
  
    {
    id: 1,
    title: "Back End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 2,
    title: "Front End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 3,
    title: "User Interface Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
  },
];

// Funcion para calcular la cantidad de paginas en teniendo la cantidad de elementos por paginas
// parametros de entrada la cantidad total de registros y la cantidad de regitros a mostrar (limit)

/* let cantElement = 12;
let cantElementXPage = 6;

let cantPages = (cantElement, cantElementXPage) => {
  let cantPage = Math.trunc(cantElement / cantElementXPage);
  if (cantElement % cantElementXPage === 0) {
      return cantPage;
  }
  return ++cantPage;
}
 */



export default function Pagination({ cantElement }) {

    // Funcion para calcular la cantidad de paginas en teniendo la cantidad de elementos por paginas
    // parametros de entrada la cantidad total de registros y la cantidad de regitros a mostrar (limit)

// let cantElement = 12;
// let cantElementXPage = 6;
    const [cantPage, setCantPage] = useState(0);

useEffect(() => {
    cantPages(cantElement);

  }, []);

    let cantPages = (pag) => {
    let cantPage = Math.trunc(pag / 6);
    if (cantElement % 6 === 0) {
        setCantPage(cantPage);
    }
    setCantPage(++cantPage);
    }

    let showPagination = (cantPage) => {
        for (let i = 0; i < cantPage; i++) {
            return (<a
                href="#"
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-custom-celeste px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {i}
              </a>);
        }
    }


    
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
