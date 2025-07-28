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

useHead({
  title: 'Client Dashboard',
  meta: [
    { name: 'description', content: 'Manage your clients with ease and efficiency.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { charset: 'utf-8' }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ]
})
</script>
