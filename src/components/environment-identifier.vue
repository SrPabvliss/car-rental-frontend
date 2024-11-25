<script setup lang="ts">
import { ref, computed } from 'vue'

const envInfo = ref({
  title: import.meta.env.VITE_APP_TITLE,
  apiUrl: import.meta.env.VITE_API_URL,
  nodeEnv: import.meta.env.VITE_NODE_ENV,
})

const isExpanded = ref(false)

const getShortNodeEnv = computed(() => {
  return envInfo.value.nodeEnv === 'development' ? 'DEV' : 'TEST'
})
</script>

<template>
  <div
    v-if="['development', 'test'].includes(envInfo.nodeEnv)"
    class="env-indicator"
    :class="{ expanded: isExpanded }"
    @click="isExpanded = !isExpanded"
  >
    <div v-if="isExpanded" class="env-content">
      <pre>{{ JSON.stringify(envInfo, null, 2) }}</pre>
    </div>
    <div class="env-label" :class="envInfo.nodeEnv">
      {{ getShortNodeEnv }}
    </div>
  </div>
</template>

<style scoped>
.env-indicator {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 8px;
  font-size: 12px;
  z-index: 9999;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.env-indicator:hover {
  transform: scale(1.05);
}

.env-label {
  padding: 8px 12px;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
}

.expanded {
  padding: 10px;
  max-width: 300px;
}

.expanded .env-label {
  margin-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.env-content {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 8px;
}

.development {
  color: #4ade80; /* verde */
}

.test {
  color: #fbbf24; /* amarillo */
}

pre {
  margin: 0;
  white-space: pre-wrap;
}
</style>
