# InfraScale Solutions - Setup & Deployment Guide

## Overview
InfraScale Solutions is a full-stack web application with:
- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React + Vite
- **Authentication**: JWT-based (Admin & Member)
- **Database**: MongoDB Atlas

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account (free tier available)
- Git

### 1️⃣ Backend Setup

```bash
cd backend
npm install
```

**Create `.env` file:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/infrascale_db?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_here
PORT=5000
NODE_ENV=development
```

**Start Backend:**
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
```

**Create `.env.local` file:**
```env
VITE_API_URL=http://localhost:5000
```

**Start Frontend:**
```bash
npm run dev
# App runs on http://localhost:5173
```

---

## 📝 Admin User Flow

### Login to Admin Dashboard:
1. Go to `http://localhost:5173/admin-login`
2. Default Credentials:
   - **Email**: `admin@infrascale.com`
   - **Password**: `admin123` ⚠️ **Change in production!**

### Add Team Members:
1. Go to Admin → Team Management
2. Fill in member details:
   - Name, Email, Designation
   - Specialization, Experience, Features (Skills)
   - Upload Member Image
3. Click "Add Member"

### Notes:
- ✅ Member email is used for registration
- ✅ Admin can add multiple team members
- ✅ Only admin adds members; members register themselves

---

## 👥 Member User Flow

### Step 1: Register
1. Go to `http://localhost:5173/member-register`
2. Enter email (must match admin-added email)
3. Create a password (minimum 6 characters)
4. Click "Set Password"

### Step 2: Login
1. Go to `http://localhost:5173/member-login`
2. Enter email and password
3. Access dashboard after login

### Step 3: Update Profile
1. In Member Dashboard:
   - Edit Name, Designation, Specialization
   - Add/Edit Skills (comma-separated)
   - Add Projects and Work Experience
2. Click "Save Changes"
3. Changes are reflected on public Team page

---

## 🚀 Deployment

### Deploy Backend on Render

1. **Create Render Account**: https://render.com

2. **Create MongoDB Atlas Database**:
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`

3. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/infrascale-solutions.git
git push -u origin main
```

4. **Create Render Service**:
   - Go to Dashboard → New Web Service
   - Connect GitHub repository
   - Branch: `main`
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment Variables:
     ```
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_secure_secret
     NODE_ENV=production
     ```
   - Deploy

5. **Note Render URL**: e.g., `https://infrascale-solutions.onrender.com`

---

### Deploy Frontend on Vercel

1. **Create Vercel Account**: https://vercel.com

2. **Update Production API URL**:
   - Edit `frontend/.env.production`:
     ```env
     VITE_API_URL=https://infrascale-solutions.onrender.com
     ```

3. **Build Frontend**:
```bash
cd frontend
npm run build
# Creates 'dist' folder
```

4. **Deploy to Vercel**:
   - Go to Vercel Dashboard → New Project
   - Import GitHub repository
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Deploy

---

## ✅ Testing Checklist

### Backend Tests
- [ ] Admin login works
- [ ] Can create team members
- [ ] Image uploads properly
- [ ] Members can register with admin-provided email
- [ ] Members can login
- [ ] JWT token generation works

### Frontend Tests
- [ ] Home page loads
- [ ] Team page displays all members with images
- [ ] Clicking member card shows profile details
- [ ] Member login/register works
- [ ] Member dashboard loads member data
- [ ] Member can edit and save changes
- [ ] Updated member info appears on public team page
- [ ] Skills update is reflected immediately

### End-to-End Flow
1. Admin adds team member with image
2. Member registers with email
3. Member logs in and updates skills
4. Skills appear on public team page
5. Admin can see updated member info

---

## 🔐 Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (min 32 characters)
- [ ] Enable MongoDB IP whitelist in Atlas
- [ ] Use HTTPS URLs in production
- [ ] Set NODE_ENV=production on production servers
- [ ] Don't commit .env files to GitHub
- [ ] Keep dependencies updated

---

## 📂 File Structure Summary

```
backend/
├── controllers/       # Business logic
├── models/           # MongoDB schemas
├── routes/           # API endpoints
├── middleware/       # Auth, uploads
├── uploads/          # Member images
├── index.js          # Express server
└── .env              # Configuration

frontend/
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page components
│   ├── services/     # API calls
│   └── App.jsx       # Main router
├── public/           # Static assets
└── .env.local        # Dev config
```

---

## 🆘 Troubleshooting

### Images not loading?
- Check image path: `/uploads/filename`
- Verify backend serves static files
- Check browser console for 404 errors

### Member changes not syncing?
- Clear browser cache
- Refresh team page
- Check network tab for API calls
- Verify JWT token in localStorage

### Login fails?
- Check email exists in database
- Verify password is correct
- Check JWT_SECRET matches backend

### MongoDB connection error?
- Verify MONGO_URI in .env
- Check MongoDB Atlas IP whitelist (allow all during dev)
- Ensure database is active

---

## 📞 Support
For issues or questions, check the troubleshooting section above or review API logs.

