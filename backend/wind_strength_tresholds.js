
// Wind forces according to the Beaufort scale
const WIND_STRENGTH = {
  level_0: 'Calm air',                // < 1 km/h       - #EEFFFF
  level_1: 'Light air',               // 1 - 5 km/h     - #66FFFF
  level_2: 'Light breeze',            // 6 - 11 km/h    - #00CCFF
  level_3: 'Gentle breeze',           // 12 - 19 km/h   - #0066FF
  level_4: 'Moderate breeze',         // 20 - 28 km/h   - #32cd32
  level_5: 'Fresh breeze',            // 29 - 38 km/h   - #228b22
  level_6: 'Strong breeze',           // 39 - 49 km/h   - #006400
  level_7: 'Strong wind, near gale',  // 50 - 61 km/h   - #556b2f
  level_8: 'Gale',                    // 62 - 74 km/h   - #ff0000
  level_9: 'Strong gale',             // 75 - 88 km/h   - #b22222
  level_10: 'Storm',                  // 89 - 102 km/h  - #ff00ff
  level_11: 'Violent storm',          // 103 - 117 km/h - #800080
  level_12: 'Hurricane '              // > 118 km/h     - black
}

module.exports = {
  WIND_STRENGTH
}

