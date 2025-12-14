#!/bin/bash

# Module Title:         Programming for Information Systems
# Module Code:          B9IS123
# Module Instructor:    Paul Laird
# Assessment Title:     Reactive Web-Based Information System
# Assessment Number:    2
# Assessment Type:      Practical
# Assessment Weighting: 70%
# Assessment Due Date:  Sunday, 14 December 2025, 2:28 PM
# Student Name:         Mateus Fonseca Campos
# Student ID:           20095949
# Student Email:        20095949@mydbs.ie
# GitHub Repo:          https://github.com/20095949-mateus-campos/programming-ca2

# Install Node.js 24.11+
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
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

# Reload system daemons, start Gunicorn service and set it to run on startup, and reload Nginx service
sudo systemctl daemon-reload
sudo systemctl start programming-ca2
sudo systemctl enable programming-ca2
sudo systemctl reload nginx
