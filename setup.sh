#!/bin/bash

# Install Node.js 24.11+
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
nvm install v24.11.1

# Start and build frontend
npm install
npm run build

# Change into the api subdirectory, create a virtual environment and activate it
cd api
sudo apt-get update
sudo apt-get install python3.12-venv -y
python3 -m venv .venv
source .venv/bin/activate

# Install all the project's dependencies
pip install -r requirements.txt

# Initiate, migrate and upgrade the SQLite database
flask db init
flask db migrate
flask db upgrade

# Leave the virtual environment and change back to the project's root directory
deactivate
cd ..

# Install Nginx
sudo apt-get install nginx -y

# Set the Nginx configuration files
sudo rm /etc/nginx/sites-enabled/default
sudo cp server/programming-ca2.nginx /etc/nginx/sites-available/programming-ca2.nginx
sudo ln -s /etc/nginx/sites-available/programming-ca2.nginx /etc/nginx/sites-enabled/programming-ca2.nginx
sudo sed -i 's/www-data/ubuntu/' /etc/nginx/nginx.conf

# Set the Gunicorn service
sudo cp server/programming-ca2.service /etc/systemd/system/programming-ca2.service

# Reload system daemons, start Gunicorn service and reload Nginx service
sudo systemctl daemon-reload
sudo systemctl start programming-ca2
sudo systemctl reload nginx
