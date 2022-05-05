import {NumberSymbol} from "@angular/common";

export default class Beach {

  _id: string = '';
  title: string = '';
  city: string = '';
  address: string = '';
  picture: string = '';

  services = {
    bar: Boolean,
    restaurant: Boolean,
    animals: Boolean,
    cards: Boolean,
    hot_shower: Boolean,
    wifi: Boolean,
    beach_volley: Boolean,
    cabins: Boolean,
    animations: Boolean,
    play_area: Boolean,
    accessible_to_disabled_people: Boolean
  }

  gallery = {
    gallery_1: String,
    gallery_2: String,
    gallery_3: String
  }

  coordinates = {
    lat: String,
    lng: String
  }

}
