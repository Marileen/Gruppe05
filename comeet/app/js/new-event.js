function saveEvent(event)
{
    event.preventDefault();

    //Formulardaten holen
    var data = "";
    var inputFields = document.querySelectorAll('[data-component="new-event"] input');
    Array.prototype.forEach.call(inputFields, function (elem)
    {
        data = data + elem.name + "=" + elem.value + "&";
    });

    //und noch das textarea
    var description = document.getElementById('description');
    data = data + "description=" + description.value;

    console.log(data);

    //Formulardaten senden
    RegistrationRequest = makeAjaxPostRequest('new-event.php', data);


    RegistrationRequest.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (RegistrationRequest.readyState == 4 && RegistrationRequest.status == 200) {
            console.log(RegistrationRequest.responseText);
            console.log('neues Event eingefügt');
            window.location.href = "02_overview.html";
        }
    }
}

function addItems(event)
{

    if (event.target.getAttribute('data-helper') != '1' && event.target.value.length > 2) {
        event.target.setAttribute('data-helper', '1');       //data-helper auf 1 setzen, da es nur ein neue elem pro elem geben darf

        itemCount++;

        //Hier wollen wir ein neues Element hinzufügen, ein text input
        var newElement = document.createElement('div');
        newElement.innerHTML = "<input type='text' name='item_" + itemCount + "' />";

        //das neue Element bekommt auch wieder diesen Event Listener, damit man dann noch eins hinzufügen kann
        newElement.addEventListener('input', addItems);
        if (document.querySelector('.item-container')) {
            document.querySelector('.item-container').appendChild(newElement);
        }

        //checken ob welche leer sind:
        if (document.querySelectorAll('.item-container div').length > 9) {
            console.log('leere - ausser dem untersten - löschen'); //TODO
        }

    }

}

function initEvent()
{

    //User Session Variable abfragen
    //Formulardaten senden
    CheckupRequest = makeAjaxPostRequest('new-event.php', "userCheckup=yes");
    CheckupRequest.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (CheckupRequest.readyState == 4 && CheckupRequest.status == 200) {

            console.log(CheckupRequest.responseText);

            if (CheckupRequest.responseText.indexOf('success') > -1) {
                document.querySelector('[data-component="new-event"] form').classList.add('show');
            } else{
                document.querySelector('.errormessage').classList.add('show');
            }

        }
    }


    console.log('3: init new Event - erstelle jetzt ein neues Event');
    if (document.querySelector('#saveEvent')) {
        document.querySelector('#saveEvent').addEventListener('click', saveEvent);
        document.querySelector('#saveEvent').focus();
    }

    if (document.querySelector('.item-container input[name="item_0"]')) {
        document.querySelector('.item-container input[name="item_0"]').addEventListener('keydown', addItems);
    }

}

var itemCount = 0;

window.addEventListener('load', initEvent);
