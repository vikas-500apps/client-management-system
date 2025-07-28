<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { onMounted } from 'vue'

const authStore = useAuthStore()

// Initialize auth state on app start
onMounted(() => {
  authStore.checkAuth()
})
</script>
