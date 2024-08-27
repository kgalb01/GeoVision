const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static('node_modules')); 


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get("/lidar", (req, res) => { res.sendFile(__dirname + "/public/lidar.html"); });
app.get('/hack', (req, res) => {res.sendFile(__dirname, "public/hack.html")})



app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
