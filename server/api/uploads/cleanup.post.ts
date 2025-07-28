import { defineEventHandler } from "h3"
import { readdir, unlink, stat } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

export default defineEventHandler(async (event) => {
  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "avatars")

    if (!existsSync(uploadsDir)) {
      return { success: true, message: "No uploads directory found" }
    }

    const files = await readdir(uploadsDir)
    const now = Date.now()
    const maxAge = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    let deletedCount = 0

    for (const file of files) {
      const filePath = path.join(uploadsDir, file)
      const stats = await stat(filePath)

      // Delete files older than 7 days that are not referenced
      if (now - stats.mtime.getTime() > maxAge) {
        try {
          await unlink(filePath)
          deletedCount++
        } catch (error) {
          console.error(`Failed to delete ${file}:`, error)
        }
      }
    }

    return {
      success: true,
      message: `Cleanup completed. Deleted ${deletedCount} orphaned files.`,
      deletedCount,
    }
  } catch (error) {
    console.error("Cleanup error:", error)
    return {
      success: false,
      message: "Cleanup failed",
      error: error.message,
    }
  }
})
