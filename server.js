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
    
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
});


//code graveyard ==================================>

    // const fruitData = {}
    // fruitData.name = 'peach'
    // fruitData.isReadyToEat = false

    // let createdFruit = await Fruit.create(fruitData)
    // res.send(createdFruit)