"use strict";
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
require('events').EventEmitter.defaultMaxListeners = 500
const { Baileys, MongoDB, PostgreSQL, Function: Func, Config: env } = new (require('@neoxr/wb'))
const spinnies = new (require('spinnies'))(),
   fs = require('fs'),
   path = require('path'),
   colors = require('@colors/colors'),
   { platform } = require('os')
const cache = new (require('node-cache'))({
   stdTTL: env.cooldown
})
if (process.env.DATABASE_URL && /mongo/.test(process.env.DATABASE_URL)) MongoDB.db = env.database
const machine = (process.env.DATABASE_URL && /mongo/.test(process.env.DATABASE_URL)) ? MongoDB : (process.env.DATABASE_URL && /postgres/.test(process.env.DATABASE_URL)) ? PostgreSQL : new (require('./lib/system/localdb'))(env.database)
const client = new Baileys({
   type: '--neoxr-v1',
   plugsdir: 'plugins',
   sf: 'session',
   online: true,
   bypass_disappearing: true,
   // To see the latest version : https://web.whatsapp.com/check-update?version=1&platform=web
   version: [2, 3000, 1017531287]
}, {
   browser: ['Ubuntu', 'Firefox', '20.0.00']
})

/* starting to connect */
client.once('connect', async res => {
   /* load database */
   global.db = { users: [], chats: [], groups: [], statistic: {}, sticker: {}, setting: {}, ...(await machine.fetch() || {}) }

   /* save database */
   await machine.save(global.db)

   /* write connection log */
   if (res && typeof res === 'object' && res.message) Func.logFile(res.message)
})

/* print error */
client.once('error', async error => {
   console.log(colors.red(error.message))
   if (error && typeof error === 'object' && error.message) Func.logFile(error.message)
})

/* bot is connected */
client.once('ready', async () => {
   /* auto restart if ram usage is over */
   const ramCheck = setInterval(() => {
      var ramUsage = process.memoryUsage().rss
      if (ramUsage >= require('bytes')(env.ram_limit)) {
         clearInterval(ramCheck)
         process.send('reset')
      }
   }, 60 * 1000)

   /* create temp directory if doesn't exists */
   if (!fs.existsSync('./temp')) fs.mkdirSync('./temp')

   /* additional config */
   require('./lib/system/config')

   /* clear temp folder every 10 minutes */
   setInterval(async () => {
      try {
         const tmpFiles = fs.readdirSync('./temp')
         if (tmpFiles.length > 0) {
            tmpFiles.filter(v => !v.endsWith('.file')).map(v => fs.unlinkSync('./temp/' + v))
         }
      } catch { }
   }, 60 * 1000 * 10)

   /* save database send http-request every 30 seconds */
   setInterval(async () => {
      if (global.db) await machine.save(global.db)
      // if (process.env.CLOVYR_APPNAME && process.env.CLOVYR_URL && process.env.CLOVYR_COOKIE) {
      //    const response = await axios.get(process.env.CLOVYR_URL, {
      //       headers: {
      //          referer: 'https://clovyr.app/view/' + process.env.CLOVYR_APPNAME,
      //          cookie: process.env.CLOVYR_COOKIE
      //       }
      //    })
      //    Func.logFile(`${await response.status} - Application wake-up!`)
      // }
   }, 60_000)
})

/* print all message object */
client.register('message', ctx => {
   require('./handler')(client.sock, ctx)
   require('./lib/system/baileys')(client.sock)
   require('./lib/system/functions')
   require('./lib/system/scraper')
})




// client.on('group.promote', ctx => console.log(ctx))
// client.on('group.demote', ctx => console.log(ctx))
