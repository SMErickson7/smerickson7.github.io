/* Dependency: js-cookie plugin - Ref: https://github.com/js-cookie/js-cookie */

$(document).ready(function() {

    setThemeFromCookie();

    function setThemeFromCookie() {
        // Check if the cookie is set
        if (typeof Cookies.get('theme') !== "undefined") {
            $('#theme-stylesheet').attr("href", "css/style.red.css");
            $('#headlogo').attr("src", "img/headlogo_red.png");
            $('#hero').attr("style", "background: url(img/headers/header-red.jpg)");
            console.log('Cookie: red');
        } else {
            $('body').removeClass("dark-mode");
            $('#darkmode').attr('checked', false); // toggle change
            console.log('Cookie: light mode');
        }
    }

    $('#darkmode').on('change', function(e) {

        if ($(this).is(':checked')) {
            $('body').addClass('dark-mode');
            //Set cookies for 7 days
            Cookies.set('mode', 'dark-mode', { expires: 7 });

        } else {
            $('body').removeClass('dark-mode');
            //Remove cookies
            Cookies.remove('mode');
        }

    });



});