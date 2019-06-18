import * as React from "react";
import Card from "./Card.js";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import CardDetail from "./CardDetail.js";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      response: "Click the blue plus to pin a place",
      tripName: "Exploring Louisville BBQ",
      tripLocation: "Louisville, Kentucky"
    };
  }
  goToCardDetail = index => {
    this.props.set_index(index);
    this.props.current_detail();
    this.props.navigation.navigate("CardDetail");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.boxTop}>
          <View>
            <ImageBackground
              source={require("../assets/weatherHeader2x.png")}
              style={{ width: "100%" }}
            >
              <LinearGradient
                colors={["#FFFFFF00", "#FFFFFF"]}
                style={styles.bookmarkContainer}
              >
                <View style={[styles.boxContainer]}>
                  <Text style={{ fontSize: 32 }}>Good Morning</Text>
                  <Text>The weather is 72º and sunny </Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.bookmarkButton}
                    onPress={() => this.props.navigation.navigate("Search")}
                  >
                    <Image
                      source={require("../assets/addBookmarkButton.png")}
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
        </View>
        <View style={[styles.boxContainer, styles.boxMid]}>
          {this.props.bookmarks.length > 0 ? (
            <ScrollView
              horizontal={true}
              decelerationRate={0}
              snapToInterval={200}
              snapToAlignment={"center"}
            >
              {this.props.bookmarks.map((map, index) => {
                console.log(map.photo);
                return (
                  <TouchableOpacity onPress={() => this.goToCardDetail(index)}>
                    <View style={{ flex: 1, borderRadius: 25, margin: 10 }}>
                      <Card
                        style={{
                          width: 100,
                          height: 100
                        }}
                        location={map.location}
                        title={map.title}
                        rating={map.rating}
                        photo={map.photo}
                        staticMap={map.staticMap}
                        index={index}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <View>
              <Text> This trip is empty </Text>
              <Text> Click the blue plus to pin a place </Text>
            </View>
          )}
        </View>
        <View style={[styles.boxContainer, styles.boxBottom]}>
          <ImageBackground
            resizeMode="cover"
            source={require("../assets/tripBackground2x.png")}
            style={styles.lowerBackground}
          >
            <LinearGradient
              colors={["#FFFFFF", "#FFFFFF00", "#00000000", "#000000"]}
              style={styles.linearGradient}
            >
              <Text style={styles.buttonText}>{this.state.tripName}</Text>
              <Text style={styles.buttonSubText}>
                {this.state.tripLocation}
              </Text>
            </LinearGradient>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF"
  },
  boxContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  },

  bookmarkContainer: {
    flexDirection: "row"
  },

  boxTop: {
    flex: 1
  },

  boxMid: {
    flex: 2,
    alignItems: "center"
  },

  boxBottom: {
    flex: 3
  },

  bookmarkButton: {
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 40,
    borderRadius: 50
  },

  lowerBackground: {
    flex: 1,
    width: "100%"
  },
  gradient: {
    flex: 1
  },
  linearGradient: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end"
    // paddingLeft: 15,
    // paddingRight: 15
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "left",
    marginLeft: 20,
    color: "#ffffff",
    backgroundColor: "transparent"
  },
  buttonSubText: {
    fontSize: 12,
    fontFamily: "Gill Sans",
    textAlign: "left",
    marginBottom: 30,
    marginLeft: 20,
    color: "#ffffff",
    // paddingLeft: 15,
    backgroundColor: "transparent"
  }
});
const mapStateToProps = state => {
  return {
    place_id: state.place_id,
    bookmarks: state.bookmarks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    set_index: index => dispatch({ type: "SET_INDEX", item: index }),
    current_detail: () => dispatch({ type: "CURRENT_DETAIL", item: false })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
