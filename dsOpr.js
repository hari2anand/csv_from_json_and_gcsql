const mysql = require('promise-mysql');

module.exports = dsFetcher;

function dsFetcher(personData, key) {
    let tableName, query;
    switch (key) {
        case "ORG_LEVEL1":
            tableName = "ORG_LEVEL_MAP";
            key = "org_level1_bu";
            query = personData['businessUnit'] != "null" && typeof personData['businessUnit'] != "undefined" && personData['businessUnit'] != 'NA' ?
                `SELECT ${key}
                 FROM ${tableName}
                 WHERE businessunittype = "${personData['businessUnitType']}"
                   AND businessunitcode = "${personData['businessUnit']}"` :

                `SELECT ${key}
                 FROM ${tableName}
                 WHERE businessunittype = "${personData['businessUnitType']}" `;
            break;
        case "ORG_LEVEL2":
            if (typeof personData['businessUnit'] != "undefined" && personData['businessUnit'] != 'NA') {
                tableName = "ORG_LEVEL_MAP";
                key = "*";
                query = personData['businessUnit'] != "null" && typeof personData['businessUnit'] != "undefined" && personData['businessUnit'] != 'NA' ?
                    `SELECT ${key}
                     FROM ${tableName}
                     WHERE businessunittype = "${personData['businessUnitType']}"
                       AND businessunitcode = "${personData['businessUnit']}"` :

                    `SELECT ${key}
                     FROM ${tableName}
                     WHERE businessunittype = "${personData['businessUnitType']}" `;
            }
            else {
                tableName = "ORG_LEVEL_CC_MAP";
                key = "org_level1_cc";
                query = `SELECT ${key}
                         FROM ${tableName} `
            }
            break;
        case "ORG_LEVEL3":
            tableName = "ORG_LEVEL_CC_MAP";
            key = "org_level1_cc";
            query = `SELECT ${key}
                     FROM ${tableName} `
            break;
    }

    const config = {
        connectionLimit: 5,
        connectTimeout: 10000, // 10 seconds
        acquireTimeout: 10000, // 10 seconds
        waitForConnections: true, // Default: true
        queueLimit: 0, // Default: 0
    };

    // Extract host and port from socket address
    let dbSocketAddr = (process.env.DB_HOST).split(':');

    // Establish a connection to the database
    return new Promise(resolve => {
        mysql.createConnection({
            user: process.env.DB_USER, // e.g. 'my-db-user'
            password: process.env.DB_PASS, // e.g. 'my-db-password'
            database: process.env.DB_NAME, // e.g. 'my-database'
            host: dbSocketAddr[0], // e.g. '127.0.0.1'
            port: dbSocketAddr[1] || '3306', // e.g.
            ...config,
        }).then(async pool => {
            const dsOut = await pool.query(query);
            pool.destroy()
            resolve(typeof dsOut === "object" && dsOut.length > 0 && typeof dsOut[0] === "object" && dsOut[0].hasOwnProperty(key)
                ? dsOut[0][key] || 'others' : 'others')
        })
    })

}
