var flickr = new Flickr({
	api_key: '942201e9595f48cd2508799f4e02d210'
});

var lat;
var lon;

//lat = 37.7839307645835;
//lon = -122.483936163637;

$('#input').submit(function(e) {

	$('#result').innerHTML = '';

	lat = parseFloat($('#lat').val());
	lon = parseFloat($('#lon').val());
	console.log(typeof lat);

	flickr.photos.search({
		lat: lat,
		lon: lon,
		radius: 0.5,
		radius_units: 'mi',
		per_page: 10
	}, function (err, result) {
		if(err) { throw new Error(err); }
		var returnedList = result.photos.photo;
		for (var i = 0; i < returnedList.length; i++) {
			var photoUrl = 'http://farm' + returnedList[i].farm + '.staticflickr.com/' + returnedList[i].server + '/' + returnedList[i].id + '_' + returnedList[i].secret + '.jpg';
			$('#result').innerHTML += '<img src="' + photoUrl + '"><br><h2>' + returnedList[i].title + '</h2><br>';
		};
	});
	e.preventDefault();
});

/*flickr.photos.search({
	lat: lat,
	lon: lon,
	radius: 0.3,
	radius_units: 'mi',
	text: 'graffiti'
}, function(err, result) {
	//if(err) { throw new Error(err); }
	var returnedList = result.photos.photo;
	for (var i = 0; i < returnedList.length; i++) {
		var photoUrl = 'http://farm' + returnedList[i].farm + '.staticflickr.com/' + returnedList[i].server + '/' + returnedList[i].id + '_' + returnedList[i].secret + '.jpg';
		document.getElementById('result').innerHTML += '<img src="' + photoUrl + '"><br><h2>' + returnedList[i].title + '</h2><br>';
	};
});*/