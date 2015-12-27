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
            var events = {};

            events = JSON.parse(eventsRequest.responseText);

            console.log(events);

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
