var imagesJson;

var imagesContainerElement = document.getElementById('imagesContainer');

getJsonObjectLocally = function() {
	return JSON.parse(localStorage.getItem('imagesJson'));
}

storeJsonObjectLocally = function() {
	localStorage.setItem('imagesJson',JSON.stringify(imagesJson));
}

loadImages = function() {
	if (localStorage.getItem('imagesJson') == null) {
		imagesJson = JSON.parse(data); // retrives data from ImgData and stores in imagesJson
		storeJsonObjectLocally();
	} else {
		imagesJson = getJsonObjectLocally();
	}

	imagesContainerElement.innerHTML = "";
	imagesJson[0].images.forEach( function(imageObj) {
		var img = new Image();
		img.id  = imageObj.imageId;
		img.src = imageObj.url;
		img.className = "imagesContainers_image";
		imagesContainer.appendChild(img);
	});
}
loadImages();

validateForm = function() {
	document.getElementById('nameEmpty').style.display	="none";
	document.getElementById('emailEmpty').style.display	="none";
	document.getElementById('messageEmpty').style.display="none";
	var email 		= document.getElementById('email').value.trim();
	var fullname	= document.getElementById('fullname').value.trim();
	var message 	= document.getElementById('messageBox').value.trim();
	if(fullname == ""){
		document.getElementById('nameEmpty').style.display="block";
	} else if(email == "") {
		document.getElementById('emailEmpty').style.display="block";
	} else if(message == "") {
		document.getElementById('messageEmpty').style.display="block";
	} else {
		alert("form submitted");
	}
	document.getElementById('email').value = "";
	document.getElementById('fullname').value = "";
	document.getElementById('messageBox').value = "";
}

window.addEventListener("scroll", function(event) {
	if (window.scrollY > 100) {
		document.getElementById("navigationBar").style.backgroundColor="white";
	} else {
		document.getElementById("navigationBar").style.backgroundColor=null;	
	}
}, false);
