# 🚀 Production Deployment Guide - Render & Vercel

## Part 1: Backend Deployment (Render)

### Prerequisites
- Render account (render.com)
- GitHub repository with backend code
- MongoDB Atlas account with production database
- Environment variables ready

### Step 1: Prepare Environment Variables

Create a `.env` file in backend directory with production values:

```env
# Production Environment Variables
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/infrascale-prod?retryWrites=true&w=majority
JWT_SECRET=your-very-long-random-secret-key-min-32-chars-CHANGE_THIS
CORS_ORIGIN=https://your-frontend-domain.vercel.app
SESSION_SECRET=another-random-secret-key-for-sessions
```

**Important:** Never commit `.env` to GitHub. Instead:
1. Add `.env` to `.gitignore`
2. Store values in Render's environment variables section

### Step 2: Create Render Web Service

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +"** → **"Web Service"**
3. **Connect GitHub Repository**
   - Click "Connect GitHub account"
   - Select your infrascale repository
   - Authorize Render

4. **Configure Service:**
   ```
   Name: infrascale-backend
   Environment: Node
   Build Command: npm install
   Start Command: node index.js
   Plan: Free (or Pro if you need guaranteed uptime)
   ```

5. **Add Environment Variables** (Settings → Environment)
   - Copy all variables from production `.env`
   - **Important Fields:**
     - `MONGODB_URI` - Your MongoDB Atlas production URL
     - `JWT_SECRET` - Generate random 32+ char string
     - `CORS_ORIGIN` - Will update after frontend deployed

6. **Deploy**
   - Click "Create Web Service"
   - Render starts building and deploying
   - Wait for success status (green checkmark)
   - Copy the deployed URL (e.g., `https://infrascale-backend-xyz.onrender.com`)

### Step 3: Update Render Environment Variable

