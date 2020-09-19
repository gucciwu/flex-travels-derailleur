const {readFile, writeFile} = require("../utils/file");
const { transform } = require('gcoord');

const htmlparser2 = require("htmlparser2");

const GPX_TAG_POINT = "trkpt"
const GPX_TAG_ELEVATION = "ele"
const GPX_TAG_TIME = "time"
const GPX_TAG_TEMPLATE_POINT = `<trkpt lat="#{lat}" lon="#{lon}">`
const GPX_TAG_TEMPLATE_ELEVATION = `<ele></ele>`
const GPX_TAG_TEMPLATE_TIME = `<time></time>`
const GPX_FILE_EXTENSION = '.gpx'

const buildReplacement = (fromCoordinate, toCoordinate) => {

    const fromStr = GPX_TAG_TEMPLATE_POINT.replace("#{lon}", fromCoordinate[0]).replace("#{lat}", fromCoordinate[1])
    const toStr = GPX_TAG_TEMPLATE_POINT.replace("#{lon}", toCoordinate[0]).replace("#{lat}", toCoordinate[1])

    return {
        from: fromStr,
        to: toStr
    }
}

const buildReplacements = (gpx_str, fromCRS, toCRS, dropElevation=false, dropTime=false) => {
    const replaceList = [];
    let cleanText = null;
    const parser = new htmlparser2.Parser({
        onopentag(name, attribs) {
            cleanText = false;
            if (name === GPX_TAG_POINT) {
                const converted = transform([attribs.lon, attribs.lat], fromCRS, toCRS);
                replaceList.push(buildReplacement([attribs.lon, attribs.lat], converted))
            }
            // if (dropElevation && name === GPX_TAG_ELEVATION) {
            //     cleanText = 0;
            //     // replaceList.push({
            //     //     from: GPX_TAG_TEMPLATE_ELEVATION,
            //     //     to: ''
            //     // })
            // }
            // if (dropTime && name === GPX_TAG_TIME) {
            //     cleanText = new Date().toUTCString();
            //     // replaceList.push({
            //     //     from: GPX_TAG_TEMPLATE_TIME,
            //     //     to: ''
            //     // })
            // }
        },
        ontext(data) {
            // if (cleanText) {
            //     replaceList.push({
            //         from: data,
            //         to: cleanText
            //     })
            // }
        }
    });
    parser.write(
        gpx_str
    );
    parser.end();
    return replaceList
}

const convertFile = (file, fromCRS, toCRS) => {
    const str = readFile(file);
    if (str === '') {
        return false
    }
    const replaceList = buildReplacements(str, fromCRS, toCRS)
    let newStr = str;
    for (let i=0; i<replaceList.length; i++) {
        newStr = newStr.replace(replaceList[i].from, replaceList[i].to)
    }
    const convertedFile = file.replace(GPX_FILE_EXTENSION, '_' + toCRS + GPX_FILE_EXTENSION)
    writeFile(convertedFile, newStr)
    return newStr
}

module.exports = {convertFile: convertFile}
