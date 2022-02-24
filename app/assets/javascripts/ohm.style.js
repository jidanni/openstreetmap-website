// two sets of vector tiles: staging & production
// to use staging, either point your browser at http://localhost/ or else set &stagingtiles=1 in your URL params

const ohmTileServiceName = window.location.hostname.toLowerCase() == 'localhost' || window.location.hostname.toLowerCase() == 'staging.openhistoricalmap.org' !== false ? 'staging' : 'production';

const ohmTileServicesLists = {
  "production": [
    "https://vtiles.openhistoricalmap.org/maps/osm/{z}/{x}/{y}.pbf",
  ],
  "staging": [
    "https://vtiles-staging.openhistoricalmap.org/maps/osm/{z}/{x}/{y}.pbf",
  ],
};

// multiple map styles
// see ohm.style.XXX.js which define additional styles added to ohmVectorStyles
// see application.js where we require & load those individual ohm.style.XXX.js styles
// see leaflet.map.js which reads the ohmStyles whilst creating L.MapboxGL layers
// see timeslider.js which adds the TimeSlider to the map, keying it for those L.MapboxGL layers

const ohmVectorStyles = {};
