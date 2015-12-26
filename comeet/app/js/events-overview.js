/*
 * Es wird ein post request abgeschickt
 * und wenn der erfolgreich war eine meldung eingeblendet
 * das geschieht über das setzen einer css klasse
 *
 * **/

function getEventData (e) {

    e.preventDefault();

    //GET User Data
    eventsRequest = makeAjaxGetRequest('events-overview.php', data);


    eventsRequest.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (eventsRequest.readyState == 4 && eventsRequest.status == 200)
        {
            console.log(eventsRequest.responseText);

            if (eventsRequest.responseText.indexOf('success') > -1)
            {
                console.log(' todo: show overview');
            }

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
    }
}

window.addEventListener('load', initOverview);
