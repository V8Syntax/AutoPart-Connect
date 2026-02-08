# AutoPart-Connect Backend

A Node.js/Express backend API for managing auto parts inventory and vehicle compatibility.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your PostgreSQL credentials
   ```

3. **Create the database:**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE autopart_connect;
   
   # Exit psql
   \q
   ```

4. **Run the schema:**
   ```bash
   psql -U postgres -d autopart_connect -f schema.sql
   ```

5. **Start the server:**
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Returns server and database status.

**Response:**
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2026-02-05T10:24:13.000Z"
}
```

### Get All Parts
```
GET /api/parts
```
Retrieve all parts from the inventory.

### Filter Parts by Vehicle
```
GET /api/parts?year=2020&model=Camry&make=Toyota
```

**Query Parameters:**
- `year` - Vehicle year (e.g., 2020)
- `model` - Vehicle model (e.g., Camry)
- `make` - Vehicle make (e.g., Toyota) [optional]
- `brand` - Part brand filter (e.g., Brembo) [optional]

**Response:**
```json
{
  "success": true,
  "count": 1,
  "filters": {
    "year": "2020",
    "model": "Camry",
    "make": "Toyota"
  },
  "data": [
    {
      "id": "uuid",
      "name": "Brake Pads",
      "brand": "Brembo",
      "price": "89.99",
      "part_number": "BP-001",
      "year": 2020,
      "make": "Toyota",
      "model": "Camry",
      "trim": "LE",
      "verified": true
    }
  ]
}
```

### Get Part by ID
```
GET /api/parts/:id
```

Returns a specific part with all compatible vehicles.

### Get All Vehicles
```
GET /api/vehicles
```

Returns all vehicles in the database.

## 🗄️ Database Schema

The database follows **3rd Normal Form (3NF)** with four main tables:

- **users** - User accounts
- **parts** - Auto parts inventory
- **vehicles** - Vehicle information
- **compatibility** - Junction table linking parts to vehicles

See `schema.sql` for the complete schema definition.

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Database
- **pg** - PostgreSQL client
- **dotenv** - Environment configuration
- **cors** - Cross-origin resource sharing

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=autopart_connect
DB_USER=postgres
DB_PASSWORD=your_password_here
```

## 🧪 Testing the API

Using curl:
```bash
# Health check
curl http://localhost:3000/api/health

# Get all parts
curl http://localhost:3000/api/parts

# Filter by vehicle
curl "http://localhost:3000/api/parts?year=2020&model=Camry"
```

Using a browser:
- Navigate to `http://localhost:3000/api/parts`
- Try filtering: `http://localhost:3000/api/parts?year=2020&model=Camry`