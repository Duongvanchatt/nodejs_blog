import products from "../models/products";
import slugify from 'slugify';
export const list = async (req, res) => {
  try {
    const product = await products.find();
    res.json(product);
  } catch (error) {
     res.status(400).json({
       message:"Loi"
     })
  } 
  }
  export const get = async (req, res) => { // get a product
    try {
        const product = await products.findOne({_id: req.params.id }).exec();
        res.json(product);    
    } catch (error) {
        res.status(400).json({
            message: "Loi"
        })
    }
}

export const create = async (req, res) => { // create product
  req.body.slug = slugify(req.body.name);
  console.log(req.body)
 
      const product = await new products(req.body).save();
      console.log(product);
      res.json(product);    
  
}
export const remove = async (req, res) => {
  try {
    const newProducts = await products.findOneAndDelete({_id: req.params.id}).exec();
    res.json(newProducts);
  } catch (error) {
    res.status(400).json({
      message: "Loi"
  })
  }
}

export const update = async (req, res) => { 
  const condition = {_id: req.params.id};
  const update = req.body;
  const optional = {new:true}
  try {
    const newProducts = await products.findOneAndUpdate(condition,update,optional).exec();
    res.json(newProducts);
  } catch (error) {
    res.status(400).json({
      message: "Loi"
  })
  }
}
