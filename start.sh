#!/bin/bash
gunicorn app.wsgi:application --bind 0.0.0.0:$PORT

chmod +x start.sh