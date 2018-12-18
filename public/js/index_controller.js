var sporttribe = sporttribe || {};

/*controle la vue principale*/

(($, srv, utils) => {
    const eventsSection = $("main");

    function loadingView() {
        eventsSection.html("loading...");
    }

    function cstrEvent(event) {
        return new Promise(resolve => {
            srv.getPlayers(event.players)
                .then(players => {
                    event.players = players;
                    return srv.getSports(event.sport_id);
                })
                .then(sport => {
                    event.sport = sport;
                    console.log(JSON.stringify(event));
                    resolve();
                })
        })
    }

    function updateView(event) {
        if (eventsSection.html === "loading...") {
            eventSection.html("");
            eventsSection.append(createEvent(event));
        } else {
            eventsSection.append(createEvent(event));
        }
    }

    function createEvent(event) {
        return $(
            `<div class = "activitee" >` +
            `<a href="./event/${event.id}">` +
            `<img src="../img/sport/${event.sport.picture}" alt="${event.sport.name}">` +
            `<h2>${event.name}</h2>` +
            `<p class="date">${event.date}</p>` +
            `<p class ="descrition">${event.description}</p>` +
            `<p>${event.location.name}</p>` +
            '<input type="button" value ="s\' inscrire">' +
            `</a>` +
            `</div>`)
    }

    loadingView();
    srv.getEvents()
        .then(events => {
            events.forEach(event => {
                cstrEvent(event)
                    .then(updateView(event))
            })
        })


})(jQuery, sporttribe.indexService, sporttribe.utils);