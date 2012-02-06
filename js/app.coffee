sp = getSpotifyApi 1
m = sp.require 'sp://import/scripts/api/models'
player = m.player
oauth=null
gigs_location=null
init = () ->
	#consumerKey = 'qEzCtrKupzRgINVubWBEWQ'
 	#consumerSecret = 'XZ9uZnAwHoxzhjhjEVlECZ2EKSMwCXOGhMqXHCQ'
    

    #oauth = OAuth(options)

	update()
	player.observe m.EVENT.CHANGE, (e)->
		if  e.data.curtrack==true
			update()

cleanTwits=()->
	$("#errors").empty()
	$("#tweets ul").empty()

update = ()->
		cleanTwits()
		c_artist = getCurrentArtist()
		getArtistTwitterUserName c_artist
		getArtistGigs c_artist

getCurrentArtist = () ->
	trackInfo = player.track
	if trackInfo?
	 	artist = trackInfo.data.album.artist.name
	else
		artist = null
	$("#artist").html artist
	artist
getArtistTwitterUserName = (artist) ->
	#to be done with Echonest API
	endpoint="http://developer.echonest.com/api/v4/artist/twitter?callback=?"
	jQuery.getJSON(endpoint, {
		"api_key":"N6E4NIOVYMTHNDM8J",
		"name" : artist,
		"format": "jsonp"

	}, (data) ->
		#console.log data
		if data.response.status.code is 0 and data.response.artist.twitter?
			twitterUsername = data.response.artist.twitter
			$("#artist").html twitterUsername
			getArtistLastTwits twitterUsername
		else
	  		$("#errors").html "Can't find twitter account"
		)
		#twitterUsername
	#console.log 'request ended'


getArtistLastTwits=(artistUsername) ->
	#to be done	with Twitter API
	endpoint = "https://api.twitter.com/1/statuses/user_timeline.json"
	OAuthParams =
		path:endpoint
		parameters:{'screen_name':artistUsername, 'count':5}
		signatures:{'consumer_key': 'qEzCtrKupzRgINVubWBEWQ', 'shared_secret': 'XZ9uZnAwHoxzhjhjEVlECZ2EKSMwCXOGhMqXHCQ'}

	results = OAuthSimple().sign OAuthParams
		
	jQuery.getJSON(results.signed_url, (data) ->
		console.log data
		if data?
			for tweet in data
				console.log tweet.text
				$("#tweets ul").append $("<li>").append tweet.text
				$('#tweets ul li').effect 'bounce'
		)

	###oauth.get endpoint+"screen_name="+artistUsername+"&count=5" + "&callback=?", (data) ->
			#console.log data
		if data?
			for tweet in data
				#console.log tweet.text
				$("#tweets ul").append $("<li>").append tweet.text
				$('#tweets ul li').effect 'bounce'
	###		
	#console.log "Request ended"
getArtistGigs=(artist) ->
	#to be done with SongKick API
	api_key="pP4Jn6EhVfJq6BQ7"
	search_endpoint="http://api.songkick.com/api/3.0/search/artists.json?jsoncallback=?"
	$.getJSON search_endpoint, {
		"query" : artist
		"apikey" : api_key

	}, (data) ->
		if data? and data.resultsPage.status is "ok"
			#console.log data.resultsPage.status
			artist_id= data.resultsPage.results.artist[0].id
			concert_endpoint ="http://api.songkick.com/api/3.0/artists/"+artist_id+"/calendar.json?jsoncallback=?"
			$.getJSON concert_endpoint, {
				"apikey" : api_key,
				"per_page" : 5
			}, (data) -> #show on gmaps
				#console.log data
				if data.resultsPage.totalEntries == 0
					$("#errors").html "No gigs available"
					$("#map_canvas").hide()
				else
					$("#map_canvas").show()
					showGigsOnMap data
				#for event in data.resultsPage.results.event
					#$("#location").append event.location.city, "<br>"

showGigsOnMap=(gigs) ->
	#to be done using GoogleMaps API 
	#api_key = "AIzaSyBJXbbVw_1BxKO1gBzOwqxOSYcXpejbG_c"
	coordinates = new google.maps.LatLng gigs.resultsPage.results.event[0].location.lat, gigs.resultsPage.results.event[0].location.lng
	options = 
		center: coordinates
		zoom: 4
		mapTypeId: google.maps.MapTypeId.ROADMAP

	map = new google.maps.Map document.getElementById("map_canvas") , options
	setMapMaker gigs, map
	#setMapBorder gigs, map
###	markerOption 
		map : map
		title : "My marker"
		position :  coordinates
	

	marker = new google.maps.Marker markerOption###

setMapMaker = (gigs, map) ->
	#marker_array = Array()
	for events in gigs.resultsPage.results.event
		lat = events.location.lat
		lng = events.location.lng
		coordinates = new google.maps.LatLng lat, lng
		markerOption = 
			map : map
			title : events.venue.displayName
			position : coordinates
			animation : google.maps.Animation.DROP
		marker = new google.maps.Marker markerOption
		venue = events.venue.displayName
		time = events.start.time
		date = events.start.date
		addDetailsToMarkerInfo(marker, venue, time, date, map)
		
addDetailsToMarkerInfo = (marker, venue, time, date, map) ->
	info = new google.maps.InfoWindow()
	mytime = if time? then time else ""
	google.maps.event.addListener marker, 'click', (event) -> 
		info.setContent "<b>"+ venue + "<b><br>"+ date + " " + mytime
		info.setPosition event.latLng
		info.open map



###setMapBorder=(gigs,map) ->
	sw = new google.maps.LatLng gigs.resultsPage.results.event[0].location.lat, gigs.resultsPage.results.event[0].location.lng
	ne = new google.maps.LatLng gigs.resultsPage.results.event[4].location.lat, gigs.resultsPage.results.event[4].location.lng
	bounds = new google.maps.LatLngBounds sw, ne
	map.panToBounds bounds###
