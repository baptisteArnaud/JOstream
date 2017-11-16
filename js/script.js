var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-32642923-1']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


var vid = document.getElementById('videoel');
var vid_width = vid.width;
var vid_height = vid.height;
var overlay = document.getElementById('overlay');
var overlayCC = overlay.getContext('2d');

/*********** Setup of video/webcam and checking for webGL support *********/

var insertAltVideo = function(video) {
	// insert alternate video if getUserMedia not available
	if (supports_video()) {
		if (supports_webm_video()) {
			video.src = "./media/cap12_edit.webm";
		} else if (supports_h264_baseline_video()) {
			video.src = "./media/cap12_edit.mp4";
		} else {
			return false;
		}
		return true;
	} else return false;
}

function adjustVideoProportions() {
	// resize overlay and video if proportions of video are not 4:3
	// keep same height, just change width
	var proportion = vid.videoWidth/vid.videoHeight;
	vid_width = Math.round(vid_height * proportion);
	vid.width = vid_width;
	overlay.width = vid_width;
}

function gumSuccess( stream ) {
	// add camera stream if getUserMedia succeeded
	if ("srcObject" in vid) {
		vid.srcObject = stream;
	} else {
		vid.src = (window.URL && window.URL.createObjectURL(stream));
	}
	vid.onloadedmetadata = function() {
		adjustVideoProportions();
		vid.play();
	}
	vid.onresize = function() {
		adjustVideoProportions();
		if (trackingStarted) {
			ctrack.stop();
			ctrack.reset();
			ctrack.start(vid);
		}
	}
}

function gumFail() {
	// fall back to video if getUserMedia failed
	insertAltVideo(vid);
	document.getElementById('gum').className = "hide";
	document.getElementById('nogum').className = "nohide";
	alert("There was some problem trying to fetch video from your webcam, using a fallback video instead.");
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

// set up video
if (navigator.mediaDevices) {
	navigator.mediaDevices.getUserMedia({video : true}).then(gumSuccess).catch(gumFail);
} else if (navigator.getUserMedia) {
	navigator.getUserMedia({video : true}, gumSuccess, gumFail);
} else {
	insertAltVideo(vid);
	document.getElementById('gum').className = "hide";
	document.getElementById('nogum').className = "nohide";
	alert("Your browser does not seem to support getUserMedia, using a fallback video instead.");
}

/*********** Code for face tracking *********/

var ctrack = new clm.tracker();
ctrack.init();
var trackingStarted = false;

function startVideo() {
	// start video
	vid.play();
	// start tracking
	ctrack.start(vid);
	trackingStarted = true;
	// start loop to draw face
	drawLoop();
}

function drawLoop() {
	requestAnimFrame(drawLoop);
	overlayCC.clearRect(0, 0, vid_width, vid_height);
	//psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);
	if (ctrack.getCurrentPosition()) {
		draw();
	}

}

/*********** Code for mask on face *********/
const computeWidthFilter = (point1, point2) => {
  return point2 - point1;
};
const computeHeightFilter = (point1, point2) => {
  return (point2 - point1)*2.6;
};

const draw = () => {
	var positions = ctrack.getCurrentPosition();
	ctx=overlay.getContext("2d");
	image = document.createElement('img');
	image.src = './src/filters/masque-fr.png';
	width = computeWidthFilter(positions[0][0], positions[14][0]);
	height = computeHeightFilter(positions[62][1], positions[7][1]);
	x = positions[1][0];
	y = positions[7][1]-height;
	ctx.drawImage(image, x, y, width, height);
};