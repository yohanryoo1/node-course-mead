const path = require('path')
const express = require('express') //express is a function
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Express route handlers
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        message: 'Use this site to get weather information in your local area!',
        name: 'Yohan Ryoo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Yohan Ryoo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text hopefully',
        name: 'Yohan Ryoo'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.searchLocation) {
        return res.send({
            error: 'You must provide a location in query string'
        })
    }

    geocode(req.query.searchLocation, (error, { lat, long, placeName: place } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                place,
                searchLocation: req.query.searchLocation
            })
        })
    })
})

app.get('/products', (req, res) => {
    //response to display when query search is not given
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    //response to display when query search IS indeed given
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errMessage: 'Help article not found',
        name: 'Yohan Ryoo'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errMessage: 'Page not found',
        name: 'Yohan Ryoo'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})