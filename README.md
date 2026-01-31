# COSC 360 Project

A full-stack web application with a React frontend and Node.js/Express backend, containerized with Docker.

## Project Structure

```
.
├── backend/              # Express.js server
│   ├── server.js        # Entry point (port 5000)
│   ├── package.json
│   ├── config/          # Configuration files
│   ├── controllers/      # Route handlers
│   ├── middleware/       # Custom middleware
│   ├── routes/          # API route definitions
│   └── services/        # Business logic
├── frontend/            # React application
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/  # React components
│   │   ├── contexts/    # Context API
│   │   └── hooks/       # Custom hooks
│   └── package.json
└── docker-compose.yml   # Container orchestration
```

## Quick Start

### Prerequisites
- Docker & Docker Compose installed

### Running the Application

1. **Clone and navigate to project:**
   ```bash
   cd cosc360project
   ```

2. **Start with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

### Local Development (Without Docker)

**Backend:**
```bash
cd backend
npm install
npm run dev      # Uses nodemon for auto-reload
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## Tech Stack

- **Frontend:** React 19, React Scripts
- **Backend:** Express.js 5, Node.js
- **Database:** MongoDB (Mongoose)
- **Container:** Docker & Docker Compose
- **Utilities:** CORS, dotenv

## Development

### Backend Development
- Add routes in `backend/routes/`
- Add controllers in `backend/controllers/`
- Add business logic in `backend/services/`
- Server runs on port 5000

### Frontend Development
- Add React components in `frontend/src/components/`
- Use Context API in `frontend/src/contexts/` for state management
- Custom hooks in `frontend/src/hooks/`
- Frontend serves on port 3000

## Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start with auto-reload

**Frontend:**
- `npm start` - Start development server
- `npm build` - Create production build
- `npm test` - Run tests

## Environment Setup

Create a `.env` file in the `backend/` directory for environment variables:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Notes

- Backend API is available to frontend via `http://backend:5000` (within Docker)
- Hot reload is enabled for both frontend and backend during development
- MongoDB configuration ready in `docker-compose.yml`
