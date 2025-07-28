import { defineEventHandler, getRouterParam, createError } from "h3"
import { unlink } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

export default defineEventHandler(async (event) => {
  try {
    const filename = getRouterParam(event, "filename")

    if (!filename) {
      throw createError({
        statusCode: 400,
        statusMessage: "Filename is required",
      })
    }

    // Validate filename to prevent directory traversal
    if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid filename",
      })
    }

    const filePath = path.join(process.cwd(), "public", "uploads", "avatars", filename)

    // Check if file exists
    if (!existsSync(filePath)) {
      throw createError({
        statusCode: 404,
        statusMessage: "File not found",
      })
    }

    // Delete file
    await unlink(filePath)

    return {
      success: true,
      message: "Image deleted successfully",
    }
  } catch (error) {
    console.error("Delete error:", error)

    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Failed to delete image",
    })
  }
})
