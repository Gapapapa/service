exports.run = {
   async: async (m, { client, body }) => {
      try {
         global.db.settings = global.db.settings || {}
         const settings = global.db.settings
         settings.online = settings.online || false // Default offline jika tidak diatur
         if (!settings.online) return // Jika fitur online nonaktif, bot tidak merespon
         const d = new Date(new Date() + 12 * 60 * 60 * 1000) // 12 jam
         let week = d.toLocaleDateString('id', { weekday: 'long' }) 
         let date = d.toLocaleDateString('id', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
         })
         let time = d.toLocaleTimeString('id')
         const message = `hai ${m.pushName}! lagi off dulu nih, whatsapp gua lagi hibernasi sementara. jangan khawatir, gua bakal balas chat lu secepat mungkin pas gua udah online lagi.

> ~ Asisten`
         let user = global.db.users.find(v => v.jid == m.sender)
         if (!user) return         
         user.time = user.time || 0
         let cur = user.time + 12 * 60 * 60 * 1000 // 12 jam         
         if (m.text && (!user.time || user.time === 0 || cur - new Date() <= 0)) {
            user.time = new Date().getTime()
            client.sendFromAI(m.chat, message)
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}