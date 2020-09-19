const {convertFile} = require("../convert/gpx");
const { WGS84, GCJ02 } = require('gcoord');
const FILE =  'E:\\flex-travels\\flex-travels-derailleur\\demo\\gpx\\2020-10_sz-ys_D5_ms-ys.gpx'

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const ret = convertFile(FILE, GCJ02, WGS84)
  res.send(ret);
});

module.exports = router;
