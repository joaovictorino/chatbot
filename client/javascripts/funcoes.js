$(document).ready(function () {
    $('select').material_select();
    $("#btnFade").hide();


    var didScroll;
    var lastScrollTop = 0;
    var delta = 100;

    $(window).scroll(function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 200);

    function hasScrolled() {
        var st = $(this).scrollTop();

        console.log(st)

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > 1) {
            // Scroll Down
              $("#btnFade").hide();
           


        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $("#btnFade").show();

            }
        }

        lastScrollTop = st;
    }

});

$(".scroll").click(function (event) {
    event.preventDefault();
    $('html,body').animate({ scrollTop: $(this.hash).offset().top - 60 }, 800);
});