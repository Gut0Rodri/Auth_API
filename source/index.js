require('dotenv').config();
const express = require('express');
const cors = require('cors')
const routes = require('./routes/routes');
const PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.get('/test_api', (req, res) => {
    res.send(`Server running | PORT: ${PORT}`)
})

app.listen(PORT, () => {
    console.log(`Server running | PORT: ${PORT}`);
})