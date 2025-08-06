# debridiotv to m3u
This is a simple script to get m3u from debridio <br>
it is accessible from a url once installed. <br>

# usage 
to use this you are required to get your debrid io api key <br>
Navigate to https://debridio.com/addons/tv select usa TV and then copy install url. <br>
you will then get a url like https://tv-addon.debridio.com/dGhpc2lzdG90YWxseW15YXBpa2V5d29yZHN3b3Jkc3dvcmRz=/manifest.json <br>
the string ``` dGhpc2lzdG90YWxseW15YXBpa2V5d29yZHN3b3Jkc3dvcmRz=``` would be the api key in my case. <br>
``` git clone https://github.com/Baggette/debrdiotv-to-m3u/ ``` <br>
``` cd debridiotv-to-m3u ``` <br>
``` npm i ``` <br>
``` node . ``` <br>
this will then start a webserver on port 9697 by default. <br>
you will then need to access `http://localhost:9697/?apikey=yourapikey&region=usa` <br>
if you need to force refresh the m3u add the parm `&refresh=true` to the end of `http://localhost:9697/?apikey=yourapikey&region=usa&refresh=true` <br>
m3u files are stored in the m3u directory. however the url you create (eg: `http://localhost:9697/?apikey=yourapikey&region=usa`) should work in any iptv player provided its on the same network.

valid regions are `usa, ca, mx, uk, au, cl, fr, it, za, nz, ee`

# Contributing 
I made this in like an hour or two so it might not be perfect. feel free to make changes or pull requests.
