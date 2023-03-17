<template>
  <div>
    <p class="text-2xl font-semibold mb-2 pb-6 lg:mb-0">Карта</p>
    <Map :markers="allArea" />
  </div>
</template>

<script setup>
import { onBeforeMount, computed } from "vue";
import Map from "../components/Map.vue";
import { useStore } from "@/stores/areas.js";

const store = useStore();

onBeforeMount(async () => {
  await store.getAllAreas();
});

const allArea = computed(() => store.areas);
</script>
