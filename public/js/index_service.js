var sporttribe = sporttribe || {};

sporttribe.indexService = (($, utils) => {

    const self = {};

    self.getEvents = (date = null) => {
        if (!date) {
            return $.getJSON(utils.apiUrl + "/events")
        } else {
            return $.getJSON(utils.apiUrl + `/events?date=${date}`)
        }
    };

    self.getSports = (ids = null) => {
        if (!ids) {
            return $.getJSON(utils.apiUrl + "/sports")
        } else if (ids.length !== 0) {
            let ls_sports = [];
            console.log("ids: " + JSON.stringify(ids));
            ids.forEach(id => {
                console.log("id: " + id);
                ls_sports.push($.getJSON(utils.apiUrl + `/sports/${parseInt(id)}`))
            });
            return Promise.all(ls_sports);
        }
    };
    self.getPlayers = (ids = null) => {
        if (!ids) {
            return $.getJSON(utils.apiUrl + "/profiles")
        } else if (ids.length !== 0) {
            let ls_players = [];
            ids.forEach(id => {
                ls_players.push($.getJSON(utils.apiUrl + `/profiles/${parseInt(id)}`))
            });
            return Promise.all(ls_players);
        }
    };

    self.getLocations = (ids = null) => {

        console.log("ids: " + JSON.stringify(ids));
        if (!ids) {
            return $.getJSON(utils.apiUrl + "/locations")
        } else if (ids.length ===1 ) {
            return $.getJSON(utils.apiUrl + `/locations/${parseInt(ids)}`)
        } else if (ids.length > 1) {
            let ls_locations = [];
            ids.forEach(id => {
                console.log("ajax: " + utils.apiUrl + `/locations/${parseInt(id)}`);
                ls_locations.push($.getJSON(utils.apiUrl + `/locations/${parseInt(id)}`))
            });
            return Promise.all(ls_locations);
        }
    };

    return self

})(jQuery, sporttribe.utils);