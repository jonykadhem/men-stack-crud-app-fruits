const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"])
const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Fruit = require('./models/fruit.js')
const path = require('path')



mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected',()=>{
    console.log(`connected to mongoDB ${mongoose.connection.name} 🥭`)
})
const app = express()
app.use(morgan('div'))
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")))


//Home
app.get('/', async(req, res) =>{
    res.render('home.ejs')
})

// Get /fruits/new for creating fruit
app.get('/fruits/new', async(req,res)=> {
    res.render('new.ejs')
})
app.post('/fruits', async (req,res) => {
    const fruitData = {}

    fruitData.name = req.body.name
    if (req.body.isReadyToEat === 'on') {
        fruitData.isReadyToEat = true
    } else {
        fruitData.isReadyToEat = false        
    }

    let createdFruit = await Fruit.create(fruitData)

 res.redirect('/')
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

    // to find and update item in object 
    // let allReadyToEat = await Fruit.findOneAndUpdate({name : 'Melon'}, 
        // {name: 'Pineapple'}, {new: true})


    // to find by id and update content
    // let allReadyToEat = await Fruit.findByIdAndUpdate(
    //     '6a4f6a3f46b63d65e46d31e6', 
    //     {name: 'Green Apple'}, {new: true})

    // to delet by id
    //  let allReadyToEat = await Fruit.findByIdAndDelete(
    //     '6a4f6a3f46b63d65e46d31e6',)

    // to delet by name or anything else 
    //      let allReadyToEat = await Fruit.findOneAndDelete(
    //     '6a4f6a3f46b63d65e46d31e6',)

    // to delet all 
    //  let allReadyToEat = await Fruit.deleteMany(
    //     '6a4f6a3f46b63d65e46d31e6',)