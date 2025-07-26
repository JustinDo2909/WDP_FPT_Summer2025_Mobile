"use client";

import { Column, Container, Row, RText, Section } from "@/src/libs/by";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SubmitConfirm } from "../SubmitConfirm";

export function RenderQuiz(props: {
  questions: QuizQuestion[];
  currentQuestion: number;
  selectedOption: number | null;
  answers: { questionId: string; selectedOption: number }[];
  isMenuVisible: boolean;
  isConfirmVisible: boolean;
  slideAnim: Animated.Value;
  onOptionSelect: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  navigateToQuestion: (index: number) => void;
  setConfirmVisible: (v: boolean) => void;
  calculateAndShowResults: () => void;
}) {
  const {
    questions,
    currentQuestion,
    selectedOption,
    answers,
    isMenuVisible,
    isConfirmVisible,
    slideAnim,
    onOptionSelect,
    onNext,
    onPrev,
    onSubmit,
    openMenu,
    closeMenu,
    navigateToQuestion,
    setConfirmVisible,
    calculateAndShowResults,
  } = props;

  return (
    <Container style={styles.container}>
      <Modal transparent visible={isMenuVisible} onRequestClose={closeMenu}>
        <Pressable style={styles.modalOverlay} onPress={closeMenu}>
          <Animated.View
            style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
          >
            <ScrollView>
              <RText style={styles.menuTitle}>Questions</RText>
              {questions.map((q, index) => {
                const isAnswered = answers.some((a) => a.questionId === q.id);
                return (
                  <TouchableOpacity
                    key={q.id}
                    style={[
                      styles.menuItem,
                      isAnswered && styles.answeredMenuItem,
                    ]}
                    onPress={() => navigateToQuestion(index)}
                  >
                    <RText style={styles.menuItemText}>{`Question ${
                      index + 1
                    }`}</RText>
                    {isAnswered && <RText style={styles.answeredTick}>✓</RText>}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Animated.View>
        </Pressable>
      </Modal>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Section style={styles.header}>
          <Row style={styles.headerRow}>
            <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
              <RText style={styles.menuText}>Menu</RText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={openMenu}>
              <Entypo name="menu" size={24} color="black" />
            </TouchableOpacity>
          </Row>
        </Section>

        <Section style={styles.titleSection}>
          <Column style={styles.titleColumn}>
            <RText style={styles.gameTitle}>Glow & Know</RText>
            <RText style={styles.progress}>
              {currentQuestion + 1}/{questions.length}
            </RText>
            <RText style={styles.question}>
              {questions[currentQuestion].content}
            </RText>
          </Column>
        </Section>

        <Section style={styles.optionsSection}>
          <Column style={styles.optionsColumn}>
            {questions[currentQuestion].questionOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionCard,
                  selectedOption === index
                    ? styles.selectedOption
                    : styles.unselectedOption,
                ]}
                onPress={() => onOptionSelect(index)}
              >
                <RText style={styles.optionText}>{option.content}</RText>
              </TouchableOpacity>
            ))}
          </Column>
        </Section>

        <Section style={styles.navigationSection}>
          <Row style={styles.navigationRow}>
            <TouchableOpacity
              style={[
                styles.navButton,
                currentQuestion === 0 && styles.disabledButton,
              ]}
              onPress={onPrev}
              disabled={currentQuestion === 0}
            >
              <Entypo name="chevron-left" size={22} color="#333" />
              <RText style={styles.navText}>Prev</RText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                currentQuestion === questions.length - 1 &&
                  styles.disabledButton,
              ]}
              onPress={onNext}
              disabled={currentQuestion === questions.length - 1}
            >
              <RText style={styles.navText}>Next</RText>
              <Entypo name="chevron-right" size={22} color="#333" />
            </TouchableOpacity>
          </Row>
        </Section>

        <Section style={styles.submitSection}>
          <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
            <RText style={styles.submitText}>Submit</RText>
          </TouchableOpacity>
        </Section>
      </ScrollView>

      <SubmitConfirm
        visible={isConfirmVisible}
        onCancel={() => setConfirmVisible(false)}
        onConfirm={() => {
          setConfirmVisible(false);
          calculateAndShowResults();
        }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerRow: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuButton: {
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText: {
    color: "#334155",
    fontSize: 16,
    fontWeight: "600",
  },
  iconButton: {
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    padding: 10,
  },
  titleSection: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  titleColumn: {
    alignItems: "center",
    gap: 10,
  },
  gameTitle: {
    color: "#ef4444",
    fontSize: 30,
    fontWeight: "bold",
  },
  progress: {
    color: "#64748b",
    fontSize: 18,
    fontWeight: "500",
  },
  question: {
    color: "#1e293b",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 30,
    marginTop: 15,
    paddingHorizontal: 15,
  },
  optionsSection: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  optionsColumn: {
    gap: 15,
  },
  optionCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 80,
  },
  selectedOption: {
    backgroundColor: "#fecaca",
    borderColor: "#be185d",
    borderWidth: 2,
  },
  unselectedOption: {
    backgroundColor: "#f8fafc",
    borderColor: "#e2e8f0",
    borderWidth: 1,
  },
  optionText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#334155",
    textAlign: "center",
  },
  navigationSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: "auto",
  },
  navigationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navButton: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: "48%",
  },
  disabledButton: {
    opacity: 0.5,
  },
  navText: {
    color: "#334155",
    fontSize: 18,
    fontWeight: "600",
  },
  submitSection: {
    padding: 20,
    paddingTop: 10,
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#22c55e",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  // Sidebar styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sidebar: {
    width: 300,
    height: "100%",
    backgroundColor: "#f8fafc",
    alignSelf: "flex-end",
    padding: 20,
    paddingTop: 50,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1e293b",
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 5,
  },
  answeredMenuItem: {
    backgroundColor: "#fecaca",
    borderColor: "#f87171",
    borderWidth: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#334155",
  },
  answeredTick: {
    fontSize: 18,
    color: "#be185d",
    fontWeight: "bold",
  },
});
