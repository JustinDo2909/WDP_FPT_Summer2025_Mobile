"use client";

import { Column, Container, RText, Section } from "@/src/libs/by";
import React, { useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { RenderQuiz } from "../RenderQuiz.tsx";
import { RenderResults } from "../RenderResults";
import context from "../context";

interface QuizAnswer {
  questionId: string;
  selectedOption: number;
}

interface GlowKnowQuizProps {
  questions: QuizQuestion[];
  rewardTiers: { correct: number; reward: string }[];
}

export function GlowKnow({ questions, rewardTiers }: GlowKnowQuizProps) {
  const [quizState, setQuizState] = useState<"playing" | "finished">("playing");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [finalScore, setFinalScore] = useState({ correct: 0, total: 0 });
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  const { meds } = context.useCtx();

  // --- Quiz Logic Handlers ---
  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const newAnswers = answers.filter(
      (a) => a.questionId !== questions[currentQuestion].id
    );
    newAnswers.push({
      questionId: questions[currentQuestion].id,
      selectedOption: optionIndex,
    });
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setConfirmVisible(true);
  };

  const calculateAndShowResults = () => {
    let correctAnswers = 0;
    answers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (question) {
        const selectedOptionData =
          question.questionOptions[answer.selectedOption];
        if (selectedOptionData?.is_correct) {
          correctAnswers++;
        }
      }
    });
    setFinalScore({ correct: correctAnswers, total: questions.length });
    setQuizState("finished");
    meds.calculateReward(correctAnswers);
  };

  const getEarnedReward = (correctCount: number) => {
    let earnedReward = null;
    const sortedTiers = [...rewardTiers].sort((a, b) => b.correct - a.correct);
    for (const tier of sortedTiers) {
      if (correctCount >= tier.correct) {
        earnedReward = tier.reward;
        break;
      }
    }
    return earnedReward;
  };

  // --- Menu Handlers ---
  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setMenuVisible(false));
  };

  const navigateToQuestion = (index: number) => {
    setCurrentQuestion(index);
    closeMenu();
  };

  // --- Effect to update selected option on navigation ---
  React.useEffect(() => {
    if (quizState === "playing" && questions.length > 0) {
      const currentQuestionData = questions[currentQuestion];
      const existingAnswer = answers.find(
        (a) => a.questionId === currentQuestionData.id
      );
      setSelectedOption(existingAnswer ? existingAnswer.selectedOption : null);
    }
  }, [currentQuestion, quizState, questions, answers]);

  // --- Early return if no questions ---
  if (!questions || questions.length === 0) {
    return (
      <Container style={styles.container}>
        <Section style={styles.titleSection}>
          <Column style={styles.titleColumn}>
            <RText style={styles.gameTitle}>Loading Quiz...</RText>
            <RText style={styles.progress}>
              Fetching questions from API...
            </RText>
          </Column>
        </Section>
      </Container>
    );
  }

  return quizState === "playing" ? (
    <RenderQuiz
      questions={questions}
      currentQuestion={currentQuestion}
      selectedOption={selectedOption}
      answers={answers}
      isMenuVisible={isMenuVisible}
      isConfirmVisible={isConfirmVisible}
      slideAnim={slideAnim}
      onOptionSelect={handleOptionSelect}
      onPrev={handlePrev}
      onNext={handleNext}
      onSubmit={handleSubmit}
      openMenu={openMenu}
      closeMenu={closeMenu}
      navigateToQuestion={navigateToQuestion}
      setConfirmVisible={setConfirmVisible}
      calculateAndShowResults={calculateAndShowResults}
    />
  ) : (
    <RenderResults
      finalScore={finalScore}
      rewardTiers={rewardTiers}
      getEarnedReward={getEarnedReward}
    />
  );
}

// --- STYLES FOR RESULTS SCREEN ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F5",
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
});
