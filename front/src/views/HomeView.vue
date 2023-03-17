<template>
    <div>
        <Info v-if="areas" :areas="areas" />

        <div class="mt-8" />

        <div class="grid grid-cols-5 gap-5">
            <div v-for="region in regions" :key="region">
                <MoleculaCard :title="region.name" :image="region.image" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Info from "@/components/Info.vue";
import MoleculaCard from "@/components/MoleculaCard.vue";
import { regions } from "@/options/regions.js";
import { useStore } from "@/stores/areas.js";

const store = useStore();

onMounted(async () => {
    await store.getAllAreas();
    await store.downloadAreaImage();
});

const areas = computed(() => store.areas);
</script>
