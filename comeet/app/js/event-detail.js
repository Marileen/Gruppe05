/*
 * Eventdaten Details holen
 *
 * **/

function getDetailEventData () {

    //Event Daten holen anhand der Event ID
    //todo
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

            entries.attendees.forEach(function(elem) {
                var newElement = document.createElement('tr');
                var innerHTMLString = "<td>"+ elem.Name +"</td>";
                if (elem.items) {
                    innerHTMLString = innerHTMLString + "<td>"+ elem.items +"</td>"
                }
                newElement.innerHTML = innerHTMLString;
                attendees.appendChild(newElement);
            });

            document.getElementById('DateTime').innerHTML = entries.date;
            document.getElementById('Address').innerHTML = entries.street + ' ' + entries.nr + ', ' + entries.postcode + ' ' + entries.city;
            document.getElementById('Map').setAttribute('src', entries.MapLink);

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
