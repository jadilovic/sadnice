require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
// path needed for heroku
const path = require('path');

// additional security
const rateLimiter = require('express-rate-limit');
const cors = require('cors');

// connect DB
const connectDB = require('./db/connect');

//added for heroku
app.use(express.static(path.join(__dirname, '../frontend/build')));

// routes
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticateUser = require('./middleware/authentication');

// extra packages
app.set('trust proxy', 1);
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // limit each IP to 100 requests per windowMs
	})
);
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, usersRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/orders', ordersRouter);

// added for heroku
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`Server is listening on port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};

start();
