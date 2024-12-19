import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontFamily, Color } from "../../styles/GlobalStyles";
import SalonCard from './SalonCard';
import { SALONS } from './salonsData';
import SalonDetails from './SalonDetails';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SalonsList = ({ salons = SALONS, onSalonPress, onSeeAllPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <Text style={styles.title}>מספרות מובילות</Text>
        <TouchableOpacity onPress={onSeeAllPress} style={styles.seeAllButton}>
          <Text style={styles.seeAll}>הכל</Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      >
        {[...salons].reverse().map((salon) => (
          <View key={salon.id} style={styles.cardContainer}>
            <SalonCard
              salon={salon}
              onPress={() => onSalonPress(salon)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: FontFamily.assistantBold,
    color: Color.grayscaleColorBlack,
  },
  seeAll: {
    fontSize: 14,
    fontFamily: FontFamily.assistantRegular,
    color: Color.primaryColorAmaranthPurple,
  },
  listContainer: {
    paddingRight: 12,
  },
  cardContainer: {
    marginLeft: 15,
  },
});

export default SalonsList;