import { Audio } from 'expo-av'
import { useEffect, useMemo, useRef, useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { BasicSentences } from "../../components/mysentences"
import { appTheme } from "../../utilities/theme.colors"

// Responsive sizing utility
const getResponsiveSizes = (screenWidth) => {
    return {
        padding: screenWidth * 0.05,
        fontSize: Math.min(screenWidth * 0.045, 18),
        cardRadius: 15,
        spacing: screenWidth * 0.03,
    }
}

export default function Mysentence() {
    const { width: screenWidth } = useWindowDimensions()
    const sizes = useMemo(() => getResponsiveSizes(screenWidth), [screenWidth])
    const styles = useMemo(() => getStyles(sizes), [sizes])
    
    // allow multiple sentences to be selected at once (toggle per-letter)
    const [selectedMap, setSelectedMap] = useState({})

    // Sound setup
    const soundRef = useRef(null)
    useEffect(() => {
        let mounted = true
        ;(async () => {
            try {
                const { sound } = await Audio.Sound.createAsync(require('../sounds/pop.mp3'))
                if (mounted) soundRef.current = sound
            } catch (e) {
                console.log('Error loading sound', e)
            }
        })()
        return () => {
            mounted = false
            if (soundRef.current) {
                soundRef.current.unloadAsync().catch(() => {})
            }
        }
    }, [])

    const playPop = async () => {
        try {
            if (!soundRef.current) return
            await soundRef.current.setPositionAsync(0)
            await soundRef.current.playAsync()
        } catch (e) {
            console.log('Error playing sound', e)
        }
    }

    // Animation when selecting a sentence
    const handleSentencePress = (id) => {
        setSelectedMap(prev => ({ ...prev, [id]: !prev[id] }))
        playPop()
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.header}>LEARN SENTENCES</Text>
                </View>
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {Object.entries(BasicSentences).map(([letter, sentence]) => (
                        <View
                            key={letter}
                            style={[
                                styles.card,
                                selectedMap[letter] && styles.selectedCard,
                            ]}
                        >
                            <TouchableOpacity
                                style={styles.cardContent}
                                onPress={() => handleSentencePress(letter)}
                            >
                                <Text style={styles.letterText}>{letter}</Text>
                                <Text style={[
                                    styles.sentenceText,
                                    selectedMap[letter] && styles.selectedSentenceText
                                ]}>{sentence}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const getStyles = (sizes) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appTheme.navy,
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        color: appTheme.orange,
        textAlign: 'center',
        marginVertical: sizes.spacing,
        letterSpacing: 4
    },
    scrollContent: {
        padding: sizes.padding,
        gap: sizes.spacing
    },
    card: {
        backgroundColor: '#f8f9fa',
        borderRadius: sizes.cardRadius,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4
    },
    selectedCard: {
        borderWidth: 2,
        borderColor: appTheme.orange
    },
    cardContent: {
        padding: sizes.padding,
    },
    letterText: {
        fontSize: sizes.fontSize * 1.5,
        fontWeight: 'bold',
        color: appTheme.navy,
        marginBottom: sizes.spacing
    },
    sentenceText: {
        fontSize: sizes.fontSize * 1.2,
        color: '#2c3e50',
        lineHeight: sizes.fontSize * 1.8
    },
    selectedSentenceText: {
        color: appTheme.orange,
        fontWeight: '600'
    }
})