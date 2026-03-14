import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/userModel.js';
import Product from '../src/models/productModel.js';
import connectDB from '../src/config/db.js';

dotenv.config();

const sampleData = {
    men: [
        {
            name: 'Midnight Silk Kurta',
            image: 'https://images.unsplash.com/photo-1594932224828-b4b057b99c15?q=80&w=2080&auto=format&fit=crop',
            description: 'Exquisitely tailored midnight blue silk kurta with hand-embroidered detailing.',
            brand: 'Pahun',
            category: 'men',
            price: 12500,
            countInStock: 10,
            sku: 'M-HEAL-001',
        },
        {
            name: 'Royal Linen Shirt',
            image: 'https://images.unsplash.com/photo-1621072138294-592f20942bd4?q=80&w=1974&auto=format&fit=crop',
            description: 'Premium linen shirt in a pristine ivory white, perfect for daytime elegance.',
            brand: 'Pahun',
            category: 'men',
            price: 4500,
            countInStock: 15,
            sku: 'M-HEAL-002',
        },
        {
            name: 'Classic Black Sherwani',
            image: 'https://images.unsplash.com/photo-1599032909756-5dee8c652ad4?q=80&w=2070&auto=format&fit=crop',
            description: 'Timeless black sherwani with intricate tone-on-tone embroidery.',
            brand: 'Pahun',
            category: 'men',
            price: 35000,
            countInStock: 5,
            sku: 'M-HEAL-003',
        },
        {
            name: 'Premium Cotton Hoodie',
            image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop',
            description: 'Ultra-soft organic cotton hoodie in a structured luxury silhouette.',
            brand: 'Pahun',
            category: 'men',
            price: 6500,
            countInStock: 20,
            sku: 'M-HEAL-004',
        }
    ],
    women: [
        {
            name: 'Ethereal Chiffon Saree',
            image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format&fit=crop',
            description: 'Lightweight chiffon saree with subtle floral prints and gold border.',
            brand: 'Pahun',
            category: 'women',
            price: 18500,
            countInStock: 10,
            sku: 'W-HEAL-001',
        },
        {
            name: 'Velvet Evening Gown',
            image: 'https://images.unsplash.com/photo-1518767763163-52943b398632?q=80&w=1974&auto=format&fit=crop',
            description: 'Opulent deep emerald velvet gown with a floor-sweeping silhouette.',
            brand: 'Pahun',
            category: 'women',
            price: 45000,
            countInStock: 3,
            sku: 'W-HEAL-002',
        },
        {
            name: 'Ivory Silk Lehenga',
            image: 'https://plus.unsplash.com/premium_photo-1682090786689-741d60a91391?q=80&w=2070&auto=format&fit=crop',
            description: 'Stunning ivory silk lehenga with silver zardozi hand-embroidery.',
            brand: 'Pahun',
            category: 'women',
            price: 85000,
            countInStock: 2,
            sku: 'W-HEAL-003',
        },
        {
            name: 'Designer Embroidered Kurti',
            image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1974&auto=format&fit=crop',
            description: 'Contemporary kurti with traditional thread-work embroidery.',
            brand: 'Pahun',
            category: 'women',
            price: 7500,
            countInStock: 12,
            sku: 'W-HEAL-004',
        }
    ],
    accessories: [
        {
            name: 'Handcrafted Leather Belt',
            image: 'https://images.unsplash.com/photo-1614165936126-2ed18e471b3b?q=80&w=1974&auto=format&fit=crop',
            description: 'Italian full-grain leather belt with a custom gold-finished buckle.',
            brand: 'Pahun',
            category: 'accessories',
            price: 3500,
            countInStock: 30,
            sku: 'A-HEAL-001',
        },
        {
            name: 'Premium Silk Scarf',
            image: 'https://images.unsplash.com/photo-1601053181829-1a052ff19bb5?q=80&w=1989&auto=format&fit=crop',
            description: 'Pure silk scarf featuring hand-blocked heritage motifs.',
            brand: 'Pahun',
            category: 'accessories',
            price: 5500,
            countInStock: 25,
            sku: 'A-HEAL-002',
        },
        {
            name: 'Designer Pocket Square',
            image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=2080&auto=format&fit=crop',
            description: 'Finely rolled silk pocket square in a rich paisley pattern.',
            brand: 'Pahun',
            category: 'accessories',
            price: 1800,
            countInStock: 50,
            sku: 'A-HEAL-003',
        },
        {
            name: 'Luxury Watch Strap',
            image: 'https://images.unsplash.com/photo-1623998021451-306e52f33651?q=80&w=2072&auto=format&fit=crop',
            description: 'Genuine alligator leather watch strap with contrast stitching.',
            brand: 'Pahun',
            category: 'accessories',
            price: 8500,
            countInStock: 15,
            sku: 'A-HEAL-004',
        }
    ],
    tailoring: [
        {
            name: 'Personal Tailored Outfit',
            image: 'https://images.unsplash.com/photo-1594932224828-b4b057b99c15?q=80&w=2080&auto=format&fit=crop',
            description: 'Exclusively designed and tailored according to your unique measurements.',
            brand: 'Pahun',
            category: 'tailoring',
            price: 25000,
            countInStock: 999,
            sku: 'T-HEAL-001',
        },
        {
            name: 'Bespoke Wedding Suit',
            image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=2080&auto=format&fit=crop',
            description: 'A complete bespoke wedding ensemble crafted by our master tailors.',
            brand: 'Pahun',
            category: 'tailoring',
            price: 125000,
            countInStock: 999,
            sku: 'T-HEAL-002',
        },
        {
            name: 'Custom Designer Dress',
            image: 'https://images.unsplash.com/photo-1518767763163-52943b398632?q=80&w=1974&auto=format&fit=crop',
            description: 'A one-of-a-kind designer dress, sketched and stitched to perfection.',
            brand: 'Pahun',
            category: 'tailoring',
            price: 65000,
            countInStock: 999,
            sku: 'T-HEAL-003',
        },
        {
            name: 'Private Fashion Consultation',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
            description: 'One-on-one consultation with our lead designer for bespoke luxury.',
            brand: 'Pahun',
            category: 'tailoring',
            price: 5000,
            countInStock: 999,
            sku: 'T-HEAL-004',
        }
    ]
};

const seedCollections = async () => {
    try {
        await connectDB();

        // Ensure we have an admin user
        let adminUser = await User.findOne({ isAdmin: true });
        if (!adminUser) {
            adminUser = await User.create({
                name: 'Pahun Admin',
                email: 'admin@pahun.com',
                password: 'password123',
                isAdmin: true,
            });
            console.log('Created initial admin user.');
        }

        const categories = ['men', 'women', 'accessories', 'tailoring'];
        
        for (const cat of categories) {
            const count = await Product.countDocuments({ category: cat });
            console.log(`Analyzing ${cat}: ${count} products found.`);

            if (count < 4) {
                console.log(`Healing ${cat} collection... inserting samples.`);
                const productsToInsert = sampleData[cat].map(p => ({
                    ...p,
                    user: adminUser._id,
                    rating: 4.5 + Math.random() * 0.5,
                    numReviews: Math.floor(Math.random() * 20) + 5
                }));
                
                await Product.insertMany(productsToInsert);
                console.log(`✓ ${cat} collection healed with 4 products.`);
            } else {
                console.log(`- ${cat} collection is healthy.`);
            }
        }

        console.log('\n✓ Seeding Refinement Completed.');
        process.exit();
    } catch (error) {
        console.error(`✗ Seeding Failed: ${error.message}`);
        process.exit(1);
    }
};

seedCollections();
