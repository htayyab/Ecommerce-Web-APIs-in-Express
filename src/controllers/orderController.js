import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const addOrder = async (req, res) => {
  try {
    const { user, items, paymentMethod, shippingAddress } = req.body;
    let totalPrice = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.product} not found` });
      }

      totalPrice += Math.round(product.price * item.quantity);
    }

    if (totalPrice <= 0) {
      return res
        .status(400)
        .json({ message: "Total price must be a positive integer" });
    }

    const newOrder = new Order({
      user,
      items,
      paymentMethod,
      shippingAddress,
      totalPrice,
      orderDate: new Date(),
    });

    await newOrder.save();

    return res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to place order", error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: "user",
        select: "_id",
      })
      .populate({
        path: "items.product",
        select: "_id",
      });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving order", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "user",
        select: "_id",
      })
      .populate({
        path: "items.product",
        select: "_id",
      });

    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving orders", error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const { items, ...restOfUpdates } = req.body;
    if (items) {
      let newTotalPrice = 0;
      for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res
            .status(404)
            .json({ message: `Product with ID ${item.product} not found` });
        }
        newTotalPrice += Math.round(product.price * item.quantity);
      }
      restOfUpdates.totalPrice = newTotalPrice;
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { ...restOfUpdates },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting order", error: error.message });
  }
};
