/*
 * Es wird ein post request abgeschickt zum überprüfen der Userdaten
 * und wenn der erfolgreich war zur Event Overview Seite weitergeleitet
 * wenn nicht, dann wird eine Meldung angezeigt
 *
 * **/


function initCalendar(){
    console.log('Calendar Refresh');
    if (document.querySelector('[data-component="month"]')) {
        var calenderComponent = document.querySelector('[data-component="month"]');
    }

    //hole die Tage für diesen und nächsten Monat und markiere sie
    var dummyResponse = '{"thisMonth" : [{"day" : "2"}, {"day" : "4"}], "nextM" : [{"day" : "3"}, {"day" : "5"}]}';
    var days = JSON.parse(dummyResponse);

    //entries.friendEvents.forEach(function (elem)

    days.thisMonth.forEach( function (elem)
    {
        document.querySelector('#pikaContainerThisMonth [data-day="' + elem.day + '"]').classList.add('is-selected');

    });

    days.nextM.forEach( function (elem)
    {
        document.querySelector('#pikaContainerNextMonth [data-day="' + elem.day + '"]').classList.add('is-selected');

    });

    var today = new Date();
    var thisM = today.getMonth()+1;
    var nextM = today.getMonth()+2;
    var data = "thisM="+thisM+"&nextM="+nextM;

    request = makeAjaxPostRequest('calendar-days.php', data);

    request.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (request.readyState == 4 && request.status == 200 && request.responseText.length > 0)
        {
            //todo
            console.log('Tage vom Server: '+request.responseText);

        }
    }

}


window.addEventListener('load', initCalendar);
