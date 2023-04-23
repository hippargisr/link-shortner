const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
var cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define URL schema and model
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
});

const Url = mongoose.model('Url', urlSchema);

app.get('/', async (req, res) =>{
    res.send("HELLO TO MY APP!");
});

// Handle POST request to create a short URL
app.post('/url', async (req, res) => {
  const { originalUrl } = req.body;
  console.log(req.body);
  // Generate short URL using shortid package
  const shortUrl = shortid.generate();

  // Save URL to database
  const url = new Url({
    originalUrl,
    shortUrl,
  });

  await url.save();

  // Return short URL in response
  res.json({ shortUrl });
});

// Handle GET request to redirect to original URL
app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  // Find URL in database by short URL
  const url = await Url.findOne({ shortUrl });

  if (!url) {
    // If URL is not found, return 404 error
    return res.status(404).send('URL not found');
  }

  // Redirect to original URL
  res.redirect(url.originalUrl);
});

// Start server
const port = process.env.PORT || 7070;
app.listen(port, () => console.log(`Server started on port ${port}`));
