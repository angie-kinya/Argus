#!/bin/bash

# Update package list and ensure Python & pip are installed
echo "Updating package list..."
apt-get update -y || yum update -y

# Install Gunicorn if not already installed
if ! command -v gunicorn &> /dev/null
then
    echo "Gunicorn not found. Installing..."
    pip install --no-cache-dir gunicorn
else
    echo "Gunicorn is already installed."
fi

# Run the application with Gunicorn
gunicorn app:app --bind 0.0.0.0:8000

chmod +x start.sh