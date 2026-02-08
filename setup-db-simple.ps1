# Simple PostgreSQL Database Setup Script
# Uses environment variable for password

$env:PGPASSWORD = "Ket@2005al"
$PSQL = "D:\Program Files\PostgreSQL\18\bin\psql.exe"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AutoPart-Connect Database Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 1: Creating database..." -ForegroundColor Yellow
& $PSQL -U postgres -c "CREATE DATABASE autopart_connect;" 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0 -or $LASTEXITCODE -eq 1) {
    Write-Host "✓ Database ready!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 2: Applying schema..." -ForegroundColor Yellow
& $PSQL -U postgres -d autopart_connect -f "schema.sql"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Schema applied!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 3: Verifying tables..." -ForegroundColor Yellow
& $PSQL -U postgres -d autopart_connect -c "\dt"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✓ Database setup complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Clear password from environment
$env:PGPASSWORD = $null
