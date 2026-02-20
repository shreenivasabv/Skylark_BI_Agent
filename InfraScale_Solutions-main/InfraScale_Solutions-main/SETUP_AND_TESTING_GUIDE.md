# InfraScale Project - Complete Setup & Testing Guide

## Project Structure

```
infrascale-project/
├── backend/
│   ├── models/
│   │   ├── Admin.js              (Admin account model)
│   │   ├── Contact.js            (Contact form submissions)
│   │   ├── Member.js             (User account model - consolidated)
│   │   ├── MemberProfile.js       (Member profile data)
│   │   ├── Service.js            (Services/solutions)
│   │   ├── Team.js               (Public team display)
│   │   └── AboutCompany.js
│   ├── routes/
│   │   ├── adminRoutes.js        (Admin login & management)
│   │   ├── adminMemberRoutes.js   (Deprecated - use teamRoutes)
│   │   ├── aboutRoutes.js
│   │   ├── contactRoutes.js       (Contact form + admin view)
│   │   ├── memberAuthRoutes.js    (Member register/login)
│   │   ├── memberProfileRoutes.js (Member profile management)
│   │   ├── serviceRoutes.js
│   │   └── teamRoutes.js          (Public team + admin management)
│   ├── controllers/
│   │   ├── MemberAuthController.js   (With validation)
│   │   ├── MemberProfileController.js
│   │   └── AboutCompanyController.js
│   ├── middleware/
│   │   ├── auth.js                (JWT authentication)
│   │   ├── authMiddleware.js
│   │   └── uploads.js
│   ├── .env                       (Configuration - DO NOT COMMIT)
│   ├── .gitignore
│   ├── package.json
│   ├── index.js                   (Main server file)
│   ├── API_DOCUMENTATION.md       (Complete API reference)
│   └── uploads/                   (Uploaded images)
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── TeamMember/
│   │   │   │   ├── MemberLogin.jsx        (Fixed - now uses env)
│   │   │   │   ├── MemberRegister.jsx     (Uses env API_BASE)
│   │   │   │   ├── MemberDashboard.jsx    (Fixed - /api/members endpoint)
│   │   │   │   └── MemberProfile.jsx      (Fixed - /api/members/:id)
│   │   │   ├── Admin/
│   │   │   │   ├── AdminLogin.jsx
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminTeam.jsx          (Fixed - uses /api/team)
│   │   │   │   ├── AdminServices.jsx
│   │   │   │   └── AdminAbout.jsx
│   │   │   ├── ServicesPage.jsx           (Fixed - uses env API_BASE)
│   │   │   └── AboutCompany.jsx
│   │   ├── components/
│   │   │   ├── Team/
│   │   │   │   └── Team.jsx               (Fixed - /api/team endpoint)
│   │   │   ├── Services/
│   │   │   │   └── Services.jsx           (Fixed - uses env API_BASE)
│   │   │   └── Contact/
│   │   │       └── Contact.jsx            (Fixed - uses env API_BASE)
│   │   └── services/
│   │       └── api.js                   (Axios instance)
│   ├── .env                       (VITE_API_URL configuration)
│   ├── .env.production
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

##  Backend Setup

### Installation
```bash
cd backend
npm install
```

### Environment Variables (.env)
```env
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/dbname
JWT_SECRET=your_secure_random_key_here_at_least_32_chars
PORT=5000
NODE_ENV=development
```

### Start Backend
```bash
npm start              # Production
node index.js          # Direct
npm run dev           # Development (requires nodemon)
```

**Expected Output:**
```
✅ MongoDB Connected Successfully
✅ Default Admin Created
🚀 Server Running on 5000
```

---

## Frontend Setup

### Installation
```bash
cd frontend
npm install
```

### Environment Variables (.env)
```env
VITE_API_URL=http://localhost:5000
```

### Start Frontend
```bash
npm run dev
```

**Access:** http://localhost:5173

---

## Complete Workflow Testing

### 1. Admin Setup
```
1. Navigate to: http://localhost:5173/admin/login
2. Default Credentials:
   - Email: admin@infrascale.com
   - Password: admin123
3. On login, token is saved to localStorage
```

### 2. Add Team Members
```
1. After admin login, go to: http://localhost:5173/admin/manage-team
2. Fill form:
   - Name: John Doe
   - Email: john@example.com
   - Designation: Senior Developer
   - Specialization: Full-Stack
   - Experience: 5
   - Features: Node.js, React, MongoDB
   - Image: Upload a photo
3. Click "Add Member"
4. View team members publicly at: http://localhost:5173/team
```

### 3. Member Registration & Login
```
REGISTRATION:
1. Go to: http://localhost:5173/member-register
2. Use same email from step 2: john@example.com
3. Create password (min 6 chars)
4. Click Register

