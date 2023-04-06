<script setup>
defineEmits(["clearResults"]);
</script>

<template>
  <button
    class="text-sm text-blue-600 underline"
    @click="$emit('clearResults')"
  >
    Clear results
  </button>
</template>
