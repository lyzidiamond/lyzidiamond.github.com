var flickr = new Flickr({
	api_key: '942201e9595f48cd2508799f4e02d210'
});

flickr.photos.search({
	lat: 37.7703428969378,
	lon: -122.436848957005,
	radius: 0.02,
	radius_units: 'mi'
}, function(err, result) {
	if(err) { throw new Error(err); }
	var returnedList = result.photos.photo;
	for (var i = 0; i < returnedList.length; i++) {
		var photoUrl = 'http://farm' + returnedList[i].farm + '.staticflickr.com/' + returnedList[i].server + '/' + returnedList[i].id + '_' + returnedList[i].secret + '.jpg';
		console.log(photoUrl);
		console.log(returnedList[i].title);
		document.getElementById('result').innerHTML += '<img src="' + photoUrl + '"><br><h2>' + returnedList[i].title + '</h2><br>';
	};
});