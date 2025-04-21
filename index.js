const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const productRouter = require('./routes/productRouter')
const userRouter = require('./routes/userRouter')
const blogRouter = require('./routes/blogRouter')
const mongoose = require('mongoose');

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

// const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://nguyenducmanh1809:manh1234@cluster0.1ya4y.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0';
// mongoose.connect(mongoURI)
//     .then(() => console.log("✅ Kết nối MongoDB thành công"))
//     .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`server chay o cong https://localhost:${PORT} `);

})