<template>
  <div>
    <label :for="label">{{ label }}</label>
    <select
      :id="label"
      :location="location"
      class="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-4 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      @change="updateLocation"
    >
      <option v-for="area in areas" :key="area" :value="area">
        {{ area }}
      </option>
    </select>
    {{ location }}
  </div>
</template>

<script setup>
const props = defineProps({
  areas: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    // required: true,
  },
  location: {
    type: Array,
    // required: true,
  },
});

const emit = defineEmits(["update:location"]);

const updateLocation = (e) => {
  emit("update:location", e.target.value);
};
</script>
