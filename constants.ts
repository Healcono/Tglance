import { QuizQuestion, GameQuestion, Scenario, FlashcardItem, TheoryItem, GlossaryItem } from './types.ts';

export const THEORY_CATEGORIES = {
  individual: {
    title: "Individual (Intrapersonal) Level Theories",
    description: "These theories focus on individual characteristics such as knowledge, attitudes, beliefs, and personality traits that influence behavior.",
    items: [
      {
        title: "Health Belief Model (HBM)",
        description: "Addresses an individual's perceptions of the threat posed by a health problem, the benefits of avoiding the threat, and factors influencing the decision to act.",
        concepts: ["Perceived Susceptibility", "Perceived Severity", "Perceived Benefits", "Perceived Barriers", "Cues to Action", "Self-Efficacy"]
      },
      {
        title: "Stages of Change (Transtheoretical) Model",
        description: "Describes individuals' motivation and readiness to change a behavior as a process through five stages.",
        concepts: ["Precontemplation", "Contemplation", "Preparation", "Action", "Maintenance"]
      },
      {
        title: "Theory of Planned Behavior (TPB)",
        description: "Examines the relations between an individual’s beliefs, attitudes, intentions, behavior, and perceived control over that behavior. Assumes behavioral intention is the most important determinant of behavior.",
        concepts: ["Behavioral Intention", "Attitude", "Subjective Norm", "Perceived Behavioral Control"]
      },
      {
        title: "Precaution Adoption Process Model (PAPM)",
        description: "Names seven stages in an individual’s journey from awareness to action. Useful for hazards that have recently been recognized or precautions that are newly available.",
        concepts: ["Unaware of Issue", "Unengaged by Issue", "Deciding About Acting", "Decided Not to Act", "Decided to Act", "Acting", "Maintenance"]
      }
    ] as TheoryItem[]
  },
  interpersonal: {
    title: "Interpersonal Level Theories",
    description: "These theories assume individuals exist within and are influenced by their social environment.",
    items: [
      {
        title: "Social Cognitive Theory (SCT)",
        description: "Describes a dynamic process where personal factors, environmental factors, and human behavior exert influence upon each other (reciprocal determinism).",
        concepts: ["Reciprocal Determinism", "Behavioral Capability", "Expectations", "Self-Efficacy", "Observational Learning (Modeling)", "Reinforcements"]
      }
    ] as TheoryItem[]
  },
  community: {
    title: "Community Level Theories",
    description: "These models explore how social systems function and change.",
    items: [
      {
        title: "Community Organization & Other Participatory Models",
        description: "Emphasizes community-driven approaches to assessing and solving health and social problems.",
        concepts: ["Empowerment", "Community Capacity", "Participation", "Relevance", "Issue Selection", "Critical Consciousness"]
      },
      {
        title: "Diffusion of Innovations Theory",
        description: "Addresses how new ideas, products, and social practices spread within an organization, community, or society.",
        concepts: ["Innovation", "Communication Channels", "Social System", "Time", "Relative Advantage", "Compatibility", "Complexity", "Trialability", "Observability"]
      }
    ] as TheoryItem[]
  }
};

export const PLANNING_MODELS = [
  {
    title: "Social Marketing",
    description: "Uses marketing techniques to influence the voluntary behavior of target audience members for health benefit.",
    concepts: ["Product", "Price", "Place", "Promotion"]
  },
  {
    title: "PRECEDE-PROCEED Model",
    description: "A comprehensive planning model that guides planners through a process starting with desired outcomes and working backward to identify strategies.",
    concepts: ["Predisposing Factors", "Enabling Factors", "Reinforcing Factors"]
  }
];

