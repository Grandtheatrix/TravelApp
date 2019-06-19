import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput
} from "react-native";
import BackButton from "./BackButton.js";
import CardDetail from "./CardDetail.js";

export default class Card extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.photo && (
          <ImageBackground
            source={this.props.photo}
            style={styles.imageBackground}
          >
            <BackButton />
            <View style={styles.addressNameText}>
              <View style={styles.addressAndRating}>
                <View style={{ flexDirection: "column", flex: 4, padding: 20 }}>
                  <Text
                    style={{ fontSize: 15, color: "white", fontWeight: "bold" }}
                  >
                    {this.props.location && this.props.location}
                  </Text>
                  <Text
                    style={{ fontSize: 30, color: "white", fontWeight: "bold" }}
                  >
                    {this.props.title && this.props.title}
                  </Text>
                </View>
                {this.props.rating && (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "flex-end"
                    }}
                  >
                    <View style={styles.rating}>
                      <Image
                        style={styles.ratingHeart}
                        resizeMode="cover"
                        source={require("../assets/heartIcon.png")}
                      />
                      <Text style={styles.ratingText}>{this.props.rating}</Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </ImageBackground>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
    height: "30%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    margin: 10,
    padding: 10
  },
  ratingText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "darkblue"
  }
});
