const express = require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const feedbackRoutes=require('./routes/feedback');
require('dotenv').config();

const app=express();
app.use(cors());
app.use(express.json());

const PORT= process.env.PORT || 5000;


// Rate limiting middleware


app.use('/feedback', feedbackRoutes);


mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT,()=>{
        console.log(`server is listeneing on port ${PORT}`);
    });
}).catch((err)=>{
    console.log('Error connecting to MongoDB:', err.message);
    process.exit(1);
})

