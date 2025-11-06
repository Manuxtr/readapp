import { Audio } from 'expo-av'
import { useEffect, useMemo, useRef, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View ,ScrollView } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { MyNumbers } from "../../components/mynumbers"
import { appTheme } from "../../utilities/theme.colors"


const GRID_ITEMS_PER_ROW = 5

const getResponsiveSizes = (screenWidth) => {
  const gridPadding = screenWidth * 0.06
  const gridGap = screenWidth * 0.02
  const availableWidth = screenWidth - (gridPadding * 2)
  const itemWidth = (availableWidth - (gridGap * (GRID_ITEMS_PER_ROW - 1))) / GRID_ITEMS_PER_ROW
  return {
    gridPadding,
    gridGap,
    itemSize: itemWidth,
    fontSize: Math.min(itemWidth * 0.5, 36),
    borderWidth: Math.max(screenWidth * 0.005, 4),
  }
}

export default function Mynumbers() {
  const { width: screenWidth } = useWindowDimensions()
  const sizes = useMemo(() => getResponsiveSizes(screenWidth), [screenWidth])
  const styles = useMemo(() => getStyles(sizes), [sizes])

  const [selected, setSelected] = useState(null)
  
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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.header}>NUMBERS</Text>
        </View>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {MyNumbers.map((n, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.box, selected === idx && styles.selectedBox]}
                onPress={() => { setSelected(prev => prev === idx ? null : idx); playPop() }}
              >
                <Text style={styles.number}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const getStyles = (sizes) => StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: appTheme.navy 
  },
  header: { 
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 8,
    color: appTheme.orange,
    letterSpacing: 4.4
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: sizes.gridPadding
  },
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    padding: sizes.gridPadding, 
    gap: sizes.gridGap,
  },
  box: {
    width: sizes.itemSize,
    height: sizes.itemSize,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: sizes.itemSize / 2,
  },
  number: { fontSize: sizes.fontSize, fontWeight: '700', color: '#111' },
  selectedBox: { borderWidth: sizes.borderWidth, borderColor: appTheme.orange },
})