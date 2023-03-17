<template>
  <div>
    <apexchart
      width="500"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref,  } from "vue";

const props = defineProps({
  members: {
    type: Array,
    // required: true,
    default: [30, 40, 45, 50, 49, 60, 70, 91],
  },
  date: {
    type: Array,
    // required: true,
    default: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
});



const chartOptions = ref({
  chart: {
    id: "vuechart-example",
  },
  xaxis: {
    categories: props.date,
  },
});
const series = ref([
  {
    name: "series-1",
    data: props.members,
  },
]);
</script>
