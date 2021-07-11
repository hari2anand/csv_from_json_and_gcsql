let fs = require('fs')
let countryCode = 'DE'

module.exports = async (req, res) => {

    res.status(200).send({csvData: await loader()})
}

async function loader() {
    try {
        let personData = require('./testdata')
        try {
            let arrPersonData = personData['sampleJson']['testData']

            return await extractDataForCSV(arrPersonData)
        } catch (e) {
            console.log(e.message);
            return e;
        }
    } catch
        (error) {
        logger.error({Details: "Exception Occurred", Error: error});
        return error;
    }
}

async function writePersonData2CSV() {

    try {
        fs.writeFileSync('./out.csv', await loader(), 'utf8', function (err) {
            if (err) {
                console.log('Some error occurred - file either not saved or corrupted file saved.');
            }
        });
    } catch (e) {
        console.log(e.message);
    }
}

writePersonData2CSV();


async function extractDataForCSV(arrayPersonData) {
    let extractKeys = require('./mapperkey');
    let extractData = [[`HEADR|${countryCode.toUpperCase()}_${new Date()}_032001.csv.gpg|20210329|032001|P`]];

    for (let i1 = 0; i1 < arrayPersonData.length; i1++) {
        const personData = arrayPersonData[i1];
        let extractArray = [];
        for (let i = 0; i < extractKeys.length; i++) {
            const key = extractKeys[i];
            extractArray.push(await retMapper(personData, key))
        }
        extractData.push(extractArray)
    }
    let extractOutData = await extractData.map(a => {
        return a.join('|')
    })

    extractOutData.push(`TRAIL|${arrayPersonData.length}`)
    console.log(extractOutData.join(','))
    return extractOutData.join('\n')
}

async function retMapper(personData, key) {
    return new Promise(resolve => {
        let DSExtractKeys = ['ORG_LEVEL1', 'ORG_LEVEL2', 'ORG_LEVEL3']
        if (DSExtractKeys.includes(key))
            resolve(require('./dsOpr')(personData, key))

        resolve(personData[key] != null && typeof personData[key] != "undefined" ? personData[key] : '')
    })
}
