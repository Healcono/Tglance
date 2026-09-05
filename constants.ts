import { QuizQuestion, GameQuestion, Scenario, FlashcardItem, TheoryItem, GlossaryItem, Badge } from './types';

export const COMPREHENSIVE_THEORIES: TheoryItem[] = [
  // --- INDIVIDUAL LEVEL ---
  {
    id: 'hbm',
    title: 'Health Belief Model (HBM)',
    shortName: 'HBM',
    category: 'individual',
    originYear: '1950s (Hochbaum, Rosenstock, Kegels)',
    keyTheorists: 'Godfrey Hochbaum, Irwin Rosenstock, Marshall Becker, Victoria Champion',
    description: 'A value-expectancy model explaining why individuals engage in health-related actions based on perceived threats and expected net benefits of action.',
    corePremise: 'People will take action to prevent, screen for, or control a condition if they perceive themselves vulnerable to a severe threat and believe that the benefits of action outweigh the costs or barriers.',
    constructs: [
      {
        name: 'Perceived Susceptibility',
        definition: 'Beliefs about the personal likelihood of acquiring a disease or harmful condition.',
        measurementExample: 'Rate agreement (1-5): "My chances of developing colorectal cancer in the next 10 years are high."',
        interventionStrategy: 'Define target population at risk, personalize risk assessments based on individual genetics or lifestyle habits.'
      },
      {
        name: 'Perceived Severity',
        definition: 'Beliefs about the seriousness of contracting an illness and its potential medical/social consequences.',
        measurementExample: 'Rate agreement: "If I got diabetes, it would severely disrupt my daily life and work."',
        interventionStrategy: 'Specify clinical consequences (pain, disability, death) and social impacts (family burden, loss of independence).'
      },
      {
        name: 'Perceived Benefits',
        definition: 'Beliefs in the efficacy of the advised action to reduce risk or seriousness of impact.',
        measurementExample: 'Rate agreement: "Getting an annual mammogram will help detect breast cancer early when it is treatable."',
        interventionStrategy: 'Explain positive outcomes, how and when to take action, and provide clear evidence of effectiveness.'
      },
      {
        name: 'Perceived Barriers',
        definition: 'Beliefs about the tangible and psychological costs of the advised action (the single most powerful predictor across meta-analyses).',
        measurementExample: 'Rate agreement: "Getting a colonoscopy is too embarrassing, painful, or costly for me."',
        interventionStrategy: 'Identify and reduce obstacles through reassurance, correction of misinformation, financial assistance, and convenience.'
      },
      {
        name: 'Cues to Action',
        definition: 'Internal (symptoms) or external (physician recommendation, media, reminders) triggers that prompt readiness to act.',
        measurementExample: 'Checklist: "Has your doctor specifically advised you to get an HPV vaccine during the past 6 months?"',
        interventionStrategy: 'Provide automated appointment reminders, clinical decision prompts, public health banners, and peer cues.'
      },
      {
        name: 'Self-Efficacy',
        definition: 'Confidence in one\'s ability to successfully execute the specific recommended action (added by Rosenstock, Strecher, & Becker, 1988).',
        measurementExample: 'Rate certainty: "How certain are you that you could arrange transportation and take the screening test?"',
        interventionStrategy: 'Provide progressive goal setting, guided modeling, verbal reinforcement, and reduce anxiety.'
      }
    ],
    empiricalSupport: 'Meta-analyses (Janz & Becker 1984; Carpenter 2010; Harrison et al. 1992) consistently show Perceived Barriers is the strongest single predictor, followed by Perceived Benefits and Susceptibility. Strong evidence in cancer screening (mammography, FOBT/colonoscopy) and vaccination (HPV, influenza).',
    classicApplications: [
      'Colorectal Cancer Screening: Tablet-based computer-tailored intervention "Colon Testing: Celebrate Life for Years to Come" (Rawl, Skinner, et al., 2012).',
      'HPV Vaccine Uptake among adolescents and young adults (Brewer et al., 2011; Gerend & Shepherd, 2012).'
    ],
    strengths: [
      'Parsimonious and intuitive constructs readily operationalized in survey instruments.',
      'Highly effective for one-time or periodic detection/prevention behaviors (screenings, immunizations).',
      'Excellent for tailoring personalized educational messages.'
    ],
    limitations: [
      'Does not adequately account for emotional factors (e.g., fear, anxiety) or habitual/addictive behaviors.',
      'Less predictive of long-term lifestyle maintenance (e.g., diet, exercise) compared to stage or social cognitive models.'
    ]
  },
  {
    id: 'tpb_ibm',
    title: 'Theory of Planned Behavior (TPB) & Integrated Behavioral Model (IBM)',
    shortName: 'TPB / IBM',
    category: 'individual',
    originYear: '1975 (TRA), 1991 (TPB - Ajzen), 2000s (IBM - Fishbein et al.)',
    keyTheorists: 'Martin Fishbein, Icek Ajzen, Danuta Kasprzyk, Daniel E. Montaño',
    description: 'An expectancy-value framework positing that behavioral intention is the most direct determinant of behavior, shaped by attitudes, perceived norms, and personal agency.',
    corePremise: 'Behavior is most likely when intention is strong, accompanied by necessary knowledge/skills, high salience, minimal environmental constraints, and prior habit.',
    constructs: [
      {
        name: 'Behavioral Intention',
        definition: 'Perceived likelihood or subjective readiness of performing the behavior (the immediate precursor to action).',
        measurementExample: 'Rate on -3 to +3 scale: "I intend to use a condom every time I have sex in the next 3 months."',
        interventionStrategy: 'Strengthen underlying attitudes, normative beliefs, and personal agency.'
      },
      {
        name: 'Attitude (Experiential & Instrumental)',
        definition: 'Overall evaluation of performing the behavior. Experiential attitude reflects emotional/affective response; Instrumental reflects cognitive beliefs about outcomes.',
        measurementExample: 'Semantic differentials: Pleasant-Unpleasant (affective) and Wise-Foolish / Beneficial-Harmful (instrumental).',
        interventionStrategy: 'Provide persuasive evidence on positive outcomes and address negative experiential beliefs.'
      },
      {
        name: 'Perceived Norm (Injunctive & Descriptive)',
        definition: 'Social pressure felt to perform or not perform the behavior. Injunctive refers to what important others approve; Descriptive refers to what others actually do.',
        measurementExample: 'Injunctive: "My closest friends think I should get vaccinated." Descriptive: "Most people like me get vaccinated."',
        interventionStrategy: 'Highlight social approval and correct overestimations/underestimations of peer behavior.'
      },
      {
        name: 'Personal Agency (Perceived Control & Self-Efficacy)',
        definition: 'Perceived control reflects external ease/difficulty; Self-efficacy reflects confidence to overcome specific obstacles.',
        measurementExample: 'Rate ease: "Getting 150 minutes of exercise per week is under my control" and confidence under barriers.',
        interventionStrategy: 'Teach barrier management skills, problem-solving, and remove environmental hurdles.'
      }
    ],
    empiricalSupport: 'Supported by hundreds of meta-analyses (Armitage & Conner, 2001; Albarracín et al., 2001; McEachan et al., 2011). Intention consistently explains 30-40% of variance in deliberative health behaviors (condom use, seatbelts, exercise).',
    classicApplications: [
      'Zimbabwe Adult Male Circumcision & Condom Use (Montaño, Kasprzyk, et al., 2014) utilizing formative elicitation and regression models.',
      'Project RESPECT for sexually transmitted disease prevention (Rhodes et al., 2007; Kamb et al., 1998).'
    ],
    strengths: [
      'Strong mathematical and methodological foundation with precise elicitation protocols.',
      'Distinguishes between attitudinal control, normative control, and agency control for tailored campaigns.',
      'IBM adds crucial real-world moderators: skills, environment, and habit.'
    ],
    limitations: [
      'The "intention-behavior gap": strong intentions do not always translate into action without implementation planning.',
      'Requires substantial formative qualitative elicitation before survey construction.'
    ]
  },
  {
    id: 'ttm',
    title: 'Transtheoretical Model (TTM) & Stages of Change',
    shortName: 'TTM',
    category: 'individual',
    originYear: '1979-1983 (Prochaska & DiClemente)',
    keyTheorists: 'James O. Prochaska, Carlo C. DiClemente, Wayne F. Velicer, Colleen A. Redding',
    description: 'An integrative, stage-ordered model explaining health behavior change as a temporal journey unfolding across six qualitative stages mediated by 10 processes of change.',
    corePremise: 'Individuals are at different stages of readiness to change; interventions must be stage-matched rather than expecting everyone to be ready for immediate action.',
    constructs: [
      {
        name: 'Six Stages of Change',
        definition: 'Precontemplation (no intent in 6 mo), Contemplation (intent in 6 mo), Preparation (intent in 30 days + steps), Action (<6 mo active change), Maintenance (>6 mo), Termination (zero temptation, 100% confidence).',
        measurementExample: 'Staging algorithms: "Are you currently exercising regularly? No and I do not intend to (PC) / No but I intend to in 6 mo (C) / Yes for <6 mo (A) / Yes for >6 mo (M)"',
        interventionStrategy: 'Match strategies: consciousness raising for early stages; stimulus control and reinforcement for action stages.'
      },
      {
        name: 'Decisional Balance (Pros & Cons)',
        definition: 'Weighing the advantages (pros) and disadvantages (cons) of changing behavior. Strong principle: Pros increase ~1.0 SD from PC to Action. Weak principle: Cons decrease ~0.5 SD from PC to Action.',
        measurementExample: 'Rate importance of items reflecting benefits (feeling healthier) vs costs (missing social routines).',
        interventionStrategy: 'Increase pros (doubling focus on benefits) in early stages before attempting to minimize cons.'
      },
      {
        name: 'Processes of Change (10 Processes)',
        definition: 'Experiential: Consciousness raising, Dramatic relief, Environmental reevaluation, Self-reevaluation, Social liberation. Behavioral: Self-liberation, Helping relationships, Counterconditioning, Reinforcement management, Stimulus control.',
        measurementExample: 'Assess frequency of using specific cognitive or behavioral coping mechanisms.',
        interventionStrategy: 'Deploy cognitive/affective processes in PC/C/Prep, and behavioral techniques in Action/Maintenance.'
      },
      {
        name: 'Self-Efficacy vs Temptation',
        definition: 'Situation-specific confidence to resist relapse vs the intensity of urges across three key triggers: negative affect, positive social occasions, and cravings.',
        measurementExample: 'Rate temptation to smoke when anxious, at a party, or when smelling tobacco.',
        interventionStrategy: 'Develop coping planning for high-risk relapse triggers; celebrate incremental mastery.'
      }
    ],
    empiricalSupport: 'Meta-analyses across 48 behaviors and 120 datasets in 10 countries (Hall & Rossi, 2008) verified the mathematical Strong and Weak principles of progress. Widely validated in smoking cessation (Velicer et al., 2007) and multiple behavior change trials (Johnson et al., 2013).',
    classicApplications: [
      'Population-level smoking cessation trials with proactive outreach achieving 80-85% participation (Prochaska et al., 2001).',
      'Multiple Health Behavior Change (MHBC) interventions for exercise, diet, and stress management (Johnson et al., 2013).'
    ],
    strengths: [
      'Transforms population reach by engaging the 80% of individuals who are not yet in the Action stage.',
      'Provides an exact matching blueprint connecting specific change processes to specific stages.',
      'Proven in multiple randomized trials and digital health expert systems.'
    ],
    limitations: [
      'Stage boundaries (e.g. 6 months) can be somewhat arbitrary.',
      'Complex to assess all 15 constructs (stages, 10 processes, pros/cons, self-efficacy, temptation).'
    ]
  },

  // --- INTERPERSONAL LEVEL ---
  {
    id: 'sct',
    title: 'Social Cognitive Theory (SCT)',
    shortName: 'SCT',
    category: 'interpersonal',
    originYear: '1977 (Social Learning Theory) -> 1986 (SCT - Bandura)',
    keyTheorists: 'Albert Bandura, Cheryl L. Perry, Steven H. Kelder',
    description: 'Explains human behavior as a dynamic, triadic interaction of personal cognitive factors, environmental influences, and behavioral capabilities (Reciprocal Determinism).',
    corePremise: 'Individuals are neither driven solely by inner forces nor automatically shaped by environmental stimuli; they possess agency to learn through observation, self-regulate, and reshape their social environments.',
    constructs: [
      {
        name: 'Reciprocal Determinism',
        definition: 'The continuous, bidirectional interplay between personal cognitive factors, environmental contexts, and behavioral practices.',
        measurementExample: 'Examine how classroom nutrition education (cognition) alters cafeteria food choices (behavior) and prompts cafeteria policy changes (environment).',
        interventionStrategy: 'Simultaneously target cognitive mastery, role model demonstrations, and environmental modifications.'
      },
      {
        name: 'Observational Learning (Modeling)',
        definition: 'Acquisition of behavioral patterns by observing the actions and reinforced consequences of credible role models.',
        measurementExample: 'Assess exposure to and identification with peer leaders demonstrating resistance to tobacco.',
        interventionStrategy: 'Recruit relatable peer leaders, use narrative edutainment (telenovelas, dramas), and show positive reinforcement.'
      },
      {
        name: 'Behavioral Capability',
        definition: 'Knowledge of what to do combined with the practical skills required to execute the behavior.',
        measurementExample: 'CATCH GO/SLOW/WHOA food classification knowledge paired with meal preparation skill demonstration.',
        interventionStrategy: 'Provide didactic knowledge plus guided behavioral rehearsal, coaching, and immediate feedback.'
      },
      {
        name: 'Outcome Expectations & Values',
        definition: 'Anticipated physical, social, and self-evaluative consequences resulting from performing a behavior.',
        measurementExample: 'Assess expected social approval, physical vitality, and pride vs fatigue or injury.',
        interventionStrategy: 'Demonstrate real-world rewards and align recommended practices with personal internal values.'
      },
      {
        name: 'Collective Efficacy',
        definition: 'Belief in the shared capability of a group or community to organize and execute courses of action for the common good.',
        measurementExample: 'Assess school parent-teacher group confidence in banning sugary drinks campus-wide.',
        interventionStrategy: 'Establish shared goals, celebrate group milestones, and facilitate collaborative advocacy.'
      }
    ],
    empiricalSupport: 'Central to school health interventions worldwide (CATCH trial: Luepker et al., 1996; Hoelscher et al., 2010), adolescent tobacco prevention (Project MYTRI in India: Perry et al., 2009), and digital mHealth interventions (MobileMums: Fjeldsoe et al., 2012).',
    classicApplications: [
      'Child and Adolescent Trial for Cardiovascular Health (CATCH): multi-component school, cafeteria, PE, and family program (Luepker et al., 1996).',
      'Project MYTRI (Mobilizing Youth for Tobacco-Related Initiatives) in New Delhi and Chennai, India (Perry et al., 2009).'
    ],
    strengths: [
      'Comprehensive framework spanning cognitive, interpersonal, and physical environmental dimensions.',
      'Explains both individual skill acquisition and community-level social contagion.',
      'Provides actionable techniques (guided mastery, peer modeling, self-monitoring).'
    ],
    limitations: [
      'Broad scope can make complete empirical testing of all pathways challenging in a single study.',
      'Interventions require substantial multi-component resources (curricula, training, environment).'
    ]
  },
  {
    id: 'social_support_networks',
    title: 'Social Support, Social Networks & Health',
    shortName: 'SNT / Support',
    category: 'interpersonal',
    originYear: '1970s (Cobb, Cassell, Berkman & Syme, Valente)',
    keyTheorists: 'Julianne Holt-Lunstad, Bert N. Uchino, Thomas W. Valente, Lisa Berkman',
    description: 'Examines the structure of social relationships (Social Network Analysis) and the functional resources (emotional, tangible, informational, belonging) exchanged through these ties.',
    corePremise: 'Social connections have a direct and stress-buffering effect on health and longevity equivalent to or exceeding traditional biomedical risk factors (e.g. smoking, obesity).',
    constructs: [
      {
        name: 'Functional Support Dimensions',
        definition: 'Emotional (caring, empathy), Tangible/Instrumental (material aid, loans, physical help), Informational (advice, guidance), and Belonging (shared social activities).',
        measurementExample: 'Assess perceived availability: "If I needed financial or logistical help during an illness, someone in my network would provide it."',
        interventionStrategy: 'Train support partners in responsive, non-controlling assistance matched to recipient needs.'
      },
      {
        name: 'Perceived vs Received Support',
        definition: 'Perceived support (expectation that help is available) consistently protects health; Received support has complex effects and can induce stress if unresponsive.',
        measurementExample: 'Differentiate between believing help is accessible vs measuring actual frequency of received favors.',
        interventionStrategy: 'Foster confidence in network availability; utilize "invisible support" to avoid undermining autonomy.'
      },
      {
        name: 'Network Properties (SNA)',
        definition: 'Centrality (degree, closeness, betweenness), Homophily (similarity of ties), Transitivity (clustering of mutual friends), and Bridging across structural holes.',
        measurementExample: 'Map friendship nominations to identify opinion leaders and isolated peripheral members.',
        interventionStrategy: 'Recruit central opinion leaders as champions; bridge fragmented subgroups; rewire unsupportive ties.'
      }
    ],
    empiricalSupport: 'Meta-analysis of 148 longitudinal studies with 308,849 participants (Holt-Lunstad et al., 2010) established that strong social relationships confer a 50% increase in odds of survival (risk ratio equivalent to quitting 15 cigarettes/day).',
    classicApplications: [
      'Diabetes Peer Support vs Nurse Care randomized trial in Veterans Affairs clinics (Heisler et al., 2010).',
      'ASSIST (A Stop Smoking In Schools Trial) peer network opinion leader trial in UK schools (Hollingworth et al., 2012).'
    ],
    strengths: [
      'Robust biological and epidemiological mechanisms (HPA axis regulation, immune function, allostatic load).',
      'Mathematical algorithms in SNA allow objective sociometric mapping of communities and organizations.'
    ],
    limitations: [
      'Ambivalent or negative ties (conflict, social undermining) can exacerbate cardiovascular reactivity.',
      'Online social ties may not replicate the physiological benefits of face-to-face contact.'
    ]
  },
  {
    id: 'stress_coping',
    title: 'Transactional Model of Stress, Coping & Adaptation',
    shortName: 'Stress & Coping',
    category: 'interpersonal',
    originYear: '1984 (Lazarus & Folkman), 2000s (Folkman & Moskowitz)',
    keyTheorists: 'Richard S. Lazarus, Susan Folkman, Elaine Wethington, Bruce S. McEwen',
    description: 'A cognitive-relational model conceptualizing stress as a transaction between an individual and environmental demands mediated by primary and secondary appraisals.',
    corePremise: 'The health impact of a stressor depends on cognitive appraisal of threat and coping resources, mediated by problem-focused, emotion-focused, and meaning-based coping efforts.',
    constructs: [
      {
        name: 'Primary Appraisal',
        definition: 'Evaluation of the personal significance of an event as threatening, harmful, challenging, or benign.',
        measurementExample: 'Rate perceived threat of disease diagnosis or job loss on personal well-being.',
        interventionStrategy: 'Provide accurate diagnostic information to reduce catastrophic threat overestimation.'
      },
      {
        name: 'Secondary Appraisal',
        definition: 'Assessment of one\'s coping resources, perceived control over the stressor, and emotional self-regulation ability.',
        measurementExample: 'Evaluate perceived capacity: "I have the resources and support necessary to manage this treatment."',
        interventionStrategy: 'Bolster perceived control, self-efficacy, and provide tangible coping resources.'
      },
      {
        name: 'Coping Strategies (Problem vs Emotion vs Meaning)',
        definition: 'Problem-focused (active planning, problem solving), Emotion-focused (venting, distraction, denial), Meaning-based (positive reappraisal, spiritual beliefs, goal revision).',
        measurementExample: 'COPE or Ways of Coping Questionnaire subscale scores across stress encounters.',
        interventionStrategy: 'Teach flexible matching: problem-focused coping for controllable stressors; meaning-based and acceptance for uncontrollable ones.'
      },
      {
        name: 'Allostatic Load & Shift-and-Persist',
        definition: 'Allostatic load is the physiological wear-and-tear from chronic stress. Shift-and-persist is an adaptive coping style combining cognitive flexibility with persistent future orientation.',
        measurementExample: 'Composite biomarkers (salivary cortisol, blood pressure, inflammatory cytokines) across longitudinal trials.',
        interventionStrategy: 'Cultivate resilience, emotional mindfulness, and stress-buffering social ties.'
      }
    ],
    empiricalSupport: 'Extensively supported in chronic disease adaptation (cancer, heart disease, diabetes: Stanton et al., 2007) and health disparities research (Chen et al., 2012 on shift-and-persist in low-SES populations).',
    classicApplications: [
      'Nurse-Family Partnership prenatal and infancy home visitation trial mitigating chronic developmental stress (Eckenrode et al., 2010).',
      'Caregiver burden and psychological adjustment in chronic illness (Folkman & Moskowitz, 2000).'
    ],
    strengths: [
      'Direct integration with neuroendocrine pathways, biomarkers, and psychosomatic health.',
      'Explains why individuals in identical objective circumstances experience vastly different health trajectories.'
    ],
    limitations: [
      'Self-report coping inventories can suffer from retrospective recall bias.',
      'Chronic structural stressors (poverty, institutional racism) require macro policy change alongside individual coping.'
    ]
  },
  {
    id: 'interpersonal_communication',
    title: 'Interpersonal Communication in Health & Illness',
    shortName: 'Health Communication',
    category: 'interpersonal',
    originYear: '1990s-2010s (Street, Duggan, Epstein)',
    keyTheorists: 'Richard L. Street Jr., Ashley Duggan, Ronald M. Epstein, Debra Roter',
    description: 'A relational and task-driven framework explaining the pathways through which provider-patient communication directly and indirectly influences health outcomes.',
    corePremise: 'Effective clinician-patient interactions achieve two parallel goals: relational functions (healing trust, emotional validation) and task-driven functions (information exchange, shared decision-making, enabling self-management).',
    constructs: [
      {
        name: 'Six Key Communication Functions',
        definition: '1. Fostering healing relationships, 2. Validating/responding to emotions, 3. Exchanging/managing information, 4. Making treatment decisions (shared decision-making), 5. Enabling patient self-management, 6. Managing uncertainty.',
        measurementExample: 'Observational coding of patient participation and provider empathy in clinical consultations.',
        interventionStrategy: 'Train clinicians in open-ended elicitation, reflective listening, empathic opportunities, and autonomy support.'
      },
      {
        name: 'Proximal & Intermediate Pathways',
        definition: 'Proximal: Patient understanding, trust, rapport, feeling known. Intermediate: Treatment adherence, self-care skills, medical decision quality. Distal: Symptom control, survival, vitality.',
        measurementExample: 'Assess post-visit trust and track subsequent adherence to prescribed medications.',
        interventionStrategy: 'Create structured question prompt lists for patients and communication skills workshops for providers.'
      }
    ],
    empiricalSupport: 'Meta-analysis across 60 years of data (Zolnierek & DiMatteo, 2009) demonstrated a 19% higher risk of medical nonadherence among patients whose physicians communicate poorly.',
    classicApplications: [
      'Cancer Health Empowerment for Living without Pain (Ca-HELP) tailored education trial (Kravitz et al., 2011).',
      'Enhancing Connections Program for mothers coping with early-stage breast cancer (Lewis et al., 2006).'
    ],
    strengths: [
      'Provides a rigorous, multi-pathway model linking conversational micro-behaviors to hard distal clinical outcomes.',
      'Reduces medical errors, malpractice claims, and improves patient empowerment.'
    ],
    limitations: [
      'Time constraints in modern health systems can restrict in-depth relational communication.',
      'Electronic health record screen use in exam rooms can interfere with nonverbal rapport.'
    ]
  },

  // --- COMMUNITY & POPULATION LEVEL ---
  {
    id: 'ecological_models',
    title: 'Ecological Models of Health Behavior',
    shortName: 'Ecological Models',
    category: 'community',
    originYear: '1979 (Bronfenbrenner), 1988 (McLeroy), 2000s (Sallis & Owen)',
    keyTheorists: 'James F. Sallis, Neville Owen, Kenneth R. McLeroy, Daniel Stokols',
    description: 'A meta-framework emphasizing that health behaviors are influenced by multiple interacting levels: intrapersonal, interpersonal, institutional, community, and public policy.',
    corePremise: 'Multilevel interventions that combine individual education with supportive built environments and public policies are significantly more effective and sustainable than single-level interventions.',
    constructs: [
      {
        name: 'Five Core Ecological Principles',
        definition: '1. Multiple levels of influence, 2. Environmental contexts are significant determinants, 3. Influences interact across levels, 4. Ecological models should be behavior-specific, 5. Multilevel interventions are most effective.',
        measurementExample: 'Assess walkability index (GIS density, land-use mix, connectivity, retail FAR) alongside individual self-efficacy.',
        interventionStrategy: 'Pair mass media education with infrastructure changes (bike lanes, smoke-free zones) and price policies.'
      },
      {
        name: 'Four Domains of Active Living',
        definition: 'Active transport, occupational activities, household activities, and active recreation—each shaped by distinct environmental and policy settings.',
        measurementExample: 'Project RESIDE tracking changes in transport vs recreational walking following neighborhood redesign.',
        interventionStrategy: 'Partner with urban planners, transportation departments, and parks to create activity-friendly environments.'
      }
    ],
    empiricalSupport: 'Supported by global multi-country studies (IPEN: Sallis et al., 2009; Project RESIDE in Australia: Giles-Corti et al., 2013) and decades of comprehensive tobacco control programs (Green et al., 2006; Borland et al., 2010).',
    classicApplications: [
      'Comprehensive Multi-Level Tobacco Control: taxation, smoke-free air laws, media counter-advertising, and clinical quitlines.',
      'Active Living by Design 5P community model (Preparation, Promotions, Programs, Policy, Physical projects: Bors et al., 2009).'
    ],
    strengths: [
      'Reaches whole populations including those who do not volunteer for clinical or educational programs.',
      'Creates permanent, sustainable environmental and policy incentives for healthy choices.'
    ],
    limitations: [
      'High complexity and cost in designing and evaluating true multilevel randomized controlled trials.',
      'Health professionals often lack direct control over zoning laws, urban infrastructure, or fiscal taxes.'
    ]
  },
  {
    id: 'community_engagement_cbpr',
    title: 'Community Engagement, Organization & CBPR',
    shortName: 'CBPR & Organizing',
    category: 'community',
    originYear: '1950s (Alinsky), 1970s (Freire), 1990s-present (Minkler, Wallerstein, Israel)',
    keyTheorists: 'Nina Wallerstein, Meredith Minkler, Barbara Israel, Jack Rothman, Paulo Freire',
    description: 'A participatory, social justice orientation in which community members partner with researchers to identify issues, mobilize resources, build capacity, and achieve policy change.',
    corePremise: 'Sustainable health improvement requires starting "where the people are," honoring local cultural wisdom, promoting co-learning, and addressing social and structural inequities through shared power.',
    constructs: [
      {
        name: 'Community Capacity & Competence',
        definition: 'Community characteristics that affect the ability to identify problems, mobilize social capital, and implement solutions collaboratively.',
        measurementExample: 'Partnership Self-Assessment Tool (PSAT) and CDC PRC Partnership Trust Tool.',
        interventionStrategy: 'Develop grassroots leadership, foster local coalitions, and nurture mutual trust.'
      },
      {
        name: 'Critical Consciousness & Praxis',
        definition: 'The iterative cycle of reflection and action (Freirean popular education) that links personal struggles to root social/economic causes.',
        measurementExample: 'Photovoice exhibits and community problem-posing dialogue workshops.',
        interventionStrategy: 'Engage community members in photographing assets/barriers and presenting to policymakers.'
      },
      {
        name: 'Rothman Typology of Macro Practice',
        definition: 'Community Capacity Development (consensus, self-help), Social Planning & Policy (data-driven problem solving), Social Advocacy (confrontation/pressure to redress power imbalances).',
        measurementExample: 'Classifying community coalition tactics along needs-based vs strengths-based axes.',
        interventionStrategy: 'Combine grassroots organizing with policy advocacy and strategic partnerships.'
      }
    ],
    empiricalSupport: 'Demonstrated in hundreds of participatory initiatives, including Allies Against Asthma (89 policy/systems changes achieved: Clark et al., 2010) and Bronx Health REACH faith-based health equity programs.',
    classicApplications: [
      'San Francisco Chinatown Restaurant Workers CBPR: Check, Please! study leading to the landmark Wage Theft Prevention Ordinance (Chang et al., 2012).',
      'Bronx Health REACH: 47 churches tackling nutrition, diabetes self-care, and medical apartheid (2010-2015).'
    ],
    strengths: [
      'Ensures interventions are culturally grounded, relevant, and owned by the community for long-term sustainability.',
      'Empowers marginalized groups and addresses root upstream social determinants of health.'
    ],
    limitations: [
      'Requires substantial time, trust-building, and long-term commitment.',
      'Power dynamics between academic institutions and community partners require continual reflection.'
    ]
  },
  {
    id: 'diffusion_cfir',
    title: 'Diffusion of Innovations & Implementation Science (CFIR)',
    shortName: 'Diffusion / CFIR',
    category: 'community',
    originYear: '1962 (Rogers Diffusion), 2009 (CFIR - Damschroder et al.)',
    keyTheorists: 'Everett M. Rogers, Ross C. Brownson, Laura J. Damschroder, David A. Chambers',
    description: 'Theories explaining how evidence-based interventions (EBIs) spread across social systems over time and the multi-domain determinants of successful organizational implementation.',
    corePremise: 'Effective interventions do not spread spontaneously; adoption rate depends on innovation attributes (advantage, compatibility, simplicity, trialability, observability) and inner/outer organizational contexts.',
    constructs: [
      {
        name: 'Five Key Innovation Attributes',
        definition: '1. Relative Advantage (effectiveness vs alternatives), 2. Compatibility (fit with existing values/workflow), 3. Simplicity (ease of learning), 4. Trialability (ability to pilot test), 5. Observability (visible tangible results).',
        measurementExample: 'Rate innovation perceived relative advantage and workflow compatibility in prospective clinics.',
        interventionStrategy: 'Design for dissemination: package EBIs into intuitive, modular toolkits with clear cost-effectiveness evidence.'
      },
      {
        name: 'Adopter Categories & S-Curve',
        definition: 'Innovators (2.5%), Early Adopters/Opinion Leaders (13.5%), Early Majority (34%), Late Majority (34%), Laggards (16%).',
        measurementExample: 'Identify staff openness to technological innovation in healthcare systems.',
        interventionStrategy: 'Enlist early adopter opinion leaders to champion and demonstrate the intervention.'
      },
      {
        name: 'Five CFIR Domains',
        definition: '1. Intervention Characteristics (core vs adaptable components), 2. Outer Setting (patient needs, external policies), 3. Inner Setting (culture, leadership engagement, climate), 4. Characteristics of Individuals, 5. Process (planning, engaging, executing, reflecting).',
        measurementExample: 'Qualitative CFIR interview guides assessing clinic climate and leadership buy-in.',
        interventionStrategy: 'Conduct pre-implementation assessments; adapt peripheral components to local clinic culture while preserving core fidelity.'
      }
    ],
    empiricalSupport: 'Over 50,000 citations in diffusion science. Validated in school programs (SPARK, CATCH: Owen et al., 2006), cancer control (Pool Cool Trial: Glanz et al., 2005, 2014), and VA MOVE! weight management implementation (Damschroder & Lowery, 2013).',
    classicApplications: [
      'Pool Cool Skin Cancer Prevention Diffusion Trial across 400+ swimming pools in the US and Okinawa (Glanz et al., 2005, 2014).',
      'Body & Soul nutrition dissemination in African American churches (Campbell et al., 2007).'
    ],
    strengths: [
      'Bridges the 17-year research-to-practice gap by analyzing institutional implementation barriers.',
      'Unifies dozens of fragmented dissemination frameworks under standardized CFIR terminology.'
    ],
    limitations: [
      'Pro-innovation bias (assuming all promoted innovations are uniformly beneficial).',
      'Requires institutional readiness, leadership support, and dedicated funding for scaling.'
    ]
  },

  // --- PLANNING & PRACTICE LEVEL ---
  {
    id: 'precede_proceed_im',
    title: 'PRECEDE-PROCEED & Intervention Mapping',
    shortName: 'PRECEDE / IM',
    category: 'planning',
    originYear: '1970s-2005 (Green & Kreuter), 1998-present (Bartholomew et al.)',
    keyTheorists: 'Lawrence W. Green, Marshall W. Kreuter, L. Kay Bartholomew, Guy S. Parcel, Gerjo Kok',
    description: 'Comprehensive, logic-model-driven planning frameworks that guide practitioners from epidemiologic needs assessment backward to behavioral/environmental determinants and theory-matched change methods.',
    corePremise: 'Effective health promotion begins with an outcome-oriented diagnostic assessment of the problem (PRECEDE) and systematically maps theoretical change methods to specific performance objectives (Intervention Mapping).',
    constructs: [
      {
        name: 'PRECEDE Assessment Phases (Phases 1-4)',
        definition: 'Phase 1: Social Assessment (quality of life), Phase 2: Epidemiological, Behavioral & Environmental Assessment, Phase 3: Educational & Ecological Assessment (Predisposing, Enabling, Reinforcing factors), Phase 4: Administrative/Policy Assessment.',
        measurementExample: 'Classify risk determinants into Predisposing (beliefs), Enabling (clinic access), and Reinforcing (family praise).',
        interventionStrategy: 'Develop logic model of the problem working right-to-left before selecting intervention components.'
      },
      {
        name: 'PROCEED Implementation & Evaluation (Phases 5-8)',
        definition: 'Phase 5: Implementation, Phase 6: Process Evaluation (fidelity, reach), Phase 7: Impact Evaluation (immediate determinant changes), Phase 8: Outcome Evaluation (morbidity, mortality, quality of life).',
        measurementExample: 'Track implementation fidelity, intermediate belief changes, and 2-year clinical outcome reductions.',
        interventionStrategy: 'Establish clear milestone indicators for each phase to evaluate program success.'
      },
      {
        name: 'Intervention Mapping 6 Steps',
        definition: 'Step 1: Logic Model of Problem, Step 2: Program Outcomes & Objectives (Matrices of Change Objectives), Step 3: Program Design (Theory-based methods), Step 4: Program Production, Step 5: Implementation Plan, Step 6: Evaluation Plan.',
        measurementExample: 'Crossing performance objectives with cognitive determinants to produce a cell-by-cell change matrix.',
        interventionStrategy: 'Match proven active ingredients (modeling, guided practice, elaboration) to specific matrix cells.'
      }
    ],
    empiricalSupport: 'Used in hundreds of health programs worldwide, including the Compass Strategy youth mental health awareness campaign in Australia (Wright et al., 2006) and the It\'s Your Game middle school sexual health curriculum (Tortolero et al., 2010; Markham et al., 2012).',
    classicApplications: [
      'Compass Strategy Youth Mental Health Community Campaign in Melbourne, Australia (Wright et al., 2006).',
      'It\'s Your Game...Keep It Real adolescent sexual risk reduction curriculum (Markham et al., 2012).'
    ],
    strengths: [
      'Ensures interventions are theory-driven rather than relying on precedent, intuition, or guesswork.',
      'Explicitly links every single message and activity to a verified behavioral determinant and evaluation metric.'
    ],
    limitations: [
      'Can be labor-intensive and demanding for under-resourced community organizations.',
      'Requires substantial preliminary data collection and stakeholder collaboration.'
    ]
  },
  {
    id: 'behavioral_economics',
    title: 'Behavioral Economics & Health Decisions',
    shortName: 'Behavioral Econ',
    category: 'economics',
    originYear: '1979 (Prospect Theory - Kahneman & Tversky), 2000s (Volpp, Loewenstein, Asch)',
    keyTheorists: 'Kevin Volpp, George Loewenstein, David Asch, Daniel Kahneman, Amos Tversky, Richard Thaler',
    description: 'Blends cognitive psychology and neoclassical economics to explain and address predictable human decision errors (present bias, loss aversion, status quo bias) through asymmetric paternalism and choice architecture.',
    corePremise: 'Real people do not make dispassionate, perfectly rational choices; health programs are more effective when choice architectures leverage natural cognitive tendencies (immediate rewards, regret aversion, smart defaults).',
    constructs: [
      {
        name: 'Present-Biased Preferences',
        definition: 'The tendency to overweight immediate costs and benefits relative to those in the distant future.',
        measurementExample: 'Overvaluing the immediate comfort of skipping the gym over the distant benefit of cardiovascular health.',
        interventionStrategy: 'Provide frequent, immediate micro-incentives (daily feedback/lotteries) rather than distant annual bonuses.'
      },
      {
        name: 'Loss Aversion & Deposit Contracts',
        definition: 'Losses loom 1.5 to 2.5 times larger than equivalent gains. Deposit contracts have individuals put their own money at risk refundable upon goal attainment.',
        measurementExample: 'Volpp et al. weight-loss deposit contract ($0.01-$3.00/day matched 1:1, forfeited if off track).',
        interventionStrategy: 'Frame incentives around preventing losses; allow voluntary precommitment contracts.'
      },
      {
        name: 'Nonlinear Probability Weighting & Regret Aversion',
        definition: 'Overweighting small probabilities (lottery appeal) and taking action to avoid anticipated future regret.',
        measurementExample: 'Daily lottery for medication adherence with notifications to nonadherent patients of what they would have won.',
        interventionStrategy: 'Deploy lottery-based reward systems with daily eligibility and winner/loser feedback.'
      },
      {
        name: 'Defaults & Status Quo Bias',
        definition: 'The powerful tendency to take the path of least resistance and accept pre-set defaults.',
        measurementExample: 'Opt-out organ donation (99% enrollment) vs Opt-in (10% enrollment); 90-day automatic prescription refills.',
        interventionStrategy: 'Set defaults to healthy options (e.g. water as default beverage; automatic prescription renewals).'
      }
    ],
    empiricalSupport: 'Randomized controlled trials demonstrate deposit contracts and lotteries double to triple smoking cessation rates (Volpp et al., 2009) and achieve 98% warfarin medication adherence (Kimmel et al., 2012; Sen et al., 2014).',
    classicApplications: [
      'Financial incentive and deposit contract randomized trials for weight loss (Volpp, John, et al., 2008; John et al., 2011).',
      'Daily lottery-based incentives for warfarin anticoagulation and blood pressure monitoring (Kimmel et al., 2012; Sen et al., 2014).'
    ],
    strengths: [
      'Produces rapid, high-magnitude behavioral changes at relatively low intervention cost.',
      'Choice architecture (nudges, smart defaults) preserves freedom of choice while improving outcomes.'
    ],
    limitations: [
      'Post-intervention maintenance: behavior may decline once incentives cease unless intrinsic motivation and habits are established.',
      'Must avoid perceived coercion or penalties in vulnerable populations.'
    ]
  },
  {
    id: 'social_marketing',
    title: 'Social Marketing & Strategic Communication',
    shortName: 'Social Marketing',
    category: 'planning',
    originYear: '1971 (Kotler & Zaltman), 1994 (Andreasen), 2000s (Storey, Lefebvre)',
    keyTheorists: 'Philip Kotler, Alan R. Andreasen, J. Douglas Storey, Craig Lefebvre, Gary Saffitz',
    description: 'The application of commercial marketing technologies to analyze, plan, execute, and evaluate programs designed to influence voluntary behavior for social and individual good.',
    corePremise: 'Successful social change requires consumer-oriented voluntary exchange, optimizing the marketing mix (Product, Price, Place, Promotion), and segmenting audiences based on psychographic readiness.',
    constructs: [
      {
        name: 'The Four Ps Marketing Mix',
        definition: 'Product (bundle of benefits resulting from behavior), Price (financial, social, or time costs to minimize), Place (convenient channels of access), Promotion (persuasive communications).',
        measurementExample: 'Positioning family planning not as a device, but as "Sahetak Sarwetak" (Your Health is Your Wealth) with pharmacy network access.',
        interventionStrategy: 'Reconfigure product value, reduce psychological/physical barriers, distribute via ubiquitous local sites, and craft emotionally resonant promotions.'
      },
      {
        name: 'Audience Segmentation',
        definition: 'Dividing heterogeneous populations into homogeneous subgroups by demographic, life stage, behavioral risk, or psychographic profile.',
        measurementExample: 'Segmenting reproductive health messages for newlyweds (birth spacing) vs parents with 3 children (permanent methods).',
        interventionStrategy: 'Tailor distinct value propositions and channels to each audience cluster.'
      },
      {
        name: 'Consumer-Driven Normative Marketing',
        definition: 'Building organic consumer demand and shifting perceived social norms (descriptive & injunctive) so behavioral momentum is self-sustaining.',
        measurementExample: 'Blue Circle (Lingkaran Biru) nationwide branding in Indonesia creating widespread normative acceptance of family planning.',
        interventionStrategy: 'Create distinctive brand identities, partner with commercial brands, and embed messages in popular entertainment media.'
      }
    ],
    empiricalSupport: 'Massive population-level gains documented in Egypt Communication for Healthy Living (CHL: El-Zanaty & Way, 2009) and Uganda Health Marketing Group (UHMG: AFFORD, 2013).',
    classicApplications: [
      'Communication for Healthy Living (CHL) in Egypt: Sahetak Sarwetak & Ask-Consult network with 30,000+ pharmacies (2002-2010).',
      'Uganda Health Marketing Group (UHMG): Good Life brand and 200+ clinics for HIV, malaria, and maternal care (2006-2013).'
    ],
    strengths: [
      'Consumer-centric approach ensures messages resonate deeply with real-world felt needs.',
      'Harnesses the immense creative and distribution power of commercial media, retail networks, and public-private partnerships.'
    ],
    limitations: [
      'Often requires large budgets for nationwide media campaigns and supply-chain logistics.',
      'Must guard against stopping at qualitative focus groups without quantitative predictor verification.'
    ]
  }
];

