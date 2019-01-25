window.addEventListener("scroll", function(event) {
    if (window.scrollY > 100) {
    	document.getElementsByClassName("navclass")[0].style.backgroundColor="white";
    } else {
    	document.getElementsByClassName("navclass")[0].style.backgroundColor=null;	
    }
    
}, false);
var data = JSON.parse(data);
data[0].images.forEach( function(obj) {
  	var img = new Image();
	img.src = obj.url;
	img.setAttribute("class", "banner-img");
	img.setAttribute("alt", "effy");
	img.id=obj.imageId;
	console.log(obj.imageId);
	document.getElementById("img-container").appendChild(img);
});
var imageIdSelected = null;
var parent = document.getElementById('img-container');
parent.addEventListener('contextmenu', function (event) {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
        imageIdSelected = event.target.id;
	    var ctxMenu = document.getElementById("ctxMenu");
	    ctxMenu.style.display = "block";
	    ctxMenu.style.left = (event.pageX - 10)+"px";
	    ctxMenu.style.top = (event.pageY - 10)+"px";
    }
}, false);

parent.addEventListener('click', function (event) {
    var ctxMenu = document.getElementById("ctxMenu");
    ctxMenu.style.display = "";
    ctxMenu.style.left = "";
    ctxMenu.style.top = "";
}, false);

var modal = document.getElementById('myModal');
function editPressed() {
	modal.style.display = "block";
	var ctxMenu = document.getElementById("ctxMenu");
    ctxMenu.style.display = "";
    ctxMenu.style.left = "";
    ctxMenu.style.top = "";
    data[0].images.forEach( function(obj) {
  		if(obj.imageId == imageIdSelected) {
  			document.getElementById('imageUrlId').value = obj.url;
  			document.getElementById('imageNameId').value = obj.name;
  			document.getElementById('imageInfoId').value = obj.info;
  			document.getElementById('imageUploadedDateId').value = obj.upload_date;
  		}
	});
}

function deletePressed() {
	console.log(data[0].images);
	var index=0;
	var ctxMenu = document.getElementById("ctxMenu");
    ctxMenu.style.display = "";
    ctxMenu.style.left = "";
    ctxMenu.style.top = "";
	data[0].images.forEach( function(obj){
		if(obj.imageId == imageIdSelected){
			data[0].images.splice(index,1);
			document.getElementById('img-container').innerHTML = "";
			data[0].images.forEach( function(obj) {
			  	var img = new Image();
				img.src = obj.url;
				img.setAttribute("class", "banner-img");
				img.setAttribute("alt", "effy");
				img.id=obj.imageId;
				console.log(obj.imageId);
				document.getElementById("img-container").appendChild(img);
			});
		}
		index++;
	});
}

var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}

function submitEditButton() {
	modal.style.display = "none";
	data[0].images.forEach( function(obj) {
		if (obj.imageId == imageIdSelected) {
		  	obj.url = document.getElementById('imageUrlId').value;
		  	obj.info = document.getElementById('imageInfoId').value;
		  	obj.upload_date = document.getElementById('imageUploadedDateId').value;
		  	modal.style.display = "none";
	  	}
	});
}