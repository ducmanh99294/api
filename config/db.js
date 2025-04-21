const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL || 'mongodb+srv://nguyenducmanh1809:manh1234@cluster0.1ya4y.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        })
    } catch (error) {
        console.error(`Loi khi connect DB: ${error.message}`);
        process.exit(1);
    }
}
module.exports = connectDB