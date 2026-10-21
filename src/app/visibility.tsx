import { Newsreader_400Regular, useFonts } from '@expo-google-fonts/newsreader';
import {
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Visibility = 'private' | 'selected-person' | 'group';

const COLORS = {
  bg: '#FAF7F0',
  bark: '#1F1E1B',
  muted: '#7A766F',
  forest: '#2F3C30',
  button: '#3D4D3D',
  card: '#F3EFE6',
  cardBorder: '#E7E2D5',
  cardActive: '#ECE8DC',
  cardActiveBorder: '#8C9482',
  badge: '#E8E2D3',
  badgeActive: '#DFD9CA',
  divider: '#E5E0D2',
  radioBorder: '#D6D3D1',
  icon: '#44403C',
};

const AVATAR_ME =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDdOtF6XrjIsHsZHS6dwYKXGdfIP_ktN0c69P5DuF-kTrDRQZ09PmufmN0liGxV2BsfBQxmCZMUds4kjLZqpkPOswfItYzUUrWLYoAOHgWOT9aSuy5-XyutkW1tPsTFbJrWL__apQR8Qkz6uXzLAkceR2f0rm5zBSJr-3XCET76acrbfIPLwUZR_-KPECWxWnNgJxnHKwyNwCpilc6xlYRVRR9MexDgvU7NNMUKf01u';
const AVATAR_MAJA =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAsvdUIKKc1R_J5Crt7bnlP76-gecsyc5GkfajlLmZHxrVAEmp_eh5REuOWdXfH-zARn6cIY6_W-ixfAxyHpJqBKgLPIrjKbYh8INVGreNwzcXUQ1omW2_6sSBKZ2cECYuE5MkOlwkB-v5aaAQnTcRtwc0P0tiziNOsHHeAee1Ip0LwNP3yEYCkRRLx3mYm8Ah8iK1iyVU9NdibulIlRg2D8JZtc_OFTuqqkATWf631';

const FONT = {
  serif: 'Newsreader_400Regular',
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
};

function Radio({ checked }: { checked: boolean }) {
  return (
    <View
      style={[
        styles.radio,
        { borderColor: checked ? COLORS.forest : COLORS.radioBorder },
      ]}
    >
      {checked && <View style={styles.radioDot} />}
    </View>
  );
}

export default function VisibilityScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<Visibility>('selected-person');

  const [fontsLoaded] = useFonts({
    Newsreader_400Regular,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  if (!fontsLoaded) return null;

  const confirmNote =
    selected === 'private'
      ? 'To wspomnienie zobaczysz tylko Ty.'
      : selected === 'selected-person'
      ? 'To wspomnienie zobaczycie tylko Ty i Misia.'
      : 'To wspomnienie zobaczą wszyscy z grupy „Nasza paczka”.';

  const handleConfirm = () => {
    // TODO: zapis widoczności + nawigacja (zajmiemy się później)
    console.log('Widoczność:', selected);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
            accessibilityLabel="Wróć"
            style={styles.headerSide}
          >
            <Feather name="arrow-left" size={20} color={COLORS.bark} />
          </Pressable>
          <Text style={styles.headerTitle}>Widoczność wspomnienia</Text>
          <View style={styles.headerSide} />
        </View>

        {/* Headings */}
        <View style={styles.headings}>
          <Text style={styles.title}>Nie każda chwila{'\n'}jest dla wszystkich.</Text>
          <Text style={styles.subtitle}>
            Zdecyduj, komu chcesz powierzyć to wspomnienie.
          </Text>
        </View>

        {/* Options */}
        <View style={styles.options}>
          {/* Tylko ja */}
          <Pressable
            onPress={() => setSelected('private')}
            style={[styles.card, selected === 'private' && styles.cardActive]}
          >
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <View
                  style={[
                    styles.iconBadge,
                    selected === 'private' && styles.iconBadgeActive,
                  ]}
                >
                  <Feather name="lock" size={20} color={COLORS.icon} />
                </View>
                <View style={styles.flex}>
                  <Text style={styles.optionTitle}>Tylko ja</Text>
                  <Text style={styles.optionDesc}>
                    Prywatna kartka w Twoim pamiętniku.
                  </Text>
                </View>
              </View>
              <Radio checked={selected === 'private'} />
            </View>
          </Pressable>

          {/* Ja i wybrana osoba */}
          <Pressable
            onPress={() => setSelected('selected-person')}
            style={[
              styles.card,
              selected === 'selected-person' && styles.cardActive,
            ]}
          >
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <View
                  style={[
                    styles.iconBadge,
                    selected === 'selected-person' && styles.iconBadgeActive,
                  ]}
                >
                  <Feather name="users" size={20} color={COLORS.icon} />
                </View>
                <View style={styles.flex}>
                  <Text style={styles.optionTitle}>Ja i wybrana osoba</Text>
                  <Text style={styles.optionDesc}>Wasza chwila. Nikt poza Wami.</Text>
                  <View style={styles.avatarRow}>
                    <View style={styles.avatars}>
                      <Image source={{ uri: AVATAR_ME }} style={styles.avatar} />
                      <Image
                        source={{ uri: AVATAR_MAJA }}
                        style={[styles.avatar, styles.avatarOverlap]}
                      />
                    </View>
                    <Text style={styles.avatarLabel}>Ty i Weronisia Misia
                    </Text>
                  </View>
                </View>
              </View>
              <Radio checked={selected === 'selected-person'} />
            </View>
          </Pressable>

          {/* Grupa znajomych */}
          <Pressable
            onPress={() => setSelected('group')}
            style={[styles.card, selected === 'group' && styles.cardActive]}
          >
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <View
                  style={[
                    styles.iconBadge,
                    selected === 'group' && styles.iconBadgeActive,
                  ]}
                >
                  <Feather name="user-plus" size={20} color={COLORS.icon} />
                </View>
                <View style={styles.flex}>
                  <Text style={styles.optionTitle}>Grupa znajomych</Text>
                  <Text style={styles.optionDesc}>
                    Dla wszystkich w wybranej grupie.
                  </Text>
                </View>
              </View>
              <Radio checked={selected === 'group'} />
            </View>

            <View style={styles.groupInfo}>
              <View style={styles.flex}>
                <Text style={styles.groupName}>
                  Nasza paczka <Text style={styles.groupDot}>•</Text>{' '}
                  <Text style={styles.groupCount}>6 osób</Text>
                </Text>
                <Text style={styles.groupMembers}>
                  Ty, Misia, Kuba, Ziomek, Ola i Tomek
                </Text>
              </View>
              <Feather name="chevron-right" size={16} color="#A8A29E" />
            </View>
          </Pressable>
        </View>

        {/* Privacy notice */}
        <View style={styles.notice}>
          <Feather
            name="shield"
            size={16}
            color="#8A8477"
            style={styles.noticeIcon}
          />
          <Text style={styles.noticeText}>
            Wspomnienia nie trafiają do całego internetu. „Grupa” oznacza tylko
            wskazanych znajomych.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.footer}>
        <Text style={styles.confirmNote}>{confirmNote}</Text>
        <Pressable
          onPress={handleConfirm}
          style={({ pressed }) => [
            styles.button,
            pressed && { transform: [{ scale: 0.99 }], backgroundColor: '#344234' },
          ]}
        >
          <Text style={styles.buttonText}>Zatwierdź widoczność</Text>
          <Feather name="check" size={16} color={COLORS.bg} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: COLORS.bg },
  scrollContent: { paddingBottom: 16 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerSide: { width: 20, height: 20 },
  headerTitle: {
    fontFamily: FONT.semibold,
    fontSize: 14,
    color: COLORS.bark,
    letterSpacing: -0.2,
  },

  // Headings
  headings: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 20 },
  title: {
    fontFamily: FONT.serif,
    fontSize: 31,
    lineHeight: 37,
    letterSpacing: -0.5,
    color: COLORS.bark,
  },
  subtitle: {
    fontFamily: FONT.regular,
    fontSize: 13.5,
    lineHeight: 21,
    color: COLORS.muted,
    marginTop: 10,
  },

  // Options
  options: { paddingHorizontal: 24, gap: 12 },
  card: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 16,
    padding: 16,
  },
  cardActive: {
    backgroundColor: COLORS.cardActive,
    borderWidth: 2,
    borderColor: COLORS.cardActiveBorder,
    padding: 15, // kompensacja grubszej ramki
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 8,
    gap: 14,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.badge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBadgeActive: { backgroundColor: COLORS.badgeActive },
  optionTitle: {
    fontFamily: FONT.semibold,
    fontSize: 15,
    color: COLORS.bark,
  },
  optionDesc: {
    fontFamily: FONT.regular,
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.muted,
    marginTop: 2,
  },

  // Radio
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.forest,
  },

  // Avatars
  avatarRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 8 },
  avatars: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDFCF7',
  },
  avatarOverlap: { marginLeft: -6 },
  avatarLabel: {
    fontFamily: FONT.medium,
    fontSize: 12,
    color: COLORS.bark,
  },

  // Group sub-info
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  groupName: {
    fontFamily: FONT.semibold,
    fontSize: 12.5,
    color: COLORS.bark,
  },
  groupDot: { color: COLORS.muted },
  groupCount: { fontFamily: FONT.regular, color: COLORS.muted },
  groupMembers: {
    fontFamily: FONT.regular,
    fontSize: 11.5,
    color: COLORS.muted,
    marginTop: 2,
  },

  // Notice
  notice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    marginTop: 20,
    gap: 10,
  },
  noticeIcon: { marginTop: 2 },
  noticeText: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: 12,
    lineHeight: 19,
    color: '#757065',
  },

  // Footer
  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: COLORS.bg,
  },
  confirmNote: {
    fontFamily: FONT.regular,
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.muted,
    marginBottom: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.button,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 999,
  },
  buttonText: {
    fontFamily: FONT.medium,
    fontSize: 15,
    color: COLORS.bg,
  },
});
