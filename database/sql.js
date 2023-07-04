const sql = require("mssql");
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    trustServerCertificate: true,
};

function query(query, params) {
    const request = new sql.Request();
    params.forEach(param => request.input(param.name, param.type, param.value));
    return request.query(query).then((err, res) => {
        if (err) {
            console.error(err);
        }
        return res;
    })
}

module.exports = { config, query };
