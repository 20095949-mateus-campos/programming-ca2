# Industrial ERP Information System

**Dublin Business School**  
**MSc in Information Systems with Computing**  
**Programming for Information Systems - B9IS123**  
**Year 1, Semester 1**  
**Continuous Assessment 2**

**Lecturer name:** Paul Laird

**Student Name:** Mateus Fonseca Campos  
**Student Number:** 20095949  
**Student Email:** 20095949@mydbs.ie

**Submission date:** 14 December 2025

This repository contains an "Industrial ERP Information System" Flask + React web application developed for my Programming for Information Systems CA 2 at Dublin Business School - MSc in Information Systems with Computing, Year 1, Semester 1.

## Part 1: Background

The goal of this assignment was to implement a basic information system for a real small company. The main aspects of the implementation can be divided into three parts:

1. Backend: to deliver a working set of server-side CRUD (Create, Read, Update and Delete) operations.
2. Frontend: to deliver a working set of client-side API-based operations for data exchange between client and server.
3. Deployment: to deploy the implemented application to a cloud environment.

With the above background in mind, the information system developed for this project is an Enterprise Resource Planning (ERP). An ERP is a modular software that allows organizations to manage the different aspects of the business in an integrated environment. ERP modules often include finance, accounting, human resources (HR), supply chain, and customer relationship management (CRM), manufacturing, and more. ERP modules are, normally, connected to a centralized database, which enhances data integrity and consistency across devices.

While traditional ERPs were deployed on premises, modern solutions are mostly cloud-based and implement the Software-as-a-Service (SaaS) delivery model. Cloud ERPs reduce maintenance costs by removing the need to manage on-premise infrastructure and allow for seamless feature updates, with little to no impact to business operations, by employing rolling release strategies, and Continuous Integration and Continuous Delivery (CI/CD) pipelines.

For this project, the focus was on the manufacturing operations module of a, potentially, larger ERP system.

## Part 2: System Requirements and Design

The following flowchart presents an overview of the core manufacturing operations:

| ![flowchart.png](screenshots/flowchart.png) |
| :-: |
| *Manufacturing operations* |

The following image shows an ER diagram for the previously considered scenario. Cardinality is expressed using Crow’s Foot notation:

| ![erd.png](screenshots/erd.png) |
| :-: |
| *ER diagram* |

Based on the requirements gathered and the assignments instructions, the following implementation plan was devised:

1. Backend:
    - Goal: develop a server-side application to act as a Web API.
    - Language: Python.
    - Framework: Flask.
    - Database: SQLite.
    - ORM: SQLAlchemy.
        - Wrapper: Flask-SQLAlchemy.
    - Migration: Alembic.
        - Wrapper: Flask-Migrate.
    - Remarks: traditionally, a Flask application would be developed following the Model-View-Controller (MVC) architectural pattern, where models are runtime object representations of database entities, views are dynamically rendered HTML responses based on templates, and controllers are intermediary routes that direct client requests to server responses via URL endpoints. However, modern web development has moved away from MVC and towards Web APIs. It is worth noting that, while views have been removed, models and controllers are still in use. Instead of serving HTML files, the controllers serve data in JSON form, as a response to requests made to a specific endpoint.
2. Frontend:
    - Goal: develop a client-side application that updates its components via requests made to the Web API.
    - Language: JavaScript.
    - Library: React.
    - CSS framework: Bulma.
    - Build tool: Vite.
3. Deployment:
    - Goal: deploy the entire application (server side and client side) to a remote web server to make the system cloud based.
    - Provider: Amazon Web Services (AWS).
    - Resource: Elastic Compute Cloud (EC2).
    - WSGI-HTTP Server: Gunicorn.
    - HTTP proxy server: Nginx.
    - Remarks: while the web server has been configured to work on both ports 80 (HTTP) and 443 (HTTPS), HTTPS requests will not be met since no SSL certificates were added (traffic encryption and cybersecurity are outside of the scope of this assignment).

## Part 3: Setup

In order to replicate this project, follow the steps below:

1. Create an AWS account.
2. Start an EC2 instance:
    - choose Ubuntu as the OS.
    - save the SSH key locally.
    - define the security rules as:
        - Port 22 &rarr; SSH &rarr; 0.0.0.0/0.
        - Port 80 &rarr; HTTP &rarr; 0.0.0.0/0.
        - Port 443 &rarr; HTTPS &rarr; 0.0.0.0/0.
