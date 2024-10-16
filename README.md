# Family & Friends Contacts App

## A simple web application to manage your contacts (family and friends) using the PERN stack (PostgreSQL, Express, React, and Node.js).

## Features
- Add, update, delete, and view contacts.
- Search contacts by name or phone number.
- Backend API powered by Node.js and Express.
- Frontend built with React.
- Database management with PostgreSQL.

## Tech Stack (PERN)
- PostgreSQL: Database to store and manage contact information.
- Express: Web framework for building the backend REST API.
- React: Frontend library for building the user interface.
- Node.js: Backend runtime environment.

## Project Structure
Frontend: React application located in the /frontend folder.
Backend: Express server located in the /backend folder.
Database: PostgreSQL database for storing contacts.


## Installation
### Clone the repository:
```
git clone https://github.com/ChasVanDav/11-Contacts-App.git
cd 11-Contacts-App
```
### Set up the backend:
Navigate to the backend directory:
```
cd backend
```
### Install dependencies:
```
npm install
```
### Configure the database connection in db/pool.js with your PostgreSQL credentials.

### Start the backend server:
```
npm start
```

## Set up the frontend:

### Navigate to the frontend directory:
```
cd ../frontend
```
### Install dependencies:
```
npm install
```
### Start the React development server:
```
npm run dev
```
### Access the app:
The frontend should be running on http://localhost:3000.
The backend should be running on http://localhost:5000.

### API Endpoints
GET /contacts - Fetch all contacts.
POST /contacts - Add a new contact.
PUT /contacts/
- Update a contact.
DELETE /contacts/
- Delete a contact.

## Contributing
Feel free to fork the project and submit pull requests!

