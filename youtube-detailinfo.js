const ytdl = require('ytdl-core');

ytdl.getInfo(process.argv[2], (err, info) => {
  if(err) throw err;

  console.log(info);

  /*info.forEach(index => {
    console.log(index);
  });*/
});
