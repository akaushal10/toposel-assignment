# App Setup Guide

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (Download from [nodejs.org](https://nodejs.org/))
- **MongoDB** (Download from [mongodb.com](https://www.mongodb.com/try/download/community))
- **Postman** (Optional for API testing, [download here](https://www.postman.com/))

## Steps to Run the Express App

### 1. Clone the Repository

```sh
git clone https://github.com/akaushal10/toposel-assignment.git
cd toposel-assignment
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Create a `.env` File

Create a `.env` file in the root directory and add the following environment variables:

```sh
JWT_SECRET=yoursupersecretkeyhere
PORT=5000
MONGO_URI=mongodb://localhost:27017/toposel
```

### 4. Start MongoDB Server

Make sure MongoDB is installed and running. Start MongoDB using:

```sh
mongod
```

### 5. Run the Express Server

```sh
npm start
```

Your server should now be running on `http://localhost:5000`

## Authentication and Security

- APIs are **authenticated using JWT tokens**.
- Passwords are **encrypted using bcryptjs** for security.

## API Documentation

You can access the complete API documentation via Postman:
[https://documenter.getpostman.com/view/41625578/2sAYXCkyz7](https://documenter.getpostman.com/view/41625578/2sAYXCkyz7)

Now you're ready to use the Express app! 🚀
