module.exports = {
    base_url:"https://na.api.pvp.net/api/lol/",
    static_base: "http://ddragon.leagueoflegends.com/cdn/",
    api_key: process.env.API_KEY,
    match: (function(region,id){return region + "/v2.2/match/" + id}).toString(),
    staticData:{
        champion:(function(version){return version + "/data/en_US/champion.json"}).toString(),
        item:(function(version){return version + "/data/en_US/item.json"}).toString(),
        mastery:(function(version){return version + "/data/en_US/mastery.json"}).toString(),
        rune:(function(version){return version + "/data/en_US/rune.json"}).toString(),
        summoner:(function(version){return version + "/data/en_US/summoner.json"}).toString()
    },
    table:[
        ""
    ]
};
