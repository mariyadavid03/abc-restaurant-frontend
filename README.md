# ABC Restaurant Web Application - Frontend
This repository contains the React-based frontend for the ABC Restaurant Web Application. It provides a responsive user interface that interacts with the backend API to deliver restaurant services for three main user types: Customer, Staff, and Admin.

## Features
### Customer Features
- User Login/Signup - Secure login and registration with email OTP verification.
- Profile Management - Customers can view and edit their personal details, including password, name, and contact information.
- Order & Delivery Management - Customers can view and cancel their orders and deliveries.
- Reservations & Orders - Customers can place table reservations and delivery orders.
- Query Submission - Customers can submit inquiries about any issues.
- Confirmation Emails - Reservation, payment, and query response emails are sent to customer emails.
  
### Staff Features
- User Login - Secure login for staff members.
- Respond to Queries - Staff can respond to customer inquiries.
- Gallery Management - Edit, add, and delete menu items in the gallery.
- Manage Reservations & Orders - View and delete reservation and order records.

### Admin Features (Includes all Staff Features)
- Gallery Management - Upload images to display on the gallery page.
- Facilities Management - Upload images and descriptions to display on the facilities page.
- Account Management - Add and update staff and admin accounts.
- Report Generation - Generate reports by selecting a type and date range.
  
## Technologies Used
- React - Core framework for building the user interface.

- Axios - For making HTTP requests to the backend API.
  
- React Bootstrap - For responsive and styled components.
  
- JavaScript - Primary language for component logic and state management.
  
- CSS - Custom styling for UI components.

## Installation
To get started with the frontend locally, follow these steps:

1. Clone the repository - Run, git clone https://github.com/mariyadavid03/abc-restaurant-frontend.git and then cd abc-restaurant-frontend

2. Install dependencies - Make sure you have Node.js installed and run, npm install

3. Start the development server - Run, npm start


The app should now be running at http://localhost:3000.

## Folder Structure
src/components/: Contains reusable React components such as forms, modals, tables, and tabs.
src/pages/: Contains page-level components for the Admin, Public, and Staff UIs.
src/services/: Contains centralized service files such as the session manager.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
