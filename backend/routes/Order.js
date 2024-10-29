const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/order.js");

// Get all orders
router.get("/all", async (req, res) => {
  try {
    const orderData = await Order.find({});
    res.status(200).send({ message: "Orders sent successfully!", orders: orderData });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send({ error: "Failed to send order data" });
  }
});

// Add a new order
router.post("/add", async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = new Order(orderData);
    await newOrder.save();
    res.status(201).send({ message: "Order added successfully!", order: newOrder });
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(400).send({ error: "Failed to add order" });
  }
});

// Edit an existing order
router.put("/edit/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const updates = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, { new: true, runValidators: true });
    if (!updatedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).send({ message: "Order updated successfully!", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(400).send({ error: "Failed to update order" });
  }
});

// Delete an order
router.delete("/delete/:id", async (req, res) => {
  try {
    const orderId = req.params.id;

    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).send({ message: "Order deleted successfully!", order: deletedOrder });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(400).send({ error: "Failed to delete order" });
  }
});

// Exports 
module.exports = router;
