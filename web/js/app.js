$(document).ready(function(){
    
    // Update text on Tshirt -- applly event on keyup
    $('#designtext').keyup(function(){
        var text = $(this).val().replace(/\r\n|\r|\n/g,"<br />");
        $('.text p').html(text);
    });

    // ON click on the new text button : clone Next text on Case and add new textarea to edit text
    var count = 2; // variable to count Texts

    $('.nexText').click(function(){
       // alert(rand(20,20));
        //var count = 1;
        // clone text area and change class attribute , data-id, id and value
        $('#designtext').clone().prependTo("#textsArea").attr('class', 'designtext span12 designtext' + count).attr('data-id', count).attr('id', ' ').val('text ' + count);
        // clone text on Case  and make draggable
        $('.text').clone().prependTo("#texts").attr('class', ' t text' + count).attr('data-id', count).attr('style', 'z-index:9' + count).css('top', Math.random()*100).freetrans({
            x: 150,
            y: 100,
            'rot-origin': '50% 100%'
        }).find('p').text('text ' + count);
        count++; // increment variable when new text cloned
    });
     // update texts on keyup event - this works on cloned texts and textarea
     $( document ).on('keyup', '.designtext', function(){
        // get text from text area and replace breakline with br tag
        var text = $(this).val().replace(/\r\n|\r|\n/g,"<br />");
        //get the data-id from text
        var id = $(this).data('id');
        //update text on Case
        $('.text' + id + " p").html(text);
    });

    // initial Current Text element to be edited
    var textElement = $('.designtext1 p');
     // events 

     // make texts draggable using jquery UI
    $(function() {
        //$( ".t" ).resizable();
        //$( ".t" ).draggable({
            // on stop make current text the element to be edited
          //  stop: function() {
             //    textElement = $(this).find('p');
            //  }
      //  });
        
    });
    
    // on click on the text make current text the element to be edited (font size, color, font familly )
    $(document).on('click', '.t p', function(){
        textElement =  $(this);
        //add some annimations 'bounce' using CSS3 and animate.css file
         $('.slider , .pick-a-color-markup, .dropup').addClass('animated bounce');

         setTimeout(function() {
                //remove annimation after 1s
                 $('.slider , .pick-a-color-markup, .dropup').removeClass('animated bounce');
            }, 1000);
    });

    // Actions to be apllayed on Texts
    $(document).on('click', '.action', function(){
        //get what action to use
        var action = $(this).data('action');
        // set the current element to be edited
        var currentEl = $(this);
        // find text element wich is 'P'
        textElement = $(this).parent().find('p');

        // test Action if Rmove
        if(action == 'remove'){

            // test if this is the original text (the text we clone) - if yes we can delete it , because we use it to add new texts
            if(textElement.parent().hasClass('no-delete')){
                //alert('ok');
                //we can delete it , because we use it to add new texts
                //alert("this is the orginal text you can't delete it");
                // stop event
                textElement.text(' ');
                return false;
            }
            // if no - we users should confirm action (delete) 
            if(confirm('¿Desea eliminar el texto?')){
                // action confirmed - now get the data-id of the parrent element (div class='text') ti use it to remove textaprea
                var inputId =  currentEl.parent().data('id');
                // remove input (textarea)
                $(".designtext" + inputId).remove();
                // remove text on Case
                currentEl.parent().remove();
            }
           // if action is Edit
        }else{
            //add annmation on options available for this element (font size, font, color)
            $('.slider , .pick-a-color-markup, .dropup').addClass('animated bounce');
            // delete annimation after 2s
            setTimeout(function() {
                 $('.slider , .pick-a-color-markup, .dropup').removeClass('animated bounce');
            }, 2000);
        }
    });

    //font size using Slider based on jquery UI sliders
     $( "#slider" ).slider({
        range: "max", // set range Type
        min: 1, // set a minimum value
        max: 100, //a max value
        value: 11, // default value
        slide: function( event, ui ) { // event onslider
            $( ".size" ).text(ui.value + "px"); // update text on slider
            if(textElement != null){ // if text element is not null
            textElement.css( "font-size", ui.value); // apply value on text (font-size) using css function (jquery)
        }
            }
        });
        $( ".size" ).text($( "#slider" ).slider( "value" ) +   "px"); // get default value from slider and show it to the user

        //Edit text's font - Get selected font on event Click
        //google.load('webfont','1');
        $('#font a').click(function(){
            // test if current text is not null ()
            if (textElement != null) {
                // get font name from clicked element (data-font='font name')
                var font = $(this).data('font');
                // apply a loading style
                $('.designContainer').prepend("<div class='loading'></div>");

                //google font loader API config
                WebFontConfig = {
                    // get selected font
                    google: { families: [ font ],
                    text: 'abcdedfghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!' },
                        //loading: function() {}, // function when loading font
                        //active: function() {},// function when font is active
                        //inactive: function() {}, // function if font is inactive
                        //fontloading: function(familyName, fvd) {alert('fontloading')}, // font loading
                        fontactive: function(familyName, fvd) { // function if font is action and we get fontName in args
                            // we apply font on the slelected text using css function (Jquery)
                            textElement.css('font-family', familyName);
                            // remove loading annimation
                            $('.designContainer').find(".loading").remove();
                        },
                        fontinactive: function(familyName, fvd) { // if font is innactive 
                            // show alert ti the user
                            alert('esta fuento no está disponible, por favor escoja otra fuente de la lista');
                            // remove loading annimation
                            $('.designContainer').find(".loading").remove();
                        },
                    // timeout  if google load font take a longer time
                    timeout: 5000
                        
                }
                    // load google font API script
                    var wf = document.createElement('script');
                    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
                    '://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js';
                    wf.type = 'text/javascript';
                    wf.async = 'true';
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(wf, s);
            };
        });


        //make images and text rotatable -dragable - resizable

        //$('.t').freetrans('controls', false);
         $('.no-delete').freetrans({
            x: 227,
            y: 100
         });

        
        // function to get image preview on the Case we don't need to upload it on the server using this function
        var countImg = 1;
    function readURL(input) {
        if (input.files && input.files[0]) { // if there is a file from input
            var reader = new FileReader(); // read file
            
            reader.onload = function (e) { // on load
                // add image to imagesContainer - e.target.result : image's source on local
                 $('#imagesContainer').prepend("<div class='images' style='z-index:9" + countImg + "'><img  class='tshi tshirt" + countImg + "' src='" + e.target.result + "' alt='test' width='200'  /></div>");
                 // make images draggable and resizable using jquery UI functions
                //$('#imagesContainer').find('.images').freetrans();
                $('.tshirt' + countImg).freetrans({
                    x: 227,
                    y: 100
                });
				
				/*$('.tshirt' + countImg).draggable(); Soporte para movil
				$('.tshirt' + countImg).resizable();*/
				
                countImg ++;
                //$('#blah').css('background', 'transparent url('+e.target.result +') left top no-repeat');
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    // load images 
    $("#imgInp").on('change',function(){
        readURL(this); // call our function readURL
    });


    //  add Shapes 

    $('.shapes a').click(function(){
        var src = $(this).find('img').attr('src');

        $('#imagesContainer').prepend("<div class='images' style='z-index:9" + countImg + "'><img src='" + src + "' alt=''></div>");
                $('#imagesContainer').find('img').freetrans({
                x: 50, 
                y: 50, 
            });

                countImg ++;

                return false;

    });

    // delete pictures
    $(document).on('click', '.images .icon-remove', function(){
        // user should confirm suppression
        if(confirm('Please confirm?')){
            // if confirmed get parent and delete image
            $(this).parent().parent().remove();
        }
    })

    // Text Color picker
    $(".pick-a-color").pickAColor({
        showSpectrum            : true,
        showSavedColors         : true,
        saveColorsPerElement    : true,
        fadeMenuToggle          : true,
        showAdvanced            : true,
        showHexInput            : true,
        showBasicColors         : true
    });

    // event on color change ( get selected color)
    $("input#color").on("change", function () {
        // get value from input
        var color  = $(this).val();
        // if textElement is not null
        if(textElement != null){
            //apply css on the text
            textElement.css('color','#' + color);
        }
        
    });

    //change Case
    $('.tshirts a').click(function(){
        //get clicked Case src
        var src = $(this).find('img').attr('src');
        //apply it on the original image to be edited
        $('#Tshirtsrc').attr('src', src);
        return false;
    });

    // apply style on file's input

    $('#imgInp').customFileInput({
        // put button 'browse' on right
        button_position : 'right'
    });

    // Preview option (Modal)

$('#myModal').on('shown', function () {
            $('#printable').find('i').css('visibility', 'hidden');
            $('#printable').find('.ui-icon').css('visibility', 'hidden');
            $('#printable').find('.ft-rotator').css('visibility', 'hidden');
            $('#printable').find('.ft-scaler').css('visibility', 'hidden');
            //get printable section
             var exportCanvas = document.getElementById('printable');
             //get convas container
             var canvasContainer = document.getElementById('convascontent');
                //export canvas to convascontainer
                html2canvas(exportCanvas, {
                    //when finished fucntion
                onrendered: function(canvas) {
                    // initialize canvas container (if we generate another canvas)
                    $('#convascontent').html(' ');
                    // append canvas to container
                    canvasContainer.appendChild(canvas);
                    //add id attribute to the canvas
                    $('#convascontent').find('canvas').attr('id','mycanvas');
                    // display options again
                    
                    //document.getElementsByTagName("UL")
                }
            });
                $('.modal-body').append("<div class='overlay1'><br /><br />Generando tu diseño</div>");

                setTimeout(function(){
                    // display options again
                    $('#printable').find('i').css('visibility', 'visible');
                    $('#printable').find('.ui-icon').css('visibility', 'visible');
                    $('#printable').find('.ft-rotator').css('visibility', 'visible');
                    $('#printable').find('.ft-scaler').css('visibility', 'visible');
                    var oCanvas = document.getElementById("mycanvas"); 
                    //var testCanvas = document.getElementById("testCanvas");  
                    var canvasData = oCanvas.toDataURL("image/png");

                    var postData = "canvasData="+canvasData;

                    //var debugConsole= document.getElementById("debugConsole");  
                    //debugConsole.value=canvasData;

                    //alert("canvasData ="+canvasData );      
                    var ajax = new XMLHttpRequest();
                    ajax.open("POST","save.php",true);    
                    ajax.setRequestHeader('Content-Type', 'canvas/upload');
                    //ajax.setRequestHeader('Content-TypeLength', postData.length);

                    ajax.onreadystatechange=function()
                    {
                        if (ajax.readyState == 4)
                        { 
                            $('.overlay1').remove();
                            //alert(ajax.responseText);
                            // Write out the filename.
                            //$('.yes').html("<div class='alert alert-success'>If you can't download you file here is a link , Saved as <br><a  target='_blank' class='download' download href='<?php echo plugins_url('designs/" + ajax.responseText + "', __FILE__) ?>' donwload='<?php echo plugins_url('designs/" + ajax.responseText + "', __FILE__) ?>'>"+ajax.responseText+"</a></div>");
                            //res =  ajax.responseText;

                            $('.modal-body').html("<img src='designs/" + ajax.responseText + "'  />");
                        }
                    }
                    ajax.send(postData);
                    
                }, 9000);

                    //clone current design to Modal (show preview)
                    //$('.designContainer').clone().prependTo('.modal-body').find('i').remove();
                    //$('.modal-body').find('.ui-icon').css('display', 'none');
                });

                $('#myModal').on('hidden', function () {
                    //initialize modal preview on hidden event
                  $('.modal-body').html(' ');
                });


    // export as DESIGN
   
         $('.export').click(function(){
            //hide options
            $('#printable').find('i').css('visibility', 'hidden');
            $('#printable').find('.ui-icon').css('visibility', 'hidden');
            $('#printable').find('.ft-rotator').css('visibility', 'hidden');
            $('#printable').find('.ft-scaler').css('visibility', 'hidden');
            //get printable section
             var exportCanvas = document.getElementById('printable');
             //get convas container
             var canvasContainer = document.getElementById('convascontent');
                //export canvas to convascontainer
                html2canvas(exportCanvas, {
                    //when finished fucntion
                onrendered: function(canvas) {
                    // initialize canvas container (if we generate another canvas)
                    $('#convascontent').html(' ');
                    // append canvas to container
                    canvasContainer.appendChild(canvas);
                    //add id attribute to the canvas
                    $('#convascontent').find('canvas').attr('id','mycanvas');
                    //document.getElementsByTagName("UL")
                }
            });
                $('body').append("<div class='overlay'>Generating your design</div>");

                setTimeout(function(){
                    // display options again
                    $('#printable').find('i').css('visibility', 'visible');
                    $('#printable').find('.ui-icon').css('visibility', 'visible');
                    $('#printable').find('.ft-rotator').css('visibility', 'visible');
                    $('#printable').find('.ft-scaler').css('visibility', 'visible');

                    var oCanvas = document.getElementById("mycanvas"); 
                    //var testCanvas = document.getElementById("testCanvas");  
                    var canvasData = oCanvas.toDataURL("image/png");

                    var postData = "canvasData="+canvasData;

                    //var debugConsole= document.getElementById("debugConsole");  
                    //debugConsole.value=canvasData;

                    //alert("canvasData ="+canvasData );      
                    var ajax = new XMLHttpRequest();
                    ajax.open("POST","save.php",true);    
                    ajax.setRequestHeader('Content-Type', 'canvas/upload');
                    //ajax.setRequestHeader('Content-TypeLength', postData.length);

                    ajax.onreadystatechange=function()
                    {
                        if (ajax.readyState == 4)
                        { 
                            $('.overlay').remove();
                            //alert(ajax.responseText);
                            // Write out the filename.
                            $('.yes').html("<div class='alert alert-success'>If you can't download you file here is a link , Saved as <br><a  target='_blank' class='download' download href='designs/" + ajax.responseText + "' donwload='designs/" + ajax.responseText + "'>"+ajax.responseText+"</a></div>");
                            res =  ajax.responseText;

                        }
                    }
                    ajax.send(postData);
                    
                }, 9000);
        //return false;
       });


   // tooltip ont tshirts and fonts
    $('.tooltip-show').tooltip({
          selector: "a[data-toggle=tooltip]"
        });

     $("#Tshirtsrc,.t,.images img,.tshi,.designContainer,.ft-controls").live({
            mouseenter: function () {

                $( '.tshi' ).css({
                      "z-index": "9999",
                      "opacity": "0.7",
                             "cursor":"move"
                });
                $( '.image' ).css({
                      "z-index": "9999",
                      "opacity": "0.7",
                             "cursor":"move"
                });
                $( '.ft-controls' ).css({
                      "z-index": "9999",
                      "opacity": "0.7",
                             "cursor":"move"
                });

                     $( '.t' ).css({
                      "z-index": "9999",
                      "opacity": "1",
                             "cursor":"move"
                });

            },
            mouseleave: function () {

                $( '.tshi' ).css({
                  "z-index": "98",
                  "opacity": "1",
                    "cursor":"move"
                });

                $( '.t' ).css({
                  "z-index": "99",
                  "opacity": "1",
                    "cursor":"move"
                });

            }
        });

 


});









