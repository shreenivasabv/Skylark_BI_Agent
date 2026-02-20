# Contact Form & Admin Queries - Testing Guide

## 🔍 Complete Workflow

### **PART 1: Submit Contact Form (Public User)**

**URL:** http://localhost:5175

1. Scroll to "Contact an Engineer" section or click on navigation link
2. Fill in the form:
   - **Name:** `John Doe` (any name)
   - **Email:** `john@example.com` (valid email format required)
   - **Environment:** `VMware` (optional field)
   - **Message:** `I need help with backup solutions` (required)
3. Click **"Talk to an Engineer"** button
4. Expected response: ✅ "Thank you for submitting" (green toast at top)

**Console Output to Check (Browser DevTools):**
```
POST http://localhost:5000/api/contact 201 Created
✅ Form submitted successfully
```

**Backend Terminal Should Show:**
```
📝 Contact form received: {
  "name": "John Doe",
  "email": "john@example.com",
  "environment": "VMware",
  "message": "I need help with backup solutions"
}
✅ Contact saved successfully
```

---

### **PART 2: View Messages in Admin Panel**

**Prerequisites:**
- Contact form must be submitted first (PART 1)
- Admin must be logged in

**Steps:**

1. **Login as Admin:**
   - URL: http://localhost:5175/admin/login
   - Email: `admin@infrascale.com`
   - Password: `admin123`
   - Click "Login"

2. **Check Backend Terminal (Important!):**
   ```
   🔐 Auth middleware - Header received: ✅ Present
   ✅ Token verified for user: [admin-id]
   📥 Admin fetching contacts | User ID: [admin-id]
   ✅ Fetched N contacts
   ```

3. **View Admin Dashboard:**
   - After login, you'll see Admin Dashboard
   - **Check "View Queries" button** - shows count
   - Should display all submitted contact messages
   - Each message shows: Name, Email, Environment (if provided), Message, Date

4. **Expected Display:**
   ```
   ✉ View Queries (1)
   
   John Doe
   john@example.com | VMware
   I need help with backup solutions
   [Date] [🗑️ Delete Button]
   ```

---

### **PART 3: Delete Message (Admin Only)**

1. In Admin Dashboard, locate the message you want to delete
2. Click the **🗑️ Delete** button
3. Confirm deletion in popup
4. Expected: Message disappears from list, toast shows "Message deleted"

**Backend Terminal Should Show:**
```
🗑️ Admin deleting contact: [message-id]
✅ Contact deleted successfully
```

---

## ❌ Troubleshooting

### **Issue: Contact form shows "Transmission failed"**

**Check these in order:**

1. **Backend is running?**
   ```bash
   # Terminal should show:
   🚀 Server Running on 5000
   ✅ MongoDB Connected Successfully
   ```

2. **Environment variable set?**
   ```javascript
   // In frontend console, type:
   import.meta.env.VITE_API_URL
   // Should print: http://localhost:5000
   ```

3. **Network error?**
   - Check browser DevTools → Network tab
   - Look for POST to http://localhost:5000/api/contact
   - Check Status Code (should be 201 on success, 400 on validation error)

4. **Validation failed?**
   - Browser console should show specific error
   - Common: Missing name, email, or message fields
   - Email must have @ and .com format

---

### **Issue: Admin panel shows "No messages found" even after submission**

**Check these:**

1. **Admin is logged in with valid token?**
   ```javascript
   // In browser console:
   localStorage.getItem("token")
   // Should show a long JWT string, not null
   ```

2. **Token has "Bearer" prefix?**
   ```
   Backend log should show:
   🔐 Auth middleware - Header received: ✅ Present
   ✅ Token verified for user: [id]
   ```
   
   If shows "❌ Missing", the Authorization header isn't being sent correctly.

3. **Backend terminal shows fetch logs?**
   ```
   📥 Admin fetching contacts | User ID: [admin-id]
   ✅ Fetched N contacts
   ```
   
   If no logs, the GET request isn't reaching backend.

4. **Messages are in database?**
   - Check MongoDB Atlas web console
   - Go to Collections → infrascale-db → contacts
   - Should show all submitted messages

---

### **Issue: Delete button doesn't work / shows error**

1. **Check auth token is still valid**
2. **Backend terminal should show:**
   ```
   🗑️ Admin deleting contact: [message-id]
   ✅ Contact deleted successfully
   ```
3. **If shows error:**
   ```
   ❌ Contact not found: [message-id]
   ```
   The message was already deleted or ID is wrong.

---

## 🔧 Quick Debug Checklist

### Before testing, verify:
- [ ] Backend running: `node index.js` in backend folder
- [ ] Frontend running: `npx vite` in frontend folder
- [ ] MongoDB connected (check backend logs)
- [ ] .env file has `VITE_API_URL=http://localhost:5000`
- [ ] Browser DevTools Console is open for debugging

### For contact submission:
- [ ] All required fields filled (Name, Email, Message)
- [ ] Email format is valid (contains @ and .)
- [ ] Backend logs show "✅ Contact saved successfully"
- [ ] Frontend shows success toast notification

### For admin panel:
- [ ] Logged in with admin credentials
- [ ] `localStorage.getItem("token")` returns valid JWT
- [ ] Backend logs show "✅ Token verified"
- [ ] Backend logs show "✅ Fetched N contacts"

---

## 📝 Log Format Reference

| Status | Message | Meaning |
|--------|---------|---------|
| 📝 | Contact form received | Form data arrived at backend |
| ✅ | Contact saved successfully | Message stored in database |
| 🔐 | Auth middleware - Header received: ✅ | Token authentication passed |
| ✅ | Token verified for user: [id] | JWT token is valid |
| 📥 | Admin fetching contacts | Admin requested message list |
| ✅ | Fetched N contacts | Database query successful |
| 🗑️ | Admin deleting contact | Delete operation started |
| ✅ | Contact deleted successfully | Message removed from database |
| ❌ | Any error message | Something failed - see details |

---

## 🧪 Manual cURL Tests (Advanced)

### Submit Contact Form:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "environment": "Nutanix",
    "message": "Test message"
  }'
```
Expected: `{"message":"Thank you! Your message has been received."}`

### Get All Messages (Requires Admin Token):
```bash
# First, login to get token:
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@infrascale.com","password":"admin123"}'

# Copy the token from response
# Then use it here:
curl -X GET http://localhost:5000/api/contact \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Delete a Message (Replace MESSAGE_ID):
```bash
curl -X DELETE http://localhost:5000/api/contact/MESSAGE_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## ✨ Expected Behavior Summary

| Action | Frontend Response | Backend Log | Database |
|--------|------------------|------------|----------|
| Submit form | Success toast | "✅ Contact saved" | New document added |
| View queries (admin) | List displays | "✅ Fetched N" | Queries fetched |
| Delete message | Removed from list | "✅ Contact deleted" | Document removed |
| Invalid email | Error toast | "❌ Validation failed" | No data saved |
| Missing token (admin) | Access denied | "❌ No token provided" | No data returned |

