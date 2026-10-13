import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import DiaryCard from '../components/DiaryCard';

// Import gambar lokal dari folder assets/moods
import detectiveImg from '../../assets/moods/detective.png';
import halloweenImg from '../../assets/moods/halloween.png';

const diaryEntries = [
  {
    id: 1,
    title: 'Misteri Bug Terpecahkan',
    date: '2025-10-06',
    preview: 'Menjadi detektif seharian mencari penyebab error di React Native. Akhirnya ketemu!',
    moodImage: detectiveImg,
    moodType: 'detective',
    isLocalImage: true, // Menggunakan gambar lokal
  },
  {
    bin: 2,
    id: 2,
    title: 'Pesta Kostum Kampus',
    date: '2025-10-05',
    preview: 'Suasana kampus rame banget dengan tema Halloween. Seru sekali bersama teman-teman.',
    moodImage: halloweenImg,
    moodType: 'halloween',
    isLocalImage: true, // Menggunakan gambar lokal
  },
  {
    id: 3,
    title: 'Pagi yang Tenang',
    date: '2025-10-04',
    preview: 'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk...',
    moodImage: 'https://picsum.photos/seed/happy/80',
    moodType: 'happy',
    isLocalImage: false,
  },
  {
    id: 4,
    title: 'Produktif di Lab',
    date: '2025-10-03',
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru...',
    moodImage: 'https://picsum.photos/seed/focus/80',
    moodType: 'calm',
    isLocalImage: false,
  },
  {
    id: 5,
    title: 'Senja di Taman',
    date: '2025-10-02',
    preview: 'Menikmati senja sambil membaca buku favorit. Warna langit sangat indah...',
    moodImage: 'https://picsum.photos/seed/calm/80',
    moodType: 'calm',
    isLocalImage: false,
  },
];

export default function DiaryListScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header dengan Avatar Pengguna */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.greeting}>Selamat Datang,</Text>
          <Text style={styles.header}>Buku Harian</Text>
        </View>
        <Image
          source={{ uri: 'https://picsum.photos/seed/useravatar/100' }}
          style={styles.avatar}
        />
      </View>

      {/* Daftar Kartu Harian */}
      {diaryEntries.map((entry) => (
        <DiaryCard
          key={entry.id}
          title={entry.title}
          date={entry.date}
          preview={entry.preview}
          moodImage={entry.moodImage}
          moodType={entry.moodType}
          isLocalImage={entry.isLocalImage}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 16 },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  greeting: {
    fontSize: 14,
    color: '#6B7280',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#2563EB',
  },
});