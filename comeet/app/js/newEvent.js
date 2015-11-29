function saveEvent(event)
{
    event.preventDefault();

    window.location.href = "/04_detail.html";
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

    if (document.querySelector('.item-container')) {
        document.querySelector('.item-container').appendChild(newElement);
    }

    //remove handler from element, we want this to excecute only once
    event.target.removeEventListener(event.type, arguments.callee);
}

function initEvent()
{
    console.log('sefwrg');
    if (document.querySelector('#saveEvent')) {
        document.querySelector('#saveEvent').addEventListener('click', saveEvent.bind(event));
    }

    if (document.querySelector('.item-container input[name="item"]')) {
        document.querySelector('.item-container input[name="item"]').addEventListener('input', addItems);
    }

}

window.addEventListener('load', initEvent);