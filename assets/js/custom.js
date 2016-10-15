$(document).ready(function () {
    /***************** Navbar-Collapse ******************/

    $(window).scroll(function () {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });




    $('#video-modal').modal();

    /***************** Page Scroll ******************/

    $(function () {
        $('a.page-scroll').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });


        $('#video-btn').bind('click', function (event) {
            event.preventDefault();
            $('#video-modal').modal();
        });
    });

    /***************** Scroll Spy ******************/

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    /***************** Owl Carousel ******************/

    $("#owl-hero").owlCarousel({

        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        transitionStyle: "fadeUp",
        autoPlay: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]

    });


    /***************** Full Width Slide ******************/

    var slideHeight = $(window).height();

    $('#owl-hero .item').css('height', slideHeight);

    $(window).resize(function () {
        $('#owl-hero .item').css('height', slideHeight);
    });
    /***************** Owl Carousel Testimonials ******************/

    $("#owl-testi").owlCarousel({

        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        transitionStyle: "backSlide",
        autoPlay: 9000

    });
    /***************** Countdown ******************/

    $('#fun-facts').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $(this).find('.timer').each(function () {
                var $this = $(this);
                $({
                    Counter: 0
                }).animate({
                    Counter: $this.text()
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).unbind('inview');
        }
    });
    /***************** Google Map ******************/

    function initialize() {
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: new google.maps.LatLng(9.9392631,-84.0401313),
            zoom: 17,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);
        var myLatLng = {lat: 9.939, lng: -84.0401313};
        var marker = new google.maps.Marker({
            position: myLatLng,
            animation: google.maps.Animation.DROP,
            map: map,
            title: 'CONGRESO RESTITUIDAS'
        });

        var infowindow = new google.maps.InfoWindow({
          content: "CONGRESO RESTITUIDAS <br> MINISTERIOS INTIMIDAD CON DIOS <br> 11 Y 12 DE NOVIEMBRE 2016"
        });

        infowindow.open(map, marker);
    }

    google.maps.event.addDomListener(window, 'load', initialize);

    /***************** Wow.js ******************/
    
    new WOW().init();
    
    /***************** Preloader ******************/
    
    var preloader = $('.preloader');
    $(window).load(function () {
        preloader.remove();
    });



    $(function () {
        $('#enviar-inscripcion').bind('click', function (event) {
            $("#form-inscripcion").submit();
            event.preventDefault();
        });
    });


    // Variable to hold request
    var request;

    // Bind to the submit event of our form
    $("#form-inscripcion").submit(function(event){

        // Abort any pending request
        if (request) {
            request.abort();
        }
        // setup some local variables
        var $form = $(this);

        // Let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea");
        var hasError = false;

        $($inputs).each(function (index, input){
            var error = $(input).parent().find(".error-msg");
            $(error).fadeOut();
            var value = $(input).val();
            if (value == null || value == "") {
                $(error).fadeIn();

                hasError = true;
            }

            else if($(input).attr('id')==="email"){
                var emailError = !isEmail(value);
                if (emailError) {
                    $(error).fadeIn();
                    hasError =  true;
                }
            }

            else if($(input).attr('id')==="telefono"){
                phoneError = !isPhoneNumber(value);
                if (phoneError) {
                    $(error).fadeIn();
                    hasError = true;
                }
            }
        });

        if (hasError){
            return false;
        }

        // Serialize the data in the form
        var serializedData = $form.serialize();

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);

        // Fire off the request to /form.php
        request = $.ajax({
            url: myApp.inscripcionURL,
            type: "post",
            data: serializedData
        });

        // Callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR){
            // Log a message to the console
            $inputs.prop("value", "");
            $('#confirmacion').modal();
        });

        // Callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown){
            // Log the error to the console
            console.error(
                "The following error occurred: "+
                textStatus, errorThrown
            );
        });

        // Callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function () {
            // Reenable the inputs
            $inputs.prop("disabled", false);
        });

        // Prevent default posting of form
        event.preventDefault();
    });



})


function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}


function isPhoneNumber(number) {
  var regex = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
  return regex.test(number);
}

