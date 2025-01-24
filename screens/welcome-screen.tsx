import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Button } from '../components/button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type WelcomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Welcome'>;
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const imageSource: ImageSourcePropType = require('../assets/welcome-image.png');
  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.header}>Welcome to DailyVita</Text>

        <Text style={styles.subheader}>
          Hello, we are here to make your life{"\n"}
          healthier and happier
        </Text>

        {/* Centered Image */}
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.bodyText}>
          We will ask couple of questions to better{"\n"}
          understand your vitamin need.
        </Text>
      </View>

      {/* Start Button */}
      <Button
        title="Get started"
        onPress={() => navigation.navigate('SunExposure')}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1A202C',
    textAlign: 'center',
    marginBottom: 16,
  },
  subheader: {
    fontSize: 18,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 24,
  },
  bodyText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    marginBottom: 40,
    width: '100%',
  },
});