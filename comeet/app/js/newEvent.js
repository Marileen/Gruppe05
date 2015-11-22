function saveEvent(event)
{
    event.preventDefault();

    window.location.href = "/04_detail.html";
}

function initEvent()
{
    console.log('sefwrg');
    if (document.querySelector('#saveEvent')) {
        document.querySelector('#saveEvent').addEventListener('click', saveEvent.bind(event));
    }
}

window.addEventListener('load', initEvent);