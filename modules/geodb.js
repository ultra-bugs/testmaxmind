/**
 *   *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *   *
 * @PROJECT    : testmaxmind_2
 * @AUTHOR     : Zuko
 * @COPYRIGHT  : © 2021 Magebay - Magento Ext Provider
 * @LINK       : https://www.magebay.com/
 * @FILE       : geodb.js
 * @CREATED    : 11:19 PM , 06/Apr/2021
 *   *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *   *
 **/

const Reader = require('@maxmind/geoip2-node').Reader;
const fs = require('fs');
//Reader.open('./data/GeoLite2-ASN.mmdb',{}).then(r => {
//    console.log(r.asn('8.8.8.8'));
//    console.log(r.asn('2400:8901::f03c:92ff:fe9b:edd5'))
//    //console.log(r.city('2400:8901::f03c:92ff:fe9b:edd5'))
//})

const asndb = Reader.openBuffer(fs.readFileSync('data/GeoLite2-ASN.mmdb'));
const citydb = Reader.openBuffer(fs.readFileSync('data/GeoLite2-City.mmdb'));
const ip2proxy = require("ip2proxy-nodejs");

function get(ip) {
  return {
    asn: asndb.asn(ip),
    geo: citydb.city(ip),
    i2p: ip2proxy.getAll(ip),
  }
  /*    return Promise((resolve, reject) => {
  
      });*/
}

module.exports = get;