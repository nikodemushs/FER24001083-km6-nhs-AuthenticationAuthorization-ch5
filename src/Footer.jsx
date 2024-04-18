import { FaSteamSymbol } from "react-icons/fa";

function Footer() {
  return (
    <footer class="bg-black shadow w-full mt-[px]">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center  text-4xl text-red-500 font-semibold hover:text-red-600 hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mr-2 fill-current hover:text-primary hover:scale-110"
              viewBox="0 0 48 48"
            >
              <path
                fill="#f44336"
                fillRule="evenodd"
                d="M12.3,27l7.7,8.333L12.85,37L9,33.667L12.3,27z M32.622,11 L36,12.857L34.874,19l-7.882-5.143L32.622,11z M11.625,11c0.375,0,0.676,0.016,1.125,0.375c0.625,0.5,2.93,2.132,2.93,2.132 l0.418,0.743c0.761,0.038,0.78,0.107,1.741,0.813L39,29.417C38.837,29.77,36.321,37,36.321,37h-3.884L9,12.25 c0,0,0.382-0.143,0.75-0.375C10.327,11.512,11.053,11,11.625,11z M14.5,6H6c-0.528,0.264-1,0.57-1,1.625L5,14.5l0,2.125l0.988,2.748 L5,20.75v1.125l1,0.75V24l-1,1v3.75l1,0.625V33.5c-1.044,0.743-1,1.625-1,2.639l0,4.736C7.339,41.459,6.951,42,9.625,42 c2.363,0,3.875,0,3.875,0c0.362-0.023,0.644-0.099,1-0.133C15.494,41.771,16.125,41,16.125,41l2.625,1l1-1c0,0,1.311,1.623,1.625,2 l0.875-1L25,43c0,0,1.02-0.979,2.125-1H32.5c0.082-0.079,1-1,1-1c0.421,0.252,0.049,1,3.875,1c1.056,0,2-0.25,2-0.25 c-0.162-0.54-0.18-0.43-0.5-0.75c0,0,2.5,0,4.125,1V26.507l-2,0.618c0.039-0.317,0.963-0.738,1-1.375 c0.047-0.803-0.044-3.586-0.161-4.174c-0.06-0.3-0.633-1.179-0.839-1.451C41.245,19.464,42,19,42,19v-0.75l1-0.583v-4.222L42,9.25 l1-1.083V6.971l-1.056-0.915l-3.43-0.567l-0.792,0.567l-0.396-0.66c0,0-5.184-0.394-6.124-0.394c-1.203,0-1.028,0.09-1.435,1.445 l-1.726,0.176L27.875,6h-1.75l0.288-0.317C26.719,5.394,26.612,5.51,26.851,5h-6.018c-0.094,0.172-0.438,0.562-0.709,1 c0,0-0.528-0.005-0.924,0.259S18.806,7,18.278,7s-1.623,0-2.243,0C14.715,7,14.5,6,14.5,6z"
                clipRule="evenodd"
              ></path>
            </svg>
            DotaDB
          </a>
          <ul class="flex flex-wrap items-center gap-2 mb-6 text-sm font-semibold text-white sm:mb-0 ">
            <li className="hover:scale-110 hover:bg-white hover:text-black p-1 px-2 rounded ">
              <a href="#" class="hover:underline ">
                About
              </a>
            </li>
            <li className="hover:scale-110 hover:bg-white hover:text-black p-1 px-2 rounded ">
              <a href="#" class="hover:underline ">
                Privacy Policy
              </a>
            </li>
            <li className="hover:scale-110 hover:bg-white hover:text-black p-1 px-2 rounded ">
              <a href="#" class="hover:underline ">
                Licensing
              </a>
            </li>
            <li className="hover:scale-110  hover:text-black p-1 rounded ">
              <a
                href="https://steamcommunity.com/profiles/76561198170215210/"
                className="steamIcon"
                class="text-gray-500  "
              >
                <FaSteamSymbol size={20} color={"white"} />
                <span class="sr-only">Steam</span>
              </a>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a
            href="https://steamcommunity.com/profiles/76561198170215210/"
            class="hover:underline"
          >
            Niko™
          </a>
          {"   "}
          All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
