var express    = require('express');
var router     = express.Router();
var _          = require('lodash');
var url        = require('url');
var randomSeed = require('random-seed');

var locations = require('../data/zipcodes.json');

/**
 *  Search locations
 *  
 *  Note: This is NOT optimal code given a large dataset. This 
 *  query could take quite some time when using a flat
 *  database structure like JSON files. I'm doing it this way
 *  to add interest to the coding challenge without completely
 *  changing the DB system. Normally I would use a DB that allows
 *  for more optimal data retrieval using queries on indexed fields.
 */
router.get('/', function(req, res) {
  var querystring = url.parse(req.url, true).query;
  var searchStr = querystring.search;
  if(!searchStr || searchStr.length < 3) throw 'Invalid location search string';
  // get only the locations that have the search string in the combined state, city, and postal code
  var filteredLocations = _.filter(locations, function(location){
	  var compositeLocationStr = (location.state + ' ' + location.city + ' ' + location.postal).toLowerCase();
	  return compositeLocationStr.indexOf(searchStr.toLowerCase()) != -1;
  });
  // sample zipcode location data contains duplicate data, but we don't care for this coding challenge
  if(searchStr.match(/^\d+$/)) {
    // if the search only contains numers (is probably a sipcode) then remove duplicate zipcode entries
	filteredLocations = _.indexBy(_.toArray(filteredLocations), 'postal');
  } else {
	// if search is probably not a zipcode, then remove duplicate city/state combinations
	filteredLocations = _.indexBy(_.toArray(filteredLocations), function(location) {
		return location.city + ' ' + location.state;
	});
  }
  res.json(_.toArray(filteredLocations));
});

// Get a specific hotel
router.get('/:id/hotels/:udicode', function(req, res, next) {
  var location = locations[req.params.id];
  var hotels;
  if (!location) return next();
  hotels = getHotels(location, req);
  res.json(_.findWhere(hotels, {id: req.params.udicode}));
});

module.exports = router;
