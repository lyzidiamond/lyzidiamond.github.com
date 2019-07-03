var flickr = new Flickr({
	api_key: '942201e9595f48cd2508799f4e02d210'
});

var lat;
var lon;

$('#input').submit(function(e) {

	document.getElementById('result').innerHTML = '';

	lat = parseFloat($('#lat').val());
	lon = parseFloat($('#lon').val());

	flickr.photos.search({
		lat: lat,
		lon: lon,
		radius: 0.5,
		radius_units: 'mi',
		per_page: 10
	}, function (err, result) {
		console.log(result);
		if(err) { throw new Error(err); }
		var returnedList = result.photos.photo;
		for (var i = 0; i < returnedList.length; i++) {
			var photoUrl = 'https://farm' + returnedList[i].farm + '.staticflickr.com/' + returnedList[i].server + '/' + returnedList[i].id + '_' + returnedList[i].secret + '.jpg';
			document.getElementById('result').innerHTML += '<img src="' + photoUrl + '"><br><h2>' + returnedList[i].title + '</h2><br>';
		};
	});
	e.preventDefault();
});