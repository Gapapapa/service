exports.run = {
   async: async (m, { client, body, prefixes }) => {
      try {
         const d = new Date(new Date() + 12 * 60 * 60 * 1000) // 12 jam
         let week = d.toLocaleDateString('id', { weekday: 'long' }) 
         let date = d.toLocaleDateString('id', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
         })
         let time = d.toLocaleTimeString('id')
         const message = `Hai @${m.sender.split`@`[0]} 🧛🏻

Terima kasih sudah menghubungi layanan bantuan, akun ini sepenuhnya adalah bot sebagai sarana informasi singkat terkait produk carti bot.

Kirim angka sesuai informasi yang kamu butuhkan :

    *1*. Bagaimana cara membeli Layanan Premium ?
    *2*. Bagaimana cara membeli Layanan Rental Bot ?
    *3*. Kenapa akun bisa terkena Suspensi/Banned ?

> Jika ingin menghubungi admin secara langsung untuk keperluan *Pembelian Premium*, *Rental Bot* dan *Layanan Bantuan Carti BOT* hubungi via whatsapp : wa.me/6285771647181`
         let user = global.db.users.find(v => v.jid == m.sender)
         if (!user) return         
         user.time = user.time || 0
         let cur = user.time + 12 * 60 * 60 * 1000 // 12 jam         
         if (m.text && (!user.time || user.time === 0 || cur - new Date() <= 0)) {
            user.time = new Date().getTime()
            client.reply(m.chat, message)
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}