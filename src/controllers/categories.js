import slugify from 'slugify';
import products from "../models/products";
import Category from '../models/category';

//create
export const create = async (req, res)=>{
    req.body.slug = slugify(req.body.name);
    try {
        const category = await new Category(req.body).save()
        res.json(category);
    } catch (error) {
        res.status(400).json({
            massage: "Loi"
        })
    }
}

//get all
export const list = async (req, res)=>{
    try {
        const categories = await Category.find().exec();
        res.json(categories);
    } catch (error) {
        res.status(400).json({
            massage: "Loi"
        })
    }
}

export const deletes = async (req, res) => {
    try {
      const newCategory = await Category.findOneAndDelete({slug: req.params.slug}).exec();
      res.json(newCategory);
    } catch (error) {
      res.status(400).json({
        message: "Loi"
    })
    }
  }
  
export const read = async (req, res) => { // get all
    try {
        const category = await Category.findOne({slug: req.params.slug}).exec();
        const product = await products.find({category: category}).populate('category').select('-category').exec()
        console.log('products', product);
        res.json({
            category, product
        });    
    } catch (error) {
        res.status(400).json({
            message: "Lỗi"
        })
    }
  }