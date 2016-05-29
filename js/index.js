require([
], function () {
	
	_.templateSettings = {
		interpolate : /<@=([\s\S]+?)@>/g,
		evaluate : /<@([\s\S]+?)@>/g,
		escape : /<@-([\s\S]+?)@>/g
	};

	var baseUrl = location.protocol + '//' + location.host + "/" + $(document).data("contextPath");
	var fetchUrl = baseUrl + $(document).data("contextFetch");
	var allPageIds = [ "#home-page", "#contact-page" ];
	
	function switchPageTo( showPageId ) {
		allPageIds.forEach(function(id){
			if( showPageId != id ) {
				$(id).addClass("hide");
			}
		});
		
		return $(showPageId).removeClass("hide");
	}
	
	// Backbone router initialization
	function initializeRouter() {
		var Router = Backbone.Router.extend({
			routes: {
				'!contact': 'contact',
				"*actions": 'home',
			},
			
			home: function (actions) {
				doHome(actions);
			},
			
			contact: function () {
				doContact();
			}
		});
		
		new Router();
		
		Backbone.history.start();
	}
	
	function doHome (actions) {
		switchPageTo("#home-page");
	}
	
	function doContact () {
		switchPageTo("#contact-page").load(fetchUrl + "?page=contact", function () {
			require.undef("contact");
			require(["contact"]);
		});
	}
	
	function attachHandlers () {
		var mailTo = $("#header .action-mailto").click(function (event) {
			event.preventDefault();
			location.href="mailto:darshanmaiya{0}yahoo.co.in".replace("{0}", "@");
		});
	}
	
	initializeRouter();
	attachHandlers();
});