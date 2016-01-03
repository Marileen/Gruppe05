function saveEvent(event)
{
    event.preventDefault();



    //window.location.href = "02_overview.html";
}

function addItems (event)
{
    event.preventDefault();
    console.log('item add');

    //Hier wollen wir ein neues Element hinzufügen, ein text input
    var newElement = document.createElement('div');
    newElement.innerHTML = "<input type='text' name='item' />";

    //das neue Element bekommt auch wieder diesen Event Listener, damit man dann noch eins hinzufügen kann
    newElement.addEventListener('input', addItems.bind(event));
    console.log(event.target.value.length)
    if (document.querySelector('.item-container') && event.target.value.length == 1) {
        document.querySelector('.item-container').appendChild(newElement);
    }

}

function initEvent()
{
    if (document.querySelector('#saveEvent'))
    {
        document.querySelector('#saveEvent').addEventListener('click', saveEvent.bind(event));
        document.querySelector('#saveEvent').focus();
    }

    if (document.querySelector('.item-container input[name="item"]')) {
        document.querySelector('.item-container input[name="item"]').addEventListener('input', addItems);
    }

}

window.addEventListener('load', initEvent);
