// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'


// Funcion para calcular la cantidad de paginas en teniendo la cantidad de elementos por paginas
// parametros de entrada la cantidad total de registros y la cantidad de regitros a mostrar (limit)

/* let offset = 12;
let offsetXPage = 6;

let cantPages = (offset, offsetXPage) => {
  let cantPage = Math.trunc(offset / offsetXPage);
  if (offset % offsetXPage === 0) {
      return cantPage;
  }
  return ++cantPage;
}
 */

// eslint-disable-next-line react/prop-types
export default function Pagination({ offset, regTotal, onOffsetChange }) {

  const totalPages = Math.ceil(regTotal / 6 );
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);


  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={offset === 0}
              onClick={() => onOffsetChange(offset - 6)}
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
            </button>
            {
              pages.map((page) => ( 
                <button
                  key={page}
                  href="#"
                  aria-current="page"
                  className={offset == ( page - 1 ) * 6 ? "relative z-10 inline-flex items-center bg-custom-celeste text-white px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}
                  onClick={() => onOffsetChange((page - 1) * 6)}
                >
                  {page}
                </button>
              ))
            }
            <button
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => onOffsetChange(offset + 6)}
              disabled={offset + 6 >= regTotal}
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
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
