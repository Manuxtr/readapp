import { Audio } from 'expo-av';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AlphabetWords } from '../../components/mywords';
import { sizes } from '../../utilities/sizes';
import { appTheme } from '../../utilities/theme.colors';

export default function Mywords() {
    const { width } = useWindowDimensions();
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [sound, setSound] = useState();

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            require('../../app/sounds/pop.mp3')
        );
        setSound(sound);
        await sound.playAsync();
    }

    React.useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const handleLetterPress = useCallback((letter) => {
        setSelectedLetter(letter);
        playSound();
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, { backgroundColor: appTheme.navy }]}>
                <View style={styles.headerContainer}>
                    <Text style={styles.mainHeader}>Learning Words</Text>
                </View>
                <ScrollView style={styles.scrollContent}>
                    {Object.entries(AlphabetWords).map(([letter, words]) => (
                        <View key={letter} style={styles.letterSection}>
                            <Text style={styles.letterHeader}>{letter}</Text>
                            <View style={styles.wordsContainer}>
                                {words.map((word, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.wordCard,
                                            selectedLetter === letter && styles.selectedCard,
                                            { width: width * 0.4 }
                                        ]}
                                        onPress={() => handleLetterPress(letter)}
                                    >
                                        <Text style={styles.wordText}>{word}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        paddingVertical: sizes.spacingLarge,
        paddingHorizontal: sizes.spacingMedium,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    mainHeader: {
        fontSize: sizes.scale(sizes.fontHeader),
        fontWeight: '700',
        color: appTheme.orange,
        textAlign: 'center',
        marginVertical: sizes.spacing,
        letterSpacing: sizes.scale(4)
    },
    scrollContent: {
        flex: 1,
        backgroundColor: '#fff',
        padding: sizes.spacing,
        borderTopLeftRadius: sizes.radiusLarge,
        borderTopRightRadius: sizes.radiusLarge,
    },
    letterSection: {
        marginBottom: sizes.spacingLarge,
    },
    letterHeader: {
        fontSize: sizes.scale(sizes.fontTitle),
        fontWeight: 'bold',
        color: appTheme.navy,
        marginBottom: sizes.spacing,
        paddingLeft: sizes.spacing,
    },
    wordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        gap: sizes.spacing,
    },
    wordCard: {
        backgroundColor: '#f0f0f0',
        padding: sizes.spacingMedium,
        borderRadius: sizes.radiusMedium,
        marginBottom: sizes.spacing,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: sizes.scale(3.84),
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedCard: {
        backgroundColor: appTheme.orange,
        transform: [{ scale: 1.05 }],
    },
    wordText: {
        fontSize: sizes.scale(sizes.fontBody),
        color: appTheme.navy,
        textAlign: 'center',
    },
});
       