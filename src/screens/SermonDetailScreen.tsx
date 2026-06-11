import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../App';

const SermonDetailScreen = ({ route }: any) => {
  const { sermon } = route.params;
  const [liked, setLiked] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.videoBox}>
          <Ionicons name="play-circle" size={80} color={COLORS.white} />
          <Text style={styles.playText}>Tap to Play</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{sermon.title}</Text>

          <View style={styles.speakerInfo}>
            <View style={styles.speakerAvatar}>
              <Text style={styles.avatarText}>
                {sermon.speaker.charAt(0)}
              </Text>
            </View>
            <View style={styles.speakerDetails}>
              <Text style={styles.speakerName}>{sermon.speaker}</Text>
              <Text style={styles.speakerDate}>{sermon.date}</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Ionicons name="eye" size={16} color={COLORS.primary} />
              <Text style={styles.statText}>{sermon.views}</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="time" size={16} color={COLORS.primary} />
              <Text style={styles.statText}>{sermon.duration}</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setLiked(!liked)}
            >
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={24}
                color={liked ? COLORS.primary : COLORS.lightText}
              />
              <Text style={styles.actionText}>Like</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="share-social" size={24} color={COLORS.lightText} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="download" size={24} color={COLORS.lightText} />
              <Text style={styles.actionText}>Download</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.watchBtn}>
            <Ionicons name="play" size={20} color={COLORS.white} />
            <Text style={styles.watchBtnText}>Watch Full Sermon</Text>
          </TouchableOpacity>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{sermon.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  videoBox: {
    backgroundColor: COLORS.secondary,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playText: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 10,
  },
  content: { padding: 20 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  speakerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  speakerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
  speakerDetails: { marginLeft: 15, flex: 1 },
  speakerName: { fontSize: 13, fontWeight: 'bold', color: COLORS.text },
  speakerDate: { fontSize: 11, color: COLORS.lightText, marginTop: 2 },
  statsContainer: { flexDirection: 'row', marginBottom: 15 },
  stat: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  statText: { fontSize: 11, color: COLORS.text, marginLeft: 5 },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  actionBtn: { alignItems: 'center' },
  actionText: { fontSize: 11, color: COLORS.lightText, marginTop: 5 },
  watchBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  watchBtnText: { color: COLORS.white, fontSize: 14, fontWeight: 'bold', marginLeft: 8 },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.text, marginBottom: 8 },
  description: { fontSize: 12, color: COLORS.lightText, lineHeight: 18 },
});

export default SermonDetailScreen;
