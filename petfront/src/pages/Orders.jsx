import React, { useEffect, useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]); // Ensure orders is initialized as an array
  const [error, setError] = useState(null);
  const [editOrderId, setEditOrderId] = useState(null);
  const [editOrderData, setEditOrderData] = useState({ totalPrice: "" });

  useEffect(() => {
    fetchOrders();
  }, []);

const fetchOrders = () => {
  fetch(`${apiUrl}/order/all`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched Data:", data); // Debugging line to check the data structure

      if (data.orders && Array.isArray(data.orders)) {
        // If orders are inside an array
        setOrders(data.orders);
        setError(null);
      } else if (data.orders && !Array.isArray(data.orders)) {
        // If orders is a single object
        setOrders([data.orders]); // Wrap it in an array for uniformity
        setError(null);
      } else {
        setError("Failed to fetch orders: Invalid data format.");
      }
    })
    .catch((err) => {
      setError("Error: " + err.message);
    });
};



  const handleEditOrder = async (id) => {
    if (!editOrderData.totalPrice || isNaN(editOrderData.totalPrice)) {
      setError("Please enter a valid total price.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/order/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editOrderData),
      });
      const data = await response.json();
      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === id ? { ...order, ...editOrderData } : order
          )
        );
        setEditOrderId(null);
        setEditOrderData({ totalPrice: "" });
      } else {
        setError(data.error || "Failed to edit order");
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/order/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== id)
        );
      } else {
        setError(data.error || "Failed to delete order");
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditOrderId(null);
    setEditOrderData({ totalPrice: "" });
  };

  return (
    <div className="Order">
      <h1>Orders</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {orders.length === 0 ? (
          <li>No orders available.</li>
        ) : (
          orders.map((order) => (
            <li key={order._id}>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Payment Status:</strong> {order.paymentStatus}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(order.orderDate).toLocaleString()}
              </p>

              {order.products.length > 0 ? (
                <div>
                  <h4>Products:</h4>
                  <ul>
                    {order.products.map((product, index) => (
                      <li key={index}>
                        <p>
                          <strong>Product ID:</strong> {product.productId}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {product.quantity}
                        </p>
                        <p>
                          <strong>Price:</strong> ${product.price}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No products in this order.</p>
              )}

              <p>
                <strong>Total Price:</strong> ${order.totalPrice}
              </p>

              <button onClick={() => setEditOrderId(order._id)}>Edit</button>
              <button onClick={() => handleDeleteOrder(order._id)}>
                Delete
              </button>

              {editOrderId === order._id && (
                <div>
                  <input
                    type="text"
                    value={editOrderData.totalPrice}
                    onChange={(e) =>
                      setEditOrderData({
                        ...editOrderData,
                        totalPrice: e.target.value,
                      })
                    }
                  />
                  <button onClick={() => handleEditOrder(order._id)}>
                    Save
                  </button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Orders;
