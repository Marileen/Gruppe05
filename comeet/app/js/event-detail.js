/*
 * Eventdaten Details holen
 *
 * **/

function getDetailEventData () {

    //Event Daten holen anhand der Event ID
    eventID = 'id='+QueryString.id;
    console.log(eventID);

    eventRequest = makeAjaxPostRequest('event-detail.php', eventID);

    eventRequest.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (eventRequest.readyState == 4 && eventRequest.status == 200)
        {
            console.log("Response: " + eventRequest.responseText);

            var entries = {};

            entries = JSON.parse(eventRequest.responseText);

            document.getElementById('Owner').innerHTML = entries.Owner;
            document.getElementById('Title').innerHTML = entries.title;
            document.getElementById('Description').innerHTML = entries.description;


            var attendees = document.querySelector('table.attendees');

            if (entries.attendees) {
                entries.attendees.forEach(function (elem)
                {
                    var newElement = document.createElement('tr');
                    var innerHTMLString = "<td>" + elem.Name + "</td>";
                    if (elem.items) {
                        innerHTMLString = innerHTMLString + "<td>" + elem.items + "</td>"
                    }
                    newElement.innerHTML = innerHTMLString;
                    attendees.appendChild(newElement);
                });

            }

            //show button nur bei eigenen events:
            console.log('ismine: ' + entries.isMine);
            if (entries.isMine != "1") {
                document.getElementById('edit').classList.add('hide');
                document.getElementById('delete').classList.add('hide');

            } else  //und teilnehmen Option nur bei Fremd-Events
            {
                document.querySelector('.attendEvent').classList.add('show');
            }

            document.getElementById('DateTime').innerHTML = entries.date;
            document.getElementById('Address').innerHTML = entries.street + ' ' + entries.nr + ', ' + entries.postcode + ' ' + entries.city;
            document.getElementById('Map').setAttribute('src', entries.MapLink);

        } else
        {
            //redirect to login or show a message
        }
    }

}


function attendToEvent () {
    //TODO
    //gucken welche checkboxen angeklickt sind

    //daten wegschicken

    //php: daten in db speichern, teilnehmer + items

}

/*
 * Event löschen, dann wieder die Übersicht anzeigen
 *
 * **/
function deleteEvent(e) {


    e.preventDefault();

    console.log('delete event');

    var deleteConfirm = confirm("Wirklich löschen?");
    if (deleteConfirm == true) {
        console.log('delete event bestätigt');

        deleteEventRequest = makeAjaxPostRequest('delete-event.php','id=' + QueryString.id);

        console.log('what i sent:');
        console.log('id=' + QueryString.id);

        deleteEventRequest.onreadystatechange = function ()
        { //Call a function when the state changes.

            if (deleteEventRequest.readyState == 4 && deleteEventRequest.status == 200) {
                console.log('zurück von delete-event.php: ' + deleteEventRequest.responseText);
                //meldung event gelöscht
                if (deleteEventRequest.responseText.indexOf('success') > -1)
                {
                    window.location.href = '02_overview.html';

                } else
                {
                    //Meldung anzeigen, dass der Login fehlgeschlagen ist
                    document.querySelector('.errormessage.event').classList.add('show');
                }
            }
        }

    } else {
        //
    }

}

function initEventDetail()
{
    console.log('3: init Events Detail Component');
    //if (document.querySelector('.component[data-component="events-overview"]')) {
    getDetailEventData();
    //}

    if (document.querySelector('button#delete')) {
        document.querySelector('button#delete').addEventListener('click', deleteEvent);
    }

    if (document.querySelector('.button.attend')) {
        document.querySelector('.button.attend').addEventListener('click', attendToEvent);
    }

}

window.addEventListener('load', initEventDetail);
