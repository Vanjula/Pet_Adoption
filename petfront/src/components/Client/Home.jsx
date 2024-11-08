import React, { useEffect, useState } from "react";
import Header from './Header';
import Shape from '../assets/Shape.svg';
import Bird from '../assets/bird.png';
import Vector from '../assets/Vector.svg';
import dog_img from '../assets/dog_img.png';
import Purple from '../assets/purple.jpg';
import dog_food from '../assets/dog_food.png';
import Shape_Cat from '../assets/Shape.svg';
import HeartPawn from'../assets/heartpawn.svg';
import HeartDog from '../assets/heartDog.svg';
import Pawn from '../assets/pawn.svg';
import SugarDog from '../assets/sugarDog.svg';
import Pentagon from '../assets/pentagon.svg';
import Pbag from '../assets/pbag.png';
import TPet from '../assets/pets.png';
import Cat from '../assets/cat.png';
import Health from '../assets/health.png';
import Groom from '../assets/groom.png';
import Train from '../assets/train.png';
import Dhome from '../assets/home.png';
import Tick from '../assets/tick.png';
import Cbed from '../assets/cbed.png';
import PN1 from '../assets/pn1.png';
import PN2 from '../assets/pn2.png';
import PN3 from '../assets/pn3.png';
import Syrup from '../assets/syrup.png';
import HamsterIcon from '../assets/hamster.png';
import DogIcon from '../assets/dog.png';
import Tfood from '../assets/turtlefood.png';
import Wipe from '../assets/wipe.png';
import ParrotIcon from '../assets/parrot.png';
import RabbitIcon from '../assets/rabbit.png';
import TurtleIcon from '../assets/turtle.png';
import CombIcon from '../assets/comb.png';
import SampIcon from '../assets/samp.png';
import Food from '../assets/food.png';
import RP from '../assets/rp.png';
import placeholder from "../assets/placeholder.png";

