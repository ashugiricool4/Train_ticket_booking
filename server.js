const express = require('express');
const path = require('path');
const db = require('./database');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));


// API routes
app.get('/seats', (req, res) => {
    db.all("SELECT * FROM seats", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/book', (req, res) => {
    const { user_id, seats_requested } = req.body;

    db.all("SELECT * FROM seats WHERE status = 'available' ORDER BY row_number, seat_number", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        if (rows.length < seats_requested) {
            return res.status(400).send('Not enough seats available.');
        }

        const seatsToBook = rows.slice(0, seats_requested);
        const seatIds = seatsToBook.map(seat => seat.seat_id);

        db.run(`UPDATE seats SET status = 'booked' WHERE seat_id IN (${seatIds.join(",")})`, [], function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            db.run(`INSERT INTO bookings (user_id, seats_booked) VALUES (?, ?)`, [user_id, seatIds.join(",")], function(err) {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }

                res.json({ seats_booked: seatIds });
            });
        });
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
