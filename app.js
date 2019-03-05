// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config(),
	bodyParser = require("body-parser"),
	createError = require("http-errors"),
	express = require("express"),
	cookieParser = require("cookie-parser"),
	logger = require("morgan"),
	helmet = require("helmet"),
	app = express();

// CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// body-parser
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// routes
app.use(require("./routes"));
// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404, `Cannot ${req.method} ${req.originalUrl}`));
});
// error handler
app.use((err, req, res) => {
	res.status(err.status || 500);
	res.send(err.message);
});

module.exports = app;
