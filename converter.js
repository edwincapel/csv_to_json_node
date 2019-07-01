const path = require('path')
const uuidv1 = require('uuid/v1')
const csv = require('csvtojson')
const fs = require('fs')

const converter = (file) => {
    const folderName = uuidv1()

    if (!fs.existsSync('conversions')) {
        fs.mkdirSync('conversions')
    }

    csv()
    .fromFile(file)
    .then((jsonObj) => {
        fs.writeFile(path.join(__dirname, 'conversions', `${folderName}.json`), JSON.stringify(jsonObj), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("File has been created");
        });
    })
}

converter(process.argv[2])