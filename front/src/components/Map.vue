<template>
  <div>
    <GMapMap
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      class="w-full h-screen"
    >
      <GMapCluster>
        <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="location(m.location)"
          :clickable="true"
          :draggable="true"
          @mouseover="openMarker(m._id)"
          @mouseout="openMarker(null)"
        >
          <GMapInfoWindow
            :closeclick="true"
            @closeclick="openMarker(null)"
            :opened="openedMarkerID === m._id"
          >
            <div>Голос {{ generalCount(m.members) }}</div>
          </GMapInfoWindow>
        </GMapMarker>
      </GMapCluster>
    </GMapMap>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const props = defineProps({
  markers: {
    type: Array,
    required: false,
  },
});
const openedMarkerID = ref(null);
const center = ref({ lat: 45.377232, lng: 79.351501 });


function openMarker(id) {
  openedMarkerID.value = id;
}

const generalCount = (members) => {
  let total = 0;
  for (let i = 0; i < members.length; i++) {
    total += members[i].count;
  }
  return total;
};

const location = (location) => {
  return {
    lat: location.latitude,
    lng: location.longitude,
  };
};
</script>
