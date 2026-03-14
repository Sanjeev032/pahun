import Category from '../models/categoryModel.js';

export const getAllCategories = async () => {
    return await Category.find({});
};

export const createCategory = async (data) => {
    const categoryExists = await Category.findOne({ name: data.name });
    if (categoryExists) {
        throw new Error('Category already exists');
    }
    const category = new Category({
        name: data.name,
        description: data.description,
    });
    return await category.save();
};

export const updateCategory = async (id, data) => {
    const category = await Category.findById(id);
    if (!category) {
        throw new Error('Category not found');
    }

    if (data.name && data.name !== category.name) {
         const categoryExists = await Category.findOne({ name: data.name });
         if (categoryExists) {
             throw new Error('Category name already taken');
         }
    }

    category.name = data.name || category.name;
    category.description = data.description !== undefined ? data.description : category.description;

    return await category.save();
};

export const deleteCategory = async (id) => {
    const category = await Category.findById(id);
    if (!category) {
        throw new Error('Category not found');
    }
    
    // In a fully robust system, you might check if Products belong to this category here 
    // and throw an Error if they do, preventing orphan products.
    // e.g., const products = await Product.find({ category: id });
    // if (products.length > 0) throw new Error('Cannot delete category with associated products');

    await Category.deleteOne({ _id: category._id });
    return true;
};
