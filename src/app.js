const fs = require('fs')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const osLocale = require('os-locale')
const translate = require('@vitalets/google-translate-api');

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

const port = process.env.PORT || 3000


//create const path for handle bars views directory
let location=''
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up handle bars engine and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req,res)=>{
    
(async () => {
    location = await osLocale()
    location = location.split('-')
    location = location[0]
})();
    res.render('index',{
        title: 'Weather App',
        name: 'Marian Silviu'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Marian Silviu'
    })
})

app.get('/Help', (req,res)=>{
    res.render('help',{
        help: "Please Help. I'm Stuck",
        title: 'Help',
        name: 'Marian Silviu'
    })
})


app.get('/weather', (req,res)=>{
    
    if (!req.query.adress) {
    translate('Trebuie sa dai o locatie', {to: location}).then(data => {
        return res.send({
            error: data.text
        })
    }).catch(err => {
        console.log(err)
    });
    } else {
    
   const adress=req.query.adress
   const separated=adress.split(" ")
   const otherAdress=separated.filter((element)=>isNaN(element))
    geoCode(otherAdress, (error,{latitude, longitude, nameplace, matchingPlaceName})=>{
        if (error) {

            return res.send({error})

            
        } else {
                    forecast(latitude, longitude, location, (error,{summary,degrees,chanceOfRain})=> {
                        if (error) {
                            return res.send({error})
                        } else {
                            if (matchingPlaceName){
                                res.send({location: matchingPlaceName,
                                    summary,
                                    degrees,
                                    chanceOfRain: chanceOfRain*100})
                               
                            } else {
                                res.send({location: nameplace,
                                    summary,
                                    degrees,
                                    chanceOfRain: chanceOfRain*100})
                            } 
                        }
              })
                  }
            
})
}
})

app.get('/products', (req,res)=>{
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

app.get('/help/*', (req,res)=>{
    res.render('404',{
        error: '- Help article not found.',
        title: '404 Page',
        name: 'Marian Silviu'
    })

})

app.get('*', (req,res)=>{
    res.render('404',{
        error: '- Page not found.',
        title: '404 Page',
        name: 'Marian Silviu'

    })
})


app.listen(port, ()=>{
    console.log('Server is up on port' + port + '.')
})