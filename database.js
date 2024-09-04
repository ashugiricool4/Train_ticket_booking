const sqlite3 = require('sqlite3').verbose();

// Use a file-based SQLite database for persistence
const db = new sqlite3.Database('./seats.db');

db.serialize(() => {
    // Create the seats table
    db.run(`
        CREATE TABLE IF NOT EXISTS seats (
            seat_id INTEGER PRIMARY KEY AUTOINCREMENT,
            row_number INTEGER,
            seat_number INTEGER,
            status TEXT
        )
    `);

    // Create the bookings table
    db.run(`
        CREATE TABLE IF NOT EXISTS bookings (
            booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT,
            seats_booked TEXT
        )
    `);

    // Initialize the seats if the table is empty
    db.get("SELECT COUNT(*) as count FROM seats", (err, row) => {
        if (err) {
            console.error('Error counting seats:', err.message);
            return;
        }

        // Check if seats are already initialized
        if (row.count === 0) {
            console.log('Initializing seats in the database...');

            for (let row = 1; row <= 11; row++) {
                let seatsInRow = row === 11 ? 3 : 7;
                for (let seat = 1; seat <= seatsInRow; seat++) {
                    db.run(`INSERT INTO seats (row_number, seat_number, status) VALUES (?, ?, ?)`, [row, seat, 'available']);
                }
            }
        } else {
            console.log('Seats already initialized in the database.');
        }
    });
});

module.exports = db;
