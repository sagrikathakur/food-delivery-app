# E-Commerce REST API

A RESTful e-commerce backend built with **Node.js, Express.js and PostgreSQL** following the **MVC architecture**.

The API supports user authentication, product management, categories, cart, wishlist, orders, payments, reviews and admin management.

## 🚀 Features

### User

* User registration and login
* JWT-based authentication
* User profile management
* Address management
* Browse products
* Search and filter products
* Add products to cart
* Update and remove cart items
* Wishlist management
* Create and manage orders
* Payment processing
* Product reviews and ratings

### Admin

* Admin authentication
* Manage users
* Manage products
* Manage categories
* Manage orders
* Manage reviews
* View dashboard statistics

## 🛍️ Product Categories

The application supports the following product categories:

* Electronics
* Clothing
* Footwear
* Accessories
* Bags
* Home & Kitchen
* Makeup
* Skincare

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **JWT**
* **bcrypt**
* **dotenv**
* **REST API**
* **MVC Architecture**

## 📁 Project Structure

```text
ecommerce-api/
│
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── env.js
│   │
│   ├── models/
│   │   ├── userModel.js
│   │   ├── categoryModel.js
│   │   ├── productModel.js
│   │   ├── cartModel.js
│   │   ├── wishlistModel.js
│   │   ├── orderModel.js
│   │   ├── paymentModel.js
│   │   └── reviewModel.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── categoryController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── wishlistController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   └── reviewController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── wishlistRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── reviewRoutes.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validateMiddleware.js
│   │
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── password.js
│   │   └── response.js
│   │
│   ├── app.js
│   └── server.js
│
├── database/
│   ├── migrations/
│   └── seeds/
│
├── tests/
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Authentication

The API uses **JWT Bearer authentication**.

After successful login, the server returns an access token.

Include the token in protected requests:

```text
Authorization: Bearer <access_token>
```

### Roles

The API supports two primary roles:

```text
user
admin
```

Regular users can manage their own cart, wishlist, orders and reviews.

Admins can manage users, products, categories, orders and reviews.

## 🔗 API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh-token
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Users

```text
GET    /api/users/me
PATCH  /api/users/me

GET    /api/users/me/addresses
POST   /api/users/me/addresses
PATCH  /api/users/me/addresses/:id
DELETE /api/users/me/addresses/:id
```

### Categories

```text
GET /api/categories
GET /api/categories/:id
```

### Products

```text
GET    /api/products
GET    /api/products/:id
GET    /api/products/search
GET    /api/products/category/:categoryId
```

Admin:

```text
POST   /api/admin/products
PATCH  /api/admin/products/:id
DELETE /api/admin/products/:id
```

### Cart

```text
GET    /api/cart
POST   /api/cart/items
PATCH  /api/cart/items/:id
DELETE /api/cart/items/:id
DELETE /api/cart
```

### Wishlist

```text
GET    /api/wishlist
POST   /api/wishlist/items
DELETE /api/wishlist/items/:productId
```

### Orders

```text
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id
PATCH  /api/orders/:id/cancel
```

### Payments

```text
POST /api/payments
GET  /api/payments/:id
POST /api/payments/:id/verify
```

### Reviews

```text
GET    /api/products/:productId/reviews
POST   /api/products/:productId/reviews
PATCH  /api/reviews/:id
DELETE /api/reviews/:id
```

## 👑 Admin API

### Users

```text
GET    /api/admin/users
GET    /api/admin/users/:id
PATCH  /api/admin/users/:id/status
DELETE /api/admin/users/:id
```

### Products

```text
GET    /api/admin/products
POST   /api/admin/products
GET    /api/admin/products/:id
PATCH  /api/admin/products/:id
DELETE /api/admin/products/:id
```

### Categories

```text
GET    /api/admin/categories
POST   /api/admin/categories
PATCH  /api/admin/categories/:id
DELETE /api/admin/categories/:id
```

### Orders

```text
GET   /api/admin/orders
GET   /api/admin/orders/:id
PATCH /api/admin/orders/:id/status
```

### Reviews

```text
GET    /api/admin/reviews
DELETE /api/admin/reviews/:id
```

### Dashboard

```text
GET /api/admin/dashboard
GET /api/admin/stats
```

## 🗄️ Database

The application uses PostgreSQL.

Main tables:

```text
users
addresses
categories
products
product_images
cart
cart_items
wishlist
wishlist_items
orders
order_items
payments
reviews
```

### Basic relationships

```text
users
  │
  ├── addresses
  ├── cart
  ├── wishlist
  ├── orders
  └── reviews

categories
  │
  └── products

products
  │
  ├── product_images
  ├── cart_items
  ├── order_items
  ├── wishlist_items
  └── reviews

orders
  │
  ├── order_items
  └── payments
```

## 📦 Installation

Clone the repository:

```bash
git clone <repository-url>
cd ecommerce-api
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Configure your PostgreSQL connection and JWT secret in `.env`.

Run the development server:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:5000
```

## 🧪 Testing

Run tests with:

```bash
npm test
```

## 📋 API Response Format

Successful response:

```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": []
}
```

Error response:

```json
{
  "success": false,
  "message": "Product not found"
}
```

## 🔄 MVC Request Flow

```text
Client
  ↓
Route
  ↓
Middleware
  ↓
Controller
  ↓
Model
  ↓
PostgreSQL
```

Controllers handle HTTP requests and responses while models handle database operations.

## 🔒 Security

The API includes:

* JWT authentication
* Password hashing with bcrypt
* Role-based authorization
* Request validation
* Environment-based configuration
* Centralized error handling
* Protected admin routes
* Parameterized SQL queries

## 📌 Future Improvements

* Product image uploads
* Advanced product filtering
* Inventory management
* Coupon and discount system
* Shipping integration
* Email notifications
* Payment gateway integration
* Redis caching
* API documentation with Swagger/OpenAPI
* Rate limiting
* Docker deployment
* CI/CD pipeline

## 📄 License

This project is licensed under the MIT License.

```

This version is suitable as the **initial README for your GitHub portfolio project**. You can later add screenshots, database ER diagrams and a deployed API URL once those parts actually exist, rather than documenting imaginary infrastructure like a particularly optimistic startup.
```
