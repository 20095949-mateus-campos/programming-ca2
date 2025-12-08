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

## Part 3: Proof of Concept

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