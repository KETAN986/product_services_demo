const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { createLogger,transports,format } = require('winston')


const swaggerDefinition = {
    info: {
        title: "template_api",
        version: "1.0.0",
        description: "",
    },
    basePath: "/",
    servers: [
        {
            url: `http://localhost:5000`,
        },
    ],
};
const option = {
    swaggerDefinition,
    apis: ["./server.js", "./controllers/*.js"],
};

const swaggerSpec = swaggerJsDoc(option);

//=========================================================logger=========================================================

const logger = createLogger({
    level:'info',
    transports : [
        new transports.File({
            filename : 'logs/info.log',
            level:'info',
            format : format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename : 'logs/error.log',
            level:'error',
            format : format.combine(format.timestamp(),format.json())
        }),
    ]
})

const swaggerDoc = (app) => {
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};
module.exports = {logger,swaggerDoc}