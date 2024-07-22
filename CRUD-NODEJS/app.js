const express = require('express');
const app = express();
const conn = require('./config/db');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// GET all mahasiswa
app.get('/mahasiswa', (req, res) => {
    const query = 'SELECT * FROM mahasiswa WHERE deleted_at IS NULL';
    conn.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        res.status(200).json({ success: true, data: results });
    });
});

// POST create new mahasiswa
app.post('/mahasiswa', (req, res) => {
    const { nama, jurusan } = req.body;
    const query = 'INSERT INTO mahasiswa (nama, jurusan) VALUES (?, ?)';
    conn.query(query, [nama, jurusan], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        res.status(200).json({ success: true, message: 'Data mahasiswa berhasil ditambahkan', data: results });
    });
});

// PUT update mahasiswa
app.put('/mahasiswa/:id', (req, res) => {
    const { id } = req.params;
    const { nama, jurusan } = req.body;
    const query = 'UPDATE mahasiswa SET nama = ?, jurusan = ? WHERE id = ? AND deleted_at IS NULL';
    conn.query(query, [nama, jurusan, id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        if (results.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Data mahasiswa berhasil diupdate', data: results });
        } else {
            res.status(404).json({ success: false, message: 'Data mahasiswa tidak ditemukan atau tidak ada perubahan', data: null });
        }
    });
});

// DELETE mahasiswa
app.delete('/mahasiswa/:id', (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE mahasiswa SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?';
    conn.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        if (results.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Data mahasiswa berhasil dihapus', data: results });
        } else {
            res.status(404).json({ success: false, message: 'Data mahasiswa tidak ditemukan atau sudah terhapus', data: null });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
