import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MoviesNavigator from "./src/screens/MoviesNavigator";
import WatchList from "./src/screens/WatchList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./src/screens/Splash";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MovieInfo from "./src/screens/Movies/MovieInfo";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Movies"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fe5b00",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: 16 },
        tabBarStyle: {
          backgroundColor: "#ffe353",
          height: 70,
          paddingTop: 5,
        },
      }}  >
      <Tab.Screen name="Movies"
        component={MoviesNavigator}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <Fontisto name="film" size={28} color={color} />
          ),
        }}  />

      <Tab.Screen  name="Watch List"
        component={WatchList}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="television-play"
              size={28}
              color={color}
            />
          ),
        }} />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator   initialRouteName="Splash" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="MovieInfo" component={MovieInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

