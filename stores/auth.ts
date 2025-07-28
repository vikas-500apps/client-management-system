import { defineStore } from "pinia"
import { useRuntimeConfig } from "#app"
import { $fetch } from "ofetch"
import { navigateTo } from "#app"

interface User {
  id: string
  username: string
  email: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(username: string, password: string) {
      try {
        const config = useRuntimeConfig()
        const response = await $fetch<any[]>(`${config.public.apiBase}/users`, {
          query: {
            username,
            password,
          },
        })

        if (response.length > 0) {
          const user = response[0]

          // Create a simple JWT-like token (in production, this should be done server-side)
          const token = btoa(
            JSON.stringify({
              userId: user.id,
              username: user.username,
              exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
            }),
          )

          this.user = user
          this.token = token
          this.isAuthenticated = true

          // Store in localStorage for persistence
          if (process.client) {
            localStorage.setItem("auth_token", token)
            localStorage.setItem("user", JSON.stringify(user))
          }

          return { success: true }
        } else {
          return { success: false, message: "Invalid credentials" }
        }
      } catch (error) {
        return { success: false, message: "Login failed" }
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false

      if (process.client) {
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user")
      }

      navigateTo("/login")
    },

    checkAuth() {
      if (process.client) {
        const token = localStorage.getItem("auth_token")
        const userStr = localStorage.getItem("user")

        if (token && userStr) {
          try {
            const tokenData = JSON.parse(atob(token))

            // Check if token is expired
            if (tokenData.exp > Date.now()) {
              this.token = token
              this.user = JSON.parse(userStr)
              this.isAuthenticated = true
              return true
            } else {
              this.logout()
              return false
            }
          } catch (error) {
            this.logout()
            return false
          }
        }
      }
      return false
    },
  },
})
