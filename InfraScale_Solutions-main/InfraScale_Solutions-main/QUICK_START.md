# 🚀 Quick Start Commands

This file contains all the commands you need to run to get the application up and running.

## 1️⃣ Initial Setup (Run from project root)

### Clone if starting fresh (skip if already cloned)
```bash
git clone https://github.com/YOUR_USERNAME/infrascale-solutions.git
cd infrascale-solutions
```

### Get MongoDB Connection String
1. Go to https://www.mongodb.com/cloud/atlas
2. Create Free Account
3. Create Cluster
4. Get Connection String
5. Copy it for later use

---

## 2️⃣ Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create and configure environment file
# On Windows:
copy .env.example .env

# Edit .env and add your MongoDB URI and JWT secret:
# MONGO_URI=your_connection_string_here
# JWT_SECRET=your_super_secret_key_here

# Start development server
npm run dev

# Server should output:
# ✅ MongoDB Connected Successfully
# 🚀 Server Running on port 5000
```

---

## 3️⃣ Frontend Setup (In new terminal/tab)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
# On Windows:
copy .env.local.example .env.local

# Start development server
npm run dev

# App should output:
# VITE v7.3.1  ready in 123 ms
# ➜  Local:   http://localhost:5173/
```

---

## 4️⃣ Access Application

### Website
- **URL**: http://localhost:5173
- **Features**: Home, Team, Services, Contact, About

### Admin Dashboard
- **URL**: http://localhost:5173/admin-login
- **Email**: `admin@infrascale.com`
- **Password**: `admin123` ⚠️ Change this in production!
- **Note**: Uses mock data, no real authentication initially

### Member Features
- **Register**: http://localhost:5173/member-register
- **Login**: http://localhost:5173/member-login
- **Dashboard**: http://localhost:5173/member-dashboard (after login)

---

## 5️⃣ Test the Complete Flow

### Step A: Admin Adds Team Member
1. Login to admin dashboard
2. Go to "Team Management" tab
3. Fill in member details:
   - Name: John Doe
   - Email: john@example.com
   - Designation: Senior Developer
   - Specialization: Full Stack
   - Experience: 5
   - Features: React, Node.js, MongoDB
   - Upload an image
4. Click "Add Member"
5. You should see success message

### Step B: Member Registers
1. Go to http://localhost:5173/member-register
2. Email: john@example.com (same as admin added)
3. Password: Test@123
4. Click "Set Password"
5. You should see "Account created successfully"

### Step C: Member Logs In
1. Go to http://localhost:5173/member-login
2. Email: john@example.com
3. Password: Test@123
4. Click "Login"
5. Should redirect to dashboard

### Step D: Member Updates Profile
1. In Member Dashboard:
   - Edit Name, Designation, Specialization
   - Edit Skills (comma-separated)
   - Add a Project
   - Add Work Experience
2. Click "Save Changes"
3. Should see success message

### Step E: Verify Changes on Public Page
1. Go to http://localhost:5173/team
2. Click on "John Doe" member card
3. Verify:
   - Name updated ✅
   - Designation updated ✅
   - Skills updated ✅
   - Projects showing ✅
   - Experience showing ✅
   - Image displaying ✅

---

## 6️⃣ Build for Production

### Build Backend
```bash
cd backend
# Backend runs directly with npm start
npm run dev  # Change to npm start for production
```

### Build Frontend
```bash
cd frontend
npm run build
# Creates 'dist' folder with optimized production build
```

---

## 7️⃣ Deployment Commands

### GitHub Setup
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "InfraScale Solutions - Initial Commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/infrascale-solutions.git
git push -u origin main
```

### Environment Variables for Production

**Backend (.env for Render):**
```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/infrascale_db?retryWrites=true&w=majority
JWT_SECRET=your_very_secure_random_string_with_at_least_32_characters
PORT=5000
NODE_ENV=production
```

**Frontend (.env.production):**
```
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## 🔍 Troubleshooting

### Backend won't start?
```bash
# Check if port 5000 is already in use
# Kill process using port 5000 (Windows):
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use different port:
PORT=5001 npm run dev
```

### MongoDB connection failed?
```
Check:
1. MongoDB URI is correct
2. IP whitelist in MongoDB Atlas includes your IP
3. Database user password is correct
4. Network connection is stable
```

### Frontend won't connect to backend?
```bash
# Check VITE_API_URL in .env.local matches backend URL
# Clear browser cache: Ctrl+Shift+Delete
# Check browser console for CORS errors
```

### Image not loading?
```bash
# Check:
1. Image file exists in backend/uploads directory
2. API serves static files correctly
3. Image filename is saved in database
4. Browser console shows correct image URL
```

---

## 📝 Useful Commands

### Backend
```bash
npm install                # Install dependencies
npm run dev              # Start with nodemon (auto-reload)
npm start                # Start production server
npm test                 # Run tests (if configured)
```

### Frontend
```bash
npm install              # Install dependencies
npm run dev             # Start dev server with Vite
npm run build           # Build for production
npm run preview         # Preview production build locally
npm run lint            # Run ESLint
```

### Git Commands
```bash
git status              # Check modified files
git add .              # Stage all changes
git commit -m "message" # Commit changes
git push origin main    # Push to GitHub
git pull origin main    # Pull latest changes
```

---

## 🎯 Key URLs Reference

| Purpose | URL |
|---------|-----|
| Website Home | http://localhost:5173 |
| Team Page | http://localhost:5173/team |
| Admin Login | http://localhost:5173/admin-login |
| Member Register | http://localhost:5173/member-register |
| Member Login | http://localhost:5173/member-login |
| Member Dashboard | http://localhost:5173/member-dashboard |
| Backend API | http://localhost:5000 |
| API Team Endpoint | http://localhost:5000/api/team |
| Member Auth | http://localhost:5000/api/member-auth |
| Uploads | http://localhost:5000/uploads |

---

## ✅ Success Checklist

After completing all steps:
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] MongoDB connected successfully
- [ ] Admin can login
- [ ] Admin can add team members
- [ ] Member can register
- [ ] Member can login
- [ ] Member can edit profile
- [ ] Changes appear on public team page
- [ ] Images load correctly
- [ ] All navigation links work
- [ ] No console errors

---

## 🚀 Ready to Deploy?

When everything is working locally:

1. Push to GitHub: `git push origin main`
2. Deploy backend to Render (See SETUP_DEPLOYMENT_GUIDE.md)
3. Deploy frontend to Vercel (See SETUP_DEPLOYMENT_GUIDE.md)
4. Test production application
5. Share with team!

---

**Last Updated**: February 20, 2026
**Version**: 1.0.0 Ready for Deployment ✨

