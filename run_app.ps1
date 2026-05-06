# Start Backend
Write-Host "🚀 Starting DealRadar Backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; .\venv\Scripts\python.exe main.py"

# Start Frontend
Write-Host "🎨 Starting DealRadar Frontend..." -ForegroundColor Magenta
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "`n✅ Both servers are launching in separate windows." -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173"
Write-Host "Backend API Docs: http://localhost:8000/docs"
