<template>
    <div class="flex">
        <div
            class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0"
        >
            <div class="flex items-center justify-center mt-8">
                <router-link to="/">
                    <div class="flex items-center">
                        <svg
                            class="w-8 h-8 ml-2 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                            ></path>
                        </svg>

                        <span class="mx-2 text-2xl font-semibold text-white">Штаб</span>
                    </div>
                </router-link>
            </div>

            <nav class="mt-10">
                <p class="pl-4 text-xs font-semibold mb-4 text-gray-400">GENERAL</p>

                <router-link
                    class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'info' ? activeClass : inactiveClass]"
                    to="/info"
                >
                    <svg
                        class="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        ></path>
                    </svg>

                    <span class="mx-4 text-white">Общая информация</span>
                </router-link>

                <!-- <router-link
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'info' ? activeClass : inactiveClass]"
          to="/info"
        >
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>

          <span class="mx-4 text-white">Еще думаю</span>
        </router-link> -->
                <router-link
                    class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'map' ? activeClass : inactiveClass]"
                    to="/map"
                >
                    <svg
                        class="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M12 21.25C11.853 21.2514 11.7093 21.2059 11.59 21.12C11.29 20.93 4.25 16.2 4.25 10.45C4.25 8.39452 5.06652 6.42328 6.51992 4.96987C7.97333 3.51647 9.94457 2.69995 12 2.69995C14.0554 2.69995 16.0267 3.51647 17.4801 4.96987C18.9335 6.42328 19.75 8.39452 19.75 10.45C19.75 16.2 12.75 20.93 12.41 21.12C12.2907 21.2059 12.147 21.2514 12 21.25ZM12 4.24995C10.3494 4.24463 8.7642 4.89454 7.59238 6.05699C6.42056 7.21943 5.75794 8.79939 5.75 10.45C5.75 14.66 10.54 18.51 12 19.58C13.46 18.51 18.25 14.66 18.25 10.45C18.2421 8.79939 17.5794 7.21943 16.4076 6.05699C15.2358 4.89454 13.6506 4.24463 12 4.24995Z"
                                fill="#ffffff"
                            ></path>
                            <path
                                d="M12 12.75C11.4561 12.75 10.9244 12.5887 10.4722 12.2865C10.0199 11.9844 9.66747 11.5549 9.45933 11.0524C9.25119 10.5499 9.19673 9.99695 9.30284 9.4635C9.40895 8.93006 9.67086 8.44005 10.0555 8.05546C10.4401 7.67086 10.9301 7.40895 11.4635 7.30284C11.997 7.19673 12.5499 7.25119 13.0524 7.45933C13.5549 7.66747 13.9844 8.01995 14.2865 8.47218C14.5887 8.92442 14.75 9.4561 14.75 10C14.75 10.7293 14.4603 11.4288 13.9445 11.9445C13.4288 12.4603 12.7293 12.75 12 12.75ZM12 8.75C11.7528 8.75 11.5111 8.82331 11.3055 8.96066C11.1 9.09802 10.9398 9.29324 10.8452 9.52165C10.7505 9.75005 10.7258 10.0014 10.774 10.2439C10.8223 10.4863 10.9413 10.7091 11.1161 10.8839C11.2909 11.0587 11.5137 11.1778 11.7561 11.226C11.9986 11.2742 12.2499 11.2495 12.4784 11.1549C12.7068 11.0602 12.902 10.9 13.0393 10.6945C13.1767 10.4889 13.25 10.2472 13.25 10C13.25 9.66848 13.1183 9.35054 12.8839 9.11612C12.6495 8.8817 12.3315 8.75 12 8.75Z"
                                fill="#ffffff"
                            ></path>
                        </g>
                    </svg>

                    <span class="mx-4 text-white">Карта</span>
                </router-link>
                <router-link
                    class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'violation' ? activeClass : inactiveClass]"
                    to="/violation"
                >
                    <svg
                        class="w-5 h-5 text-white"
                        version="1.1"
                        viewBox="0 0 512 512"
                        xml:space="preserve"
                        fill="#ffffff"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <path
                                    class="st0"
                                    d="M437.014,74.978C390.77,28.696,326.608-0.014,256,0C185.393-0.014,121.222,28.696,74.977,74.978 C28.696,121.222-0.015,185.392,0,256c-0.015,70.608,28.696,134.778,74.977,181.022C121.222,483.304,185.393,512.015,256,512 c70.608,0.015,134.77-28.696,181.014-74.978c46.289-46.244,75-110.414,74.986-181.022 C512.014,185.392,483.304,121.222,437.014,74.978z M399.474,112.526c36.763,36.799,59.414,87.355,59.43,143.474 c-0.015,56.118-22.667,106.674-59.43,143.474c-36.807,36.763-87.363,59.416-143.474,59.43 c-56.119-0.014-106.674-22.667-143.474-59.43C75.762,362.674,53.111,312.118,53.096,256 c0.014-56.118,22.666-106.674,59.429-143.474c36.8-36.763,87.356-59.415,143.474-59.43 C312.111,53.112,362.667,75.763,399.474,112.526z"
                                ></path>
                                <path
                                    class="st0"
                                    d="M246.681,303.592c0.312,2.075,1.349,4.067,3.104,5.986c1.748,1.911,3.822,2.866,6.215,2.866 c5.57,0,8.681-2.948,9.311-8.852l18.644-143.214c0.311-2.533,0.474-6.126,0.474-10.748c0-7.17-2.466-13.689-7.4-19.593 c-4.94-5.889-11.948-8.837-21.029-8.837c-9.415,0-16.496,3.022-21.266,9.066c-4.778,5.904-7.171,12.356-7.171,19.364 c0,4.31,0.156,7.888,0.474,10.748L246.681,303.592z"
                                ></path>
                                <path
                                    class="st0"
                                    d="M256,390.792c8.118,0,14.962-2.778,20.548-8.362c5.57-5.563,8.356-12.422,8.356-20.541 c0-8.126-2.785-14.978-8.356-20.556c-5.414-5.422-12.266-8.126-20.548-8.126c-8.118,0-14.971,2.8-20.556,8.364 c-5.578,5.585-8.356,12.348-8.356,20.318c0,7.637,2.778,14.407,8.356,20.303C241.029,387.934,247.882,390.792,256,390.792z"
                                ></path>
                            </g>
                        </g>
                    </svg>
                    <span class="mx-4 text-white">Нарушение</span>
                </router-link>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
//   import { useSidebar } from "../hooks/useSidebar";

//   const { isOpen } = useSidebar();
const activeClass = ref("bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100");
const inactiveClass = ref(
    "border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
);
</script>
