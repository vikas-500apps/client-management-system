<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-container">
      <div class="modal-content">
        <div class="modal-header">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <UserIcon class="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-slate-800">
                  {{ isEdit ? 'Edit Client' : 'Add New Client' }}
                </h3>
                <p class="text-xs sm:text-sm text-slate-600">{{ isEdit ? 'Update client information' : 'Create a new client profile' }}</p>
              </div>
            </div>
            <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200">
              <XMarkIcon class="h-5 h-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>

        <div class="modal-body max-h-[70vh] overflow-y-auto custom-scrollbar">
          <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div class="form-group">
                <label class="form-label text-sm">
                  <UserIcon class="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="input-field text-sm"
                  placeholder="Enter client's full name"
                />
              </div>

              <div class="form-group">
                <label class="form-label text-sm">
                  <BuildingOfficeIcon class="w-4 h-4 inline mr-2" />
                  Company Name *
                </label>
                <input
                  v-model="form.company"
                  type="text"
                  required
                  class="input-field text-sm"
                  placeholder="Enter company name"
                />
              </div>

              <div class="form-group">
                <label class="form-label text-sm">
                  <CalendarIcon class="w-4 h-4 inline mr-2" />
                  Age *
                </label>
                <input
                  v-model.number="form.age"
                  type="number"
                  required
                  min="1"
                  max="120"
                  class="input-field text-sm"
                  placeholder="Enter age"
                />
              </div>

              <div class="form-group">
                <label class="form-label text-sm">
                  <UsersIcon class="w-4 h-4 inline mr-2" />
                  Gender *
                </label>
                <select v-model="form.gender" required class="input-field text-sm">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label text-sm">
                  <CurrencyDollarIcon class="w-4 h-4 inline mr-2" />
                  Currency *
                </label>
                <select v-model="form.currency" required class="input-field text-sm">
                  <option value="">Select currency</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="SGD">SGD - Singapore Dollar</option>
                  <option value="Yen">Yen</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label text-sm">
                  <BanknotesIcon class="w-4 h-4 inline mr-2" />
                  Subscription Cost *
                </label>
                <input
                  v-model="form.subscriptionCost"
                  type="number"
                  step="0.01"
                  required
                  min="0"
                  class="input-field text-sm"
                  placeholder="Enter subscription cost"
                />
              </div>
            </div>

            <ImageUpload 
              v-model="form.picture" 
              :client-name="form.name"
            />

            <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t border-slate-200">
              <button
                type="button"
                @click="$emit('close')"
                class="btn-secondary w-full sm:w-auto text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="btn-primary w-full sm:w-auto flex items-center justify-center space-x-2 text-sm"
              >
                <div v-if="loading" class="spinner"></div>
                <CheckIcon v-else class="w-4 h-4" />
                <span>{{ loading ? 'Saving...' : (isEdit ? 'Update Client' : 'Add Client') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  XMarkIcon, 
  UserIcon, 
  BuildingOfficeIcon, 
  CalendarIcon, 
  UsersIcon, 
  CurrencyDollarIcon, 
  BanknotesIcon, 
  PhotoIcon, 
  CheckIcon 
} from '@heroicons/vue/24/outline'
import { ref, reactive, watchEffect, onMounted, onUnmounted } from 'vue'
import ClientAvatar from './ClientAvatar.vue'
import ImageUpload from './ImageUpload.vue'

const props = defineProps({
  client: Object,
  isEdit: Boolean
})

const emit = defineEmits(['close', 'save'])

const loading = ref(false)

const form = reactive({
  name: '',
  company: '',
  age: '',
  gender: '',
  currency: '',
  subscriptionCost: '',
  picture: ''
})

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

// Initialize form with client data if editing
watchEffect(() => {
  if (props.client && props.isEdit) {
    Object.assign(form, props.client)
  }
})

const handleSubmit = async () => {
  loading.value = true
  
  try {
    const clientData = {
      name: form.name,
      company: form.company,
      age: parseInt(form.age),
      gender: form.gender,
      currency: form.currency,
      subscriptionCost: form.subscriptionCost.toString(),
      picture: form.picture || ''
    }
    
    emit('save', clientData)
  } finally {
    loading.value = false
  }
}
</script>
