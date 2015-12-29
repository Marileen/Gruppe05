/*
 * Eventdaten Details holen
 *
 * **/

function getDetailEventData () {

    //Event Daten holen anhand der Event ID
    //todo
    eventID = 'id='+QueryString.id;
    console.log(QueryString.id);

    eventRequest = makeAjaxPostRequest('event-detail.php', eventID);

    eventRequest.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (eventRequest.readyState == 4 && eventRequest.status == 200)
        {
            console.log("Response: " + eventRequest.responseText);
            /*
            var entries = {};

            entries = JSON.parse(eventRequest.responseText);

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
                description = '<div class="description col-xs-12 col-sm-8"><span>' + elem.description + '</span>';
                location = '<div class="location col-xs-12 col-sm-4 icon-location2">' + elem.street +' '+ elem.nr +'<br>'+ elem.postcode +' '+ elem.city + '</div>';

                newElement.innerHTML = headline + date + description + dots + location;
                meineEvents.appendChild(newElement);

            });
            */


        } else
        {
            //redirect to login or show a message
        }
    }

}

function initEventDetail()
{
    console.log('3: init Events Detail Component');
    //if (document.querySelector('.component[data-component="events-overview"]')) {
    getDetailEventData();
    //}
}

window.addEventListener('load', initEventDetail);
