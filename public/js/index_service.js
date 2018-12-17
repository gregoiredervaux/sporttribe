var sporttribe = sporttribe || {};

sporttribe.indexService = (($, utils) => {

    const self = {};

    self.getEvents = (date = null) => {
        if (!date){
            return $.getJSON(utils.apiUrl)
        } else {
            return $.getJSON(utils.apiUrl + `?date=${date}`)
        }
    };

    return self

})(jQuery, sporttribe.utils);