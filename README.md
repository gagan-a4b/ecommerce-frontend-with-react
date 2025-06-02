# 🛒 E-Commerce Frontend (React)

This is the frontend for an e-commerce web application built using **React**. It allows users to browse products, add them to a cart, place orders, and for admins to manage products through a dashboard.

👉 **Live Repo:** [ecommerce-frontend-with-react](https://github.com/gagan-a4b/ecommerce-frontend-with-react/tree/main)

---

## 📦 Features

### 👤 User Features
- User authentication (login/signup)
- Browse paginated list of products
- Add products to cart
- Checkout and place orders
- View order history

### 🛠️ Admin Features
- Login with admin credentials
- View all products
- Add new products
- Edit and delete existing products
- Pagination for product management

### 💡 Other
- Responsive design using Tailwind CSS
- Toast notifications for feedback
- Global cart context to sync cart count across pages
- Modal components for add/edit/view
- 📊 **Event tracking using Mixpanel**

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/gagan-a4b/ecommerce-frontend-with-react.git
cd ecommerce-frontend-with-react
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

## 🗂️ Project Structure

```
src/
│
├── api/               # API service files (products, cart, orders, auth)
├── components/        # Shared components (ProductCard, Pagination, Forms, etc.)
├── context/           # Global context (e.g. cart context)
├── pages/             # Pages (Home, Login, Admin, Orders, etc.)
├── App.jsx            # Main app component
└── main.jsx           # App entry point
```

## ⚙️ Tech Stack

```
React

Vite

Tailwind CSS

React Router DOM


Context API

```

## 📦 Backend
This project connects to a custom backend API for user auth, product, cart, and order handling. Make sure the backend is running before starting the frontend.

Backend repo : [Backend](https://github.com/gagan-a4b/ecommerce-1-assignment/tree/main/backend)

---


## 📸 Screenshots
#### 1. Home Page:
![Home Page](https://github.com/gagan-a4b/ecommerce-frontend-with-react/blob/main/images/Homepage.png)

---

#### 2. Login Page:
![Login Page](https://github.com/gagan-a4b/ecommerce-frontend-with-react/blob/main/images/loginpage.png)

---

#### 3.Cart:
![Cart](https://github.com/gagan-a4b/ecommerce-frontend-with-react/blob/main/images/cart.png)

---

#### 4.Orders(Modal):
![Orders](https://github.com/gagan-a4b/ecommerce-frontend-with-react/blob/main/images/orderPage.png)
![order modal](https://github.com/gagan-a4b/ecommerce-frontend-with-react/blob/main/images/orderModal.png)

---

#### 5.Admin Page:
![Admin Page](https://github.com/gagan-a4b/ecommerce-frontend-with-react/blob/main/images/adminpage.png)

---

#### 6.Add Product Form(Modal):
![add product](https://github.com/gagan-a4b/ecommerce-frontend-with-react/blob/main/images/addProductForm.png)

---

#### 7.Edit Product Form(Modal):
![edit product](https://github.com/gagan-a4b/ecommerce-frontend-with-react/blob/main/images/editProductForm.png)

---

#### 8.Mixpanel integration:
![mixP](https://github.com/gagan-a4b/ecommerce-frontend-with-react/blob/main/images/mixpanelevents.png)

![mixP](https://github.com/gagan-a4b/ecommerce-frontend-with-react/blob/main/images/mixpanel.png)


