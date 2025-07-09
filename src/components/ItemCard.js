import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RatingBadge from "./Rating";

const ItemCard = ({ item, onPress }) => {
  const [wish, setWish] = useState(false);

  const getWishlist = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("wishlist");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error("Failed to load wishlist", e);
      return [];
    }
  };

  const saveWishlist = async (list) => {
    try {
      await AsyncStorage.setItem("wishlist", JSON.stringify(list));
    } catch (e) {
      console.error("Failed to save wishlist", e);
    }
  };

  const toggleWishlistItem = async () => {
    const list = await getWishlist();
    let newList;
    if (list.includes(item.id)) {
      newList = list.filter((id) => id !== item.id);
    } else {
      newList = [...list, item.id];
    }
    await saveWishlist(newList);
    setWish(newList.includes(item.id));
  };

  useEffect(() => {
    const checkWish = async () => {
      const list = await getWishlist();
      setWish(list.includes(item.id));
    };
    checkWish();
  }, [item.id]);

  return (
    <TouchableOpacity style={styles.card}  onPress={() => onPress(item)}>
      <View>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
          style={styles.image}
        />
        <RatingBadge score={Math.round(item.vote_average * 10)} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subTitle}>
          {item.overview.length > 50
            ? item.overview.slice(0, 50) + "..."
            : item.overview}
        </Text>
        <TouchableOpacity
          onPress={toggleWishlistItem}
          style={styles.loveButton}
        >
          <FontAwesome name="heart" size={30} color={wish ?  "#ffe353" : "gray"} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  card: {
    width: "48%",
    marginBottom: 20,
    backgroundColor: "#e1e0e0",
    padding: 10,
    borderRadius: 15,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  loveButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  subTitle: {
    color: "gray",
    fontSize: 14,
  },
});
