import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/productModel.js';
import Category from './src/models/categoryModel.js';

dotenv.config({ path: './.env' });

const migrate = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for migration...');

        const products = await Product.find({}).populate('category');
        console.log(`Found ${products.length} products to check...`);

        for (const product of products) {
            // Check if category is still an ObjectId or already a string
            if (mongoose.Types.ObjectId.isValid(product.category)) {
                // If it's an ObjectId that didn't get populated (or populated wrongly)
                // we need to find the category name
                const cat = await Category.findById(product.category);
                if (cat) {
                    const catName = cat.name.toLowerCase();
                    if (['men', 'women', 'tailoring'].includes(catName)) {
                        product.category = catName;
                        await product.save();
                        console.log(`Updated product ${product.name} to category: ${catName}`);
                    }
                }
            } else if (product.category && typeof product.category === 'object' && product.category.name) {
                // If populated
                const catName = product.category.name.toLowerCase();
                if (['men', 'women', 'tailoring'].includes(catName)) {
                    product.category = catName;
                    await product.save();
                    console.log(`Updated product ${product.name} to category: ${catName}`);
                }
            }
        }

        console.log('Migration completed successfully.');
        process.exit();
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

migrate();
