const { ObjectID } = require('bson');
const mongodb = require('mongodb');

const db = require('../data/database');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price;  // covert str to number
        this.description = productData.description;
        this.image = productData.image; // the name of the image file
        this.UpdateImageData();
        if (productData._id) {
            this.id = productData._id.toString();
        }
    }

    static async findById(productId) {
        let prodId;

        try {
            prodId = new mongodb.ObjectId(productId);
        }catch(error) {
            error.code = 404;
            throw error;
        }
        
        const product = await db.getDb().collection('products').findOne({_id: prodId});

        if (!product) {
            const error = new Error('Could not find a product with provided Id');
            error.code = 404;
            throw error;
        }
        
        return new Product(product);
    }

    static async findAll() {
        const products = await db.getDb().collection('products').find().toArray();

        // Any array in JS has the `map` method which takes a function that is executed for every item in that array.
        // then creates a temporaray array with the object returned as the result of calling that function. The actual 
        // array remains as it is Instead a new array is created and returned:
        return products.map(function(productDocument) {
            return new Product(productDocument);
        });
    }

    UpdateImageData() {
        this.imagePath = `product-data/images/${this.image}`;
        this.imageUrl = `/products/assets/images/${this.image}`;
    }

    async save() {
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image // the name of the image file
        };

        if (this.id) {
            const productId = new mongodb.ObjectId(this.id);

            // When no image selected in the update product form:
            if (!this.image) {

                // To avoid getting overwritten the image data by `undefined` in the database,
                // delete the image key-value pair from productData:
                delete productData.image;

            }

            await db.getDb().collection('products').updateOne({_id: productId}, {$set: productData});
        }else {
            await db.getDb().collection('products').insertOne(productData);
        }   
        
    }

    replaceImage(newImage) {
        this.image = newImage;
        this.UpdateImageData();
    }

    remove() {
        const productId = new mongodb.ObjectId(this.id);
        return db.getDb().collection('products').deleteOne({_id: productId});
    }
}

module.exports = Product;