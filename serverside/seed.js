const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Course = require('./models/Course');

const dummyUsers = [
    { name: 'Test User 1', email: 'user1@test.com', password: 'Test@123' },
    { name: 'Test User 2', email: 'user2@test.com', password: 'Test@123' }
];

const dummyCourses = [
    {
        title: 'JavaScript Fundamentals',
        description: 'Master the basics of JavaScript programming. Learn variables, functions, loops, and more. Perfect for beginners who want to start their web development journey.',
        price: 0,
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400'
    },
    {
        title: 'React.js Complete Guide',
        description: 'Build modern web applications with React. Learn components, hooks, state management, and best practices. Includes real-world projects.',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400'
    },
    {
        title: 'Node.js Backend Development',
        description: 'Create powerful server-side applications with Node.js and Express. Learn REST APIs, authentication, database integration, and deployment.',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400'
    },
    {
        title: 'HTML & CSS Basics',
        description: 'Learn the building blocks of web development. Create beautiful, responsive websites from scratch. No prior experience required.',
        price: 0,
        image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400'
    },
    {
        title: 'MongoDB Database Mastery',
        description: 'Deep dive into MongoDB NoSQL database. Learn schema design, queries, aggregation, indexing, and performance optimization.',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400'
    },
    {
        title: 'Git & GitHub Essentials',
        description: 'Version control made easy. Learn Git commands, branching strategies, pull requests, and collaborative development workflows.',
        price: 0,
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400'
    },
    {
        title: 'Full Stack Web Development Bootcamp',
        description: 'Comprehensive course covering frontend and backend development. Build complete web applications from scratch. Career-ready skills.',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400'
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await User.deleteMany({});
        await Course.deleteMany({});
        console.log('Cleared existing users and courses');

        const createdUsers = await User.create(dummyUsers);
        console.log(`Created ${createdUsers.length} users:`);
        createdUsers.forEach(user => console.log(`  - ${user.email} (password: Test@123)`));

        const createdCourses = await Course.create(dummyCourses);
        console.log(`\nCreated ${createdCourses.length} courses:`);
        createdCourses.forEach(course => {
            const priceLabel = course.price === 0 ? 'FREE' : `$${course.price}`;
            console.log(`  - ${course.title} (${priceLabel})`);
        });

        console.log('\n✅ Database seeded successfully!');
        console.log('\n📌 Dummy Credentials:');
        console.log('   Email: user1@test.com | Password: Test@123');
        console.log('   Email: user2@test.com | Password: Test@123');
        console.log('\n🎟️  Promo Code: BFSALE25 (50% discount on paid courses)');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
