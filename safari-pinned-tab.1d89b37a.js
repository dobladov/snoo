parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"lDXM":[function(require,module,exports) {
module.exports = '<svg version="1.0" width="933.333" height="933.333" viewBox="0 0 700 700"><path d="M167.8 47.7c-.6 8.2 0 168.3.6 176.8 1.3 17.4 1.7 21.3 2.5 24.3.5 1.8.8 3.2.6 3.2-.8 0 4.6 12.5 7.9 18.4 5.4 9.7 9.6 13.2 30.6 25.7 10.7 6.4 35.3 20.9 54.5 32.3 19.3 11.5 36.2 21.7 37.7 22.7s3 1.9 3.3 1.9c.4 0 30.9 17.9 37.5 22 .8.5 4 2.4 7 4.1 3 1.8 12.3 7.3 20.5 12.2 8.3 5 16.4 9.8 18 10.7 1.7 1 10.7 6.2 20 11.7 9.4 5.6 18.8 11.1 21.1 12.4 4.4 2.6 42.9 25.4 45.4 27 .8.5 6.6 3.8 12.9 7.4l11.3 6.6 12.7-7.8c44.5-27.3 71.5-49.4 78.8-64.8 6.1-13 7.6-20.8 7.7-40.5.1-13.4-.3-19.5-1.7-26-4.4-20.5-10.8-33.3-22.3-44.8-4.6-4.5-8.8-8.2-9.4-8.2-.6 0-3.7-1.7-6.8-3.8-3.1-2-7.4-4.6-9.5-5.7-2-1.1-3.7-2.3-3.7-2.7 0-.5-.5-.8-1-.8-.6 0-3.6-1.6-6.6-3.5-3-1.9-5.9-3.5-6.4-3.5-.6 0-1-.3-1-.8 0-.4-.9-1.2-2.1-1.7-1.1-.6-15.5-9.1-31.9-19-28-16.8-38.3-22.9-52-31-3-1.8-25.5-15-49.9-29.4-24.4-14.3-44.7-26.1-45.2-26.1s-.9-.4-.9-.9-.8-1.1-1.7-1.5c-1-.3-2.5-1-3.3-1.5-7.3-4.6-43.9-25.8-54-31.4-3-1.6-6.2-3.5-7-4.1-.8-.6-2.4-1.6-3.5-2.2-1.1-.6-17.7-10.2-37-21.4-19.2-11.1-43.4-25.2-53.7-31.1-10.4-6-19-10.9-19.2-10.9-.2 0-.6 2.6-.8 5.7zM167.2 329.1c.3 46.5.3 47.5 2.6 53.7 3.3 9.1 6.3 13.5 13.4 19.1 5.1 4.1 30.8 19.4 61.1 36.4 2.7 1.5 9.5 5.4 15.1 8.6 5.5 3.2 12.4 7.1 15.1 8.7 2.8 1.5 12.4 7 21.5 12.2 9.1 5.2 18.5 10.6 21 12 2.5 1.4 12.4 7 22 12.5s19 10.9 20.9 11.9c1.9 1.1 11.2 6.4 20.7 11.9L398 526l6.2-3.8c3.5-2.1 8.8-5.2 11.8-6.9 3-1.7 9.3-5.4 14-8.2 4.7-2.8 9.4-5.5 10.5-6.1 1.1-.5 4.1-2.2 6.7-3.7 2.6-1.5 13.3-7.8 23.7-13.8 10.5-6.1 19.1-11.2 19.1-11.5 0-.3-2.8-2.1-6.3-4.1-5.6-3.2-35.7-21-60.7-35.8-5.2-3.1-10.7-6.3-12.1-7.1-1.5-.8-9.5-5.6-17.8-10.5-8.4-5-16.6-9.8-18.4-10.9-4.9-2.8-30.4-17.9-47.7-28.1-8.5-5-23.1-13.7-32.5-19.2-9.3-5.5-19.7-11.6-23-13.6-7-4.2-24.1-14.2-29.9-17.5-2.3-1.3-6.1-3.6-8.6-5.2-2.5-1.5-12.4-7.4-22-13-9.6-5.7-22.7-13.3-29-17.1-6.3-3.7-12.3-7.1-13.3-7.5-1.7-.6-1.8 1.6-1.5 46.7zM167.6 529.9c.1 70.2.3 127.7.3 127.9.1.5 9.7-4.7 15.8-8.5 2.9-1.8 5.4-3.3 5.7-3.3.2 0 7.7-4.3 16.7-9.5 8.9-5.2 16.3-9.5 16.5-9.5.2 0 2.6-1.4 5.4-3.1 2.7-1.7 6.7-4 8.8-5.2 7.4-4.1 20.7-11.8 22.2-12.7 1.4-.9 27.2-15.8 35-20.3 1.9-1 22.9-13.1 46.5-26.7 23.7-13.6 44.3-25.4 45.9-26.2l3-1.5-4-2.4c-2.2-1.3-4.9-2.9-5.9-3.6-2.8-1.6-50.4-29.5-53.6-31.3-6-3.5-17.6-10.2-20.4-11.9-5.7-3.4-96.6-56.3-105-61.1-5.4-3.1-15.9-9.2-23-13.5-3.8-2.3-7.7-4.4-8.6-4.7-1.4-.5-1.5 11.6-1.3 127.1z"/></svg>'
},{}]},{},["lDXM"], null)