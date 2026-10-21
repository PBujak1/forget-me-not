
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const COLORS = {
  bg: '#fcfaf6',
  surface: '#fbf7f0',
  surfaceAlt: '#f3eee3',
  olive: '#414e3d',
  oliveHover: '#333e31',
  border: '#e8dfcf',
  text: '#222320',
  muted: '#71736b',
  soft: '#9a9d94',
};

const INITIAL_MEMORY =
  'Pierwszy chłodny dzień tej jesieni. {osoba}, pamiętasz herbatę z termosu nad Wisłą? Niby zwykły spacer, a mogłabym do niego wracać bez końca.';

const PHOTO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBA-38OjyCM-8OJwqpFlFdakrh3hUtmvTgeTSrbt1dLo53YaowNCanY0SQHw_Tn68R6XNH7X21yI5XTEbQ7rLbhLJXYqytbXS1HTyzlm7MgNSeg6C8xw7wRHLYRMhGFzb6a-dtC4SgAazW1sV8dbieQeD4u74Pf60HSP-QhTk6M3zF2zmfGeB3mhmywMxKEkFbwk8SJklUgWcYNjitvSu0w_nN54uPVotuATzByxlt6F-OXR9tOMYbskw';

export default function HomeScreen() {
  const [memory, setMemory] = useState(INITIAL_MEMORY);
  const [photoVisible, setPhotoVisible] = useState(true);
  const [isPrivate, setIsPrivate] = useState(true);

  function saveMemory() {
    if (!memory.trim()) {
      Alert.alert('Brak wspomnienia', 'Najpierw wpisz treść wspomnienia.');
      return;
    }

    Alert.alert(
      'Wspomnienie gotowe',
      'Interfejs działa poprawnie. Zapis do bazy dodamy później.',
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      {/* Nagłówek */}
      <View style={styles.header}>

        <View style={styles.navigation}>
        <Pressable
          accessibilityLabel="Wróć do ekranu głównego"
          onPress={() => router.back()}
          hitSlop={10}
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>

          <Text style={styles.navTitle}>Nowe wspomnienie</Text>

          <Pressable
            onPress={() => {
              setMemory('');
              setPhotoVisible(false);
            }}
            hitSlop={10}
          >
            <Text style={styles.cancel}>Anuluj</Text>
          </Pressable>
        </View>
      </View>

      {/* Główna zawartość */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headline}>Zatrzymaj ten moment.</Text>

        {/* Osoba i data */}
        <Pressable
          style={styles.personRow}
          onPress={() =>
            Alert.alert(
              'Kontekst wspomnienia',
              'Później dodamy wybór osoby i daty.',
            )
          }
        >
          <Image
            source={{ uri: PHOTO_URL }}
            style={styles.avatar}
          />

          <View style={styles.personInfo}>
            <Text style={styles.personName}>Z ...</Text>
            <Text style={styles.date}>Dziś, 15 października</Text>
          </View>

          <Text style={styles.chevron}>⌄</Text>
        </Pressable>

        {/* Pole tekstowe */}
        <View style={styles.memoryCard}>
          <Text style={styles.label}>TWOJE WSPOMNIENIE</Text>

          <TextInput
            value={memory}
            onChangeText={(value) => setMemory(value.slice(0, 2000))}
            placeholder="Napisz, co pamiętasz z tego dnia..."
            placeholderTextColor={COLORS.soft}
            multiline
            textAlignVertical="top"
            maxLength={2000}
            style={styles.memoryInput}
          />

          <Text style={styles.counter}>
            {memory.length} / 2000
          </Text>
        </View>

        {/* Zdjęcie */}
        <View style={styles.photoSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.photoTitleRow}>
              <Text style={styles.sectionTitle}>Zdjęcie</Text>
              <Text style={styles.optional}>• opcjonalnie</Text>
            </View>

            <Pressable
              onPress={() =>
                Alert.alert(
                  'Zdjęcie',
                  'Wybór zdjęcia z galerii dodamy później.',
                )
              }
            >
              <Text style={styles.changePhoto}>▧  Zmień</Text>
            </Pressable>
          </View>

          {photoVisible && (
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: PHOTO_URL }}
                style={styles.photo}
                resizeMode="cover"
              />

              <Pressable
                style={styles.removePhoto}
                onPress={() => setPhotoVisible(false)}
                accessibilityLabel="Usuń zdjęcie"
              >
                <Text style={styles.removePhotoText}>×</Text>
              </Pressable>
            </View>
          )}

          <Text style={styles.hint}>
            Możesz też zachować tylko słowa.
          </Text>
        </View>

        {/* Prywatność */}
        <Pressable
          style={styles.visibilityCard}
          onPress={() => setIsPrivate((previous) => !previous)}
        >
          <View style={styles.audienceIcon}>
            <Text style={styles.audienceIconText}>♧</Text>
          </View>

          <View style={styles.visibilityInfo}>
            <Text style={styles.labelSmall}>
              KTO ZOBACZY WSPOMNIENIE
            </Text>
            <Text style={styles.visibilityTitle}>
              {isPrivate ? 'Tylko Ty i {osoba}' : 'Wszyscy uprawnieni'}
            </Text>
            <Text style={styles.visibilityTitle}>
              <Pressable
                onPress={() => router.push('/visibility')}
              >
                <Text style={styles.changePhoto}>▧  Zmień</Text>
              </Pressable>
            </Text>
          </View>

          <Text style={styles.chevronRight}>›</Text>
        </Pressable>
      </ScrollView>

      {/* Dolny przycisk */}
      <View style={styles.footer}>
        <Text style={styles.footerNote}>
          ... zobaczy je po zapisaniu.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.saveButtonPressed,
          ]}
          onPress={saveMemory}
        >
          <Text style={styles.saveButtonText}>
            Zapisz wspomnienie
          </Text>
          <Text style={styles.saveArrow}>→</Text>
        </Pressable>

        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },

  statusIcons: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.text,
  },

  navigation: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backIcon: {
    fontSize: 32,
    lineHeight: 36,
    color: COLORS.text,
  },

  navTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },

  cancel: {
    fontSize: 13,
    color: COLORS.muted,
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 22,
  },

  headline: {
    fontFamily: 'Georgia',
    fontSize: 32,
    lineHeight: 39,
    fontWeight: '400',
    letterSpacing: -0.7,
    color: COLORS.text,
    marginBottom: -4,
  },

  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#eae4d5',
  },

  personInfo: {
    flex: 1,
    marginLeft: 12,
  },

  personName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },

  date: {
    fontSize: 11,
    marginTop: 4,
    color: COLORS.muted,
  },

  chevron: {
    fontSize: 23,
    color: COLORS.muted,
    paddingHorizontal: 4,
  },

  memoryCard: {
    minHeight: 180,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },

  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.1,
    color: COLORS.soft,
    marginBottom: 12,
  },

  memoryInput: {
    minHeight: 95,
    padding: 0,
    fontSize: 13,
    lineHeight: 22,
    color: COLORS.text,
  },

  counter: {
    marginTop: 10,
    textAlign: 'right',
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.soft,
  },

  photoSection: {
    gap: 10,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  photoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },

  optional: {
    fontSize: 11,
    color: COLORS.soft,
  },

  changePhoto: {
    fontSize: 11,
    color: COLORS.muted,
  },

  photoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#eae4d5',
  },

  photo: {
    width: '100%',
    height: '100%',
  },

  removePhoto: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  removePhotoText: {
    color: '#ffffff',
    fontSize: 22,
    lineHeight: 25,
  },

  hint: {
    fontSize: 10,
    color: COLORS.soft,
  },

  visibilityCard: {
    minHeight: 72,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5ddcd',
    backgroundColor: COLORS.surfaceAlt,
  },

  audienceIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  audienceIconText: {
    fontSize: 23,
    color: COLORS.text,
  },

  visibilityInfo: {
    flex: 1,
    marginLeft: 12,
  },

  labelSmall: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.7,
    color: COLORS.soft,
  },

  visibilityTitle: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },

  chevronRight: {
    fontSize: 25,
    color: COLORS.muted,
    paddingHorizontal: 4,
  },

  footer: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 8,
    backgroundColor: COLORS.bg,
  },

  footerNote: {
    fontSize: 10,
    color: COLORS.soft,
    textAlign: 'center',
    marginBottom: 14,
  },

  saveButton: {
    minHeight: 52,
    paddingHorizontal: 22,
    borderRadius: 28,
    backgroundColor: COLORS.olive,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButtonPressed: {
    backgroundColor: COLORS.oliveHover,
    opacity: 0.9,
  },

  saveButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },

  saveArrow: {
    marginLeft: 10,
    fontSize: 19,
    color: '#ffffff',
  },

  homeIndicator: {
    alignSelf: 'center',
    marginTop: 17,
    marginBottom: 3,
    width: 110,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#292a27',
  },
});
