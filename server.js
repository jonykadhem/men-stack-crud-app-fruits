const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"])
const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected',()=>{
    console.log(`connected to mongoDB ${mongoose.connection.name} 🥭`)
})
const app = express()
app.use(morgan('div'))

app.get('/', async(req, res) =>{
    res.render('home.ejs')
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
