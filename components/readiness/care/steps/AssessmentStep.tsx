'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Users, Brain, Rocket, TrendingUp, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AssessmentData } from '../CAREAssessmentWizard';

interface AssessmentStepProps {
  data: AssessmentData;
  updateData: (updates: Partial<AssessmentData>) => void;
  onBack: () => void;
  onContinue: () => void;
}

type Category = 'culture' | 'adoption' | 'readiness' | 'evolution';

interface Question {
  id: string;
  category: Category;
  text: string;
  options: string[];
}

const questions: Question[] = [
  // CULTURE QUESTIONS
  {
    id: 'C1',
    category: 'culture',
    text: 'How confident and aligned is your leadership in making AI-related decisions?',
    options: [
      'Not confident or aligned at all',
      'Some confidence, but not aligned',
      'Confident but decisions vary by team',
      'Very confident and aligned across leadership',
    ],
  },
  {
    id: 'C2',
    category: 'culture',
    text: "What best describes your organization's mindset and openness toward AI experimentation?",
    options: [
      'Fearful and resistant to AI tools',
      'Cautiously curious and limited trials',
      'Optimistic and some informal usage',
      'Actively encouraging and investing in experimentation',
    ],
  },
  {
    id: 'C3',
    category: 'culture',
    text: 'How well is AI considered part of your strategic direction across teams?',
    options: [
      'No clear understanding or direction',
      'A few informal discussions have occurred',
      'Some teams are becoming aware',
      'Clear, shared vision integrated into strategy',
    ],
  },
  // ADOPTION QUESTIONS
  {
    id: 'A1',
    category: 'adoption',
    text: 'How is AI currently being used across your organization?',
    options: [
      'Not used at all',
      'Informally by individuals',
      'Piloted within select teams',
      'Formally integrated into key workflows',
    ],
  },
  {
    id: 'A2',
    category: 'adoption',
    text: 'What governance or guidelines exist for AI usage?',
    options: [
      'No policies or oversight',
      'Guidelines are being discussed or drafted',
      'Informal guidance followed by teams',
      'Formal policies are implemented and enforced',
    ],
  },
  {
    id: 'A3',
    category: 'adoption',
    text: 'How proactive are your teams in piloting and auditing AI tools?',
    options: [
      'No active efforts or tracking',
      'One or two teams experimenting casually',
      'Pilots exist with occasional reviews',
      'Several teams piloting with regular audits',
    ],
  },
  // READINESS QUESTIONS
  {
    id: 'R1',
    category: 'readiness',
    text: 'How comfortable are employees with using and understanding AI tools?',
    options: [
      'Not familiar at all',
      'Some basic awareness',
      'Comfortable with common tools',
      'Proficient and confident across functions',
    ],
  },
  {
    id: 'R2',
    category: 'readiness',
    text: 'What kind of AI training has been made available to your teams?',
    options: [
      'No training offered',
      'Some informal or self-led learning',
      'Occasional structured workshops',
      'Ongoing formal training programs',
    ],
  },
  {
    id: 'R3',
    category: 'readiness',
    text: 'Who drives AI-related decisions and how empowered are employees to explore AI?',
    options: [
      'No decision-making structure or support',
      'Individual teams explore quietly',
      'Leadership directs with some team freedom',
      'Company-wide support and shared decision-making',
    ],
  },
  // EVOLUTION QUESTIONS
  {
    id: 'E1',
    category: 'evolution',
    text: 'Has your organization begun rethinking its business model or customer experience using AI?',
    options: [
      'Not considered yet',
      'Early internal discussions',
      'Piloting new AI-based approaches',
      'Transformation plans are underway',
    ],
  },
  {
    id: 'E2',
    category: 'evolution',
    text: 'How actively do you monitor AI trends among competitors and the industry?',
    options: [
      'Not tracked at all',
      'Occasionally read industry news',
      'Tracked by some internal teams',
      'Closely monitored with internal reports/alerts',
    ],
  },
  {
    id: 'E3',
    category: 'evolution',
    text: 'Do you have a roadmap for scaling AI and embedding it into your future?',
    options: [
      'No roadmap exists',
      'In early planning stages',
      'Roadmap exists but underused',
      'Roadmap is active and aligned with strategy',
    ],
  },
];

