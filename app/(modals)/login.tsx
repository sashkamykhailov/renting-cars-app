import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo"; // хук для управління авторизацією від Clerk
import { useRouter } from "expo-router";

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}

const Login = () => {

  useWarmUpBrowser();

  const router = useRouter();

  // Отримує функцію googleAuth для ініціювання OAuth-потоку для Google.
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' }); 
  //  Отримує функцію appleAuth для ініціювання OAuth-потоку для Apple.
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
  // Отримує функцію facebookAuth для ініціювання OAuth-потоку для Facebook.
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' });


  // Функція, яка викликається при виборі методу авторизації.
  const onSelectAuth = async (strategy: Strategy) => {

    //Визначає функцію OAuth, що відповідає обраній стратегії.
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

     try {
      // Викликає обрану функцію OAuth та отримує createdSessionId та функцію setActive для налаштування сесії.
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {

        // Викликає setActive для встановлення активної сесії.
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        keyboardType="email-address"
        style={[defaultStyles.inputField, styles.marginButton]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Proceed</Text>
      </TouchableOpacity>

      <View style={styles.seprateView}>
        <View style={styles.firstSep}></View>
        <Text style={styles.separator}>or</Text>
        <View style={styles.firstSep}></View>
      </View>

      <View>
        <TouchableOpacity style={defaultStyles.btnOutline}>
          <Ionicons name="phone-portrait" style={{marginRight: 10}}/>
          <Text style={defaultStyles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[defaultStyles.btnOutline, {marginTop: 20}]} onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name="logo-google" style={{marginRight: 10}}/>
          <Text style={defaultStyles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[defaultStyles.btnOutline, {marginTop: 20}]} onPress={() => onSelectAuth(Strategy.Apple)}>
          <Ionicons name="logo-apple" style={{marginRight: 10}}/>
          <Text style={defaultStyles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[defaultStyles.btnOutline, {marginTop: 20}]} onPress={() => onSelectAuth(Strategy.Facebook)}>
          <Ionicons name="logo-facebook" style={{marginRight: 10}}/>
          <Text style={defaultStyles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
  marginButton: {
    marginBottom: 20,
  },
  seprateView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  separator: {
    color: Colors.grey,
  },
  firstSep: {
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Login;
