'use strict'

require('dotenv').config()
process.env["NTBA_FIX_319"] = 1;
const express = require('express')
const app = express()

const Telegram = require('node-telegram-bot-api')
const token = process.env.TELEGRAM_TOKEN;
const bot = new Telegram(token, { polling: true });
const noSpace = require('./noSpace')
const noQuestion = require('./noQuestion')
const axios = require('axios')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req,res) => {
    console.log('OK Testing')
})

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    var message = msg.text.toString();
    // console.log(typeof message)
    console.log('message-------', message,chatId)
    if(message === '/start' || message.length === 0) {
        bot.sendMessage(chatId, 'Hi! please send me the word you want to know');    
    } else {
        let checkNoSpace = noSpace(message)
        let checkNoQuestion = noQuestion(message)
        console.log('no question------', checkNoQuestion, 'no space-----', checkNoSpace)
        if (!checkNoQuestion && !checkNoSpace) {
            axios({
                url: `https://dictionaryapi.com/api/v3/references/sd2/json/${message}?key=${process.env.MWKEY}`
            })
                .then(({data}) => {
                    if (data && data.length > 0 && data[0].shortdef && data[0].shortdef.length > 0) {
                        let responses = `According to Merriam-Webster, ${message} can be defined as ${data[0].shortdef[0]}.`
                        bot.sendMessage(chatId, responses);
                    } else {
                        bot.sendMessage(chatId, 'I am sorry, the word you search is not found');
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } else if(!checkNoQuestion && checkNoSpace) {
            bot.sendMessage(chatId, `
                Please check your input!
                \n- There should be no white spaces in your input
                \n- I can only receive one word at a time
            `);
        } else if (checkNoSpace) { 
            bot.sendMessage(chatId, `
                I am sorry, I can'\t accept complex question
                \nPlease download LeksaBot app on GooglePlay for full feature
            `);
        } 
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening to PORT ', process.env.PORT)
})