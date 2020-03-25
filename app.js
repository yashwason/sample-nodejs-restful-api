require(`dotenv`).config({ path: './process.env' });

const express = require(`express`),
    app = express(),
    bodyParser = require(`body-parser`),
    morgan = require(`morgan`),
    helmet = require(`helmet`);


// DB setup
require(`./api/config/mongoose`);


// setting headers
app.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(
      `Access-Control-Allow-Headers`,
      `Origin, X-Requested-With, Content-Type, Accept, Authorization`
    );

    if(req.method === `OPTIONS`){
      res.header(`Access-Control-Allow-Methods`, `PUT, POST, PATCH, DELETE, GET`);
      return res.status(200).json({});
    }

    next();
});
app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard({ action: `sameorigin` }));
app.use(helmet.ieNoOpen());
app.use(helmet.hidePoweredBy({ setTo: 'PHP/7.1.31' })); // showing false value
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy({ policy: `no-referrer-when-downgrade` }));
app.use(helmet.xssFilter());


// app config
if(process.env.MODE.toLowerCase() === `dev`){
    app.use(morgan(`dev`));
}
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '350mb'
}));
app.use(bodyParser.json({
    extended: true,
    limit: '350mb'
}));
app.use(`/uploads`, express.static(`uploads`));


// all route handlers
const routes = require(`./api/routes/_all`);
app.use(routes);


// handling 404 errors
app.use((req, res, next) => {
    const err = new Error(`Resource not found`);
    err.status = 404;
    next(err)
});


// handling all other errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);

    const errorResponseObject = { error: {} };
    errorResponseObject.error.message = err.message || `Something went wrong!`;
    if(process.env.MODE.toLowerCase() === `dev`){
        errorResponseObject.error.stack = err.stack
        console.log(err);
    }

    res.json(errorResponseObject);
});


// launching app on localhost
app.listen(process.env.PORT, (e) => {
    console.log(`Server listening on ${process.env.PORT}`);
});