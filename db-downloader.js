'use strict';

async function maxmind(type){
    const https = require('https'); // or 'https' for https:// URLs
    const fs = require('fs');


    console.log(process.argv);

//prompt input


//    const argv = require('yargs-parser')(process.argv.slice(3));
    let dbType = type === 'asn' ? 'asn' : 'city';

    console.log(dbType);


    const mmUid = 530667;
    const mmKey = 'eUvNCKA9SwdtNdQj';
    const asnUri = `https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-ASN&license_key=${mmKey}&suffix=tar.gz`;
    const cityUri = `https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key=${mmKey}&suffix=tar.gz`;
    console.log(asnUri, cityUri);

    let tarFilename = dbType === 'asn' ? './data/GeoLite2-ASN.dl.tar.gz' : './data/GeoLite2-City.dl.tar.gz';

    const dl = require('./modules/dl.js');

    var promise = new Promise((resolve, reject) => {
        dl(dbType === 'asn' ? asnUri : cityUri, tarFilename)
        .then((res) => {
            console.log(res);
            console.log('Download completed.');
            console.log('Begin extracting.');
            const path = require('path');
            const decompress = require('decompress');
            const decompressTargz = require('decompress-targz');

            decompress(tarFilename, './data/', {
                plugins : [
                    decompressTargz()
                ],
                map: fobj => { console.log(path.parse(fobj.path)); fobj.path = path.parse(fobj.path).base; return fobj },
                filter: fobj => { return path.extname(fobj.path) === '.mmdb' } ,
            }).then((files) => {
                console.log(files);
                console.log('Files decompressed');
                resolve(files);
            }).finally(() => {
                console.info('Remove downloaded tar file.');
                fs.unlinkSync(tarFilename);
            });

        })
        .catch((err) => {
            console.log('Error downloading');
            console.error(err);
            reject(err);
        });
    });
    return promise;
}

async function ip2location(type){
    const fs = require('fs');
    let dlToken = 'JG0h3ZT3pnGMahjdEM6aIoZeY4NBcyXJ8yiZfc36LOsYlMWIhhCzALjdL4dBbQAN';
    let dbCode = 'PX10LITEBIN';
    //https://www.ip2location.com/download/?token={DOWNLOAD_TOKEN}&file={DATABASE_CODE}
    let dbUrl = `https://www.ip2location.com/download/?token=${dlToken}&file=${dbCode}`;
//    let tarFilename = dbType === 'asn' ? './data/IP2PROXY-LITE-PX10.BIN.dl.zip' : './data/GeoLite2-City.dl.tar.gz';
    let tarFilename = './data/IP2PROXY-LITE-PX10.BIN.dl.zip';
    const dl = require('./modules/dl.js');
    console.log(dbUrl);

    var promise = new Promise((resolve, reject) => {
        dl(dbUrl, tarFilename)
        .then((res) => {
            console.log(res);
            console.log('Download completed.');
            console.log('Begin extracting.');
            const path = require('path');
            const decompress = require('decompress');

            decompress(tarFilename, './data/', {
                map: fobj => { console.log(path.parse(fobj.path)); fobj.path = path.parse(fobj.path).base; return fobj },
                filter: fobj => { return path.extname(fobj.path) === '.BIN' } ,
            }).then((files) => {
                console.log(files);
                console.log('Files decompressed');
                resolve(files);
            }).finally(() => {
                console.info('Remove downloaded zip file.');
                fs.unlinkSync(tarFilename);
            });

        })
        .catch((err) => {
            console.log('Error downloading');
            console.error(err);
            reject(err);
        });
    });
    return promise;
}

module.exports = {maxmind: maxmind, ip2location: ip2location};