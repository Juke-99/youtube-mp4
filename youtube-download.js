const fs = require('fs');
const ytdl = require('ytdl-core');

if(process.argv.length == 4) {
  ytdl(process.argv[2]).pipe(fs.createWriteStream(process.argv[3]));
} else {
  console.log('no format...');
  console.log('currently format is youtube-download.js URL YOUR_STORE_PATH');
}

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
