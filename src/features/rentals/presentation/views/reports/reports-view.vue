
<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ref } from 'vue'

import MostRentedCars from '../../components/reports/top-rented-cars-list.vue'
import AverageDurationByCarType from '../../components/reports/duration-by-type-chart.vue'
import TotalIncomeByCarType from '../../components/reports/income-by-type-chart.vue'
import CarRentalsByType from '../../components/reports/rental-distribution-chart.vue'

const isLoading = ref(false)
</script>

<template>
  <ContentLayout title="Reportes y Análisis">
    <template #content>
      <div class="space-y-6">
        <Tabs defaultValue="distribution" class="w-full">
          <TabsList class="w-full justify-start">
            <TabsTrigger value="distribution">Distribución de Alquileres</TabsTrigger>
            <TabsTrigger value="income">Ingresos por Tipo</TabsTrigger>
            <TabsTrigger value="duration">Duración de Alquileres</TabsTrigger>
            <TabsTrigger value="top">Más Rentados</TabsTrigger>
          </TabsList>

          <TabsContent value="distribution" class="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Alquileres por Tipo de Vehículo</CardTitle>
                <CardDescription>
                  Visualización de la cantidad de alquileres por cada categoría de vehículo
                </CardDescription>
              </CardHeader>
              <CardContent class="h-96">
                <CarRentalsByType />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="income" class="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ingresos por Tipo de Vehículo</CardTitle>
                <CardDescription>
                  Análisis de ingresos generados por cada tipo de vehículo
                </CardDescription>
              </CardHeader>
              <CardContent class="h-96">
                <TotalIncomeByCarType />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="duration" class="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Duración de Alquileres por Tipo</CardTitle>
                <CardDescription>
                  Promedio, mínimo y máximo de días de alquiler por tipo de vehículo
                </CardDescription>
              </CardHeader>
              <CardContent class="h-96">
                <AverageDurationByCarType />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="top" class="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vehículos Más Rentados</CardTitle>
                <CardDescription>
                  Top 5 de vehículos con mayor cantidad de alquileres
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MostRentedCars />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </template>
  </ContentLayout>
</template>