export const QUIZ_DATA: QuizQuestion[] = [
  {type: "mcq", question: "Which of the following is NOT a core construct of the Health Belief Model?", options: ["Perceived Susceptibility", "Self-Efficacy", "Subjective Norm", "Perceived Barriers"], answer: "Subjective Norm", feedback: "Subjective Norm is a core construct of the Theory of Planned Behavior, not the Health Belief Model."},
  {type: "truefalse", question: "The 'Action' stage in the Stages of Change Model means an individual has maintained a behavior change for more than six months.", answer: false, feedback: "False. The 'Action' stage is when an individual has changed behavior for less than six months. 'Maintenance' is for more than six months."},
  {type: "identifyFigure", question: "A model that describes behavior change as a process through Precontemplation, Contemplation, Preparation, Action, and Maintenance is known as:", options: ["Health Belief Model", "Stages of Change Model", "Social Cognitive Theory", "Theory of Planned Behavior"], answer: "Stages of Change Model", feedback: "This describes the Stages of Change (Transtheoretical) Model."},
  {type: "mcq", question: "Which theory emphasizes 'Reciprocal Determinism' - the dynamic interplay between personal factors, behavior, and the environment?", options: ["Theory of Planned Behavior", "Social Cognitive Theory", "Stages of Change Model", "Precaution Adoption Process Model"], answer: "Social Cognitive Theory", feedback: "Social Cognitive Theory, by Albert Bandura, highlights reciprocal determinism as a core concept."},
  {type: "truefalse", question: "In Diffusion of Innovations theory, 'Laggards' are among the first to adopt a new idea or product.", answer: false, feedback: "False. 'Laggards' are the last group to adopt an innovation. 'Innovators' are the first."},
  {type: "mcq", question: "The 'Four Ps' (Product, Price, Place, Promotion) are central to which planning model?", options: ["PRECEDE-PROCEED", "Social Marketing", "Diffusion of Innovations", "Community Organization"], answer: "Social Marketing", feedback: "The Four Ps are the core components of the marketing mix in Social Marketing."},
  {type: "truefalse", question: "Predisposing, Enabling, and Reinforcing factors are key diagnostic categories in the Social Cognitive Theory.", answer: false, feedback: "False. Predisposing, Enabling, and Reinforcing factors are key diagnostic categories in the PRECEDE-PROCEED model."},
  {type: "identifyFigure", question: "A construct representing an individual's belief in their capability to successfully execute a specific behavior is called:", options: ["Perceived Threat", "Self-Efficacy", "Cues to Action", "Observational Learning"], answer: "Self-Efficacy", feedback: "Self-Efficacy is a key construct in several theories, including the Health Belief Model and Social Cognitive Theory."},
  {type: "mcq", question: "Which construct of the Health Belief Model refers to an individual's opinion of the chances of getting a condition?", options: ["Perceived Severity", "Perceived Benefits", "Perceived Susceptibility", "Cues to Action"], answer: "Perceived Susceptibility", feedback: "Perceived Susceptibility is about one's belief in the likelihood of experiencing a health issue."},
  {type: "truefalse", question: "The Precaution Adoption Process Model (PAPM) suggests that individuals always move linearly through its stages without ever moving backward.", answer: false, feedback: "False. While individuals generally progress through stages in PAPM, they can move backward from some later stages to earlier ones (though not typically back to unawareness once aware)."},
  {type: "mcq", question: "In the Theory of Planned Behavior (TPB), what is considered the most immediate predictor of behavior?", options: ["Attitude towards the behavior", "Subjective Norm", "Perceived Behavioral Control", "Behavioral Intention"], answer: "Behavioral Intention", feedback: "Behavioral Intention is the most direct determinant of behavior in the TPB."}
];

export const GAME_QUESTIONS: GameQuestion[] = [
  { question: "This theory focuses on an individual's perception of threat (susceptibility & severity) and the pros/cons of taking action.", options: ["Theory of Planned Behavior", "Health Belief Model", "Social Cognitive Theory"], answer: "Health Belief Model" },
  { question: "If a program aims to change behavior by influencing attitudes, subjective norms, and perceived behavioral control, it's likely based on:", options: ["Stages of Change", "Diffusion of Innovations", "Theory of Planned Behavior"], answer: "Theory of Planned Behavior" },
  { question: "The concept of 'self-efficacy' is central to which of these theories?", options: ["Precaution Adoption Process Model", "Social Cognitive Theory", "Community Organization"], answer: "Social Cognitive Theory" },
  { question: "Which model describes behavior change as a progression through stages like Precontemplation and Action?", options: ["Health Belief Model", "Transtheoretical Model (Stages of Change)", "Social Marketing"], answer: "Transtheoretical Model (Stages of Change)" },
  { question: "Understanding how new ideas or practices spread through a population is the core of:", options: ["Diffusion of Innovations Theory", "PRECEDE-PROCEED", "Social Cognitive Theory"], answer: "Diffusion of Innovations Theory" }
];

