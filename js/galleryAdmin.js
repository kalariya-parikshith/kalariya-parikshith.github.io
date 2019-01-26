var data 	= JSON.parse(data);
var images 	= data[0].images;

var imageIdSelected = null;

var navigationElement				= document.getElementById('navigation');
var editMenuOptionElement 			= document.getElementById('editMenuOption');
var imagesContainerElement 			= document.getElementById('imagesContainer');
var deleteMenuOptionElement 		= document.getElementById('deleteMenuOption');
var dialogueBoxCloseElement 		= document.getElementById('dialogueBoxClose');
var addNewImageButtonElement		= document.getElementById('addNewImageButton');
var addOrEditDialogueBoxElement 	= document.getElementById('addOrEditDialogueBoxId');
var dialogueBoxSubmitButtonElement 	= document.getElementById('dialogueBoxSubmitButton');
var dialogueBoxHeaderContentElement = document.getElementById('dialogueBoxHeaderContent');

window.addEventListener("scroll", function(event) {
    if (window.scrollY > 100) {
    	navigationElement.style.backgroundColor="white";
    } else {
    	navigationElement.style.backgroundColor=null;	
    }
    
}, false);

loadImages = function() {
	imagesContainer.innerHTML = "";
	images.forEach( function(imageObj) {
		var img = new Image();
		img.id  = imageObj.imageId;
		img.src = imageObj.url;
		img.className = "imagesContainers_image";
		imagesContainer.appendChild(img);
	});
}
loadImages();

getNewImageId = function() {
	var maxId = 0;
	images.forEach( function(obj) {
		if(maxId < parseInt(obj.imageId))
			maxId = parseInt(obj.imageId);
	});
	return maxId + 1;
}

getCurrentDate_YYYYMMDD = function() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; 
	var yyyy = today.getFullYear();
	if (dd < 10) {
  		dd = '0' + dd;
	} 
	if (mm < 10) {
  		mm = '0' + mm;
	} 
	return yyyy + '-' + mm + '-' + dd;
}

isDateValid = function() {
	var formDate = new Date(document.getElementById('imageUploadedDateId').value);
	var todayDate = new Date();
	if(formDate.getFullYear() < todayDate.getFullYear()) {
		return true;
	} else if(formDate.getMonth() < todayDate.getMonth()) {
		return true;
	} else if(formDate.getDate() <= todayDate.getDate()) {
		return true;
	} else {
		return false;
	}
}

hideInvalidValidationMessage = function() {
	document.getElementById('urlInvalid').style.display = 'none';
	document.getElementById('nameEmpty').style.display = 'none';
	document.getElementById('uploadDateInvalid').style.display = 'none';
}

editMenuOptionElement.onclick = function() {
	addOrEditDialogueBoxElement.style.display = "block";
	dialogueBoxHeaderContentElement.innerHTML = "Edit";
	var contextMenu = document.getElementById("contextMenu");
	contextMenu.style.display = "";
	contextMenu.style.left = "";
	contextMenu.style.top = "";
	data[0].images.forEach( function(obj) {
		if(obj.imageId == imageIdSelected) {
			document.getElementById('imageUrlId').value  = obj.url;
			document.getElementById('imageNameId').value = obj.name;
			document.getElementById('imageInfoId').value = obj.info;
			document.getElementById('imageUploadedDateId').value = obj.upload_date;
		}
	});
};

imagesContainerElement.onclick = function() {
	var contextMenu = document.getElementById("contextMenu");
	contextMenu.style.display = "";
	contextMenu.style.left = "";
	contextMenu.style.top = "";
};

imagesContainerElement.addEventListener('contextmenu', function (event) {
	if (event.target.tagName === 'IMG') {
		event.preventDefault();
		imageIdSelected = event.target.id;
		console.log(imageIdSelected);
		var contextMenu = document.getElementById("contextMenu");
		contextMenu.style.display = "block";
		contextMenu.style.left = (event.pageX - 10)+"px";
		contextMenu.style.top = (event.pageY - 10)+"px";
	}
}, false);

deleteMenuOptionElement.onclick = function() {
	var index=0;
	var contextMenu = document.getElementById("contextMenu");
	contextMenu.style.display = "";
	contextMenu.style.left = "";
	contextMenu.style.top = "";
	data[0].images.forEach( function(obj){
		if(obj.imageId == imageIdSelected){
			data[0].images.splice(index,1);
			imagesContainer.innerHTML = "";
			data[0].images.forEach( function(obj) {
				var img = new Image();
				img.src = obj.url;
				img.setAttribute("class", "imagesContainers_image");
				img.setAttribute("alt", "effy");
				img.id=obj.imageId;
				console.log(obj.imageId);
				document.getElementById("imagesContainer").appendChild(img);
			});
		}
		index++;
	});
};

dialogueBoxCloseElement.onclick = function() {
	addOrEditDialogueBoxElement.style.display = "none";
	hideInvalidValidationMessage();
}

addNewImageButtonElement.onclick = function() {
	document.getElementById('imageUrlId').value		= "";
	document.getElementById('imageNameId').value 	= "";
	document.getElementById('imageInfoId').value 	= "";
	document.getElementById('imageUploadedDateId').value = getCurrentDate_YYYYMMDD();
	dialogueBoxHeaderContentElement.innerHTML = "Add New Image";
	addOrEditDialogueBoxElement.style.display = "block";
}

dialogueBoxSubmitButtonElement.onclick = function() {
	hideInvalidValidationMessage();
	var urlPattern = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;
	if(!urlPattern.test(document.getElementById('imageUrlId').value)) {
		document.getElementById('urlInvalid').style.display = 'block';
		return;
	} else if(document.getElementById('imageNameId').value == '') {
		document.getElementById('nameEmpty').style.display = 'block';
		return;
	} else if(!isDateValid()) {
		document.getElementById('uploadDateInvalid').style.display = 'block';
		return;
	}
	if (dialogueBoxHeaderContentElement.innerHTML == "Edit") {
		addOrEditDialogueBoxElement.style.display = "none";
		images.forEach( function(obj) {
			if (obj.imageId == imageIdSelected) {
				obj.url 		= document.getElementById('imageUrlId').value;
				obj.name 		= document.getElementById('imageNameId').value;
				obj.info 		= document.getElementById('imageInfoId').value;
				obj.upload_date = document.getElementById('imageUploadedDateId').value;
				addOrEditDialogueBoxElement.style.display = "none";
			}
		});	
	} else if (dialogueBoxHeaderContentElement.innerHTML == "Add New Image") {
		var newImageId 	= getNewImageId();
		var newImageUrl = document.getElementById('imageUrlId').value;
		var newImageName = document.getElementById('imageNameId').value;
		var newImageInfo = document.getElementById('imageInfoId').value;
		var newImageUploadDate = document.getElementById('imageUploadedDateId').value;
		
		images.push({"imageId":newImageId, "url": newImageUrl, "name":newImageName, "info":newImageInfo, "upload_date": newImageUploadDate});
		loadImages();
		addOrEditDialogueBoxElement.style.display = "none";
	}
	hideInvalidValidationMessage();
}
