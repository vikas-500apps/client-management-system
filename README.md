# Client Management System

A modern, responsive client management system built with Nuxt 3, Vue 3, and Tailwind CSS. This application provides a comprehensive solution for managing client data with advanced features like CSV import/export, real-time search, filtering, and a beautiful modern UI.

## 🚀 Features

### Core Functionality
- **Client Management**: Add, edit, view, and delete client records
- **Advanced Search & Filtering**: Real-time search by name/company with gender and currency filters
- **CSV Import/Export**: Bulk import clients from CSV files with validation
- **Local Image Storage**: Built-in file upload system with automatic cleanup
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Modern UI**: Beautiful gradient-based design with smooth animations

### User Experience
- **Empty States**: Helpful empty states when no data or search results are found
- **Modal Management**: Proper modal handling with background scroll prevention
- **Avatar System**: Dynamic avatars with user initials when no image is provided
- **Delete Confirmation**: Safe deletion with confirmation modal requiring "DELETE" input
- **Pagination**: Efficient pagination for large datasets
- **Loading States**: Smooth loading indicators throughout the application

### Technical Features
- **Authentication**: Secure login system with JWT-like tokens
- **Data Persistence**: Local storage for authentication state
- **Real-time Updates**: Instant UI updates after data operations
- **Error Handling**: Comprehensive error handling and user feedback
- **Modern Icons**: Heroicons integration for consistent iconography
- **File Management**: Local file storage with automatic cleanup system

## 🛠 Tech Stack

- **Frontend**: Nuxt 3, Vue 3 (Composition API)
- **Styling**: Tailwind CSS with custom components
- **State Management**: Pinia
- **Icons**: Heroicons Vue
- **CSV Processing**: PapaParse
- **File Storage**: Node.js built-in file system (local storage)
- **Backend**: JSON Server (for development)
- **Authentication**: Custom JWT-like implementation

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone [<repository-url>](https://github.com/vikas-500apps/client-management-system.git)
   cd client-management-system
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the JSON server (backend)**
   \`\`\`bash
   npm run api
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:3001

## 🔐 Authentication

**Demo Credentials:**
- Username: `admin`
- Password: `admin123`

## 📊 Data Structure

### Client Object
\`\`\`typescript
interface Client {
  id: string
  name: string
  company: string
  age: number
  gender: 'male' | 'female'
  currency: string
  subscriptionCost: string
  picture: string // Local file path: /uploads/avatars/filename.jpg
  registered: string
}
\`\`\`

### CSV Import Format
\`\`\`csv
name,company,age,gender,currency,subscriptionCost
John Doe,ACME Corp,30,male,USD,1500.00
Jane Smith,Tech Inc,25,female,EUR,2000.00
\`\`\`

## 📁 File Storage System

### Local Image Storage
- **Storage Location**: `/public/uploads/avatars/`
- **File Naming**: `timestamp-randomhash.extension`
- **Supported Formats**: JPEG, PNG, GIF, WebP
- **Size Limit**: 5MB per file
- **Access URL**: `/uploads/avatars/filename.jpg`

### File Management Features
- **Automatic Cleanup**: Removes orphaned files older than 7 days
- **Secure Upload**: File type and size validation
- **Unique Names**: Prevents filename conflicts
- **Directory Creation**: Auto-creates upload directories

### Cleanup Commands
\`\`\`bash
# Manual cleanup of old files
npm run cleanup-uploads

# Or use the API endpoint
curl -X POST http://localhost:3000/api/uploads/cleanup
\`\`\`

## 🎨 UI Components

### Custom Components
- **ClientModal**: Add/Edit client form with validation
- **ClientViewModal**: Detailed client information display
- **ImportModal**: CSV import with preview and validation
- **DeleteModal**: Confirmation modal with safety checks
- **ClientAvatar**: Dynamic avatar with initials fallback
- **ImageUpload**: File upload component with preview and validation

### Design System
- **Modern Cards**: Glass-morphism inspired cards with hover effects
- **Gradient Buttons**: Beautiful gradient buttons with hover animations
- **Responsive Tables**: Mobile-friendly tables with horizontal scroll
- **Custom Scrollbars**: Styled scrollbars for better UX
- **Status Indicators**: Visual status dots and badges

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced layout for tablet screens
- **Desktop Experience**: Full-featured desktop interface
- **Touch Friendly**: Large touch targets for mobile users

## 🔧 Configuration

### Environment Variables
\`\`\`env
NUXT_PUBLIC_API_BASE=http://localhost:3001
\`\`\`

### File Storage Configuration
\`\`\`typescript
// nuxt.config.ts
nitro: {
  storage: {
    uploads: {
      driver: "fs",
      base: "./public/uploads",
    },
  },
}
\`\`\`

### Tailwind Configuration
Custom CSS classes for consistent styling:
- `.btn-primary`, `.btn-secondary`, `.btn-danger`, `.btn-success`
- `.input-field`, `.form-group`, `.form-label`
- `.card`, `.stats-card`, `.modern-table`
- `.modal-backdrop`, `.modal-container`, `.modal-content`

## 📈 Performance Features

- **Lazy Loading**: Components loaded on demand
- **Efficient Pagination**: Only render visible items
- **Optimized Images**: Local file system for fast access
- **Minimal Bundle**: Tree-shaking and code splitting
- **Fast Navigation**: Client-side routing with Nuxt

## 🔒 Security Features

- **Input Validation**: Client and server-side validation
- **File Upload Security**: Type validation and size limits
- **Path Validation**: Prevents directory traversal attacks
- **Authentication Guards**: Route protection middleware
- **Safe Deletion**: Confirmation required for destructive actions

## 🚀 Deployment

### Build for Production
\`\`\`bash
npm run build
\`\`\`

### Generate Static Site
\`\`\`bash
npm run generate
\`\`\`

### Preview Production Build
\`\`\`bash
npm run preview
\`\`\`

### File Storage in Production
- Ensure `/public/uploads/` directory has write permissions
- Set up periodic cleanup with cron jobs
- Consider implementing file size monitoring
- Backup uploaded files regularly

## 📝 API Endpoints

### Client Management
- `GET /clients` - Fetch all clients
- `POST /clients` - Create new client
- `PUT /clients/:id` - Update client
- `DELETE /clients/:id` - Delete client

### File Upload
- `POST /api/upload` - Upload image file
- `DELETE /api/upload/:filename` - Delete specific file
- `POST /api/uploads/cleanup` - Cleanup orphaned files

### Authentication
- `GET /users` - Authentication endpoint

## 🎯 Key Features Implemented

1. ✅ **Modern UI Design** - Beautiful gradient-based interface
2. ✅ **Responsive Layout** - Works on all device sizes
3. ✅ **Client CRUD Operations** - Full create, read, update, delete
4. ✅ **Advanced Search & Filters** - Real-time filtering capabilities
5. ✅ **CSV Import/Export** - Bulk data operations
6. ✅ **Local File Storage** - Built-in image upload system
7. ✅ **Empty States** - User-friendly empty data handling
8. ✅ **Modal Management** - Proper modal behavior
9. ✅ **Avatar System** - Dynamic user avatars
10. ✅ **Delete Confirmation** - Safe deletion process
11. ✅ **Authentication System** - Secure login/logout
12. ✅ **Data Persistence** - State management with Pinia
13. ✅ **Error Handling** - Comprehensive error management
14. ✅ **Loading States** - Smooth loading indicators
15. ✅ **Heroicons Integration** - Consistent iconography
16. ✅ **New Items at Top** - Recently added clients appear first
17. ✅ **File Cleanup System** - Automatic orphaned file removal

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.