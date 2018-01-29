// JavaScript source code

//select all checkboxes
// $("#select_all").change(function () {  //"select all" change
//     $(".checkbox").prop('checked', $(this).prop("checked")); //change all ".checkbox" checked status
// });

//".checkbox" change
// $('.checkbox').change(function () {
//     //uncheck "select all", if one of the listed checkbox item is unchecked
//     if (false == $(this).prop("checked")) { //if this item is unchecked
//         $("#select_all").prop('checked', false); //change "select all" checked status to false
//     }
//     //check "select all" if all checkbox items are checked
//     if ($('.checkbox:checked').length == $('.checkbox').length) {
//         $("#select_all").prop('checked', true);
//     }
// });

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