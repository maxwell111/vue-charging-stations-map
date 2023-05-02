<script setup>
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getStation } from "../services/api";
import IconPorts from "../assets/images/svg/icon-ports.svg";

const route = useRoute();
const stationData = ref(null);

const fetchStations = async (id) => {
  const request = await getStation(id);
  if (!request) {
    return;
  }
  stationData.value = request.data;
};

const stationMainImage = computed(() => {
  return stationData.value ? stationData.value.images.main : "";
});

const stationName = computed(() => {
  return stationData.value ? stationData.value.name : "";
});

const stationExtraImages = computed(() => {
  return stationData.value ? stationData.value.images.extra : [];
});

const stationPorts = computed(() => {
  return stationData.value ? stationData.value.ports : [];
});

const stationOverview = computed(() => {
  const stationGeneralInfo = stationData.value
    ? stationData.value.general_info
    : {};
  const { city, address, phone } = stationGeneralInfo;
  return {
    address: `${city}, ${address}`,
    phone,
  };
});

const stationPortClass = (portStatus = "") => {
  return portStatus === "available" ? "bg-[#46c646]" : "bg-[#ff3232]";
};

onBeforeMount(() => {
  const stationID = route.params.id;
  fetchStations(stationID);
});

onMounted(() => {
  document.body.classList.add("page-station", "bg-[#f2f2f2]");
});
</script>

<template>
  <div class="wrap lg:py-[40px] bg-[#f2f2f2]">
    <div class="container mx-auto m-auto lg:w-[1200px] px-[20px]">
      <div class="station-content lg:flex py-4">
        <div class="station-content-media lg:flex-1">
          <div class="media-main-image mb-2">
            <figure>
              <img :src="stationMainImage" :alt="stationName" class="w-full" />
            </figure>
          </div>
          <div class="media-previews">
            <div class="media-previews-list flex">
              <div
                v-for="image in stationExtraImages"
                :key="image"
                class="media-previews-item flex-1 mr-1"
              >
                <figure class="w-full">
                  <img :src="image" :alt="image" class="w-full" />
                </figure>
              </div>
            </div>
          </div>
        </div>
        <div class="station-info mt-4 lg:mt-0 lg:ml-4 lg:w-[55%]">
          <h1 class="text-3xl lg:text-5xl font-extrabold mb-5">
            {{ stationName }}
          </h1>
          <h2 class="text-xl lg:text-3xl font-bold mb-5">Charging Ports:</h2>
          <div class="station-info-ports">
            <div
              v-for="port in stationPorts"
              :key="port"
              class="ports-item relative flex items-center mb-2"
            >
              <div class="ports-icon">
                <span
                  class="mr-2 flex items-center justify-center border border-[#ddd] w-[50px] h-[50px]"
                >
                  <IconPorts class="w-[26px] h-[26px]" />
                </span>
              </div>
              <div class="ports-info w-full flex justify-between">
                <span class="text-small capitalize"
                  >Power:
                  <span class="inline-block text-green-500 font-bold">{{
                    port.power
                  }}</span>
                  kWt</span
                >
                <span
                  class="capitalize px-[5px] py-[1px] rounded-lg"
                  :class="stationPortClass(port.status)"
                  >{{ port.status }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="station-overview lg:max-w-[44%]">
        <h2 class="text-xl lg:text-3xl font-bold mb-5">Location info:</h2>
        <div
          v-for="(value, key) in stationOverview"
          :key="key"
          class="flex mb-2 justify-between border-b border-dashed border-[#ddd] pb-2"
        >
          <span class="w-[40%] items-start break-words capitalize"
            >{{ key }}:</span
          >
          <span> {{ value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
