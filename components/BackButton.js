import React from "react";
import { TouchableOpacity, Image, View } from "react-native";
import { withNavigation } from "react-navigation";

class BackButton extends React.Component {
  componentDidMount() {
    console.log("this.props.navigation.state", this.props.navigation.state);
  }
  render() {
    return (
      <View style={{ flex: 1, height: "100%", width: "100%" }}>
        {this.props.navigation.state.routeName == "CardDetail" && (
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={require("../assets/goIcon2x.png")} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default withNavigation(BackButton);
