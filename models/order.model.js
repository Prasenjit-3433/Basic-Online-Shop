const e = require('express');
const db = require('../data/database');

class Order {
    // Status => pending, fulfilled, cancelled
    constructor(cart, userData, status='pending', date, orderId) {
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        // the following code are executed when we reinitialized the order:
        this.date = new Date(date);
        if (this.date) {
            this.formattedDate = this.date.toLocaleDateString('en-IN', {
                weekday: 'short',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        }
        this.id = orderId;
    }

    save() {
        if (this.id) {
            // updating
        }else {
            const orderDocument = {
                userData: this.userData,
                productData: this.productData,
                date: new Date(),  // <-- creating date when adding new order
                status: this.status
            };

            return db.getDb().collection('orders').insertOne(orderDocument);
        }
    }
}

module.exports = Order;