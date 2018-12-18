var sporttribe = sporttribe || {};

sporttribe.indexService = (($, utils) => {

    const self = {};

    self.getEvents = (date = null) => {
        if (!date){
            return $.getJSON(utils.apiUrl + "/events")
        } else {
            return $.getJSON(utils.apiUrl + `/events?date=${date}`)
        }
    };

    self.getSports = (ids = null) => {
        if (!ids){
            return $.getJSON(utils.apiUrl + "/sports")
        } else if (ids.length !==0) {
            let ls_sports = [];
            ids.forEach(id => {
                ls_sports.push($.getJSON(utils.apiUrl + `/sports/${parseInt(id)}`))
            });
            return Promise.all(ls_sports);
        }
    };
    self.getPlayers = (ids = null) => {
        if (!ids){
            return $.getJSON(utils.apiUrl + "/profiles")
        } else if (ids.length !==0) {
            let ls_players = [];
            ids.forEach(id => {
                ls_players.push($.getJSON(utils.apiUrl + `/profiles/${parseInt(id)}`))
            });
            return Promise.all(ls_players);
        }
    };

    return self

})(jQuery, sporttribe.utils);