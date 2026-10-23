
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native';

const COLORS = {
  background: '#F7F4EE',
  card: '#EEEAE1',
  white: '#FFFFFF',
  text: '#262626',
  muted: '#88857D',
  green: '#384A3E',
  border: '#E4DED3',
  sand: '#EDE8DF',
};

const CONTACTS = [
  {
    id: 'maja',
    name: 'Maja Kowalska',
    description: 'Najwięcej wspólnych chwil',
    initial: 'M',
    color: '#D9E3D7',
  },
  {
    id: 'kuba',
    name: 'Kuba Nowak',
    description: 'Często wymieniacie zdjęcia',
    initial: 'K',
    color: '#E7DCCB',
  },
  {
    id: 'zosia',
    name: 'Zosia Wiśniewska',
    description: 'Lubicie swoje wspomnienia',
    initial: 'Z',
    color: '#E9D8D7',
  },
];

const FREQUENCIES = [
  'Raz w tyg.',
  '2–3 razy w tyg.',
  'Codziennie',
  'Losowo'
];

export default function RemindersScreen() {
  const router = useRouter();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [frequency, setFrequency] = useState('2–3 razy w tyg.');
  const [closeContactsEnabled, setCloseContactsEnabled] = useState(true);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([
    'maja',
    'kuba',
    'zosia',
  ]);
  const [startHour, setStartHour] = useState('09:00');
  const [endHour, setEndHour] = useState('21:00');

  function toggleContact(id: string) {
    setSelectedContacts(current =>
      current.includes(id)
        ? current.filter(contactId => contactId !== id)
        : [...current, id],
    );
  }

  function changeHours() {
    Alert.alert(
      'Przedział godzinowy',
      'Wybierz przedział, w którym chcesz otrzymywać przypomnienia.',
      [
        {
          text: '09:00–21:00',
          onPress: () => {
            setStartHour('09:00');
            setEndHour('21:00');
          },
        },
        {
          text: '08:00–20:00',
          onPress: () => {
            setStartHour('08:00');
            setEndHour('20:00');
          },
        },
        {
          text: '10:00–18:00',
          onPress: () => {
            setStartHour('10:00');
            setEndHour('18:00');
          },
        },
        { text: 'Anuluj', style: 'cancel' },
      ],
    );
  }

  function saveSettings() {
    // Na razie ustawienia są przechowywane w stanie ekranu.
    // Później można dodać zapis lokalny lub wysyłanie do backendu.
    Alert.alert('Przypomnienia', 'Ustawienia zostały zastosowane.', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
  }

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
      />

      {/* Nagłówek */}
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Wróć"
          hitSlop={10}
          onPress={() => router.back()}
          style={styles.headerSide}
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Przypomnienia</Text>

        <Pressable
          onPress={saveSettings}
          style={[styles.headerSide, styles.doneButton]}
        >
          <Text style={styles.doneText}>Gotowe</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>W swoim rytmie.</Text>

        {/* Główny przełącznik */}
        <View style={styles.notificationCard}>
          <View style={styles.notificationInfo}>
            <View style={styles.bellIcon}>
              <Text style={styles.bellText}>♧</Text>
            </View>

            <View style={styles.flexOne}>
              <Text style={styles.cardTitle}>Chwile do wspomnienia</Text>
              <Text style={styles.cardSubtitle}>
                {notificationsEnabled
                  ? 'Powiadomienia włączone'
                  : 'Powiadomienia wyłączone'}
              </Text>
            </View>
          </View>

          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#D0CCC4', true: COLORS.green }}
            thumbColor={COLORS.white}
          />
        </View>

        {/* Częstotliwość */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Jak często dawać Ci znać?
          </Text>

          <View style={styles.frequencyContainer}>
            {FREQUENCIES.map(item => {
              const selected = frequency === item;

              return (
                <Pressable
                  key={item}
                  onPress={() => setFrequency(item)}
                  style={[
                    styles.frequencyButton,
                    selected && styles.frequencyButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.frequencyText,
                      selected && styles.frequencyTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.helperText}>
            Odezwiemy się w losowym momencie, nie o stałej porze.
            Mała niespodzianka, bez presji.
          </Text>
        </View>

        {/* Przedział godzinowy */}
        <View style={styles.timeSection}>
          <Pressable
            onPress={changeHours}
            style={styles.timeButton}
          >
            <View style={styles.flexOne}>
              <Text style={styles.rowTitle}>Tylko w tych godzinach</Text>
              <Text style={styles.rowDescription}>
                Wieczór i noc zostawiamy Tobie.
              </Text>
            </View>

            <View style={styles.timeBadge}>
              <Text style={styles.timeText}>
                {startHour}–{endHour}
              </Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </Pressable>
        </View>

        {/* Preferencje kontaktów */}
        <View style={styles.contactsSection}>
          <Text style={styles.contactsHeading}>
            Z kim wracać do chwil?
          </Text>

          <View style={styles.preferenceRow}>
            <View style={styles.preferenceInfo}>
              <Text style={styles.rowTitle}>
                Preferuj bliskie kontakty
              </Text>
              <Text style={styles.rowDescription}>
                Losujemy jedną osobę. Częste wymiany treści i
                polubienia zwiększają jej szansę.
              </Text>
            </View>

            <Switch
              value={closeContactsEnabled}
              onValueChange={setCloseContactsEnabled}
              trackColor={{ false: '#D0CCC4', true: COLORS.green }}
              thumbColor={COLORS.white}
            />
          </View>

          <View style={styles.contactsHeader}>
            <Text style={styles.contactsCount}>
              UWZGLĘDNIONE OSOBY · {selectedContacts.length}
            </Text>

            <Pressable
              onPress={() =>
                Alert.alert(
                  'Kontakty',
                  'Wybierz osoby, naciskając ich wiersze na liście.',
                )
              }
            >
              <Text style={styles.changeText}>Zmień</Text>
            </Pressable>
          </View>

          {CONTACTS.map(contact => {
            const selected = selectedContacts.includes(contact.id);

            return (
              <Pressable
                key={contact.id}
                onPress={() => toggleContact(contact.id)}
                style={styles.contactRow}
              >
                <View style={styles.contactInfo}>
                  <View
                    style={[
                      styles.avatar,
                      { backgroundColor: contact.color },
                    ]}
                  >
                    <Text style={styles.avatarText}>
                      {contact.initial}
                    </Text>
                  </View>

                  <View style={styles.flexOne}>
                    <Text style={styles.contactName}>
                      {contact.name}
                    </Text>
                    <Text style={styles.contactDescription}>
                      {contact.description}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.checkbox,
                    selected && styles.checkboxSelected,
                  ]}
                >
                  {selected && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.bottomNote}>
          Twoje ustawienia możesz zmienić w dowolnym momencie.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    minHeight: 52,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE8DD',
  },
  headerSide: {
    width: 65,
    minHeight: 40,
    justifyContent: 'center',
  },
  backIcon: {
    color: COLORS.text,
    fontSize: 35,
    lineHeight: 39,
  },
  headerTitle: {
    color: '#1E1E1C',
    fontSize: 16,
    fontWeight: '500',
  },
  doneButton: {
    alignItems: 'flex-end',
  },
  doneText: {
    fontSize: 14,
    color: '#55534E',
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 23,
    paddingBottom: 40,
    gap: 24,
  },
  pageTitle: {
    fontFamily: 'Georgia',
    fontSize: 34,
    lineHeight: 42,
    color: '#1E1E1C',
    letterSpacing: -0.7,
  },
  notificationCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 17,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  notificationInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bellIcon: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellText: {
    color: COLORS.green,
    fontSize: 21,
  },
  flexOne: {
    flex: 1,
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#77736C',
    fontSize: 11,
  },
  section: {
    gap: 12,
  },
  sectionLabel: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '600',
  },
  frequencyContainer: {
    flexDirection: 'row',
    gap: 5,
    padding: 4,
    borderRadius: 13,
    backgroundColor: COLORS.sand,
    borderWidth: 1,
    borderColor: '#E2DBCE',
  },
  frequencyButton: {
    flex: 1,
    minHeight: 42,
    paddingHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  frequencyButtonSelected: {
    backgroundColor: COLORS.green,
  },
  frequencyText: {
    textAlign: 'center',
    color: '#4D4B45',
    fontSize: 11,
    fontWeight: '500',
  },
  frequencyTextSelected: {
    color: COLORS.white,
    fontWeight: '600',
  },
  helperText: {
    color: '#77736C',
    fontSize: 12,
    lineHeight: 19,
  },
  timeSection: {
    borderTopWidth: 1,
    borderTopColor: '#E8E2D6',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E2D6',
    paddingVertical: 17,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowTitle: {
    color: '#252522',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  rowDescription: {
    color: '#77736C',
    fontSize: 12,
    lineHeight: 18,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: COLORS.sand,
    paddingHorizontal: 9,
    paddingVertical: 8,
    borderRadius: 9,
  },
  timeText: {
    color: '#55534E',
    fontSize: 11,
    fontWeight: '500',
  },
  chevron: {
    color: '#88857D',
    fontSize: 21,
  },
  contactsSection: {
    gap: 18,
  },
  contactsHeading: {
    fontFamily: 'Georgia',
    fontSize: 23,
    color: '#1E1E1C',
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  preferenceInfo: {
    flex: 1,
    gap: 5,
  },
  contactsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  contactsCount: {
    color: '#969188',
    fontSize: 10,
    letterSpacing: 0.8,
    fontWeight: '700',
  },
  changeText: {
    color: '#55534E',
    fontSize: 12,
    fontWeight: '500',
  },
  contactRow: {
    minHeight: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  avatar: {
    width: 39,
    height: 39,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.green,
    fontSize: 14,
    fontWeight: '700',
  },
  contactName: {
    color: '#252522',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 3,
  },
  contactDescription: {
    color: '#77736C',
    fontSize: 10,
  },
  checkbox: {
    width: 21,
    height: 21,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLORS.green,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  bottomNote: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 2,
  },
});
