const { client } = require("../config/db")

const addTestimonial = async (req, res) => {
    try {
        const { user_id, user_name, user_email, message, rating } = req.body;
        
        const result = await client.query(
            `INSERT INTO testimonials (user_id, user_name, user_email, message, rating)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [user_id, user_name, user_email, message, rating]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding testimonial:', error);
        res.status(500).json({ message: 'Error adding testimonial' });
    }
};

const getAllTestimonials = async (req, res) => {
    try {
        const result = await client.query(
            `SELECT t.*, u.email 
             FROM testimonials t
             JOIN users u ON t.user_id = u.id
             ORDER BY t.created_at DESC`
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ message: 'Error fetching testimonials' });
    }
};

const getUserTestimonials = async (req, res) => {
    try {
        const { user_id } = req.params;
        const result = await client.query(
            `SELECT * FROM testimonials WHERE user_id = $1`,
            [user_id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching user testimonials:', error);
        res.status(500).json({ message: 'Error fetching user testimonials' });
    }
};

module.exports = {
    addTestimonial,
    getAllTestimonials,
    getUserTestimonials
};