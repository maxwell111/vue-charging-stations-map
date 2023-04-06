<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "",
    reqired: false,
  },
});
defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :value="modelValue"
    type="text"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
