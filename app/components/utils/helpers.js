var axios = require("axios");

var nytAPI = "c9b34fcd751144018a82815bac15ae58";

var helpers = {

    runQuery: function(data) {
        console.log(data);
        
        //Axios GET call
        return axios({
            method: 'get',
            url:'https://api.nytimes.com/svc/search/v2/articlesearch.json',
            params: {
                'api-key': nytAPI,
                q: data.term,
                begin_date: data.start,
                end_date: data.end
            }
        }).then(function (response) {
            var newResults = [];
            var counter = 0
            for (var i = 0; i < response.data.response.docs.length; i++) {
                if(counter > 4) {
                    return newResults;
                } else {
                    newResults.push(response.data.response.docs[counter]);
                    counter++;
                }
            }
            return newResults
        });
    },
    postArticle: function(title, url) {
        axios.post("/api", {title: title, url: url}).then(function(results) {
            console.log("Posted to MongoDB");
            return results;
        })
    }
}

module.exports = helpers;