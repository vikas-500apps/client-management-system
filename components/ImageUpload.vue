<template>
  <div class="form-group">
    <label class="form-label text-sm">
      <PhotoIcon class="w-4 h-4 inline mr-2" />
      Profile Picture
    </label>
    
    <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
      <!-- File Input -->
      <div class="flex-1 space-y-2">
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          @change="handleFileSelect"
          class="input-field flex-1 text-sm"
          :disabled="uploading"
        />
        
        <!-- Upload Progress -->
        <div v-if="uploading" class="flex items-center space-x-2 text-sm text-blue-600">
          <div class="spinner w-4 h-4"></div>
          <span>Uploading image...</span>
        </div>
        
        <!-- Error Message -->
        <div v-if="error" class="text-red-600 text-sm font-medium">
          {{ error }}
        </div>
        
        <!-- Upload Guidelines -->
        <div class="text-xs text-slate-500">
          <p>• Supported formats: JPEG, PNG, GIF, WebP</p>
          <p>• Maximum size: 5MB</p>
          <p>• Recommended: Square images (1:1 ratio)</p>
          <p>• Images stored locally in /public/uploads/avatars/</p>
        </div>
      </div>
      
      <!-- Avatar Preview -->
      <div class="flex-shrink-0 relative">
        <ClientAvatar 
          :client="{ name: clientName, picture: imageUrl }" 
          size="lg" 
        />
        
        <!-- Remove Image Button -->
        <button
          v-if="imageUrl && !uploading"
          @click="removeImage"
          class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
          title="Remove image"
        >
          <XMarkIcon class="w-3 h-3" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PhotoIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ref, watch } from 'vue'
import ClientAvatar from './ClientAvatar.vue'
import { useImageUpload } from '~/composables/useImageUpload'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  clientName: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const { uploading, error, uploadImage, deleteImage } = useImageUpload()
const fileInput = ref(null)
const imageUrl = ref(props.modelValue)

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  imageUrl.value = newValue
})

// Watch for internal changes to imageUrl
watch(imageUrl, (newValue) => {
  emit('update:modelValue', newValue)
})

const handleFileSelect = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const uploadedUrl = await uploadImage(file)
  if (uploadedUrl) {
    // If there was a previous image, delete it
    if (imageUrl.value && imageUrl.value.startsWith('/uploads/avatars/')) {
      const filename = extractFilenameFromUrl(imageUrl.value)
      if (filename) {
        await deleteImage(filename)
      }
    }
    
    imageUrl.value = uploadedUrl
  }
  
  // Clear the file input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const removeImage = async () => {
  if (imageUrl.value && imageUrl.value.startsWith('/uploads/avatars/')) {
    const filename = extractFilenameFromUrl(imageUrl.value)
    if (filename) {
      await deleteImage(filename)
    }
  }
  
  imageUrl.value = ''
  
  // Clear the file input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const extractFilenameFromUrl = (url) => {
  try {
    const urlParts = url.split('/')
    return urlParts[urlParts.length - 1]
  } catch (error) {
    console.error('Error extracting filename:', error)
    return null
  }
}
</script>
