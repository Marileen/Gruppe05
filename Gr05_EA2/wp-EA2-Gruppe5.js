/*
	Adds all initially (and only initially) needed eventListeners
	Do not add event listeners that are supposed to be added dynamically.
*/

function addListenersFirst() {
	// Add click listener to the upper div with className 'rechts'
	// a) put the div elements into a variable
    var targetContainer = document.getElementById('container');
    var klickBox = document.getElementsByClassName('linkebox')[0];


    var targetContainer2 = document.getElementById('container2');
    var overBox = document.getElementsByClassName('rechtebox')[0];

	// b) use variable to add event listener
    klickBox.addEventListener("click", function (evt) {
        copyMe(klickBox,targetContainer);
    });

	// Add mouseover listener to the upper div with classname 'links'
    overBox.addEventListener("mouseover", function (evt) {
        flipMe(overBox,targetContainer2);
    });

	// Add listeners to action elements for "Make Alerts" "Bezeichner" and "Schreibe den Text"

	// add listener to form input elements

}

/*
	copyMe copies the text from one element to another
*/
function copyMe(fromElement, toElement){

    // put the content of the source element into text node of the target element
    toElement.textContent = fromElement.textContent;

}


/*
	flipMe copies the text from one element to another and deletes the text from
	the original element.
*/
function flipMe(fromElement, toElement){
    // works similar to copyMe
    // in addition, delete the text from the source element

    var container = toElement;
    var divlinks = fromElement;

    if (divlinks.textContent != ""){
        container.textContent = divlinks.textContent;
        divlinks.textContent = "" ;
    }
}


/*
	makeAlerts puts alerts to several elements
*/
function makeAlerts(){
	myp = document.querySelectorAll("#a2 p");

	// put event listener for each selected tag
	
}

/*
	evokes the alert
*/
function showNewAlert(){
	// An alert should be displayed with the text of the paragraph that evoked the function.
	// Use "this" to refer to the actual object
	
}

/*
	switchME switches the text of two boxes
*/
function switchMe(){


}

/*
	changeColor changes the color of the colored 
	boxes depending on the selection of the respective select box.
*/
function changeColor(){
	// Variable idName stores the ID of the elements that invoked this function
	var idName = this.id;

	// Use if else statement to distinguish which select box has been used.
	// For each case: select the html element that correspond to the used select box.
	// For this element set a new attribute class with the name that corresponds to the selected value.
	// Have a look to the css to know which class will help you.

	// Console log if needed.
	console.log("value: " + this.value + ", id: " + this.id);
}

/*
	createText concatenates text from the input fields
*/
function createText(){

}



window.onload=addListenersFirst;


