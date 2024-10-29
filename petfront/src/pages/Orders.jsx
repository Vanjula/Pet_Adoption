import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [newOrder, setNewOrder] = useState({ totalPrice: "" });
  const [editOrderId, setEditOrderId] = useState(null);
  const [editOrderData, setEditOrderData] = useState({ totalPrice: "" });

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch("http://localhost:5000/order/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.orders) {
          setOrders(data.orders);
          setError(null);
        } else {
          setError("Failed to fetch orders");
        }
      })
      .catch((err) => {
        setError("Error: " + err.message);
      });
  };

  // const handleAddOrder = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/order/add", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newOrder),
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       setOrders((prevOrders) => [...prevOrders, data.order]);
  //       setNewOrder({ totalPrice: "" });
  //     } else {
  //       setError(data.error || "Failed to add order");
  //     }
  //   } catch (err) {
  //     setError("Error: " + err.message);
  //   }
  // };

  const handleEditOrder = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/order/edit/${id}`, {
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
      const response = await fetch(`http://localhost:5000/order/delete/${id}`, {
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

  return (
    <div className="Order">
      <h1>Orders</h1>
      {error && <p>{error}</p>}

      {/* Add New Order
      <div className="order-add">
        <h3>Add New Order</h3>
        <input
          type="number"
          placeholder="Total Price"
          value={newOrder.totalPrice}
          onChange={(e) =>
            setNewOrder({ ...newOrder, totalPrice: e.target.value })
          }
        />
        <button onClick={handleAddOrder}>Add Order</button>
      </div> */}

      {/* Orders List */}
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order._id} className="order-item">
            {editOrderId === order._id ? (
              <>
                <input
                  type="number"
                  placeholder="Total Price"
                  value={editOrderData.totalPrice}
                  onChange={(e) =>
                    setEditOrderData({
                      ...editOrderData,
                      totalPrice: e.target.value,
                    })
                  }
                />
                <button onClick={() => handleEditOrder(order._id)}>Save</button>
                <button onClick={() => setEditOrderId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>Total: ${order.totalPrice}</p>
                <button
                  onClick={() => {
                    setEditOrderId(order._id);
                    setEditOrderData({ totalPrice: order.totalPrice });
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteOrder(order._id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
