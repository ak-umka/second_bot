<template>
  <div>
    <p class="text-2xl font-semibold mb-2 pb-6 lg:mb-0">Общая статистика</p>
    <!-- <div v-if="isLoading"> -->
    <div v-if="allArea">
      <table class="table-auto w-full rounded-lg overflow-hidden">
        <thead class="text-center text-gray-700 text-sm font-medium bg-white">
          <tr>
            <th class="px-4 py-2">Номер участка</th>
            <th class="px-4 py-2">Имя пользователя</th>
            <th class="px-4 py-2">ФИО</th>
            <th class="px-4 py-2">Изображение</th>
            <th class="px-4 py-2">Местонахождение</th>
            <th class="px-4 py-2">Дата</th>
          </tr>
        </thead>
        <tbody class="text-center text-gray-700 leading-5 text-sm bg-white">
          <tr
            v-for="area in allArea"
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
                <div v-if="areaImage === 'ok'">
                  <img
                    class="w-10 h-10 rounded-full"
                    :src="getAreasImage(area?.images?.fileId)"
                    alt=""
                  />
                </div>
                <div v-else>
                  <img
                    class="w-10 h-10 rounded-full"
                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                    alt=""
                  />
                </div>
              </div>
            </td>
            <td class="border-b px-4 py-2">
              {{ area.fullLocation.formatted_address }}
            </td>
            <td class="border-b px-4 py-2">{{ date(area.date) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-2xl">Пусто</div>
    <!-- </div>
    <div v-else>
      <AtomSpinner />
    </div> -->
  </div>
</template>
<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { useStore } from "@/stores/areas.js";
import { useTable } from "@/composables/TableMixin.js";
import AtomSpinner from "@/components/AtomSpinner.vue";

const store = useStore();
const { telegramLink, date } = useTable();

onBeforeMount(async () => {
  await store.getAllAreas();
  await store.getAreaImage();
});

const allArea = computed(() => store.areas);
const areaImage = computed(() => store.areasImage);

const isLoading = ref(false);

const getAreasImage = (fileId) => {
  const name = fileId?.split("/").pop().split(".").shift();
  const fileName = name + "." + "jpg";
  // if (fileId === undefined)
  //   return "https://ui-avatars.com/api/?background=0D8ABC&color=fff?name=No+Image?rounded=true?size=128";
  return import.meta.env.VITE_API_URL + `images/${fileName}`;
};
</script>
