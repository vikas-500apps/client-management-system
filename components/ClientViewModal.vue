<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-container">
      <div class="modal-content">
        <div class="modal-header">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <EyeIcon class="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-slate-800">Client Profile</h3>
                <p class="text-xs sm:text-sm text-slate-600">Detailed client information</p>
              </div>
            </div>
            <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200">
              <XMarkIcon class="h-5 h-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>

        <div class="modal-body max-h-[70vh] overflow-y-auto custom-scrollbar">
          <!-- Profile Header -->
          <div class="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl sm:rounded-2xl">
            <ClientAvatar :client="client" size="xl" show-status />
            <div class="text-center md:text-left flex-1">
              <h4 class="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{{ client.name }}</h4>
              <p class="text-base sm:text-lg text-slate-600 font-medium mb-3">{{ client.company }}</p>
              <div class="flex flex-wrap justify-center md:justify-start gap-2">
                <span class="badge badge-blue text-xs">{{ client.gender }}</span>
                <span class="badge badge-green text-xs">{{ client.currency }}</span>
                <span class="badge badge-yellow text-xs">{{ client.age }} years</span>
              </div>
            </div>
          </div>

          <!-- Details Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div class="space-y-4 sm:space-y-6">
              <div class="stats-card">
                <div class="flex items-center mb-3">
                  <UserIcon class="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 mr-2" />
                  <h5 class="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wide">Personal Information</h5>
                </div>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-xs sm:text-sm font-medium text-slate-500">Full Name</span>
                    <span class="text-xs sm:text-sm font-semibold text-slate-900">{{ client.name }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-xs sm:text-sm font-medium text-slate-500">Gender</span>
                    <span class="text-xs sm:text-sm font-semibold text-slate-900 capitalize">{{ client.gender }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-xs sm:text-sm font-medium text-slate-500">Age</span>
                    <span class="text-xs sm:text-sm font-semibold text-slate-900">{{ client.age }} years old</span>
                  </div>
                </div>
              </div>

              <div class="stats-card">
                <div class="flex items-center mb-3">
                  <BuildingOfficeIcon class="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 mr-2" />
                  <h5 class="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wide">Company Details</h5>
                </div>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-xs sm:text-sm font-medium text-slate-500">Company Name</span>
                    <span class="text-xs sm:text-sm font-semibold text-slate-900">{{ client.company }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-xs sm:text-sm font-medium text-slate-500">Registration Date</span>
                    <span class="text-xs sm:text-sm font-semibold text-slate-900">{{ formatDate(client.registered) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-4 sm:space-y-6">
              <div class="stats-card">
                <div class="flex items-center mb-3">
                  <CurrencyDollarIcon class="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 mr-2" />
                  <h5 class="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wide">Financial Information</h5>
                </div>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-xs sm:text-sm font-medium text-slate-500">Subscription Cost</span>
                    <div class="flex items-center space-x-2">
                      <span class="text-base sm:text-lg font-bold text-emerald-600">{{ client.subscriptionCost }}</span>
                    </div>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-xs sm:text-sm font-medium text-slate-500">Currency</span>
                    <span class="text-xs sm:text-sm badge badge-blue font-semibold">{{ client.currency }}</span>
                  </div>
                </div>
              </div>

              <div class="stats-card">
                <div class="flex items-center mb-3">
                  <ChartBarIcon class="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 mr-2" />
                  <h5 class="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wide">Account Status</h5>
                </div>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-xs sm:text-sm font-medium text-slate-500">Status</span>
                    <span class="inline-flex items-center">
                      <span class="status-dot status-active"></span>
                      <span class="text-xs sm:text-sm font-semibold text-emerald-600">Active</span>
                    </span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-xs sm:text-sm font-medium text-slate-500">Client ID</span>
                    <span class="text-xs sm:text-sm font-mono text-slate-900 bg-slate-100 px-2 py-1 rounded">{{ client.id }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-4 pt-6 sm:pt-8 border-t border-slate-200">
            <button @click="$emit('close')" class="btn-secondary text-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  XMarkIcon, 
  EyeIcon, 
  UserIcon, 
  BuildingOfficeIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon 
} from '@heroicons/vue/24/outline'
import { onMounted, onUnmounted } from 'vue'
import ClientAvatar from './ClientAvatar.vue'

const props = defineProps({
  client: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

// Prevent background scroll
onMounted(() => {
  if (process.client) {
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = 'unset'
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
