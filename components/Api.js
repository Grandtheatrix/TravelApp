import uuid from "react-native-uuid";

const API_KEY = "AIzaSyCDxfkVY5XHoepzhZgsBGBWyy5CpDYE6Qo";

export const autocomplete = value => {
  return fetch(
    "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" +
      value +
      "&key=" +
      API_KEY +
      "&sessiontoken=" +
      uuid.v4()
  );
};

export const detail = value => {
  return fetch(
    "https://maps.googleapis.com/maps/api/place/details/json?placeid=" +
      value +
      "&fields=name,rating,formatted_address,address_component,photo,geometry" +
      "&key=" +
      API_KEY
  );
};

export const photo = value => {
  return fetch(
    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=" +
      value +
      "&key=" +
      API_KEY
  );
};

export const staticMap = (address, loc) => {
  return {
    uri:
      "https://maps.googleapis.com/maps/api/staticmap?center=" +
      address +
      "&zoom=14&size=300x600&maptype=roadmap&markers=color:red%7C" +
      loc.lat +
      "," +
      loc.lng +
      "&key=" +
      API_KEY
  };
};
