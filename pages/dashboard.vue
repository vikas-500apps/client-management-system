<template>
  <div class="max-w-7xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <div class="py-4 sm:py-6">
      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 sm:mb-8 space-y-4 lg:space-y-0">
        <div class="animate-fadeInUp">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-2">Client Dashboard</h1>
          <p class="text-slate-600 font-medium text-sm sm:text-base">Manage your clients with ease and efficiency</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <div class="stats-card card-hover animate-fadeInUp" style="animation-delay: 0.1s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide">Total Clients</p>
              <p class="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mt-1 sm:mt-2">{{
                clientsStore.clients.length }}</p>
              <p class="text-xs sm:text-sm text-emerald-600 font-medium mt-1">
                <span class="inline-flex items-center">
                  <ArrowTrendingUpIcon class="w-3 h-3 mr-1" />
                  Active
                </span>
              </p>
            </div>
            <div
              class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <UsersIcon class="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>
        </div>

        <div class="stats-card card-hover animate-fadeInUp" style="animation-delay: 0.2s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide">Total Revenue</p>
              <p class="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mt-1 sm:mt-2">${{ totalRevenue }}</p>
              <p class="text-xs sm:text-sm text-emerald-600 font-medium mt-1">
                <span class="inline-flex items-center">
                  <ArrowTrendingUpIcon class="w-3 h-3 mr-1" />
                  +12.5%
                </span>
              </p>
            </div>
            <div
              class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <CurrencyDollarIcon class="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>
        </div>

        <div class="stats-card card-hover animate-fadeInUp" style="animation-delay: 0.3s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide">Companies</p>
              <p class="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mt-1 sm:mt-2">{{ uniqueCompanies }}</p>
              <p class="text-xs sm:text-sm text-blue-600 font-medium mt-1">
                <span class="inline-flex items-center">
                  <BuildingOfficeIcon class="w-3 h-3 mr-1" />
                  Registered
                </span>
              </p>
            </div>
            <div
              class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <BuildingOfficeIcon class="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>
        </div>

        <div class="stats-card card-hover animate-fadeInUp" style="animation-delay: 0.4s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide">Average Age</p>
              <p class="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mt-1 sm:mt-2">{{ averageAge }}</p>
              <p class="text-xs sm:text-sm text-orange-600 font-medium mt-1">
                <span class="inline-flex items-center">
                  <ChartBarIcon class="w-3 h-3 mr-1" />
                  Years
                </span>
              </p>
            </div>
            <div
              class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <ChartBarIcon class="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="card mb-6 sm:mb-8 animate-fadeInUp" style="animation-delay: 0.5s">
        <div class="flex items-center mb-4 sm:mb-6">
          <FunnelIcon class="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 mr-3" />
          <h3 class="text-base sm:text-lg font-semibold text-slate-800">Search & Filter</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div class="form-group">
            <label class="form-label text-sm">Search Clients</label>
            <div class="search-container">
              <MagnifyingGlassIcon class="search-icon" />
              <input v-model="searchQuery" type="text" placeholder="Search by name or company..."
                class="search-input text-sm" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label text-sm">Filter by Gender</label>
            <select v-model="genderFilter" class="input-field text-sm">
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label text-sm">Filter by Currency</label>
            <select v-model="currencyFilter" class="input-field text-sm">
              <option value="">All Currencies</option>
              <option v-for="currency in clientsStore.uniqueCurrencies" :key="currency" :value="currency">
                {{ currency }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label text-sm">&nbsp;</label>
            <button @click="clearFilters"
              class="btn-secondary w-full flex items-center justify-center space-x-2 text-sm">
              <ArrowPathIcon class="w-4 h-4" />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Clients Table or Empty States -->
      <div v-if="clientsStore.clients.length === 0" class="animate-fadeInUp" style="animation-delay: 0.6s">
        <!-- No Data Empty State -->
        <div class="card text-center py-12 sm:py-16">
          <div
            class="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-4 sm:mb-6">
            <UsersIcon class="w-8 h-8 sm:w-12 sm:h-12 text-slate-400" />
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">No Clients Yet</h3>
          <p class="text-slate-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base px-4">
            Get started by adding your first client to the system. You can add them individually or import multiple
            clients from a CSV file.
          </p>
          <div class="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4">
            <button @click="showAddModal = true"
              class="btn-primary flex items-center justify-center space-x-2 text-sm sm:text-base">
              <PlusIcon class="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Add Your First Client</span>
            </button>
            <button @click="showImportModal = true"
              class="btn-secondary flex items-center justify-center space-x-2 text-sm sm:text-base">
              <CloudArrowUpIcon class="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Import from CSV</span>
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="clientsStore.filteredClients.length === 0" class="animate-fadeInUp" style="animation-delay: 0.6s">
        <!-- No Search Results Empty State -->
        <div class="card text-center py-12 sm:py-16">
          <div
            class="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mb-4 sm:mb-6">
            <MagnifyingGlassIcon class="w-8 h-8 sm:w-12 sm:h-12 text-yellow-600" />
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">No Results Found</h3>
          <p class="text-slate-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base px-4">
            We couldn't find any clients matching your search criteria. Try adjusting your filters or search terms.
          </p>
          <div class="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4">
            <button @click="clearFilters"
              class="btn-secondary flex items-center justify-center space-x-2 text-sm sm:text-base">
              <ArrowPathIcon class="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Clear All Filters</span>
            </button>
            <button @click="showAddModal = true"
              class="btn-primary flex items-center justify-center space-x-2 text-sm sm:text-base">
              <PlusIcon class="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Add New Client</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Clients Table -->
      <div v-else class="modern-table animate-fadeInUp" style="animation-delay: 0.6s">
        <div
          class="px-4 sm:px-8 py-4 sm:py-6 table-header flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <h3 class="text-base sm:text-lg font-semibold text-slate-800 flex items-center">
            <UsersIcon class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Client Directory
          </h3>
          <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button @click="showAddModal = true"
              class="btn-primary flex items-center justify-center space-x-2 text-sm sm:text-base">
              <PlusIcon class="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Add Client</span>
            </button>
            <button @click="showImportModal = true"
              class="btn-secondary flex items-center justify-center space-x-2 text-sm sm:text-base">
              <CloudArrowUpIcon class="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Import CSV</span>
            </button>
          </div>
        </div>

        <div class="overflow-x-auto custom-scrollbar">
          <table class="min-w-full">
            <thead class="table-header">
              <tr>
                <th
                  class="px-4 sm:px-8 py-3 sm:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Client Information
                </th>
                <th
                  class="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Company
                </th>
                <th
                  class="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Subscription
                </th>
                <th
                  class="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Age
                </th>
                <th
                  class="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="client in clientsStore.paginatedClients" :key="client.id" class="table-row">
                <td class="px-4 sm:px-8 py-4 sm:py-6">
                  <div class="flex items-center space-x-3 sm:space-x-4">
                    <ClientAvatar :client="client" size="md" />
                    <div class="min-w-0 flex-1">
                      <div class="text-sm font-semibold text-slate-900 truncate">{{ client.name }}</div>
                      <div class="flex items-center mt-1">
                        <span class="status-dot"
                          :class="client.gender === 'male' ? 'status-active' : 'status-pending'"></span>
                        <span class="text-xs sm:text-sm text-slate-500 capitalize">{{ client.gender }}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-3 sm:px-6 py-4 sm:py-6">
                  <div class="text-sm font-medium text-slate-900 truncate">{{ client.company }}</div>
                  <div class="text-xs sm:text-sm text-slate-500">Enterprise</div>
                </td>
                <td class="px-3 sm:px-6 py-4 sm:py-6">
                  <div class="flex items-center">
                    <span class="text-sm font-semibold text-slate-900">{{ client.subscriptionCost }}</span>
                    <span class="ml-1 badge badge-blue text-xs">{{ client.currency }}</span>
                  </div>
                </td>
                <td class="px-3 sm:px-6 py-4 sm:py-6">
                  <span class="text-sm font-medium text-slate-900">{{ client.age }} years</span>
                </td>
                <td class="px-3 sm:px-6 py-4 sm:py-6">
                  <div class="flex items-center space-x-1 sm:space-x-2">
                    <button @click="viewClient(client)" class="action-btn action-btn-view text-xs sm:text-sm">
                      <EyeIcon class="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span class="hidden sm:inline">View</span>
                    </button>
                    <button @click="editClient(client)" class="action-btn action-btn-edit text-xs sm:text-sm">
                      <PencilIcon class="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span class="hidden sm:inline">Edit</span>
                    </button>
                    <button @click="showDeleteModal(client)" class="action-btn action-btn-delete text-xs sm:text-sm">
                      <TrashIcon class="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span class="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modern Pagination -->
        <div class="bg-slate-50 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between border-t border-slate-200">
          <div class="flex-1 flex justify-between sm:hidden">
            <button @click="previousPage" :disabled="clientsStore.currentPage === 1" class="pagination-btn text-sm">
              Previous
            </button>
            <button @click="nextPage" :disabled="clientsStore.currentPage === clientsStore.totalPages"
              class="pagination-btn text-sm">
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm font-medium text-slate-700">
                Showing <span class="font-semibold text-slate-900">{{ (clientsStore.currentPage - 1) *
                  clientsStore.itemsPerPage + 1 }}</span> to
                <span class="font-semibold text-slate-900">{{ Math.min(clientsStore.currentPage *
                  clientsStore.itemsPerPage, clientsStore.filteredClients.length) }}</span> of
                <span class="font-semibold text-slate-900">{{ clientsStore.filteredClients.length }}</span> results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px">
                <button @click="previousPage" :disabled="clientsStore.currentPage === 1"
                  class="pagination-btn rounded-l-xl text-sm">
                  <ChevronLeftIcon class="w-4 h-4" />
                  Previous
                </button>
                <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="[
                  'pagination-btn text-sm',
                  page === clientsStore.currentPage ? 'pagination-btn-active' : ''
                ]">
                  {{ page }}
                </button>
                <button @click="nextPage" :disabled="clientsStore.currentPage === clientsStore.totalPages"
                  class="pagination-btn rounded-r-xl text-sm">
                  Next
                  <ChevronRightIcon class="w-4 h-4" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <ClientModal v-if="showAddModal || showEditModal" :client="selectedClient" :is-edit="showEditModal"
      @close="closeModal" @save="handleSaveClient" />

    <ClientViewModal v-if="showViewModal" :client="selectedClient" @close="showViewModal = false" />

    <ImportModal v-if="showImportModal" @close="showImportModal = false" @import="handleImport" />

    <DeleteModal v-if="showDeleteConfirm" :client="selectedClient" @close="showDeleteConfirm = false"
      @confirm="handleDeleteClient" />
  </div>
