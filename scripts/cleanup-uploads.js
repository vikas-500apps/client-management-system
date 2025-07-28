const fs = require("fs").promises
const path = require("path")

async function cleanupUploads() {
  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "avatars")

    // Check if directory exists
    try {
      await fs.access(uploadsDir)
    } catch {
      console.log("No uploads directory found")
      return
    }

    const files = await fs.readdir(uploadsDir)
    const now = Date.now()
    const maxAge = 7 * 24 * 60 * 60 * 1000 // 7 days
    let deletedCount = 0

    for (const file of files) {
      const filePath = path.join(uploadsDir, file)
      const stats = await fs.stat(filePath)

      // Delete files older than 7 days
      if (now - stats.mtime.getTime() > maxAge) {
        try {
          await fs.unlink(filePath)
          deletedCount++
          console.log(`Deleted: ${file}`)
        } catch (error) {
          console.error(`Failed to delete ${file}:`, error.message)
        }
      }
    }

    console.log(`Cleanup completed. Deleted ${deletedCount} files.`)
  } catch (error) {
    console.error("Cleanup failed:", error.message)
  }
}

cleanupUploads()