export const SCENARIOS: Scenario[] = [
  {
      scenario: "A community health worker wants to encourage older adults in a low-income neighborhood to get annual flu shots. Many residents express fear of side effects, don't believe they are at high risk, or find it difficult to get to the clinic.",
      options: ["Social Cognitive Theory", "Health Belief Model", "Diffusion of Innovations Theory", "Community Organization Model"],
      answer: "Health Belief Model",
      feedback: "The Health Belief Model is most appropriate as it directly addresses perceived susceptibility, severity, benefits (of the shot), barriers (fear, access), and cues to action to motivate individuals."
  },
  {
      scenario: "A school wants to implement a new anti-bullying program. They need a strategy to ensure teachers adopt the new curriculum, students understand and practice respectful behaviors, and the school environment supports these changes.",
      options: ["Theory of Planned Behavior", "Stages of Change Model", "Social Cognitive Theory", "PRECEDE-PROCEED Model"],
      answer: "Social Cognitive Theory",
      feedback: "SCT is suitable here because it considers the interplay of personal factors (student/teacher beliefs), environmental factors (school policies, peer influence), and behavior (anti-bullying actions, teaching methods). Observational learning and self-efficacy are key."
  },
  {
      scenario: "A public health department aims to reduce smoking rates among young adults (18-25). They plan a multi-faceted campaign involving media ads, policy changes for smoke-free public spaces, and peer education programs.",
      options: ["Health Belief Model", "Social Marketing", "PRECEDE-PROCEED Model", "Transtheoretical Model"],
      answer: "PRECEDE-PROCEED Model", 
      feedback: "The PRECEDE-PROCEED model provides a comprehensive framework for planning such a multi-level intervention, starting with social and epidemiological assessment and working through behavioral, environmental, educational, and policy factors."
  },
  {
      scenario: "A company wants to increase employee participation in its wellness program, which includes gym access and nutrition workshops. Current participation is low, despite employees saying they value health.",
      options: ["Diffusion of Innovations", "Theory of Planned Behavior", "Social Marketing", "Health Belief Model"],
      answer: "Social Marketing",
      feedback: "Social Marketing would be effective here to understand the 'price' (barriers like time, inconvenience), improve the 'product' (program offerings), ensure 'place' (accessibility), and enhance 'promotion' to better meet employee needs and motivations."
  },
  {
      scenario: "A new, highly effective, but somewhat complex water purification tablet is being introduced to a rural community with limited access to clean water. The goal is widespread adoption.",
      options: ["Stages of Change Model", "Diffusion of Innovations Theory", "Social Cognitive Theory", "Precaution Adoption Process Model"],
      answer: "Diffusion of Innovations Theory",
      feedback: "Diffusion of Innovations is ideal for understanding how to promote the adoption of a new product (the tablet) by considering its relative advantage, compatibility, complexity, trialability, and observability, and by identifying different adopter categories."
  }
];

export const FLASHCARDS: FlashcardItem[] = [
  { term: "Self-Efficacy", definition: "An individual's belief in their capability to successfully execute a specific behavior. (Key in HBM & SCT)", relatedTheory: "Health Belief Model, Social Cognitive Theory" },
  { term: "Perceived Susceptibility", definition: "An individual's assessment of their risk of getting a condition/disease. (Key in HBM)", relatedTheory: "Health Belief Model" },
  { term: "Stages of Change", definition: "Model: Precontemplation, Contemplation, Preparation, Action, Maintenance. (Transtheoretical Model)", relatedTheory: "Transtheoretical Model" },
  { term: "Reciprocal Determinism", definition: "Dynamic interaction of person, behavior, and environment. (Key in SCT)", relatedTheory: "Social Cognitive Theory" },
  { term: "Subjective Norm", definition: "Perception of social normative pressures regarding a behavior. (Key in TPB)", relatedTheory: "Theory of Planned Behavior" },
  { term: "Diffusion of Innovations", definition: "Process by which an innovation spreads through a social system." , relatedTheory: "Diffusion of Innovations Theory"},
  { term: "Social Marketing", definition: "Using marketing principles for health behavior change (4 Ps: Product, Price, Place, Promotion)." , relatedTheory: "Social Marketing (Approach)"},
  { term: "Cues to Action", definition: "Factors that activate 'readiness to change'. (Key in HBM)", relatedTheory: "Health Belief Model"},
  { term: "Observational Learning", definition: "Learning by watching others' actions and outcomes. (Key in SCT)", relatedTheory: "Social Cognitive Theory"},
  { term: "Predisposing Factors", definition: "Factors providing rationale/motivation for behavior (e.g., knowledge, beliefs). (PRECEDE-PROCEED)", relatedTheory: "PRECEDE-PROCEED Model"},
  { term: "Enabling Factors", definition: "Factors allowing motivation to be realized (e.g., resources, skills). (PRECEDE-PROCEED)", relatedTheory: "PRECEDE-PROCEED Model"},
  { term: "Reinforcing Factors", definition: "Factors following behavior that provide reward/incentive (e.g., social support). (PRECEDE-PROCEED)", relatedTheory: "PRECEDE-PROCEED Model"},
  { term: "Behavioral Intention", definition: "The perceived likelihood of performing a behavior. (Key in TPB)", relatedTheory: "Theory of Planned Behavior"},
  { term: "Community Capacity", definition: "Characteristics of a community that affect its ability to identify, mobilize, and address problems.", relatedTheory: "Community Organization"},
  { term: "Empowerment", definition: "A social action process through which people gain mastery over their lives and communities.", relatedTheory: "Community Organization"}
];

