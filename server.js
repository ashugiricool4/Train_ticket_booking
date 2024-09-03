const express = require('express');
const db = require('./database');
const path = require('path');

const app = express();
app.use(express.json());

// Serve static files (like index.html)
app.use(express.static(path.join(__dirname)));

// API endpoint to get seats
app.get('/seats', (req, res) => {
    db.all("SELECT * FROM seats", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// API endpoint to book seats
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
        
        let seatsToBook = [];
        let currentRow = [];

        for (let seat of rows) {
            if (currentRow.length < seats_requested && seat.row_number === currentRow[0]?.row_number) {
                currentRow.push(seat);
            } else if (currentRow.length === seats_requested) {
                seatsToBook = currentRow;
                break;
            } else {
                currentRow = [seat];
            }
        }
        
        if (seatsToBook.length === 0) {
            seatsToBook = rows.slice(0, seats_requested);
        }

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
