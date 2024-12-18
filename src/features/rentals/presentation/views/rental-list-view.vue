<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import CustomBreadcrumb from '@/shared/components/custom-breadcrumb.vue'

import Button from '@/components/ui/button/Button.vue'

import RentalTable from '../components/rental-table.vue'
</script>

<template>
  <ContentLayout title="Alquileres">
    <template #content>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <CustomBreadcrumb
            :items="[{ label: 'Alquiler', href: 'rental', current: true }]"
          />
          <div class="flex justify-end">
            <Button>Rentar un vehículo</Button>
          </div>
        </div>

        <RentalTable />
      </div>
    </template>
  </ContentLayout>
</template>
