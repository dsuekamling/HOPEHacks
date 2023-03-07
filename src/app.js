const path = require('path');
const express = require('express');
const hbs = require('hbs');
const http = require('http');
const fs = require('fs');
const searchRouter = require('./utils/search');

const app = express();


app.use('/search', searchRouter);

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
//setting up path for partials
const partialsPath = path.join(__dirname, '../templates/partials')

http.createServer(function (req, res) {
    if (req.url === '/public/css/style.css') {
        fs.readFile(__dirname + '/public/css/style.css', function (err, data) {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/css'
            });
            res.write(data);
            res.end();
        });
    }
});

app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath))

// app.get("/search", async (req, res) => {
//     const { default: fetch } = await import('node-fetch');

//     const query = req.query.query || "";
//     const cuisine = req.query.cuisine || "";
//     const diet = req.query.diet || "";
//     const intolerances = req.query.intolerances || "";

//     const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=33f44c685ed146238f151c263016b42f&query=${query}&cuisine=${cuisine}&diet=${diet}&intolerances=${intolerances}&addRecipeInformation=true&fillIngredients=true&instructionsRequired=true`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       res.json(data);
//     } catch (error) {
//       console.log(error);
//       res.json({ error: "An error occurred." });
//     }

// });

app.get('', (req, res) => {
    res.render('index', {
        title: 'GutSavvi',
        name: 'Team 6'
    })
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        helptxt: 'Need a form and some design',
        title: 'Contact Us!',
        name: 'Team 6'

    })
})

app.get('/resources', (req, res) => {
    res.render('resources', {
        helptxt: 'This is some helpful text.',
        title: 'Resources',
        name: 'Team 6'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        helptxt: 'This is about us and our mission',
        title: 'About Us',
        name: 'Team 6'

    })
})

app.get('/nutrition', (req, res) => {
    res.render('nutrition', {
        helptxt: 'This is where we will add the nutrition api functionaity (reference the weather app for help)',
        title: 'Nutrition',
        name: 'Team 6'

    })
})


app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found'
    })
})

app.listen(5000, () => console.log('Server Listeing on 5000')
)