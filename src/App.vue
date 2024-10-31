<script setup lang="ts">
import { RouterView } from 'vue-router'
import EnvironmentIdentifier from './components/environment-identifier.vue';

console.log('Current Environment:', import.meta.env.MODE)
</script>

<template>
  <RouterView />
  <EnvironmentIdentifier />
</template>