var express    = require('express');
var router     = express.Router();
var _          = require('lodash');
var url        = require('url');
var randomSeed = require('random-seed');

function cloneRequiredJson(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// combine hotel data from 3 available locations
// normally this would likely be in one single data source
var hotels = [];
_.each(['charlottesville', 'newyork', 'chicago'], function(location) {
	hotels = hotels.concat(cloneRequiredJson(require('../data/hotels/' + location + '.json')));
});

function getHotelsWithPrices(querystring) {
  
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

/** 
 * Converts numeric degrees to radians 
 * 
 * Source: https://gist.github.com/clauswitt/1604972
 */
if(typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    };
}

/**
 * Get distance from a point to a hotel
 * 
 * Source: http://www.movable-type.co.uk/scripts/latlong.html
 * 
 * @param {float} lat The latitude of the point in question
 * @param {float} lng The longitude of the point in question
 * @param {object} hotel The hotel to which distance should be calculated
 * @returns {float} Distance in miles from the supplied point to supplied hotel
 */
function getDistance(lat, lng, hotel) {
	
	lat1 = parseFloat(lat);
	lon1 = parseFloat(lng);
	lat2 = parseFloat(hotel.lat);
	lon2 = parseFloat(hotel.lng);
	
	var R = 3958.76; // miles in earth's radius
	var φ1 = lat1.toRad();
	var φ2 = lat2.toRad();
	var Δφ = (lat2-lat1).toRad();
	var Δλ = (lon2-lon1).toRad();

	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
			Math.cos(φ1) * Math.cos(φ2) *
			Math.sin(Δλ/2) * Math.sin(Δλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var km = R * c;
	
	return km;
}

function filterHotelsByLocation(hotels, querystring) {
	
  var lat = parseFloat(querystring.lat);
  var lng = parseFloat(querystring.lng);
   var dist = parseFloat(querystring.dist);

  if(isNaN(lat) || isNaN(lng)) throw 'Invalid location';
  if(isNaN(dist) || dist < 1) throw 'Invalid maximum distance';
	
  return _.filter(hotels, function(hotel) {
	hotel.distance =  getDistance(lat, lng, hotel);
    return hotel.distance <= dist;
  });
}

/**
 * Get hotels
 */
router.get('/', function(req, res) {
  var querystring = url.parse(req.url, true).query;
  var hotels = getHotelsWithPrices(querystring);
  hotels = filterHotelsByLocation(hotels, querystring);
  res.json(hotels);
});

module.exports = router;
