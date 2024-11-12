import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Shape from "../assets/Shape.svg";
import Bird from "../assets/bird.png";
import ptImage from "../assets/pt.png";
import caImage from "../assets/ca.png";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import CatIcon from "../assets/cat.png";
import HamsterIcon from "../assets/hamster.png";
import DogIcon from "../assets/dog.png";
import ParrotIcon from "../assets/parrot.png";
import RabbitIcon from "../assets/rabbit.png";
import TurtleIcon from "../assets/turtle.png";
import PetIcon from "../assets/pet.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const apiUrl = process.env.REACT_APP_API_URL;
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
    calculateTotal(storedCartItems);
  }, []);

  // Calculate total price
  const calculateTotal = (items) => {
    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  };

  // Update quantity in localStorage and UI
  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };
  var i=0;
  // Remove an item from the cart and update localStorage
  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  return (
    <div className="cart-page">
      <Header />
      <About />
      <h2 className="cart-header">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        <div className="cart-container">
          <ul className="cart-items-list">
            {cartItems.map((item) => (
              <li key={i++} className="cart-item">
                <img
                  src={`${apiUrl}${item.image}`}
                  alt={item.name}
                  width={50}
                  height={50}
                />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>Price: ${item.price}</p>
                </div>
                <div className="cart-item-actions">
                  <label>
                    Quantity:
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                    />
                  </label>
                  <button onClick={() => handleRemoveItem(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button>Checkout</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

const About = () => {
  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    adaptiveHeight: true, // This can help reduce extra spacing
  };

  return (
    <div className="About">
      <Slider {...settings}>
        {/* Slide 1 */}
        <div className="HomeBody">
          <div className="Homeleft">
            <img
              src={Shape}
              alt="background-shape"
              className="BackGroundShape"
              style={{
                height: "30px",
                width: "30px",
                filter: "brightness(0.3)",
              }}
            />
            <img
              src={ptImage}
              alt="background-slide1"
              className="BackGroundImage"
              style={{
                height: "90%",
                width: "100%",
                objectFit: "cover",
                position: "absolute",
                filter: "brightness(0.4)",
                top: 0,
                left: 0,
                zIndex: -1, // Behind the content
              }}
            />
            <div className="HomeContents">
              <p className="p_color">Pet Dabang</p>
              <div className="HomeContents_h">
                <h1>A pet store with</h1>
                <h1>everything you need</h1>
              </div>
              <div className="HomeContents_p">
                <p>
                  "Explore the joy of adopting and see how your life can change.
                  "
                </p>
                <p>
                  Let’s help our furry friends find happiness, one adoption at a
                  time.
                </p>
              </div>
              <button className="Adopt-btn">Shop Now</button>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="HomeBody">
          <div className="Homeleft">
            <img
              src={Shape}
              alt="background-shape"
              className="BackGroundShape"
              style={{ height: "30px", width: "30px" }}
            />

            <img
              src={caImage}
              alt="background-slide1"
              className="BackGroundImage"
              style={{
                height: "90%",
                width: "100%",
                objectFit: "cover",
                position: "absolute",
                filter: "brightness(0.5)",
                top: 0,
                left: 0,
                zIndex: -1, // Behind the content
              }}
            />
            <div className="HomeContents">
              <p className="p_color">Pet Dabang</p>
              <div className="HomeContents_h">
                <h1>Pet Supplies for</h1>
                <h1>All Your Needs</h1>
              </div>
              <div className="HomeContents_p">
                <p>
                  "A one-stop shop for all pet-related products and services."
                </p>
                <p>We have everything your pet could ever need!</p>
              </div>
              <button className="Adopt-btn">Shop Now</button>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Cart;
