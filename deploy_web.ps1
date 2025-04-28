# Frontend Deployment Script
# Automatically compile Next.js frontend and deploy to .NET wwwroot directory

# 1. Enter frontend directory
Set-Location -Path "front_end"

# 2. Check and install dependencies
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..."
    npm install
}

# 3. Build frontend
Write-Host "Building frontend..."
npm run build

# 4. Clean wwwroot directory
Write-Host "Cleaning wwwroot directory..."
Remove-Item -Path "../back_end/wwwroot/*" -Recurse -Force

# 5. Copy build results
Write-Host "Copying static files to wwwroot..."
Copy-Item -Path "out/*" -Destination "../back_end/wwwroot/" -Recurse -Force

Write-Host "Frontend deployment completed!"
Write-Host "Please run backend: cd back_end/api && dotnet run"

Set-Location -Path ".."