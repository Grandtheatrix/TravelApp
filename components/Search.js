import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
// import Axios from "axios";
import uuid from "react-native-uuid";
import { connect } from "react-redux";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarValue: "",
      response: false
    };
  }
  selectPlace = place_id => {
    this.props.current_detail(place_id);

    this.props.navigation.navigate("CardDetail");
  };
  makeFetch = () => {
    try {
      console.log("making fetch");

      console.log("value to search", this.state.searchBarValue);
      console.log(
        "API Query String =>",
        "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" +
          this.state.searchBarValue +
          "&key=AIzaSyCDxfkVY5XHoepzhZgsBGBWyy5CpDYE6Qo&sessiontoken=" +
          uuid.v4()
      );
      fetch(
        "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" +
          this.state.searchBarValue +
          "&key=AIzaSyCDxfkVY5XHoepzhZgsBGBWyy5CpDYE6Qo&sessiontoken=" +
          uuid.v4()
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          this.setState({ response: responseJson });
        });
      //this.setState({response: JSON.stringify(responseJson)}))
      //return responseJson.movies;
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.boxTop}>
          <TextInput
            defaultValue={"Search"}
            style={styles.searchBar}
            value={this.state.searchBarValue}
            onChangeText={text => {
              this.setState({ searchBarValue: text });
              if (text.length > 2) {
                this.makeFetch();
              }
            }}
          />
        </View>
        <View style={styles.boxBottom}>
          {this.state.response &&
            this.state.response.predictions.map((map, i) => {
              return (
                <TouchableOpacity
                  style={styles.singleResponseButton}
                  onPress={() => {
                    this.selectPlace(map.place_id);
                  }}
                >
                  <Text style={styles.singleResponse}>{map.description}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 15,
    width: "90%",
    backgroundColor: "#eff1f4",
    margin: 10,

    borderRadius: 10
  },
  singleResponse: {
    //flex: 1,
    width: "100%",
    height: 20,
    fontSize: 10,
    borderColor: "gray",
    borderWidth: 1
  },
  singleResponseButton: {
    width: "100%",
    height: 20
  },
  boxTop: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  boxBottom: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    current_detail: place_id =>
      dispatch({ type: "CURRENT_DETAIL", item: place_id })
  };
};
const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
