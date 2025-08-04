require('dotenv').config();
const fetch = require('node-fetch').default;
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9697;
const fs = require('fs').promises;

async function getChannelM3u(channel) {
    const response = await fetch(`https://tv-addon.debridio.com/${process.env.DEBRIDIOAPI}/meta/tv/${channel}`);
    const data = await response.json();
    console.log("Channel M3U data:", data);
    return data;
}

async function parsejson(json){
    let arrayLength = json.metas.length;
    await fs.writeFile("channels.m3u", "#EXTM3U\n", 'utf-8')
    for (let i = 0; i < arrayLength; i++) {
        let meta = json.metas[i].id;
        console.log(`Meta ${i + 1}:`, meta);
        let m3u = await getChannelM3u(meta);
        await fs.appendFile('channels.m3u', `#EXTINF:-1 tvg-id="${m3u.meta.tvgId}" tvg-logo="${m3u.meta.logo}" group-title="${m3u.meta.genres[0]}",${m3u.meta.name}\n${m3u.meta.streams[0].url}\n`, 'utf-8');
    }
}
 
app.get(`/${process.env.SECRET}/refresh`, async (req, res) => {
    fetch(`https://tv-addon.debridio.com/${process.env.DEBRIDIOAPI}/catalog/tv/usa.json`)
        .then(response => response.json())
        .then(data => {
            parsejson(data);
            res.json(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            res.status(500).send("Internal Server Error");
        });
    
    
});

app.get(`/${process.env.SECRET}/channels.m3u`, async (req, res) => {
    try {
        const data = await fs.readFile('channels.m3u', 'utf-8');
        res.send(data);
    } catch (error) {
        console.error("Error reading channels.m3u:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});