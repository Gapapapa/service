exports.run = {
   usage: ['1'],
   async: async (m, {
      client,
      args,
      text,
      isPrefix,
      command,
      env,
      Scraper,
      Func
   }) => {
      try {
         let msg = `*BAGAIMANA CARA MEMBELI LAYANAN PREMIUM ?*
*Updated* : 23/10/2024 02:11:20 WIB

Ketik *premium* di playboi carti bot lalu kamu akan diberikan arahan untuk melakukan pembayaran.

Jika invoice sudah dibayar akan otomatis diproses oleh sistem.

> © 𝕻𝖑𝖆𝖞𝖇𝖔𝖎 𝕮𝖆𝖗𝖙𝖎 𝕬𝖘𝖘𝖎𝖘𝖙𝖆𝖓𝖙`
m.reply(msg)
      } catch (e) {
         console.log(e)
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   restrict: true,
   cache: true,
   location: __filename
}