<template>
    <div>
        <div class="items-center px-8 lg:px-24 group hover:bg-white py-12">
            <div class="items-center flex sm:items-start">
                <div class="flex-shrink-0 b h-20 overflow-hidden sm:h-40 sm:w-40 w-20">
                    <img
                        class="h-20 w-20 sm:h-40 sm:w-40 object-cover"
                        :src="getAreasImage(areas?.images?.fileId)"
                        onerror="this.onerror=null; this.src='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';"
                        alt=""
                    />
                </div>
                <div class="text-sm flex-1 ml-6">
                    <div class="font-medium sm:flex text-gray-900">
                        <div>
                            <h5>{{ titleDate }}</h5>
                            <h2
                                class="text-black font-display font-semibold lg:text-2xl mt-2 text-lg tracking-widest"
                            >
                                {{ areas?.fullname }}
                            </h2>
                        </div>
                    </div>
                    <div>
                        <p
                            class="font-light lg:text-lg line-clamp-1 md:line-clamp-2 mt-1 text-black/60"
                        >
                            {{ areas?.fullLocation?.formatted_address }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <Chart v-if="areas" :members="countMembers" :date="date" />
        <div class="grid grid-cols-4 gap-4">
            <div v-for="(violation, index) in areas?.violation" :key="index">
                <Card
                    :image="violation?.image.fileId"
                    :desc="violation.description"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/stores/areas.js";
import Chart from "../components/Chart.vue";
import Card from "../components/Card.vue";

const store = useStore();
const route = useRoute();

onBeforeMount(async () => {
    await store.getAreaByLocality(route.params.id);
});

const areas = computed(() => store.getAreaById(route.params.name));
const violationImage = computed(() => store.violationImage);

const countMembers = computed(() => {
    const count = [];
    if (areas.value) {
        for (let i = 0; i < areas.value.members.length; i++) {
            count.push(areas.value.members[i].count);
        }
    }
    return count;
});

const date = computed(() => {
    const date = [];
    if (areas.value) {
        for (let i = 0; i < areas.value.members.length; i++) {
            const d = new Date(areas.value.members[i].date);
            date.push(d.toLocaleDateString() + " " + d.toLocaleTimeString());
        }
    }
    return date;
});

const getAreasImage = (fileId) => {
    const name = fileId?.split("/").pop();
    if (!name) return "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
    return import.meta.env.VITE_API_S3_BUCKET + `${name}`;
};

const titleDate = computed(() => {
    if (areas.value) {
        const d = new Date(areas.value.date);
        return d.toLocaleDateString() + " " + d.toLocaleTimeString();
    }
});
</script>
