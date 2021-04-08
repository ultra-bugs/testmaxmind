/**
 *   *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *   *
 * @PROJECT    : Magebay Spytool
 * @AUTHOR     : Zuko
 * @COPYRIGHT  : © 2021 Magebay - Magento Ext Provider
 * @LINK       : https://www.magebay.com/
 * @FILE       : ip2loc.js
 * @CREATED    : 15:48 , 07/Apr/2021
 * @VERSION    : 3.1.1
 *   *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *   *
 **/
require('./db-downloader.js').ip2location('')
.then(rs => {
    console.info('this is from promise');
    console.log(rs);
}).catch(err => console.error(err));
console.log(require('./db-downloader.js'));
var ip2proxy = require("ip2proxy-nodejs");

let openRs = ip2proxy.Open("./data/IP2PROXY-LITE-PX10.BIN");
console.log(openRs);
//let ip = '162.158.165.74';
let ip = '172.104.60.214';

console.log("GetModuleVersion: " + ip2proxy.getModuleVersion());
console.log("GetPackageVersion: " + ip2proxy.getPackageVersion());
console.log("GetDatabaseVersion: " + ip2proxy.getDatabaseVersion());

// functions for individual fields
console.log("isProxy: " + ip2proxy.isProxy(ip));
console.log("ProxyType: " + ip2proxy.getProxyType(ip));
console.log("CountryShort: " + ip2proxy.getCountryShort(ip));
console.log("CountryLong: " + ip2proxy.getCountryLong(ip));
console.log("Region: " + ip2proxy.getRegion(ip));
console.log("City: " + ip2proxy.getCity(ip));
console.log("ISP: " + ip2proxy.getISP(ip));
console.log("Domain: " + ip2proxy.getDomain(ip));
console.log("UsageType: " + ip2proxy.getUsageType(ip));
console.log("ASN: " + ip2proxy.getASN(ip));
console.log("AS: " + ip2proxy.getAS(ip));
console.log("LastSeen: " + ip2proxy.getLastSeen(ip));
console.log("Threat: " + ip2proxy.getThreat(ip));

// function for all fields
var all = ip2proxy.getAll(ip);
console.info(all);
console.log("isProxy: " + all.Is_Proxy);
console.log("ProxyType: " + all.Proxy_Type);
console.log("CountryShort: " + all.Country_Short);
console.log("CountryLong: " + all.Country_Long);
console.log("Region: " + all.Region);
console.log("City: " + all.City);
console.log("ISP: " + all.ISP);
console.log("Domain: " + all.Domain);
console.log("UsageType: " + all.Usage_Type);
console.log("ASN: " + all.ASN);
console.log("AS: " + all.AS);
console.log("LastSeen: " + all.Last_Seen);
console.log("Threat: " + all.Threat);

ip2proxy.Close();