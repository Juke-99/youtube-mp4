const path       = require('path');
const fs         = require('fs');
const ytdl       = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg     = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const videoID = process.argv[2];
const videoFile = videoID + '.mp4';

const url = 'https://www.youtube.com/watch?v=' + videoID;
const storedAudio = './music/comp_' + videoFile ;
const mainAudioFile = './music/' + videoFile;
//const url = process.argv[2];
//const storedAudio = './music/comp_' + process.argv[3];
//const mainAudioFile = './music/' + process.argv[3];

ytdl(url, { filter: format => {
  return format.container === 'm4a' && !format.encoding; } })
  // Write audio to file since ffmpeg supports only one input stream.
  .pipe(fs.createWriteStream(storedAudio))
  .on('finish', () => {
    ffmpeg()
      .input(ytdl(url, { filter: format => {
        return format.container === 'mp4' && !format.audioEncoding;
      }}))
      .videoCodec('copy')
      .input(storedAudio)
      .audioCodec('copy')
      .save(mainAudioFile)
      .on('error', console.error)
      .on('progress', progress => {
        process.stdout.cursorTo(0);
        process.stdout.clearLine(1);
        process.stdout.write(progress.timemark);
      }).on('end', () => {
        fs.unlink(storedAudio, err => {
          if(err) console.error(err);
          else console.log('\nfinished downloading');
        });
      });
  });
