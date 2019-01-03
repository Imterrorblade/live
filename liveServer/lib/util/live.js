const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const caches = {};
class CacheMap {
  constructor(fileName, inputPath, outputPath, maxNum = 100) {
    this.fileName = fileName;
    this.maxNum = maxNum;
    this.inputPath = inputPath;
    this.outputPath = outputPath;
    this.buf = [];
    this.receiveNum = 0;
    this.state = 0;
  }
  appendBuf(buf) {
    this.buf = this.buf.concat(buf);
    this.receiveNum++;
  }
  writeBuf(buf) {
    if (this.receiveNum < this.maxNum) {
      this.appendBuf(buf);
    } else {
      fs.writeFile(this.inputPath, new Uint8Array(this.buf), err => {
        if(err){
          console.error(err);
        }
        this.buf = [];
        this.receiveNum = 0;
        this.startPush()
      });
    }
  }
  startPush() {
    pushStream(this.inputPath, this.outputPath);
  }
}

function pushStream(inputPath, outputPath) {
  console.log('推流开始');
  ffmpeg(inputPath)
    .inputOptions('-re')
    .inputOptions('-ac 2')
    .addInput('./bin/logo.png')
    .complexFilter(
      [
        {
          filter: 'scale',
          options: [1080, -1],
          inputs: '[0:v]',
          outputs: 'c',
        },
        {
          filter: 'scale',
          options: [200, -1],
          inputs: '[1:v]',
          outputs: 'logo',
        },
        {
          filter: 'overlay',
          options: {
            x: 'main_w-overlay_w-5',
            y: 5,
          },
          inputs: ['c', 'logo'],
          outputs: ['output', 'a'],
        },
      ],
      'output'
    )
    .on('start', function(commandLine) {
      console.log('Spawned Ffmpeg with command: ' + commandLine);
    })
    .on('error', function(err, stdout, stderr) {
      console.log('error: ' + err.message);
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
    })
    .on('end', function() {
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
      '-b:a 96k',
    ])
    .format('flv')
    .pipe(
      outputPath,
      {
        end: true,
      }
    );
}
module.exports = {
  pushVideo(fileName, data) {
    const _self = this;
    const bufarr = Object.keys(data).map(key => {
      return data[key];
    });
    // const buf = new Uint8Array(array);
    const inputPath = path.resolve('public/assets/video', fileName + '.webm');
    const outputPath = 'rtmp://localhost/live/' + fileName;
    if (fileName in caches) {
      caches[fileName].writeBuf(bufarr);
    } else {
      caches[fileName] = new CacheMap(fileName, inputPath, outputPath);
      caches[fileName].writeBuf()
    }
  },
  pushStream(fileName) {
    const inputPath = path.resolve('public/assets/video', fileName + '.webm');
    const outputPath = 'rtmp://localhost/live/' + fileName;
    const outputStream = fs.createWriteStream(outputPath);
    console.log('推流开始');
    ffmpeg(inputPath)
      .inputOptions('-re')
      .inputOptions('-ac 2')
      .addInput('./bin/logo.png')
      .complexFilter(
        [
          {
            filter: 'scale',
            options: [1080, -1],
            inputs: '[0:v]',
            outputs: 'c',
          },
          {
            filter: 'scale',
            options: [200, -1],
            inputs: '[1:v]',
            outputs: 'logo',
          },
          {
            filter: 'overlay',
            options: {
              x: 'main_w-overlay_w-5',
              y: 5,
            },
            inputs: ['c', 'logo'],
            outputs: ['output', 'a'],
          },
        ],
        'output'
      )
      .on('start', function(commandLine) {
        console.log('Spawned Ffmpeg with command: ' + commandLine);
      })
      .on('error', function(err, stdout, stderr) {
        console.log('error: ' + err.message);
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
      })
      .on('end', function() {
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
        '-b:a 96k',
      ])
      .format('flv')
      .pipe(
        outputPath,
        {
          end: true,
        }
      );
  },
};
