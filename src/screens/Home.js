import * as React from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Modal,
  TextInput,
  I18nManager,
  StatusBar
} from "react-native";
import { Image } from "expo-image";
import { FontFamily, Color } from "../styles/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";

// Import Components
import CategoriesList from '../components/categories/CategoriesList';
import SearchBar from '../components/common/SearchBar';
import SalonsList from '../components/salons/SalonsList';
import NearbySalonsList from '../components/salons/NearbySalonsList';
import BottomNavigation from '../components/common/BottomNavigation';
import SalonDetails from '../components/salons/SalonDetails';
import FilterModal from '../components/filters/FilterModal';

// Import Data
import { NEARBY_SALONS, SALONS } from '../components/salons/salonsData';

// קונפיגורציה של RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const FilterOption = ({ title, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.filterOption, selected && styles.filterOptionSelected]}
    onPress={onPress}
  >
    <Text style={[styles.filterOptionText, selected && styles.filterOptionTextSelected]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = React.useState('home');
  const [searchText, setSearchText] = React.useState('');
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState({
    distance: 5,
    rating: 4,
    price: 2,
    availability: false,
  });

  // Example customer name - replace with actual customer data
  const customerName = "שירה";

  const formatDistance = (min, max) => {
    return `${min}-${max} ק"מ`;
  };

  const formatRating = (min, max) => {
    return `${min.toFixed(1)}-${max.toFixed(1)}+`;
  };

  const formatPrice = (min, max) => {
    return '₪'.repeat(Math.round(min)) + ' - ' + '₪'.repeat(Math.round(max));
  };

  // Navigation Handlers
  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryDetails', { category });
  };

  const handleSalonPress = (salon) => {
    // מוצא את כל הנתונים של הסלון מתוך ה-SALONS
    const fullSalonData = SALONS.find(s => s.id === salon.id) || salon;
    navigation.navigate('SalonDetails', { salon: fullSalonData });
  };

  const handleSearch = () => {
    // כאן תהיה הלוגיקה של החיפוש
    console.log('Searching for:', searchText);
  };

  const handleFilterPress = () => {
    setShowFilters(true);
  };

  const applyFilters = () => {
    // כאן תהיה הלוגיקה של הפעלת הפילטרים
    console.log('Applying filters:', filters);
    setShowFilters(false);
  };

  const handleTabPress = (tabId) => {
    if (tabId !== activeTab) {
      setActiveTab(tabId);
      const screens = {
        saved: 'Saved',
        map: 'Map',
        messages: 'Messages',
        profile: 'Profile'
      };
      if (screens[tabId]) {
        navigation.navigate(screens[tabId]);
      }
    }
  };

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(Color.primaryColorAmaranthPurple);
    }
  }, []);

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <ScrollView 
            style={styles.scrollView} 
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
            nestedScrollEnabled={true}
          >
            {/* Header Background */}
            <View style={styles.headerBg}>
              <View style={styles.welcomeContainer}>
                <View style={styles.headerTopRow}>
                  <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Welcome')}
                  >
                    <Ionicons name="arrow-forward" size={24} color="white" />
                  </TouchableOpacity>
                  <View style={styles.greetingContainer}>
                    <Text style={styles.welcomeText}>
                      <Text style={styles.boldText}>היי שירה</Text> 😊{'\n'}
                      <Text style={styles.regularText}>איזה תור נקבע לך היום?</Text>
                    </Text>
                  </View>
                </View>
              </View>

              {/* Search Bar */}
              <View style={styles.searchBarContainer}>
                <SearchBar 
                  onPress={() => navigation.navigate('Search')}
                  onFilterPress={handleFilterPress}
                />
              </View>
            </View>

            {/* Categories */}
            <View style={styles.categoriesSection}>
              <CategoriesList 
                onCategoryPress={handleCategoryPress}
                onSeeAllPress={() => navigation.navigate('Categories')}
              />
            </View>

            {/* Top Rated Salons */}
            <SalonsList 
              salons={SALONS}
              onSalonPress={handleSalonPress}
              onSeeAllPress={() => navigation.navigate('Salons')}
            />

            {/* Nearby Salons */}
            <NearbySalonsList 
              salons={NEARBY_SALONS}
              onSalonPress={handleSalonPress}
              onSeeAllPress={() => navigation.navigate('NearbySalons')}
            />

          </ScrollView>

          <FilterModal
            visible={showFilters}
            onClose={() => setShowFilters(false)}
            filters={filters}
            setFilters={setFilters}
          />

          {/* Bottom Navigation */}
          <BottomNavigation 
            activeTab={activeTab}
            onTabPress={handleTabPress}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.grayscaleColorWhite,
  },
  topSafeArea: {
    flex: 0,
    backgroundColor: Color.primaryColorAmaranthPurple,
  },
  container: {
    flex: 1,
    backgroundColor: Color.grayscaleColorWhite,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'ios' ? 90 : 70,
  },
  headerBg: {
    backgroundColor: Color.primaryColorAmaranthPurple,
    paddingTop: 12,
    paddingBottom: 45,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    position: 'relative',
  },
  welcomeContainer: {
    paddingHorizontal: 12,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 20,
  },
  greetingContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  welcomeText: {
    textAlign: 'right',
    direction: 'rtl',
  },
  boldText: {
    fontSize: 24,
    fontFamily: FontFamily.rubikBold,
    color: Color.grayscaleColorWhite,
  },
  regularText: {
    fontSize: 16,
    fontFamily: FontFamily.rubikRegular,
    color: Color.grayscaleColorWhite,
  },
  searchBarContainer: {
    position: 'absolute',
    bottom: -22,
    left: 16,
    right: 16,
    zIndex: 1,
  },
  filterOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: Color.grayscaleColorWhite,
    borderColor: Color.grayscaleColorGray,
    borderWidth: 1,
  },
  filterOptionSelected: {
    backgroundColor: Color.primaryColorAmaranthPurple,
  },
  filterOptionText: {
    fontSize: 16,
    fontFamily: FontFamily.assistantRegular,
    color: Color.grayscaleColorBlack,
  },
  filterOptionTextSelected: {
    color: Color.grayscaleColorWhite,
  },
  categoriesSection: {
    marginTop: 30,
    paddingHorizontal: 0,
  },
  categoryTitle: {
    fontSize: 20,
    fontFamily: FontFamily.rubikBold,
    color: Color.grayscaleColor900,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
});

export default HomeScreen;