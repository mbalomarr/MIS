#!/usr/bin/env bash
# Builds a Release package of the PMU MIS Hub into ./publish, ready to upload to Monster ASP.
# Usage: ./publish.sh
set -euo pipefail

cd "$(dirname "$0")"

# Use the user-local SDK (~/.dotnet) when dotnet isn't on PATH.
if ! command -v dotnet >/dev/null 2>&1 && [ -x "$HOME/.dotnet/dotnet" ]; then
  export DOTNET_ROOT="$HOME/.dotnet"
  export PATH="$HOME/.dotnet:$PATH"
fi
if ! command -v dotnet >/dev/null 2>&1; then
  echo "error: the .NET 8 SDK was not found. Install it from https://dotnet.microsoft.com/download" >&2
  exit 1
fi

if [ ! -f appsettings.Production.json ]; then
  echo "warning: appsettings.Production.json is missing — the site won't have a database connection." >&2
  echo "         Copy appsettings.Production.template.json to appsettings.Production.json and fill it in." >&2
elif grep -q "YOUR_DB_PASSWORD\|CHANGE_ME" appsettings.Production.json; then
  echo "warning: appsettings.Production.json still contains placeholder values." >&2
fi

rm -rf publish
dotnet publish PmuMisHub.csproj -c Release -o publish

echo
echo "Published to: $(pwd)/publish"
echo "Upload the CONTENTS of that folder to your Monster ASP site root (wwwroot) via FTP or Web Deploy."
