// main lib

construct = function( options, callback ){
	// fallback
	options = options || {};
	// extend default config with supplied config
	//if( options.require ) construct.config = $.extend( true, construct.config, options.require );
	if( options.require ) Object.extend(construct.config, options.require);

	if( callback ) construct.callback = callback;

	if(typeof require != "undefined"){
		require.config( construct.config );
		require( construct.config.deps, construct.init);
		// set the init method
		//construct.config.init = construct.init;
	} else {
		// #9 proceeed if Require.js is not available...
		// prerequisites
		if( typeof Backbone == "undefined" ) return construct.log("error", "no-backbone");
		if( typeof jQuery == "undefined" ) return construct.log("error", "no-jquery");
		if( typeof jQuery.fn.three == "undefined" ) return construct.log("error", "no-jquery-three");
		// initiate
		construct.init();
	}
	// save options
	Object.extend(construct.options, options);
};

construct.init = function(){
	// execute when construct is initialized
	//console.log("init");
	// execute any config options passed in the init()
	// #10 resolving promises with construct options as an argument
	construct.promise.resolve( construct.options );

	// initialize APP
	if( construct.options.router ){
		// async init
		new APP({ require : construct.options.router }, function( app ){
			window.app = app; // optional?
			// start backbone history
			Backbone.history.start();
			if( construct.callback ) construct.callback( app );
		});

	} else {
		// linear init
		var app = new APP();
		window.app = app; // optional?
		// start backbone history
		Backbone.history.start();
		if( construct.callback ) construct.callback( app );
	}

	return this;

};
