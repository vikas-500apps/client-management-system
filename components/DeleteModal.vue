<template>
    <div class="modal-backdrop" @click.self="$emit('close')">
      <div class="modal-container max-w-md">
        <div class="modal-content">
          <div class="modal-header">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <ExclamationTriangleIcon class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 class="text-xl font-bold text-slate-800">Delete Client</h3>
                  <p class="text-sm text-slate-600">This action cannot be undone</p>
                </div>
              </div>
              <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200">
                <XMarkIcon class="h-6 w-6" />
              </button>
            </div>
          </div>
  
          <div class="modal-body">
            <!-- Client Info -->
            <div class="flex items-center space-x-4 p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200 mb-6">
              <ClientAvatar :client="client" size="md" />
              <div>
                <h4 class="text-lg font-semibold text-slate-900">{{ client.name }}</h4>
                <p class="text-sm text-slate-600">{{ client.company }}</p>
                <div class="flex items-center mt-1 space-x-2">
                  <span class="badge badge-blue text-xs">{{ client.currency }}</span>
                  <span class="text-xs text-slate-500">{{ client.subscriptionCost }}</span>
                </div>
              </div>
            </div>
  
            <!-- Warning Message -->
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
              <div class="flex items-start">
                <ExclamationTriangleIcon class="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 class="text-sm font-semibold text-red-800 mb-1">Are you absolutely sure?</h4>
                  <p class="text-sm text-red-700">
                    This will permanently delete <strong>{{ client.name }}</strong> and all associated data. 
                    This action cannot be undone and the client information will be lost forever.
                  </p>
                </div>
              </div>
            </div>
  
            <!-- Confirmation Input -->
            <div class="form-group mb-6">
              <label class="form-label text-slate-700">
                <TrashIcon class="w-4 h-4 inline mr-2" />
                Type <strong>DELETE</strong> to confirm
              </label>
              <input
                v-model="confirmText"
                type="text"
                class="input-field"
                placeholder="Type DELETE to confirm"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-100': confirmText && confirmText !== 'DELETE' }"
              />
              <p v-if="confirmText && confirmText !== 'DELETE'" class="form-error">
                Please type "DELETE" exactly to confirm
              </p>
            </div>
  
            <!-- Actions -->
            <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                @click="$emit('close')"
                class="btn-secondary w-full sm:w-auto order-2 sm:order-1"
              >
                <XMarkIcon class="w-4 h-4 mr-2" />
                Cancel
              </button>
              <button
                @click="handleDelete"
                :disabled="confirmText !== 'DELETE' || loading"
                class="btn-danger w-full sm:w-auto flex items-center justify-center space-x-2 order-1 sm:order-2"
              >
                <div v-if="loading" class="spinner"></div>
                <TrashIcon v-else class="w-4 h-4" />
                <span>{{ loading ? 'Deleting...' : 'Delete Client' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { XMarkIcon, ExclamationTriangleIcon, TrashIcon } from '@heroicons/vue/24/outline'
  import { ref, onMounted, onUnmounted } from 'vue'
  import ClientAvatar from './ClientAvatar.vue'
  
  const props = defineProps({
    client: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['close', 'confirm'])
  
  const confirmText = ref('')
  const loading = ref(false)
  
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
  
  const handleDelete = async () => {
    if (confirmText.value !== 'DELETE') return
    
    loading.value = true
    try {
      emit('confirm', props.client)
    } finally {
      loading.value = false
    }
  }
  </script>
  