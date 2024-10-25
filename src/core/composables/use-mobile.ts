import { ref, onMounted, onUnmounted } from 'vue'

export function useMobile() {
  const isMobile = ref(false)

  const checkIfMobile = () => {
    isMobile.value = window.innerWidth < 768
  }

  onMounted(() => {
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkIfMobile)
  })

  return {
    isMobile
  }
}