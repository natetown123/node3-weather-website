
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars Engine and Views Location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static Directory to Serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Nathan Wheeler'
    })
} )

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nathan wheeler'
    })
} )

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App',
        name: 'Nathan Wheeler',
        message: "This is a help message that we can use to print to the screen"
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

   geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        else if(!latitude){
            return res.send({
                error
            })
        }
            forecast(latitude, longitude, (error, forecastData) =>{
                if(error){
                    return res.send({
                        error
                    })
                }
                    
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
                
            })
        
    })


})

app.get('/help/*', (req, res) => {
    res.render('error', {
        page: "Help Route Error"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        page: "General Catch all error"
    })
})


app.listen(port , () => {
    console.log(`Server is listening on port ${port}`)
}) 
