window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var INTERP_BASE2 = "./static/interpolation/stacked2"; // New path
var INTERP_BASE3 = "./static/interpolation/stacked3"; // New path
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
var interp_images2 = []; // New array for new images
var interp_images3 = []; // New array for new images

function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;

    var path2 = INTERP_BASE2 + '/' + String(i).padStart(6, '0') + '.jpg'; // New path
    interp_images2[i] = new Image(); // New images
    interp_images2[i].src = path2; // New path

    var path3 = INTERP_BASE3 + '/' + String(i).padStart(6, '0') + '.jpg'; // New path
    interp_images3[i] = new Image(); // New images
    interp_images3[i].src = path3; // New path
  }
}

function setInterpolationImage(i, id) {
  var image;
  if (id === 'interpolation-image-wrapper') {
    image = interp_images[i];
  } else if (id === 'interpolation-image-wrapper2') {
    image = interp_images2[i];
  } else if (id === 'interpolation-image-wrapper3') {
    image = interp_images3[i];
  }
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#' + id).empty().append(image);
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/

    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value, 'interpolation-image-wrapper');
    });
    setInterpolationImage(0, 'interpolation-image-wrapper');
    
    $('#interpolation-slider2').on('input', function(event) {
      setInterpolationImage(this.value, 'interpolation-image-wrapper2');
    });
    setInterpolationImage(0, 'interpolation-image-wrapper2');

    $('#interpolation-slider3').on('input', function(event) {
      setInterpolationImage(this.value, 'interpolation-image-wrapper3');
    });
    setInterpolationImage(0, 'interpolation-image-wrapper3');

    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);
    $('#interpolation-slider2').prop('max', NUM_INTERP_FRAMES - 1); // New slider
    $('#interpolation-slider3').prop('max', NUM_INTERP_FRAMES - 1); // New slider

    bulmaSlider.attach();
})
