import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/userModel.js';
import Product from './src/models/productModel.js';
import Category from './src/models/categoryModel.js';
import connectDB from './src/config/db.js';

dotenv.config();
connectDB();

const seedData = async () => {
    try {
        await Category.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const adminUser = await User.create({
            name: 'Admin Director',
            email: 'admin@pahunn.com',
            password: 'password123',
            isAdmin: true,
        });

        const categories = await Category.insertMany([
            { name: 'Couture', description: 'Hand-crafted high fashion' },
            { name: 'Tailoring', description: 'Precision suits and blazers' },
            { name: 'Accessories', description: 'Curated artisanal accompaniments' },
        ]);

        await Product.insertMany([
            {
                name: 'The Silk Drape Gown',
                sku: 'PHN-2024-SD01',
                price: 85000,
                category: categories[0]._id,
                user: adminUser._id,
                image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop',
                brand: 'Pahunn',
                description: 'Masterpiece gown in heavy silk.',
                countInStock: 2,
            },
            {
                name: 'Structured Satin Blazer',
                sku: 'PHN-2024-SB05',
                price: 42500,
                category: categories[1]._id,
                user: adminUser._id,
                image: 'https://images.unsplash.com/photo-1539109132381-31a1bc9a721d?q=80&w=1974&auto=format&fit=crop',
                brand: 'Pahunn',
                description: 'Architectural precision tailoring.',
                countInStock: 15,
            }
        ]);

        console.log('Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
