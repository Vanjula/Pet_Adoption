import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Shape from "../assets/Shape.svg";
import Bird from "../assets/bird.png";
import Vector from "../assets/Vector.svg";
import dog_img from "../assets/Fish.png";
import { BiRightArrowAlt, BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
//new
import ptImage from '../assets/pt.png';
import caImage from '../assets/ca.png';


import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


// Adding icons for the pets
import CatIcon from '../assets/cat.png';
import HamsterIcon from '../assets/hamster.png';
import DogIcon from '../assets/dog.png';
import ParrotIcon from '../assets/parrot.png';
import RabbitIcon from '../assets/rabbit.png';
import TurtleIcon from '../assets/turtle.png';
import PetIcon from '../assets/pet.png'; 
import BowlIcon from '../assets/bowl.png';
import LeashIcon from '../assets/l.png';
import BedIcon from '../assets/bed.png';
import WheelIcon from '../assets/wheel.png';
import TankIcon from '../assets/tank.png';

const filters = {
  brands: ['Natural food', 'Pet care', 'Dogs friend', 'Pet food', 'Favorite pet', 'Green line'],
  tags: ['Dog food', 'Cat food', 'Natural', 'Parrot', 'Small dog', 'Cat'],
};

const popularProducts = [
  { title: 'Premium Dog Food', price: '$99' },
  { title: 'Premium Cat Food', price: '$220' },
  { title: 'Cat Bed', price: '$50' },
  { title: 'Dog Leash', price: '$220' },
  { title: 'Cat Bowl', price: '$49.99' },
];
const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [products] = useState([
    { id: 1, title: 'Pet Carrier', price: 29.99, category: 'Accessories', image: PetIcon }, 
    { id: 2, title: 'Cat Bowl', price: 20.99, category: 'Bowls', image: BowlIcon },
    { id: 3, title: 'Dog Leash', price: 9.99, category: 'Accessories', image: LeashIcon },
    { id: 4, title: 'Dog Bed', price: 49.99, category: 'Furniture', image: BedIcon },
    { id: 5, title: 'Hamster Wheel', price: 19.99, category: 'Toys', image: WheelIcon },
    { id: 6, title: 'Turtle Tank', price: 75.99, category: 'Furniture', image: TankIcon },
  ]);

  const [activePet, setActivePet] = useState("Cat");
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPrice, setFilterPrice] = useState([9, 399]); // Initializing with a price range
  const [popularProducts] = useState([
    { id: 7, title: 'Premium Cat Food', price: 99 },
    { id: 8, title: 'Premium Dog Food', price: 220 },
    { id: 9, title: 'Cat Bed', price: 49.99 },
  ]);

  const handlePageChange = (direction) => {
    if (direction === 'next') {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev') {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  const handlePetChange = (pet) => {
    setActivePet(pet);
    // Add logic to filter products by pet category
  };

  const handleCategoryChange = (category) => {
    setFilterCategory(category);
    // Add logic to filter by category
  };

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    setFilterPrice([value, filterPrice[1]]);
  };

  return (
    <div>
      <Header />
      <About />

      {/* Shop by Pet Section */}
      <div className="shop-by-pet">
        <h2>Shop by Pet</h2>
        <div className="pet-selection">
          <button onClick={() => handlePetChange('Cat')}>
            <img src={CatIcon} alt="Cat" className={`pet-icon ${activePet === 'Cat' ? 'active' : ''}`} />
            <p>Cat</p>
          </button>
          <button onClick={() => handlePetChange('Hamster')}>
            <img src={HamsterIcon} alt="Hamster" className={`pet-icon ${activePet === 'Hamster' ? 'active' : ''}`} />
            <p>Hamster</p>
          </button>
          <button onClick={() => handlePetChange('Dog')}>
            <img src={DogIcon} alt="Dog" className={`pet-icon ${activePet === 'Dog' ? 'active' : ''}`} />
            <p>Dog</p>
          </button>
          <button onClick={() => handlePetChange('Parrot')}>
            <img src={ParrotIcon} alt="Parrot" className={`pet-icon ${activePet === 'Parrot' ? 'active' : ''}`} />
            <p>Parrot</p>
          </button>
          <button onClick={() => handlePetChange('Rabbit')}>
            <img src={RabbitIcon} alt="Rabbit" className={`pet-icon ${activePet === 'Rabbit' ? 'active' : ''}`} />
            <p>Rabbit</p>
          </button>
          <button onClick={() => handlePetChange('Turtle')}>
            <img src={TurtleIcon} alt="Turtle" className={`pet-icon ${activePet === 'Turtle' ? 'active' : ''}`} />
            <p>Turtle</p>
          </button>
        </div>

        {/* Pagination Arrows for Pet Category */}
        <div className="pet-navigation">
          <button onClick={() => handlePageChange('prev')}><BiLeftArrow /></button>
          <button onClick={() => handlePageChange('next')}><BiRightArrow /></button>
        </div>
      </div>
       

      {/* Filter Section */}
      <div className="filter-container">
        <div className="filter-options">
          <h3>Filter by categories</h3>
          <div>
            <label>
              <input type="checkbox" onChange={() => handleCategoryChange('Furniture')} />
              Furniture
            </label>
            <label>
              <input type="checkbox" onChange={() => handleCategoryChange('Bowls')} />
              Bowls
            </label>
            <label>
              <input type="checkbox" onChange={() => handleCategoryChange('Clothing')} />
              Clothing
            </label>
          </div>

         

          <h3>Popular products</h3>
          <ul>
            {popularProducts.map((product) => (
              <li key={product.id}>
                {product.title} - ${product.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
{/* new Filter Section */}
<div className="filter-container">
  <div className="filter-options">
    <div className="filter-section">
      {/* Filter by Brands */}
      <div className="filter-by-brands">
        <h3>Filter by brands</h3>
        <ul>
          {filters.brands.map((brand, index) => (
            <li key={index}>
              <input type="checkbox" id={`brand-${index}`} />
              <label htmlFor={`brand-${index}`}>{brand}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Filter by Categories */}
      <div className="filter-by-categories">
        <h3>Filter by categories</h3>
        <ul>
          <li>
            <input type="checkbox" onChange={() => handleCategoryChange('Furniture')} />
            Furniture
          </li>
          <li>
            <input type="checkbox" onChange={() => handleCategoryChange('Bowls')} />
            Bowls
          </li>
          <li>
            <input type="checkbox" onChange={() => handleCategoryChange('Clothing')} />
            Clothing
          </li>
        </ul>
      </div>
    </div>

    {/* Filter by Price */}
    <div className="filter-by-price">
      <h3>Filter by Price</h3>
      <input type="range" min="9" max="399" value={filterPrice[0]} onChange={handlePriceChange} />
      <span>${filterPrice[0]}</span>
    </div>
  </div>
</div>

      {/* Shop Products */}
      <div className="shop-container">
        <div className="shop-header">
          <h1>Shop</h1>
          <p>Discover our latest products</p>
        </div>
        <div className="shop-products">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <button>
                <FcLike />
              </button>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="pagination">
          <button onClick={() => handlePageChange('prev')}>
            <BiLeftArrow />
          </button>
          <p>
            Page {currentPage} of {Math.ceil(products.length / itemsPerPage)}
          </p>
          <button onClick={() => handlePageChange('next')}>
            <BiRightArrowAlt />
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
    {/* Background image for Slide 1 */}
    <img 
      src={Shape} 
      alt="background-shape" 
      className="BackGroundShape" 
      style={{ height: '30px', width: '30px', filter: 'brightness(0.3)' }} 
    />
    <img 
      src={Bird} 
      alt="background-bird" 
      className="BackGroundBird" 
      style={{ height: '200px', width: '200px' }} 
    />
    <img 
      src={ptImage} 
      alt="background-slide1" 
      className="BackGroundImage" 
      style={{ 
        height: '90%', 
        width: '100%', 
        objectFit: 'cover', 
        position: 'absolute', 
        filter: 'brightness(0.4)',
        top: 0, 
        left: 0, 
        zIndex: -1 // Behind the content 
      }} 
    />
    <div className="HomeContents">
      <p className="p_color">Pet Dabang</p>
      <div className="HomeContents_h">
        <h1>A pet store with</h1>
        <h1>everything you need</h1>
      </div>
      <div className="HomeContents_p">
        <p>"Explore the joy of adopting and see how your life can change. "</p>
        <p>Let’s help our furry friends find happiness, one adoption at a time.</p>
      </div>
      <button className="Adopt-btn">Shop Now</button>
    </div>
  </div>
</div>

{/* Slide 2 */}
<div className="HomeBody">
  <div className="Homeleft">
    {/* Background image for Slide 2 */}
   
      <img 
      src={Shape} 
      alt="background-shape" 
      className="BackGroundShape" 
      style={{ height: '30px', width: '30px' }} 
    />
    <img 
      src={Bird} 
      alt="background-bird" 
      className="BackGroundBird" 
      style={{ height: '200px', width: '200px' }} 
    />
    
     <img 
      src={caImage} 
      alt="background-slide1" 
      className="BackGroundImage" 
      style={{ 
        height: '90%', 
        width: '100%', 
        objectFit: 'cover', 
        position: 'absolute', 
        filter: 'brightness(0.5)',
        top: 0, 
        left: 0, 
        zIndex: -1 // Behind the content 
      }} 
   
    />
    <div className="HomeContents">
      <p className="p_color">Pet Dabang</p>
      <div className="HomeContents_h">
        <h1>Find your perfect furry friend!</h1>
        <h1>Join us and give pets a loving home.</h1>
      </div>
      <div className="HomeContents_p">
        <p>Ready to bring a new member into your family?</p>
        <p>Our adoption center has pets of all breeds and personalities,</p>
        <p> just waiting to meet their forever homes.</p>
      </div>
      <button className="Adopt-btn">Learn More</button>
    </div>
  </div>
</div>

  

      </Slider>
    </div>
  );
};

export default Shop;