export const THEORY_CATEGORIES = {
  individual: {
    title: "Individual (Intrapersonal) Level Theories",
    description: "Focus on internal psychological processes: knowledge, risk perceptions, attitudes, normative beliefs, intentions, readiness stages, and self-efficacy.",
    items: COMPREHENSIVE_THEORIES.filter(t => t.category === 'individual')
  },
  interpersonal: {
    title: "Interpersonal Level Theories & Models",
    description: "Examine how individuals are shaped by and reciprocally influence their immediate social network, role models, coping partners, and healthcare providers.",
    items: COMPREHENSIVE_THEORIES.filter(t => t.category === 'interpersonal')
  },
  community: {
    title: "Community, Organizational & Policy Models",
    description: "Explore how social systems, built environments, multi-sector coalitions, and dissemination pipelines create population-wide health impact.",
    items: COMPREHENSIVE_THEORIES.filter(t => t.category === 'community')
  },
  planning: {
    title: "Theory-Based Planning & Implementation Models",
    description: "Comprehensive blueprints (PRECEDE-PROCEED, Intervention Mapping, Social Marketing) that bridge theory and practice to design evidence-based interventions.",
    items: COMPREHENSIVE_THEORIES.filter(t => t.category === 'planning')
  },
  economics: {
    title: "Behavioral Economics & Choice Architecture",
    description: "Nudge theory, prospect theory, asymmetric paternalism, and financial incentive structures that address human cognitive decision errors.",
    items: COMPREHENSIVE_THEORIES.filter(t => t.category === 'economics')
  }
};

