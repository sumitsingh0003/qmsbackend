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

Installation & Run
# Install dependencies
npm install

# Run in development
npm run dev

# Run in production
npm start




Base URL
http://localhost:5000/api


Bas bolo 👍

