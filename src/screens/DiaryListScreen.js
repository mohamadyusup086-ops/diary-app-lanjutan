// src/screens/DiaryListScreen.js
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions, Modal, Image, Pressable, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// --- DESIGN TOKENS & DATA TERINTEGRASI ---
const COLORS = {
  surface: '#FFFFFF',
  border: '#E5E7EB',
  text: '#111827',
  muted: '#6B7280',
  accent: '#2563EB',
};

const SPACE = { xs: 4, s: 8, m: 12, l: 16, xl: 24 };
const RADIUS = { card: 12, avatar: 32 };
const TYPO = { h1: 24, title: 16, body: 14, caption: 12 };
const BREAKPOINTS = { tablet: 600 };

const DATA = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview: 'Bangun lebih pagi dan berjalan kaki...',
    body: 'Catatan lengkap mengenai kesegaran udara pagi dan refleksi diri menyambut hari baru yang produktif.',
    moodUri: 'https://picsum.photos/seed/happy/200',
    heroUri: 'https://picsum.photos/seed/happyhero/800/450',
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview: 'Menyelesaikan modul praktikum mobile...',
    body: 'Kemajuan proyek aplikasi diary berjalan lancar berkat diskusi bersama teman-teman tim di laboratorium.',
    moodUri: 'https://picsum.photos/seed/focus/200',
    heroUri: 'https://picsum.photos/seed/focushero/800/450',
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview: 'Membaca buku favorit sambil menikmati senja...',
    body: 'Refleksi singkat di sore hari melihat pemandangan matahari terbenam yang sangat menenangkan jiwa.',
    moodUri: 'https://picsum.photos/seed/calm/200',
    heroUri: 'https://picsum.photos/seed/calmhero/800/450',
  },
  {
    id: 4,
    title: 'Eksperimen Kode Baru',
    date: '2025-10-03',
    preview: 'Mempelajari konsep layout responsif...',
    body: 'Mencoba berbagai variasi Flexbox dan breakpoint untuk memastikan tampilan aplikasi fleksibel di berbagai ukuran layar.',
    moodUri: 'https://picsum.photos/seed/code/200',
    heroUri: 'https://picsum.photos/seed/codehero/800/450',
  },
  {
    id: 5,
    title: 'Akhir Pekan Santai',
    date: '2025-10-02',
    preview: 'Menikmati waktu istirahat yang cukup...',
    body: 'Menghabiskan waktu santai di rumah, merapikan meja kerja, dan menyiapkan rencana untuk pekan depan.',
    moodUri: 'https://picsum.photos/seed/relax/200',
    heroUri: 'https://picsum.photos/seed/relaxhero/800/450',
  },
];

// --- KOMPONEN KARTU DIARY ---
function DiaryCard({ title, date, preview, moodUri, onPress, variant = 'list' }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#e5e7eb' }}
      style={({ pressed }) => [
        cardStyles.card,
        variant === 'grid' && cardStyles.cardGrid,
        { opacity: pressed ? 0.85 : 1 }
      ]}
      accessible
      accessibilityLabel={`Entri ${title} tanggal ${date}`}
    >
      <Image source={{ uri: moodUri }} style={cardStyles.mood} />
      <View style={cardStyles.content}>
        <Text style={cardStyles.title} numberOfLines={1}>{title}</Text>
        <Text style={cardStyles.date}>{date}</Text>
        <Text style={cardStyles.preview} numberOfLines={3} ellipsizeMode="tail">
          {preview}
        </Text>
      </View>
    </Pressable>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: SPACE.m,
    padding: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
  },
  cardGrid: {
    flexDirection: 'column',
  },
  mood: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.avatar,
    backgroundColor: '#eef2ff',
  },
  content: { flex: 1 },
  title: { fontSize: TYPO.title, fontWeight: '700', color: COLORS.text },
  date: { fontSize: TYPO.caption, color: COLORS.muted, marginBottom: 6 },
  preview: { fontSize: TYPO.body, color: COLORS.text },
});

// --- KOMPONEN MODAL DETAIL ---
function DiaryDetailModal({ visible, onClose, entry }) {
  if (!entry) return null;
  const { title, date, body, heroUri } = entry;

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView style={modalStyles.container}>
        <Image source={{ uri: heroUri || entry.moodUri }} style={modalStyles.hero} />
        <View style={modalStyles.content}>
          <Text style={modalStyles.title}>{title}</Text>
          <Text style={modalStyles.date}>{date}</Text>
          <Text style={modalStyles.body}>{body}</Text>
          <Pressable onPress={onClose} style={modalStyles.button}>
            <Text style={modalStyles.buttonText}>Tutup</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  hero: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#ddd',
    borderBottomLeftRadius: RADIUS.card,
    borderBottomRightRadius: RADIUS.card,
  },
  content: { padding: SPACE.l, gap: SPACE.s },
  title: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  date: { fontSize: TYPO.caption, color: COLORS.muted, marginBottom: SPACE.s },
  body: { fontSize: TYPO.body, color: COLORS.text, lineHeight: 20 },
  button: {
    marginTop: SPACE.l,
    padding: SPACE.m,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700' },
});

// --- KOMPONEN UTAMA SCREEN ---
export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const [selected, setSelected] = useState(null);

  const keyForCols = useMemo(() => (twoCols ? 'grid2' : 'list1'), [twoCols]);

  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodUri={item.moodUri}
        variant={twoCols ? 'grid' : 'list'}
        onPress={() => setSelected(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>
      <FlatList
        key={keyForCols}
        data={DATA}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        columnWrapperStyle={twoCols ? { gap: SPACE.m } : undefined}
        contentContainerStyle={{
          padding: SPACE.l,
          gap: SPACE.m,
          paddingTop: SPACE.m,
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada entri.</Text>
        }
      />
      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    color: COLORS.text,
  },
  itemWrap: { flex: 1 },
  itemWrap2: { flex: 1 / 2 },
  empty: { textAlign: 'center', color: COLORS.muted, marginTop: 40 },
});