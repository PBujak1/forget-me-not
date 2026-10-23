
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import {
    Alert,
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  background: '#fcfaf6',
  surface: '#f5f0e6',
  surfaceAlt: '#eae4d5',
  olive: '#414e3d',
  sage: '#8c9483',
  border: '#ebe4d8',
  text: '#222320',
  muted: '#71736b',
  soft: '#9a9d94',
  rose: '#c65e65',
};

const memoryPhoto =
  'https://lh3.googleusercontent.com/aida/AEtjO1XLX31HYBnhIXDAoXnYeaYvl9HlBmrHZtn2T341J5wGVI06a7zYhpbK8EXEISz1cE1U47L1C9t9T9J-ht9xHu6AQ6rzcbKEZZ1EuRkk_wp4SmgMM4QR1FbAP4FT_gNsznEMHzv0K4kZ8W_Pr_3v3EBNG2n1kcvJfC2inMVrNQ8ie9MHNownZAxASLd9VlsgjVW8EpmzsGqdBmIsxgENGbKECbXuUzwRLWbc_iuDHgj98XqVkNBDCCI0hCI';

const majaPhoto =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDtq5r56RS0Y50Yjksffnjnk32zs-ROhokMNlhdFVIUDu7qMx4V-RSJCksxih2STHZZhg5Vp-uKbcyZM4HhFcZSbmsdM7gADbFyXNtwqCweZBset-Lb34Hq4fk0vrtuM7mcRTQzKUN6HcejjQ22-sH438mdn9FAdS2LngZwGhn8STUgr5D70bkWAeirBa0R-rKrO3gtMQrW4kfBvL074OG9wgv2SC9d0Rw_B8bP9m82SY7t6h76Yhl6pw';

const people = [
  {
    name: 'Maja Kowalska',
    subtitle: 'Często dzielicie się chwilami',
    initial: 'M',
  },
  {
    name: 'Kuba Nowak',
    subtitle: 'Czas na wspólne wspomnienie',
    initial: 'K',
  },
  {
    name: 'Zosia Wiśniewska',
    subtitle: 'Może przypomnisz sobie coś miłego?',
    initial: 'Z',
  },
];

