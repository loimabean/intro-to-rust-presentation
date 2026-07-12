<script setup lang="ts">
import { useNav } from "@slidev/client";
import { computed } from "vue";

const { currentSlideNo, total } = useNav();

const progress = computed(() => (currentSlideNo.value / total.value) * 100);
</script>

<template>
  <footer
    class="absolute left-0 right-0 z-10 transition-all duration-300 ease-in-out"
    :class="currentSlideNo > 1 ? 'bottom-0 opacity-100' : 'opacity-0 -bottom-4'"
  >
    <span
      class="text-xs font-light text-taupe-500 dark:text-taupe-400 flex justify-end pb-1 pr-2 tabular-nums"
      >{{ currentSlideNo }} / {{ total }}</span
    >
    <div class="h-1 w-full bg-taupe-200 dark:bg-taupe-800">
      <div
        class="h-full bg-rust-500 transition-[width] duration-300 ease-out"
        :style="{ width: `${progress}%` }"
      />
    </div>
  </footer>
</template>
