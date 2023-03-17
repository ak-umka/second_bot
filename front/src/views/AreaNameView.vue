<template>
    <div class="py-6">
        <p class="text-2xl font-semibold mb-2 pb-6 lg:mb-0">Местности</p>
        <div class="flex">
            <BarChart
                v-if="areasArray"
                :area="areasArray.areasArray"
                :count="areasArray.totalCountViolation"
            />
            <BarChart
                v-if="areasArray"
                :area="areasArray.areasArray"
                :count="areasArray.totalMembers"
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

        <!-- <div v-if="isLoading">
      <div v-if="areasId.length">
        <div class="grid grid-cols-5 gap-4 pt-6 sm:grid-cols-4">
          <div v-for="(area, index) in areasId" :key="index">
            <AreaCard :area="area" :res="areaImage" />
          </div>
        </div>
      </div>
      <div v-else class="text-2xl">Пусто</div>
    </div>
    <div v-else>
      <AtomSpinner />
    </div> -->

        <!-- <div class="grid grid-cols-5 gap-4 pt-6 sm:grid-cols-4">
      <div v-for="(area, index) in allArea" :key="index">
        <AreaCard :area="area" :res="areaImage" />
      </div>
    </div> -->
    </div>
</template>

<script setup>
import { ref, watch, computed, onBeforeMount } from "vue";
import { useTable } from "@/composables/TableMixin.js";
import { useStore } from "@/stores/areas.js";
import { useRoute } from "vue-router";
import AtomSpinner from "@/components/AtomSpinner.vue";
import BarChart from "../components/BarChart.vue";

const store = useStore();
const route = useRoute();
const { telegramLink, date, generalCount } = useTable();

onBeforeMount(async () => {
    await store.getAreaByLocality(route.params.id);
    await store.getAreaImageByLocality(route.params.id);
});

// const allArea = computed(() => store.areas); // потом удалить после того как будем получать локации из талдыка или еще где то

const areasId = computed(() => store.areaByLocality);

// const areasId = computed(() => store.getLocalityById(route.params.id));
const areaImage = computed(() => store.areasImage);

const isLoading = ref(false);

const sortAreas = computed(() => {
    if (areasId.value.length === 0) return;
    return areasId.value.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
});

watch(areasId, (val) => {
    isLoading.value = val;
});

const areasArray = computed(() => {
    if (sortAreas.value !== undefined) {
        if (sortAreas.value.length === 0) return;
        let areasArray = [];
        let totalMembers = [];
        let totalCountViolation = [];

        for (let i = 0; i < sortAreas.value.length; i++) {
            if (sortAreas.value[i].fullname === undefined) {
                sortAreas.value[i].fullname = "Нет";
            }
            if (!areasArray.includes(sortAreas.value[i].fullname)) {
                areasArray.push(sortAreas.value[i].fullname);
                if (sortAreas.value[i].violation.length) {
                    totalCountViolation.push(sortAreas.value[i].violation.length);
                }
                if (sortAreas.value[i].violation.length === 0) {
                    totalCountViolation.push(0);
                }

                let total = 0;
                for (let j = 0; j < sortAreas.value[i].members.length; j++) {
                    if (sortAreas.value[i].members[j].count === undefined) {
                        sortAreas.value[i].members[j].count = 0;
                    }
                    total += sortAreas.value[i].members[j].count;
                }
                totalMembers.push(total);
            }
        }
        return { areasArray, totalCountViolation, totalMembers };
    }
});

const getAreasImage = (fileId) => {
    const name = fileId?.split("/").pop();
    return import.meta.env.VITE_API_URL + `images/${name}`;
};

console.log(route.params.id, "areasId");
</script>