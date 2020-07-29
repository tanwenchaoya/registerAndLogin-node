const fs = require('fs');
const path = require('path');

function createWriteStream() {
    let fullpath =createDirPath();
    let fullFileName = path.join(fullpath,"access.log");
    let writeStrem = fs.createWriteStream(fullFileName);
    return writeStrem;
}
function createDirPath() {
    let date = new Date();
    let dirName = `${date.getFullYear()}_${date.getMonth()+1}_${date.getDay()}`;
    let fullpath = path.join(__dirname,"../log",dirName);
    console.log(__dirname);
    console.log(__filename);
    console.log(fullpath);
    if (!fs.existsSync(fullpath)){
        fs.mkdirSync(fullpath);
    }
    return fullpath;
}
const writeStream = createWriteStream();
function writeLog(log) {
    writeStream.write(log + '\n');
}
// createDirPath()
module.exports = writeLog;
