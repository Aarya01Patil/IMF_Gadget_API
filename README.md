# IMF Gadget API

Welcome to the **IMF Gadget API** repository! This project is developed to manage the gadget inventory for the **Impossible Missions Force (IMF)**. The API allows agents to securely perform CRUD operations on gadgets, trigger self-destruct sequences, and manage authentication and authorization.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing the API](#testing-the-api)
- [License](#license)

---

## Introduction

The **IMF Gadget API** is a secure RESTful API built with Node.js, Express, and PostgreSQL using Sequelize ORM. It allows agents to authenticate, manage gadgets, and ensures secure operations with JWT-based authentication and authorization.

---

## Features

- **User Authentication**: Register and login agents with secure password hashing.
- **JWT Authorization**: Protects API endpoints, ensuring only authenticated agents can access them.
- **Gadget Management**:
  - **Create**: Add new gadgets with unique codenames.
  - **Read**: Retrieve all gadgets, including a mission success probability.
  - **Update**: Modify gadget details.
  - **Delete**: Decommission gadgets without permanent deletion.
- **Self-Destruct Sequence**: Trigger self-destruct for gadgets.
- **Status Filtering**: Filter gadgets by their status.
- **Error Handling**: Graceful error responses with meaningful messages.
- **API Documentation**: Provided via a Postman collection.

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** and **npm** installed.
- **PostgreSQL** database installed and running.
- **Git** installed for version control.

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/your_username/imf-gadget-api.git
cd imf-gadget-api
```

### Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory to store your environment variables. Use the `.env.example` file as a template:

```bash
PORT=3000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=imf_gadgets
DB_DIALECT=postgres
JWT_SECRET=your_jwt_secret
```

**Note:** Replace the placeholder values with your actual database credentials and a secure `JWT_SECRET`.

---

## Database Setup

### Create the Database

Ensure your PostgreSQL server is running. Create a new database:

```sql
CREATE DATABASE imf_gadgets;
```

### Set Up Database User (Optional)

You can use the default `postgres` user or create a new user with appropriate privileges.

---

## Running the Application

### Running Locally

Start the development server with nodemon:

```bash
npm run dev
```

The server will start on the port specified in your `.env` file (default is `3000`).

### Running in Production Mode

Start the server without nodemon:

```bash
npm start
```

---

## API Documentation

The API is documented using a Postman collection.

### Postman Collection

The Postman collection is available in the `docs/` directory:

- **Location:** `docs/IMF_Gadget_API.postman_collection.json`

#### Using the Collection

1. **Import into Postman**:

   - Open Postman.
   - Click **Import**.
   - Select the JSON file from the `docs/` directory.

2. **Set Up Environment Variables**:

   - Create a new environment in Postman (e.g., `IMF Gadget API`).
   - Add the following variables:
     - `base_url`: `http://localhost:3000` (or your deployed URL)
     - `token`: Leave blank for now.

3. **Usage**:

   - Use the collection to make requests to the API endpoints.
   - Follow the order: Register > Login > Copy Token > Authorized Requests.

---

## Testing the API

### Register a New Agent

- **Endpoint:** `POST {{base_url}}/auth/register`
- **Body:**

  ```json
  {
    "username": "agent007",
    "password": "your_password"
  }
  ```

### Login

- **Endpoint:** `POST {{base_url}}/auth/login`
- **Body:**

  ```json
  {
    "username": "agent007",
    "password": "your_password"
  }
  ```

- **Store the Token**:

  - In the response, copy the `token` value.
  - Set the `token` variable in your Postman environment.

### Authorized Requests

- Include the `Authorization` header in subsequent requests:

  ```
  Authorization: Bearer {{token}}
  ```

### Example: Get All Gadgets

- **Endpoint:** `GET {{base_url}}/gadgets`

---


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
