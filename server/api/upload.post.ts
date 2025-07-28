import { defineEventHandler, createError } from "h3"
import { readMultipartFormData } from "h3"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"
import crypto from "crypto"

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)

    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "No file uploaded",
      })
    }

    const file = formData[0]

    if (!file.data || !file.filename) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid file data",
      })
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type || "")) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid file type. Only images are allowed.",
      })
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.data.length > maxSize) {
      throw createError({
        statusCode: 400,
        statusMessage: "File too large. Maximum size is 5MB.",
      })
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "avatars")
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomHash = crypto.randomBytes(8).toString("hex")
    const extension = file.filename.split(".").pop()?.toLowerCase()
    const uniqueFilename = `${timestamp}-${randomHash}.${extension}`
    const filePath = path.join(uploadsDir, uniqueFilename)

    // Write file to disk
    await writeFile(filePath, file.data)

    // Return public URL
    const publicUrl = `/uploads/avatars/${uniqueFilename}`

    return {
      success: true,
      url: publicUrl,
      filename: uniqueFilename,
    }
  } catch (error) {
    console.error("Upload error:", error)

    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Failed to upload image",
    })
  }
})
