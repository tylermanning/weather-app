const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup statisc directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Created by Tyler MD'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Created by Tyler MD'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Created by Tyler MD',
        message: 'Send an email if you need help bro'
    })
})
 

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Must provide an address in query"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, {temperature}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                address: req.query.address,
                temperature: temperature,
                location: location,
            })
        })
    })
}) 

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error Help Page',
        name: 'Created by Tyler MD',
        errorMessage: 'Your fucked up if you need help bro'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Created by Tyler MD',
        errorMessage: 'Page Not Found'
    })
})


app.listen(3000, () => {
    console.log('Express server is running on port 3000')
})