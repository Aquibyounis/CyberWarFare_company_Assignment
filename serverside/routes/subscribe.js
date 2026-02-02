const express = require('express');
const auth = require('../middleware/auth');
const Course = require('../models/Course');
const Subscription = require('../models/Subscription');

const router = express.Router();

const VALID_PROMO_CODE = 'BFSALE25';
const PROMO_DISCOUNT = 0.5;

// POST /subscribe
router.post('/subscribe', auth, async (req, res) => {
    try {
        const { courseId, promoCode } = req.body;
        const userId = req.user.userId;

        if (!courseId) {
            return res.status(400).json({ message: 'Course ID is required' });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const existingSubscription = await Subscription.findOne({ userId, courseId });
        if (existingSubscription) {
            return res.status(400).json({ message: 'You are already subscribed to this course' });
        }

        let pricePaid = 0;

        if (course.price === 0) {
            pricePaid = 0;
        } else {
            if (!promoCode) {
                return res.status(400).json({
                    message: 'Promo code is required for paid courses',
                    requiresPromo: true
                });
            }

            if (promoCode.toUpperCase() !== VALID_PROMO_CODE) {
                return res.status(400).json({
                    message: 'Invalid promo code',
                    requiresPromo: true
                });
            }

            pricePaid = course.price * PROMO_DISCOUNT;
        }

        const subscription = new Subscription({
            userId,
            courseId,
            pricePaid,
            subscribedAt: new Date()
        });

        await subscription.save();

        res.status(201).json({
            message: 'Successfully subscribed to the course!',
            subscription: {
                id: subscription._id,
                courseId: subscription.courseId,
                pricePaid: subscription.pricePaid,
                subscribedAt: subscription.subscribedAt
            }
        });
    } catch (error) {
        console.error('Subscribe error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'You are already subscribed to this course' });
        }
        res.status(500).json({ message: 'Server error during subscription' });
    }
});

// POST /validate-promo
router.post('/validate-promo', auth, async (req, res) => {
    try {
        const { promoCode, courseId } = req.body;

        if (!promoCode) {
            return res.status(400).json({ valid: false, message: 'Promo code is required' });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ valid: false, message: 'Course not found' });
        }

        if (promoCode.toUpperCase() === VALID_PROMO_CODE) {
            const originalPrice = course.price;
            const discountedPrice = originalPrice * PROMO_DISCOUNT;

            res.json({
                valid: true,
                message: 'Promo code applied! 50% discount',
                originalPrice,
                discountedPrice,
                discount: originalPrice - discountedPrice,
                discountPercentage: 50
            });
        } else {
            res.status(400).json({ valid: false, message: 'Invalid promo code' });
        }
    } catch (error) {
        console.error('Validate promo error:', error);
        res.status(500).json({ valid: false, message: 'Server error validating promo' });
    }
});

// GET /my-courses
router.get('/my-courses', auth, async (req, res) => {
    try {
        const userId = req.user.userId;

        const subscriptions = await Subscription.find({ userId })
            .populate('courseId')
            .sort({ subscribedAt: -1 });

        const courses = subscriptions.map(sub => ({
            subscriptionId: sub._id,
            course: sub.courseId,
            pricePaid: sub.pricePaid,
            subscribedAt: sub.subscribedAt
        }));

        res.json(courses);
    } catch (error) {
        console.error('Error fetching my courses:', error);
        res.status(500).json({ message: 'Server error fetching your courses' });
    }
});

module.exports = router;
