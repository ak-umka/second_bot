<template>
  <div class="h-100">
    <apexchart
      width="500"
      :height="heightSize()"
      type="bar"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
  area: {
    type: Array,
    default: [
      "South Korea",
      "Canada",
      "United Kingdom",
      "Netherlands",
      "Italy",
      "France",
      "Japan",
      "United States",
      "China",
      "Germany",
    ],
  },
  count: {
    type: Array,
    default: [30, 40, 45, 50, 49, 60, 70, 91],
  },
});

function heightSize() {
  if (props.area.length > 30) {
    return 900;
  } else if (props.area.length > 20) {
    return 600;
  } else {
    return 350;
  }
}

const options = ref({
  chart: {
    id: "vuechart-example",
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    },
  },
  xaxis: {
    categories: props.area,
  },
});
const series = ref([
  {
    name: "series-1",
    data: props.count,
  },
]);
</script>
