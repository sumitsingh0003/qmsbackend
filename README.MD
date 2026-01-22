# 🏭 QMS Backend – Quality Management System

A **production-ready backend** for a **Quality Management System (QMS)** built using **Node.js, Express.js, MongoDB, and JWT Authentication**.

This system supports **multiple admins**, **multiple vendors per admin**, **role-based access control**, and **quality report management with file uploads**.

---

## 🚀 Features

- ✅ Node.js + Express.js REST API
- ✅ MongoDB with Mongoose
- ✅ JWT Authentication (Access + Refresh Token)
- ✅ Role-Based Access Control (RBAC)
- ✅ Multiple Admins → Multiple Vendors
- ✅ Quality Report Management
- ✅ Multiple File Uploads (Images / Docs / Any type)
- ✅ Secure & Scalable Architecture
- ✅ Postman-ready APIs
- ✅ Production Folder Structure

---

## 👥 User Roles

| Role | Access |
|----|------|
| SUPER_ADMIN | Full system access |
| ADMIN | Manage own vendors & reports |
| VENDOR | Create & view own reports |
| USER | Read-only (future use) |

---

## 📁 Project Folder Structure
qms-backend/
├── src/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── auth.controller.js
│ │ ├── vendor.controller.js
│ │ └── report.controller.js
│ ├── middlewares/
│ │ ├── auth.middleware.js
│ │ ├── role.middleware.js
│ │ ├── upload.middleware.js
│ │ └── error.middleware.js
│ ├── models/
│ │ ├── User.model.js
│ │ ├── Vendor.model.js
│ │ └── Report.model.js
│ ├── routes/
│ │ ├── auth.routes.js
│ │ ├── vendor.routes.js
│ │ └── report.routes.js
│ ├── app.js
│ └── server.js
├── uploads/
├── .env
├── package.json
└── README.md


---

## ⚙️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (Access & Refresh Token)
- **File Upload:** Multer
- **Testing:** Postman
- **Logging:** Morgan

---

## 🔐 Authentication Flow

1. User registers
2. User logs in
3. Receives:
   - Access Token (short-lived)
   - Refresh Token (long-lived)
4. Token verified via middleware
5. Role-based access applied

---

## 🧾 Quality Report Fields

Each quality report contains:

- Report Date
- Department
- Quantity
- Defect Type
- Priority
- Description
- Vendor Name
- Vendor Code
- Item Code
- Report Images (Multiple files, any type)
- Created By (User)

---

## 🛠️ Environment Variables

Create a `.env` file in root directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/qms
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d






Installation & Run
# Install dependencies
npm install

# Run in development
npm run dev

# Run in production
npm start




Base URL
http://localhost:5000/api






---

## ✅ NEXT (Optional but Recommended)

Agar aap chaho to main:
- ✔️ **Postman Collection JSON** bana du
- ✔️ **API documentation (Swagger)** add karwa du
- ✔️ **Dockerfile + docker-compose** likh du
- ✔️ **Deployment guide (AWS / VPS)** bana du

Bas bolo 👍

