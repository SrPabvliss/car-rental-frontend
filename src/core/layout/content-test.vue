<script setup lang="ts">
import ContentLayout from './content-layout.vue'
</script>

<template>
  <ContentLayout title="Hola mundo">
    <template #content>
      <p>Esta es una prueba de layout</p>
    </template>
  </ContentLayout>
</template>
