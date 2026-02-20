# InfraScale Backend - API Documentation

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (connected via MONGO_URI in .env)
- npm or yarn

### Installation
```bash
cd backend
npm install
```

### Environment Variables
Create a `.env` file in the backend directory:
```
MONGO_URI=mongodb+srv://your_connection_string
JWT_SECRET=your_secure_secret_key
PORT=5000
NODE_ENV=development
```

### Start Server
- Development: `npm run dev`
- Production: `npm start`

---

## API Endpoints

### Authentication Endpoints

#### Admin Login
- **POST** `/api/admin/login`
- **Body**: `{ email, password }`
- **Response**: `{ token, email }`
- **Default Credentials**: admin@infrascale.com / admin123

#### Member Register
- **POST** `/api/member-auth/register`
- **Body**: `{ email, password }`
- **Response**: `{ message: "Account created successfully" }`
- **Validations**:
  - Email must be valid format
  - Password must be at least 6 characters
  - Email must be unique

#### Member Login
- **POST** `/api/member-auth/login`
- **Body**: `{ email, password }`
- **Response**: `{ token, memberId, email }`
- **Token Expiry**: 7 days

---

### Team Endpoints

#### Get All Team Members (Public)
- **GET** `/api/team`
- **Response**: `[{ _id, name, email, designation, specialization, experience, features, image }]`

#### Get Single Team Member (Public)
- **GET** `/api/team/:id`
- **Response**: `{ _id, name, email, designation, specialization, experience, features, image }`

#### Admin Create Team Member ⭐ Protected
- **POST** `/api/team`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: FormData
  - name (required)
  - email (required)
  - designation
  - specialization
  - experience
  - features (comma-separated or JSON array)
  - image (file, required)
- **Response**: `{ _id, name, email, ... }`

#### Admin Delete Team Member ⭐ Protected
- **DELETE** `/api/team/:id`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ message: "Member deleted" }`

---

### Member Profile Endpoints

#### Get Current User Profile ⭐ Protected
- **GET** `/api/members/me`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ _id, email, name, designation, department, skills, projects, workExperience }`

#### Update Own Profile ⭐ Protected
- **PUT** `/api/members/me`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ name, designation, department, skills, projects, workExperience }`
- **Response**: Updated member object

#### Get All Members (Public)
- **GET** `/api/members`
- **Response**: `[{ all member records }]`

#### Get Single Member (Public)
- **GET** `/api/members/:id`
- **Response**: `{ member details }`

---

### Contact Endpoints

#### Submit Contact Form (Public)
- **POST** `/api/contact`
- **Body**: `{ name, email, subject, message }`
- **Response**: `{ message: "Thank you! Your message has been received." }`

#### Get All Contact Messages ⭐ Protected
- **GET** `/api/contact`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `[{ _id, name, email, subject, message, createdAt }]`

#### Delete Contact Message ⭐ Protected
- **DELETE** `/api/contact/:id`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ message: "Message deleted successfully" }`

---

### Services Endpoints

#### Get All Services
- **GET** `/api/services`
- **Response**: `[{ _id, title, description, category, image }]`

#### Admin Create Service ⭐ Protected
- **POST** `/api/services`
- **Headers**: `Authorization: Bearer {token}`

#### Admin Delete Service ⭐ Protected
- **DELETE** `/api/services/:id`
- **Headers**: `Authorization: Bearer {token}`

---

### About Endpoints

#### Get About Page Content
- **GET** `/api/about`
- **Response**: `{ heading, description, mission, vision, values }`

#### Admin Update About ⭐ Protected
- **PUT** `/api/about`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ heading, description, mission, vision, values }`

---

## Security Features Implemented ✅

1. **JWT Authentication** - Token-based auth with 7-day expiry
2. **Password Hashing** - bcryptjs with salt rounds
3. **Input Validation** - Email format, password strength
4. **CORS Protection** - Configured allowed origins
5. **Protected Routes** - Admin/Auth-only endpoints
6. **Error Handling** - Graceful error responses
7. **Database Validation** - MongoDB schema validation

---

## Workflow Examples

### Register and Login as Member
```
1. Member Register: POST /api/member-auth/register { email, password }
2. Member Login: POST /api/member-auth/login { email, password }
3. Get Token from response
4. Use Token in Authorization header for protected endpoints
```

### Admin Add Team Member
```
1. Admin Login: POST /api/admin/login
2. Get Token
3. POST /api/team with FormData + Token
```

### Member Edit Profile
```
1. Member Login
2. GET /api/members/me to view current profile
3. PUT /api/members/me to update profile
```

---

## Error Responses

All errors follow this format:
```json
{
  "message": "Error description"
}
```

Common Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized / Invalid Token
- `404` - Not Found
- `500` - Server Error

---

## Testing with Postman/Insomnia

1. Import endpoints from this doc
2. Set `{{API_BASE}}` = `http://localhost:5000`
3. Set `{{token}}` = Retrieved from login endpoint
4. Use `Bearer {{token}}` in Authorization header
