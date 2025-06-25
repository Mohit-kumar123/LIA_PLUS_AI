const mongoose=require('mongoose');

const FeedbackSchema=new mongoose.Schema({
    name:{ type: String, required: true},
    email:{ type: String, required: true},
    feedback:{ type: String, required: true},
    category: {type: String, default: 'General'},
    createdAt: { type: Date, default: Date.now }
});

module.exports=mongoose.model('Feedback', FeedbackSchema);
