/*
 * Es wird ein post request abgeschickt
 * und wenn der erfolgreich war eine meldung eingeblendet
 * das geschieht über das setzen einer css klasse
 *
 * **/

function getEventData () {

    //GET User Data
    eventsRequest = makeAjaxGetRequest('events-overview.php');


    eventsRequest.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (eventsRequest.readyState == 4 && eventsRequest.status == 200)
        {
            console.log("Response: " + eventsRequest.responseText);
            var entries = {};

            entries = JSON.parse(eventsRequest.responseText);

            console.log(entries);
            //todo for each event-entry
            var meineEvents = document.querySelector('.myEvents');
            var headline = '';
            var date = '';
            var description = '';
            var dots = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
            var location = '';

            entries.events.forEach(function (elem)
            {
                //Element anlegen in Elternelem
                console.log(elem.title);

                var newElement = document.createElement('a');
                //todo noch href hinzufügen
                newElement.classList.add('event-entry');

                headline = '<div class="title col-xs-12 col-sm-8"><h2>' + elem.title + '</h2></div>';

                newElement.innerHTML = headline + date + description + dots + location;
                meineEvents.appendChild(newElement);

            })


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
        console.log(document.querySelector('.component[data-component="events-overview"]'));
        getEventData();
    }
}

window.addEventListener('load', initOverview);
