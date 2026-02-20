# InfraScale Solutions

A modern full-stack web application for managing team members, services, and company information with admin and member authentication.

## 🎯 Features

### Admin Features
- **Admin Dashboard**: Manage team members, services, and company information
- **Team Management**: Add/edit/delete team members with images
- **Service Management**: Manage service categories and details
- **Contact Management**: View and manage contact messages
- **About Company**: Update company information

### Member Features
- **Member Registration**: Register with admin-provided email
- **Member Dashboard**: Edit profile information
- **Skills Management**: Update skills, projects, and work experience
- **Profile Sync**: Changes automatically appear on public team page

### Public Features
- **Team Page**: View all team members with their details
- **Services Page**: Browse available services
- **Contact Form**: Submit inquiries
- **About Page**: Learn about the company

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **UI Notifications**: React Hot Toast
- **Icons**: React Icons

## 📁 Project Structure

```
InfraScale_Solutions/
├── backend/
│   ├── controllers/        # Business logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Authentication & file uploads
│   ├── uploads/           # Uploaded images directory
│   ├── index.js           # Express server entry point
│   ├── package.json
│   ├── .env               # Environment variables
│   └── .env.example       # Example env template
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Team/         # Team members component
│   │   │   ├── Services/     # Services component
│   │   │   ├── Navbar/       # Navigation bar
│   │   │   └── ...
│   │   ├── pages/        # Page components
│   │   │   ├── Admin/       # Admin pages
│   │   │   ├── TeamMember/  # Member pages
│   │   │   └── ...
│   │   ├── services/     # API service layer
│   │   ├── App.jsx       # Main app router
│   │   └── main.jsx      # React entry point
│   ├── public/           # Static assets
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.local        # Development config
│   ├── .env.production   # Production config
│   └── .gitignore
│
├── README.md             # This file
├── SETUP_DEPLOYMENT_GUIDE.md  # Detailed setup & deployment
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)
- Git

### Quick Start

**1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/infrascale-solutions.git
cd infrascale-solutions
```

**2. Backend Setup**
```bash
cd backend
npm install

# Create .env file with your MongoDB URI and JWT secret
cp .env.example .env
# Edit .env with your credentials

npm run dev
# Backend starts on http://localhost:5000
```

**3. Frontend Setup**
```bash
cd frontend
npm install

# Create .env.local
cp .env.local.example .env.local

npm run dev
# Frontend starts on http://localhost:5173
```

**4. Access the Application**
- Website: http://localhost:5173
- Admin Panel: http://localhost:5173/admin-login
  - Email: `admin@infrascale.com`
  - Password: `admin123`

## 👥 User Workflows

### Admin User Workflow
1. Login at `/admin-login`
2. Access Admin Dashboard
3. Go to Team Management
4. Click "Add Member"
5. Fill in member details and upload image
6. Save (member now has registration link available)

### Member User Workflow
1. Admin adds member email
2. Member goes to `/member-register`
3. Register with admin-provided email
4. Create password and login
5. Access dashboard at `/member-dashboard`
6. Edit skills, projects, and experience
7. Click "Save Changes"
8. Changes appear on `/team` public page

## 📊 API Endpoints

### Admin Endpoints
- `POST /api/admin/login` - Admin login
- `POST /api/team` - Add team member
- `PUT /api/team/:id` - Update team member
- `DELETE /api/team/:id` - Delete team member
- `POST /api/services` - Add service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Member Endpoints
- `POST /api/member-auth/register` - Member registration
- `POST /api/member-auth/login` - Member login
- `GET /api/members/me` - Get current member profile
- `PUT /api/members/me` - Update member profile
- `GET /api/team` - Get all team members (public)
- `GET /api/team/:id` - Get single team member (public)

### Public Endpoints
- `GET /api/team` - Get all team members
- `GET /api/team/:id` - Get member details
- `GET /api/services` - Get all services
- `GET /api/contact` - Get contact messages
- `POST /api/contact` - Submit contact form
- `GET /api/about` - Get company info

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with middleware
- File upload validation with Multer
- CORS configuration
- Environment variable protection

## 🌐 Deployment

### Deploy Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables
5. Deploy

### Deploy Frontend (Vercel)
1. Update `.env.production` with backend URL
2. Build: `npm run build`
3. Deploy to Vercel

See [SETUP_DEPLOYMENT_GUIDE.md](./SETUP_DEPLOYMENT_GUIDE.md) for detailed instructions.

## ✅ Testing Checklist

- [ ] Admin can login and add team members
- [ ] Images upload and display correctly
- [ ] Members can register with email
- [ ] Members can login and access dashboard
- [ ] Members can edit profile and save changes
- [ ] Updated member info appears on public team page
- [ ] Public team page displays all members
- [ ] Clicking member card shows full profile
- [ ] Navigation works on all pages
- [ ] Responsive design works on mobile

## 🆘 Troubleshooting

**Images not loading?**
- Check: `/uploads` directory has read permissions
- Verify: CORS allows image requests
- Check browser console for 404 errors

**Member can't register?**
- Ensure: Email matches admin-added email exactly
- Check: Case sensitivity
- Verify: Email is not already registered

**Login fails?**
- Clear browser cookies/cache
- Check: Correct email and password
- Verify: MongoDB connection is active

**API connection errors?**
- Check: Backend is running
- Verify: VITE_API_URL is correct
- Check: Firewall/network access

## 📝 Environment Variables

### Backend (.env)
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local / .env.production)
```
VITE_API_URL=http://localhost:5000  # dev
VITE_API_URL=https://your-api.onrender.com  # prod
```

## 📄 License

This project is licensed under the MIT License.

## 👨‍💼 Support

For issues, questions, or contributions, please refer to the [SETUP_DEPLOYMENT_GUIDE.md](./SETUP_DEPLOYMENT_GUIDE.md).

---

**Last Updated**: February 20, 2026
**Version**: 1.0.0

