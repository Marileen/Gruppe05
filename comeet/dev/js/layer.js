
/*
 * Layer öffnen
 *
 * **/
function openLayer (item, event) {

    event.preventDefault();
    if (document.querySelector('.layer'))   {
        document.querySelector('.layer').classList.add('show');
    }

    //body
    document.querySelector('body').classList.add('layer-open');

    //Close Buttons
    var closeButtons = document.querySelectorAll('.close-layer');

    if (closeButtons) {
        Array.prototype.forEach.call(closeButtons, function (elem, idx)
        {
            elem.addEventListener('click', closeLayer.bind(null, event));
        });
    }

}

/*
 * Layer schliessen
 *
 * **/
function closeLayer () {
    event.preventDefault();
    if (document.querySelector('.layer')) {
        document.querySelector('.layer').classList.remove('show');
    }
    //body
    document.querySelector('body').classList.remove('layer-open');
}

function initLayer ()
{
    console.log('init layer');
    if (document.querySelector('.open-layer')) {
        document.querySelector('.open-layer').addEventListener('click', openLayer.bind(null, event));
        console.log('layer gefunden')
    }
}

window.addEventListener('load', initLayer);