export const PLANNING_MODELS = COMPREHENSIVE_THEORIES.filter(t => t.category === 'planning' || t.category === 'economics');

export const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'mcq',
    category: 'individual',
    question: "According to systematic meta-analyses of the Health Belief Model (HBM), which single construct is empirically the strongest predictor of health behaviors?",
    options: ["Perceived Severity", "Perceived Barriers", "Perceived Susceptibility", "Cues to Action"],
    answer: "Perceived Barriers",
    feedback: "Across multiple meta-analyses (Janz & Becker 1984; Carpenter 2010; Harrison et al. 1992), Perceived Barriers consistently demonstrates the strongest weighted effect size in predicting health behaviors.",
    bookReference: "Glanz et al. 5th Edition, Chapter 5 (Table 5.2)"
  },
  {
    id: 'q2',
    type: 'truefalse',
    category: 'individual',
    question: "In the Transtheoretical Model (TTM), moving from Precontemplation to Action requires the 'Pros' of changing to increase approximately twice as much (~1.0 SD) as the 'Cons' decrease (~0.5 SD).",
    answer: true,
    feedback: "True! This reflects the mathematical Strong Principle (PC to Action ≈ 1.0 SD increase in Pros) and Weak Principle (PC to Action ≈ 0.5 SD decrease in Cons) verified across 48 behaviors by Hall & Rossi (2008).",
    bookReference: "Glanz et al. 5th Edition, Chapter 7 (Strong and Weak Principles)"
  },
  {
    id: 'q3',
    type: 'mcq',
    category: 'individual',
    question: "In the Integrated Behavioral Model (IBM), which set of direct factors determines whether a strong behavioral intention translates into actual behavioral performance?",
    options: [
      "Attitudes, Subjective Norms, and Perceived Severity",
      "Knowledge & Skills, Salience, Environmental Constraints, and Habit",
      "Precontemplation, Contemplation, and Preparation",
      "Product, Price, Place, and Promotion"
    ],
    answer: "Knowledge & Skills, Salience, Environmental Constraints, and Habit",
    feedback: "IBM specifies that even with high intention, behavioral performance requires knowledge/skills, high salience, absence of environmental barriers, and the moderating role of habit (Kasprzyk, Montaño, & Fishbein).",
    bookReference: "Glanz et al. 5th Edition, Chapter 6 (Figure 6.2)"
  },
  {
    id: 'q4',
    type: 'mcq',
    category: 'interpersonal',
    question: "Social Cognitive Theory's core concept of 'Reciprocal Determinism' (Bandura) posits that human behavior is produced by the dynamic interaction of which triad?",
    options: [
      "Id, Ego, and Superego",
      "Person (Cognitive factors), Environment, and Behavior",
      "Predisposing, Enabling, and Reinforcing factors",
      "Precontemplation, Action, and Maintenance"
    ],
    answer: "Person (Cognitive factors), Environment, and Behavior",
    feedback: "Reciprocal Determinism in SCT describes human behavior as a continuous, bidirectional interaction between personal cognitive factors, the socio-physical environment, and behavioral actions.",
    bookReference: "Glanz et al. 5th Edition, Chapter 9 (Bandura 1986)"
  },
  {
    id: 'q5',
    type: 'truefalse',
    category: 'interpersonal',
    question: "In social relationships research (Holt-Lunstad et al., 2010), Received Social Support is a more consistent predictor of decreased mortality than Perceived Social Support.",
    answer: false,
    feedback: "False! Meta-analyses indicate that Perceived Support (expecting support is available if needed) is a significant predictor of longevity (OR = 1.35), whereas Received Support (actual receipt) is often uncorrelated or can even increase stress if seen as unresponsive or controlling.",
    bookReference: "Glanz et al. 5th Edition, Chapter 10 (Figure 10.2)"
  },
  {
    id: 'q6',
    type: 'mcq',
    category: 'interpersonal',
    question: "In the Transactional Model of Stress and Coping (Lazarus & Folkman), what constitutes 'Secondary Appraisal'?",
    options: [
      "Judging the initial severity and personal threat of an event",
      "Assessing one's coping resources, controllability of the stressor, and self-efficacy",
      "Experiencing acute physiological fight-or-flight reactions",
      "Enacting automatic behavioral defense mechanisms"
    ],
    answer: "Assessing one's coping resources, controllability of the stressor, and self-efficacy",
    feedback: "Primary appraisal evaluates the threat/significance of the stressor, whereas Secondary appraisal evaluates the individual's coping options, resources, and personal control.",
    bookReference: "Glanz et al. 5th Edition, Chapter 12 (Table 12.1)"
  },
  {
    id: 'q7',
    type: 'mcq',
    category: 'interpersonal',
    question: "In clinician-patient communication (Street & Duggan), which function addresses the human emotional needs, solidarity, and empathy of relationship-centered care?",
    options: [
      "Task-Driven Function",
      "Relational Communication Function",
      "Administrative Compliance Function",
      "Epidemiologic Surveillance Function"
    ],
    answer: "Relational Communication Function",
    feedback: "Relational communication functions focus on fostering healing relationships and validating/responding to emotions, operating in parallel with task-driven functions like information exchange and shared decision making.",
    bookReference: "Glanz et al. 5th Edition, Chapter 13 (Table 13.1)"
  },
  {
    id: 'q8',
    type: 'mcq',
    category: 'community',
    question: "Which of the following is NOT one of the five core principles of Ecological Models of Health Behavior (Sallis & Owen)?",
    options: [
      "There are multiple levels of influence on health behaviors",
      "Environmental contexts are significant determinants of behavior",
      "Ecological models must be generic and apply identically across all behaviors",
      "Multilevel interventions should be most effective in changing behavior"
    ],
    answer: "Ecological models must be generic and apply identically across all behaviors",
    feedback: "Principle 4 explicitly states that 'Ecological models should be behavior-specific' because environmental and policy variables that influence one behavior (e.g. bike lanes for transport) do not generalize to others (e.g. sun safety).",
    bookReference: "Glanz et al. 5th Edition, Chapter 3 (Five Principles)"
  },
  {
    id: 'q9',
    type: 'mcq',
    category: 'community',
    question: "In Community-Based Participatory Research (CBPR) and Freirean popular education, what does 'Praxis' represent?",
    options: [
      "Top-down academic research design without community consultation",
      "The iterative cyclical process of listening, critical reflection, dialogue, and social action",
      "A statistical test for calculating structural equivalence in networks",
      "A clinical algorithm for determining drug adherence"
    ],
    answer: "The iterative cyclical process of listening, critical reflection, dialogue, and social action",
    feedback: "Praxis, derived from Paulo Freire and embraced in CBPR (Wallerstein & Minkler), is the ongoing dialectical cycle of reflection and action toward community empowerment and social transformation.",
    bookReference: "Glanz et al. 5th Edition, Chapter 15 (Table 15.1)"
  },
  {
    id: 'q10',
    type: 'mcq',
    category: 'community',
    question: "In Diffusion of Innovations Theory (Rogers), what attribute refers to the degree to which an innovation can be experimented with on a limited basis before full adoption?",
    options: ["Relative Advantage", "Compatibility", "Trialability", "Observability"],
    answer: "Trialability",
    feedback: "Trialability is the extent to which an evidence-based intervention or product can be tried or piloted without incurring excessive sunk costs or irrevocable commitment.",
    bookReference: "Glanz et al. 5th Edition, Chapter 16 (Table 16.3)"
  },
  {
    id: 'q11',
    type: 'mcq',
    category: 'planning',
    question: "In the PRECEDE-PROCEED model (Green & Kreuter), Phase 3 evaluates which three diagnostic categories of factors?",
    options: [
      "Cognitive, Affective, and Psychomotor",
      "Predisposing, Enabling, and Reinforcing factors",
      "Product, Price, Place, and Promotion",
      "Innovators, Early Adopters, and Laggards"
    ],
    answer: "Predisposing, Enabling, and Reinforcing factors",
    feedback: "Phase 3 (Educational and Ecological Assessment) examines Predisposing (knowledge, beliefs, attitudes), Enabling (skills, resources, barriers), and Reinforcing factors (social rewards, peer feedback).",
    bookReference: "Glanz et al. 5th Edition, Chapter 19 (Figure 19.1)"
  },
  {
    id: 'q12',
    type: 'mcq',
    category: 'planning',
    question: "In Intervention Mapping (Bartholomew et al.), what is a 'Matrix of Change Objectives' created from?",
    options: [
      "Crossing Performance Objectives with Behavioral Determinants",
      "Subtracting Perceived Barriers from Perceived Benefits",
      "Multiplying Efficacy by Participation Rate",
      "Dividing Actual Ties by Possible Network Ties"
    ],
    answer: "Crossing Performance Objectives with Behavioral Determinants",
    feedback: "In Step 2 of Intervention Mapping, matrices of change objectives are formulated at the intersection of performance objectives ('what people must do') and theoretical determinants ('why they would do it').",
    bookReference: "Glanz et al. 5th Edition, Chapter 19 (Table 19.4)"
  },
  {
    id: 'q13',
    type: 'mcq',
    category: 'economics',
    question: "In Behavioral Economics (Volpp & Loewenstein), why are 'Deposit Contracts' exceptionally effective for weight loss and smoking cessation?",
    options: [
      "They rely solely on educational lectures",
      "They exploit Loss Aversion (losses loom larger than gains) and Overoptimism regarding self-control",
      "They eliminate all freedom of choice through legal mandates",
      "They provide annual distant rebates instead of daily feedback"
    ],
    answer: "They exploit Loss Aversion (losses loom larger than gains) and Overoptimism regarding self-control",
    feedback: "Deposit contracts have participants deposit their own money upfront. Due to loss aversion (Kahneman & Tversky), the fear of forfeiting one's own deposited funds provides a powerful motivation that outweighs distant abstract rewards.",
    bookReference: "Glanz et al. 5th Edition, Chapter 20 (Table 20.2)"
  },
  {
    id: 'q14',
    type: 'mcq',
    category: 'economics',
    question: "What concept in Behavioral Economics explains why setting an 'opt-out' default for organ donation produces ~99% participation compared to ~10% in 'opt-in' systems?",
    options: ["Status Quo / Default Bias", "Nonlinear Probability Weighting", "Narrow Bracketing", "Peanuts Effect"],
    answer: "Status Quo / Default Bias",
    feedback: "Default bias (Johnson & Goldstein) shows that humans disproportionately choose the path of least resistance. Choice architects can set defaults to favor beneficial health behaviors.",
    bookReference: "Glanz et al. 5th Edition, Chapter 20 (Defaults and Status Quo Bias)"
  },
  {
    id: 'q15',
    type: 'mcq',
    category: 'planning',
    question: "In Social Marketing (Storey et al., Chapter 21), what fundamentally distinguishes 'Social Marketing' from 'Commercial Marketing'?",
    options: [
      "Social marketing only uses printed posters, whereas commercial uses digital media",
      "Primary locus of benefit is the individual/society at large rather than organizational shareholder profit",
      "Social marketing does not consider price or distribution channels",
      "Commercial marketing does not use audience segmentation"
    ],
    answer: "Primary locus of benefit is the individual/society at large rather than organizational shareholder profit",
    feedback: "As Andreasen (1994) defined, social marketing applies commercial marketing technologies to voluntary behavior change where the primary beneficiary is the citizen and society, rather than financial profit for the producer.",
    bookReference: "Glanz et al. 5th Edition, Chapter 21 (Table 21.1)"
  }
];

