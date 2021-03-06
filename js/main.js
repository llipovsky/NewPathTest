// VARIABILES
var maxLength = 20;

$(document).ready(function(){
loadVideos();

// Loading Images
var dir = "./images/FunnyImages/";
var fileextension = ".jpg";
var filename;

$.ajax({url: dir, async: false, success: function (data) {					
		$(data).find("a:contains(" + fileextension + ")").each(function () {
		filename = this.href.replace(window.location.host, "").replace("http:///", "").replace("UID/MyApp/","");
		
		// PUSH name of image to an array
		filenames.push(filename);
			});

		}
	});
	
arrayLength = Object.keys(filenames).length;

// GET First Image on page load
LoadImg();
});

$(document).on('pageinit', function(event){
  // Bind the swipeleftHandler callback function
  $( ".welcomeScreen" ).on( "swipeleft", swipeleftHandler );
  // Callback function
  function swipeleftHandler( event ){
	$.mobile.changePage("#News");
  }	
});




// based on forked from sumukh1's "forked: RSS Reader with jQuery Mobile" http://jsdo.it/sumukh1/4Ton


/* CREATING News Page with list of articles */
document.write(
  '<div data-role="page" id="News">' +
  '  <div data-role="header" data-position="fixed">' +
  '    <h1><span id="widgetTitle">New Path</span> ' +
  '  </div>' +
  '  <div data-role="content">' +
  '    <ul data-role="listview" data-filter="true" id="articleList">'
);

for(var i=1; i<=maxLength; i++){
  document.write(
    '<li id="list' + i + '"><a href="#article' + i + '" id="link' + i + '"><h3 id="title' + i + '"></h3></a></li>'
  );
}

document.write(
  '    </ul>' +
  '  </div>' +
  '<div data-role="footer" data-id="foo1"  data-position="fixed" data-tap-toggle="false" > ' +
  '	<div data-role="navbar"> ' +
  '		<ul>		' +
  ' 			<li><a href="#News" class="ui-btn-active ui-state-persist" data-icon="home">Home</a></li> ' +
  '			<li><a href="#Videos" data-icon="play" >Videos</a></li> ' +
  ' 			<li><a href="#Pictures" data-icon="grid">Pictures</a></li> ' +
  '			<li><a href="#Facebook" data-icon="facebook">Facebook</a></li> ' +
  ' 		</ul> ' +
  '	</div> ' +
  '</div> ' +
  '</div>'
);

/* CREATING ARTICLE PAGES */
for(i=1; i<=maxLength; i++){
var newPage = $('<div data-role="page" id="article' + i + '">' +
    '  <div data-role="header" >' +    
	// TITLE
    '    <h1 id="articleHeader' + i + '"></h1>' +
	// HOME BUTTON
    '    <a href="#News" data-role="button" data-icon="home" data-back="true">Home</a>' +
	// LEFT and RIGHT BUTTONS
    '    <div data-role="controlgroup" data-type="horizontal" data-mini="true" class="ui-btn-right" >' +
    '      <a href="#article' + String(i-1) + '" data-role="button" data-icon="arrow-l"' +
    '        data-inline="true"  data-iconpos="notext" class="prevButton"></a>' +
    '      <a href="#article' + String(i+1) + '" data-role="button" data-icon="arrow-r"' +
    '        data-inline="true"  class="nextButton" data-iconpos="notext" data-iconpos="right"></a>' +
    '    </div>' +
    '  </div>' +
    '  <div  data-role="content" >' +
    '    <div id="articleContent' + i + '" class="articleContent"></div>' +
    '</div>' +    
    '<div data-role="footer" data-id="foo1"  data-position="fixed" data-tap-toggle="false" > ' +
    '	<div data-role="navbar"> ' +
    '          <ul>		' +
    '             <li><a href="#News" class="ui-btn-active ui-state-persist" data-icon="home">Home</a></li> ' +
    '             <li><a href="#Videos" data-icon="play" >Videos</a></li> ' +
    '  		  <li><a href="#Pictures" data-icon="grid">Pictures</a></li>' +
    ' 		  <li><a href="#Facebook" data-icon="facebook">Facebook</a></li> ' +
    '	      </ul> ' +
    '    </div> ' +
    '</div>' +
    '</div>'
);


// APPEND the new page into pageContainer
newPage.appendTo($(document.body));

}
/* JSONP */
$(function(){
  getOnlineFeed('http://feeds.feedburner.com/hatersk');
});

var listEntries = function(json) {
  if (!json.responseData.feed.entries) return false;
  
  // VARIABLES
  var articleLength =json.responseData.feed.entries.length;
  articleLength = (articleLength > maxLength) ? maxLength : articleLength;
  
for (var i = 1; i <= articleLength ; i++) {
    var entry = json.responseData.feed.entries[i-1];
    var myText = entry.content.split(' ').slice(0, 8).join(' ');
    var textTitle = entry.title;
	// WRAPPING text to paragraph -> small text of content in the list view
    $(myText).wrap('<p class="ui-li-desc small-text"></p>');
	// writing title of the article
    $('#title' + i).text(textTitle);
    $('#link' + i).append(myText);

    $('#articleHeader' + i).text(entry.title);
    $('#articleContent' + i).append(entry.content);
  }
	// REMOVE the previous button in the first article
  $('#article1 .prevButton').remove();
  $('#article' + articleLength + ' .nextButton').remove();
  if (articleLength < maxLength) {
    for (i = articleLength + 1; i <= maxLength; i++) {
      $('#list' + i).remove();
	// REMOVE the next button in the last article
      $('#article' + i).remove();
    }
  }
};

// GETTING THE FEED
var getOnlineFeed = function(url) {
  var script = document.createElement('script');
  script.setAttribute('src', 'http://ajax.googleapis.com/ajax/services/feed/load?callback=listEntries&hl=ja&output=json-in-script&q='
                      + encodeURIComponent(url)
                      + '&v=1.0&num=' + maxLength);
  script.setAttribute('type', 'text/javascript');
  document.documentElement.firstChild.appendChild(script);
};

var getOfflineFeed = function(url) {
  var script = document.createElement('script');
  script.setAttribute('src', url);
  script.setAttribute('type', 'text/javascript');
  document.documentElement.firstChild.appendChild(script);
};

/////////////////////////
///	LoadImg	   //////
/////////////////////////

var filenames = [];
var numberOfImage = 0;
var arrayLength = 0;

function LoadImg() {
	
	var xmlhttp;
	var filename;

	if (window.XMLHttpRequest) { 
			xmlhttp = new XMLHttpRequest();
	} else { 
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange = function() {
	
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {     
		    document.getElementById("mainPicture").src = "data:image/png;base64," + xmlhttp.responseText;
		}
	};   

	
	console.log("FILENAMES[4]: " + filenames[4]);
	xmlhttp.open("GET", 'load.php?LoadImg=images/FunnyImages/' + filenames[numberOfImage]);	
	numberOfImage++;
	
	if(numberOfImage == arrayLength)
		numberOfImage = 0;	    		    
	xmlhttp.send(null); 
};


/////////////////////////
///	FACEBOOK   //////
/////////////////////////
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/de_DE/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


/////////////////////////
///	VIDEOS	   //////
/////////////////////////
function loadVideos(){
 var wmode = "?wmode=transparent";
	$.getJSON('loadVideo.php', function(data) {
		$('#youtube').attr('src',data[0]+wmode);
		$('#videoOne').attr('src',data[1]+wmode);
		$('#videoTwo').attr('src',data[2]+wmode);
		$('#videoThree').attr('src',data[3]+wmode);
		});
		
};


