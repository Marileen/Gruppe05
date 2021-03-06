/*
 * Es wird ein post request abgeschickt zum überprüfen der Userdaten
 * und wenn der erfolgreich war zur Event Overview Seite weitergeleitet
 * wenn nicht, dann wird eine Meldung angezeigt
 *
 * **/


function initCalendar()
{
    if (document.querySelector('[data-component="month"]')) {
        var calenderComponent = document.querySelector('[data-component="month"]');

        //hole die Tage für diesen und nächsten Monat und markiere sie
        //var dummyResponse = '{"thisMonth" : [{"day" : "2"}, {"day" : "4"}], "nextM" : [{"day" : "3"}, {"day" : "5"}]}';

        var today = new Date();
        var thisY = today.getFullYear();
        var thisM = today.getMonth() + 1;
        var nextM = today.getMonth() + 2;
        var data = "thisM=" + thisM + "&nextM=" + nextM + "&thisY=" + thisY;

        console.log('CHECK data:' + data);

        var requestCal = makeAjaxPostRequest('calendar-days.php', data);

        requestCal.onreadystatechange = function ()
        { //Call a function when the state changes.

            if (requestCal.readyState == 4 && requestCal.status == 200 && requestCal.responseText.length > 0) {
                console.log('Tage vom Server: ' + requestCal.responseText);

                var days = {};
                days = JSON.parse(requestCal.responseText);

                days.thisMonth.forEach(function (elem)
                {
                    if (document.querySelector('#pikaContainerThisMonth [data-day="' + elem.day + '"]')) {
                        document.querySelector('#pikaContainerThisMonth [data-day="' + elem.day + '"]').classList.add('is-selected');

                    }
                });

                days.nextM.forEach(function (elem)
                {
                    if (document.querySelector('#pikaContainerNextMonth [data-day="' + elem.day + '"]')) {

                        document.querySelector('#pikaContainerNextMonth [data-day="' + elem.day + '"]').classList.add('is-selected');
                    }
                });

            }
        }

    }

}


window.addEventListener('load', initCalendar);
