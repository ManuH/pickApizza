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

        
        $("#primary-opt").change(function() {
            var option = $(this).val();
            //show/hide select
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
                    $("#sidesAndDrinks").attr('class', 'hide');
                    $("#pizza-select").attr('class', 'hide');
                    $("#pastaAndWings").attr('class', 'hide');
                    $("#qty").attr('class', 'hide');
                    $('#add2cart').attr('class', 'hide');
                    $('submit').attr('class', 'hide');
            }
        })

        //show/hide add to cart button
        $("#qty").on("focus", function() {
            $("#qty").val("");

        });
        $("#qty").on("change keyup paste click",function() {
            var qty = $('#qty').val();
            if ((qty == '' ) || (qty == 'Qty')) {
                $("#add2cart").attr('class', 'hide');
            } else {
                $("#add2cart").attr('class', 'showed');
            }
        })
        
        //creating ticket
        var order = {
            total: 0,
            list: ''
        }
        //search primary option
        function getNeedle(opt) {
                switch(opt) {
                
                    case "pizza":
                            var needle = $('#pizza-select').val();
                        break;
                    case "pasta&wings":
                            var needle = $("#pastaAndWings").val();
                        break;
                    case "sides&drinks":
                            var needle = $("#sidesAndDrinks").val();
                        break;
                    default:
                        alert("error! try again");
                }
                return needle;
            }
            var total = 0;
        $('#add2cart').on('click', function(event) {
            event.preventDefault();
            var qty = $('#qty').val();
            var opt = $('#primary-opt').val();
            var needle = getNeedle(opt);
            $('#ticket-div').attr('class','showed');
            $('#submit').attr('class', 'showed');
            //pizza data
            $.ajax({
                url: "data/pizzas.json",
                dataType: 'json',
                type: 'get',
                cache: false,
                    success: function(data) {
                        //pizzas
                        $(data.pizzas).each(function(index, value) {
                            if (value.name === needle) {
                                $('#ticket').prepend("<li>" + value.name + 
                                " x" + qty + "......... $" + 
                                (value.mediumPrice * qty) + "</li>");
                                //add order to mail
                                order.list +=  '' + value.name + 
                                " x" + qty + "......... $" + 
                                (value.mediumPrice * qty);
                                total = total + (value.mediumPrice * qty);
                                order.total += total;
                                $('#total').html("Total: $" + total);
                            }
                        })
                    }
            })

            //pasta and wings data
            $.ajax({
            url: "data/pastaAndWings.json",
            dataType: 'json',
            type: 'get',
            cache: false,
                success: function(data) {
                    //pasta
                    $(data.pasta).each(function(index, value) {
                        if (value.name === needle) {
                            $('#ticket').prepend("<li>" + value.name + 
                                " x" + qty + "......... $" + 
                                (value.price * qty) + "</li>");
                                //add order to mail
                                order.list +=  '' + value.name + 
                                " x" + qty + "......... $" + 
                                (value.price * qty);
                                total = total + (value.price * qty);
                                order.total += total;
                            $('#total').html("Total: $" + total);
                        }
                    });
                    //wings
                    $(data.wings).each(function(index, value) {
                        if (value.name == needle) {
                            $('#ticket').prepend("<li>" + value.name + 
                                " x" + qty + "......... $" + 
                                (value.price * qty) + "</li>");
                                //add order to mail
                                order.list +=  '' + value.name + 
                                " x" + qty + "......... $" + 
                                (value.price * qty);
                                total = total + (value.price * qty);
                                order.total += total;
                            $('#total').html("Total: $" + total);
                        }                               
                    });
                }
            });

            //side and drink data
            $.ajax({
            url: "data/sidesAndDrinks.json",
            dataType: 'json',
            type: 'get',
            cache: false,
                success: function(data) {
                    //sides
                    $(data.sides).each(function(index, value) {
                        if (value.name === needle) {
                            $('#ticket').prepend("<li>" + value.name + 
                                " x" + qty + "......... $" + 
                                (value.price * qty) + "</li>");
                                //add order to mail
                                order.list +=  '' + value.name + 
                                " x" + qty + "......... $" + 
                                (value.price * qty);
                                total = total + (value.price * qty);
                                order.total += total;
                            $('#total').html("Total: $" + total);
                        }
                    });
                    //drinks
                    $(data.drinks).each(function(index, value) {
                        if (value.name === needle) {
                            $('#ticket').prepend("<li>" + value.name + 
                                " x" + qty + "......... $" + 
                                (value.price * qty) + "</li>");
                                //add order to mail
                                order.list +=  '' + value.name + 
                                " x" + qty + "......... $" + 
                                (value.price * qty);
                                total = total + (value.price * qty);
                                order.total += total;
                            $('#total').html("Total: $" + total);
                        }                               
                    });
                }
            });
        })

        //email
        $('#submit').on('click', function(event) {
            event.preventDefault();
            var data = {
                order: order.list,
                total: order.total
            };
            
            $.ajax({
                type: "POST",
                url: "email.php",
                data: data,
                success: function() {
                    alert("Thank you! Your order will arrive within 15-20 minutes!");                   
                }
            })
        })
})


