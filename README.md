# 🏨 HotelSphere - Full Stack Hotel Management System

HotelSphere is a comprehensive web application designed to streamline hotel operations. It features a dual-interface system for **Guests** to search and book rooms, and **Admins** to manage inventory, revenue, and services.

Built with **Spring Boot** (Backend) and **React.js** (Frontend) with a MySQL database.

## 🚀 Tech Stack

- **Frontend:** React.js, Bootstrap 5, Axios, React Router v6
- **Backend:** Java 17, Spring Boot 3, Spring Security (JWT), Spring Data JPA
- **Database:** MySQL (Relational Data Model)
- **Tools:** Maven, Lombok, Postman, Eclipse/IntelliJ

## ✨ Key Features

### 👤 User Panel

- **Smart Search:** Filter rooms by dates and type (Luxury, Deluxe, Suite).
- **Secure Booking:** Real-time availability checks preventing double bookings.
- **Payment Gateway:** Integrated mock payment processing (Card/UPI) with status tracking.
- **Service Ordering:** Guests can order food or laundry directly to their room bill.

### 🛠 Admin Dashboard

- **Live Analytics:** View Total Revenue, Active Bookings, and Occupancy rates instantly.
- **Room Management:** Add, update, or delete rooms and set pricing.
- **Booking Control:** View all bookings and handle cancellations.

## ⚙️ Setup & Run

### 1. Backend (Spring Boot)

1.  Clone the repo and open the `backend` folder in Eclipse/IntelliJ.
2.  Update `application.properties` with your MySQL credentials:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/hotel_db
    spring.datasource.username=root
    spring.datasource.password=your_password
    ```
3.  Run `HotelApplication.java`. The server starts at `http://localhost:8080`.

### 2. Frontend (React)

1.  Open the `frontend` folder in VS Code.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the app:
    ```bash
    npm start
    ```
4.  Access the app at `http://localhost:3000`.

5.  SnapShots
   <img width="1351" height="687" alt="proj1" src="https://github.com/user-attachments/assets/2357d61f-52df-49bb-b524-d2bf25ada128" />
   
<img width="1355" height="727" alt="proj8" src="https://github.com/user-attachments/assets/861eab21-4ce5-4512-ad5d-d35282c9ec57" />
<img width="1365" height="693" alt="proj9" src="https://github.com/user-attachments/assets/fce1e425-d1dd-4a4e-8f87-d4eec414b123" />
<img width="1313" height="687" alt="proj10" src="https://github.com/user-attachments/assets/12994934-f6fb-4890-8ea8-12eb940a0526" />
<img width="1200" height="665" alt="proj11" src="https://github.com/user-attachments/assets/fbb8f119-727f-4172-ba80-ba12f7eda9bd" />
<img width="1345" height="686" alt="proj12" src="https://github.com/user-attachments/assets/ed78d54a-cd8d-4b5e-aa26-cfe1dfcd986e" />
<img width="1332" height="687" alt="proj13" src="https://github.com/user-attachments/assets/d8c1260a-e889-4169-a83f-464832e25445" />
<img width="1338" height="686" alt="proj14" src="https://github.com/user-attachments/assets/9e5325f2-86eb-42fe-a762-a1c47004b140" />
<img width="1352" height="649" alt="proj15" src="https://github.com/user-attachments/assets/c9c9f975-6736-4418-bb24-8ecda13db535" />
<img width="1338" height="693" alt="proj16" src="https://github.com/user-attachments/assets/ad740a51-f7ab-4300-9f9e-de6b2ccec559" />
<img width="1314" height="690" alt="proj17" src="https://github.com/user-attachments/assets/a46b7ae5-3182-4e11-a07f-d75e633567de" />
<img width="1342" height="689" alt="proj2" src="https://github.com/user-attachments/assets/b5ae5810-6d1b-4fbf-a9be-9ee93973ef63" />
<img width="1345" height="684" alt="proj3" src="https://github.com/user-attachments/assets/efd8c892-868c-47ec-be82-21b338cc75da" />
<img width="1344" height="690" alt="proj4" src="https://github.com/user-attachments/assets/4a83b55e-848e-4044-9a14-6c107a03b99b" />
<img width="1281" height="679" alt="proj5" src="https://github.com/user-attachments/assets/efde54f2-acc6-4db2-be03-01172b84136c" />
<img width="1346" height="691" alt="proj6" src="https://github.com/user-attachments/assets/14ef3b51-539f-4acd-b6e8-b2ad093e263e" />
<img width="1334" height="686" alt="proj7" src="https://github.com/user-attachments/assets/0114c34e-00b2-4acf-9599-4fcc26b2e148" />

