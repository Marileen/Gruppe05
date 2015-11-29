/*
	Adds all initially (and only initially) needed eventListeners
	Do not add event listeners that are supposed to be added dynamically.
*/

function addListenersFirst()
{
	// Add click listener to the upper div with className 'rechts'
	// a) put the div elements into a variable
    var targetContainer = document.getElementById('container');
    var klickBox = document.getElementsByClassName('linkebox')[0];


    var targetContainer2 = document.getElementById('container2');
    var overBox = document.getElementsByClassName('rechtebox')[0];

    var klickButton = document.querySelectorAll('#a2 input')[0];

	// b) use variable to add event listener
    klickBox.addEventListener("click", copyMe.bind(this, klickBox,targetContainer));


	// Add mouseover listener to the upper div with classname 'links'
    overBox.addEventListener("mouseover", function (evt)
    {
        flipMe(overBox,targetContainer2);
    });

	// Add listeners to action elements for "Make Alerts" "Bezeichner" and "Schreibe den Text"
    klickButton.addEventListener("click", makeAlerts);

    // Aufgabe 3:
    var klickBoxContentChange = document.querySelectorAll("#a3 input")[0];
    var boxLinks =  document.querySelectorAll("#a3 #links")[0];
    var boxRechts =  document.querySelectorAll("#a3 #mitte")[0];

    klickBoxContentChange.addEventListener("click", switchMe.bind(this, boxLinks, boxRechts));

    //Aufgabe 4:
    Array.prototype.forEach.call(document.querySelectorAll(".a4 select"), function (elem)
    {
            //console.log(elem);
            elem.addEventListener("change", changeColor.bind(elem));
    });

    //Aufgabe 5:
    var buildText = document.querySelectorAll(".a5 #createtext")[0];
    buildText.addEventListener("click", createText);

}

/*
	copyMe copies the text from one element to another
*/
function copyMe(fromElement, toElement)
{

    // put the content of the source element into text node of the target element
    toElement.textContent = fromElement.textContent;
}

/*
	flipMe copies the text from one element to another and deletes the text from
	the original element.
*/
function flipMe(fromElement, toElement)
{
    // works similar to copyMe
    // in addition, delete the text from the source element

    var container = toElement;
    var divlinks = fromElement;

    if (divlinks.textContent != "")
    {
        container.textContent = divlinks.textContent;
        divlinks.textContent = "" ;
    }
}


/*
	makeAlerts puts alerts to several elements
*/
function makeAlerts()
{

    myp = document.querySelectorAll("#a2 p");

    document.querySelectorAll('#a2 input')[0].disabled = true;

    // put event listener for each selected tag
    Array.prototype.forEach.call(myp, function(el, i)
    {
        el.addEventListener("click", function (evt)
        {
            alert(this.textContent);
        });
    });


    }

/*
	switchME switches the text of two boxes
*/
function switchMe(box1, box2)
{

    var tmp = box1.textContent;

    box1.textContent = box2.textContent;
    box2.textContent = tmp;

}

/*
	changeColor changes the color of the colored 
	boxes depending on the selection of the respective select box.
*/
function changeColor()
{
	// Variable idName stores the ID of the elements that invoked this function
	var idName = this.id;

	// Use if else statement to distinguish which select box has been used.
    // For each case: select the html element that correspond to the used select box.
    // For this element set a new attribute class with the name that corresponds to the selected value.
    // Have a look to the css to know which class will help you.
    if (idName == "colorLeft")
    {
        document.getElementById("links").className = this.value;
    } else if (idName == "colorMiddle")
    {
        document.getElementById("mitte").className = this.value;
    } else if (idName == "colorRight")
    {
        document.getElementById("rechts").className = this.value;
    }
}

/*
	createText concatenates text from the input fields
*/
function createText()
{

    var name = document.getElementById("name").value;
    var number = document.getElementById("number").value;
    var thing = document.getElementById("thing").value;

    document.getElementById("loesung").textContent = name + ' hat ' + number + ' ' + thing;
}

window.onload=addListenersFirst;