export const GAME_QUESTIONS: GameQuestion[] = [
  { 
    id: 'g1',
    question: "Which model uses 6 stages (Precontemplation to Maintenance) and 10 processes of change?", 
    options: ["Transtheoretical Model", "Health Belief Model", "Social Cognitive Theory"], 
    answer: "Transtheoretical Model",
    category: "Individual" 
  },
  { 
    id: 'g2',
    question: "Who developed Social Cognitive Theory and the concept of Reciprocal Determinism?", 
    options: ["Albert Bandura", "Irwin Rosenstock", "Everett Rogers"], 
    answer: "Albert Bandura",
    category: "Interpersonal" 
  },
  { 
    id: 'g3',
    question: "What is the single most powerful predictor construct across HBM meta-analyses?", 
    options: ["Perceived Barriers", "Perceived Severity", "Cues to Action"], 
    answer: "Perceived Barriers",
    category: "Individual" 
  },
  { 
    id: 'g4',
    question: "Which planning framework features Predisposing, Enabling, and Reinforcing factors?", 
    options: ["PRECEDE-PROCEED", "RE-AIM", "Diffusion of Innovations"], 
    answer: "PRECEDE-PROCEED",
    category: "Planning" 
  },
  { 
    id: 'g5',
    question: "What behavioral economic concept explains why losses hurt 2x more than equivalent gains?", 
    options: ["Loss Aversion", "Hyperbolic Discounting", "Narrow Bracketing"], 
    answer: "Loss Aversion",
    category: "Economics" 
  },
  { 
    id: 'g6',
    question: "What are the 4 Ps of the Social Marketing mix?", 
    options: ["Product, Price, Place, Promotion", "Plan, Prepare, Practice, Perform", "Precontemplation, Preparation, Power, Policy"], 
    answer: "Product, Price, Place, Promotion",
    category: "Planning" 
  },
  { 
    id: 'g7',
    question: "Which theory analyzes betweenness centrality, homophily, and bridging ties?", 
    options: ["Social Network Theory", "Attribution Theory", "Protection Motivation Theory"], 
    answer: "Social Network Theory",
    category: "Interpersonal" 
  },
  { 
    id: 'g8',
    question: "In the Theory of Planned Behavior, what directly precedes and predicts behavior?", 
    options: ["Behavioral Intention", "Demographics", "Vicarious Experience"], 
    answer: "Behavioral Intention",
    category: "Individual" 
  },
  { 
    id: 'g9',
    question: "What stress coping style combines flexible adaptation with a future-oriented focus in low-SES settings?", 
    options: ["Shift-and-Persist", "John Henryism", "Blunting"], 
    answer: "Shift-and-Persist",
    category: "Interpersonal" 
  },
  { 
    id: 'g10',
    question: "Which implementation framework unifies 5 domains (Intervention, Outer, Inner, Individuals, Process)?", 
    options: ["CFIR", "PARIHS", "EPPM"], 
    answer: "CFIR",
    category: "Community" 
  }
];

