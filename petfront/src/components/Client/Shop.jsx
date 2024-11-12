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

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPrice, setFilterPrice] = useState([9, 399]);
  const [activePet, setActivePet] = useState("");

  // Load products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/PetFood/all`);
        const data = await response.json();
        if (response.ok) {
          setProducts(data.petProducts); // Adjust to match API response
        } else {
          setError("Failed to fetch products.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Change page
  const handlePageChange = (direction) => {
    if (
      direction === "next" &&
      currentPage < Math.ceil(products.length / itemsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Filtered products by category and price
  const filteredProducts = products
    .filter((product) =>
      filterCategory ? product.category === filterCategory : true
    )
    .filter(
      (product) =>
        product.price >= filterPrice[0] && product.price <= filterPrice[1]
    );

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle category change
  const handlePetChange = (pet) => {
    setActivePet(pet);
    setFilterCategory(pet);
  };

  // Add product to cart using localStorage
  const handleCartNow = (product) => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingProductIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  // Buy Now functionality - creates order
  const handleBuyNow = async (product) => {
    const token = localStorage.getItem("token");
    const orderData = {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
    };

    try {
      const response = await fetch(`${apiUrl}/order/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (response.status === 201) {
        alert("Order added successfully!");
      } else {
        alert("Failed to place order: " + result.error);
      }
    } catch (error) {
      console.error("Error adding order:", error);
      alert("Failed to place order.");
    }
  };

  var ip = 0;

  return (
    <div>
      <Header />
      <About />

      <div className="shop-container">
        <h2>Shop</h2>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}

        <div className="filters">
          <h3>Filters</h3>
          <select
            onChange={(e) => setFilterCategory(e.target.value)}
            value={filterCategory}
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Toys">Toys</option>
            <option value="Accessories">Accessories</option>
            <option value="Grooming">Grooming</option>
          </select>

          <input
            type="range"
            min="9"
            max="399"
            value={filterPrice[1]}
            onChange={(e) => setFilterPrice([filterPrice[0], e.target.value])}
          />
          <span>
            Price: {filterPrice[0]} - {filterPrice[1]}
          </span>
        </div>

        <div className="products">
          {currentProducts.map((product) => (
            <div className="product-card" key={ip++}>
              <img src={`${apiUrl}${product.image}`} alt={product.name} />
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <span>Price: {product.price}</span>
              <div className="buttonscarts">
                <button
                  className="buy-now-btn"
                  onClick={() => handleCartNow(product)} // Triggering the order creation on "Buy Now"
                >
                  Add to Cart{" "}
                </button>
                <button
                  className="buy-now-btn"
                  onClick={() => handleBuyNow(product)} // Triggering the order creation on "Buy Now"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            <BiLeftArrow />
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => handlePageChange("next")}
            disabled={
              currentPage >= Math.ceil(filteredProducts.length / itemsPerPage)
            }
          >
            <BiRightArrow />
          </button>
        </div>
      </div>

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

export default Shop;
