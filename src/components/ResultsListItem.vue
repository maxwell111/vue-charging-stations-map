<script setup>
import { computed, defineEmits } from "vue";

const props = defineProps({
  stationData: {
    type: Object,
    required: false,
  },
});

defineEmits(["setMap"]);

const stationName = computed(() => {
  return props.stationData.name;
});

const stationAddress = computed(() => {
  const { city, address } = props.stationData.general_info;
  return `${city}, ${address}`;
});

const stationCoordinates = computed(() => {
  return Object.values(props.stationData.coordinates);
});
</script>

<template>
  <div
    class="stations-item cursor-pointer mb-2 py-5 px-4 shadow-lg rounded bg-gray-50"
    @click="$emit('setMap', stationCoordinates)"
  >
    <div class="stations-item-content-top">
      <h3 class="text-base text-[#00a500] font-medium">
        {{ stationName }}
      </h3>
    </div>
    <div class="stations-item-content-bottom flex mt-2">
      <div class="stations-item-info flex flex-1">
        <div class="info-item flex">
          <span class="text-gray-500 text-sm font-light">{{
            stationAddress
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
