# 📝 Leave Management System

This is a full-stack Leave Management System built using **Spring Boot (Java)** for backend and **HTML/CSS/JavaScript** for frontend. It allows users to apply for leaves and admins to approve or reject them.

---

## 🚀 Features

### 🔐 Authentication
- Login with email and password
- JWT-based token system
- Role-based access (`USER`, `ADMIN`)

### 🧍 User
- Login and apply for leave
- View status (Pending, Approved, Rejected)

### 🛡️ Admin
- Login and view pending leaves
- Approve or reject leaves
- Sends email on approval or rejection

### 🌐 Frontend
- Basic HTML/CSS/JS page
- Choose login type: User or Admin
- Apply for leave or approve/reject based on role

---

## 💾 Technologies Used

- Spring Boot
- Spring Security (JWT)
- Spring Data JPA + H2 Database
- JavaMailSender (Email)
- HTML, CSS, JavaScript (Vanilla)
- Postman (for testing APIs)

---

## ⚙️ How to Run

### 🖥️ Backend

```bash
cd LeaveManagementSystem
./mvnw spring-boot:run
Or run LeaveApp.java in your IDE.

🌍 Frontend
Open index.html in your browser:

sql
Copy
Edit
Right click → Open with Chrome (or any browser)
📂 Folder Structure
css
Copy
Edit
LeaveManagementSystem/
├── src/
│   └── main/
│       ├── java/com/ram/leave/    ← Java backend files
│       └── resources/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── pom.xml
└── README.md
📧 Email Setup (for Admin Notifications)
Add your actual email and app password in application.properties:

properties
Copy
Edit
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
🙋 Author
Ram Naresh Dubey
📧 dubey.ram9919@gmail.com

📌 Note
Frontend is kept simple for demonstration. You can later enhance it using React or Angular.

