#!/bin/bash
gunicorn app:app --bind 0.0.0.0:5000
chmod +x start.sh