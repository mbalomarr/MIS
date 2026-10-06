@echo off
rem Builds a Release package of the PMU MIS Hub into .\publish, ready to upload to Monster ASP.
rem Usage: publish.bat
setlocal

cd /d "%~dp0"

where dotnet >nul 2>&1
if errorlevel 1 (
  echo error: the .NET 8 SDK was not found. Install it from https://dotnet.microsoft.com/download 1>&2
  exit /b 1
)

if not exist appsettings.Production.json (
  echo warning: appsettings.Production.json is missing - the site won't have a database connection. 1>&2
  echo          Copy appsettings.Production.template.json to appsettings.Production.json and fill it in. 1>&2
) else (
  findstr /c:"YOUR_DB_PASSWORD" /c:"CHANGE_ME" appsettings.Production.json >nul && (
    echo warning: appsettings.Production.json still contains placeholder values. 1>&2
  )
)

if exist publish rmdir /s /q publish
dotnet publish PmuMisHub.csproj -c Release -o publish
if errorlevel 1 exit /b 1

echo.
echo Published to: %cd%\publish
echo Upload the CONTENTS of that folder to your Monster ASP site root (wwwroot) via FTP or Web Deploy.
endlocal
