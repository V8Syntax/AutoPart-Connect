# PostgreSQL Database Setup Script for AutoPart-Connect
# This script creates the database and runs the schema

$PSQL_PATH = "D:\Program Files\PostgreSQL\18\bin\psql.exe"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AutoPart-Connect Database Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if psql exists
if (-not (Test-Path $PSQL_PATH)) {
    Write-Host "ERROR: PostgreSQL not found at $PSQL_PATH" -ForegroundColor Red
    Write-Host "Please update the PSQL_PATH variable in this script." -ForegroundColor Yellow
    exit 1
}

Write-Host "Step 1: Creating database 'autopart_connect'..." -ForegroundColor Yellow
& $PSQL_PATH -U postgres -c "CREATE DATABASE autopart_connect;"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database created successfully!" -ForegroundColor Green
} else {
    Write-Host "Note: Database may already exist (this is OK)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Step 2: Running schema.sql to create tables..." -ForegroundColor Yellow
& $PSQL_PATH -U postgres -d autopart_connect -f "schema.sql"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Schema applied successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Error applying schema" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 3: Verifying tables..." -ForegroundColor Yellow
& $PSQL_PATH -U postgres -d autopart_connect -c "\dt"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Database setup complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Run 'npm start' to start the backend server" -ForegroundColor White
Write-Host "2. Run 'cd client && npm run dev' to start the frontend" -ForegroundColor White
Write-Host "3. Open http://localhost:5173 in your browser" -ForegroundColor White
