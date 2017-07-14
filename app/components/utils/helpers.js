var axios = require("axios");

var nytAPI = "c9b34fcd751144018a82815bac15ae58";

var helpers = {

    runQuery: function(data) {
        console.log(data);
        var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
        url += '?' + $.param({
            'api-key': nytAPI,
            'q': data.term,
            'begin_date': data.start,
            'end_date': data.end
        });
        //Ajax GET call
        $.ajax({
            method: 'GET',
            url: url,
        }).then(function (response) {
            return data = {
            title: response.docs[0].headline.main,
            url : response.docs[0].web_url
            };
        });
    },
    getArticle: function() {
        return axios.get("/api");
    },
    postArticle: function(data) {
        return axios.post("/api", {title: data.title, url: data.url});
    }
}

module.exports = helpers;