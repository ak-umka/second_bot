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
import { ref, computed, onMounted, onUpdated } from "vue";
import Info from "@/components/Info.vue";
import MoleculaCard from "@/components/MoleculaCard.vue";
import { regions } from "@/options/regions.js";
import { useStore } from "@/stores/areas.js";

const store = useStore();

onMounted(async () => {
    await store.getAllAreas();
    // await regionCountViolation();
});

// onUpdated(async () => {
//     await regionCountViolation();
// });

const areas = computed(() => store.areas);

// const regionCountViolation = async () => {
//     console.log("regions", regions);
//     // regions is object and value is object
//     const totalMembers = [];

//     for (let [key, value] of Object.entries(regions)) {
//         const res = await store.getAreaByLocality(value.name);
//         let total = 0;
//         for (let i = 0; i < res.length; i++) {
//             for (let j = 0; j < res[i].members.length; j++) {
//                 if (res[i].members[j].count === undefined) {
//                     res[i].members[j].count = 0;
//                 }
//                 total += res[i].members[j].count;
//             }
//         }
//         totalMembers.push(total);
//     }
//     return totalMembers;
// };
</script>
