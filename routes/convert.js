const {convertFile} = require("../convert/gpx");
const {loopGetFiles} = require("../utils/file");
const { WGS84, GCJ02 } = require('gcoord');
const FILE =  'E:\\flex-travels\\flex-travels-derailleur\\demo\\gpx\\2020-10_sz-ys_D5_ms-ys.gpx'
const PATH =  'E:\\flex-travels\\flex-travels-derailleur\\demo\\gpx\\'

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const fils = loopGetFiles(PATH)
  fils.map(file=>convertFile(file, GCJ02, WGS84));
  res.send("DONE");
});

module.exports = router;