const categoryConfig = {
  culture: {
    icon: Users,
    title: 'Culture',
    subtitle: 'Organizational mindset & leadership alignment',
    color: 'text-blue-600',
    bgColor: 'bg-blue-500',
    lightBg: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  adoption: {
    icon: Brain,
    title: 'Adoption',
    subtitle: 'Current AI usage & governance',
    color: 'text-amber-600',
    bgColor: 'bg-amber-500',
    lightBg: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  readiness: {
    icon: Rocket,
    title: 'Readiness',
    subtitle: 'Skills, training & empowerment',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500',
    lightBg: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  evolution: {
    icon: TrendingUp,
    title: 'Evolution',
    subtitle: 'Future vision & strategic planning',
    color: 'text-purple-600',
    bgColor: 'bg-purple-500',
    lightBg: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
};

const AssessmentStep = ({ data, updateData, onBack, onContinue }: AssessmentStepProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Build responses object from all category data
  const getResponses = (): Record<string, number> => {
    return {
      ...Object.entries(data.culture).reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {}),
      ...Object.entries(data.adoption).reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {}),
      ...Object.entries(data.readiness).reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {}),
      ...Object.entries(data.evolution).reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {}),
    };
  };

  const responses = getResponses();
  const currentQuestion = questions[currentIndex];

  // Guard against undefined question
  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <p className="text-muted-foreground">Loading questions...</p>
      </div>
    );
  }

  const config = categoryConfig[currentQuestion.category];
  const Icon = config.icon;

  // Check if switching to a new category
  const prevCategory = currentIndex > 0 ? questions[currentIndex - 1]?.category : null;
  const isNewCategory = prevCategory !== currentQuestion.category;

  const progress = ((currentIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(responses).length;
  const allQuestionsAnswered = answeredCount >= questions.length;

  const handleAnswer = (optionIndex: number) => {
    const category = currentQuestion.category;
    const updatedCategory = {
      ...data[category],
      [currentQuestion.id]: optionIndex,
    };
    updateData({ [category]: updatedCategory });

    // Auto-advance after a brief delay
    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setDirection(1);
        setCurrentIndex((prev) => prev + 1);
      }, 400);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < questions.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const getCurrentValue = () => {
    return responses[currentQuestion.id];
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="max-w-2xl mx-auto pb-40 px-4 sm:px-0" role="region" aria-label="Assessment questions">
      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-2">
          <span aria-live="polite">Question {currentIndex + 1} of {questions.length}</span>
          <span>{answeredCount} answered</span>
        </div>
        <Progress
          value={progress}
          className="h-2"
          aria-label={`Question progress: ${Math.round(progress)}%`}
        />
      </div>

      {/* Category Header - Shows when entering new category */}
      <AnimatePresence mode="wait">
        {isNewCategory && (
          <motion.div
            key={`category-${currentQuestion.category}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`${config.lightBg} ${config.borderColor} border rounded-xl p-4 mb-6`}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${config.bgColor} rounded-xl flex items-center justify-center`} aria-hidden="true">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className={`text-base sm:text-lg font-bold ${config.color}`}>{config.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{config.subtitle}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question Card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentQuestion.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Card className={`border-2 ${config.borderColor}`}>
            <CardContent className="p-4 sm:p-6 md:p-8">
              {/* Category Badge */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.lightBg} mb-4 sm:mb-6`}>
                <Icon className={`w-4 h-4 ${config.color}`} aria-hidden="true" />
                <span className={`text-xs sm:text-sm font-medium ${config.color}`}>
                  {config.title}
                </span>
              </div>

              {/* Question Text */}
              <h3
                className="text-lg sm:text-xl md:text-2xl font-semibold text-primary mb-6 sm:mb-8 leading-relaxed"
                id={`question-${currentQuestion.id}`}
              >
                {currentQuestion.text}
              </h3>

              {/* Options */}
              <RadioGroup
                value={getCurrentValue()?.toString() ?? ''}
                onValueChange={(val) => handleAnswer(parseInt(val))}
                className="space-y-3"
                aria-labelledby={`question-${currentQuestion.id}`}
              >
                {currentQuestion.options.map((option, index) => {
                  const isSelected = getCurrentValue() === index;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Label
                        htmlFor={`${currentQuestion.id}-${index}`}
                        className={`flex items-start space-x-3 p-3 sm:p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 min-h-[56px] ${
                          isSelected
                            ? `${config.borderColor} ${config.lightBg}`
                            : 'border-border hover:bg-muted/50'
                        }`}
                        data-track={`answer-${currentQuestion.id}-${index}`}
                      >
                        <RadioGroupItem
                          value={index.toString()}
                          id={`${currentQuestion.id}-${index}`}
                          className="mt-0.5 min-w-[20px] min-h-[20px]"
                        />
                        <span className="flex-1 text-sm sm:text-base leading-relaxed">
                          {option}
                        </span>
                      </Label>
                    </motion.div>
                  );
                })}
              </RadioGroup>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Sticky Navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        aria-label="Assessment navigation"
      >
        <div className="max-w-2xl mx-auto px-4 py-4">
          {/* Completion status */}
          {allQuestionsAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 text-sm text-emerald-600 font-medium mb-3"
            >
              <CheckCircle2 className="w-4 h-4" />
              All questions answered!
            </motion.div>
          )}

          {/* Question Navigation Row */}
          <div className="flex justify-between items-center mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className="gap-1 min-h-[36px]"
              aria-label="Go to previous question"
              data-track="question-previous"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Prev</span>
            </Button>

            {/* Question Dots */}
            <div className="flex gap-1 flex-wrap justify-center max-w-[200px]" role="tablist" aria-label="Question navigation dots">
              {questions.map((q, idx) => {
                const isAnswered = responses[q.id] !== undefined;
                const isCurrent = idx === currentIndex;
                const qConfig = categoryConfig[q.category];

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
                      isCurrent
                        ? qConfig.bgColor
                        : isAnswered
                        ? 'bg-secondary'
                        : 'bg-muted'
                    }`}
                    aria-label={`Go to question ${idx + 1}${isAnswered ? ' (answered)' : ''}`}
                    aria-current={isCurrent ? 'true' : undefined}
                    role="tab"
                  />
                );
              })}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={goToNext}
              disabled={currentIndex === questions.length - 1}
              className="gap-1 min-h-[36px]"
              aria-label={currentIndex === questions.length - 1 ? 'Finished with questions' : 'Skip to next question'}
              data-track="question-next"
            >
              <span className="hidden sm:inline">Skip</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>

          {/* Step Navigation Row */}
          <div className="flex justify-between items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="gap-2 min-h-[44px] min-w-[100px]"
              aria-label="Go back to company info"
              data-track="assessment-back"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back
            </Button>

            <Button
              onClick={onContinue}
              disabled={!allQuestionsAnswered}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] min-w-[140px]"
              aria-label={allQuestionsAnswered ? 'Continue to next step' : `Answer ${questions.length - answeredCount} more questions to continue`}
              data-track="assessment-continue"
            >
              Continue
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AssessmentStep;
