<template>
  <div class="flex items-end">
    <div class="flex-1">
      <label for="locality">Город</label>
      <select
        id="locality"
        v-model="locality"
        class="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-4 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        @change="selectedVariety = null"
      >
        <option value=""></option>
        <option
          v-for="locality in uniqueLocality"
          :key="locality"
          :value="locality"
        >
          {{ locality }}
        </option>
      </select>
    </div>
    <div class="flex-1 px-2">
      <label for="political">Район</label>
      <select
        id="political"
        v-model="political"
        class="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-4 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        @change="selectedVariety = null"
      >
        <option value=""></option>
        <option
          v-for="political in uniquePolitical"
          :key="political"
          :value="political"
        >
          {{ political }}
        </option>
      </select>
    </div>
    <div class="flex-1">
      <label for="route">Улица</label>
      <select
        id="route"
        v-model="route"
        class="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-4 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        @change="selectedVariety = null"
      >
        <option value=""></option>
        <option v-for="route in uniqueRoute" :key="route" :value="route">
          {{ route }}
        </option>
      </select>
    </div>
    <div class="flex-1 px-2">
      <label for="street_number">Номер улицы</label>
      <select
        id="street_number"
        v-model="street_number"
        class="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-4 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        @change="selectedVariety = null"
      >
        <option value=""></option>
        <option
          v-for="StreetNumber in uniqueStreetNumber"
          :key="StreetNumber"
          :value="StreetNumber"
        >
          {{ StreetNumber }}
        </option>
      </select>
    </div>
    <div class="flex-2">
      <button
        class="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-2 bg-[#1da1f2] text-gray-100 sm:text-sm"
        @click="search()"
      >
        Search
      </button>
    </div>
  </div>
  <div v-if="areas" class="py-6">
    <table class="table-auto w-full rounded-lg overflow-hidden">
      <thead class="text-center text-gray-700 text-sm font-medium bg-gray-100">
        <tr>
          <th class="px-4 py-2">Username</th>
          <th class="px-4 py-2">Fullname</th>
          <th class="px-4 py-2">Locality</th>
          <th class="px-4 py-2">Political</th>
          <th class="px-4 py-2">Route</th>
          <th class="px-4 py-2">Street Number</th>
          <th class="px-4 py-2">Total Members</th>
          <th class="px-4 py-2">Date</th>
          <th class="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody class="text-center text-gray-700 leading-5 text-sm bg-white">
        <tr
          v-for="area in searchState"
          :key="area.id"
          class="border-b border-gray-200"
        >
          <td class="border-b px-4 py-2">
            <a
              :href="telegramLink(area.username)"
              target="_blank"
              class="hover:text-blue-600"
            >
              {{ area.username }}
            </a>
          </td>
          <td class="border-b px-4 py-2">{{ area.fullname }}</td>
          <td class="border-b px-4 py-2">
            {{ area.fullLocation.locality }}
          </td>
          <td class="border-b px-4 py-2">
            {{ area.fullLocation.political }}
          </td>
          <td class="border-b px-4 py-2">{{ area.fullLocation.route }}</td>
          <td class="border-b px-4 py-2">
            {{ area.fullLocation.street_number }}
          </td>
          <td class="border-b px-4 py-2">
            {{ generalCount(area.members) }}
          </td>
          <td class="border-b px-4 py-2">{{ date(area.date) }}</td>
          <td class="border-b px-4 py-2">
            <router-link :to="'/details/' + area._id">
              <div
                class="inline-flex px-3 py-[3px] text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                :class="{
                  'bg-green-100 text-green-800': area.violation.length === 0,
                  'bg-red-500 text-red-100': area.violation.length !== 0,
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
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "@/stores/areas.js";
import Select from "@/components/Select.vue";
import { useTable } from "@/composables/TableMixin.js";

const store = useStore();
const { telegramLink, date, generalCount } = useTable();

onMounted(async () => {
  await store.getAllAreas();
});

const locality = ref([]);
const political = ref([]);
const route = ref([]);
const street_number = ref([]);

const areas = computed(() => store.areas);

const searchState = computed(() => {
  if (store.searchState.length > 0) {
    return store.searchState;
  } else {
    return areas.value;
  }
});

const allLocality = computed(() =>
  areas.value.map((area) => area.fullLocation.locality)
);
const allPolitical = computed(() =>
  areas.value.map((area) => area.fullLocation.political)
);
const allRoute = computed(() =>
  areas.value.map((area) => area.fullLocation.route)
);
const allStreetNumber = computed(() =>
  areas.value.map((area) => area.fullLocation.street_number)
);

const selectedVariety = ref(null);

const uniqueLocality = computed(() => {
  if (allLocality.value.length > 0) {
    return [...new Set(allLocality.value)];
  }
});
const uniquePolitical = computed(() => {
  if (allPolitical.value.length > 0) {
    return [...new Set(allPolitical.value)];
  }
});
const uniqueRoute = computed(() => {
  if (allRoute.value.length > 0) {
    return [...new Set(allRoute.value)];
  }
});
const uniqueStreetNumber = computed(() => {
  if (allStreetNumber.value.length > 0) {
    return [...new Set(allStreetNumber.value)];
  }
}); 

const search = () => {
  store.searchArea({
    locality: locality.value,
    political: political.value,
    route: route.value,
    street_number: street_number.value,
  });
};
</script>
