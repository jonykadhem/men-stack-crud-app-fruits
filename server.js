const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"])
const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Fruit = require('./models/fruit.js')

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected',()=>{
    console.log(`connected to mongoDB ${mongoose.connection.name} 🥭`)
})
const app = express()
app.use(morgan('div'))

app.get('/', async(req, res) =>{
    res.render('home.ejs')
})

app.get('/fruits', async(req,res)=> {
    
    let allReadyToEat = await Fruit.find({isReadyToEat : true})


    
    res.send(allReadyToEat)
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
});


//code graveyard ==================================>

    // creating a fruit
    // const fruitData = {}
    // fruitData.name = 'peach'
    // fruitData.isReadyToEat = false

    // let createdFruit = await Fruit.create(fruitData)

    // finding all fruits
    // let allFruits = await Fruit.find()

    // finding a fruit like only 'Melon'
    // let allMelons = await Fruit.find({name:'Melon'})

    // finding all ready fruits 'true '
    // let allReadyToEat = await Fruit.find({isReadyToEat : true})