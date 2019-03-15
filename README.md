# GIF Generator

![Alt Text](light2929.gif)

A client-side GIF generator for producing Bay Bridge Light GIFS. Runs on @jnordberg's [client-side GIF generator](https://github.com/jnordberg/gif.js).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```bash
$ npm install
$ npm start
```

Code for the generation can be found in [here](views/pages/index.ejs).

Your app should now be running on [localhost:5000](http://localhost:5000/). 

## GIF Generation

The GIF Generator is to be used as an embed on share-donation component of [SIF](http://sif.illuminate.org). 

**/giffy**
The /giffy path accepts three query params: 
* nodeX position of a light
* nodeY position of a light
* light number

Utilizing a 1:4 scale mapping based on the coordinates in use for [lights.py] on bay-lights-api and @jnordberg's [client-side GIF-generator](https://github.com/jnordberg/gif.js), the client generates a 20-frame gif using canvas frames and web-workers. Canvas draws expanding circles along with a title constructed using websafe font. The result is uploaded to filestack, and the Blob URL is extracted for a SendGrid template e-mail. To preserve browser security, all download links have been removed to opt for server-side e-mailing. Users on non-Safari/mobile browers can right-click to save. 

**/imagify**
The /imagify path accepts four post items:
* image URL 
* Recepient Name
* Donator' E-mail
* Light #

Utilizing a SendGrid template e-mail, Donator is shipped off an HTML-rich e-mail with image src embedded.


