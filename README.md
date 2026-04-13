# 💰 Daily Based Finance Application
This is a daily-based loan **full stack application (MERN Stack)**  that allows financers to manange EMI entries like a ledger account, trank client payments, identify due or missed payments, and monitor how much amount is pending or needs to be paid.


## 🚀 Live Deme
- 🌐 Website : https://pggroup.a1sartaj.in
- 👨‍💻 GitHub : https://github.com/a1sartaj/financer

## 👨‍💻 Test Account
```
    Email : sartaj@gmail.com
    Pass : 123
```

## 😒 What Problem does is solve?
It solves multiple problems by eliminating the need for manual pen-and-paper record keeping and providing a digital solution, allowing financiers to manage data from anywhere. It also removes the need for manual EMI calculations, as the application automatically shows pending amounts, paid amounts, and remaining balances, making the process faster, more accurate, and efficient.


## 🔐 Authentication & Security
- Email & Password Login System
- Password hashing using bcrypt
- JWT-based & Cookies-base Authentication
- Protected Routes

## 🚀 Features
- Financier can create new clients
- View a list of all clients
- View detailed client profiles
- Update client information
- Delete client (soft delete with automatic permanent deletion after 30 days)
- Restore deleted clients within 30 days
- Mark clients as Defaulter or Regular
- Add single EMI entry for a client
- Edit EMI entries
- Delete individual EMI records
- Bulk (bundle) EMI entry for multiple clients
- Print daily transaction sheet
- View automatically calculated financial data:
    - Open and Close Date
    - Emi Count
    - Emi Amount
    - Loan Amount 
    - Total Received Amount
    - Remaining Balance
    - Pending Amount

## 💻 Frontend
- React + Vite
- Tailwind CSS
- Axios API layer
- AuthContext
- Proucted Routes
- Responsive UI
- TypeScript
- React Router
- React Hot Toast
- Lucide React

## 🧠 Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- RESTful APIs
- Middleware architecture
- Node-Cron Job
- DotEnv
- Cookie-parser
- Cors

## 🔑 Environment Variables
### 💻 Frontend (.env)
```
VITE_BACKEND_URL = use_your_backend_url
```

 ## 🧠 Backend (.env)
 ```
PORT=Port_Number
MONGO_URI=MongoDB_URI
JWT_SECRET = JWT_Secret_Code
FRONTEND_URL = fronted_url
NODE_ENV=set_node_env
 ```

## 🧪 How to Run Locally?
### 🧑‍💻 Open terminal and paste it
```
    https://github.com/a1sartaj/financer
```

### 🧠 Backend
```
    cd backend
    npm install
    npm run dev
```

### 💻 Frontend
```
   cd frontend
   npm install
   npm run dev
```

## 🌍 Deployment
- **Frontend** : VPS server
- **Backend** : VPS server
- **MongoDB** : VPS server

## ⭐ Future Improvements
    If Needed I will add more.

## 🧑‍💻 Author
### Sartaj Alam
- GitHub : https://github.com/a1Sartaj
- LinkedIn : https://linkedin.com/in/a1sartaj
- Portfolio : https://a1sartaj.in

## 📄 License
This project is licensed under the MIT License.