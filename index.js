require('dotenv').config();
const fetch = require('node-fetch').default;
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9697;
const fs = require('fs').promises;

async function getChannelM3u(channel, apikey) {
    const response = await fetch(`https://tv-addon.debridio.com/${apikey}/meta/tv/${channel}`);
    const data = await response.json();
    console.log("Channel M3U data:", data);
    return data;
}

async function parsejson(json, apikey, region) {
    let arrayLength = json.metas.length;
    await fs.writeFile(`./m3u/${apikey + region}.m3u`, "#EXTM3U\n", 'utf-8')
    for (let i = 0; i < arrayLength; i++) {
        let meta = json.metas[i].id;
        console.log(`Meta ${i + 1}:`, meta);
        let m3u = await getChannelM3u(meta, apikey);
        await fs.appendFile(`./m3u/${apikey + region}.m3u`, `#EXTINF:-1 tvg-id="${m3u.meta.tvgId}" tvg-logo="${m3u.meta.logo}" group-title="${m3u.meta.genres[0]}",${m3u.meta.name}\n${m3u.meta.streams[0].url}\n`, 'utf-8');
    }
}
 
app.get(`/`, async (req, res) => {
    const { apikey, region, refresh } = req.query;
    const validRegions = ['usa', 'ca', 'mx', 'uk', 'au', 'cl', 'fr', 'it', 'za', 'nz', 'ee'];
    if (!apikey || !region || !validRegions.includes(region)) {
        return res.status(400).send(`Error: Missing or invalid parms. please ensure your apikey and region is valid. valid region codes are: ${validRegions.join(', ')}`);
    }
    try {
        if(refresh === true || refresh === 'true') {
            throw new Error('refreshing m3u');
        }
        const data = await fs.readFile(`./m3u/${apikey + region}.m3u`, 'utf-8');
        res.send(data);
    } catch (error) {
        console.error(error);
    fetch(`https://tv-addon.debridio.com/${apikey}/catalog/tv/${region}.json`)
        .then(response => response.json())
        .then(async (data) => {
            await parsejson(data, apikey, region);
            try {
                    const data = await fs.readFile(`./m3u/${apikey + region}.m3u`, 'utf-8');
                    res.send(data);
                } catch (error) {
                    console.error(error);
                    res.status(500).send("Internal Server Error");
        }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            res.status(500).send("Internal Server Error");
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});