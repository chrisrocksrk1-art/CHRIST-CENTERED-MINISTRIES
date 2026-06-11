import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../App';

const SermonsScreen = ({ navigation }: any) => {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSermons([
        {
          id: 1,
          title: 'The Power of Faith',
          speaker: 'Pastor John',
          date: '2024-01-15',
          duration: '45 mins',
          views: 1250,
          description: 'A powerful message about trusting God.',
        },
        {
          id: 2,
          title: 'Love Your Neighbor',
          speaker: 'Pastor Mary',
          date: '2024-01-08',
          duration: '38 mins',
          views: 890,
          description: 'Understanding what it truly means to love others.',
        },
        {
          id: 3,
          title: 'Walking in Grace',
          speaker: 'Pastor James',
          date: '2024-01-01',
          duration: '52 mins',
          views: 1500,
          description: "How God's grace transforms our lives.",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const SermonCard = ({ sermon }: any) => (
    <TouchableOpacity
      style={styles.sermonCard}
      onPress={() => navigation.navigate('SermonDetail', { sermon })}
    >
      <View style={styles.sermonHeader}>
        <Ionicons name="play-circle" size={50} color={COLORS.primary} />
        <View style={styles.sermonInfo}>
          <Text style={styles.sermonTitle} numberOfLines={2}>
            {sermon.title}
          </Text>
          <Text style={styles.sermonSpeaker}>{sermon.speaker}</Text>
        </View>
      </View>
      <View style={styles.sermonMeta}>
        <Text style={styles.sermonDate}>{sermon.date}</Text>
        <Text style={styles.sermonDuration}> • {sermon.duration}</Text>
        <Text style={styles.views}> • {sermon.views} views</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sermons</Text>
        <Text style={styles.headerSubtitle}>Latest Messages</Text>
      </View>

      <FlatList
        data={sermons}
        renderItem={({ item }) => <SermonCard sermon={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.lightText,
    marginTop: 3,
  },
  listContent: { paddingHorizontal: 15, paddingVertical: 10 },
  sermonCard: {
    backgroundColor: COLORS.white,
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  sermonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sermonInfo: { flex: 1, marginLeft: 15 },
  sermonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  sermonSpeaker: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 3,
  },
  sermonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sermonDate: { fontSize: 11, color: COLORS.lightText },
  sermonDuration: { fontSize: 11, color: COLORS.lightText },
  views: { fontSize: 11, color: COLORS.lightText },
});

export default SermonsScreen;
