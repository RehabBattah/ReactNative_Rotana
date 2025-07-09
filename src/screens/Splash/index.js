import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Splash = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../../assets/splash.jpg")}
      style={styles.splashImg}
    >
      <View style={styles.centerView}>
        <Image
          source={require("../../../assets/ball.png")}
          style={{ height: 100, width: 200 }}
          resizeMode="contain"
        />

        <Text style={styles.rotana}>ROTANA</Text>
        <TouchableOpacity
          style={styles.butt}
          onPress={() => navigation.navigate("MainTabs")}
        >
          <Text style={{ color: "white", fontSize: 24, fontWeight: "600" }}>
            GET STARTED
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  splashImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  centerView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: "relative",
  },
  rotana: {
    color: "white",
    fontSize: 60,
    fontWeight: "700",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  butt: {
    position: "absolute",
    backgroundColor: "rgba(255, 193, 7, 0.6)",
    paddingInline: 30,
    paddingVertical: 20,
    borderRadius: 50,
    bottom: "20%",
  },
});