export default function MemoryPromptScreen() {
  const router = useRouter();

  const [liked, setLiked] = useState(false);
  const [personIndex, setPersonIndex] = useState(0);

  const person = people[personIndex];

  const today = new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  function goBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }

  function shufflePerson() {
    setPersonIndex((previous) => (previous + 1) % people.length);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
      />

      {/* Nagłówek */}
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Wróć"
          accessibilityRole="button"
          style={styles.headerButton}
          onPress={goBack}
        >
          <Ionicons name="arrow-back" size={23} color={COLORS.text} />
        </Pressable>

        <Text style={styles.headerTitle}>
          Chwila na wspomnienie
        </Text>

        <Pressable
          accessibilityLabel="Więcej opcji"
          accessibilityRole="button"
          style={styles.headerButton}
          onPress={() =>
            Alert.alert('Więcej opcji', 'Co chcesz zrobić?', [
              { text: 'Anuluj', style: 'cancel' },
              { text: 'Wylosuj inną osobę', onPress: shufflePerson },
            ])
          }
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={23}
            color={COLORS.muted}
          />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Data */}
        <View style={styles.datePill}>
          <Ionicons name="leaf" size={16} color={COLORS.olive} />
          <Text style={styles.dateText}>Dziś, {today}</Text>
        </View>

        {/* Zdjęcie wspomnienia */}
        <View style={styles.photoCard}>
          <ImageBackground
            source={{ uri: memoryPhoto }}
            style={styles.memoryImage}
            imageStyle={styles.memoryImageStyle}
          >
            <View style={styles.imageOverlay} />

            <Pressable
              accessibilityLabel={
                liked ? 'Usuń polubienie' : 'Polub to wspomnienie'
              }
              accessibilityRole="button"
              style={styles.favoriteButton}
              onPress={() => setLiked((previous) => !previous)}
            >
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={23}
                color={liked ? COLORS.rose : COLORS.text}
              />
            </Pressable>
          </ImageBackground>

          <View style={styles.photoFooter}>
            <View style={styles.photoCaption}>
              <View style={styles.smallDot} />
              <Text style={styles.captionText}>
                Zwykły dzień. Wasza historia.
              </Text>
            </View>

            <Text style={styles.locationText}>Kraków</Text>
          </View>
        </View>

        {/* Pytanie */}
        <View style={styles.questionSection}>
          <Text style={styles.headline}>
            Z czym kojarzy Ci się ten dzień z {person.name.split(' ')[0]}?
          </Text>

          <Text style={styles.description}>
            Chłodne powietrze, ciepła herbata, długa rozmowa...
            Czasem drobiazg wystarczy, żeby wrócić do siebie.
          </Text>
        </View>

        {/* Osoba */}
        <View style={styles.personCard}>
          <View style={styles.personInfo}>
            {personIndex === 0 ? (
              <Image
                source={{ uri: majaPhoto }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarInitial}>
                  {person.initial}
                </Text>
              </View>
            )}

            <View style={styles.personTextContainer}>
              <Text style={styles.personName}>{person.name}</Text>
              <Text style={styles.personSubtitle}>
                {person.subtitle}
              </Text>
            </View>
          </View>

          <Pressable
            accessibilityLabel="Wylosuj inną osobę"
            accessibilityRole="button"
            style={styles.shuffleButton}
            onPress={shufflePerson}
          >
            <Ionicons
              name="shuffle"
              size={20}
              color={COLORS.muted}
            />
          </Pressable>
        </View>

        {/* Podpowiedź */}
        <View style={styles.tip}>
          <Ionicons
            name="bulb-outline"
            size={19}
            color={COLORS.sage}
          />
          <Text style={styles.tipText}>
            To nie musi być rocznica. Liczy się to, co dzisiaj
            przyszło Ci do głowy.
          </Text>
        </View>

        {/* Przyciski */}
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/new-memory')}
          >
            <Text style={styles.primaryButtonText}>
              Dodaj wspomnienie
            </Text>
            <Ionicons name="add" size={22} color="#ffffff" />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            style={styles.secondaryButton}
            onPress={goBack}
          >
            <Text style={styles.secondaryButtonText}>
              Może później
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    letterSpacing: -0.3,
  },

  scrollView: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
  },

  datePill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    marginBottom: 18,
  },

  dateText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.olive,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },

  photoCard: {
    overflow: 'hidden',
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    marginBottom: 25,
  },

  memoryImage: {
    width: '100%',
    aspectRatio: 4 / 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },

  memoryImageStyle: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },

    imageOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(30, 35, 25, 0.04)',
    },

  favoriteButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(252, 250, 246, 0.92)',
    margin: 14,
  },

  photoFooter: {
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  photoCaption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 6,
  },

  smallDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.olive,
  },

  captionText: {
    flexShrink: 1,
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.muted,
  },

  locationText: {
    fontSize: 11,
    color: COLORS.soft,
  },

  questionSection: {
    marginBottom: 22,
  },

  headline: {
    fontFamily: 'serif',
    fontSize: 30,
    lineHeight: 37,
    letterSpacing: -0.7,
    color: COLORS.text,
    marginBottom: 10,
  },

  description: {
    fontSize: 14,
    lineHeight: 23,
    color: COLORS.muted,
  },

  personCard: {
    minHeight: 82,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  personInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginRight: 8,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  avatarFallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 2,
    borderColor: '#e0ddcf',
  },

  avatarInitial: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.olive,
  },

  personTextContainer: {
    flex: 1,
  },

  personName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },

  personSubtitle: {
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.muted,
  },

  shuffleButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceAlt,
  },

  tip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingHorizontal: 2,
    marginBottom: 20,
  },

  tipText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 19,
    color: COLORS.muted,
  },

  actions: {
    alignItems: 'center',
    gap: 10,
    marginTop: 2,
  },

  primaryButton: {
    width: '100%',
    minHeight: 56,
    borderRadius: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.olive,
  },

  primaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.2,
  },

  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },

  secondaryButton: {
    minHeight: 44,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButtonText: {
    fontSize: 13,
    color: COLORS.muted,
  },
});
