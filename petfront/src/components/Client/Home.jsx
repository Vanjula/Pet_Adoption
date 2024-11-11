import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Shape from "../assets/Shape.svg";
import Vector from "../assets/Vector.svg";
import dog_img from "../assets/dog_img.png";
import PN1 from "../assets/pn1.png";
import PN2 from "../assets/pn2.png";
import PN3 from "../assets/pn3.png";
import { FcLike } from "react-icons/fc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiUrl = process.env.REACT_APP_API_URL;

const Home = () => {
  // State hooks for loading, error handling, pagination, products, and animals
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6;

  const token = localStorage.getItem("token");

  // Fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/PetFood/all`);
        const data = await response.json();
        if (response.ok) {
          setProducts(data.petProducts); // Ensure data.petProducts matches your API response
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

  // Fetch animals data
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch(`${apiUrl}/pet/all`);
        if (!response.ok) throw new Error("Failed to fetch animals");
        const data = await response.json();
        setAnimals(data.animals);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimals();
  }, []);

  // Pagination handlers for animals section
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, animals.length - itemsPerPage)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  // Handle adoption request
  const handleAdoptionRequest = async (petId) => {
    try {
      const response = await fetch(`${apiUrl}/request/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: "Shyam", pet: petId }),
      });

      if (!response.ok) throw new Error("Failed to create adoption request");

      const data = await response.json();
      toast.success("Adoption request created successfully!", {
        autoClose: 3000,
      });
      console.log("Adoption request created:", data);
    } catch (error) {
      console.error(error);
      toast.error("There was an error creating the adoption request.", {
        autoClose: 3000,
      });
    }
  };

  if (loading) return <div>Loading featured products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="Home">
      <Header />

      {/* Home Page Main Section */}
      <div className="HomeBody">
        <div className="Homeleft">
          <img src={Shape} alt="background" className="BackGroundShape" />
          <img src={Shape} alt="background2" className="BackGroundShape2" />
          <div className="HomeContents">
            <p className="p_color">Pet Dabang</p>
            <div className="HomeContents_h">
              <h1>A pet store with everything you need</h1>
            </div>
            <div className="HomeContents_p">
              <p>Adopt a pet, save a life, and gain a loyal friend for life.</p>
              <p>Your future best friend is waiting for you at Pet Dabang!!!</p>
            </div>
            {!token && (
              <button
                className="Adopt-btn"
                onClick={() => (window.location.href = "/login")}
              >
                Start
              </button>
            )}
          </div>
        </div>
        <div className="HomeRight">
          <img src={Vector} alt="Vector background" className="BackGround" />
          <img src={dog_img} alt="Dog" className="DogImg" />
        </div>
      </div>

      <p className="title">Best Selling Products</p>
      <div className="best-products">
        {products.map((product) => {
          if (!product.featured) {
            return (
              <div className="featuredcard" key={product.id}>
                <img src={`${apiUrl}${product.image}`} alt={product.name} />
                <div className="NameAndLike">
                  <div>
                    <div>{product.name}</div>
                    <p>{product.price}</p>
                  </div>
                  <FcLike className="like" />
                  <button className="buyButton">💸 Buy</button>
                </div>
              </div>
            );
          }
          return null; // This is optional, you can omit it as well.
        })}
      </div>

      {/* News & Blog Section */}
      <div className="NewsBlogs">
        <h1>News & Blog</h1>
        <div className="news">
          {[PN2, PN1, PN1, PN3].map((imgSrc, index) => (
            <div className="NewsCard" key={index}>
              <img src={imgSrc} alt="News" />
              <div className="tagger">News</div>
              <p>
                {
                  [
                    "12 July 2024",
                    "18 May 2024",
                    "18 May 2024",
                    "02 June 2024",
                  ][index]
                }
              </p>
              <p>{/* Add descriptive content here */}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
