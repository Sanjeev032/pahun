import * as categoryService from '../services/categoryService.js';
import { successResponse } from '../utils/responseFormatter.js';

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(successResponse(categories, 'Categories fetched successfully'));
    } catch (error) {
        next(error);
    }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res, next) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json(successResponse(category, 'Category created successfully'));
    } catch (error) {
        next(error);
    }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res, next) => {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body);
        res.json(successResponse(category, 'Category updated successfully'));
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res, next) => {
    try {
        await categoryService.deleteCategory(req.params.id);
        res.json(successResponse(null, 'Category removed successfully'));
    } catch (error) {
        next(error);
    }
};

export {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};
