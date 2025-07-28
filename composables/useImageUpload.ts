import { ref, readonly } from "vue"
import { $fetch } from "ofetch"

export const useImageUpload = () => {
  const uploading = ref(false)
  const error = ref("")

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) return null

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      error.value = "Invalid file type. Only images are allowed."
      return null
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      error.value = "File too large. Maximum size is 5MB."
      return null
    }

    uploading.value = true
    error.value = ""

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await $fetch<{
        success: boolean
        url: string
        filename: string
      }>("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.success) {
        return response.url
      } else {
        error.value = "Upload failed"
        return null
      }
    } catch (err: any) {
      console.error("Upload error:", err)
      error.value = err.data?.message || "Failed to upload image"
      return null
    } finally {
      uploading.value = false
    }
  }

  const deleteImage = async (filename: string): Promise<boolean> => {
    try {
      await $fetch(`/api/upload/${filename}`, {
        method: "DELETE",
      })
      return true
    } catch (err) {
      console.error("Delete error:", err)
      return false
    }
  }

  const cleanupOrphanedFiles = async (): Promise<boolean> => {
    try {
      const response = await $fetch("/api/uploads/cleanup", {
        method: "POST",
      })
      return response.success
    } catch (err) {
      console.error("Cleanup error:", err)
      return false
    }
  }

  return {
    uploading: readonly(uploading),
    error: readonly(error),
    uploadImage,
    deleteImage,
    cleanupOrphanedFiles,
  }
}
