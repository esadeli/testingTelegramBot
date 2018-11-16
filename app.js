'use strict'

require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req,res) => {
    console.log('OK Testing')
})

app.get('/test', (req,res)=> {
    console.log('hi! this is testing response')
    res.status(200).json({
        msg: 'Hi This is Test'
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Listeing to PORt ', process.env.PORT)
})