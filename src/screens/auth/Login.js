//login.js
import * as React from "react";
import { 
  Text, 
  StyleSheet, 
  View, 
  SafeAreaView, 
  Dimensions, 
  Platform, 
  TouchableOpacity, 
  TextInput, 
  I18nManager 
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../../styles/GlobalStyles";
import { useNavigation } from '@react-navigation/native';

// Enable RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 414;

const Frame = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async () => {
    // Add your login logic here
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>ברוכים השבים! 👋</Text>
          <Text style={styles.subtitle}>שמחים לראות אותך שוב</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>אימייל</Text>
            <TextInput
              style={styles.input}
              placeholder="הכנס את האימייל שלך"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>סיסמה</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="הכנס את הסיסמה שלך"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Text style={styles.eyeIcon}>{isPasswordVisible ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('Resetpass')}
          >
            <Text style={styles.forgotPasswordText}>שכחת סיסמה?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>כניסה</Text>
          </TouchableOpacity>

          <View style={styles.socialLoginContainer}>
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>או</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity
                style={[styles.socialButton, styles.googleButton]}
                onPress={() => {/* Add Google login logic */}}
              >
                <View style={styles.socialButtonContent}>
                  <Text style={styles.socialButtonText}>התחבר עם Google</Text>
                  <Text style={styles.socialIcon}>🌐</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialButton, styles.facebookButton]}
                onPress={() => {/* Add Facebook login logic */}}
              >
                <View style={styles.socialButtonContent}>
                  <Text style={styles.socialButtonText}>התחבר עם Facebook</Text>
                  <Text style={styles.socialIcon}>📱</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupLink}> הירשם עכשיו 👉</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}>עדיין אין לך חשבון? </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.grayscaleColorWhite,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: FontFamily["Assistant-Bold"],
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: FontFamily["Assistant-Medium"],
    color: '#64748B',
    textAlign: 'center',
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: FontFamily["Assistant-SemiBold"],
    color: '#1E293B',
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: FontFamily["Assistant-Regular"],
    textAlign: 'right',
    backgroundColor: '#FFFFFF',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  eyeButton: {
    position: 'absolute',
    left: 16,
  },
  eyeIcon: {
    fontSize: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: FontFamily["Assistant-Medium"],
    color: '#2563EB',
  },
  loginButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: FontFamily["Assistant-SemiBold"],
  },
  socialLoginContainer: {
    marginTop: 24,
    gap: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontSize: 14,
    fontFamily: FontFamily["Assistant-Regular"],
    color: '#94A3B8',
    paddingHorizontal: 8,
  },
  socialButtons: {
    gap: 12,
  },
  socialButton: {
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DB4437',
  },
  facebookButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#1877F2',
  },
  socialButtonContent: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontFamily: FontFamily["Assistant-Medium"],
    color: '#1E293B',
  },
  socialIcon: {
    fontSize: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    fontSize: 16,
    fontFamily: FontFamily["Assistant-Regular"],
    color: '#64748B',
  },
  signupLink: {
    fontSize: 16,
    fontFamily: FontFamily["Assistant-SemiBold"],
    color: '#2563EB',
  },
});

export default Frame;