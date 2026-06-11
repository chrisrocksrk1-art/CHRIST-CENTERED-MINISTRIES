import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../App';

const DailyDevotionScreen = () => {
  const [devotion, setDevotion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDevotion({
        id: 1,
        date: new Date().toLocaleDateString(),
        title: 'Trust in the Lord',
        scripture: 'Proverbs 3:5-6',
        text: 'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
        devotion:
          'Today, we are reminded that faith is not just about believing; it is about trusting completely. When we trust in God with all our heart, we release the burden of controlling every outcome.',
        author: 'Pastor John',
        prayerPoint: 'Lord, help us to trust in You completely. Amen.',
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Daily Devotion</Text>
          <Text style={styles.headerDate}>Today: {devotion?.date}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{devotion?.title}</Text>
            <TouchableOpacity onPress={() => setBookmarked(!bookmarked)}>
              <Ionicons
                name={bookmarked ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.scripture}>{devotion?.scripture}</Text>
          <Text style={styles.scriptureText}>{devotion?.text}</Text>

          <View style={styles.divider} />

          <Text style={styles.devotionTitle}>Reflection</Text>
          <Text style={styles.devotionText}>{devotion?.devotion}</Text>

          <View style={styles.authorSection}>
            <Ionicons name="person-circle" size={32} color={COLORS.primary} />
            <Text style={styles.author}>{devotion?.author}</Text>
          </View>

          <View style={styles.prayerBox}>
            <Ionicons name="prism" size={24} color={COLORS.accent} />
            <Text style={styles.prayerTitle}>Prayer</Text>
          </View>
          <Text style={styles.prayerText}>{devotion?.prayerPoint}</Text>

          <TouchableOpacity style={styles.shareBtn}>
            <Ionicons name="share-social" size={20} color={COLORS.white} />
            <Text style={styles.shareBtnText}>Share</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  headerDate: {
    fontSize: 12,
    color: COLORS.lightText,
    marginTop: 5,
  },
  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    flex: 1,
  },
  scripture: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.secondary,
    marginBottom: 10,
  },
  scriptureText: {
    fontSize: 13,
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: 15,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
  },
  devotionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 8,
  },
  devotionText: {
    fontSize: 13,
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: 15,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  author: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 10,
  },
  prayerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  prayerTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.white,
    marginLeft: 10,
  },
  prayerText: {
    fontSize: 12,
    color: COLORS.text,
    lineHeight: 18,
    marginBottom: 15,
  },
  shareBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  shareBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default DailyDevotionScreen;
