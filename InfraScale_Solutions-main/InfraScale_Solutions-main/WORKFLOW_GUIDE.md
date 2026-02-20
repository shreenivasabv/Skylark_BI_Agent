# InfraScale - Admin & Member Workflow Guide

## 🔄 Complete System Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    INFRASCALE TEAM MANAGEMENT                   │
└─────────────────────────────────────────────────────────────────┘

ADMIN WORKFLOW:
═══════════════

  Step 1: Admin Login
  ├─ Navigate: /admin/login
  ├─ Use: admin@infrascale.com / admin123
  ├─ Backend: POST /api/admin/login
  ├─ Response: JWT Token (7 days valid)
  └─ Store: localStorage.token

  Step 2: Access Dashboard  
  ├─ Redirect: /admin/dashboard
  ├─ Display: Contact messages, Statistics
  └─ Token: Included in Authorization header

  Step 3: Manage Team Members
  ├─ Navigate: /admin/manage-team (or AdminTeam page)
  ├─ Form Fields:
  │  ├─ Name (required)
  │  ├─ Email (required, unique)
  │  ├─ Designation
  │  ├─ Specialization
  │  ├─ Experience (years)
  │  ├─ Features (comma-separated skills)
  │  └─ Image (file upload, required)
  ├─ Backend: POST /api/team (protected)
  │  └─ Headers: Authorization: Bearer {token}
  ├─ Response: Team member created
  └─ Action: Member receives notification (future)

  Step 4: View All Team Members
  ├─ Backend: GET /api/team (public)
  ├─ Display: All added team members
  ├─ Fields: name, designation, specialization, experience, features
  └─ Admin Can: Edit, Delete members

  Step 5: Delete Team Member
  ├─ Action: Click delete button
  ├─ Backend: DELETE /api/team/{id} (protected)
  ├─ Headers: Authorization: Bearer {token}
  ├─ Response: Member deleted
  └─ Database: Record removed


MEMBER WORKFLOW:
════════════════

  Step 1: Receive Invitation
  ├─ Admin creates team member with email
  ├─ Email: Member gets notification (future)
  └─ Link: Registration page

  Step 2: Member Registration
  ├─ Navigate: /member-register
  ├─ Use Email: Same as admin provided
  ├─ Field: Email (from admin)
  ├─ Field: Password (min 6 characters)
  ├─ Validation:
  │  ├─ Email format check
  │  ├─ Password strength check
  │  └─ Email uniqueness check
  ├─ Backend: POST /api/member-auth/register
  ├─ Action: 
  │  ├─ Email registered
  │  ├─ Password hashed
  │  ├─ Mark as: isRegistered = true
  │  └─ Create profile record
  ├─ Response: Success message
  └─ Redirect: /member-login

  Step 3: Member Login
  ├─ Navigate: /member-login
  ├─ Field: Email
  ├─ Field: Password
  ├─ Backend: POST /api/member-auth/login
  ├─ Validation:
  │  ├─ Email exists
  │  ├─ Password correct
  │  └─ isRegistered = true
  ├─ Response: JWT Token (7 days valid)
  ├─ Store: localStorage.token
  └─ Redirect: /member/dashboard

  Step 4: View My Profile
  ├─ Navigate: /member/dashboard
  ├─ Backend: GET /api/members/me (protected)
  │  └─ Headers: Authorization: Bearer {token}
  ├─ Display:
  │  ├─ Admin-set: Name, Designation, Department, Experience, Image
  │  └─ Editable: Skills, Projects, Work Experience
  └─ Action: Can edit any field

  Step 5: Edit Profile
  ├─ Form Fields:
  │  ├─ Name (text)
  │  ├─ Designation (text)
  │  ├─ Department (text)
  │  ├─ Specialization (text)
  │  ├─ Experience Years (number)
  │  ├─ Skills (comma-separated)
  │  ├─ Projects (title + technologies)
  │  └─ Work Experience (company, designation, duration)
  ├─ Action: Click "Save Changes"
  ├─ Backend: PUT /api/members/me (protected)
  │  └─ Headers: Authorization: Bearer {token}
  ├─ Response: Updated profile
  ├─ Message: "Profile Updated Successfully"
  └─ Display: Updated profile

  Step 6: View Public Profile
  ├─ Navigate: /team (public)
  ├─ See: Member card with updated info
  ├─ Click: Card to view full profile
  ├─ URL: /team/{memberId}
  └─ Backend: GET /api/members/{id} (public)


PUBLIC USER WORKFLOW:
═════════════════════

  1. View Team Page
  ├─ Navigate: /team
  ├─ Backend: GET /api/team
  ├─ Display: All team members with:
  │  ├─ Photo
  │  ├─ Name
  │  ├─ Designation
  │  ├─ Specialization
  │  ├─ Experience
  │  └─ Features/Skills
  └─ Action: Click to view full profile

  2. View Member Profile
  ├─ URL: /team/{memberId}
  ├─ Backend: GET /api/members/{id}
  ├─ Display: Full profile with all details
  ├─ Fields:
  │  ├─ Photo
  │  ├─ Name & designation
  │  ├─ Department & specialization
  │  ├─ Skills list
  │  ├─ Projects
  │  └─ Work experience
  └─ Action: Return to team page

  3. Contact Form
  ├─ Navigate: /contact
  ├─ Fill Form:
  │  ├─ Name (required)
  │  ├─ Email (required, validated)
  │  ├─ Subject (required)
  │  └─ Message (required)
  ├─ Backend: POST /api/contact
  ├─ Response: Success message
  └─ Admin View: /admin/dashboard → Contact Messages
