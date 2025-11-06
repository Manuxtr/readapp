import { Audio } from 'expo-av'
import { useEffect, useMemo, useRef, useState } from "react"
import { Animated, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { LetterItems } from "../../components/myletters"
import { appTheme } from '../../utilities/theme.colors'

// Responsive sizing utilities

const GRID_ITEMS_PER_ROW = 4 // Adjust this to control how many items per row

const getResponsiveSizes = (screenWidth) => {
    const gridPadding = screenWidth * 0.09 // 4% of screen width
    const gridGap = screenWidth * 0.04 // 1% of screen width
    const availableWidth = screenWidth - (gridPadding * 2)
    const itemWidth = (availableWidth - (gridGap * (GRID_ITEMS_PER_ROW - 1))) / GRID_ITEMS_PER_ROW
    
    return {
        gridPadding,
        gridGap,
        itemSize: itemWidth,
        fontSize: Math.min(itemWidth * 0.6, 40), // Cap font size at 40
        imageSize: itemWidth * 0.8,
        borderWidth: Math.max(screenWidth * 0.006, 3), // Min 2px border
    }
}

export default function Alphabets() {
    const { width: screenWidth } = useWindowDimensions()
    const responsiveSizes = useMemo(() => getResponsiveSizes(screenWidth), [screenWidth])
    
    // per-item image toggles: tap once to show image, tap again to show letter
    const [imageToggles, setImageToggles] = useState({})
    // keep a selectedIndex to drive the image scale animation and border highlight
    const [selectedIndex, setSelectedIndex] = useState(null)
    const toggleIndex = (i) => {
        setImageToggles(prev => {
            const turningOn = !prev[i]
            const next = { ...prev, [i]: turningOn }

            // control animation / selection explicitly
            if (turningOn) {
                // select this index and animate image in
                setSelectedIndex(i)
                Animated.spring(imageScale, { toValue: 1, useNativeDriver: true, friction: 6 }).start()
            } else {
                // deselect and reset animation immediately so letter shows
                setSelectedIndex(null)
                // set to 0 without animation to avoid a blank intermediate state
                imageScale.setValue(0)
            }

            return next
        })
    }

    // animated scale for letter images
    const imageScale = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (selectedIndex !== null && LetterItems[selectedIndex] && LetterItems[selectedIndex].image) {
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
    const styles = useMemo(() => getStyles(responsiveSizes), [responsiveSizes])

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style = {styles.header}>ALPHABETS</Text>
                </View>
                <View style={styles.grid}>
                    {LetterItems.map(({ letter, image }, index) => (
                        <TouchableOpacity 
                            key={index}
                            style={[styles.letterBox, selectedIndex === index && styles.selectedBox]}
                            onPress={() => { toggleIndex(index); playPop() }}
                        >
                            {image && imageToggles[index] ? (
                                // show image when this item is toggled on
                                <Animated.Image
                                    source={image}
                                    style={[
                                        styles.letterImage,
                                        selectedIndex === index
                                            ? { transform: [{ scale: imageScale }], opacity: imageScale }
                                            : { opacity: 1 }
                                    ]}
                                    resizeMode="contain"
                                />
                            ) : (
                                // otherwise show the letter
                                <Text style={styles.letter}>{letter}</Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const getStyles = (sizes) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appTheme.navy,
        
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: sizes.gridPadding,
        gap: sizes.gridGap,
    
        
    },
    letterBox: {
        width: sizes.itemSize,
        height: sizes.itemSize,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: sizes.itemSize / 2,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    letter: {
        fontSize: sizes.fontSize,
        fontWeight: 'bold',
        color: '#333',
    },
    selectedBox: {
        borderWidth: sizes.borderWidth,
        borderColor: appTheme.orange,
    },
    letterImage: {
        width: sizes.imageSize,
        height: sizes.imageSize,
    },
  header: { textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
        marginVertical: 8,
        color:appTheme.orange,
        letterSpacing:4.4,
     }
})