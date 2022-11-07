const fs = require('fs')
const chalk = require('chalk')

// Other
global.port = process.env.PORT || 8080;
global.ownername = 'Aditya Nurosyid'
global.owner = ['6282189387018']
global.packname = 'Created By ❤️️'
global.author = 'whatsapp-bot'
global.sessionName = 'session'
global.thumb = fs.readFileSync('./lib/whatsapp-bot.ico')
global.fla = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=WHATSAPP-BOT'
global.prefa = ['/']
global.sp = '⭔'
global.mess = {
  admin: '🙅  Command ini hanya bisa digunakan oleh admin grup!',
  botAdmin: 'Jadikan bot sebagai admin terlebih dahulu! 🙏',
  owner: '⚠️ Command ini khusus Owner-sama! ⚠️',
  group: '👥  Command ini hanya bisa digunakan di dalam grup!',
  private: '⚡Fitur Digunakan Hanya Untuk Private Chat!',
  bot: '♥️Fitur Khusus Pengguna Nomor Bot',
  done: 'Done, ~♥️',
  wait: '```Loading, 🚀```',
  text: 'Apa Yang Mau Di Cari? 🔎',
  error: 'Ups Sepertinya Terjadi Kesalahan',
  now: 'Fitur Ini Sudah Di Gunakan!'
}

global.rules = `*── 「 RULES AND FAQ 」 ──*

1. Jangan spam bot. 🙅
Sanksi: *⚠️ WARN/SOFT BLOCK*

2. Jangan telepon bot. ☎️
Sanksi: *❎ SOFT BLOCK*

3. Jangan mengeksploitasi bot.😖
Sanksi: *‼️ PERMANENT BLOCK ‼️*

🗯️ Bot tidak atau lambat merespon ?
➡️ Mungkin dipengaruhi oleh jaringan, signal, banned oleh Whatsapp dan beberapa asalan. Tetap patuhi rules‼️

🗯️ Dimana saya bisa mendapatkan Script dari bot ini ?
➡️ Script ini masih private dan tidak pernah diperjual belikan ,bijaklah dalam mengetahui penipu.

🗯️ Boleh saya menambah ke grup?
➡️ Untuk sementara bot dalam status free to add.

🗯️ Prefixnya apa ya?
➡️ Bot ini menggunakan multi prefix. Berarti anda bisa menggunakan prefix #, . , Dan prefix wajar lainnya.

🗯️ Kak, kok syaa chat owner tidak direspon?
➡️ Owner hanya merespon pertanyaan seputar bot Dan kendala eror, tidak untuk kenalan ataupun mengemis script.


Jika sudah dipahami rules-nya, silakan ketik *.help* untuk memulai!

⚠️ Segala kebijakan dan ketentuan Whatsapp-Bot di pegang oleh owner dan segala perubahan kebijakan, sewaktu waktu owner berhak mencabut, memblokir user(*﹏*) 

Arigatou Gozaimasu! Untuk kalian user ramah dan Beberapa orang yg ikut membantu juga dalam project pembuatan WhatsApp-Bot
😖🙏`


let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright(`Update'${__filename}'`))
  delete require.cache[file]
  require(file)
})
