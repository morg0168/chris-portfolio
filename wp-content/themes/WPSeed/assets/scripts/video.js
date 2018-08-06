function initVideo() {

  // Video
  var video = document.getElementById("vid");

  // Controls
  var videoControls = document.getElementById("video-controls");

  //Slider
  var $slider = $('.slider-nav');

  // Buttons
  var playButton = document.getElementById("play-pause");
  var fullScreenButton = document.getElementById("full-screen");

  // Sliders
  var seekBar = document.getElementById("seek-bar");
  var volumeBar = document.getElementById("volume-bar");

  //timeStamp
  var timeStamp = document.getElementById("time-stamp");

  if (video && (video !== undefined) && (video !== null)) {

    var $root = $('html');
    var isTouch = 'ontouchstart' in document.documentElement;
    document.addEventListener("mouseup", handleMobileVideo, false);
    document.addEventListener("touchend", handleMobileVideo, false);
    function handleMobileVideo() {
      if (isTouch && video.paused == true) {
          playButton.style.opacity = 1;
      }
    }

    //mobile Video Play and Pause
    video.addEventListener("click", function() {
      if (video.paused == true) {
        if ($(window).width() <= 767 || $(window).width() == 812) {
          playButton.style.opacity = 0;
        } else {
          playButton.innerHTML = "<i class=\"fa fa-1x fa-pause\"></i>";
          playButton.style.opacity = 1;
        }
        video.play();
      } else {
        video.pause();
        playButton.innerHTML = "<i class=\"fa fa-1x fa-play\"></i>";
        if ($(window).width() <= 767 || $(window).width() == 812) {
          playButton.style.opacity = 1;
        }
      }
    });

    // Event listener for the play/pause button
    playButton.addEventListener("click", function() {
      if ($(window).width() > 767 && $(window).width() != 812) {
        if (video.paused == true) {
          video.play();
          playButton.innerHTML = "<i class=\"fa fa-1x fa-pause\"></i>";
        } else {
          video.pause();
          playButton.innerHTML = "<i class=\"fa fa-1x fa-play\"></i>";
        }
      } else if ($(window).width() <= 767 || $(window).width() == 812) {
        if (video.paused == true) {
          video.play();
          playButton.style.opacity = 0;
        } else {
          video.pause();
          playButton.style.opacity = 1;
          playButton.innerHTML = "<i class=\"fa fa-1x fa-play\"></i>";
        }
      }
    });

    document.addEventListener('webkitfullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('fullscreenchange', exitHandler, false);
    document.addEventListener('MSFullscreenChange', exitHandler, false);

    function exitHandler() {
      var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
      // console.log(fullscreenElement);
      if (fullscreenElement == null) { //paused and minimized
        if ($(window).width() <= 767 || $(window).width() == 812) {
          video.pause();
          playButton.style.opacity = 1;
          playButton.innerHTML = "<i class=\"fa fa-1x fa-play\"></i>";
        } else {
          video.pause();
          playButton.style.opacity = 1;
          playButton.innerHTML = "<i class=\"fa fa-1x fa-play\"></i>";
        }
      } else { //playing and fullScreenButton
        if ($(window).width() <= 767 || $(window).width() == 812) {
          video.play();
          playButton.style.opacity = 0;
          playButton.innerHTML = "<i class=\"fa fa-1x fa-pause\"></i>";
        } else {
          video.play();
          playButton.style.opacity = 0;
          playButton.innerHTML = "<i class=\"fa fa-1x fa-pause\"></i>";
        }
      }
    }

    // Event listener for the full-screen button
    fullScreenButton.addEventListener("click", function() {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen(); // Firefox
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen(); // Chrome and Safari
      }
    });

    // Event listener for the seek bar
    seekBar.addEventListener("change", function() {
      // Calculate the new time
      var time = video.duration * (seekBar.value / 100);

      // Update the video time
      video.currentTime = time;
    });

    // Update the seek bar as the video plays
    video.addEventListener("timeupdate", function() {
      // Calculate the slider value
      var value = (100 / video.duration) * video.currentTime;

      // Update the slider value
      seekBar.value = value;
    });

    // videoControls.addEventListener("mousedown", function() {
    //   $slider[0].slick.options.draggable = false;
    // });
    //
    // videoControls.addEventListener("mouseup", function() {
    //   $slider[0].slick.options.draggable = true;
    // });

    // Pause the video when the slider handle is being dragged
    seekBar.addEventListener("mousedown", function() {
      video.pause();
      // Update the button text to 'Play'
      playButton.innerHTML = "<i class=\"fa fa-1x fa-play\"></i>";
      $slider[0].slick.options.draggable = false;

    });

    // Play the video when the slider handle is dropped
    seekBar.addEventListener("mouseup", function() {
      //video.play();
      // Update the button text to 'Play'
      //playButton.innerHTML = "<i class=\"fa fa-2x fa-pause\"></i>";
      $slider[0].slick.options.draggable = true;
      updateTimeStamp();
    });

    // Event listener for the volume bar
    volumeBar.addEventListener("change", function() {
      // Update the video volume
      video.volume = volumeBar.value;
    });

    volumeBar.addEventListener("mousedown", function() {
      // Update the video volume
      $slider[0].slick.options.draggable = false;
    });

    volumeBar.addEventListener("mouseup", function() {
      // Update the video volume
      $slider[0].slick.options.draggable = true;
    });

    //Update time stamp
    function updateTimeStamp() {
      var date = new Date(null);
      date.setSeconds(video.currentTime);
      var timeString = date.toISOString().substr(11, 8);
      //10minutes = 600seconds
      if (video.currentTime >= 600) {
        timeString = timeString.slice(3);
      } else {
        timeString = timeString.slice(4);
      }
      timeStamp.innerHTML = timeString;
      setTimeout(updateTimeStamp, 1000);
    }

    updateTimeStamp();
  }

}
