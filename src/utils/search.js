const express = require('express');
const router = express.Router();
// const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    // Your search route logic here

    //  app.get("/search", async (req, res) => {
    const { default: fetch } = await import('node-fetch');

    const query = req.query.query || "";
    const cuisine = req.query.cuisine || "";
    const diet = req.query.diet || "";
    const intolerances = req.query.intolerances || "";

    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=33f44c685ed146238f151c263016b42f&query=${query}&cuisine=${cuisine}&diet=${diet}&intolerances=${intolerances}&addRecipeInformation=true&fillIngredients=true&instructionsRequired=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.log(error);
        res.json({ error: "An error occurred." });
    }
    // });
});

module.exports = router;





//   module.exports = nutrition