export const SCENARIOS: Scenario[] = [
  {
    id: 'sc1',
    title: 'Adolescent Obesity & Physical Activity: CATCH School Trial',
    targetAudience: 'Elementary and Middle School Students (Grades 3-8) & Families',
    setting: 'School District, Cafeteria, Physical Education, and Community',
    scenario: "A school district in a low-income urban area experiences a sharp rise in childhood obesity. Health educators want an intervention that teaches children GO, SLOW, and WHOA foods, alters cafeteria recipes to be lower in saturated fat, increases moderate-to-vigorous physical activity during PE class, and engages parents through take-home skill missions.",
    keyChallenge: "Coordinating individual student knowledge with environmental food availability and family reinforcement.",
    options: ["Social Cognitive Theory (SCT)", "Health Belief Model (HBM)", "Precaution Adoption Process Model (PAPM)", "Theory of Planned Behavior (TPB)"],
    answer: "Social Cognitive Theory (SCT)",
    feedback: "Social Cognitive Theory (as proven in the classic CATCH trial by Perry, Kelder, & Luepker) directly targets reciprocal determinism across personal cognitive capability (GO/SLOW/WHOA food knowledge), environmental modification (school cafeteria and PE environment), and behavioral skills.",
    recommendedConstructs: ["Reciprocal Determinism", "Behavioral Capability", "Observational Learning", "Environmental Reinforcement", "Self-Efficacy"],
    theoreticalRationale: "SCT acknowledges that cognitive training alone fails without supportive cafeteria environments and peer/family modeling.",
    bookCaseStudy: "CATCH Trial (Glanz et al. 5th Ed, Chapter 9)"
  },
  {
    id: 'sc2',
    title: 'Adult Male Circumcision for HIV Prevention in Zimbabwe',
    targetAudience: 'Adult Men aged 18-30 in rural and urban Zimbabwe',
    setting: 'Community Clinics and Mobile Health Units',
    scenario: "Despite clinical evidence showing voluntary medical male circumcision reduces HIV transmission risk by up to 60%, uptake in Zimbabwe remains low. Formative elicitation reveals that men fear partner disapproval, worry about healing time, and hold misperceptions that circumcision is culturally inappropriate or for youth only.",
    keyChallenge: "Differentiating between normative peer beliefs, emotional affect, and personal agency barriers.",
    options: ["Integrated Behavioral Model (IBM)", "Diffusion of Innovations Theory", "Health Action Process Approach (HAPA)", "Extended Parallel Processing Model (EPPM)"],
    answer: "Integrated Behavioral Model (IBM)",
    feedback: "The Integrated Behavioral Model (Montaño & Kasprzyk, 2014) is ideal here. Through systematic qualitative elicitation and stepwise regression, researchers identified specific injunctive norm beliefs (brothers, wives) and efficacy beliefs to design targeted message campaigns (posters/billboards) that significantly increased circumcision intentions.",
    recommendedConstructs: ["Elicitation of Salient Beliefs", "Injunctive & Descriptive Norms", "Experiential vs Instrumental Attitude", "Personal Agency", "Behavioral Intention"],
    theoreticalRationale: "IBM systematically identifies which specific underlying beliefs account for the most variance in intention.",
    bookCaseStudy: "Zimbabwe HIV/MC Prevention Study (Glanz et al. 5th Ed, Chapter 6)"
  },
  {
    id: 'sc3',
    title: 'Worksite Multi-Behavior Change & Smoking Cessation',
    targetAudience: '6,500+ Employees across 30 corporate worksites',
    setting: 'Workplace Wellness Program & Digital Coaching',
    scenario: "An employer wants to help employees quit smoking, improve nutrition, and reduce stress. Past action-oriented programs only recruited 5% of smokers (those already wanting to quit today). The leadership needs a system that can engage the 80% of employees who are not currently ready to quit immediately.",
    keyChallenge: "Engaging employees in Precontemplation and Contemplation without forcing premature action.",
    options: ["Transtheoretical Model (TTM / Stages of Change)", "Health Belief Model (HBM)", "Theory of Reasoned Action (TRA)", "Behavioral Economics alone"],
    answer: "Transtheoretical Model (TTM / Stages of Change)",
    feedback: "TTM (Prochaska, Velicer, & Johnson) excels at population-level engagement by providing stage-matched computerized feedback reports. Smoker participation skyrocketed to 80-85% because precontemplators received consciousness raising rather than premature action demands.",
    recommendedConstructs: ["Stages of Change", "Decisional Balance (Pros/Cons)", "Processes of Change", "Self-Efficacy vs Temptation", "Proactive Recruitment"],
    theoreticalRationale: "Matching change processes to readiness stages prevents dropout and doubles long-term cessation rates.",
    bookCaseStudy: "MHBC Multi-Behavior Case Study (Glanz et al. 5th Ed, Chapter 7)"
  },
  {
    id: 'sc4',
    title: 'Pool Cool Skin Cancer Prevention: Aquatic Dissemination',
    targetAudience: '400+ Swimming Pools, Lifeguards, Aquatic Instructors, and Children',
    setting: 'Public and Private Municipal Swimming Pools',
    scenario: "After a successful randomized efficacy trial showing the Pool Cool sun-safety program reduced sunburns and increased sunscreen use in 28 pools, researchers want to disseminate the intervention across 400+ pools nationwide in the US and Okinawa, evaluating organizational adoption, fidelity, and environmental shade policies.",
    keyChallenge: "Scaling an evidence-based intervention across diverse organizational pool managements.",
    options: ["Diffusion of Innovations & CFIR", "Theory of Planned Behavior", "Health Belief Model", "Social Cognitive Theory alone"],
    answer: "Diffusion of Innovations & CFIR",
    feedback: "Diffusion of Innovations (Rogers) combined with implementation science frameworks (Brownson & Glanz, 2005, 2014) guided the Pool Cool Diffusion Trial, analyzing how innovation attributes (advantage, compatibility, trialability) and field coordinators (linkage agents) drove sustainable pool policy adoption.",
    recommendedConstructs: ["Relative Advantage", "Compatibility", "Linkage Agents / Change Champions", "Organizational Climate", "Implementation Fidelity & Maintenance"],
    theoreticalRationale: "Diffusion theory explains how innovations spread through organizational networks and become institutionalized.",
    bookCaseStudy: "Pool Cool Diffusion Trial (Glanz et al. 5th Ed, Chapter 16)"
  },
  {
    id: 'sc5',
    title: 'Diabetes Medication Adherence via Lottery-Based Behavioral Economics',
    targetAudience: 'High-risk Patients on Daily Warfarin Anticoagulation Therapy',
    setting: 'Outpatient Clinical Monitoring & In-Home Wireless Devices',
    scenario: "One-third of high-risk cardiac patients fail to adhere to their daily anticoagulant pills, leading to elevated stroke risks. Traditional warnings about long-term stroke risk fail due to present-biased discounting. Planners introduce a daily electronic pill bottle linked to a daily lottery ($5 expected value) with instant text feedback.",
    keyChallenge: "Overcoming present bias and daily forgetfulness for long-term asymptomatic medication adherence.",
    options: ["Behavioral Economics (Lottery Incentives & Regret Aversion)", "Community Organizing Model", "Diffusion of Innovations", "Precaution Adoption Process Model"],
    answer: "Behavioral Economics (Lottery Incentives & Regret Aversion)",
    feedback: "Behavioral Economics (Volpp, Loewenstein, & Kimmel, 2012) addresses present bias by offering immediate daily lottery rewards and exploiting regret aversion (notifying patients if their number was drawn but forfeited due to missing a dose), reducing nonadherence from 22% down to 2.3%.",
    recommendedConstructs: ["Present Bias", "Nonlinear Probability Weighting", "Regret Aversion", "Asymmetric Paternalism", "Immediate Feedback"],
    theoreticalRationale: "Immediate small probabilistic rewards overcome hyperbolic discounting of distant future health states.",
    bookCaseStudy: "Warfarin Adherence Trials (Glanz et al. 5th Ed, Chapter 20)"
  }
];

