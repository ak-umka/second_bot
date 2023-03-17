<template>
  <!-- <div class=" w-full md:w-[15%]"> -->
  <div class="w-full">
    <div class="bg-white rounded-lg shadow-lg">
      <div v-if="res === 'ok'">
        <img
          class="w-full h-48 object-cover rounded-t-lg"
          :src="getAreasImage(image)"
          alt=""
        />
      </div>
      <div v-else>
        <img class="w-full" src="https://via.placeholder.com/150" alt="" />
      </div>

      <div class="p-6">
        <h2
          class="font-bold mb-2 text-lg text-purple-800 md:text-sm sm:text-sm"
        >
          {{ title }}
        </h2>
        <p class="text-black mb-2">
          Подробнее о волонтерской деятельности в этой области
        </p>
        <a
          :href="'/area/' + title"
          class="text-purple-600 hover:text-purple-500 underline text-sm"
        >
          Подробнее
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  res: {
    type: String,
    default: "ok",
  },
});


const getAreasImage = (fileId) => {
  return fileId;
  // if (fileId === undefined) return "https://via.placeholder.com/150";
  // return import.meta.env.VITE_API_URL + `images/${fileId}.jpg`;
};
</script>
