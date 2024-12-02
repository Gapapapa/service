exports.run = {
   usage: ['3'],
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
         let msg = `*KENAPA AKUN BISA TERKENA SUSPENSI/BANNED ?*
*Updated* : 23/10/2024 02:11:20 WIB

Alasan utama yang menyebabkan akun terkena suspensi/banned adalah melanggar aturan.

Apa saja aturannya? silahkan ketik rules di playboi carti bot.

Akun yang terkena suspensi/banned bisa dipulihkan kembali secara gratis dengan menghubungi admin via whatsapp : wa.me/6285771647181

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