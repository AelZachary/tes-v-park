import { useHomeVM } from '@/viewmodels/useHomeVM';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function HomeScreen() {

  const {
    showFilter,
    setShowFilter,

    selectedCity,
    setSelectedCity,

    search,
    setSearch,

    filteredMall,
  } = useHomeVM();

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/V-Park.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Mall Location</Text>
      </View>

      {/* SEARCH + FILTER */}
      <View style={styles.searchRow}>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#666" />
          <TextInput
            placeholder="Cari mall atau lokasi"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setShowFilter(true)}
        >
          <Ionicons name="options-outline" size={18} color="#fff" />
          <Text style={styles.filterText}>{selectedCity}</Text>
        </TouchableOpacity>

      </View>

      {/* SECTION */}
      <Text style={styles.sectionTitle}>
        Rekomendasi Terdekat
      </Text>

      {/* LIST */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredMall.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>

            <Image source={item.image} style={styles.cardImage} />

            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={styles.mallName}>{item.name}</Text>
              <Text style={styles.address}>{item.address}</Text>
            </View>

            <View style={styles.rightInfo}>
              <Text style={styles.rating}>⭐ 4.6</Text>
            </View>

          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* FILTER DROPDOWN */}
      {showFilter && (
        <View style={styles.dropdown}>
          {['All City', 'Makassar', 'Manado', 'Palu', 'Kendari', 'Gorontalo', 'Palopo'].map(city => (
            <TouchableOpacity
              key={city}
              style={[
                styles.dropdownItem,
                selectedCity === city && styles.activeDropdown
              ]}
              onPress={() => {
                setSelectedCity(city);
                setShowFilter(false);
              }}
            >
              <Text
                style={[
                  styles.dropdownText,
                  selectedCity === city && styles.activeDropdownText
                ]}
              >
                {city}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.activeItem]}>
          <Ionicons name="home" size={20} color="#fff" />
          <Text style={styles.activeText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="time-outline" size={20} color="#1565C0" />
          <Text style={styles.inactiveText}>Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={20} color="#1565C0" />
          <Text style={styles.inactiveText}>Profile</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F7FB',
    paddingTop: 50,
  },

  /* HEADER */
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },

  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    position: 'absolute',
    left: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1565C0',
  },

  /* SEARCH */
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginTop: 10,
  },

  searchBox: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 12,
    height: 45,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginLeft: 6,
  },

  filterBtn: {
    flex: 1, // 🔥 lebih kecil (30%)
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#1565C0',
    borderRadius: 25,
    height: 45,
  },

  filterText: {
    color: '#fff',
    fontWeight: '600',
  },
  
  dropdown: {
    position: 'absolute',
    top: 175, // 🔥 sesuaikan dengan posisi tombol filter
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 10,
    width: 170,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  dropdownText: {
    fontSize: 14,
    color: '#333',
  },

  activeDropdown: {
    backgroundColor: '#EAF4FF',
  },

  activeDropdownText: {
    color: '#1565C0',
    fontWeight: '700',
  },

  /* SECTION */
  sectionTitle: {
    fontSize: 16,
    marginTop: 15,
    marginLeft: 20,
    fontWeight: '700',
    color: '#1565C0',
  },

  /* CARD */
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },

  cardImage: {
    width: 90,
    height: 70,
    borderRadius: 12,
    marginRight: 10,
  },

  mallName: {
    fontWeight: '700',
    color: '#1565C0',
  },

  address: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
    flexWrap: 'wrap',
    maxWidth: '100%',
  },

  /* RIGHT SIDE */
  rightInfo: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 60,
  },

  rating: {
    backgroundColor: '#EAF4FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 12,
    color: '#1565C0',
    fontWeight: '600',
  },

  distance: {
    fontSize: 12,
    color: '#666',
  },

  /* BOTTOM NAV */
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#D9ECFF',
    borderRadius: 40,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 6,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 30,
  },

  activeItem: {
    backgroundColor: '#1565C0',
  },

  activeText: {
    color: '#fff',
    fontWeight: '700',
  },

  inactiveText: {
    color: '#1565C0',
    fontWeight: '600',
  },
});