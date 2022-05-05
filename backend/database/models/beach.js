const mongoose = require('mongoose');

const BeachSchema = new mongoose.Schema({
  title: {
    type: String,
    default:"",
    trim: true,
  },

  city: {
    type: String,
    default:"",
    trim: true,
  },

  address: {
    type: String,
    default:"",
    trim: true,
  },

  services: {
    bar: {type : Boolean, default: false},
    restaurant: {type : Boolean, default: false},
    animals: {type : Boolean, default: false},
    cards: {type : Boolean, default: false},
    hot_shower: {type : Boolean, default: false},
    wifi: {type : Boolean, default: false},
    beach_volley: {type : Boolean, default: false},
    cabins: {type : Boolean, default: false},
    animations: {type : Boolean, default: false},
    play_area: {type : Boolean, default: false},
    accessible_to_disabled_people: {type : Boolean, default: false}
  },

  picture: {
    type: String,
    trim: true,
    minlength: 3
  },

  gallery: {
    gallery_1: {type : String, default: "gallery_1"},
    gallery_2: {type : String, default: "gallery_2"},
    gallery_3: {type : String, default: "gallery_3"}
  },

  coordinates: {
    lat: {type : String, default: "44.06000563305125"},
    lng: {type : String, default: "12.59232497072539"},
  }
});

const Beach = mongoose.model('Beach', BeachSchema);

module.exports = Beach;
