exports.run = {
   usage: ['2'],
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
         let msg = `*BAGAIMANA CARA MEMBELI LAYANAN RENTAL BOT ?*
*Updated* : 23/10/2024 02:11:20 WIB

Pembelian rental bot kamu bisa chat ke whatsapp admin untuk info selanjutnya : wa.me/6285771647181

Pilih paket sesuai kebutuhan dan pilih metode pembayaran, jika sudah dibayar akan langsung diproses oleh admin.

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