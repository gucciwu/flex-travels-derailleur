const fs = require('fs');

const readFile = file => {
    let ret = "";
    try {
        ret = fs.readFileSync(file, 'utf-8');
    } catch(e) {
        console.log(e.toString());
    }
    return ret;
}

const writeFile = (file, data) => {
    let ret = null;
    try {
        ret = fs.writeFileSync(file, data);
    } catch(e) {
        console.log(e.toString());
    }
    return ret;
}

module.exports = {
    readFile: readFile,
    writeFile: writeFile
}
