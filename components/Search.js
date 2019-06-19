import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import * as Fetch from "./Api.js";
import * as Actions from "./Actions.js";

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
      Fetch.autocomplete(this.state.searchBarValue)
        .then(response => response.json())
        .then(responseJson => {
          this.setState({ response: responseJson });
        });
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
    current_detail: place_id => dispatch(Actions.CURRENT_DETAIL(place_id))
  };
};
const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
