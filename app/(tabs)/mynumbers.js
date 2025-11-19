import { Audio } from 'expo-av'
import { useEffect, useMemo, useRef, useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
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
  // preload known sounds and keep references to avoid reload lag
  const soundsRef = useRef({})
  // sound files mapping (moved to component scope so play function can access)
  const files = {
    pop: require('../sounds/pop.mp3'),
    one: require("../sounds/one.mp3"),
    two: require("../sounds/two.mp3"),
    three: require('../sounds/three.mp3'),
    four: require('../sounds/four.mp3'),
    five: require('../sounds/five.mp3'),
    six: require('../sounds/six.mp3'),
    seven: require('../sounds/seven.mp3'),
    eight: require('../sounds/eight.mp3'),
    nine: require('../sounds/nine.mp3'),
    ten: require('../sounds/ten.mp3'),
    eleven: require('../sounds/eleven.mp3'),
    twelve: require('../sounds/twelve.mp3'),
    thirteen: require('../sounds/thirteen.mp3'),
    fourteen: require('../sounds/fourteen.mp3'),
    fifteen: require('../sounds/fifteen.mp3'),
    sixteen: require('../sounds/sixteen.mp3'),
    seventeen: require('../sounds/seventeen.mp3'),
    eighteen:require("../sounds/eighteen.mp3"),
    nineteen: require("../sounds/nineteen.mp3"),
    tweenty: require("../sounds/tweenty.mp3"),
    tweentyone: require("../sounds/tweentyone.mp3"),
    tweentytwo: require("../sounds/tweentytwo.mp3"),
    tweentythree: require("../sounds/tweentythree.mp3"),
    tweentyfour: require("../sounds/tweentyfour.mp3"),
    tweentyfive: require("../sounds/tweentyfive.mp3"),
    tweentysix: require("../sounds/tweentysix.mp3"),
    tweentyseven: require("../sounds/tweentyseven.mp3"),
    tweentyeight: require("../sounds/tweentyeight.mp3"),
    tweentynine: require("../sounds/tweentynine.mp3"),
    thirty: require("../sounds/thirty.mp3"),
    thirtyone:require("../sounds/thirtyone.mp3"),
    thirtytwo: require("../sounds/thirtytwo.mp3"),
    thirtythree: require("../sounds/thirtythree.mp3"),
    thirtyfour: require("../sounds/thirtyfour.mp3"),
    thirtyfive: require("../sounds/thirtyfive.mp3"),
    thirtysix: require("../sounds/thirtysix.mp3"),
    thirtyseven: require("../sounds/thirtyseven.mp3"),
    thirtyeight: require("../sounds/thirtyeight.mp3"),
    thirtynine: require("../sounds/thirtynine.mp3"),
    fourty: require("../sounds/fourty.mp3"),
    fourtyone: require("../sounds/fourtyone.mp3"),
    fourtytwo: require("../sounds/fourtytwo.mp3"),
    fourtythree: require("../sounds/fourtythree.mp3"),
    fourtfour: require("../sounds/fourtyfour.mp3"),
    fourtyfive: require("../sounds/fourtyfive.mp3"),
    fourtysix: require("../sounds/fourtysix.mp3"),
    fourtyseven: require("../sounds/fourtyseven.mp3"),
    fourtyeight: require("../sounds/fourtyeight.mp3"),
    fourtynine: require("../sounds/fourtynine.mp3"),
    fivty: require("../sounds/fivty.mp3"),
  }

  useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        const entries = Object.entries(files)
        for (const [key, module] of entries) {
          try {
            const { sound } = await Audio.Sound.createAsync(module)
            if (!mounted) {
              await sound.unloadAsync().catch(() => {})
              continue
            }
            soundsRef.current[key] = sound
            console.log(`[mynumbers] preloaded sound: ${key}`)
          } catch (innerErr) {
            console.log(`[mynumbers] Error loading sound ${key}`, innerErr)
          }
        }
      } catch (e) {
        console.log('[mynumbers] Error loading sounds', e)
      }
    })()

    return () => {
      mounted = false
      const map = soundsRef.current || {}
      Object.values(map).forEach((s) => {
        if (s && typeof s.unloadAsync === 'function') {
          s.unloadAsync().catch(() => {})
        }
      })
    }
  }, [])

  const playSoundForNumber = async (num) => {
    try {
      // mapping: use name for audio files that exist, fallback to 'pop'
      const mapping = {
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        10: 'ten',
        11: 'eleven',
        12:  'twelve',
        13: 'thirteen',
        14: 'fourteen',
        15: 'fifteen',
        16: 'sixteen',
        17: 'seventeen',
        18: 'eighteen',
        19: 'nineteen',
        20: 'tweenty',
        21: 'tweentyone',
        22: 'tweentytwo',
        23: 'tweentythree',
        24: 'tweentyfour',
        25: 'tweentyfive',
        26: 'tweentysix',
        27: 'tweentyseven',
        28: 'tweentyeight',
        29: 'tweentynine',
        30: 'thirty',
        31: 'thirtyone',
        32: 'thirtytwo',
        33: 'thirtythree',
        34: 'thirtyfour',
        35: 'thirtyfive',
        36: 'thirtysix',
        37: 'thirtyseven',
        38: 'thirtyeight',
        39: 'thirtynine',
        40: 'fourty',
        41: 'fourtyone',
        42: 'fourtytwo',
        43: 'fourtythree',
        44: 'fourtfour',
        45: 'fourtyfive',
        46: 'fourtysix',
        47: 'fourtyseven',
        48: 'fourtyeight',
        49: 'fourtynine',
        50: 'fivty'
      }

      const key = mapping[num] || 'pop'
      let sound = soundsRef.current && soundsRef.current[key]

      if (!sound) {
        console.log(`[mynumbers] no sound loaded for key=${key}, falling back to pop`)
        sound = soundsRef.current && soundsRef.current['pop']
        // if pop isn't loaded, try to load it now
        if (!sound && files['pop']) {
          try {
            const res = await Audio.Sound.createAsync(files['pop'])
            soundsRef.current['pop'] = res.sound
            sound = res.sound
            console.log('[mynumbers] lazily loaded pop fallback')
          } catch (e) {
            console.log('[mynumbers] failed to load pop fallback', e)
          }
        }
      }

      if (!sound) {
        console.log(`[mynumbers] no sound available for num=${num}, aborting`)
        return
      }

      try {
        await sound.setPositionAsync(0)
        await sound.playAsync()
      } catch (playErr) {
        console.log(`[mynumbers] error playing sound for key=${key}`, playErr)

        const msg = (playErr && (playErr.message || playErr.toString())) || ''
        // If the player was unloaded or destroyed, recreate and retry once
        if (msg.toLowerCase().includes('player does not exist') || msg.toLowerCase().includes('player was disposed')) {
          console.log(`[mynumbers] detected disposed player for key=${key}, attempting recreate`)
          try {
            if (files[key]) {
              const res = await Audio.Sound.createAsync(files[key])
              soundsRef.current[key] = res.sound
              await res.sound.setPositionAsync(0)
              await res.sound.playAsync()
              return
            }
          } catch (reErr) {
            console.log(`[mynumbers] recreate+play failed for ${key}`, reErr)
          }

          // fallback to pop if recreate failed
          try {
            if (files.pop) {
              const res2 = await Audio.Sound.createAsync(files.pop)
              soundsRef.current.pop = res2.sound
              await res2.sound.setPositionAsync(0)
              await res2.sound.playAsync()
              return
            }
          } catch (popErr) {
            console.log('[mynumbers] fallback pop recreate failed', popErr)
          }
        }
      }
    } catch (e) {
      console.log('Error playing sound for number', num, e)
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
                onPress={() => { setSelected(prev => prev === idx ? null : idx); playSoundForNumber(n) }}
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