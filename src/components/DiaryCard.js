import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Fungsi untuk menentukan warna border & background berdasarkan mood
const getMoodStyle = (moodType) => {
  switch (moodType) {
    case 'detective':
      return { borderColor: '#4B5563', backgroundColor: '#F3F4F6' }; // Nuansa misteri/abu-abu
    case 'halloween':
      return { borderColor: '#F97316', backgroundColor: '#FFF7ED' }; // Nuansa oranye halloween
    case 'happy':
      return { borderColor: '#10B981', backgroundColor: '#ECFDF5' }; // Nuansa hijau
    case 'calm':
      return { borderColor: '#3B82F6', backgroundColor: '#EFF6FF' }; // Nuansa biru
    default:
      return { borderColor: '#E5E7EB', backgroundColor: '#FFFFFF' };
  }
};

export default function DiaryCard({ title, date, preview, moodImage, moodType, isLocalImage }) {
  const moodStyle = getMoodStyle(moodType);

  return (
    <View style={[styles.card, { borderColor: moodStyle.borderColor, backgroundColor: moodStyle.backgroundColor }]}>
      <Image
        source={isLocalImage ? moodImage : { uri: moodImage }}
        style={styles.mood}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.preview} numberOfLines={3} ellipsizeMode="tail">
          {preview}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderWidth: 2, // Diperjelas untuk menyorot variasi warna mood
    borderRadius: 12,
    marginBottom: 12,
  },
  mood: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  preview: {
    fontSize: 14,
    color: '#374151',
  },
});