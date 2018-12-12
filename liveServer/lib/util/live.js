const fs = require('fs')
const path = require('path')
const ffmpeg = require('fluent-ffmpeg')

module.exports = {
  pushVideo(fileName, data) {
    const _self = this
    const array = Object.keys(data).map(key => {
      return data[key]
    })
    const buf = new Uint8Array(array)
    const filepath = path.resolve('public/assets/video', fileName + '.webm')
    fs.appendFile(
      filepath,
      buf,
      function (err) {
        if (err) {
          console.log(err)
        }
      }
    )
  },
  pushStream(fileName) {
    const inputPath = '/public/assets/video'+ fileName + '.webm'
    const outputPath = 'rtmp://localhost:1935/live/' + fileName
    const outputStream = fs.createWriteStream(outputPath)
    console.log('推流开始')
    ffmpeg(inputPath)
      .inputOptions('-re')
      .inputOptions('-ac 2')
      .addInput('./bin/logo.png')
      .complexFilter([{
          filter: 'scale',
          options: [1080, -1],
          inputs: '[0:v]',
          outputs: 'c'
        },
        {
          filter: 'scale',
          options: [200, -1],
          inputs: '[1:v]',
          outputs: 'logo'
        },
        {
          filter: 'overlay',
          options: {
            x: 'main_w-overlay_w-5',
            y: 5
          },
          inputs: ['c', 'logo'],
          outputs: ['output', 'a']
        }
      ], 'output')
      .on('start', function (commandLine) {
        console.log('Spawned Ffmpeg with command: ' + commandLine);
      })
      .on('error', function (err, stdout, stderr) {
        console.log('error: ' + err.message);
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
      })
      .on('end', function () {
        console.log('Processing finished !');
      })
      .addOptions([
        '-vcodec libx264',
        '-preset veryfast',
        '-crf 22',
        '-maxrate 1000k',
        '-bufsize 3000k',
        '-acodec libmp3lame',
        '-ac 2',
        '-ar 44100',
        '-b:a 96k'
      ])
      .format('flv')
      .pipe(outputStream, {
        end: true
      })
  },
}