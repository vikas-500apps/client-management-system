<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <!-- Logo and Header -->
      <div class="text-center mb-8 animate-fadeInUp">
        <div class="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <h2 class="text-3xl font-bold gradient-text mb-2">
          Welcome Back
        </h2>
        <p class="text-slate-600 font-medium">Sign in to your account to continue</p>
      </div>
      
      <!-- Login Form -->
      <div class="card animate-slideInRight">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div class="space-y-4">
            <div class="form-group">
              <label for="username" class="form-label">
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Username
              </label>
              <input
                id="username"
                v-model="form.username"
                name="username"
                type="text"
                required
                class="input-field"
                placeholder="Enter your username"
              />
            </div>
            
            <div class="form-group">
              <label for="password" class="form-label">
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Password
              </label>
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                required
                class="input-field"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div class="flex">
              <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-red-700 font-medium">{{ error }}</p>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <svg v-if="loading" class="spinner" viewBox="0 0 24 24"></svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
          </button>
        </form>
        
        <!-- Demo Credentials -->
        <div class="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div class="flex items-center mb-2">
            <svg class="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h4 class="text-sm font-semibold text-blue-800">Demo Credentials</h4>
          </div>
          <div class="space-y-1 text-sm text-blue-700">
            <p><span class="font-medium">Username:</span> admin</p>
            <p><span class="font-medium">Password:</span> admin123</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
definePageMeta({
  layout: false
})

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  username: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

// Check if already authenticated
onMounted(() => {
  if (authStore.checkAuth()) {
    router.push('/dashboard')
  }
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  const result = await authStore.login(form.username, form.password)
  
  if (result.success) {
    router.push('/dashboard')
  } else {
    error.value = result.message || 'Login failed'
  }
  
  loading.value = false
}
</script>
