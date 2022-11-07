require("./config")
const {
    default: makeWASocket,
    DisconnectReason,
    AnyMessageContent,
    delay,
    useMultiFileAuthState,
    makeInMemoryStore,
    jidDecode,
    fetchLatestBaileysVersion
} = require("@adiwajshing/baileys")
const {
    Boom
} = require("@hapi/boom")
const pino = require("pino")
const qrcode = require("qrcode")
const express = require("express")
const chalk = require("chalk")
const fs = require("fs")
const SocketIO = require('socket.io')
const yargs = require('yargs/yargs')
const path = require("path")
const con = require('./lib')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/myfunc')
const { color, bgcolor, customlog } = require("./lib/color")
//const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' })})

fs.existsSync('./lib/store/baileys_store.json') && con.readFromFile('./lib/store/baileys_store.json')
setInterval(() => {
    con.writeToFile('./lib/store/baileys_store.json')
}, 10000)

const log = console.log;
const PORT = port
const app = express()
let _qr = 'invalid'
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

const start = async () => {
    const { state, saveCreds } = await useMultiFileAuthState(path.resolve(`${sessionName}`), pino({ level: 'silent' }))
    let { version, isLatest } = await fetchLatestBaileysVersion()

    console.log(`Using: ${version}, newer: ${isLatest}`)
    const client = makeWASocket({
        printQRInTerminal: true,
        auth: state,
        logger: pino({ level: 'silent' }),
        version,
    })
    con.bind(client.ev)
    client.public = true

    client.ev.on('contacts.set', () => {
        console.log('got contacts', Object.values(con.contacts).length)
    })

    client.ev.on('creds.update', saveCreds)
    client.ev.on('connection.update', async (up) => {
        const { lastDisconnect, connection } = up
        if (connection) {
            console.log('Connection Status: ', connection)
        }

        if (connection === 'close') {
            let reason = new Boom(lastDisconnect.error).output.statusCode
            if (reason === DisconnectReason.badSession) {
                console.log(`Bad Session File, Please Delete ${sessionName}-session and Scan Again`)
                client.logout()
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log('Connection closed, reconnecting....')
                start()
            } else if (reason === DisconnectReason.connectionLost) {
                console.log('Connection Lost from Server, reconnecting...')
                start()
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log('Connection Replaced, Another New Session Opened, Please Close Current Session First')
                client.logout()
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(`Device Logged Out, Please Delete ${sessionName}-session and Scan Again.`)
                client.logout()
            } else if (reason === DisconnectReason.restartRequired) {
                console.log('Restart Required, Restarting...')
                start()
            } else if (reason === DisconnectReason.timedOut) {
                console.log('Connection TimedOut, Reconnecting...')
                start()
            } else {
                client.end(`Unknown DisconnectReason: ${reason}|${lastDisconnect.error}`)
            }
        }
    })

    // messages.upsert
    client.ev.on('messages.upsert', async chatUpdate => {
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
            mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return
            if (!client.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            m = smsg(client, mek, con)
            var body = (m.mtype === "conversation") ? m.message.conversation : (m.mtype == "imageMessage") ? m.message.imageMessage.caption : (m.mtype == "videoMessage") ? m.message.videoMessage.caption : (m.mtype == "extendedTextMessage") ? m.message.extendedTextMessage.text : (m.mtype == "buttonsResponseMessage") ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "templateButtonReplyMessage") ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === "messageContextInfo") ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ""
            var budy = (typeof m.text == "string" ? m.text : "")
            var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®â?+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®â?+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
            const isCmd = body.startsWith(prefix)
            const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
            const args = body.trim().split(/ +/).slice(1)
            const pushname = m.pushName || "No Name"
            const botNumber = await client.decodeJid(client.user.id)
            const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender)
            const itsMe = m.sender == botNumber ? true : false
            const text = q = args.join(" ")
            const quoted = m.quoted ? m.quoted : m
            const mime = (quoted.msg || quoted).mimetype || ""
            const isMedia = /image|video|sticker|audio/.test(mime)

            // Group
            const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch(e => { }) : ""
            const groupName = m.isGroup ? groupMetadata.subject : ""
            const participants = m.isGroup ? await groupMetadata.participants : ""
            const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ""
            const groupOwner = m.isGroup ? groupMetadata.owner : ""
            const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
            const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false

            if (!client.public) {
                if (!m.key.fromMe) return
            }

            if (m.message) {
                client.readMessages([m.key])
                console.log(chalk.black(chalk.bgGreen('[ CHAT ]')), chalk.black(chalk.blueBright(new Date)), chalk.black(chalk.greenBright(budy || m.mtype)) + '\n' + chalk.magentaBright('- from'), chalk.blueBright(pushname), chalk.greenBright(m.sender) + '\n' + chalk.blueBright('- in'), chalk.cyanBright(m.isGroup ? pushname : 'Private Chat', m.chat))
            }
            switch (command) {
                default:
            }
        } catch (err) {
            console.log(color('[ERROR]', 'blue'), err)
        }
    })
}
start()

app.use(async (req, res) => {
    res.setHeader('content-type', 'image/png')
    res.end(await qrcode.toBuffer(_qr))
})

app.listen(PORT, () => {
    console.log('Aplikasi berjalan di port', PORT)
})

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update'${__filename}'`))
    delete require.cache[file]
    require(file)
})