<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-container">
      <div class="modal-content">
        <div class="modal-header">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <CloudArrowUpIcon class="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-slate-800">Import Clients</h3>
                <p class="text-xs sm:text-sm text-slate-600">Bulk import clients from CSV file</p>
              </div>
            </div>
            <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200">
              <XMarkIcon class="h-5 h-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>

        <div class="modal-body max-h-[70vh] overflow-y-auto custom-scrollbar space-y-4 sm:space-y-6">
          <!-- File Upload Section -->
          <div class="stats-card">
            <div class="flex items-center mb-4">
              <DocumentIcon class="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 mr-2" />
              <h4 class="text-base sm:text-lg font-semibold text-slate-800">Select CSV File</h4>
            </div>
            <input
              ref="fileInput"
              type="file"
              accept=".csv"
              @change="handleFileUpload"
              class="input-field text-sm"
            />
          </div>

          <!-- CSV Format Guide -->
          <div class="stats-card">
            <div class="flex items-center mb-4">
              <InformationCircleIcon class="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 mr-2" />
              <h4 class="text-base sm:text-lg font-semibold text-slate-800">CSV Format Guide</h4>
            </div>
            <div class="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200">
              <p class="text-xs sm:text-sm text-slate-600 mb-3 font-medium">Your CSV file should include these columns in this exact order:</p>
              <div class="bg-slate-800 text-green-400 p-3 sm:p-4 rounded-lg font-mono text-xs sm:text-sm overflow-x-auto">
                <div class="text-slate-300 mb-2"># CSV Header</div>
                <div>name,company,age,gender,currency,subscriptionCost</div>
                <div class="text-slate-300 mt-2 mb-1"># Example Data</div>
                <div>John Doe,ACME Corp,30,male,USD,1500.00</div>
                <div>Jane Smith,Tech Inc,25,female,EUR,2000.00</div>
              </div>
            </div>
            
            <div class="mt-4">
              <button
                @click="downloadTemplate"
                class="btn-secondary flex items-center space-x-2 text-sm"
              >
                <ArrowDownTrayIcon class="w-4 h-4" />
                <span>Download CSV Template</span>
              </button>
            </div>
          </div>

          <!-- Preview Section -->
          <div v-if="parsedData.length > 0" class="stats-card">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <CheckCircleIcon class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mr-2" />
                <h4 class="text-base sm:text-lg font-semibold text-slate-800">Data Preview</h4>
              </div>
              <span class="badge badge-green text-xs">{{ parsedData.length }} clients found</span>
            </div>
            
            <div class="modern-table max-h-60 sm:max-h-80 overflow-y-auto custom-scrollbar">
              <table class="min-w-full">
                <thead class="table-header sticky top-0">
                  <tr>
                    <th class="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Name</th>
                    <th class="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Company</th>
                    <th class="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Age</th>
                    <th class="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Gender</th>
                    <th class="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Currency</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr v-for="(client, index) in parsedData.slice(0, 10)" :key="index" class="table-row">
                    <td class="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-slate-900">{{ client.name }}</td>
                    <td class="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-700">{{ client.company }}</td>
                    <td class="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-700">{{ client.age }}</td>
                    <td class="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-700 capitalize">{{ client.gender }}</td>
                    <td class="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-700">
                      <span class="badge badge-blue text-xs">{{ client.currency }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="parsedData.length > 10" class="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-500 bg-slate-50 text-center border-t border-slate-200">
                ... and {{ parsedData.length - 10 }} more clients
              </div>
            </div>
          </div>

          <!-- Error Messages -->
          <div v-if="errors.length > 0" class="stats-card border-l-4 border-l-red-500 bg-red-50">
            <div class="flex items-center mb-4">
              <ExclamationTriangleIcon class="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mr-2" />
              <h4 class="text-base sm:text-lg font-semibold text-red-800">Validation Errors</h4>
            </div>
            <div class="max-h-32 sm:max-h-40 overflow-y-auto custom-scrollbar">
              <ul class="space-y-2">
                <li v-for="error in errors" :key="error" class="flex items-start">
                  <XMarkIcon class="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span class="text-xs sm:text-sm text-red-700">{{ error }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t border-slate-200">
            <button
              type="button"
              @click="$emit('close')"
              class="btn-secondary w-full sm:w-auto text-sm"
            >
              Cancel
            </button>
            <button
              @click="handleImport"
              :disabled="parsedData.length === 0 || errors.length > 0 || loading"
              class="btn-success w-full sm:w-auto flex items-center justify-center space-x-2 text-sm"
            >
              <div v-if="loading" class="spinner"></div>
              <CloudArrowUpIcon v-else class="w-4 h-4" />
              <span>{{ loading ? 'Importing...' : `Import ${parsedData.length} Clients` }}</span>
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
  CloudArrowUpIcon, 
  DocumentIcon, 
  InformationCircleIcon, 
  ArrowDownTrayIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/vue/24/outline'
import Papa from 'papaparse'
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['close', 'import'])

const fileInput = ref(null)
const parsedData = ref([])
const errors = ref([])
const loading = ref(false)

const requiredFields = ['name', 'company', 'age', 'gender', 'currency', 'subscriptionCost']

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

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      validateAndParseData(results.data)
    },
    error: (error) => {
      errors.value = [`Failed to parse CSV: ${error.message}`]
    }
  })
}

const validateAndParseData = (data) => {
  errors.value = []
  const validClients = []

  data.forEach((row, index) => {
    const rowErrors = []
    
    // Check required fields
    requiredFields.forEach(field => {
      if (!row[field] || row[field].trim() === '') {
        rowErrors.push(`Row ${index + 1}: Missing ${field}`)
      }
    })

    // Validate age
    if (row.age && (isNaN(row.age) || parseInt(row.age) < 1 || parseInt(row.age) > 120)) {
      rowErrors.push(`Row ${index + 1}: Invalid age`)
    }

    // Validate gender
    if (row.gender && !['male', 'female'].includes(row.gender.toLowerCase())) {
      rowErrors.push(`Row ${index + 1}: Gender must be 'male' or 'female'`)
    }

    // Validate subscription cost
    if (row.subscriptionCost && (isNaN(row.subscriptionCost) || parseFloat(row.subscriptionCost) < 0)) {
      rowErrors.push(`Row ${index + 1}: Invalid subscription cost`)
    }

    if (rowErrors.length === 0) {
      validClients.push({
        name: row.name.trim(),
        company: row.company.trim(),
        age: parseInt(row.age),
        gender: row.gender.toLowerCase(),
        currency: row.currency.trim(),
        subscriptionCost: parseFloat(row.subscriptionCost).toFixed(2),
        picture: ''
      })
    } else {
      errors.value.push(...rowErrors)
    }
  })

  parsedData.value = validClients
}

const downloadTemplate = () => {
  const template = [
    ['name', 'company', 'age', 'gender', 'currency', 'subscriptionCost'],
    ['John Doe', 'ACME Corp', '30', 'male', 'USD', '1500.00'],
    ['Jane Smith', 'Tech Inc', '25', 'female', 'EUR', '2000.00']
  ]

  const csvContent = template.map(row => row.join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = 'client_template.csv'
  link.click()
  
  window.URL.revokeObjectURL(url)
}

const handleImport = async () => {
  if (parsedData.value.length === 0) return

  loading.value = true
  try {
    emit('import', parsedData.value)
  } finally {
    loading.value = false
  }
}
</script>
