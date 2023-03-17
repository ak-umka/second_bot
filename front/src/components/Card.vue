<template>
  <div>
    <div class="mt-4 mb-3">
      <div class="max-w-sm mt-6 overflow-hidden bg-white rounded shadow-lg">
        <div v-if="res">
          <img
            class="w-full"
            :src="getAreasImage(image)"
            alt="Sunset in the mountains"
          />
        </div>
        <div v-else>
          <img
            class="w-full"
            src="https://via.placeholder.com/150"
            alt="Sunset in the mountains"
          />
        </div>
        <div class="px-6 py-4">
          <div class="mb-2 text-xl font-bold text-gray-900">Нарушение</div>
          <p class="text-base text-gray-700">
            {{ desc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  image: {
    type: String,
    // default: "https://picsum.photos/id/1016/384/234",
  },
  desc: {
    type: String,
    default:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
  },
  res: {
    type: String,
  },
});

const getAreasImage = (fileId) => {
  const name = fileId?.split("/").pop();
  // return `http://18.141.205.103:3001/images/Violation/${fileId}.jpg`;
  return import.meta.env.VITE_API_URL + `images/Violation/${name}`;
};
</script>
