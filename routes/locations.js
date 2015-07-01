var express    = require('express');
var router     = express.Router();
var _          = require('lodash');
var url        = require('url');
var randomSeed = require('random-seed');

var locations = require('../data/zipcodes.json');

function cloneRequiredJson(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function getHotels(location, req) {
  var querystring = url.parse(req.url, true).query;
  var hotels = cloneRequiredJson(require('../data/hotels/' + location.id + '.json'));

  var checkin = Date.parse(querystring.checkin);
  var checkout = Date.parse(querystring.checkout);

  if (isNaN(checkin)) throw 'Invalid checkin';
  if (isNaN(checkout)) throw 'Invalid checkout';

  hotels = _.map(hotels, function(hotel) {
    var seed = hotel.id + querystring.checkin + querystring.checkout;
    var rand = randomSeed.create(seed);
    var randomNumber = rand.random(); // Between 0 and 1

    if(!!hotel['indicative_rate']){
      //TODO: Different function
      var baseRate = hotel['indicative_rate'];
      var baseRateVariance = baseRate * 0.25;
      var rate = rand.floatBetween(baseRate - baseRateVariance, baseRate + baseRateVariance);

      // Dynamic Rate
      hotel['nightly_rate'] = rate;

      // Simulate Unavailability - 5% chance that the hotel will be unavailable
      hotel.available = (randomNumber > 0.05);
    }
    else {
      hotel.available = false;
    }
    delete hotel['indicative_rate'];

    return hotel;
  });

  return hotels;
}

// Get locations
router.get('/', function(req, res) {
  res.json(_.toArray(locations));
});

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
router.get('/search/:name', function(req, res) {
  var searchStr = res.req.params.name;
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

// Get a location by id
router.get('/:id', function(req, res, next) {
  var location = locations[req.params.id];
  if (!location) return next();
  res.json(location);
});

// Get a location's hotels
router.get('/:id/hotels', function(req, res, next) {
  var location = locations[req.params.id];
  var hotels;
  if (!location) return next();
  res.json(getHotels(location, req));
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