export const FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc1',
    term: "Perceived Barriers",
    definition: "An individual's assessment of the tangible (cost, inconvenience) and psychological (pain, embarrassment) obstacles to adopting a health behavior. Empirically the single most potent predictor across HBM studies.",
    category: "individual",
    relatedTheory: "Health Belief Model (HBM)",
    keyAuthors: "Rosenstock, Becker, Champion, Carpenter",
    practicalExample: "Fear of colonoscopy pain or lack of clinic transportation."
  },
  {
    id: 'fc2',
    term: "Reciprocal Determinism",
    definition: "The dynamic, bidirectional interaction where personal cognitive factors, environmental contexts, and behavioral practices continually influence and shape one another.",
    category: "interpersonal",
    relatedTheory: "Social Cognitive Theory (SCT)",
    keyAuthors: "Albert Bandura, Cheryl Perry, Steven Kelder",
    practicalExample: "A student learns about nutrition (cognition), buys salad in cafeteria (behavior), prompting school board to expand fresh options (environment)."
  },
  {
    id: 'fc3',
    term: "Decisional Balance: Strong & Weak Principles",
    definition: "Strong Principle: Progress from Precontemplation to Action requires a ~1.0 SD increase in Pros. Weak Principle: Progress requires a ~0.5 SD decrease in Cons.",
    category: "individual",
    relatedTheory: "Transtheoretical Model (TTM)",
    keyAuthors: "James Prochaska, Wayne Velicer, K.L. Hall, Joseph Rossi",
    practicalExample: "In smoking cessation, raising the perceived benefits of quitting is twice as important as merely lowering barriers."
  },
  {
    id: 'fc4',
    term: "Integrated Behavioral Model (IBM)",
    definition: "An advanced synthesis of TRA/TPB and SCT stating that Behavioral Intention is shaped by Attitude, Perceived Norms, and Personal Agency, with performance moderated by Knowledge/Skills, Salience, Environment, and Habit.",
    category: "individual",
    relatedTheory: "Integrated Behavioral Model (IBM)",
    keyAuthors: "Martin Fishbein, Danuta Kasprzyk, Daniel Montaño",
    practicalExample: "Zimbabwe voluntary medical male circumcision message design."
  },
  {
    id: 'fc5',
    term: "Perceived vs Received Social Support",
    definition: "Perceived support (the belief that assistance will be available if needed) consistently improves health and survival (OR = 1.35). Received support (actual aid received) has complex effects and can increase stress if unresponsive.",
    category: "interpersonal",
    relatedTheory: "Social Support and Health",
    keyAuthors: "Julianne Holt-Lunstad, Bert Uchino, Lisa Berkman",
    practicalExample: "A patient feels secure knowing friends are on call, without feeling burdened by unwanted advice."
  },
  {
    id: 'fc6',
    term: "Transactional Model: Primary vs Secondary Appraisal",
    definition: "Primary appraisal evaluates the threat/harm of a stressor; Secondary appraisal assesses coping resources, controllability, and self-efficacy to manage the stressor.",
    category: "interpersonal",
    relatedTheory: "Stress, Coping and Adaptation",
    keyAuthors: "Richard Lazarus, Susan Folkman, Elaine Wethington",
    practicalExample: "Cancer diagnosis: 'Is this life-threatening?' (Primary) vs 'Can I manage chemotherapy with my family support?' (Secondary)."
  },
  {
    id: 'fc7',
    term: "Shift-and-Persist Coping",
    definition: "A resilient coping strategy among low-SES populations involving adapting to uncontrollable stressors (shifting) while maintaining positive purpose and future goals (persisting), lowering allostatic load.",
    category: "interpersonal",
    relatedTheory: "Stress, Coping and Health Disparities",
    keyAuthors: "Edith Chen, Gregory Miller, Margie Lachman",
    practicalExample: "A student in an under-resourced neighborhood manages daily financial stress while staying focused on university admission."
  },
  {
    id: 'fc8',
    term: "Social Network Analysis: Centrality & Bridges",
    definition: "Degree/Betweenness Centrality identifies influential community hubs; Bridging individuals connect otherwise isolated network clusters across structural holes.",
    category: "interpersonal",
    relatedTheory: "Social Network Theory (SNT)",
    keyAuthors: "Thomas W. Valente, Ronald Burt, Mark Granovetter",
    practicalExample: "Training popular peer opinion leaders in school networks to promote anti-smoking norms (ASSIST trial)."
  },
  {
    id: 'fc9',
    term: "Five Ecological Levels of Influence",
    definition: "1. Intrapersonal (beliefs, biology), 2. Interpersonal (family, peers), 3. Institutional/Organizational (workplace, school), 4. Community (built environment, culture), 5. Public Policy (laws, taxes).",
    category: "community",
    relatedTheory: "Ecological Models of Health Behavior",
    keyAuthors: "James F. Sallis, Neville Owen, Kenneth McLeroy",
    practicalExample: "Tobacco control combining quit counseling, smoke-free restaurants, and cigarette excise taxes."
  },
  {
    id: 'fc10',
    term: "Community-Based Participatory Research (CBPR)",
    definition: "A collaborative research approach equitably involving community members, organizational representatives, and academic researchers in all phases of the research and social action process.",
    category: "community",
    relatedTheory: "Community Engagement & Organizing",
    keyAuthors: "Nina Wallerstein, Meredith Minkler, Barbara Israel",
    practicalExample: "San Francisco Chinatown restaurant workers co-designing survey and winning the Wage Theft Prevention Ordinance."
  },
  {
    id: 'fc11',
    term: "Diffusion of Innovations: 5 Key Attributes",
    definition: "Rate of adoption depends on: 1. Relative Advantage, 2. Compatibility, 3. Simplicity (low complexity), 4. Trialability, 5. Observability.",
    category: "community",
    relatedTheory: "Diffusion of Innovations Theory",
    keyAuthors: "Everett M. Rogers, Ross C. Brownson, Karen Glanz",
    practicalExample: "Pool Cool sun-safety program dissemination across 400+ swimming pools."
  },
  {
    id: 'fc12',
    term: "CFIR (Consolidated Framework for Implementation Research)",
    definition: "A comprehensive framework unifying implementation constructs across 5 domains: Intervention Characteristics, Outer Setting, Inner Setting, Characteristics of Individuals, and Process.",
    category: "community",
    relatedTheory: "Implementation Science",
    keyAuthors: "Laura J. Damschroder, David Chambers, Ross Brownson",
    practicalExample: "Assessing organizational culture, leadership engagement, and workflow fit when rolling out hospital clinical guidelines."
  },
  {
    id: 'fc13',
    term: "PRECEDE-PROCEED: Predisposing, Enabling & Reinforcing",
    definition: "Predisposing (knowledge, beliefs, attitudes providing rationale), Enabling (skills, access, resources, policy), Reinforcing (social praise, feedback following behavior).",
    category: "planning",
    relatedTheory: "PRECEDE-PROCEED Planning Model",
    keyAuthors: "Lawrence W. Green, Marshall W. Kreuter",
    practicalExample: "Designing youth mental health awareness campaign: addressing stigma (predisposing), phone helpline (enabling), teacher support (reinforcing)."
  },
  {
    id: 'fc14',
    term: "Intervention Mapping Matrices of Change",
    definition: "A 6-step planning protocol that creates matrices crossing Performance Objectives ('who does what') with Behavioral Determinants ('why') to identify precise change targets and theory methods.",
    category: "planning",
    relatedTheory: "Intervention Mapping (IM)",
    keyAuthors: "L. Kay Bartholomew, Guy Parcel, Gerjo Kok, Christine Markham",
    practicalExample: "'It's Your Game' curriculum matching role-model video methods to refusal skill self-efficacy."
  },
  {
    id: 'fc15',
    term: "Loss Aversion & Deposit Contracts",
    definition: "The cognitive reality that psychological pain from a loss is 1.5-2.5x greater than joy from an equivalent gain. Deposit contracts leverage this by putting participant money at stake.",
    category: "economics",
    relatedTheory: "Behavioral Economics (Prospect Theory)",
    keyAuthors: "Daniel Kahneman, Amos Tversky, Kevin Volpp, George Loewenstein",
    practicalExample: "Participants deposit $50/month into an escrow account returned only if monthly weight-loss targets are met."
  },
  {
    id: 'fc16',
    term: "Status Quo & Default Bias (Nudge)",
    definition: "The cognitive tendency to stick with pre-selected default options unless active effort is made to change them.",
    category: "economics",
    relatedTheory: "Behavioral Economics & Choice Architecture",
    keyAuthors: "Richard Thaler, Cass Sunstein, Eric Johnson",
    practicalExample: "Setting automatic 90-day medication refills as the default option to dramatically boost patient adherence."
  },
  {
    id: 'fc17',
    term: "Social Marketing: 4 Ps & Consumer Benefit",
    definition: "Application of commercial marketing tools for societal welfare. Focuses on voluntary exchange: Product (bundle of benefits), Price (costs/barriers), Place (convenience channels), Promotion (persuasive communications).",
    category: "planning",
    relatedTheory: "Social Marketing in Health",
    keyAuthors: "Alan Andreasen, Philip Kotler, J. Douglas Storey",
    practicalExample: "Egypt's 'Ask-Consult' network branding family planning across 30,000 neighborhood pharmacies."
  }
];

