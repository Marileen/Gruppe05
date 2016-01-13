/*
 * eventdaten holen
 *
 * **/

function getEventData () {

    //GET User Data
    eventsRequest = makeAjaxGetRequest('events-overview.php');

    eventsRequest.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (eventsRequest.readyState == 4 && eventsRequest.status == 200)
        {
            var entries = {};

            entries = JSON.parse(eventsRequest.responseText);
            console.log("Response: " + eventsRequest.responseText);
            console.log(entries);

            var meineEvents = document.querySelector('.myEvents');
            var freundeEvents = document.querySelector('.friendEvents');
            var headline = '';
            var date = '';
            var description = '';
            var dots = '<span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
            var location = '';

            //MEINE Events
            entries.events.forEach(function (elem)
            {
                //Element anlegen in Elternelem
                var newElement = document.createElement('a');
                newElement.setAttribute('href', "04_detail.html?id=" + elem.eventID);
                newElement.classList.add('event-entry');

                headline = '<div class="title col-xs-12 col-sm-8"><h2>' + elem.title + '</h2></div>';
                date = '<div class="time col-xs-12 col-sm-4 icon-clock">' + elem.date + '</div>';
                profilpicture = '<div class="time col-xs-12 col-sm-4 profilpic">' + elem.pic + '</div>';
                description = '<div class="description col-xs-12 col-sm-8"><span>' + elem.description + '</span>';
                location = '<div class="location col-xs-12 col-sm-4 icon-location2">' + elem.street +' '+ elem.nr +'<br>'+ elem.postcode +' '+ elem.city + '</div>';

                newElement.innerHTML = headline + date + description + dots + location;
                meineEvents.appendChild(newElement);

            });

            //FREUNDE Events
            entries.friendEvents.forEach(function (elem)
            {
                //Element anlegen in Elternelem
                var newElement = document.createElement('a');
                newElement.setAttribute('href', "04_detail.html?id=" + elem.eventID);
                newElement.classList.add('event-entry');

                headline = '<div class="title col-xs-12 col-sm-8"><h2>' + elem.title + '</h2><span class="owner"> von '+ elem.firstname +' ' + elem.lastname +'</span></div>';
                date = '<div class="time col-xs-12 col-sm-4 icon-clock">' + elem.date + '</div>';
                description = '<div class="description col-xs-12 col-sm-8"><span>' + elem.description + '</span>';
                location = '<div class="location col-xs-12 col-sm-4 icon-location2">' + elem.street +' '+ elem.nr +'<br>'+ elem.postcode +' '+ elem.city + '</div>';

                newElement.innerHTML = headline + date + description + dots + location;
                freundeEvents.appendChild(newElement);

            });


        } else
        {
            //redirect to login or show a message
        }
    }
}

function initOverview()
{
    console.log('2: init Events Overview Component');
    if (document.querySelector('.component[data-component="events-overview"]')) {
        getEventData();
    }
}

window.addEventListener('load', initOverview);
