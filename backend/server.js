const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/database');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');
const path= require('path');
const expressMessages = require('express-messages');

// Connect to MongoDB
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Enable CORS
app.use(cors());
app.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
}));

app.use(flash());
app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const pages = require('./routes/pages');
const pet = require('./routes/pet');
const userRoutes = require('./routes/user');
const Productroute = require('./routes/petproducts');
const Order = require('./routes/Order');
const request = require('./routes/AdoptReq');
const cat= require('./routes/category');

app.use('/', pages);
app.use('/cat',cat);
app.use('/pet',pet);
app.use('/user', userRoutes);
app.use('/order',Order);
app.use('/request',request);
app.use('/PetFood',Productroute);
const Products= require('./models/PetProducts');
app.get("/product-quantities", async (req, res) => {
  try {
    console.log("Fetching pet products quantity...");
    const petFoodData = await Products.find({});
    
    const quantityData = petFoodData.map(product => ({
      name: product.name,
      quantity: product.qty
    }));

    res.status(200).send({ message: 'Pet products quantity fetched successfully!', quantities: quantityData });
  } catch (error) {
    console.error('Error fetching pet products quantity:', error);
    res.status(500).send({ error: 'Failed to fetch pet products quantity' });
  }
});




// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
