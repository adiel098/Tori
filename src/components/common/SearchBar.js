import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Image } from "expo-image";
import { FontFamily, Color } from "../../styles/GlobalStyles";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SearchBar = ({ onPress, onFilterPress }) => {
  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity 
        style={styles.searchBar}
        onPress={onPress}
      >
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={onFilterPress}
        >
          <Image
            style={styles.filterIcon}
            contentFit="cover"
            source={require("../../assets/ic--setting.png")}
          />
        </TouchableOpacity>
        
        <Text style={styles.searchPlaceholder}>מה תרצי לחפש?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  searchBar: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: Color.grayscaleColorWhite,
    borderRadius: 15,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  searchPlaceholder: {
    flex: 1,
    textAlign: 'right',
    marginRight: 10,
    fontFamily: FontFamily.assistantRegular,
    fontSize: SCREEN_WIDTH * 0.04,
    color: Color.grayscaleColorSpanishGray,
  },
  filterIcon: {
    width: 24,
    height: 24,
  },
});

export default SearchBar;