export const GLOSSARY: GlossaryItem[] = [
  { term: "Theory", definition: "A set of interrelated concepts, definitions, and propositions that presents a systematic view of events or situations by specifying relations among variables in order to explain and predict phenomena.", category: "Foundations", keyTheorists: "Kerlinger, 1986; Glanz et al., 2015" },
  { term: "Construct", definition: "A concept that has been systematically developed, adopted, and defined for use within a specific theoretical framework.", category: "Foundations", keyTheorists: "Kerlinger, 1986" },
  { term: "Variable", definition: "The empirical, measurable counterpart or operational form of a theoretical construct.", category: "Foundations", keyTheorists: "Glanz, Rimer, Viswanath, 2015" },
  { term: "Model", definition: "A composite framework drawing upon multiple theories to understand a specific problem within a defined setting or context.", category: "Foundations", keyTheorists: "Earp & Ennett, 1991" },
  { term: "Perceived Susceptibility", definition: "An individual's subjective assessment of the risk or likelihood of contracting a disease or condition.", category: "HBM", keyTheorists: "Hochbaum, Rosenstock, Champion" },
  { term: "Perceived Severity", definition: "An individual's evaluation of the medical, clinical, and social seriousness of contracting an illness.", category: "HBM", keyTheorists: "Becker, Champion, Skinner" },
  { term: "Perceived Threat", definition: "The combined multiplicative construct formed by multiplying Perceived Susceptibility by Perceived Severity.", category: "HBM", keyTheorists: "Lewis, 1994" },
  { term: "Perceived Benefits", definition: "Beliefs regarding the positive outcomes, efficacy, and advantages of adopting a recommended health behavior.", category: "HBM", keyTheorists: "Rosenstock, Janz & Becker" },
  { term: "Perceived Barriers", definition: "Beliefs regarding the physical, financial, psychological, or social obstacles and costs associated with adopting a behavior.", category: "HBM", keyTheorists: "Carpenter, Harrison et al." },
  { term: "Cues to Action", definition: "Internal bodily symptoms or external stimuli (doctor advice, media, reminders) that trigger readiness to act.", category: "HBM", keyTheorists: "Hochbaum, Strecher & Rosenstock" },
  { term: "Self-Efficacy", definition: "An individual's situation-specific conviction and confidence in their capability to successfully execute a behavior.", category: "SCT / HBM / TPB", keyTheorists: "Albert Bandura, 1977, 1997" },
  { term: "Behavioral Intention", definition: "The subjective probability and readiness of performing a specific behavior; the most direct determinant of action in TRA/TPB/IBM.", category: "TRA / TPB / IBM", keyTheorists: "Martin Fishbein, Icek Ajzen" },
  { term: "Experiential Attitude", definition: "An individual's immediate affective or emotional response to the idea of performing a recommended health behavior.", category: "IBM", keyTheorists: "Fishbein & Cappella, Kasprzyk & Montaño" },
  { term: "Instrumental Attitude", definition: "Cognitively driven evaluation of the positive and negative consequences of behavioral performance.", category: "IBM / TPB", keyTheorists: "Ajzen & Fishbein" },
  { term: "Injunctive Norm", definition: "Beliefs about whether significant others approve or disapprove of performing a behavior, weighted by motivation to comply.", category: "TRA / TPB / IBM", keyTheorists: "Ajzen, Fishbein" },
  { term: "Descriptive Norm", definition: "Perceptions regarding what significant others or peers are actually doing in practice.", category: "IBM / Social Norms", keyTheorists: "Rivis & Sheeran, Cialdini" },
  { term: "Personal Agency", definition: "The capacity of an individual to exercise control over their own functioning, comprising perceived control and self-efficacy.", category: "IBM / SCT", keyTheorists: "Albert Bandura, Montaño & Kasprzyk" },
  { term: "Precontemplation", definition: "Stage of change where an individual has no intention to take action within the next six months.", category: "TTM", keyTheorists: "Prochaska & DiClemente" },
  { term: "Contemplation", definition: "Stage where an individual intends to change behavior within the next six months and is actively weighing pros vs cons.", category: "TTM", keyTheorists: "Prochaska, DiClemente, Velicer" },
  { term: "Preparation", definition: "Stage where an individual intends to take action within the next 30 days and has taken preliminary behavioral steps.", category: "TTM", keyTheorists: "Prochaska et al." },
  { term: "Action Stage", definition: "Stage where an individual has overtly modified their lifestyle and behavior for less than six months.", category: "TTM", keyTheorists: "Prochaska, Velicer" },
  { term: "Maintenance Stage", definition: "Stage where an individual has maintained overt behavior change for more than six months and is working to prevent relapse.", category: "TTM", keyTheorists: "Prochaska, Redding" },
  { term: "Decisional Balance", definition: "The cognitive weighing of the advantages (pros) versus disadvantages (cons) of behavior change.", category: "TTM", keyTheorists: "Janis & Mann, Prochaska et al." },
  { term: "Reciprocal Determinism", definition: "The triadic model in which behavior, internal cognitive/personal factors, and environmental influences operate as interacting determinants.", category: "SCT", keyTheorists: "Albert Bandura, 1986" },
  { term: "Behavioral Capability", definition: "A person's actual knowledge of what to do and the practical repertoire of skills needed to perform the behavior.", category: "SCT", keyTheorists: "Bandura, Perry & Kelder" },
  { term: "Observational Learning", definition: "Learning new behaviors and their consequences by observing the actions of credible role models (vicarious learning).", category: "SCT", keyTheorists: "Albert Bandura, 1977, 1986" },
  { term: "Collective Efficacy", definition: "A group's shared belief in its conjoint capability to organize and execute courses of action required to achieve designated levels of attainment.", category: "SCT", keyTheorists: "Albert Bandura, 2000" },
  { term: "Functional Social Support", definition: "The specific qualitative functions provided by social ties: Emotional, Informational, Tangible, and Belonging support.", category: "Social Support", keyTheorists: "Holt-Lunstad, Uchino, Cohen & Wills" },
  { term: "Social Network Analysis (SNA)", definition: "Quantitative mapping and analysis of the structure and properties of ties among actors in a social system.", category: "SNA", keyTheorists: "Thomas W. Valente, Wasserman & Faust" },
  { term: "Betweenness Centrality", definition: "The degree to which a node lies on the shortest paths connecting other pairs of nodes in a network, indicating bridging power.", category: "SNA", keyTheorists: "Linton Freeman, 1979" },
  { term: "Primary Appraisal", definition: "Judgment of an event's significance regarding potential harm, threat, or challenge to personal well-being.", category: "Stress & Coping", keyTheorists: "Lazarus & Folkman, 1984" },
  { term: "Secondary Appraisal", definition: "Assessment of coping options, controllability of the situation, and personal self-efficacy to manage the stressor.", category: "Stress & Coping", keyTheorists: "Lazarus & Folkman, Wethington" },
  { term: "Meaning-Based Coping", definition: "Coping processes (positive reappraisal, revised goals, spiritual beliefs) that generate positive affect during chronic stress.", category: "Stress & Coping", keyTheorists: "Susan Folkman & Judith Moskowitz, 2000" },
  { term: "Allostatic Load", definition: "The cumulative biological wear and tear on the body and brain resulting from chronic overactivation of physiological stress response systems.", category: "Stress Physiology", keyTheorists: "Bruce S. McEwen, 2012" },
  { term: "Shared Decision Making (SDM)", definition: "A collaborative clinical process where clinician and patient make health decisions together, aligning clinical evidence with patient values.", category: "Health Communication", keyTheorists: "Richard Street, Ronald Epstein, G. Makoul" },
  { term: "Community Capacity", definition: "Community characteristics that affect its ability to identify, mobilize around, and address social and public health problems.", category: "Community", keyTheorists: "Robert M. Goodman, Nina Wallerstein" },
  { term: "Empowerment", definition: "A social action process by which individuals, organizations, and communities gain mastery over their lives to transform conditions.", category: "Community", keyTheorists: "Julian Rappaport, Nina Wallerstein" },
  { term: "Diffusion of Innovations", definition: "The process by which an innovation is communicated through specific channels over time among members of a social system.", category: "Diffusion", keyTheorists: "Everett M. Rogers, 1962, 2003" },
  { term: "CFIR", definition: "Consolidated Framework for Implementation Research; a meta-framework across 5 domains guiding evidence-based practice translation.", category: "Implementation", keyTheorists: "Laura J. Damschroder et al., 2009" },
  { term: "PRECEDE-PROCEED", definition: "An 8-phase health program planning and evaluation framework moving from epidemiological diagnosis backward to intervention strategies.", category: "Planning", keyTheorists: "Lawrence W. Green, Marshall W. Kreuter" },
  { term: "Intervention Mapping (IM)", definition: "A 6-step protocol for developing theory- and evidence-based health promotion programs utilizing matrices of change objectives.", category: "Planning", keyTheorists: "L. Kay Bartholomew, Guy Parcel, Gerjo Kok" },
  { term: "Present Bias", definition: "The human tendency to heavily discount future outcomes in favor of immediate gratification or avoidance of immediate costs.", category: "Behavioral Economics", keyTheorists: "George Loewenstein, Ted O'Donoghue, Kevin Volpp" },
  { term: "Loss Aversion", definition: "The principle from Prospect Theory that the disutility of a loss is psychologically 1.5-2.5 times greater than the utility of an equivalent gain.", category: "Behavioral Economics", keyTheorists: "Daniel Kahneman, Amos Tversky, 1979" },
  { term: "Social Marketing", definition: "The application of commercial marketing technologies to influence voluntary behavior of target audiences for individual and social welfare.", category: "Social Marketing", keyTheorists: "Alan R. Andreasen, Philip Kotler, J. Douglas Storey" }
];

