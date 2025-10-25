import { Audio } from 'expo-av'
import { useEffect, useRef, useState } from "react"
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { LetterItems } from "../../components/myletters"

export default function Alphabets() {
    // single-selection (toggle off by tapping again)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const toggleIndex = (i) => {
        setSelectedIndex(prev => prev === i ? null : i)
    }

    // animated scale for letter images
    const imageScale = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (selectedIndex !== null && LetterItems[selectedIndex].image) {
            Animated.spring(imageScale, { toValue: 1, useNativeDriver: true, friction: 6 })
                .start()
        } else {
            Animated.timing(imageScale, { toValue: 0, duration: 180, useNativeDriver: true }).start()
        }
    }, [selectedIndex, imageScale])

    // load pop sound once and keep a reference
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
    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.grid}>
                    {LetterItems.map(({ letter, image }, index) => (
                        <TouchableOpacity 
                            key={index}
                            style={[styles.letterBox, selectedIndex === index && styles.selectedBox]}
                            onPress={() => { toggleIndex(index); playPop() }}
                        >
                            {image && selectedIndex === index ? (
                                <Animated.Image
                                    source={image}
                                    style={[styles.letterImage, { transform: [{ scale: imageScale }], opacity: imageScale }]}
                                    resizeMode="contain"
                                />
                            ) : (
                                <Text style={styles.letter}>{letter}</Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 6,
        gap:4
    },
    letterBox: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 100,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    letter: {
        fontSize: 37,
        fontWeight: 'bold',
        color: '#333',
    }
    ,
    selectedBox: {
        borderWidth: 3,
        borderColor: 'red',
    }
    ,
    letterImage: {
        width: 56,
        height: 56,
    }
})