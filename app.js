const {Client} = require('whatsapp-web.js')
const getWikipediaPage = require('./wikipedia')
const qrcode = require('qrcode-terminal')
const dotenv = require('dotenv')
const {writeFileSync} = require('fs')


const Main = async () => {
//console.log(JSON.parse(process.env['SESSION']))
const client = new Client({
    //session: JSON.parse(process.env['SESSION'])
})

client.on('qr', (qr) => {
   
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true})
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message',  async msg => {
    if (msg.body[0] == '!') {
        await getWikipediaPage(msg.body.substring(1)).then((response) => {
            console.log('message got:', response)
            msg.reply(response);
        })
    }
})

client.on('message_create', async msg => {
    if (msg.body[0] == '!') {
        await getWikipediaPage(msg.body.substring(1)).then((response) => {
            console.log('message got:', response)
            client.sendMessage(msg.to, response)  
        })
    }
})

client.on('authenticated', ses => {
    console.log(JSON.stringify(ses))
    writeFileSync('.env', `SESSION = "${JSON.stringify(ses)}"`)

})

client.initialize()
    
}

Main()