<script setup>
import { ref, onMounted } from "vue";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import { getAllStations } from "./services/api";
import ResultsListItem from "./components/ResultsListItem.vue";

const mapZoom = ref(6);
const mapCoordinates = ref([48.383022, 31.1828699]);
const stations = ref([]);

const fetchAllStations = async () => {
  const request = await getAllStations();
  if (!request) {
    return;
  }
  request.data.forEach((element) => {
    stations.value.push(element);
  });
};

const stationsCoordinates = (station) => {
  return Object.values(station.coordinates);
};

const setMap = (coords, zoom) => {
  mapCoordinates.value = coords;
  mapZoom.value = zoom;
};

const setMapEmitHandler = (coords) => {
  setMap(coords, 13);
};

onMounted(() => {
  fetchAllStations();
});
</script>

<template>
  <div class="wrap lg:py-[40px]">
    <div class="container mx-auto m-auto lg:w-[1200px] px-[20px]">
      <div class="title">
        <h1 class="text-3xl lg:text-5xl font-extrabold mb-5">
          Charging stations map
        </h1>
      </div>
      <div class="content lg:flex">
        <div class="stations-list mb-5 lg:mr-5 lg:min-w-[320px]">
          <results-list-item
            v-for="station in stations"
            :key="station.id"
            :station-data="station"
            @set-map-emit="setMapEmitHandler"
          />
        </div>
        <div class="stations-map w-full h-[300px] md:h-[420px] lg:h-[600px]">
          <l-map
            ref="map"
            v-model:zoom="mapZoom"
            :use-global-leaflet="false"
            :center="[...mapCoordinates]"
          >
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></l-tile-layer>
            <l-marker
              v-for="station in stations"
              :key="station.id"
              :lat-lng="stationsCoordinates(station)"
              draggable
            >
              <l-popup>
                {{ station.name }}
              </l-popup>
            </l-marker>
          </l-map>
        </div>
      </div>
    </div>
  </div>
</template>
