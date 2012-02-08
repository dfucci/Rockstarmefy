(function() {
  var addDetailsToMarkerInfo, cleanTwits, getArtistGigs, getArtistLastTwits, getArtistTwitterUserName, getCurrentArtist, gigs_location, m, oauth, player, setMapMaker, showGigsOnMap, sp, update;

  sp = getSpotifyApi(1);

  m = sp.require('sp://import/scripts/api/models');

  player = m.player;

  oauth = null;

  gigs_location = null;

  this.init = function() {
    update();
    return player.observe(m.EVENT.CHANGE, function(e) {
      if (e.data.curtrack === true) return update();
    });
  };

  cleanTwits = function() {
    $("#error_tweet").empty();
    $("#error_loc").empty();
    return $("#tweets ul").empty();
  };

  update = function() {
    var c_artist;
    cleanTwits();
    c_artist = getCurrentArtist();
    getArtistTwitterUserName(c_artist);
    return getArtistGigs(c_artist);
  };

  getCurrentArtist = function() {
    var artist, trackInfo;
    trackInfo = player.track;
    if (trackInfo != null) {
      artist = trackInfo.data.album.artist.name;
    } else {
      artist = null;
    }
    $("#title_tweet").html('<strong>' + artist + "</strong> latest tweets");
    $("#title_loc").html('<strong>' + artist + "</strong> next gigs");
    return artist;
  };

  getArtistTwitterUserName = function(artist) {
    var endpoint;
    endpoint = "http://developer.echonest.com/api/v4/artist/twitter?callback=?";
    return jQuery.getJSON(endpoint, {
      "api_key": "N6E4NIOVYMTHNDM8J",
      "name": artist,
      "format": "jsonp"
    }, function(data) {
      var twitterUsername;
      if (data.response.status.code === 0 && (data.response.artist.twitter != null)) {
        twitterUsername = data.response.artist.twitter;
        return getArtistLastTwits(twitterUsername);
      } else {
        return $("#error_tweet").html("Can't find twitter account");
      }
    });
  };

  getArtistLastTwits = function(artistUsername) {
    var OAuthParams, endpoint, results;
    endpoint = "https://api.twitter.com/1/statuses/user_timeline.json";
    OAuthParams = {
      path: endpoint,
      parameters: {
        'screen_name': artistUsername,
        'count': 5
      },
      signatures: {
        'consumer_key': 'qEzCtrKupzRgINVubWBEWQ',
        'shared_secret': 'XZ9uZnAwHoxzhjhjEVlECZ2EKSMwCXOGhMqXHCQ'
      }
    };
    results = OAuthSimple().sign(OAuthParams);
    return jQuery.getJSON(results.signed_url, function(data) {
      var tweet, _i, _len, _results;
      console.log(data);
      if (data != null) {
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          tweet = data[_i];
          console.log(tweet.text);
          _results.push($("#tweets ul").append($("<li>").append(tweet.text)));
        }
        return _results;
      }
    });
    /*oauth.get endpoint+"screen_name="+artistUsername+"&count=5" + "&callback=?", (data) ->
    			#console.log data
    		if data?
    			for tweet in data
    				#console.log tweet.text
    				$("#tweets ul").append $("<li>").append tweet.text
    				$('#tweets ul li').effect 'bounce'
    */
  };

  getArtistGigs = function(artist) {
    var api_key, search_endpoint;
    api_key = "pP4Jn6EhVfJq6BQ7";
    search_endpoint = "http://api.songkick.com/api/3.0/search/artists.json?jsoncallback=?";
    return $.getJSON(search_endpoint, {
      "query": artist,
      "apikey": api_key
    }, function(data) {
      var artist_id, concert_endpoint;
      if ((data != null) && data.resultsPage.status === "ok") {
        artist_id = data.resultsPage.results.artist[0].id;
        concert_endpoint = "http://api.songkick.com/api/3.0/artists/" + artist_id + "/calendar.json?jsoncallback=?";
        return $.getJSON(concert_endpoint, {
          "apikey": api_key,
          "per_page": 5
        }, function(data) {
          if (data.resultsPage.totalEntries === 0) {
            $("#error_loc").html("No gigs available");
            return $("#map_canvas").hide();
          } else {
            $("#map_canvas").show();
            return showGigsOnMap(data);
          }
        });
      }
    });
  };

  showGigsOnMap = function(gigs) {
    var coordinates, map, options;
    coordinates = new google.maps.LatLng(gigs.resultsPage.results.event[0].location.lat, gigs.resultsPage.results.event[0].location.lng);
    options = {
      center: coordinates,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), options);
    return setMapMaker(gigs, map);
  };

  /*	markerOption 
  		map : map
  		title : "My marker"
  		position :  coordinates
  	
  
  	marker = new google.maps.Marker markerOption
  */

  setMapMaker = function(gigs, map) {
    var coordinates, date, events, lat, lng, marker, markerOption, time, venue, _i, _len, _ref, _results;
    _ref = gigs.resultsPage.results.event;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      events = _ref[_i];
      lat = events.location.lat;
      lng = events.location.lng;
      coordinates = new google.maps.LatLng(lat, lng);
      markerOption = {
        map: map,
        title: events.venue.displayName,
        position: coordinates,
        animation: google.maps.Animation.DROP
      };
      marker = new google.maps.Marker(markerOption);
      venue = events.venue.displayName;
      time = events.start.time;
      date = events.start.date;
      _results.push(addDetailsToMarkerInfo(marker, venue, time, date, map));
    }
    return _results;
  };

  addDetailsToMarkerInfo = function(marker, venue, time, date, map) {
    var info, mytime;
    info = new google.maps.InfoWindow();
    mytime = time != null ? time : "";
    return google.maps.event.addListener(marker, 'click', function(event) {
      info.setContent("<b>" + venue + "<b><br>" + date + " " + mytime);
      info.setPosition(event.latLng);
      return info.open(map);
    });
  };

  /*setMapBorder=(gigs,map) ->
  	sw = new google.maps.LatLng gigs.resultsPage.results.event[0].location.lat, gigs.resultsPage.results.event[0].location.lng
  	ne = new google.maps.LatLng gigs.resultsPage.results.event[4].location.lat, gigs.resultsPage.results.event[4].location.lng
  	bounds = new google.maps.LatLngBounds sw, ne
  	map.panToBounds bounds
  */

}).call(this);
