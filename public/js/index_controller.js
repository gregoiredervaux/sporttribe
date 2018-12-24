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
                    console.log("on y arrive bien: " + event.location_id);
                    event.sport = sport[0];
                    return srv.getLocations(event.location_id);
                })
                .then(location => {
                    event.location = location[0];
                    resolve(event);
                })
        })
    }

    function updateView(event) {
        if (eventsSection.html === "loading...") {
            eventsSection.html("");
            eventsSection.append(createEvent(event));
        } else {
            eventsSection.append(createEvent(event));
        }
    }

    function createEvent(event) {
        console.log("on execute bien cette fonction");

        console.log("test: " + JSON.stringify(event));

        let html =   `<div class = "activitee" >` +
                    `<a href="./event/${event.id}">` +
                        `<img src="/public/img/sport/${event.sport.icon}" alt="${event.sport.name}">` +
                        `<h2>${event.name}</h2>` +
                        `<p class="date">${event.date}</p>` +
                        `<p class ="descrition">${event.description}</p>` +
                        `<p>${event.location.name}</p>` +
                        `<input type="button" value ="s\' inscrire">` +
                    `</a>` +
                `</div>`;
        console.log(typeof html);
        return html
    }

    loadingView();
    srv.getEvents()
        .then(events => {
            events.forEach(event => {
                console.log("cstrEvent");
                cstrEvent(event)
                    .then(event => {
                        console.log("updateview");
                        updateView(event)
                    })
            })
        })


})(jQuery, sporttribe.indexService, sporttribe.utils);