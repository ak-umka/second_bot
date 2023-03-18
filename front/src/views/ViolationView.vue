<template>
    <div class="py-6">
        <div class="w-full">
            <p class="text-xl font-semibold mb-2 pb-6 lg:mb-0">Количество участников</p>
            <BarChart
                v-if="areasArray"
                :area="areasArray.areasArray"
                :count="areasArray.totalCountViolation"
            />
        </div>
        <div v-if="isLoading">
            <div v-if="sortAreas">
                <table class="table-auto w-full rounded-lg overflow-hidden">
                    <thead class="text-center text-gray-700 text-sm font-medium bg-white">
                        <tr>
                            <th class="px-4 py-2">Номер участка</th>
                            <th class="px-4 py-2">Имя пользователя</th>
                            <th class="px-4 py-2">ФИО</th>
                            <th class="px-4 py-2">Изображение</th>
                            <th class="px-4 py-2">Местонахождение</th>
                            <th class="px-4 py-2">Район</th>
                            <th class="px-4 py-2">Улица</th>
                            <th class="px-4 py-2">Отчет</th>
                            <th class="px-4 py-2">Дата</th>
                            <th class="px-4 py-2">Действие</th>
                        </tr>
                    </thead>
                    <tbody class="text-center text-gray-700 leading-5 text-sm bg-white">
                        <tr
                            v-for="area in sortAreas"
                            :key="area.id"
                            class="border-b border-gray-200"
                        >
                            <td class="border-b px-4 py-2">{{ area.pollingStation }}</td>
                            <td class="border-b px-4 py-2">
                                <a
                                    :href="telegramLink(area.username)"
                                    target="_blank"
                                    class="hover:text-blue-600"
                                >
                                    {{ area.username ? area.username : "Нет" }}
                                </a>
                            </td>
                            <td class="border-b px-4 py-2">{{ area.fullname }}</td>
                            <td class="border-b px-4 py-2 flex justify-center">
                                <div class="flex-shrink-0 w-10 h-10">
                                    <div>
                                        <img
                                            class="w-10 h-10 rounded-full"
                                            :src="getAreasImage(area?.images?.fileId)"
                                            onerror="this.onerror=null; this.src='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </td>
                            <td class="border-b px-4 py-2">
                                {{ area.fullLocation.locality }}
                            </td>
                            <td class="border-b px-4 py-2">
                                {{ area.fullLocation.district || area.fullLocation.street }}
                            </td>
                            <td class="border-b px-4 py-2">{{ area.fullLocation.house }}</td>
                            <td class="border-b px-4 py-2">
                                {{ generalCount(area.members) }}
                            </td>
                            <td class="border-b px-4 py-2">{{ date(area.date) }}</td>
                            <td class="border-b px-4 py-2">
                                <router-link :to="'/area/' + $route.params.id + '/' + area._id">
                                    <div
                                        class="inline-flex px-3 py-[3px] text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                                        :class="{
                                            'bg-red-500 hover:bg-red-800':
                                                area.violation.length > 0,
                                        }"
                                    >
                                        View
                                    </div>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else class="text-2xl">Пусто</div>
        </div>
        <div v-else>
            <AtomSpinner />
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, computed, watch, onUpdated } from "vue";
import { useStore } from "@/stores/areas.js";
import { useTable } from "@/composables/TableMixin.js";
import AtomSpinner from "@/components/AtomSpinner.vue";
import BarChart from "../components/BarChart.vue";

const store = useStore();
const { telegramLink, date, generalCount } = useTable();

onBeforeMount(async () => {
    await store.getAllAreas();
});

const allArea = computed(() => store.areas);

const isLoading = ref(false);
watch(allArea, (val) => {
    isLoading.value = val;
});


const getAreasImage = (fileId) => {
    const name = fileId?.split("/").pop();
    if (!name) return "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
    return import.meta.env.VITE_API_S3_BUCKET + `${name}`;
};

const sortAreas = computed(() => {
    if (allArea.value.length === 0) return;
    const areaViolation = allArea.value.filter((area) => area.violation.length > 0);
    const dateSort = areaViolation.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    return dateSort;
});

console.log(sortAreas);

const areasArray = computed(() => {
    if (allArea.value !== undefined) {
        if (allArea.value.length === 0) return;
        let areasArray = [];
        let totalCountViolation = [];

        for (let i = 0; i < allArea.value.length; i++) {
            if (allArea.value[i].fullname === undefined) {
                allArea.value[i].fullname = "Нет";
            }

            areasArray.push(allArea.value[i].fullname);
            if (allArea.value[i].violation.length) {
                totalCountViolation.push(allArea.value[i].violation.length);
            }
            if (allArea.value[i].violation.length === 0) {
                areasArray.pop();
                continue;
            }
        }
        return { areasArray, totalCountViolation };
    }
});
</script>
