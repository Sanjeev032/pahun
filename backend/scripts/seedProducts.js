import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/userModel.js';
import Product from '../src/models/productModel.js';
import connectDB from '../src/config/db.js';

dotenv.config();

const products = [
    // MEN CATEGORY
    {
        name: 'Midnight Silk Kurta',
        image: 'https://images.unsplash.com/photo-1594932224828-b4b057b99c15?q=80&w=2080&auto=format&fit=crop',
        description: 'Exquisitely tailored midnight blue silk kurta with hand-embroidered detailing.',
        brand: 'Pahun',
        category: 'men',
        price: 12500,
        countInStock: 10,
        rating: 4.8,
        numReviews: 12,
        sku: 'M001',
    },
    {
        name: 'Royal Linen Shirt',
        image: 'https://images.unsplash.com/photo-1621072138294-592f20942bd4?q=80&w=1974&auto=format&fit=crop',
        description: 'Premium linen shirt in a pristine ivory white, perfect for daytime elegance.',
        brand: 'Pahun',
        category: 'men',
        price: 4500,
        countInStock: 15,
        rating: 4.5,
        numReviews: 8,
        sku: 'M002',
    },
    {
        name: 'Classic Black Sherwani',
        image: 'https://images.unsplash.com/photo-1599032909756-5dee8c652ad4?q=80&w=2070&auto=format&fit=crop',
        description: 'Timeless black sherwani with intricate tone-on-tone embroidery.',
        brand: 'Pahun',
        category: 'men',
        price: 35000,
        countInStock: 5,
        rating: 4.9,
        numReviews: 15,
        sku: 'M003',
    },
    {
        name: 'Premium Cotton Hoodie',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop',
        description: 'Ultra-soft organic cotton hoodie in a structured luxury silhouette.',
        brand: 'Pahun',
        category: 'men',
        price: 6500,
        countInStock: 20,
        rating: 4.2,
        numReviews: 25,
        sku: 'M004',
    },
    {
        name: 'Heritage Bandhgala Jacket',
        image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1974&auto=format&fit=crop',
        description: 'Classic Bandhgala jacket crafted from premium wool-silk blend.',
        brand: 'Pahun',
        category: 'men',
        price: 28000,
        countInStock: 7,
        rating: 4.7,
        numReviews: 10,
        sku: 'M005',
    },

    // WOMEN CATEGORY
    {
        name: 'Ethereal Chiffon Saree',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format&fit=crop',
        description: 'Lightweight chiffon saree with subtle floral prints and gold border.',
        brand: 'Pahun',
        category: 'women',
        price: 18500,
        countInStock: 10,
        rating: 4.9,
        numReviews: 18,
        sku: 'W001',
    },
    {
        name: 'Velvet Evening Gown',
        image: 'https://images.unsplash.com/photo-1518767763163-52943b398632?q=80&w=1974&auto=format&fit=crop',
        description: 'Opulent deep emerald velvet gown with a floor-sweeping silhouette.',
        brand: 'Pahun',
        category: 'women',
        price: 45000,
        countInStock: 3,
        rating: 5.0,
        numReviews: 5,
        sku: 'W002',
    },
    {
        name: 'Ivory Silk Lehenga',
        image: 'https://plus.unsplash.com/premium_photo-1682090786689-741d60a91391?q=80&w=2070&auto=format&fit=crop',
        description: 'Stunning ivory silk lehenga with silver zardozi hand-embroidery.',
        brand: 'Pahun',
        category: 'women',
        price: 85000,
        countInStock: 2,
        rating: 4.9,
        numReviews: 7,
        sku: 'W003',
    },
    {
        name: 'Designer Embroidered Kurti',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1974&auto=format&fit=crop',
        description: 'Contemporary kurti with traditional thread-work embroidery.',
        brand: 'Pahun',
        category: 'women',
        price: 7500,
        countInStock: 12,
        rating: 4.6,
        numReviews: 20,
        sku: 'W004',
    },
    {
        name: 'Classic Satin Dress',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop',
        description: 'Minimalist champagne satin dress with a fluid, liquid-gold drape.',
        brand: 'Pahun',
        category: 'women',
        price: 15500,
        countInStock: 8,
        rating: 4.4,
        numReviews: 14,
        sku: 'W005',
    },

    // ACCESSORIES CATEGORY
    {
        name: 'Handcrafted Leather Belt',
        image: 'https://images.unsplash.com/photo-1614165936126-2ed18e471b3b?q=80&w=1974&auto=format&fit=crop',
        description: 'Italian full-grain leather belt with a custom gold-finished buckle.',
        brand: 'Pahun',
        category: 'accessories',
        price: 3500,
        countInStock: 30,
        rating: 4.7,
        numReviews: 45,
        sku: 'A001',
    },
    {
        name: 'Designer Silk Scarf',
        image: 'https://images.unsplash.com/photo-1601053181829-1a052ff19bb5?q=80&w=1989&auto=format&fit=crop',
        description: 'Pure silk scarf featuring hand-blocked heritage motifs.',
        brand: 'Pahun',
        category: 'accessories',
        price: 5500,
        countInStock: 25,
        rating: 4.8,
        numReviews: 32,
        sku: 'A002',
    },
    {
        name: 'Premium Pocket Square',
        image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=2080&auto=format&fit=crop',
        description: 'Finely rolled silk pocket square in a rich paisley pattern.',
        brand: 'Pahun',
        category: 'accessories',
        price: 1800,
        countInStock: 50,
        rating: 4.5,
        numReviews: 60,
        sku: 'A003',
    },
    {
        name: 'Luxury Watch Strap',
        image: 'https://images.unsplash.com/photo-1623998021451-306e52f33651?q=80&w=2072&auto=format&fit=crop',
        description: 'Genuine alligator leather watch strap with contrast stitching.',
        brand: 'Pahun',
        category: 'accessories',
        price: 8500,
        countInStock: 15,
        rating: 4.9,
        numReviews: 12,
        sku: 'A004',
    },
    {
        name: 'Gold-Plated Brooch',
        image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1964&auto=format&fit=crop',
        description: 'Hand-crafted floral brooch plated in 24k gold.',
        brand: 'Pahun',
        category: 'accessories',
        price: 4500,
        countInStock: 10,
        rating: 4.6,
        numReviews: 22,
        sku: 'A005',
    },

    // TAILORING CATEGORY (Service Entries)
    {
        name: 'Personal Tailored Outfit',
        image: 'https://images.unsplash.com/photo-1594932224828-b4b057b99c15?q=80&w=2080&auto=format&fit=crop',
        description: 'Exclusively designed and tailored according to your unique measurements.',
        brand: 'Pahun',
        category: 'tailoring',
        price: 25000,
        countInStock: 999,
        rating: 5.0,
        numReviews: 100,
        sku: 'T001',
    },
    {
        name: 'Bespoke Wedding Suit',
        image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=2080&auto=format&fit=crop',
        description: 'A complete bespoke wedding ensemble crafted by our master tailors.',
        brand: 'Pahun',
        category: 'tailoring',
        price: 125000,
        countInStock: 999,
        rating: 5.0,
        numReviews: 50,
        sku: 'T002',
    },
    {
        name: 'Custom Designer Dress',
        image: 'https://images.unsplash.com/photo-1518767763163-52943b398632?q=80&w=1974&auto=format&fit=crop',
        description: 'A one-of-a-kind designer dress, sketched and stitched to perfection.',
        brand: 'Pahun',
        category: 'tailoring',
        price: 65000,
        countInStock: 999,
        rating: 4.9,
        numReviews: 75,
        sku: 'T003',
    },
];

const seedData = async () => {
    try {
        await connectDB();

        // Find or create an admin user
        let adminUser = await User.findOne({ isAdmin: true });

        if (!adminUser) {
            console.log('No admin user found. Creating initial admin...');
            adminUser = await User.create({
                name: 'Pahun Admin',
                email: 'admin@pahun.com',
                password: 'password123', // User should change this
                isAdmin: true,
            });
            console.log('Admin user created successfully.');
        }

        // Clear existing sample products (optional: only delete products by brand 'Pahun' to keep others)
        await Product.deleteMany();
        console.log('Existing products cleared.');

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser._id };
        });

        await Product.insertMany(sampleProducts);

        console.log('✓ Database Seeded Successfully!');
        console.log(`${sampleProducts.length} Premium products added to inventory.`);
        process.exit();
    } catch (error) {
        console.error(`✗ Error with data import: ${error.message}`);
        process.exit(1);
    }
};

seedData();
