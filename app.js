const express = require('express');
const app = express();
const pool = require('./src/utils/database');
const path = require('path');
const hbs = require('hbs');
const searchRouter = require('./src/utils/search');
// Set up Handlebars as the view engine
app.set('view engine', 'hbs');
// Set the path to the views directory
app.set('views', path.join(__dirname, 'templates', 'views'));
// Register partials directory
hbs.registerPartials(path.join(__dirname, 'templates', 'partials'));
// Parse the request body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
// Use the search router for handling search requests
app.use('/search', searchRouter);
// Define a GET endpoint for the contact form
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});
// Define a POST endpoint for submitting the contact form
app.post('/contact', async (req, res) => {
  const { name, email, phone, comment } = req.body;
  console.log(`New Contact Form submission: ${name}, ${email}, ${phone}, ${comment}`);
  try {
    const conn = await pool.getConnection();
    const [rows, fields] = await conn.execute(
      'INSERT INTO contacts (name, email, phone, comment) VALUES (?, ?, ?, ?)',
      [name, email, phone, comment]
    );
    console.log(`Inserted ${rows.affectedRows} row(s)`);
    conn.release();
    res.send('Thanks for contacting us!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
// Define endpoints for other pages
app.get('/', (req, res) => {
  res.render('index', { title: 'GutSavvi', name: 'Team 6' });
});
app.get('/resources', (req, res) => {
  res.render('resources', { title: 'Resources', name: 'Team 6' });
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us', name: 'Team 6' });
});
app.get('/nutrition', (req, res) => {
  res.render('nutrition', { title: 'Nutrition', name: 'Team 6' });
});
// Define a catch-all 404 handler
app.get('*', (req, res) => {
  res.render('404', { title: '404', errorMessage: 'Help article not found' });
});
// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});