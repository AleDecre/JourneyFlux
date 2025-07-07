import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { theme } from '../utils/theme';

const AppText = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.regular,
    color: '#2C3E50',
    fontSize: 16,
  },
});

export default AppText;
