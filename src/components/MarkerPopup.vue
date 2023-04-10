<script setup>
import { computed } from "vue";
import IconPorts from "../assets/images/svg/icon-ports.svg";

const props = defineProps({
  stationData: {
    type: Object,
    required: false,
    default: () => {},
  },
});
const stationName = computed(() => {
  return props.stationData.name;
});

const stationAddress = computed(() => {
  const { city, address } = props.stationData.general_info;
  return `${city}, ${address}`;
});

const stationStatus = computed(() => {
  return props.stationData.status;
});

const stationPortsQuantity = computed(() => {
  return Object.entries(props.stationData.ports).length;
});
</script>
<template>
  <div class="w-full">
    <h4 class="mb-1 text-base text-[#000] font-medium">{{ stationName }}</h4>
    <span class="block text-gray-500 text-sm font-light mb-2">{{
      stationAddress
    }}</span>
    <ul class="flex items-center mb-1">
      <li
        v-for="(value, key) in stationStatus"
        :key="value"
        class="text-small mb-1 mr-2 capitalize"
      >
        <span
          v-if="value"
          class="relative inline-block top-[-2px] w-[6px] h-[6px] rounded-full bg-green-500 mr-1"
        ></span>
        <span
          v-else
          class="relative inline-block top-[-2px] w-[6px] h-[6px] rounded-full bg-red-500 mr-1"
        ></span>
        {{ key }}
      </li>
    </ul>
    <div class="relative flex items-center mb-2">
      <span class="block mr-1">
        <IconPorts class="w-[16px] h-[16px]" />
      </span>
      <span class="block text-small capitalize"
        >{{ stationPortsQuantity }} Ports</span
      >
    </div>
    <a
      href="#"
      class="inline-block bg-[#7aaa45] hover:bg-[#689437] !text-[white] font-bold py-2 px-4 rounded transition"
      >More details</a
    >
  </div>
</template>
