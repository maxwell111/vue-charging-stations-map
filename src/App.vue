<script setup>
import { ref, onMounted, computed } from "vue";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LIcon,
} from "@vue-leaflet/vue-leaflet";
import { getAllStations } from "./services/api";
import ResultsListItem from "./components/ResultsListItem.vue";
import FilterInput from "./components/FilterInput.vue";
import ClearResultsButton from "./components/ClearResultsButton.vue";
import MarkerPopup from "./components/MarkerPopup.vue";

const mapZoom = ref(6);
const mapCoordinates = ref([48.383022, 31.1828699]);
const stations = ref([]);
const markerIconSize = ref([50, 50]);
const inputFilter = ref("");

const fetchStations = async () => {
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

const setMapHandler = (coords) => {
  setMap(coords, 13);
};

const clearResultsHandler = () => {
  inputFilter.value = "";
};

const filteredStations = computed(() => {
  const query = inputFilter.value.toLowerCase();
  return stations.value.filter((station) =>
    station.general_info.city.toLowerCase().includes(query)
  );
});

const IconMarkerUrl = computed(() => {
  return new URL("./assets/images/svg/icon-marker.svg", import.meta.url).href;
});

onMounted(() => {
  fetchStations();
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
        <div class="content-left mb-5 lg:mr-5 lg:min-w-[320px]">
          <div class="stations-filter-form mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Filter:</label
            >
            <filter-input v-model="inputFilter" />
            <clear-results-button
              v-if="inputFilter"
              @clear-results="clearResultsHandler"
            />
          </div>

          <div class="stations-list">
            <results-list-item
              v-for="station in filteredStations"
              :key="station.id"
              :station-data="station"
              @set-map="setMapHandler"
            />
          </div>
        </div>
        <div class="content-right lg:flex-1">
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
                <l-icon :icon-url="IconMarkerUrl" :icon-size="markerIconSize" />
                <l-popup>
                  <marker-popup :station-data="station" />
                </l-popup>
              </l-marker>
            </l-map>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
