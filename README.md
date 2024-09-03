# Tran_ticket_booking

Certainly! Here's a sample `README.md` file for your Train Seat Booking project:


# Train Seat Booking System

This project is a Train Seat Booking System built with Node.js, Express, and SQLite. The system allows users to book seats on a train, ensuring that seat bookings prioritize keeping passengers in the same row whenever possible.

## Features

- **Seat Management**: The system manages 80 seats, with 7 seats per row and the last row having 3 seats.
- **Booking Logic**: Users can book up to 7 seats at a time. The system prioritizes keeping seats in the same row and books the nearest available seats if that is not possible.
- **Persistent Data**: The application uses a file-based SQLite database to persist seat data across server restarts.
- **Frontend Interface**: Users can interact with the system via a simple HTML frontend that displays available and booked seats.

## Getting Started

### Prerequisites

Ensure that you have Node.js and npm installed on your machine.

### Installation

1. **Clone the repository**:
   bash
   git clone https://github.com/ashugiricool4/Train_ticket_booking/tree/main
   cd train-seat-booking
   

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application locally**:
   ```bash
   node server.js
   ```
   The application will start on `http://localhost:3000`.

4. **Visit the application**:
   Open your web browser and go to `http://localhost:3000` to interact with the Train Seat Booking system.

### Project Structure

- `server.js`: The main server file that handles routing and API endpoints.
- `database.js`: Manages the SQLite database connection and initialization.
- `index.html`: The frontend interface where users can view and book seats.
- `seats.db`: The SQLite database file that stores the seat and booking information.
- `package.json`: Contains the project metadata and dependencies.

### Deployment

This application is deployed on Vercel. To deploy the application yourself, you can use the following steps:

1. **Deploy to Vercel**:
   - Run the following command in your project directory:
     ```bash
     vercel
     ```
   - Follow the prompts to set up and deploy your project.
  
     https://train-booking-577pfmhxc-ashugiricool4s-projects.vercel.app/
     

2. **Production Deployment**:
   - To deploy to production, use:
     bash
     vercel --prod
     

### Usage

1. **Booking Seats**:
   - Enter the number of seats you want to book (up to 7) in the input field.
   - Click the "Book Seats" button to reserve the seats.
   - The system will book the seats and update the seat display.

2. **Viewing Seat Status**:
   - Green seats are available, and red seats are already booked.

### Troubleshooting

- If the seats are not displaying correctly after deployment, check the Vercel logs for any errors and ensure the database is correctly initialized.

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Contact

If you have any questions or issues, feel free to open an issue on https://abhishekgiri.com/ or contact me at [ashugiricool4@gmail.com].

## Functionality and working is shown through images, kindly check it.


