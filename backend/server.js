const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const cors = require('cors');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/users');

const borrowingRouter = require("./routes/borrowing")
connectDB();

app.use(express.json());
app.use(
    cors({
      origin: 'http://localhost:3000', // Replace with your frontend domain
      methods: 'GET,POST,PUT,DELETE',
      allowedHeaders: 'Content-Type,Authorization',
    })
  );


  app.use('/borrowing',borrowingRouter);
  app.use('/',borrowingRouter);
  app.use('/',borrowingRouter);
  app.use('/borrowing/history',borrowingRouter);
  app.use('/users', userRouter); // Use the user route
  app.use('/users', userRouter); // Use the user route
  
app.use('/signup', signupRouter);


// Middleware
app.use('/login', loginRouter);

// Routes
app.use('/api/books', require('./routes/books'));
app.use('/api/books',require('./routes/books'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

