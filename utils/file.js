const fs = require('fs');

const readFile = file => {
    let ret = "";
    try {
        ret = fs.readFileSync(file, 'utf-8');
    } catch (e) {
        console.log(e.toString());
    }
    return ret;
}

const writeFile = (file, data) => {
    let ret = null;
    try {
        ret = fs.writeFileSync(file, data);
    } catch (e) {
        console.log(e.toString());
    }
    return ret;
}

const loopGetFiles = path => {
    const ret = [];
    const dirs = fs.readdirSync(path);
    dirs.forEach((ele, index) => {
        const info = fs.statSync(path + "/" + ele)
        if (info.isDirectory()) {
            ret.concat(loopGetFiles(path + "/" + ele));
        } else {
            ret.push(path + "/" + ele)
        }
    })
    return ret;
}

module.exports = {
    readFile: readFile,
    writeFile: writeFile,
    loopGetFiles: loopGetFiles,
}
