var imagesJson;
var imageIdSelected = null;

var contextMenuElement			= document.getElementById("contextMenu");
var editMenuOptionElement 		= document.getElementById('editMenuOption');
var imagesContainerElement 		= document.getElementById('imagesContainer');
var deleteMenuOptionElement 		= document.getElementById('deleteMenuOption');
var dialogueBoxCloseElement 		= document.getElementById('dialogueBoxClose');
var addNewImageButtonElement		= document.getElementById('addNewImageButton');
var addOrEditDialogueBoxElement 	= document.getElementById('addOrEditDialogueBoxId');
var dialogueBoxSubmitButtonElement 	= document.getElementById('dialogueBoxSubmitButton');
var dialogueBoxHeaderContentElement	= document.getElementById('dialogueBoxHeaderContent');

var imageUrlElement 		= document.getElementById('imageUrlId');
var imageNameElement 		= document.getElementById('imageNameId');
var imageInfoElement		= document.getElementById('imageInfoId');
var imageUploadedDateElement	= document.getElementById('imageUploadedDateId');

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
		img.title = "right click to edit/delete";
		imagesContainerElement.appendChild(img);
	});
}
loadImages();

getNewImageId = function() {
	var maxId = 0;
	imagesJson[0].images.forEach( function(obj) {
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
	var formDate = new Date(imageUploadedDateElement.value);
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

hideContextMenu = function() {
	contextMenuElement.style.display = "";
	contextMenuElement.style.left = "";
	contextMenuElement.style.top = "";
}

initializeInputFieldsForNewImage = function() {
	imageUrlElement.value	= "";
	imageNameElement.value 	= "";
	imageInfoElement.value 	= "";
	imageUploadedDateElement.value = getCurrentDate_YYYYMMDD();
}

editMenuOptionElement.onclick = function() {
	addOrEditDialogueBoxElement.style.display = "block";
	dialogueBoxHeaderContentElement.innerHTML = "Edit";
	contextMenuElement.style.display = "";
	contextMenuElement.style.left = "";
	contextMenuElement.style.top = "";
	imagesJson[0].images.forEach( function(obj) {
		if(obj.imageId == imageIdSelected) {
			imageUrlElement.value  = obj.url;
			imageNameElement.value = obj.name;
			imageInfoElement.value = obj.info;
			imageUploadedDateElement.value = obj.upload_date;
		}
	});
};

imagesContainerElement.onclick = function() {
	hideContextMenu();
};

imagesContainerElement.addEventListener('contextmenu', function (event) {
	if (event.target.tagName === 'IMG') {
		event.preventDefault();
		imageIdSelected = event.target.id;
		contextMenuElement.style.display = "block";
		contextMenuElement.style.left = (event.pageX - 10)+"px";
		contextMenuElement.style.top = (event.pageY - 10)+"px";
	}
}, false);
// document.querySelectorAll("imagesContainers_image").onmouseover = function(){
	
// }
deleteMenuOptionElement.onclick = function() {
	var index=0;
	hideContextMenu();
	imagesJson[0].images.forEach( function(obj){
		if(obj.imageId == imageIdSelected){
			imagesJson[0].images.splice(index,1);
			storeJsonObjectLocally();
			loadImages();
			return;
		}
		index++;
	});
};

dialogueBoxCloseElement.onclick = function() {
	addOrEditDialogueBoxElement.style.display = "none";
	hideInvalidValidationMessage();
}

addNewImageButtonElement.onclick = function() {
	initializeInputFieldsForNewImage();
	dialogueBoxHeaderContentElement.innerHTML = "Add New Image";
	addOrEditDialogueBoxElement.style.display = "block";
}

validateDialogueBoxFields = function() {
	hideInvalidValidationMessage();
	var urlPattern = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;
	
	if(!urlPattern.test(imageUrlElement.value)) {
		document.getElementById('urlInvalid').style.display = 'block';
		return;
	} else if(imageNameElement.value.trim() == '') {
		document.getElementById('nameEmpty').style.display = 'block';
		return;
	} else if(!isDateValid()) {
		document.getElementById('uploadDateInvalid').style.display = 'block';
		return;
	}
	
	if (dialogueBoxHeaderContentElement.innerHTML == "Edit") {
		imagesJson[0].images.forEach( function(obj) {
			if (obj.imageId == imageIdSelected) {
				obj.url 	= imageUrlElement.value;
				obj.name 	= imageNameElement.value;
				obj.info 	= imageInfoElement.value;
				obj.upload_date = imageUploadedDateElement.value;
				addOrEditDialogueBoxElement.style.display = "none";
				storeJsonObjectLocally();
			}
		});	
	} else if (dialogueBoxHeaderContentElement.innerHTML == "Add New Image") {
		var newImageId 		= getNewImageId();
		var newImageUrl 	= imageUrlElement.value;
		var newImageName 	= imageNameElement.value;
		var newImageInfo 	= imageInfoElement.value;
		var newImageUploadDate 	= imageUploadedDateElement.value;
		
		imagesJson[0].images.push({"imageId":newImageId, "url": newImageUrl, "name":newImageName, "info":newImageInfo, "upload_date": newImageUploadDate});
		storeJsonObjectLocally();
		loadImages();
		addOrEditDialogueBoxElement.style.display = "none";
	}
	hideInvalidValidationMessage();
}