3. Connect to the server over SSH.
4. Clone this repository:
```
$ git clone https://github.com/20095949-mateus-campos/programming-ca2.git
```
5. Check that Python 3.10+ is installed:
```
$ python3 --version
```
6. Install Node.js 24.11+
```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash && \
source ~/.bashrc && \
nvm install v24.11.1
```
7. Check that Node.js 24.11+ was installed:
```
$ node --version
```
8. Change into the project's root directory, start it and build it:
```
$ cd programming-ca2 && \
npm install && \
npm build
```
9. Change into the api subdirectory, create a virtual environment and activate it:
```
$ python3 -m venv .venv && \
source .venv/bin/activate
```
10. Install all the project's dependencies:
```
$ pip install -r requirements.txt
```
11. Initiate, migrate and upgrade the SQLite database:
```
$ flask db init && \
flask db migrate && \
flask db upgrade
```
12. Leave the virtual environment and change back to the project's root directory:
```
$ deactivate && \
cd ..
```
13. Install Nginx:
```
$ sudo apt-get install nginx
```
14. Set the Nginx configuration files:
```
$ sudo rm /etc/nginx/sites-enabled/default && \
sudo cp server/programming-ca2.nginx /etc/nginx/sites-available/programming-ca2.nginx && \
sudo ln -s /etc/nginx/sites-available/programming-ca2.nginx /etc/nginx/sites-enabled/programming-ca2.nginx && \
sudo sed -i 's/www-data/ubuntu/' /etc/nginx/nginx.conf
```
15. Set the Gunicorn service:
```
$ sudo cp server/programming-ca2.service /etc/systemd/system/programming-ca2.service
```
16. Reload system daemons, start Gunicorn service and reload Nginx service:
```
$ sudo systemctl daemon-reload && \
sudo systemctl start programming-ca2 && \
sudo systemctl reload nginx
```
At this stage, it should be possible to open the application at http://\<replace-with-aws-ec2-ipv4-address\> on a web browser. Note that since no SSL certificates were added to the server, the application cannot be reached over HTTPS. Manually changing the URL to HTTP may be required if the browser defaults to HTTPS (most do).

## Part 4: Proof of Concept

Following the plan established in the previous section, a prototype was developed for the manufacturing module of the ERP system under consideration.

The below is a breakdown of the project’s file structure:

```
root
├── api
│   ├── app
│   │   ├── app.db
│   │   ├── app.py
│   │   ├── config.py
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── routes.py
│   │   └── tests
│   │       ├── conftest.py
│   │       ├── crud_test.py
│   │       └── __init__.py
│   ├── htmlcov
│   ├── migrations
│   └── requirements.txt
├── index.html
├── package.json
├── README.md
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── components
│   │   ├── Create.jsx
│   │   ├── Dropdown.jsx
│   │   ├── Field.jsx
│   │   ├── Home.jsx
│   │   ├── Navbar.jsx
│   │   └── Read.jsx
│   └── main.jsx
└── vite.config.js
```
The following are some screenshots of the application in use showcasing CRUD operations for the Product entity (other entities are analogous):

| ![home.png](screenshots/home.png) | ![read_all.png](screenshots/read_all.png) |
| :-: | :-: |
| *Home view* | *Read products* |  

| ![create.png](screenshots/create.png) | ![read.png](screenshots/read.png) |
| :-: | :-: |
| *Create product* | *Read product* |  

| ![update.png](screenshots/update.png) | ![delete.png](screenshots/delete.png) |
| :-: | :-: |
| *Update product* | *Delete products* |  

## Part 4: Testing

Pytest was used to test CRUD operations. The Image below shows the coverage percentage as per the Coverage Python library:

| ![coverage.png](screenshots/coverage.png) |
| :-: |
| *Test coverage* |

Full report can be accessed [here](http://htmlpreview.github.io/?https://github.com/20095949-mateus-campos/programming-ca2/blob/main/api/htmlcov/index.html).

## Part 5: Technology Stack and External Resources

## Part 6: References

## Part 7: Copyright Disclaimer

This project may feature content that is copyright protected. Please, keep in mind that this is a student's project and has no commercial purpose whatsoever. Having said that, if you are the owner of any content featured here and would like for it to be removed, please, contact me and I will do so promptly.

Thank you very much,  
Mateus Campos.