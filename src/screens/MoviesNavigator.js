// src/screens/MoviesNavigator.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShowMovies from "./Movies/ShowMovies";
import MovieInfo from "./Movies/MovieInfo";

const Stack = createNativeStackNavigator();

const MoviesNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ShowMovies" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShowMovies" component={ShowMovies} />
      <Stack.Screen name="MovieInfo" component={MovieInfo} />
    </Stack.Navigator>
  );
};

export default MoviesNavigator;
