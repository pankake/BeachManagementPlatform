
export default {

  LIMIT:                        1,

  /* KEYs */
  OPENWEATHERMAP_KEY:           '8d062aeee1449862c81657fbc8911d6d',
  SOLCAST_API_KEY:              '-EZHW_7PTxtwEGVueXx0tyFWhRzCEncG',
  SOLCAST_FAKE_API_KEY:         '+EZHW_7PTxtwEGVueXx0tyFWhRzCEncG',
  WEATHERBIT_API_KEY:           'adf1852dcb7c4d8f89cfdb2062315ee6',
  AGM_API_KEY:                  '123_123_123_123',

  /* APIs */
  API_REVERSE_GEOCODING:        'https://api.openweathermap.org/geo/1.0/reverse?',
  API_OPENWEATHERMAP_BY_CITY:   'https://api.openweathermap.org/data/2.5/weather?q=',
  API_SOLAR_IRRADIANCE:         'https://api.solcast.com.au/world_radiation/estimated_actuals?',
  API_WEATHERBIT:               'https://api.weatherbit.io/v2.0/current?',
  API_OPENWEATHERMAP:           'https://api.openweathermap.org/data/2.5/weather?',

  /* ERROR MESSAGES */
  ERROR_GEOLOCATIONPOSITION:    'GeolocationPositionError: User denied geolocation prompt',
  ERROR_OPENWEATHERMAP:         'ERROR contacting the OpenWeatherMap service',
  ERROR_GENERIC:                'GenericError in contacting the service: ',
  ERROR_CITY_NOT_FOUND_OPENW:   'ERROR by the OpenWeatherMap service: the city entered was not found',
  ERROR_CITY_NOT_FOUND_WB:      'ERROR by the Weatherbit service: the city entered was not found',
  ERROR_GET_BEACHES:            'ERROR while receiving data from the server, the beach list was not loaded correctly',
  ERROR_DELETE_BEACH:           'ERROR while deleting the beach. The deletion was not successful',

  /* WARNING MESSAGES */
  WARNING_EMPTY_BEACH_LIST:     'WARNING there are no more beaches available',

  /* SUCCESS_MESSAGES */
  SUCCESS_WEATHERBIT:           'Weatherbit service data received successfully',
  SUCCESS_OPENWEATHERMAP:       'OpenWeatherMap service data received successfully',
  SUCCESS_BEACHES:              'beach list received successfully',
  SUCCESS_DELETE_BEACH:         'card successfully removed',

  /* URLs */
  URL_BEACHES:                  'http://localhost:3000/beaches',


}
