function doRegistration (event) {
    event.preventDefault();

    window.location.href = "/02_overview.html";
}

function initRegistration()
{
    console.log('init registration');
    if (document.querySelector('#register')) {
        document.querySelector('#register').addEventListener('click', doRegistration.bind(null, event));
    }
}

window.addEventListener('load', initRegistration);