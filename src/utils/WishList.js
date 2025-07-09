
// utils/WishList.js

import AsyncStorage from "@react-native-async-storage/async-storage";

export const getWishlist = async () => {
  const json = await AsyncStorage.getItem("wishlist");
  return json ? JSON.parse(json) : [];
};

export const saveWishlist = async (list) => {
  await AsyncStorage.setItem("wishlist", JSON.stringify(list));
};

export const toggleWishlist = async (movieId) => {
  const list = await getWishlist();
  const isInList = list.includes(movieId);

  const newList = isInList
    ? list.filter((id) => id !== movieId)
    : [...list, movieId];

  await saveWishlist(newList);
  return !isInList;
};