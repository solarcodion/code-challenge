# Express TypeScript MongoDB CRUD API

A simple RESTful API built with Express.js, TypeScript, and MongoDB that provides CRUD operations for a resource.

## Project Structure

```
src/problem5/
├── src/
│   ├── controllers/     # Request handlers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── config/          # Configuration files
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript configuration
└── README.md            # Documentation
```

## Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

## Setup and Configuration

1. Install dependencies:

   ```
   cd src/problem5
   npm install
   ```

2. Create a `.env` file in the project root with the following variables:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/resourcedb
   ```

   You can also copy the provided `.env.example` file as a starting point:

   ```
   cp .env.example .env
   ```

   Then update the values as needed for your environment.

3. Build the TypeScript code:
   ```
   npm run build
   ```

## Running the Application

Start the server:

```
npm start
```

For development with auto-reload:

```
npm run dev
```

## API Endpoints

| Method | Endpoint           | Description                                |
| ------ | ------------------ | ------------------------------------------ |
| GET    | /api/resources     | List all resources (with optional filters) |
| GET    | /api/resources/:id | Get a specific resource by ID              |
| POST   | /api/resources     | Create a new resource                      |
| PUT    | /api/resources/:id | Update a resource                          |
| DELETE | /api/resources/:id | Delete a resource                          |

## Testing with Postman

A Postman collection file (`code_challenge.postman_collection.json`) is included in the project root. You can use this to test the API endpoints:

1. Import the collection into Postman:

   - Open Postman
   - Click on "Import" button
   - Select the `code_challenge.postman_collection.json` file

2. The collection includes pre-configured requests for all endpoints:

   - Get all resources
   - Get a specific resource
   - Create a new resource
   - Update a resource
   - Delete a resource

3. Make sure your server is running before testing the endpoints.

4. The collection includes test scripts to validate responses.

## Example Usage

### Create a resource

```
POST /api/resources
Content-Type: application/json

{
  "name": "Example Resource",
  "description": "This is a sample resource",
  "category": "sample",
  "status": "active"
}
```

### List resources with filters

```
GET /api/resources?category=sample&status=active
```

### Get resource details

```
GET /api/resources/60d21b4667d0d8992e610c85
```

### Update a resource

```
PUT /api/resources/60d21b4667d0d8992e610c85
Content-Type: application/json

{
  "name": "Updated Resource Name",
  "status": "inactive"
}
```

### Delete a resource

```
DELETE /api/resources/60d21b4667d0d8992e610c85
```