</template>

<script setup>
import {
  UsersIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  PlusIcon,
  CloudArrowUpIcon,
  ArrowTrendingUpIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'
import { definePageMeta } from '#imports'
import { useClientsStore } from '~/stores/clients'
import { ref, computed, onMounted, watch } from 'vue'
import ClientModal from '~/components/ClientModal.vue'
import ClientViewModal from '~/components/ClientViewModal.vue'
import ImportModal from '~/components/ImportModal.vue'
import DeleteModal from '~/components/DeleteModal.vue'
import ClientAvatar from '~/components/ClientAvatar.vue'

definePageMeta({
  middleware: 'auth'
})

const clientsStore = useClientsStore()

const showAddModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showImportModal = ref(false)
const showDeleteConfirm = ref(false)
const selectedClient = ref(null)

// Prevent background scroll when modal is open
watch([showAddModal, showEditModal, showViewModal, showImportModal, showDeleteConfirm], (newValues) => {
  const isAnyModalOpen = newValues.some(value => value)
  if (process.client) {
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }
})

const searchQuery = computed({
  get: () => clientsStore.searchQuery,
  set: (value) => clientsStore.setSearchQuery(value)
})

const genderFilter = computed({
  get: () => clientsStore.filterGender,
  set: (value) => clientsStore.setGenderFilter(value)
})

const currencyFilter = computed({
  get: () => clientsStore.filterCurrency,
  set: (value) => clientsStore.setCurrencyFilter(value)
})

const totalRevenue = computed(() => {
  return clientsStore.clients.reduce((sum, client) => {
    return sum + parseFloat(client.subscriptionCost)
  }, 0).toFixed(2)
})

const uniqueCompanies = computed(() => {
  return new Set(clientsStore.clients.map(client => client.company)).size
})

const averageAge = computed(() => {
  if (clientsStore.clients.length === 0) return 0
  const sum = clientsStore.clients.reduce((sum, client) => sum + client.age, 0)
  return Math.round(sum / clientsStore.clients.length)
})

const visiblePages = computed(() => {
  const current = clientsStore.currentPage
  const total = clientsStore.totalPages
  const pages = []

  for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
    pages.push(i)
  }

  return pages
})

