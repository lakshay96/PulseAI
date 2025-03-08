# Ticketing API

This is a Fastify-based Ticketing API that allows users to create, manage, and delete support tickets. It uses Supabase as the database and Ably for real-time updates.

## Features
- Create, update, and delete tickets
- Fetch all tickets or a specific ticket
- Uses Supabase for database storage
- Real-time ticket updates with Ably

## Prerequisites
Before running the project, make sure you have:
- **Node.js** (>= 16.x)
- **npm** or **yarn**
- **Supabase** account and API keys
- **Ably** account and API keys

## Setup Instructions

### 1. Clone the repository
```sh
git clone <repository-url>
cd <repository-folder>
```

### 2. Install dependencies
```sh
npm install  # or yarn install
```

### 3. Configure environment variables
Create a `.env` file in the root directory and add the following variables:
```env
SUPABASE_URL=<your-supabase-url>
SUPABASE_KEY=<your-supabase-key>
ABLY_API_KEY=<your-ably-api-key>
```

### 4. Run the development server
```sh
npm run dev  # or yarn dev
```
This will start the server at `http://localhost:3000`

### 5. Available API Endpoints

#### Create a ticket
```sh
POST /api/tickets
```
**Request Body:**
```json
{
  "title": "Issue with login",
  "description": "User is unable to log in.",
  "status": "open",
  "priority": "high",
  "assigned_to": "agent_id"
}
```

#### Get all tickets
```sh
GET /api/tickets
```

#### Get a ticket by ID
```sh
GET /api/tickets/:id
```

#### Update a ticket
```sh
PATCH /api/tickets/:id
```
**Request Body:**
```json
{
  "status": "resolved",
  "priority": "low",
  "assigned_to": "agent_id"
}
```

#### Delete a ticket
```sh
DELETE /api/tickets/:id
```

## Deployment
To deploy the project, use services like **Vercel**, **Heroku**, or **Railway**.

## License
This project is licensed under the MIT License.

## Author
Developed by Lakshay Aggarwal
.

