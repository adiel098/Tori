import * as React from "react";
import { 
  Text, 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  TextInput,
  SafeAreaView,
  Dimensions,
  I18nManager,
  Alert 
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, Border } from "../../styles/GlobalStyles";

// Enable RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const EnterPhoneScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const handleContinue = () => {
    if (phoneNumber.length < 10) {
      Alert.alert('שגיאה', 'נא להזין מספר טלפון תקין');
      return;
    }
    navigation.navigate('Verification', { phoneNumber });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Header */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.backIcon}
            contentFit="cover"
            source={require("../../assets/ic--back.png")}
          />
        </TouchableOpacity>

        <Text style={styles.title}>שמחים שחזרת! 👋</Text>
        
        <Text style={styles.subtitle}>
          הזינו את מספר הטלפון שלכם ונשלח קוד אימות 📱✨
        </Text>

        {/* Phone Input */}
        <View style={styles.phoneInputContainer}>
          <Text style={styles.inputLabel}>מספר הטלפון שלך</Text>
          <View style={styles.phoneWrapper}>
            <TextInput
              style={styles.phoneInput}
              placeholder="הקלידו כאן..."
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={10}
              placeholderTextColor="#94A3B8"
            />
          </View>
          <Text style={styles.helperText}>נשלח לך קוד SMS לאימות החשבון</Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>שליחת קוד אימות ✉️</Text>
        </TouchableOpacity>

        {/* Privacy Note */}
        <Text style={styles.privacyNote}>
          הפרטים שלך מאובטחים אצלנו 🔒
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: FontFamily["Assistant-Bold"],
    color: '#1E293B',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FontFamily["Assistant-Regular"],
    textAlign: 'center',
    color: '#64748B',
    marginBottom: 32,
    lineHeight: 24,
  },
  phoneInputContainer: {
    marginTop: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: FontFamily["Assistant-Medium"],
    color: '#334155',
    marginBottom: 8,
    textAlign: 'right',
  },
  phoneWrapper: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  phoneInput: {
    flex: 1,
    fontFamily: FontFamily["Assistant-Regular"],
    fontSize: 16,
    textAlign: 'right',
    color: '#1E293B',
  },
  continueButton: {
    height: 56,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontFamily: FontFamily["Assistant-Bold"],
    fontSize: 18,
  },
  helperText: {
    fontSize: 14,
    fontFamily: FontFamily["Assistant-Regular"],
    color: '#64748B',
    marginTop: 8,
    textAlign: 'right',
  },
  privacyNote: {
    fontSize: 14,
    fontFamily: FontFamily["Assistant-Regular"],
    color: '#64748B',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default EnterPhoneScreen;