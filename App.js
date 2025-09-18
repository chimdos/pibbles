import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import { useState } from "react";

const PIBBLES = [
  {
    id: "1",
    nome: "Pibble",
    imagem: require("./assets/pibble.png"),
    detalhes: "Um pibble é um filhote de bulldog francês que é fofinho e redondo. Pibbles podem vir em diversas variações de cores, e gostam de ter a barriga lavada.",
  },
  {
    id: "2",
    nome: "Gmail",
    imagem: require("./assets/gmail.png"),
    detalhes: "Gmail é uma variação de pibble de pelo branco. Às vezes eles podem pegar fogo ou serem x-burguers, mas isso é normal.",
  },
  {
    id: "3",
    nome: "Washington",
    imagem: require("./assets/washington.png"),
    detalhes: "Washington é uma variação de pibble de pelo preto. Eles gostam muito mesmo de serem lavados e são os bombeiros do palácio dos pibbles.",
  },
  {
    id: "4",
    nome: "Geeble",
    imagem: require("./assets/geeble.png"),
    detalhes: "Geeble é uma raça alien de pibbles. Eles não são hostis e geralmente convivem pacificamente com o exército dos pibbles. Pibbles normais podem virar novos Geebles ao serem abduzidos por eles.",
  },
  {
    id: "5",
    nome: "Bagel",
    imagem: require("./assets/bagel.png"),
    detalhes: "Bagel é um filhote de golden retriever. Eles normalmente são douradinhos ou marronzinhos, mas tem medo de entrar no palácio dos pibbles, apesar de todos serem uma família.",
  },
  {
    id: "6",
    nome: "Gus the Indifferent",
    imagem: require("./assets/gus.png"),
    detalhes: "Gus é um pibble amigável e meio indiferente. Quando se está perto dele, ele é um cara tranquilo.",
  },
  {
    id: "7",
    nome: "Sir Charles Barkley",
    imagem: require("./assets/sircharlesbarkley.png"),
    detalhes: "Sir Charles Barkley é o criador do mundo dos pibbles e o principal inimigo do palácio pibble, tornando-se tal depois de quase destruir o mundo e matar milhões.",
  },
  {
    id: "8",
    nome: "Franklin",
    imagem: require("./assets/franklin.png"),
    detalhes: "Franklin é um filhote de sharpei bem na dele. Ele é alaranjado e gosta de ser lavado e de se multiplicar por mitose.",
  },
  {
    id: "9",
    nome: "Waffle",
    imagem: require("./assets/waffle.png"),
    detalhes: "Waffle são cachorros fiapo de manga brancos. Eles são extremamente bobocas e são aliados ao exército dos pibbles, além de serem parte do universo intergalático.",
  },
  {
    id: "10",
    nome: "Jiggle",
    imagem: require("./assets/jiggle.png"),
    detalhes: "Jiggles são raras bolas de pelo do palácio dos pibbles, ninjas habilidosos capazes de uma destruição enorme, mas também fofinhos e elásticos.",
  },
];

const ItemGrid = ({ item, onPress }) => (
  <TouchableOpacity style={styles.itemcontainer} onPress={onPress}>
    <View style={styles.shadowDark} />
    <View style={styles.shadowLight} />
    <View style={styles.itemContent}>
      {item.imagem && <Image source={item.imagem} style={styles.itemimagem} />}
      <Text style={styles.itemnome}>{item.nome}</Text>
    </View>
  </TouchableOpacity>
);

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(true);
  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };
  return (
    <SafeAreaView style={styles.safecontainer}>
      <Text style={styles.titulo}>PIBBLES</Text>
      <Text style={styles.jogopibble}>Jogue o quiz dos Pibbles!</Text>

      <FlatList
        data={PIBBLES}
        renderItem={({ item }) => (
          <ItemGrid item={item} onPress={() => handleOpenModal(item)} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />

      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{selectedItem.nome}</Text>
              {selectedItem.imagem && (
                <Image source={selectedItem.imagem} style={styles.modalImage} />
              )}
              <Text style={styles.modalText}>{selectedItem.detalhes}</Text>
              <Button title="Fechar" onPress={handleCloseModal} />
            </View>
          </View>
        </Modal>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
    backgroundColor: "#ebebeb",
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
    backgroundColor: "#ebebeb",
    alignItems: "center",
    justifyContent: "center",
  },
  shadowDark: {
    position: "absolute",
    borderRadius: 50,
    width: "100%",
    height: "100%",
    shadowColor: "#c8c8c8",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  shadowLight: {
    position: "absolute",
    borderRadius: 50,
    width: "100%",
    height: "100%",
    shadowColor: "#ffffff",
    shadowOffset: {
      width: -20,
      height: -20,
    },
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  itemContent: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: "#ebebeb",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  itemnome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  itemimagem: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    maxWidth: 500,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 25,
  },
  modalText: {
    marginBottom: 25,
    fontSize: 16,
  },
});
