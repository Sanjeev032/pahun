import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/userModel.js';
import Product from './src/models/productModel.js';
import connectDB from './src/config/db.js';

dotenv.config();

/**
 * Premium Sample Products Seed
 */
const seedProducts = async () => {
    try {
        await connectDB();

        // Clear existing products and users for a clean seed
        await Product.deleteMany();
        await User.deleteMany();

        const admin = await User.create({
            name: 'Pahun Admin',
            email: 'admin@pahun.com',
            password: 'password123',
            isAdmin: true,
        });

        const samples = [
            // MEN COLLECTION
            {
                name: "Midnight Silk Kurta",
                price: 12500,
                description: "A tailored masterpiece in midnight blue raw silk with intricate hand-embroidered detailing on the collar.",
                image: "https://images.unsplash.com/photo-1594932224828-b4b057b99c15?q=80&w=2080&auto=format&fit=crop",
                brand: "Pahun",
                category: "men",
                countInStock: 5,
                sku: "MEN-SLK-001"
            },
            {
                name: "Architectural Linen Shirt",
                price: 4500,
                description: "Premium European linen shirt with a contemporary structured silhouette and concealed placket.",
                image: "https://images.unsplash.com/photo-1621072138294-592f20942bd4?q=80&w=1974&auto=format&fit=crop",
                brand: "Pahun",
                category: "men",
                countInStock: 12,
                sku: "MEN-LIN-002"
            },
            {
                name: "Merino Wool Overcoat",
                price: 32000,
                description: "Exquisite merino wool overcoat in charcoal grey. Hand-finished edges and premium silk lining.",
                image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1974&auto=format&fit=crop",
                brand: "Pahun",
                category: "men",
                countInStock: 3,
                sku: "MEN-WOL-003"
            },
            {
                name: "Classic Cashmere Sweater",
                price: 8500,
                description: "Ultra-soft 100% cashmere sweater. An essential layer for the modern gentleman.",
                image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=2080&auto=format&fit=crop",
                brand: "Pahun",
                category: "men",
                countInStock: 8,
                sku: "MEN-CSH-004"
            },

            // WOMEN COLLECTION
            {
                name: "Ethereal Chiffon Saree",
                price: 18500,
                description: "Hand-painted chiffon saree in sunset hues, adorned with subtle gold thread work.",
                image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format&fit=crop",
                brand: "Pahun",
                category: "women",
                countInStock: 4,
                sku: "WOM-CHF-001"
            },
            {
                name: "Hand-Blown Silk Gown",
                price: 45000,
                description: "An architectural silk gown featuring a dramatic silhouette and hand-applied floral appliqués.",
                image: "https://images.unsplash.com/photo-1518767763163-52943b398632?q=80&w=1974&auto=format&fit=crop",
                brand: "Pahun",
                category: "women",
                countInStock: 2,
                sku: "WOM-SLK-002"
            },
            {
                name: "Tailored Velvet Blazer",
                price: 15000,
                description: "Structured blazer in deep emerald velvet. Sharp tailoring meets opulent texture.",
                image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=1974&auto=format&fit=crop",
                brand: "Pahun",
                category: "women",
                countInStock: 6,
                sku: "WOM-VLV-003"
            },
            {
                name: "Artisanal Embroidered Top",
                price: 6500,
                description: "Fine cotton top with traditional Lucknawi Chikan embroidery, reimagined for modern wear.",
                image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=1974&auto=format&fit=crop",
                brand: "Pahun",
                category: "women",
                countInStock: 10,
                sku: "WOM-COT-004"
            }
        ];

        // Attach admin user ID to products
        const productsWithUser = samples.map(p => ({ ...p, user: admin._id }));

        await Product.insertMany(productsWithUser);

        console.log('✓ Seeding Completed: Premium samples added to collections.');
        process.exit();
    } catch (error) {
        console.error(`✗ Seeding Failed: ${error.message}`);
        process.exit(1);
    }
};

seedProducts();