onMounted(() => {
  clientsStore.fetchClients()
})

const viewClient = (client) => {
  selectedClient.value = client
  showViewModal.value = true
}

const editClient = (client) => {
  selectedClient.value = { ...client }
  showEditModal.value = true
}

const showDeleteModal = (client) => {
  selectedClient.value = client
  showDeleteConfirm.value = true
}

const handleDeleteClient = async (client) => {
  await clientsStore.deleteClient(client.id)
  showDeleteConfirm.value = false
  selectedClient.value = null
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  selectedClient.value = null
}

const handleSaveClient = async (clientData) => {
  if (showEditModal.value) {
    await clientsStore.updateClient(selectedClient.value.id, clientData)
  } else {
    await clientsStore.addClient(clientData)
  }
  closeModal()
}

const handleImport = async (clients) => {
  await clientsStore.bulkAddClients(clients)
  showImportModal.value = false
}

const clearFilters = () => {
  clientsStore.clearFilters()
}

const previousPage = () => {
  if (clientsStore.currentPage > 1) {
    clientsStore.setCurrentPage(clientsStore.currentPage - 1)
  }
}

const nextPage = () => {
  if (clientsStore.currentPage < clientsStore.totalPages) {
    clientsStore.setCurrentPage(clientsStore.currentPage + 1)
  }
}

const goToPage = (page) => {
  clientsStore.setCurrentPage(page)
}
</script>
