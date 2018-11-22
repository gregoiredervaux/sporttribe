var sporttribe = sporttribe || {};

$(document).ready(function(){

    $('.nav-btn').click(function(){
        let nav_opt_select = 'header .option nav';

        $(this).css("color", ($(nav_opt_select).css('display')==="none")? "orange" : "black");
        ($(nav_opt_select).css('display')==="none")? $(nav_opt_select).removeClass("hidden"):$(nav_opt_select).addClass("hidden");

    });
});