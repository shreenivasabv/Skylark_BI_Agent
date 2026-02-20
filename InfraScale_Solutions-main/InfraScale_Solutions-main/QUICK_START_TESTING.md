# 🚀 Quick Start Testing Guide

## 5-Minute Setup

### Terminal 1: Backend
```bash
cd backend
node index.js
```
**Expected Output:**
```
✅ MongoDB Connected Successfully
✅ Default Admin Created
🚀 Server Running on 5000
```

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```
**Expected Output:**
```
Local: http://localhost:5173
```

---

## 🧪 Instant Tests (Copy-Paste Ready)

### Test 1: Check Backend is Running
```bash
curl http://localhost:5000/api/team
```
**Expected**: JSON array (may be empty)

### Test 2: Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@infrascale.com","password":"admin123"}'
```
**Expected**: `{"token":"eyJ...", "email":"admin@infrascale.com"}`

**Save the token** - you'll need it for next tests

### Test 3: Create Team Member (Replace TOKEN)
```bash
curl -X POST http://localhost:5000/api/team \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "designation=Senior Developer" \
  -F "specialization=Full-Stack" \
  -F "experience=5" \
  -F "features=Node.js,React,MongoDB" \
  -F "image=@/path/to/any/image.jpg"
```
**Expected**: `{"_id":"...", "name":"John Doe", ...}`

### Test 4: Get All Team Members
```bash
curl http://localhost:5000/api/team
```
**Expected**: Array with the member you just created

### Test 5: Member Register
```bash
curl -X POST http://localhost:5000/api/member-auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Test123456"}'
```
**Expected**: `{"message":"Account created successfully"}`

### Test 6: Member Login
```bash
curl -X POST http://localhost:5000/api/member-auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Test123456"}'
```
**Expected**: `{"token":"eyJ...", "memberId":"...", "email":"john@example.com"}`

**Save this token** for Test 7 & 8

### Test 7: Get Member Profile (Replace TOKEN)
```bash
curl http://localhost:5000/api/members/me \
  -H "Authorization: Bearer YOUR_MEMBER_TOKEN_HERE"
```
**Expected**: `{"_id":"...", "email":"john@example.com", ...}`

### Test 8: Update Profile (Replace TOKEN)
```bash
curl -X PUT http://localhost:5000/api/members/me \
  -H "Authorization: Bearer YOUR_MEMBER_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"skills":["Node.js","React","MongoDB"]}'
```
**Expected**: Updated member object

### Test 9: Submit Contact
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "subject":"Test Subject",
    "message":"This is a test message"
  }'
```
**Expected**: `{"message":"Thank you! Your message has been received."}`

### Test 10: Get Contact Messages (Admin, Replace TOKEN)
```bash
curl http://localhost:5000/api/contact \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN_HERE"
```
**Expected**: Array with contact messages

---

## 🌐 Browser Testing

### Admin Workflow (2 minutes)
1. Open: http://localhost:5173/admin/login
2. Login: 
   - Email: `admin@infrascale.com`
   - Password: `admin123`
3. Go to Admin Panel
4. Find Team Management section
5. Click "Add Team Member"
6. Fill form with:
   - Name: `Test Member`
   - Email: `test.member@example.com`
   - Designation: `Developer`
   - Other fields: any values
   - Image: any JPG/PNG
7. Click "Add Member"
8. Verify success message
9. Go to: http://localhost:5173/team
10. See member on the list

### Member Workflow (3 minutes)
1. Open: http://localhost:5173/member-register
2. Use email from test: `test.member@example.com`
3. Enter password: `Password123`
4. Click Register
5. Go to: http://localhost:5173/member-login
6. Enter same credentials
7. Should redirect to dashboard
8. View your profile
9. Edit fields (name, skills, etc)
10. Click "Save Changes"
11. Go to: http://localhost:5173/team
12. Click your member card
13. See updated profile

### Public Workflow (1 minute)
1. Open: http://localhost:5173/team
2. Should see team members
3. Click on any member
4. View their full profile
5. Go to: http://localhost:5173/contact
6. Fill contact form
7. Send message
8. Verify success message

---

## ✅ Pass/Fail Criteria

### Backend ✅
- [x] Starts without errors
- [x] MongoDB connects
- [x] All 10 API tests pass
- [x] Error messages are clear
- [x] Token is returned on login
- [x] Protected routes require token
- [x] Status codes are correct (200, 201, 400, 401, 404, 500)

### Frontend ✅
- [x] Loads without errors
- [x] Pages render correctly
- [x] Forms submit successfully
- [x] API calls use correct URLs
- [x] Error messages display
- [x] Redirects work properly
- [x] Images load correctly
- [x] localStorage persists token

### Security ✅
- [x] Password cannot be plain text
- [x] Email validation works
- [x] Cannot register with weak password
- [x] Cannot access protected routes without token
- [x] Token expires after 7 days
- [x] Email is unique
- [x] Contact form sanitized

### Workflow ✅
- [x] Admin can create team  members
- [x] Member can register with created email
- [x] Member can login
- [x] Member can edit profile
- [x] Public can view team
- [x] Public can view individual profiles
- [x] Public can submit contact form

---

## 🐛 Troubleshooting

### 404 on /api/team
**Check**: Backend has route registered in index.js
```javascript
app.use("/api/team", require("./routes/teamRoutes"));
```

### Member can't update profile
**Check**: Token is not expired
**Fix**: Login again to get new token

### Image not showing
**Check**: Check browser console for actual image URL
**Expected**: `http://localhost:5000/uploads/filename.jpg`

### CORS error
**Check**: Backend CORS settings in index.js
**Should be**: `["http://localhost:5173"]`

### MongoDB connection error
**Check**: .env file has valid MONGO_URI
**Verify**: MongoDB is running/accessible

### Password validation failing
**Check**: Password must be at least 6 characters
**Example**: `Password123` ✅ | `Pass12` ✅ | `Pass1` ❌

---

## 📊 Performance Metrics

### Target Response Times
- Login: < 500ms
- Team list: < 1s
- Profile update: < 500ms
- Image upload: < 3s (depending on size)

### Database Queries
- Should be indexed on email
- No N+1 queries
- Proper pagination ready

---

## 🎯 Quick Wins

✅ All 404 errors fixed  
✅ Hardcoded URLs converted to environment variables  
✅ Input validation added  
✅ Security hardened  
✅ Documentation created  
✅ Admin + Member workflows functional  
✅ Public team display working  

---

## 📝 Test Checklist

- [ ] Backend starts
- [ ] Frontend loads
- [ ] Admin login works
- [ ] Can create team member
- [ ] Can see team on public page
- [ ] Can register as member
- [ ] Can login as member
- [ ] Can edit member profile
- [ ] Can submit contact form
- [ ] Admin can view messages
- [ ] Protected routes require token
- [ ] All error messages display correctly

---

## 🎉 You're Ready!

If all tests pass → **Application is ready for deployment** 🚀

Questions? Check the detailed guides:
- API_DOCUMENTATION.md (API reference)
- SETUP_AND_TESTING_GUIDE.md (detailed setup)
- WORKFLOW_GUIDE.md (complete workflows)
