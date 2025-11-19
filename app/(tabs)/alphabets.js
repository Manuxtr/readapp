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
    
    // per-item flip toggles and per-item animated values
    const [imageToggles, setImageToggles] = useState({})
    const flipAnimsRef = useRef({})

    const getFlipAnim = (i) => {
        if (!flipAnimsRef.current[i]) flipAnimsRef.current[i] = new Animated.Value(0)
        return flipAnimsRef.current[i]
    }

    const toggleIndex = (i) => {
        setImageToggles(prev => {
            const turningOn = !prev[i]
            const next = { ...prev, [i]: turningOn }

            const anim = getFlipAnim(i)
            if (turningOn) {
                Animated.spring(anim, { toValue: 1, useNativeDriver: true, friction: 8 }).start()
            } else {
                Animated.timing(anim, { toValue: 0, duration: 280, useNativeDriver: true }).start()
            }

            return next
        })
    }

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
                            style={[styles.letterBox, imageToggles[index] && styles.selectedBox]}
                            onPress={() => { toggleIndex(index); playPop() }}
                        >
                            {(() => {
                                const anim = getFlipAnim(index)

                                const frontRotate = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] })
                                const backRotate = anim.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] })

                                return (
                                    <View style={styles.card}>
                                        {/* front face (letter) - rotate from 0 to 180 */}
                                        <Animated.View style={[styles.cardFace, styles.cardFront, { transform: [{ perspective: 1000 }, { rotateY: frontRotate }] }]}>
                                            <Text style={styles.letter}>{letter}</Text>
                                        </Animated.View>

                                        {/* back face (image) - rotate from 180 to 360 so it becomes visible when card flips */}
                                        {image ? (
                                            <Animated.View style={[styles.cardFace, styles.cardBack, { transform: [{ perspective: 1000 }, { rotateY: backRotate }] }]} pointerEvents="none">
                                                <Animated.Image source={image} style={styles.letterImage} resizeMode="contain" />
                                            </Animated.View>
                                        ) : null}
                                    </View>
                                )
                            })()}
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
        // backgroundColor: '#f0f0f0',
        // borderRadius: sizes.itemSize / 2,
        // overflow: 'hidden',
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
        borderRadius: sizes.itemSize / 2,
        
    },
    letterImage: {
        width: sizes.imageSize,
        height: sizes.imageSize,
    },
    card: {
        width: sizes.itemSize,
        height: sizes.itemSize,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderRadius: sizes.itemSize / 2,
        overflow: 'hidden',

    },
    cardFace: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backfaceVisibility: 'hidden',
        backgroundColor: '#f0f0f0',
        borderRadius: sizes.itemSize / 2,


    },
    cardFront: {
        // front face (optional styles)
    },
    cardBack: {
        // back face (optional styles)
    },
  header: { textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
        marginVertical: 8,
        color:appTheme.orange,
        letterSpacing:4.4,
     }
})