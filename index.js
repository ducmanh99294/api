require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const productRouter = require('./routes/productRouter')
const userRouter = require('./routes/userRouter')
const blogRouter = require('./routes/blogRouter')


const app = express();
app.use(bodyParser.json({
    limit: '10mb'
}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

connectDB();

//API products
app.use('/api/v1/', productRouter)

//API users
app.use('/api/v2/', userRouter)

app.use('/api/v3/', blogRouter)

app.get('/', (req, res) => {
    res.send('Backend đang chạy trên Render!');
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });