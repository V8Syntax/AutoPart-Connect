# Database Setup Guide

Follow these steps to set up your PostgreSQL database for AutoPart-Connect.

## Prerequisites

- PostgreSQL installed on your system
- PostgreSQL service running

## Step 1: Update .env File

The `.env` file has been created with default values. **Update the password:**

```env
DB_PASSWORD=your_actual_postgres_password
```

## Step 2: Create the Database

Open a terminal and run:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE autopart_connect;

# Exit psql
\q
```

**Alternative (Windows PowerShell):**
```powershell
# If psql is in your PATH
psql -U postgres -c "CREATE DATABASE autopart_connect;"
```

## Step 3: Run the Schema

From the project root directory, run:

```bash
psql -U postgres -d autopart_connect -f schema.sql
```

This will create all tables:
- `users`
- `parts`
- `vehicles`
- `compatibility`

And insert sample data for testing.

## Step 4: Verify the Setup

1. **Check tables were created:**
   ```bash
   psql -U postgres -d autopart_connect -c "\dt"
   ```

2. **Check sample data:**
   ```bash
   psql -U postgres -d autopart_connect -c "SELECT * FROM parts;"
   ```

## Step 5: Test the Backend Connection

Start the server:
```bash
npm start
```

Test the health endpoint:
```bash
curl http://localhost:3000/api/health
```

You should see:
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2026-02-06T03:37:01.000Z"
}
```

## Troubleshooting

### Connection Refused
- Ensure PostgreSQL service is running
- Check if port 5432 is correct in `.env`

### Authentication Failed
- Verify `DB_PASSWORD` in `.env` matches your PostgreSQL password
- Check `DB_USER` is correct (default is `postgres`)

### Database Does Not Exist
- Make sure you created the database in Step 2
- Check `DB_NAME` in `.env` matches the database name

### Permission Denied
- Ensure your PostgreSQL user has permissions to create databases and tables

## Next Steps

Once the database is set up and the backend is running:

1. Start the frontend:
   ```bash
   cd client
   npm run dev
   ```

2. Open `http://localhost:5173` in your browser

3. The app will fetch parts from your database!