```

---

## 📋 Data Flow Diagrams

### Admin Creating Team Member
```
AdminTeam.jsx
    ↓
[Fill Form]
    ↓
validate inputs
    ↓
POST /api/team
+ FormData (name, email, designation, specialization, experience, features, image)
+ Authorization: Bearer {token}
    ↓
teamRoutes.js POST handler
    ↓
validate: email unique, all required fields
    ↓
Team.create({...})
    ↓
MongoDB insert
    ↓
response: { _id, name, email, ... }
    ↓
AdminTeam.jsx
↓
setMembers(updated list)
↓
refetch & display
```

### Member Registration
```
MemberRegister.jsx
    ↓
[Fill Email & Password]
    ↓
validate email format & password strength
    ↓
POST /api/member-auth/register
+ Body: { email, password }
    ↓
MemberAuthController.register()
    ↓
validate inputs
    ↓
check email exists: Member.findOne({ email })
    ↓
hash password: bcrypt.hash(password, 10)
    ↓
Member.create({ email, password: hashed, isRegistered: true })
    ↓
MemberProfile.create({ authId: memberId })
    ↓
response: { message: "Account created successfully" }
    ↓
MemberRegister.jsx
    ↓
redirect: /member-login
```

### Member Login & Profile Update
```
MemberLogin.jsx
    ↓
[Enter Email & Password]
    ↓
POST /api/member-auth/login
+ Body: { email, password }
    ↓
MemberAuthController.login()
    ↓
find user: Member.findOne({ email })
    ↓
compare password: bcrypt.compare(input, stored)
    ↓
generate JWT: jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" })
    ↓
response: { token, memberId, email }
    ↓
MemberLogin.jsx
    ↓
localStorage.setItem("token", token)
    ↓
redirect: /member/dashboard
    ↓
MemberDashboard.jsx
    ↓
GET /api/members/me
+ Authorization: Bearer {token}
    ↓
auth middleware: verify JWT
    ↓
req.user.id set
    ↓
Member.findById(req.user.id)
    ↓
response: member data
    ↓
setMember(data)
    ↓
[User edits fields]
    ↓
PUT /api/members/me
+ Authorization: Bearer {token}
+ Body: { name, skills, projects, ... }
    ↓
Member.findByIdAndUpdate(req.user.id, {...}, { new: true })
    ↓
response: updated member
    ↓
alert: "Profile Updated Successfully"
```

---

## 🔐 Authentication Flow

### JWT Flow
```
1. LOGIN
   ├─ POST /api/admin/login or /api/member-auth/login
   ├─ Verify credentials
   ├─ Generate JWT: jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" })
   └─ Return token

2. STORE TOKEN
   ├─ localStorage.setItem("token", token)
   └─ Token persists across page refreshes

3. PROTECTED REQUESTS
   ├─ All requests to protected endpoints include:
   ├─ Header: "Authorization: Bearer {token}"
   └─ Example: axios.get(url, { headers: { Authorization: "Bearer token123..." } })

4. SERVER VERIFICATION
   ├─ auth middleware checks header
   ├─ Extract token: req.header("Authorization").split(" ")[1]
   ├─ Verify: jwt.verify(token, JWT_SECRET)
   ├─ If valid: req.user = decoded payload
   ├─ If invalid: return 401 Unauthorized
   └─ continue to route handler

5. LOGOUT (Frontend only)
   ├─ localStorage.removeItem("token")
   ├─ Redirect to login page
   └─ Token expires after 7 days automatically
```

### Password Security
```
REGISTRATION:
  password (plain) 
    ↓
  bcrypt.hash(password, 10)
    ↓
  $2b$10$... (hashed password)
    ↓
  Database stores HASHED password only

LOGIN:
  input password (plain)
    ↓
  bcrypt.compare(inputPassword, storedHashedPassword)
    ↓
  true/false
    ↓
  Never stores plain password
```

---

## 📌 Important Notes

### Email Uniqueness
- Each member's email must be unique
- Admin cannot create two team members with same email
- Member cannot register with email of existing team member

### Token Expiry
- JWT expires after 7 days
- User must login again to get new token
- Expired token returns 401 Unauthorized

### Profile Visibility
- All members are PUBLICLY visible on /team page
- Members need password to LOGIN and EDIT their profile
- Anyone can view member profile details publicly

### Admin Privileges
- Only admin can create/delete team members
- Only admin can view contact messages
- Admin cannot create other admins (manual server setup required)

### Data Relationships
```
Team Member (Team.js)
├─ Single record per team member
├─ Public display data
└─ Admin manages this

User Account (Member.js)
├─ Single record with email & password
├─ Used for authentication
└─ Member manages password

Member Profile (MemberProfile.js)
├─ References Member by authId
├─ Store editable profile fields (future)
└─ Could be separate from auth
```

---

## 🚨 Common Scenarios & Troubleshooting

### Scenario: Admin forgets to create team member before member registers
**Problem**: Member can't register because email not in system
**Solution**: Admin creates team member first, then shares link with member

### Scenario: Member wants to update photo
**Solution**: Currently in dashboard, add image upload field to PUT /api/members/me

### Scenario: Two admin accounts needed
**Problem**: No create admin endpoint
**Solution**: Manual MongoDB operation or add endpoint with root authentication

### Scenario: Member changes email
**Problem**: Email field is part of authentication
**Solution**: Would require additional endpoint for email change with verification

### Scenario: Member loses password
**Solution**: Add "Forgot Password" endpoint with email verification (future)