export const BADGES: Badge[] = [
  { id: 'b_explorer', title: 'Theory Explorer', description: 'Explored 3 or more health behavior theories', iconName: 'Compass' },
  { id: 'b_scholar', title: 'Academic Scholar', description: 'Achieved 80%+ on the comprehensive quiz', iconName: 'GraduationCap' },
  { id: 'b_speedster', title: 'Theory Master', description: 'Scored 5+ in the Theory Speed Challenge', iconName: 'Zap' },
  { id: 'b_strategist', title: 'Public Health Strategist', description: 'Completed 3 real-world case scenario analyses', iconName: 'Award' },
  { id: 'b_memory', title: 'Construct Memory Pro', description: 'Mastered 10+ flashcard terms', iconName: 'Brain' },
  { id: 'b_architect', title: 'Intervention Architect', description: 'Used the Decision Matrix & Logic Model Builder', iconName: 'LayoutGrid' }
];

export const USEFUL_SOURCES_EXPANDED = [
  {
    title: 'Health Behavior: Theory, Research, and Practice (5th Edition)',
    authors: 'Karen Glanz, Barbara K. Rimer, K. Viswanath (Eds.)',
    publisher: 'Jossey-Bass / Wiley, 2015',
    link: 'https://www.wiley.com/en-us/Health+Behavior:+Theory,+Research,+and+Practice,+5th+Edition-p-9781118628980',
    desc: 'The definitive gold-standard text providing rigorous conceptual and empirical foundations for health behavior change across individual, interpersonal, community, and policy levels.'
  },
  {
    title: 'Theory at a Glance: A Guide For Health Promotion Practice (2nd Edition)',
    authors: 'Dr. Barbara K. Rimer & Dr. Karen Glanz',
    publisher: 'National Cancer Institute (NIH Publication No. 05-3896)',
    link: 'https://cancercontrol.cancer.gov/sites/default/files/2020-06/theory.pdf',
    desc: 'Seminal NCI manual summarizing individual, interpersonal, and community theories into accessible frameworks for health promotion practitioners.'
  },
  {
    title: 'The Guide to Community Preventive Services (The Community Guide)',
    authors: 'Task Force on Community Preventive Services / CDC',
    publisher: 'CDC & US Department of Health and Human Services',
    link: 'https://www.thecommunityguide.org',
    desc: 'Free, evidence-based recommendations on population-level interventions to promote health and prevent disease across communities and worksites.'
  },
  {
    title: 'Consolidated Framework for Implementation Research (CFIR)',
    authors: 'Laura J. Damschroder et al.',
    publisher: 'Implementation Science / CFIR Research Team',
    link: 'https://cfirguide.org',
    desc: 'Practical technical assistance website, qualitative interview guides, and construct definitions for evaluating intervention implementation in healthcare systems.'
  },
  {
    title: 'The Community Tool Box',
    authors: 'Stephen B. Fawcett et al., University of Kansas',
    publisher: 'Center for Community Health and Development',
    link: 'https://ctb.ku.edu',
    desc: 'Over 9,000 pages of practical open-access tools for community organization, coalition building, needs assessment, advocacy, and evaluation.'
  },
  {
    title: 'WHO Health Promotion & Social Determinants of Health',
    authors: 'World Health Organization (WHO)',
    publisher: 'Geneva: World Health Organization',
    link: 'https://www.who.int/health-topics/health-promotion',
    desc: 'Global strategies, Ottawa Charter declarations, and guidelines on health equity, empowerment, and disease prevention.'
  }
];
