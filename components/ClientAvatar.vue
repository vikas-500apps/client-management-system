<template>
    <div class="relative inline-block">
      <div v-if="hasValidImage" class="avatar rounded-full overflow-hidden ring-2 ring-white shadow-lg" :class="avatarSizeClass">
        <img 
          :src="client.picture" 
          :alt="client.name"
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
      </div>
      <div v-else class="avatar bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold ring-2 ring-white shadow-lg" :class="avatarSizeClass">
        {{ initials }}
      </div>
      
      <!-- Online status indicator (optional) -->
      <div v-if="showStatus" class="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const props = defineProps({
    client: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
    showStatus: {
      type: Boolean,
      default: false
    }
  })
  
  const imageError = ref(false)
  
  const hasValidImage = computed(() => {
    return props.client.picture && 
           props.client.picture !== 'http://placehold.it/32x32' && 
           !props.client.picture.includes('placehold.it') &&
           !imageError.value &&
           props.client.picture.trim() !== ''
  })
  
  const initials = computed(() => {
    if (!props.client.name) return '?'
    
    const names = props.client.name.trim().split(' ')
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase()
    }
    
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
  })
  
  const avatarSizeClass = computed(() => {
    const sizeClasses = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-12 h-12 text-base',
      lg: 'w-16 h-16 text-lg',
      xl: 'w-20 h-20 text-xl'
    }
    return sizeClasses[props.size] || sizeClasses.md
  })
  
  const handleImageError = () => {
    imageError.value = true
  }
  </script>
  