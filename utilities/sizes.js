import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const sizes = {
    // Base spacing units
    spacing: 10,
    spacingSmall: 5,
    spacingMedium: 15,
    spacingLarge: 20,

    // Font sizes
    fontHeader: 32,
    fontTitle: 24,
    fontBody: 18,
    fontSmall: 14,

    // Border radius
    radiusSmall: 5,
    radiusMedium: 10,
    radiusLarge: 20,

    // Dynamic width calculations
    width,
    height,
    
    // Scale a size based on screen width
    scale: (size) => (width / 375) * size, // 375 is base width (iPhone SE)
};