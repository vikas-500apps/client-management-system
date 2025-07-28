<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">
        Client Management System
      </h1>
      <p class="text-gray-600">Redirecting...</p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { onMounted } from 'vue'
import { navigateTo } from '#app'

const authStore = useAuthStore()

onMounted(() => {
  if (authStore.checkAuth()) {
    navigateTo('/dashboard')
  } else {
    navigateTo('/login')
  }
})
</script>
