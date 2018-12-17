var sporttribe = sporttribe || {};

/*controle la vue principale*/

(($, indexService, indexUtils) => {
    const eventsSection = $("main")

    function loadingView(){

    }

    function updateView(events){
        eventsSection.html("");
        events.forEach(event => eventsSection.append(createEvent(event)))
    }

    function createEvent(event){
        return $(`<div class = "activitee" >` +
            `<a href="./event/${event.id}"></a>` +
            `<img src="../img/sport/${event.sport.picture}" alt="${event.sport.name}">` +
            `<h2>${event.name}</h2>` +
            `<p class="date">${event.date}</p>` +
            `<p class ="descrition">${event.description}</p>` +
            `<p>${event.location.name}</p>` +
            '<input type="button" value ="s\' inscrire">' +
            `</div>`)
    }

indexService.getEvents().done(events => {
    updateView(events)
})

})(jQuery, sporttribe.indexService, sporttribe.utils);