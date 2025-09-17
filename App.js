import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, SafeAreaView } from 'react-native';

const PIBBLES = [
  { id: '1', nome: 'Pibble', imagem: require('./assets/pibble.png') },
  { id: '2', nome: 'Gmail', imagem: null },
  { id: '3', nome: 'Washington', imagem: null },
  { id: '4', nome: 'Geeble', imagem: null },
  { id: '5', nome: 'Bagel', imagem: null },
  { id: '6', nome: 'Gus the Indifferent', imagem: null },
  { id: '7', nome: 'Sir Charles Barkley', imagem: null },
  { id: '8', nome: 'Franklin', imagem: null },
  { id: '9', nome: 'Waffle', imagem: null },
  { id: '10', nome: 'Jiggle', imagem: null },
];

const ItemGrid = ({ item }) => (
  <View style={styles.itemcontainer}>
    <View style={styles.shadowDark} />
    <View style={styles.shadowLight} />
    <View style={styles.itemContent}>
      {item.imagem && <Image source={item.imagem} style={styles.itemimagem} />}
      <Text style={styles.itemnome}>{item.nome}</Text>
    </View>
  </View>
);

export default function App() {
  return (
    <SafeAreaView style={styles.safecontainer}>
      <Text style={styles.titulo}>PIBBLES</Text>

      <FlatList
        data={PIBBLES}
        renderItem={({ item }) => <ItemGrid item={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
    backgroundColor: '#ebebeb',
    marginTop: StatusBar.currentHeight || 0,
  },
  grid: {
    padding: 8,
  },
  itemcontainer: {
    flex: 1,
    height: 300,
    marginLeft: 140,
    marginRight: 140,
    marginTop: 25,
    marginBottom: 25,
    backgroundColor: '#ebebeb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowDark: {
    position: 'absolute',
    borderRadius: 50,
    width: '100%',
    height: '100%',
    shadowColor: '#c8c8c8',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  shadowLight: {
    position: 'absolute',
    borderRadius: 50,
    width: '100%',
    height: '100%',
    shadowColor: '#ffffff',
    shadowOffset: {
      width: -20,
      height: -20,
    },
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  itemContent: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: '#ebebeb',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  itemnome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  itemimagem: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
});