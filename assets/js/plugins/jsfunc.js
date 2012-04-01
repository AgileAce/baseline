$(document).ready(function(){

	document.getElementById("txtUserName").focus();
	
	$("#btnLogin").click(function(){
		//$(".containerLoading").fadeIn("slow");
		$(".containerTableLogin").fadeOut(1000);
		$(".containerUserInfo").fadeIn(2000);
		//$(".containerTableLogin").hide("fade",{direction:"right"},500);
		//$(".containerUserInfo").show("slide",{direction:"right"},1000);
	});
	$("#btnLogout").click(function(){
		//$(".containerLoading").fadeOut("slow");
		$(".containerUserInfo").fadeOut(1000);
		$(".containerTableLogin").fadeIn(2000);
		//$(".containerUserInfo").hide("fade",{direction:"right"},500);
		//$(".containerTableLogin").show("slide",{direction:"right"},1000);
	});
	
	$(".containerTicker").vTicker({
		speed: 1200,
		pause: 3000,
		showItems: 1,
		animation: 'fade',
		mousePause: false,
		height: 0,
		direction: 'up'
	});

	$.simpleWeather({
			location: geoplugin_city() + ', ' + geoplugin_countryName(),
			unit: 'c',
			success: function(weather) {
				html = '<div class="weatherImage"><img src="'+weather.image+'"></div>';
				html += '<div class="weatherLocation">';
				if(geoplugin_countryName() != ""){
					html += '<img src="assets/img/flag_images/' + geoplugin_countryCode() + '.png" />';
					if (geoplugin_city() != "")
					{
						html += geoplugin_city()+', ';
					}
					html += geoplugin_countryName();
				};
				html += '</div>';
				html += '<div class="weatherTemperature">'+weather.temp+'&deg;'+weather.units.temp+'</div>';
				html += '<div class="weatherConditions">'+weather.currently+'</div>';
				$(".containerWeatherFeed").html(html);
			},
			error: function(error) {
					$(".containerWeatherFeed").html("<p>"+error+"</p>");
			}
	});
		
	$("#msg").click(function(event){
		event.preventDefault();
		$(".messageBar").displayMessage({
			message: "Error message",
			background: "transparent",
			color: "#ffffff",
			speedOpen: "fast",
			speedClose: "slow",
			skin: "ff",
			position: "absolute",
			autohide: true,
			hideTime: 5000,
			type: "Info"
		});
	});	

	$.ajax({
		type: "GET",
		url: "pages/useragent.asp?userAgent=" + String($.base64Encode(navigator.userAgent)),
		success: function(data){
			var sUserAgent = data.split("|");
			$(".containerUserIPInfo").html("<table><tr><td><img src='" + sUserAgent[13] + "' /></td><td><b>" + sUserAgent[9] + "</b></td></tr><tr><td><img src='" + sUserAgent[7] + "' /></td><td><b>" + sUserAgent[3] + "</b></td></tr></table>");
		},
		error: function(){
			//alert("ERR");
		}
	});
	
	$(".containerUserAvatar").hover(function(){
		$(".containerUserIPInfo").fadeToggle(1500);
	});
	
	$(".clickHereButton").delay(30000).fadeOut(2000);
	
	$("#logoMainMenu").mouseenter(function(){
		$(".clickHereButton").remove();
		$("#logoMainMenu").addClass("logoMainMenuActive");
		$(".containerMainMenu").animate({height:"240px",width:"100%"},700);
	});
	$(".containerMainMenu").mouseleave(function(){
		$("#logoMainMenu").removeClass("logoMainMenuActive");
		$(".containerMainMenu").animate({height:"32px",width:"200px"},700);					
	});
	
	$("input[title]").qtip({
		style:{
			classes: "ui-tooltip-light ui-tooltip-rounded ui-tooltip-shadow ui-tooltip-jtools"
		},
		show:{
			event: "focus",
			effect: function(offset){
				 $(this).show("fade",{direction:"left"},1000);;
			}
		},
		hide:{
			event: "blur",
			effect: function(offset){
				 $(this).hide("fade",{direction:"left"},700);;
			}
		},
		position:{
			my: "middle left",
			at: "middle right",
			adjust:{
				x: 7
			}
		}
	});
	
	$(".tdButton, .tdButton2").qtip({
		style:{
			classes: "ui-tooltip-light ui-tooltip-rounded ui-tooltip-shadow ui-tooltip-jtools"
		},
		show:{
			event: "mouseover",
			effect: function(offset){
				 $(this).show("fade",{direction:"left"},1000);
			}
		},
		hide:{
			event: "mouseleave",
			effect: function(offset){
				 $(this).hide("fade",{direction:"left"},700);
			}
		},
		position:{
			my: "bottom right",
			at: "top left"
		}
	});
	
	$(".menuItem").hover(function(){
		$(this).find(".menuItemOverlay").fadeOut(1100);
		$(this).addClass("menuItemHover")
	},function(){
		$(this).find(".menuItemOverlay").fadeIn(800);
		$(this).removeClass("menuItemHover");
	});				

});