export const GLOSSARY: GlossaryItem[] = [
  { term: "Theory", definition: "A set of interrelated concepts, definitions, and propositions that presents a systematic view of events or situations by specifying relations among variables in order to explain and predict the events or situations." },
  { term: "Concepts", definition: "The major components of a theory; its building blocks." },
  { term: "Constructs", definition: "Concepts that have been developed and defined for use in a particular theory. They are the key components of a theory." },
  { term: "Variables", definition: "The operational forms of constructs; they define how a construct is to be measured in a specific situation." },
  { term: "Model", definition: "A composite, a mixture of ideas or concepts taken from any number of theories and used together. Models help us understand a specific problem in a particular setting or context." },
  { term: "Self-Efficacy (HBM & SCT)", definition: "An individual's belief in their capability to successfully execute a specific behavior required to produce desired outcomes." },
  { term: "Perceived Susceptibility (HBM)", definition: "An individual's assessment of their risk of getting the condition/disease." },
  { term: "Perceived Severity (HBM)", definition: "An individual's assessment of the seriousness of the condition, or of its potential consequences." },
  { term: "Perceived Benefits (HBM)", definition: "An individual's assessment of the positive consequences of adopting the recommended behavior." },
  { term: "Perceived Barriers (HBM)", definition: "An individual's assessment of the obstacles to behavior change." },
  { term: "Cues to Action (HBM)", definition: "External events that prompt a desire to make a health change." },
  { term: "Stages of Change (Transtheoretical Model)", definition: "A model describing health behavior change as a process involving movement through five stages: Precontemplation, Contemplation, Preparation, Action, and Maintenance." },
  { term: "Behavioral Intention (TPB)", definition: "The perceived likelihood of performing the behavior. It is considered the most important determinant of behavior in the Theory of Planned Behavior." },
  { term: "Attitude (TPB)", definition: "An individual's positive or negative evaluation of performing the behavior." },
  { term: "Subjective Norm (TPB)", definition: "An individual's perception of social normative pressures, or relevant others' beliefs that they should or should not perform such behavior." },
  { term: "Perceived Behavioral Control (TPB)", definition: "An individual's perceived ease or difficulty of performing the particular behavior." },
  { term: "Reciprocal Determinism (SCT)", definition: "The dynamic interaction of the person, behavior, and the environment in which the behavior is performed; each factor influences the others." },
  { term: "Observational Learning (Modeling) (SCT)", definition: "Behavioral acquisition that occurs by watching the actions and outcomes of others' behavior." },
  { term: "Empowerment (Community Organization)", definition: "A social action process through which people gain mastery over their lives and their communities." },
  { term: "Community Capacity (Community Organization)", definition: "Characteristics of a community that affect its ability to identify, mobilize around, and address problems." },
  { term: "Diffusion of Innovations", definition: "The process by which an innovation is communicated through certain channels over time among the members of a social system." },
  { term: "Social Marketing", definition: "The application of commercial marketing principles and techniques to influence the voluntary behavior of target audiences in order to improve their health or societal well-being." },
  { term: "PRECEDE-PROCEED Model", definition: "A comprehensive structure for assessing health needs for designing, implementing, and evaluating health promotion and other public health programs to meet those needs." },
  { term: "Predisposing Factors (PRECEDE-PROCEED)", definition: "Antecedent factors that provide the rationale or motivation for the behavior, such as knowledge, attitudes, beliefs, personal preferences, existing skills, and self-efficacy beliefs." },
  { term: "Enabling Factors (PRECEDE-PROCEED)", definition: "Antecedent factors to behavior that allow a motivation to be realized, such as the availability of health resources, accessibility, laws, and government policies." },
  { term: "Reinforcing Factors (PRECEDE-PROCEED)", definition: "Factors following a behavior that provide the continuing reward or incentive for the persistence or repetition of the behavior, such as social support, peer influence, and significant others." }
];