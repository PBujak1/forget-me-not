
import { useRouter } from 'expo-router';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

const COLORS = {
  background: '#FAF8F5',
  surface: '#FFFFFF',
  card: '#F0EFEA',
  text: '#222320',
  muted: '#8B8981',
  green: '#28362C',
  border: '#EBE5DA',
  rose: '#E87986',
};

const placeholderImage = 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg';

function counter(counter: number) {
    counter++;
    return counter;
}

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Nagłówek aplikacji */}
        <View style={styles.header}>
          <View style={styles.brand}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>✣</Text>
            </View>

            <Text style={styles.brandName}>blisko</Text>
          </View>

        <Pressable
          style={styles.profileButton}
          onPress={() => {
            // Tutaj później dodamy przejście do profilu.
          }}
        >
          <Text style={styles.profileInitial}>P</Text>
        </Pressable>
        </View>

        {/* Powitanie */}
        <View style={styles.greeting}>
          <Text style={styles.date}>CZWARTEK, 15 PAŹDZIERNIKA</Text>

          <Text style={styles.heading}>
            Dobrze być{'\n'}blisko.
          </Text>
        </View>

        {/* Karta codziennego pytania */}
        <View style={styles.promptCard}>
          <View style={styles.promptLabel}>
            <View style={styles.smallAvatar}>
              <Text style={styles.avatarLetter}>M</Text>
            </View>

            <Text style={styles.label}>
              CHWILA DLA CIEBIE I WERONISI
            </Text>
          </View>

          <Text style={styles.promptTitle}>
            Co dzisiaj przypomina Ci o Weroniczce?
          </Text>

          <View style={styles.cardDivider} />

          <Pressable
            style={styles.createButton}
            onPress={() => {router.push('/new-memory');}}
          >
            <Text style={styles.createButtonText}>
              Zatrzymaj ten dzień ↗
            </Text>
          </Pressable>
        </View>

        {/* Lista wspomnień */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Wasze chwile</Text>

          <Pressable onPress={() => {}}>
            <Text style={styles.sortText}>Najnowsze⌄</Text>
          </Pressable>
        </View>

        {/* Przykładowe wspomnienie */}
        <View style={styles.memoryCard}>
          <Image
            source={{ uri: placeholderImage }}
            style={styles.memoryImage}
            resizeMode="cover"
          />

          <View style={styles.authorRow}>
            <View style={styles.authorAvatar}>
              <Text style={styles.avatarLetter}>M</Text>
            </View>

            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>Weroniczka</Text>
              <Text style={styles.location}>
                22 września · Mazury
              </Text>
            </View>

            <Pressable onPress={() => {}}>
              <Text style={styles.moreButton}>•••</Text>
            </Pressable>
          </View>

          <Text style={styles.memoryDescription}>
            Miałyśmy wracać przed zachodem. Zostałyśmy do pierwszych
            gwiazd.
          </Text>

          <View style={styles.memoryFooter}>
            <View style={styles.audience}>
              <Text style={styles.audienceText}>♧  Ty i Misia</Text>
            </View>

            <Pressable style={styles.likeButton} onPress={() => {}}>
              <Text style={styles.likeText}>♡ {counter(2)}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#E6ECE5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: COLORS.green,
    fontSize: 25,
  },
  brandName: {
    color: '#1D2720',
    fontSize: 23,
    fontWeight: '700',
    letterSpacing: -0.7,
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E6ECE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    color: COLORS.green,
    fontSize: 15,
    fontWeight: '600',
  },
  greeting: {
    marginBottom: 24,
  },
  date: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.1,
    marginBottom: 10,
  },
  heading: {
    color: COLORS.text,
    fontFamily: 'Georgia',
    fontSize: 35,
    lineHeight: 41,
    letterSpacing: -0.8,
  },
  promptCard: {
    backgroundColor: COLORS.card,
    borderRadius: 27,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E8E5DE',
    marginBottom: 30,
  },
  promptLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 17,
  },
  smallAvatar: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: '#CCD8CB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: COLORS.green,
    fontWeight: '700',
  },
  label: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: '#74756D',
  },
  promptTitle: {
    fontFamily: 'Georgia',
    fontSize: 27,
    lineHeight: 34,
    color: COLORS.text,
    marginBottom: 22,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#DCD9D1',
    marginBottom: 16,
  },
  createButton: {
    alignSelf: 'flex-start',
    paddingVertical: 3,
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#435848',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Georgia',
    fontSize: 23,
    fontWeight: '600',
    color: COLORS.text,
  },
  sortText: {
    color: '#77766F',
    fontSize: 11,
  },
  memoryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 25,
    padding: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  memoryImage: {
    width: '100%',
    height: 205,
    borderRadius: 19,
    backgroundColor: '#E6ECE5',
    marginBottom: 15,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  authorAvatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#E6ECE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 3,
  },
  location: {
    fontSize: 10,
    color: COLORS.muted,
  },
  moreButton: {
    color: COLORS.muted,
    paddingHorizontal: 5,
    fontSize: 15,
  },
  memoryDescription: {
    fontSize: 13,
    lineHeight: 21,
    color: '#55564F',
    marginBottom: 18,
  },
  memoryFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F0EFEA',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  audience: {
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#F0EFEA',
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  audienceText: {
    fontSize: 11,
    color: '#55564F',
  },
  likeButton: {
    padding: 5,
  },
  likeText: {
    fontSize: 13,
    color: '#D66C7B',
    fontWeight: '600',
  },
});