1. Go back to Render dashboard
2. Go to Settings → Environment Variables
3. Update `CORS_ORIGIN` to your Vercel frontend URL (we'll get this next)

### Test Backend Deployment

After deployment completes:

```bash
# Test API is running
curl https://infrascale-backend-xyz.onrender.com/api/team

# Should return: Empty array [] (or existing team members if data migrated)

# Test with authentication
curl -X POST https://infrascale-backend-xyz.onrender.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@infrascale.com","password":"admin123"}'

# Should return: { "token": "JWT_TOKEN_HERE" }
```

**Common Issues:**
- 503 Service Unavailable: Build still in progress, wait 2-3 minutes
- Cannot connect to MongoDB: Check MONGODB_URI is correct and IP whitelist allows Render
- CORS errors: Will fix after frontend deployed

---

## Part 2: Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (vercel.com)
- GitHub repository with frontend code
- Backend URL from Render (from Part 1)

### Step 1: Update Environment Variables

In frontend directory, create `.env.production`:

```env
VITE_API_URL=https://infrascale-backend-xyz.onrender.com
```

**Important:** Replace with your actual Render backend URL

### Step 2: Test Build Locally

```bash
cd frontend

# Install dependencies
npm install

# Create production build
npm run build

# Should complete without errors
# Creates folder: dist/
```

### Step 3: Create Vercel Project

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click "Add New..."** → **"Project"**
3. **Import Git Repository**
   - Click "Import Git Repository"
   - Select your GitHub repository
   - If not listed, scroll down and paste GitHub URL

4. **Configure Project:**
   ```
   Framework Preset: Vite
   Root Directory: ./frontend
   Build Command: npm run build
   Output Directory: dist
   ```

5. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add: `VITE_API_URL`
   - Value: `https://infrascale-backend-xyz.onrender.com`
   - Apply to all environments (Production, Preview, Development)

6. **Deploy**
   - Click "Deploy"
   - Vercel builds and deploys
   - Wait for success (green deployment)
   - Copy the production URL (e.g., `https://infrascale-frontend-xyz.vercel.app`)

### Step 4: Update Backend CORS Setting

Go back to Render:
1. Settings → Environment Variables
2. Update `CORS_ORIGIN=https://infrascale-frontend-xyz.vercel.app`
3. Redeploy backend

---

## Part 3: Database Setup (MongoDB Atlas)

### Prerequisites
- MongoDB Atlas account
- Production cluster created

### Step 1: Create Production Database

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com
2. **Create Cluster**
   - Choose "Create Shared Cluster" (free tier)
   - Select cloud provider and region
   - Create cluster
   - Wait 5-10 minutes for cluster to be ready

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New User"
   - Username: `produser` (or your choice)
   - Password: Generate secure password
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Add Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow access from anywhere" (0.0.0.0/0)
   - **Note:** In production, add specific IPs only
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Databases"
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password
   - Replace `<database>` with `infrascale-prod`

   Format: `mongodb+srv://produser:PASSWORD@cluster.mongodb.net/infrascale-prod?retryWrites=true&w=majority`

### Step 2: Add Connection String to Render

1. Go to Render dashboard
2. Select your backend service
3. Settings → Environment Variables
4. Update `MONGODB_URI` with the connection string
5. Redeploy backend

### Step 3: Verify Database Connection

```bash
# Backend logs should show:
# ✅ MongoDB Connected Successfully

# Check in MongoDB Atlas:
# Collections should appear (Team, Contact, Member, etc.)
```

---

## Part 4: SSL/HTTPS Configuration

### For Render (Automatic)
✅ Render automatically provides HTTPS for your domain
- No configuration needed
- Auto-renewing SSL certificates
- Free tier includes SSL

### For Vercel (Automatic)
✅ Vercel automatically provides HTTPS
- All projects get free SSL
- Custom domains supported with DNS records

### For Custom Domains

If you want to use your own domain (e.g., `api.infrascale.com`):

**Backend (Render):**
1. Go to Service Settings
2. Click "Add Custom Domain"
3. Enter your domain
4. Add DNS record to your domain registrar
5. Render verifies and enables SSL

**Frontend (Vercel):**
1. Go to Project Settings → Domains
2. Enter your domain
3. Vercel shows DNS records to add
4. Add records to domain registrar
5. Vercel verifies and enables SSL

---

## Part 5: Post-Deployment Testing

### Test 1: Backend API Endpoints

```bash
# Get all team members
curl https://infrascale-backend-xyz.onrender.com/api/team
# Response: [] or [...team data...]

# Get single team member
curl https://infrascale-backend-xyz.onrender.com/api/team/MEMBER_ID
# Response: {...member data...}

# Login (get JWT token)
curl -X POST https://infrascale-backend-xyz.onrender.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@infrascale.com","password":"admin123"}'
# Response: { "token": "JWT_TOKEN" }
```

### Test 2: Frontend Functionality

Open https://infrascale-frontend-xyz.vercel.app and verify:

1. **Public Pages Load:**
   - ✅ Home page displays
   - ✅ Team page loads
   - ✅ Team member images display
   - ✅ Click team member → details page works
   - ✅ Services page works
   - ✅ Contact form works

2. **Admin Functions:**
   - ✅ Login: admin@infrascale.com / admin123
   - ✅ Admin Dashboard displays
   - ✅ View Queries shows submitted contacts
   - ✅ Manage Team displays team members
   - ✅ Can add new team member
   - ✅ Can delete team member

3. **Member Functions:**
   - ✅ Register: Create account
   - ✅ Login with member account
   - ✅ View profile
   - ✅ Edit profile
   - ✅ Profile updates persist

4. **Contact Form:**
   - ✅ Submit form
   - ✅ Success message shows
   - ✅ Message appears in admin panel
   - ✅ Admin can delete

5. **Images:**
   - ✅ Team member images load (no 404)
   - ✅ Profile images work (if uploaded)

### Test 3: Check Logs

**Render Backend Logs:**
```bash
# Go to Render dashboard → Service → Logs
# Should see:
🚀 Server Running on 5000
✅ MongoDB Connected Successfully
# Check for errors when making API calls
```

**Vercel Frontend Logs:**
```bash
# Go to Vercel dashboard → Project → Deployments
# Click latest deployment → Logs
# Check for build errors
# Should complete successfully
```

---

## Part 6: Monitoring & Maintenance

### Set Up Monitoring

1. **Backend (Render):**
   - Render provides free monitoring
   - Check dashboard for CPU, memory, uptime
   - Enable email alerts for downtime

2. **Frontend (Vercel):**
   - Vercel provides analytics
   - Check Project → Analytics for traffic
   - Monitor response times

### Automatic Deployments

Both Render and Vercel auto-deploy when you push to GitHub:

```bash
# Just push code to main branch
git add .
git commit -m "Fix team member display"
git push origin main

# Render automatically redeploys backend
# Vercel automatically redeploys frontend
# Takes 1-3 minutes
```

### Database Backups

MongoDB Atlas free tier includes:
- Daily backups for 7 days
- Restore from Restore page in dashboard

For production:
- Consider M10+ cluster for hourly backups
- Or enable S3 continuous backup integration

---

## Part 7: Troubleshooting Production

### Issue: Image 404 Errors

**Frontend shows:** Image failed: 404

**Solution:**
1. Ensure images uploaded before deployment
2. Check `/uploads/` folder in backend server
3. Verify VITE_API_URL in Vercel is correct
4. Check browser → Network tab → see actual URL being requested
5. Verify image file exists on Render server

### Issue: Team Member Shows "undefined"

**Solution:**
1. Check route: Should be `/team/:id` (lowercase)
2. Check device console for "Member ID is undefined"
3. Verify MongoDB has team members
4. Rebuild frontend: `npm run build`

### Issue: Admin Can't Add Member

**Solution:**
1. Verify JWT token in localStorage
2. Check backend for auth validation
3. Test with curl:
```bash
curl -X POST https://backend-url/api/team \
  -H "Authorization: Bearer JWT_TOKEN" \
  -F "name=John" ...
```

### Issue: Contact Form Won't Submit

**Solution:**
1. Check VITE_API_URL environment variable
2. Test API directly: `curl https://backend/api/contact`
3. Check browser console for error message
4. Verify backend CORS settings

### Issue: Server keeps crashing

**Solution:**
1. Check Render logs for error
2. Most common: MONGODB_URI is wrong
3. Check MongoDB Atlas IP whitelist includes Render IP
4. Restart service in Render dashboard

---

## 📊 Production Checklist

### Before Going Live

- [ ] Environment variables configured
- [ ] MongoDB production database created
- [ ] Database user credentials set
- [ ] Backend deployed and logs show "Connected"
- [ ] Frontend build works locally
- [ ] Frontend deployed
- [ ] CORS configured correctly
- [ ] SSL/HTTPS working on both frontend and backend

### Initial Testing

- [ ] All public pages load
- [ ] Team members display with images
- [ ] Click team member shows details
- [ ] Admin login works
- [ ] Admin can view queries
- [ ] Admin can manage team
- [ ] Contact form submits
- [ ] No console errors

### Post-Deployment

- [ ] Set up monitoring
- [ ] Configure auto-deployments
- [ ] Set up error alerts
- [ ] Document custom domain setup
- [ ] Schedule database backups
- [ ] Monitor performance metrics

---

## 🔐 Production Security Hardening

### Add These Features:

1. **Rate Limiting**
```bash
npm install express-rate-limit
```

2. **Helmet.js (Security Headers)**
```bash
npm install helmet
```

3. **Input Sanitization**
```bash
npm install express-validator
```

4. **Environment Variable Validation**
- Never log sensitive variables
- Use production DB credentials only in production

5. **Error Handling**
- Don't reveal stack traces in production
- Log errors server-side, show generic messages to clients

---

**Your application is now production-ready and deployed on Render & Vercel!** 🎉
