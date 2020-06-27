 // Assignment 4 Task 2
 $("#reserve_table_input").click(function () {
    $('#reserve_table').modal('toggle');
});
// Assignment 4 Task 3
$("#login_modal_input").click(function () {
    $('#login_modal').modal('toggle');
});

$(document).ready(function() {
    $("#carousel").carousel({ interval: 2000 , pause: "false"});
    
});

$("#carousel_button").click(function() {
        if ($("#carousel_button span").hasClass('fa-pause')) {
            $("#carousel").carousel('pause');
            $("#carousel_button span").removeClass('fa-pause');
            $("#carousel_button span").addClass('fa-play');
        }
        else if ( $("#carousel_button span").hasClass('fa-play') ) {
            $("#carousel").carousel('cycle');
            $("#carousel_button span").removeClass('fa-play');
            $("#carousel_button span").addClass('fa-pause');
        }
    });