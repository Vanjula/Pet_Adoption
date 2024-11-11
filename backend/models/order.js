const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        
      },
      quantity: {
        type: Number,
        
        default: 1, // Assuming 1 item is purchased by default, can be adjusted if necessary
      },
      price: {
        type: Number,
        
      },
    },
  ],
  totalPrice: {
    type: Number,
    
    // You can calculate this by summing up price * quantity for each product
  },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  shippingAddress: {
    type: String,
     // Assuming shipping address is needed
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',
  },
}, { timestamps: true });

// Create the Order model
const Order = mongoose.model('Orders', orderSchema);

// Export the Order model
module.exports = Order;
