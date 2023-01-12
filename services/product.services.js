const Product = require('../models/Product');

exports.getProductsService = async (filters, queries) => {

    const products = await Product.find(filters)
      .skip(queries.skip)
      .limit(queries.limit)
      .select(queries.fields)
      .sort(queries.sortBy)
  
    const total = await Product.countDocuments(filters)
    const page = Math.ceil(totalProducts/queries.limit)
    return {total,page,products};
  };
  

exports.createProductService =  async (data) =>{
    const product = await Product.create(data)
    return product
}

exports.updateProductService =  async (productId, data) =>{
    const result = await Product.updateOne({_id:productId}, {$set:data},{
        runValidators:true
    })
    return result
}

exports.bulkUpdateProductService =  async (data) =>{
    // const result = await Product.updateMany({_id:data.ids}, data.data,{
    //     runValidators:true
    // })

    const products = [];

    data.ids.forEach(product => {
        products.push(Product.updateOne({_id: product.id}, product.data))
    });

    const result =await Promise.all(products);
    console.log(result);
    return result
}

exports.bulkDeleteProductService = async (ids) => {
    const result = await Product.deleteMany({});
  
    return result;
  };

exports.deleteProductByIdService =  async (id) =>{
    const result = await Product.deleteOne({_id:id})
    return result;
}