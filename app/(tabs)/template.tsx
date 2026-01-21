interface Template {
  _id?: string;           // MongoDB _id (optional for now)
  id?: string;            // fallback if using fake data
  name: string;
  image: string;
  comingSoon: boolean;
}

// app/(tabs)/template.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl, // for pull-to-refresh
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { api } from '@/services/api'; // your axios instance

export default function TemplateScreen() {
const [templates, setTemplates] = useState<Template[]>([]);
const [filtered, setFiltered] = useState<Template[]>([]);
const [search, setSearch] = useState<string>('');
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);
const [refreshing, setRefreshing] = useState<boolean>(false);

  // Fetch templates from backend
  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/templates'); // /api/templates
      const data = response.data;

      setTemplates(data);
      setFiltered(data); // initial filter = all
    } catch (err) {
      console.error('Fetch templates error:', err);
      setError('Failed to load templates. Pull down to retry.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Run on mount + every time screen is focused (tab switch)
  useFocusEffect(
    useCallback(() => {
      fetchTemplates();
    }, [fetchTemplates])
  );

  // Filter when search changes
useEffect(() => {
  if (search.trim() === '') {
    setFiltered(templates);
  } else {
    const lowerSearch = search.toLowerCase();
    const results = templates.filter(item =>
      item.name.toLowerCase().includes(lowerSearch)
    );
    setFiltered(results);
  }
}, [search, templates]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTemplates();
  };

const renderItem = ({ item }: { item: Template }) => (
  <TouchableOpacity
    style={[
      styles.card,
      item.comingSoon && styles.cardDisabled,
    ]}
    onPress={() => {
      if (!item.comingSoon) {
        router.push({
          pathname: '/image-select',
          params: {
            templateName: item.name,
            templateId: item._id || item.id, // safe fallback
          },
        });
      }
    }}
    activeOpacity={0.8}
    disabled={item.comingSoon}
  >
    <Image
      source={{ uri: item.image }}
      style={styles.cardImage}
      resizeMode="cover"
    />
    <View style={styles.cardInfo}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      {item.comingSoon && (
        <Text style={styles.comingSoon}>Coming Soon</Text>
      )}
    </View>
  </TouchableOpacity>
);

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#2196F3" style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header / Search */}
      <View style={styles.header}>
        <Text style={styles.title}>Select Template</Text>
        <TextInput
          style={styles.search}
          placeholder="Search (e.g. steel pipes)"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={filtered}
          numColumns={2}
          keyExtractor={item => item._id?.toString() || item.id?.toString() || Math.random().toString()}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.row}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.empty}>
              {search ? 'No matching templates' : 'No templates available'}
            </Text>
          }
        />
      )}

      <Text style={styles.footer}>Metal Products • More categories coming soon</Text>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  search: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  list: { padding: 8 },
  row: { justifyContent: 'space-between' },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    height: 220,
  },
  cardDisabled: { opacity: 0.6 },
  cardImage: { width: '100%', height: 140 },
  cardInfo: { padding: 12, alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
  comingSoon: { fontSize: 12, color: '#888', marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 60, fontSize: 16, color: '#777' },
  footer: {
    textAlign: 'center',
    padding: 16,
    color: '#666',
    fontSize: 14,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  error: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 16,
    color: 'red',
    paddingHorizontal: 20,
  },
});