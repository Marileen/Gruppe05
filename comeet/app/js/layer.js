
/*
 * Layer öffnen
 *
 * **/
function openLayer (item, event)
{
    event.preventDefault();
    document.querySelector('.layer').classList.add('show');

    //body
    document.querySelector('body').classList.add('layer-open');

    //Close Buttons
    var closeButtons = document.querySelectorAll('.close-layer');
    Array.prototype.forEach.call(closeButtons, function (elem, idx) {
        elem.addEventListener('click', closeLayer.bind(null, event));
    });

}

/*
 * Layer schliessen
 *
 * **/
function closeLayer () {
    event.preventDefault();
    document.querySelector('.layer').classList.remove('show');

    //body
    document.querySelector('body').classList.remove('layer-open');
}

function initLayer ()
{
    document.querySelector('.open-layer').addEventListener('click', openLayer.bind(null, event));
}

window.onload=initLayer;