import Footer from './Footer';
import Blue from "../assets/blue.jpeg";
import { FcLike } from "react-icons/fc";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { BiRightArrowAlt } from "react-icons/bi";
const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); // Check for token in local storage

  const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/cat/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/PetFood/featured");
        if (!response.ok) {
          throw new Error("Failed to fetch featured products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const [Bestproducts, setBestProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    featured: false,
  });

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/PetFood/best");
        if (!response.ok) {
          throw new Error("Failed to fetch best Bestproducts");
        }
        const data = await response.json();
        setBestProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBestProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/PetFood/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const addedProduct = await response.json();
      setBestProducts((prev) => [...prev, addedProduct.product]); // Add the new product to the list
      setNewProduct({ name: "", price: "", image: "", featured: false }); // Reset form
    } catch (err) {
      setError(err.message);
    }
  };

  const [animals, setAnimals] = useState([]);

 useEffect(() => {
   const fetchAnimals = async () => {
     try {
       const response = await fetch("http://localhost:5000/pet/all"); // Replace with your endpoint
       if (!response.ok) {
         throw new Error("Failed to fetch animals");
       }
       const data = await response.json();
       console.log(data);
       setAnimals(data.animals);
     } catch (err) {
       setError(err.message);
     } finally {
       setLoading(false);
     }
   };

   fetchAnimals();
 }, []);


 

  const handleAdoptionRequest = async (petId) => {
    try {
      const response = await fetch("http://localhost:5000/request/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "Shyam",
          pet: petId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create adoption request");
      }

      const data = await response.json();
      alert("Adoption request created successfully!");
      console.log("Adoption request created:", data);
    } catch (error) {
      console.error(error);
      alert("There was an error creating the adoption request.");
    }
  };

  if (loading) {
    return <div>Loading featured products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Home">
      <Header />
      <div className="HomeBody">
        <div className="Homeleft">
          <img src={Shape} alt="background" className="BackGroundShape" />
          <img src={Bird} alt="" className="BackGroundBird" />
          <img src={Shape} alt="background2" className="BackGroundShape2" />
          <div className="HomeContents">
            <p className="p_color">Pet Dabang</p>

            <div className="HomeContents_h">
              <h1>A pet store with </h1>
              <h1>everything you need</h1>
            </div>
            <div className="HomeContents_p">
              <p>
                Adopt a pet, save a life, and gain a loyal friend for life.{" "}
              </p>
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
          <img src={Vector} alt="" className="BackGround" />
          <img src={dog_img} alt="" className="DogImg" />
        </div>
      </div>
      <div className="HomeCategories">
        <div className="topContents">
          <p>Browse by category</p>
          <div>
            <BiLeftArrow className="customeIcon" />
            <BiRightArrow className="customeIcon" />
          </div>
        </div>
        {/* <div className="CategoryCards">
          <div className="cards">
            <img src={Groom} alt="" className="card_img" />
            <div>
              <p>Grooming & Hygiene Accessories</p>
              <BiRightArrowAlt className="rightArrow" />
            </div>
            <p>64 products</p>
          </div>
          <div className="cards">
            <img src={Pbag} alt="" className="card_img" />
            <div>
              <p>Travel Accessories</p>
              <BiRightArrowAlt className="rightArrow" />
            </div>
            <p>64 products</p>
          </div>{" "}
          <div className="cards">
            <img src={Train} alt="" className="card_img" />
            <div>
              <p>Training Accessories</p>
              <BiRightArrowAlt className="rightArrow" />
            </div>
            <p>64 products</p>
          </div>{" "}
          <div className="cards">
            <img src={Health} alt="" className="card_img" />
            <div>
              <p> Health & Wellness Accessories</p>
              <BiRightArrowAlt className="rightArrow" />
            </div>
            <p>64 products</p>
          </div>
        </div> */}
        <div className="CategoryCards">
          <div className="cardsContainer">
            {categories.map((category) => {
              const color1 = getRandomColor();
              const color2 = getRandomColor();
              const gradientStyle = {
                background: `linear-gradient(45deg, ${color1}, ${color2})`,
              };

              return (
                <div key={category._id} className="cards" style={gradientStyle}>
                  <div>
                    <p>{category.name}</p>
                  </div>
                  <p>{category.productCount} products</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <div className="featuredProducts">
        <h1>Featured products</h1>
        <div className="FeaturedProductCards">
          <div className="featuredcard">
            <img src={Dhome} alt="" />
            <div className="NameAndLike">
              <div>
                <div>Dog Mini Home </div>
                <p>Rs.800</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>{" "}
          <div className="featuredcard">
            <img src={Tick} alt="" />
            <div className="NameAndLike">
              <div>
                <div>TICK F FLEA RELIEF</div>
                <p>Rs.673</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>
          <div className="featuredcard">
            <img src={Cbed} alt="" />
            <div className="NameAndLike">
              <div>
                <div>Cat bed</div>
                <p>Rs.789</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>
        </div>
      </div> */}
      <div className="featuredProducts">
        <h1>Featured Products</h1>
        <div className="FeaturedProductCards">
          {products.map((product) => (
            <div key={product._id} className="featuredcard">
              <img src={product.image || placeholder} alt={product.name} />{" "}
              {/* Use a placeholder if no image */}
              <div className="NameAndLike">
                <div>
                  <div>{product.name}</div>
                  <p>${product.price}</p>
                </div>
                <FcLike className="like" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="CatImgContainer">
        <div className="CatLeft">
          <img src={Shape_Cat} alt="" />
          <img src={TPet} alt="" className="catImg" />
        </div>
        <div className="CatRight">
          <div className="CatContents">
            <p className="T_color">Pet Dabang</p>

            <div className="HomeContents_h">
              <h1>The smarter way to</h1>
              <h1>find your perfect pet companion!</h1>
            </div>
            <div className="HomeContents_p">
              <p>
                Are you looking for a loving pet to add joy and warmth to your
                home? At Pet Dabang, we believe that every pet deserves a caring
                family. Whether you're adopting your first pet or adding to your
                family, we make the process simple, transparent, and
                stress-free.
              </p>
            </div>
            <button className="Adopt-btn">Learn More</button>
          </div>
        </div>
      </div>
      <div className="BestProducts">
        <div className="products">
          <div>
            <img src={HeartPawn} alt="" />
          </div>
          <div>
            <img src={HeartDog} alt="" />
          </div>
          <div>
            <img src={Pawn} alt="" />
          </div>
          <div>
            <img src={SugarDog} alt="" />
          </div>
          <div>
            <img src={Pentagon} alt="" />
          </div>
        </div>
        <p>Best selling products</p>
        {/* <div className="best-products">
          <div className="featuredcard">
            <img src={dog_food} alt="" />
            <div className="NameAndLike">
              <div>
                <div>Premimum Dog food</div>
                <p>$ 45</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>{" "}
          <div className="featuredcard">
            <img src={dog_food} alt="" />
            <div className="NameAndLike">
              <div>
                <div>Premimum Dog food</div>
                <p>$ 45</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>{" "}
          <div className="featuredcard">
            <img src={dog_food} alt="" />
            <div className="NameAndLike">
              <div>
                <div>Premimum Dog food</div>
                <p>$ 45</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>{" "}
          <div className="featuredcard">
            <img src={dog_food} alt="" />
            <div className="NameAndLike">
              <div>
                <div>Premimum Dog food</div>
                <p>$ 45</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>{" "}
          <div className="featuredcard">
            <img src={dog_food} alt="" />
            <div className="NameAndLike">
              <div>
                <div>Premimum Dog food</div>
                <p>$ 45</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>{" "}
          <div className="featuredcard">
            <img src={dog_food} alt="" />
            <div className="NameAndLike">
              <div>
                <div>Premimum Dog food</div>
                <p>$ 45</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>{" "}
          <div className="featuredcard">
            <img src={dog_food} alt="" />
            <div className="NameAndLike">
              <div>
                <div>Premimum Dog food</div>
                <p>$ 45</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>{" "}
          <div className="featuredcard">
            <img src={dog_food} alt="" />
            <div className="NameAndLike">
              <div>
                <div>Premimum Dog food</div>
                <p>$ 45</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>{" "}
        </div> */}
        <div className="best-products">
          <div className="featuredcard">
            <img src={dog_food} alt="" />
            <div className="NameAndLike">
              <div>
                <div>Premimum Dog food</div>
                <p>Rs.150</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>{" "}
          <div className="featuredcard">
            <img src={CombIcon} alt="" />
            <div className="NameAndLike">
              <div>
                <div>Pet Comb</div>
                <p>Rs.250</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>{" "}
          <div className="featuredcard">
            <img src={SampIcon} alt="" />
            <div className="NameAndLike">
              <div>
                <div>Shine Shampoo</div>
                <p>Rs.400</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>{" "}
          <div className="featuredcard">
            <img src={Food} alt="" />
            <div className="NameAndLike">
              <div>
                <div>Dog food</div>
                <p>Rs.229</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>{" "}
          <div className="featuredcard">
            <img src={RP} alt="" />
            <div className="NameAndLike">
              <div>
                <div>Rabbit Serum</div>
                <p>Rs.499</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>{" "}
          <div className="featuredcard">
            <img src={Wipe} alt="" />
            <div className="NameAndLike">
              <div>
                <div>Pet Wipes</div>
                <p>Rs.150</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>{" "}
          <div className="featuredcard">
            <img src={Syrup} alt="" />
            <div className="NameAndLike">
              <div>
                <div>Pet Amino Acid Syrup</div>
                <p>Rs.699</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>{" "}
          <div className="featuredcard">
            <img src={Tfood} alt="" />
            <div className="NameAndLike">
              <div>
                <div>Turtle food</div>
                <p>Rs.599</p>
              </div>
              <FcLike className="like" />
            </div>
          </div>{" "}
          {/* <h1>Best Products</h1>
          <div className="FeaturedProductCards">
            {products.map((product) => (
              <div key={product._id} className="featuredcard">
                <img src={product.image || dog_food} alt={product.name} />{" "}
                <div className="NameAndLike">
                  <div>
                    <div>{product.name}</div>
                    <p>${product.price}</p>
                  </div>
                  <FcLike className="like" />
                </div>
              </div>
            ))}
          </div> */}
        </div>

        {/* <div className="ByPet">
          <div className="topContents">
            <p>Browse by Pet</p>
            <div>
              <BiLeftArrow className="customeIcon" />
              <BiRightArrow className="customeIcon" />
            </div>
          </div>
          <div className="animalsCard">
            <div className="card">
              <img src={HamsterIcon} alt="" />
              Hamster
            </div>
            <div className="card">
              <img src={DogIcon} alt="" />
              Dog
            </div>
            <div className="card">
              <img src={Cat} alt="" />
              Cat
            </div>
            <div className="card">
              <img src={TurtleIcon} alt="" />
              Turtle
            </div>
            <div className="card">
              <img src={RabbitIcon} alt="" />
              Rabbit
            </div>
          </div>
        </div> */}
        <div className="ByPet">
          <div className="topContents">
            <p>Browse by Pet</p>
            <div>
              <BiLeftArrow className="customeIcon" />
              <BiRightArrow className="customeIcon" />
            </div>
          </div>
          <div className="animalsCard">
            {animals.length > 0 ? (
              animals.map((animal) => (
                <div key={animal._id} className="card2">
                  {/* Ensure animal.image is a valid base64 string */}
                  {animal.image ? (
                    <img src={animal.image} alt={animal.name} />
                  ) : (
                    <p>No image available</p>
                  )}
                  <p>{animal.name}</p>
                  <button onClick={() => handleAdoptionRequest(animal._id)}>
                    Adopt
                  </button>
                </div>
              ))
            ) : (
              <p>No animals available.</p>
            )}
          </div>
        </div>
      </div>

      <div className="NewsBlogs">
        <h1>News & Blog</h1>
        <div className="news">
          <div className="NewsCard">
            <img src={PN2} alt="" />
            <div className="tagger">News</div>
            <p>12 July 2024</p>
            <p>
              Pet adoption is more than just finding a furry friend—it's about
              giving an animal a second chance at a loving home. Thousands of
              dogs, cats, and other animals are waiting in shelters for families
              to bring them into their lives.
            </p>
          </div>
          <div className="NewsCard">
            <img src={PN1} alt="News" />
            <div className="tagger">News</div>
            <p>18 May 2024</p>
            <p>
              Senior pets often get overlooked in adoption centers, but they
              have so much love to give. Older animals tend to be calmer, more
              experienced, and often make great companions for families or
              individuals looking for a low-maintenance pet.
            </p>
          </div>
          <div className="NewsCard">
            <img src={PN3} alt="" />
            <div className="tagger">News</div>
            <p>02 June 2024</p>
            <p>
              A pet's health is a top priority for any responsible owner.
              Regular veterinary check-ups, a balanced diet, and proper exercise
              are essential to keeping your pet in top shape. Whether it’s
              learning about pet-safe foods or understanding their emotional
              needs, ensuring your pet's well-being leads to a longer, happier
              life together. Let’s help our pets thrive by giving them the care
              and attention they need.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
