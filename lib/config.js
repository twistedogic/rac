module.exports = {
    static_base: "http://ddragon.leagueoflegends.com/cdn/",
    api_key: process.env.API_KEY,
    db: process.env.DB_IP,
    crate: process.env.CRATE_IP,
    staticData:{
        champion:(function(version){return version + "/data/en_US/champion.json"}).toString(),
        item:(function(version){return version + "/data/en_US/item.json"}).toString(),
        mastery:(function(version){return version + "/data/en_US/mastery.json"}).toString(),
        rune:(function(version){return version + "/data/en_US/rune.json"}).toString(),
        summoner:(function(version){return version + "/data/en_US/summoner.json"}).toString()
    },
    table:[
        "version511","version514"
    ],
    mapping:{
        champion:["key"],
        item:["name","gold"],
        mastery:["name"],
        rune:["name","stats"],
        summoner:["name"]
    }
};
