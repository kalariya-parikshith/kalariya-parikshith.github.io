window.addEventListener("scroll", function(event) {
    if (window.scrollY > 100) {
    	document.getElementsByClassName("navclass")[0].style.backgroundColor="white";
    } else {
    	document.getElementsByClassName("navclass")[0].style.backgroundColor=null;	
    }
    
}, false);
function validateForm(){
	var fullname = document.getElementById('fullname').value;
	var email 	 = document.getElementById('email').value;
	var message  = document.getElementById('message-box').value;
	if(fullname == ""){
		document.getElementByClassName('name-empty')[0].style.display="inline";
		return false;
	} else if(email == "") {
		document.getElementsByClassName('email-empty')[0].style.display="inline";
		return false;
	} else if(message == "") {
		document.getElementsByClassName('message-empty')[0].style.display="inline";
		return false;
	}
	return true;
}
var data = JSON.parse(data);
data[0].images.forEach( function(obj) {
  	var img = new Image();
  	// console.log(obj.id == 1);
	img.src = obj.url;
	img.setAttribute("class", "banner-img");
	img.setAttribute("alt", "effy");
	document.getElementById("img-container").appendChild(img);
});