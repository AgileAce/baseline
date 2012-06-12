/*!
 * jQuery Display Message Plugin
 *
 * Copyright 2010, Andrey Voev
 * http://www.andreyvoev.com
 *
 * Date: Fri Dec 12 16:12 2010 -0800
 */

(function( $ ){

   $.fn.displayMessage = function(options) {

        // Default configuration properties.
         var defaults = {
                  message       : 'Error message',
                  background    : '#111111',
                  color         : '#FFFFFF',
                  speedOpen     : 'fast',
                  speedClose    : 'slow',
                  skin          : 'plain',
                  position      : 'relative', // relative, absolute, fixed
                  autohide      : false,
				  hideTime		: 2400,
				  type			: 'default'
         }

        var options = $.extend( defaults, options );
        $(this).slideUp(options.speedOpen);
        $(this).removeClass().empty();
        return this.each(function() {

          var sticky = (options.sticky == false) ? 'relative' : 'absolute';
          $(this).addClass('messagebar-skin-'+options.skin+'_bar').addClass('messagebar-skin-'+options.skin+'_bar_'+options.type).css('position',options.position).css('background-color',options.background);
          $(this).append('<div class="messagebar-skin-'+options.skin+'_inner"><img src="../Images/MessageBarImages/Message'+options.type+'.png" /><span class="messagebar-skin-'+options.skin+'_text"></span><a href="#" id="close" class="messagebar-skin-'+options.skin+'_close"></a></div>').css('color',options.color);
          $(this).find('span').html(options.message);

          $(this).slideDown(options.speed ,function(){

             var parent = ($(this).attr('id')) ? "#"+$(this).attr('id') : "."+$(this).attr('class');
             var close_button = ($(this).find('a').attr('id')) ? "#"+$(this).find('a').attr('id') : "."+$(this).find('a').attr('class');

             $(parent+">div>"+close_button).bind("click", function (event) {
            	event.preventDefault();
                //$(parent+">div>"+close_button).animate({"opacity": "hide"}, function(){
					//$(parent+" img").fadeOut("fast");
					//$(parent+">div>"+close_button).fadeOut("fast");
                    //$(parent+">div>span").fadeOut(options.speedClose).html("");
					$(parent).stop(true);
                    $(parent+">div>"+close_button).parent().parent().slideUp(options.speedClose);
                //});
             });

             if(options.autohide == true)
             {
                $(this).delay(options.hideTime).slideUp(options.speedClose);
             };

      });

   });

   };
})( jQuery );
