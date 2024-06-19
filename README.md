# GuardianBank
# Guardian Bank - Secure Banking System (SBS)

## Introduction
The Guardian Bank Secure Banking System (SBS) is a software system developed to facilitate secure banking transactions and user account management through the Internet. Designed to cater to both internal and external users, SBS aims to provide a comprehensive solution for banking organizations to track and manage operations securely.

## Features
- **User Account Management**: Differentiated access and privileges for internal and external users.
- **Secure Banking Transactions**: Including debit, credit, fund transfers, and payments with robust security measures.
- **Public Key Infrastructure (PKI)**: Enhancing security with PKI for critical functions.
- **One Time Password (OTP)**: Employing OTPs for validating sensitive transactions.
- **Concurrent User Support**: Allows multiple users to use the system simultaneously with secure transaction logging for external audits.

## Technologies
- **Frontend**: React
- **Backend**: Node.Js
- **Database**: MongoDB

## Prerequisites
- Node.js and npm (for React frontend)
- Python 3.x (for Flask backend)
- SQL Database (Microsoft SQL Server, Oracle XE, or MySQL)
- Web server (IIS or Apache)

## Setup Instructions

### Database Setup
1. You can use phpmyadmin to access the database with below credentials.
2. The database schema has been created as per the SBS requirements.

- Host: sql5.freesqldatabase.com
- Database name: sql5686429
- Database user: sql5686429
- Database password: IMmcvyA1es
- Port number: 3306

### Backend Setup
1. Ensure Python 3.x is installed.
2. Navigate to the backend directory and install dependencies:
pip install -r requirements.txt
3. Start the Flask server:
flask run

### Frontend Setup
1. Ensure Node.js and npm are installed.
2. Navigate to the uniradar directory and install dependencies:
npm i
3. Start the React development server:
npm start

## Usage
- Access the Guardian Bank SBS via the web browser at `http://localhost:3000` (default React development server address).
- Log in as an internal or external user to perform operations as per your role and privileges.

## Security Features


## Contributions


## License


## Acknowledgements
- CSCI 547 | INFO 533 Systems and Protocol Security and Information Assurance course team for project guidelines.
- All contributors who participate in the development of the SBS.
