const express = require('express')
const expressip = require('express-ip');
const path = require('path')
const hbs = require('hbs')
const translate = require('@vitalets/google-translate-api');
var ip2location = require('ip-to-location');
const countryToLang = require('./utils/countrytolang')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

const port = process.env.PORT || 3000


//create const path for handle bars views directory
let location=''
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up handle bars engine and views location
app.use(expressip().getIpInfoMiddleware);

app.set("PORT", port);
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req,res)=>{
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
        const ipObject=req.ip
        let countrycode=''
        ip2location.fetch('209.58.139.51', function(err, res){
            countrycode=res.country_code
        })
        // location=req.ipInfo.country
        location=countryToLang(countrycode)

        if (!location){
            location='en'
        }
        
    if (!req.query.adress) {
    translate('You have to give a location.', {to: location}).then(data => {
        return res.send({
            error: data.text
        })
    }).catch(err => {
        console.log(err)
    });
    } else if(req.query.adress.length>20){
        translate('You must give a shorter location.', {to: location}).then(data => {
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

            translate(error, {to: location}).then(data => {
                return res.send({
                    error: data.text
                })
            }).catch(err => {
                console.log(err)
            });

            
        } else {
            let text1=''
            let text2=''
            let text3=''

            translate('The temperature is:', {to: location}).then(data => {
                text1=data.text
                translate('degrees Celsius', {to: location}).then(data => {
                    text2=data.text
                    translate('The chance of precipitation is:', {to: location}).then(data => {
                        text3=data.text
                        forecast(latitude, longitude, location, (error,{summary,degrees,chanceOfRain})=> {
                            if (error) {
                                return res.send({error})
                            } else {
                                if (matchingPlaceName){
                                    res.send({location: matchingPlaceName,
                                        summary,
                                        degrees,
                                        chanceOfRain: chanceOfRain*100,
                                        text1,
                                        text2,
                                        text3
                                    })
                                   
                                } else {
                                    res.send({location: nameplace,
                                        summary,
                                        degrees,
                                        chanceOfRain: chanceOfRain*100,
                                        text1,
                                        text2,
                                        text3,
                                    })
                                } 
                            }
                  })
                        
                    }).catch(err => {
                        console.log(err)
                    });
                }).catch(err => {
                    console.log(err)
                });
            }).catch(err => {
                console.log(err)
            });
                  }
            
})
}
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
