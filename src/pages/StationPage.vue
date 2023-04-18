<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { getStation } from "../services/api";

const route = useRoute();
const stationData = ref(null);

const fetchStations = async (id) => {
  const request = await getStation(id);
  if (!request) {
    return;
  }
  stationData.value = request.data;
};

onBeforeMount(() => {
  const stationID = route.params.id;
  fetchStations(stationID);
});
</script>

<template>
  <div class="wrap lg:py-[40px]">
    <div class="container mx-auto m-auto lg:w-[1200px] px-[20px]">
      {{ stationData }}
    </div>
  </div>
</template>
