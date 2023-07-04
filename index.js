require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const { config } = require('./database/sql');

const UserRoutes = require('./routes/UserRoutes');

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use(UserRoutes);

sql.connect(config).then(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
});
