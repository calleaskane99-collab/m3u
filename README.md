# debridiotv to m3u
This is a simple script to get m3u from debridio <br>
for now it is hardcoded to pull the usa json <br>

# usage 
to use this you are required to get your debrid io api key <br>
Navigate to https://debridio.com/addons/tv select usa TV and then copy install url. <br>
you will then get a url like https://tv-addon.debridio.com/dGhpc2lzdG90YWxseW15YXBpa2V5d29yZHN3b3Jkc3dvcmRz=/manifest.json <br>
the string ``` dGhpc2lzdG90YWxseW15YXBpa2V5d29yZHN3b3Jkc3dvcmRz=``` would be the api key in my case. <br>
you then edit the `example.env` file and add the api key along with changing the default secret. **do not forget to rename file to `.env`** <br>
``` git clone https://github.com/Baggette/debrdiotv-to-m3u/ ``` <br>
``` cd debridiotv-to-m3u ``` <br>
``` npm i ``` <br>
``` node . ``` <br>
this will then start a webserver on port 9697 by default. <br>
if you access http://example.com:9697/defaultsecret/refresh it wil pull the usa json and parse it (its worth noting you do not need to reaccess the url over and over everytime you need to get the m3u only if the m3u breaks or if its the first time running the script will you need to refresh it)<br>
it will then make a m3u shortly thereafter and it will be accessible at http://example.com:9697/defaultsecret/channels.m3u <br>

# Contributing 
I made this in like an hour or two so it might not be perfect. feel free to make changes or pull requests.
