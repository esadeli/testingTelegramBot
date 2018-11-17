'use strict'

require('dotenv').config()
process.env["NTBA_FIX_319"] = 1;
const express = require('express')
const app = express()

const Telegram = require('node-telegram-bot-api')
const token = process.env.TELEGRAM_TOKEN;
const bot = new Telegram(token, { polling: true });
const noSpace = require('./noSpace')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req,res) => {
    console.log('OK Testing')
})

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    var message = msg.text.toString();
    console.log(typeof message)
    console.log('message-------', message,chatId)
    if(message === '/start' || message.length === 0) {
        bot.sendMessage(chatId, 'Hi! please send me the word you want to know');    
    } else {
        let check = noSpace(message)
        if(check) {
            bot.sendMessage(chatId, `
                Please check your input!
                \n- There should be no white spaces in your input
                \n- I can only receive one word at a time
            `);
        } else {
            bot.sendMessage(chatId, 'Message received');
        }
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening to PORT ', process.env.PORT)
})