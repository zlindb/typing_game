var express = require('express');
var router = express.Router();
const path = require('path');

let fs = require('fs');

//const { PdfReader } = require('pdfreader');
//const reader = new PdfReader();

/* GET home page. */	
router.get('/', function(req, res, next) {	

      global.window = {document: {createElementNS: () => {return {}} }};
    global.navigator = {};
    

    let pdfreader = require('pdfreader');

	let filename = 'pg8.pdf';
	let file = path.join(__dirname, '..', 'pdffile', filename);
	let rows = {}; //index by y-position;
	

	function printRows() {
		Object.keys(rows) // => array of y-positions (type: float)
         .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
			.forEach((y) => console.log((rows[y] || []).join(" ")));
	}

    new pdfreader.PdfReader().parseFileItems(file,
        (err, item) => {
      if (!item || item.page) {
        // end of file, or page
          printRows();
          console.log("PAGE:", item.page);
          rows = {}; // clear rows for next page
      } 
      else if (item.text) {
        // accumulate text items into rows object, per line
        (rows[item.y] = rows[item.y] || []).push(item.text);
      }
    });

    delete global.window;
    delete global.navigator;
    
  res.render('index', { title: 'Typer'});
});

module.exports = router;
