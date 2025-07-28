import { defineStore } from "pinia"
import { useRuntimeConfig } from "#app"
import { $fetch } from "ofetch"

interface Client {
  id: string
  gender: string
  name: string
  company: string
  age: number
  picture: string
  registered: string
  currency: string
  subscriptionCost: string
}

interface ClientsState {
  clients: Client[]
  loading: boolean
  currentPage: number
  itemsPerPage: number
  searchQuery: string
  filterGender: string
  filterCurrency: string
}

export const useClientsStore = defineStore("clients", {
  state: (): ClientsState => ({
    clients: [],
    loading: false,
    currentPage: 1,
    itemsPerPage: 10,
    searchQuery: "",
    filterGender: "",
    filterCurrency: "",
  }),

  getters: {
    filteredClients(): Client[] {
      let filtered = this.clients

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(
          (client) => client.name.toLowerCase().includes(query) || client.company.toLowerCase().includes(query),
        )
      }

      if (this.filterGender) {
        filtered = filtered.filter((client) => client.gender === this.filterGender)
      }

      if (this.filterCurrency) {
        filtered = filtered.filter((client) => client.currency === this.filterCurrency)
      }

      return filtered
    },

    paginatedClients(): Client[] {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredClients.slice(start, end)
    },

    totalPages(): number {
      return Math.ceil(this.filteredClients.length / this.itemsPerPage)
    },

    uniqueCurrencies(): string[] {
      return [...new Set(this.clients.map((client) => client.currency))]
    },
  },

  actions: {
    async fetchClients() {
      this.loading = true
      try {
        const config = useRuntimeConfig()
        const clients = await $fetch<Client[]>(`${config.public.apiBase}/clients`)
        this.clients = clients
      } catch (error) {
        console.error("Failed to fetch clients:", error)
      } finally {
        this.loading = false
      }
    },

    async addClient(client: Omit<Client, "id">) {
      try {
        const config = useRuntimeConfig()
        const newClient = await $fetch<Client>(`${config.public.apiBase}/clients`, {
          method: "POST",
          body: {
            ...client,
            id: Date.now().toString(),
            registered: new Date().toISOString(),
          },
        })
        this.clients.unshift(newClient)
        return { success: true }
      } catch (error) {
        return { success: false, message: "Failed to add client" }
      }
    },

    async updateClient(id: string, updates: Partial<Client>) {
      try {
        const config = useRuntimeConfig()
        const updatedClient = await $fetch<Client>(`${config.public.apiBase}/clients/${id}`, {
          method: "PUT",
          body: updates,
        })

        const index = this.clients.findIndex((client) => client.id === id)
        if (index !== -1) {
          this.clients[index] = updatedClient
        }
        return { success: true }
      } catch (error) {
        return { success: false, message: "Failed to update client" }
      }
    },

    async deleteClient(id: string) {
      try {
        const config = useRuntimeConfig()
        await $fetch(`${config.public.apiBase}/clients/${id}`, {
          method: "DELETE",
        })

        this.clients = this.clients.filter((client) => client.id !== id)
        return { success: true }
      } catch (error) {
        return { success: false, message: "Failed to delete client" }
      }
    },

    async bulkAddClients(clients: Omit<Client, "id">[]) {
      const results = []
      for (const client of clients) {
        const result = await this.addClient(client)
        results.unshift(result)
      }
      return results
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
      this.currentPage = 1
    },

    setGenderFilter(gender: string) {
      this.filterGender = gender
      this.currentPage = 1
    },

    setCurrencyFilter(currency: string) {
      this.filterCurrency = currency
      this.currentPage = 1
    },

    setCurrentPage(page: number) {
      this.currentPage = page
    },

    clearFilters() {
      this.searchQuery = ""
      this.filterGender = ""
      this.filterCurrency = ""
      this.currentPage = 1
    },
  },
})
