const db = require('../data/database');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price;  // covert str to number
        this.description = productData.description;
        this.image = productData.image; // the name of the image file
        this.imagePath = `product-data/images/${productData.image}`;
        this.imageUrl = `/products/assets/images/${productData.image}`;
        if (productData._id) {
            this.id = productData._id.toString();
        }
    }

    static async findAll() {
        const products = await db.getDb().collection('products').find().toArray();

        // Any array in JS has the `map` method which takes a function that is executed for every item in that array
        // then every item is replaced by the result of calling that function:
        return products.map(function(productDocument) {
            return new Product(productDocument);
        });
    }

    async save() {
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image // the name of the image file
        };
        await db.getDb().collection('products').insertOne(productData);
    }

}

module.exports = Product;