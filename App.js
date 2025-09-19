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
} from "react-native";
import { useState, useEffect } from "react";

const QUIZ_DATA = [
  {
    question: "Qual Pibble é uma variação de pelo branco?",
    options: ["Gmail", "Washington"],
    correct_answer: "Gmail",
  },
  {
    question: "Qual destes é um filhote de Golden Retriever?",
    options: ["Bagel", "Geeble"],
    correct_answer: "Bagel",
  },
  {
    question: "Quem é o principal inimigo do palácio Pibble?",
    options: ["Gus the Indifferent", "Sir Charles Barkley"],
    correct_answer: "Sir Charles Barkley",
  },
  {
    question: "Qual Pibble se multiplica por mitose?",
    options: ["Franklin", "Waffle"],
    correct_answer: "Franklin",
  },
  {
    question: "Qual raça de Pibbles é alienígena?",
    options: ["Jiggle", "Geeble"],
    correct_answer: "Geeble",
  },
];

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

const NeumorphicButton = ({ onPress, title, color = '#007AFF' }) => (
  <TouchableOpacity onPress={onPress} style={styles.actionButtonContainer}>
    <View style={styles.shadowDark} />
    <View style={styles.shadowLight} />
    <View style={styles.actionButtonContent}>
      <Text style={[styles.actionButtonText, { color }]}>{title}</Text>
    </View>
  </TouchableOpacity>
);

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
  const [selectedItem, setSelectedItem] = useState(null);

  const [quizModalVisible, setQuizModalVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  useEffect(() => {
    if (!quizModalVisible) {
      setTimeout(() => restartQuiz(), 300);
    }
  }, [quizModalVisible]);

  const handleAnswer = (option) => {
    if (!isAnswered) {
      setSelectedAnswer(option);
      setIsAnswered(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_DATA.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsAnswered(true);
    }
  };

  const getOptionBackgroundColor = (option) => {
    const currentQuestion = QUIZ_DATA[currentQuestionIndex];
    if (!isAnswered) return '#ebebeb';
    if (option === currentQuestion.correct_answer) return '#d4edda';
    if (option === selectedAnswer) return '#f8d7da';
    return '#ebebeb';
  };

  return (
    <SafeAreaView style={styles.safecontainer}>
      <Text style={styles.titulo}>PIBBLES</Text>
      <TouchableOpacity onPress={() => setQuizModalVisible(true)}>
        <Text style={styles.jogopibble}>Jogue o quiz dos Pibbles!</Text>
      </TouchableOpacity>

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
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.detailModalView}>
              <Text style={styles.modalTitle}>{selectedItem.nome}</Text>
              {selectedItem.imagem && (
                <Image source={selectedItem.imagem} style={styles.modalImage} />
              )}
              <Text style={styles.modalText}>{selectedItem.detalhes}</Text>
              <NeumorphicButton title="Fechar" onPress={handleCloseModal} color="#888" />
            </View>
          </View>
        </Modal>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={quizModalVisible}
        onRequestClose={() => setQuizModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.quizModalView}>
            {isAnswered && currentQuestionIndex === QUIZ_DATA.length - 1 ? (
              <>
                <Text style={styles.modalTitle}>Fim do Quiz!</Text>
                <Text style={styles.modalText}>Você completou o quiz dos Pibbles!</Text>
                <NeumorphicButton title="Jogar Novamente" onPress={restartQuiz} />
                <View style={{ height: 15 }} />
                <NeumorphicButton title="Fechar" onPress={() => setQuizModalVisible(false)} color="#888" />
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Quiz dos Pibbles</Text>
                <Text style={styles.quizQuestion}>
                  {QUIZ_DATA[currentQuestionIndex]?.question}
                </Text>

                {QUIZ_DATA[currentQuestionIndex]?.options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.quizOptionContainer}
                    onPress={() => handleAnswer(option)}
                    disabled={isAnswered}
                  >
                    <View style={styles.shadowDark} />
                    <View style={styles.shadowLight} />
                    <View style={[
                      styles.quizOptionContent,
                      { backgroundColor: getOptionBackgroundColor(option) }
                    ]}>
                      <Text style={styles.quizOptionText}>{option}</Text>
                    </View>
                  </TouchableOpacity>
                ))}

                {isAnswered ? (
                  <View style={styles.quizButtonContainer}>
                    {currentQuestionIndex < QUIZ_DATA.length - 1 ? (
                      <NeumorphicButton title="Próxima Pergunta" onPress={handleNextQuestion} />
                    ) : (
                      <NeumorphicButton title="Ver Resultado" onPress={handleNextQuestion} />
                    )}
                  </View>
                ) : (
                  <View style={styles.quizButtonContainer}>
                    <NeumorphicButton title="Fechar" onPress={() => setQuizModalVisible(false)} color="#888" />
                  </View>
                )}
              </>
            )}
          </View>
        </View>
      </Modal>

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
    borderRadius: 20,
    width: "100%",
    height: "100%",
    shadowColor: "#c8c8c8",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  shadowLight: {
    position: "absolute",
    borderRadius: 20,
    width: "100%",
    height: "100%",
    shadowColor: "#ffffff",
    shadowOffset: {
      width: -10,
      height: -10,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  detailModalView: {
    width: "90%",
    maxWidth: 400,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  quizModalView: {
    width: "90%",
    maxWidth: 400,
    margin: 20,
    backgroundColor: "#ebebeb",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
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
    textAlign: "center",
    color: '#555',
  },
  jogopibble: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
    color: "#007AFF",
    fontWeight: "bold",
  },
  quizQuestion: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
    color: '#333',
  },
  quizOptionContainer: {
    width: '100%',
    height: 60,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizOptionContent: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  quizOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  quizButtonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  actionButtonContainer: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonContent: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#ebebeb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
