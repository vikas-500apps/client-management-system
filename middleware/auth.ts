import { defineNuxtRouteMiddleware } from "#app"
import { useAuthStore } from "../stores/auth"
import { navigateTo } from "#app"

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  // Check authentication on client side
  if (process.client) {
    const isAuthenticated = authStore.checkAuth()

    if (!isAuthenticated) {
      return navigateTo("/login")
    }
  }
})
