import {Category} from "../models/category.js";

export function getCategoryById(req,res,next,id){
    Category.findById(id)
            .exec((err,category) => {
                if(err){
                    return res.status(400).json({
                        error: "Category not found in DB"
                    })
                }
                req.cate=category;
                next();
            });
};

export function createCategory(req,res){
    const category=new Category(req.body);
    category.save((err,newcategory) => {
        if(err){
            return res.status(400).json({
                error: "NOT able to save category in DB"
            })
        }
        return res.json(newcategory);
    })
}

export function getCategory(req,res){
    return res.json(req.cate);
}

export function getAllCategories(req,res){
    Category.find()
            .exec((err,categories) => {
                if(err){
                    return res.json(400).json({
                        error: "No Category found"
                    })
                }
                res.json(categories);
            })
}

export function updateCategory(req,res){
    const category = req.cate;
    category.name=req.body.name;
    category.save((err,updatedCategory) => {
        if(err){
            return res.json(400).json({
                error: "Update unsuccessful"
            })
        }
        return res.json(updatedCategory);
    })
}

export function removeCategory(req,res){
    const category = req.cate;
    category.remove((err,category) => {
        if(err){
            return res.json(400).json({
                error: "Failed to delete this category"
            })
        }
        return res.json({
            message: `Removed ${category.name} successfully`
        })
    })
}