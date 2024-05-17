# Medilocker

## Technologies Used

- **Node.js:** JavaScript runtime for building server-side applications.
- **Express:** Web application framework for Node.js.
- **bcrypt:** Used for secure password hashing.
- **Passport.js:** Used for authentication and session management.

## Installation

To run the Snippet Manager locally, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine.

## Manual Installation

Clone the repo:

```bash
git clone https://github.com/mandyval17/MediLocker
cd backend-node-express
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env
# open .env and modify the environment variables
```

## Commands

Running in development:

```bash
npm start
# or
npm run dev
```

## Environment Variables

The environment variables can be found and modified in the `.env` file.

```bash
MONGO_URI="mongodb://localhost:27017/database_name"
NODE_ENV="development"
callBackUrl="/auth/google/redirect"
clientID=
clientSecret= 
JWT_SECRET =
