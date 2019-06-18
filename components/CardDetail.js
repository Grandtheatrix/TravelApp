import * as React from "react";
import Card from "./Card";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput
} from "react-native";
// import Axios from "axios";
import { connect } from "react-redux";

const API_KEY = "AIzaSyCDxfkVY5XHoepzhZgsBGBWyy5CpDYE6Qo";

class CardDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeid: this.props.place_id,
      title: false,
      location: false,
      address: false,
      county: false,
      rating: false,
      photo: false,
      staticMap: false,
      pin: "Pin to Trip",
      pinColor: "blue"
    };
  }

  addressComponentParse = input => {
    let city = "";
    let state = "";
    let title = "";
    let county = "";

    console.log("address_components", input);

    for (let item of input) {
      if (item.types[0] == "locality") {
        city = item.short_name;
      } else if (item.types[0] == "administrative_area_level_1") {
        state = item.long_name;
      } else if (item.types[0] == "administrative_area_level_2") {
        county = item.long_name;
      } else if (item.types[0] == "point_of_interest") {
        title = item.long_name;
      }
    }
    if (title == "") {
      title = county;
    }
    this.setState({
      location: city + ", " + state,
      title: title,
      county: county
    });
  };

  pinStyle = () => {
    return {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderRadius: 25,
      width: "90%",
      height: "90%",
      margin: 10,
      marginBottom: 5,
      backgroundColor: this.state.pinColor
    };
  };
  pinPress = () => {
    if (this.state.placeid != false) {
      let bookmark = {
        location: this.state.location,
        title: this.state.title,
        address: this.state.address,
        county: this.state.county,
        rating: this.state.rating,
        photo: this.state.photo,
        staticMap: this.state.staticMap
      };

      this.props.add_bookmark(bookmark);
      this.props.current_detail();
      this.props.navigation.navigate("Home");
    } else {
      console.log("made it to the right place");
      this.props.delete_bookmark(this.props.index);

      this.setState({ pin: "Pin to Trip" });
      this.props.navigation.navigate("Home");
    }
  };

  makePhotoFetch = resp => {
    try {
      fetch(
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=" +
          resp.result.photos[0].photo_reference +
          "&key=" +
          API_KEY
      ).then(response => {
        this.setState({ photo: { uri: response.url } });
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  makeDetailsFetch = () => {
    try {
      fetch(
        "https://maps.googleapis.com/maps/api/place/details/json?placeid=" +
          this.state.placeid +
          "&fields=name,rating,formatted_address,address_component,photo,geometry" +
          "&key=" +
          API_KEY
      )
        .then(response => response.json())
        .then(responseJson => {
          this.addressComponentParse(responseJson.result.address_components);
          this.setState(
            {
              address: responseJson.result.formatted_address,
              rating: responseJson.result.rating,
              staticMap: {
                uri:
                  "https://maps.googleapis.com/maps/api/staticmap?center=" +
                  responseJson.result.formatted_address +
                  "&zoom=14&size=300x600&maptype=roadmap&markers=color:red%7C" +
                  responseJson.result.geometry.location.lat +
                  "," +
                  responseJson.result.geometry.location.lng +
                  "&key=" +
                  API_KEY
              }
            },

            this.makePhotoFetch(responseJson)
          );
        });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    if (this.state.placeid == false) {
      let bookmark = this.props.bookmarks[this.props.index];

      this.setState({
        location: bookmark.location,
        title: bookmark.title,
        address: bookmark.address,
        county: bookmark.county,
        rating: bookmark.rating,
        photo: bookmark.photo,
        staticMap: bookmark.staticMap,
        pin: "Pinned to Trip",
        pinColor: "green",
        index: this.props.index
      });
    } else {
      this.makeDetailsFetch();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.boxTop}>
          {this.state.photo != false && (
            <Card
              location={this.state.location}
              title={this.state.title}
              rating={this.state.rating}
              photo={this.state.photo}
              index={this.state.index}
            />
          )}
        </View>
        <View style={styles.boxMid}>
          <TouchableOpacity
            style={this.pinStyle()}
            onPress={() => this.pinPress()}
          >
            <Text>{this.state.pin}</Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: "space-evenly",
              margin: 10,
              marginTop: 5,
              alignItems: "flex-start"
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{ padding: 5 }}
                source={require("../assets/townPinIcon2x.png")}
              />
              <Text style={{ fontWeight: "bold" }}>
                {this.state.county && this.state.county}
              </Text>
            </View>
            <Text style={{ fontSize: 12 }}>
              {this.state.address && this.state.address}
            </Text>
          </View>
        </View>
        <View style={styles.boxBottom}>
          <Image
            resizeMode="cover"
            source={this.state.staticMap}
            style={{ height: "100%", width: "100%" }}
          />
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  boxTop: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  boxMid: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "white"
  },
  boxBottom: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  imageBackground: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  addressNameText: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },
  addressAndRating: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rating: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25
  },
  pinButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "blue"
  }
});
const mapStateToProps = state => {
  return {
    place_id: state.place_id,
    bookmarks: state.bookmarks,
    index: state.index
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add_bookmark: bookmark =>
      dispatch({
        type: "ADD_BOOKMARK",
        item: bookmark
      }),
    delete_bookmark: index =>
      dispatch({
        type: "DELETE_BOOKMARK",
        index: index
      }),
    current_detail: () => dispatch({ type: "CURRENT_DETAIL", item: false })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardDetail);
