const path = require('path');
const readline = require('readline');
const fs = require('fs');

exports.readTxtFile = function(req, res, next){
  let filename = path.join(__dirname, "..", 'txtFile', 'overlordVol14-Prologue.txt' );
  //const { PdfReader } = require('pdfreader');
  //const reader = new PdfReader();
  let data = [];
  // const readFile = filePath =>{
  //   return new Promise((resolve, reject) =>{
  //     fs.readFile(filePath, 'utf8', (err, data)=>{
  //       if(err) {
  //         reject(err);
  //         return;
  //       }
  //       const lines = data.split(/\r?\n/);
  //       resolve(lines);
  //     })
  //   })
  // }
  //
  // readFile(filename).then(data =>{
  //   //console.log(msg);
  //   res.render('index', { title: 'Typer', data: data});
  // });

  const stream = fs.createReadStream(filename, {start: 0, end: 1024});
   const rl = readline.createInterface({
     input: stream,
     crlfDelay: Infinity, // crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break
     terminal: false
   });

  rl.on('line', (line)=>{
    if(line != '');
      data.push(line);
  })

  rl.on('close', ()=>{
    res.render('index', { title: 'Typer', data: data});
  })

}