LOGIN:
1. Go to: http://localhost:5173/member-login
2. Use: john@example.com / <your_password>
3. Token saved to localStorage
4. Redirected to dashboard
```

### 4. Member Profile Management
```
1. After login, go to: http://localhost:5173/member/dashboard
2. Edit fields:
   - Name, Designation, Department
   - Skills (comma-separated)
   - Projects & Experience
3. Click "Save Changes"
4. View profile publicly at: http://localhost:5173/team/:memberId
```

---

## API Testing with cURL

### Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@infrascale.com","password":"admin123"}'
```

### Get Team Members
```bash
curl http://localhost:5000/api/team
```

### Add Team Member (Admin)
```bash
curl -X POST http://localhost:5000/api/team \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "designation=Developer" \
  -F "specialization=Backend" \
  -F "experience=5" \
  -F "features=Node.js,Express" \
  -F "image=@/path/to/image.jpg"
```

### Member Register
```bash
curl -X POST http://localhost:5000/api/member-auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"securepass123"}'
```

### Member Login
```bash
curl -X POST http://localhost:5000/api/member-auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"securepass123"}'
```

### Get Current User Profile
```bash
curl http://localhost:5000/api/members/me \
  -H "Authorization: Bearer YOUR_MEMBER_TOKEN"
```

### Update Profile
```bash
curl -X PUT http://localhost:5000/api/members/me \
  -H "Authorization: Bearer YOUR_MEMBER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"skills":["Node.js","React"]}'
```

---

## Security Checklist ✅

- [x] JWT authentication with expiry (7 days)
- [x] Password hashing with bcryptjs
- [x] Input validation (email format, password strength)
- [x] Protected admin routes (require auth)
- [x] CORS configured
- [x] Error handling & sanitization
- [x] Database connection secure
- [x] Unique email constraint on registration

---

## Common Issues & Solutions

### Issue: 404 on /api/team
**Solution:** Ensure teamRoutes.js is properly registered in index.js
```javascript
app.use("/api/team", require("./routes/teamRoutes"));
```

### Issue: Member can't update profile
**Solution:** Check token is valid and not expired. Regenerate with fresh login.

### Issue: Images not showing
**Solution:** Check uploads/ directory exists and image path is correct:
```javascript
img src={`${API_BASE}/uploads/${imageFilename}`}
```

### Issue: MongoDB connection failed
**Solution:** Verify MONGO_URI in .env is correct and MongoDB is running/accessible

### Issue: CORS errors
**Solution:** Ensure allowed origins in index.js match frontend URL:
```javascript
const allowedOrigins = ["http://localhost:5173"];
```

---

## Files Changed Summary

### Backend
- ✅ `backend/index.js` - Fixed template literal, added /api/team route
- ✅ `backend/models/Member.js` - Consolidated model
- ✅ `backend/models/MemberProfile.js` - Fixed schema
- ✅ `backend/models/Team.js` - Renamed from adminMemberRoutes.js.js
- ✅ `backend/routes/teamRoutes.js` - Now uses Team model with full CRUD
- ✅ `backend/routes/memberProfileRoutes.js` - Added /me endpoints
- ✅ `backend/routes/memberAuthRoutes.js` - Added validation
- ✅ `backend/routes/adminRoutes.js` - Added validation & security
- ✅ `backend/routes/contactRoutes.js` - Added validation & auth
- ✅ `backend/middleware/auth.js` - Improved error handling
- ✅ `backend/controllers/MemberAuthController.js` - Added input validation

### Frontend
- ✅ `frontend/src/pages/TeamMember/MemberDashboard.jsx` - Fixed endpoint & image URL
- ✅ `frontend/src/pages/TeamMember/MemberLogin.jsx` - Made dynamic
- ✅ `frontend/src/pages/TeamMember/MemberProfile.jsx` - Fixed endpoint
- ✅ `frontend/src/pages/Admin/AdminTeam.jsx` - Already correct
- ✅ `frontend/src/pages/Admin/AdminDashboard.jsx` - Made dynamic
- ✅ `frontend/src/pages/Admin/ContactMessages.jsx` - Made dynamic
- ✅ `frontend/src/pages/ServicesPage.jsx` - Fixed image URL
- ✅ `frontend/src/components/Team/Team.jsx` - Uses /api/team
- ✅ `frontend/src/components/Services/Services.jsx` - Made dynamic
- ✅ `frontend/src/components/Contact/Contact.jsx` - Made dynamic

---

## Next Steps for Production

1. **Update .env.production** with production MongoDB URI
2. **Change JWT_SECRET** to a strong random key
3. **Deploy backend** to Render/Railway/Heroku
4. **Update frontend .env.production** with production API URL
5. **Deploy frontend** to Vercel
6. **Enable HTTPS** on production
7. **Set up monitoring** and error logging
8. **Configure email notifications** for contact forms

---

## Support & Documentation

- Backend API Docs: See `backend/API_DOCUMENTATION.md`
- Frontend Components: Check inline JSX comments
- Models: Database schema details in model files
- Routes: Full endpoint list in API_DOCUMENTATION.md
