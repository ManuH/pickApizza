// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
   $('a.page-scroll').bind('click', function(event) {
       var $anchor = $(this);
       $('html, body').stop().animate({
           scrollTop: $($anchor.attr('href')).offset().top
       }, 1500, 'easeInOutExpo');
       event.preventDefault();
   });
});


$(function () {
    $(window).on("load resize", function() {
        $('.fill-screen').css('height', window.innerHeight);
    });
});

//read json file
/*
$.getJSON('data/pizzas.json', function(data) {
    console.log(data);
});
*/
$(document).ready(function() {

    //data for pizza menu
    $.ajax({
            url: "data/pizzas.json",
            dataType: 'json',
            type: 'get',
            cache: false,
            success: function(data) {
                $(data.pizzas).each(function(index, value) {
                    $('#pizza-menu').prepend("<li>" + value.name + 
                         " ..... " + "$" 
                        + value.mediumPrice + "</li>"
                        + "<li>" +  " (" + value.ingredients + ") " + "</li>");
                });
            }
        });

    // data for sides and drinks menu
    $.ajax({
            url: "data/sidesAndDrinks.json",
            dataType: 'json',
            type: 'get',
            cache: false,
            success: function(data) {
                //sides
                $(data.sides).each(function(index, value) {
                    $('#sidesAndDrinks-menu').prepend("<li>" + value.name + 
                         " ..... " + "$" 
                        + value.price + "</li>"
                        + "<li>" +  " (" + value.ingredients + ") " + "</li>");
                });
                //drinks
                $(data.drinks).each(function(index, value) {
                    $('#sidesAndDrinks-menu').prepend("<li>" + value.name + 
                         " ..... " + "$" 
                        + value.price + "</li>"
                        + "<li>" +  " (" + value.ingredients + ") " + "</li>");
                });
            }
        });

    //data for pasta and wings menu
    $.ajax({
            url: "data/pastaAndWings.json",
            dataType: 'json',
            type: 'get',
            cache: false,
            success: function(data) {
                //pasta
                $(data.pasta).each(function(index, value) {
                    $('#pastaAndWings-menu').prepend("<li>" + value.name + 
                         " ..... " + "$" 
                        + value.price + "</li>"
                        + "<li>" +  " (" + value.ingredients + ") " + "</li>");
                });
                //wings
                $(data.wings).each(function(index, value) {
                    $('#pastaAndWings-menu').prepend("<li>" + value.name + 
                         " ..... " + "$" 
                        + value.price + "</li>"
                        + "<li>" +  " (" + value.ingredients + ") " + "</li>");
                });
            }
        });

        //data for pizza select
        $.ajax({
            url: "data/pizzas.json",
            dataType: 'json',
            type: 'get',
            cache: false,
            success: function(data) {
                $(data.pizzas).each(function(index, value) {
                    $('#pizza-select').prepend("<option value='" + value.name + 
                            "'>" + value.name + "</option>");
                });
            }
        });

        //data for pasta and wings select
        $.ajax({
                url: "data/pastaAndWings.json",
                dataType: 'json',
                type: 'get',
                cache: false,
                success: function(data) {
                    //pasta
                    $(data.pasta).each(function(index, value) {
                        $('#pastaAndWings').prepend("<option value='" + value.name + 
                            "'>" + value.name + "</option>");
                    });
                    //wings
                    $(data.wings).each(function(index, value) {
                        $('#pastaAndWings').prepend("<option value='" + value.name + 
                            "'>" + value.name + "</option>");
                    });
                }
            });

        //data for sides and drinks select
         $.ajax({
            url: "data/sidesAndDrinks.json",
            dataType: 'json',
            type: 'get',
            cache: false,
            success: function(data) {
                //sides
                $(data.sides).each(function(index, value) {
                    $('#sidesAndDrinks').prepend("<option value='" + value.name + 
                         "'>" + value.name + "</option>");
                });
                //drinks
                $(data.drinks).each(function(index, value) {
                    $('#sidesAndDrinks').prepend("<option value='" + value.name + 
                         "'>" + value.name + "</option>");
                });
            }
        });

        //show/hide select
        $("#primary-opt").change(function() {
            var option = $(this).val();

            switch(option) {
                case "pizza":
                        $("#pizza-select").attr('class', 'showed');
                        $("#sidesAndDrinks").attr('class', 'hide');
                        $("#pastaAndWings").attr('class', 'hide');
                        $("#qty").attr('class', 'showed');
                    break;
                case "pasta&wings":
                        $("#pastaAndWings").attr('class', 'showed');
                        $("#pizza-select").attr('class', 'hide');
                        $("#sidesAndDrinks").attr('class', 'hide');
                        $("#qty").attr('class', 'showed');
                    break;
                case "sides&drinks":
                        $("#sidesAndDrinks").attr('class', 'showed');
                        $("#pizza-select").attr('class', 'hide');
                        $("#pastaAndWings").attr('class', 'hide');
                        $("#qty").attr('class', 'showed');
                    break;

                default:
                    alert('please select an option');
            }
        })

        //show/hide add to cart button
        $("#qty").change(function() {
            console.log(this.val());
            if (this.val() == null ) {
                $("#add2cart").attr('class', 'hide');
            } else {
                $("#add2cart").attr('class', 'showed');
            }
        })
        
})

