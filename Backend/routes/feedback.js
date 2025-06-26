const express=require('express');
const router=express.Router();

const Feedback=require('../models/Feedback');

//post feedback
router.post('/',async(req,res)=>{
    const { name, email, feedback, category } = req.body;

    if (!name || !email || !feedback) {
        return res.status(400).json({ message: 'Name, email, and feedback are required.' });
    }

    try {
        const newFeedback = new Feedback({
            name,
            email,
            feedback,
            category: category || 'General'
        });

        await newFeedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully.' });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


//feedback with filter, sorting, and pagination
router.get('/', async (req, res) => {
    try {
        const { category, email, sortBy = 'createdAt', order = 'desc', page = 1, limit = 10 } = req.query;
        let filter = {};
        if (category) filter.category = category;
        if (email) filter.email = email;

        const sortOrder = order === 'asc' ? 1 : -1;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const feedback = await Feedback.find(filter)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Feedback.countDocuments(filter);

        res.status(200).json({
            data: feedback,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//endpoint to get feedback counts by category.
router.get('/stats', async (req, res) => {
    try {
        const stats = await Feedback.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);
        res.status(200).json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports=router;
