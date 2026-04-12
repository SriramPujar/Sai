import { SaiAnswer } from '../types';

const THEMES = [
  'faith', 'patience', 'surrender', 'healing', 'courage', 'forgiveness', 
  'family harmony', 'career', 'peace', 'seva', 'trust', 'gratitude', 'growth'
];

const SAMPLE_ANSWERS: Partial<SaiAnswer>[] = [
  {
    id: 1,
    title: "Success is Near",
    main_message: "You will get success. Do not worry. Keep faith in Sai Baba and proceed with your work. The obstacles will be removed soon.",
    practical_action: "Offer a coconut or sweets at a nearby temple.",
    mantra: "Om Sai Ram",
    chapter_recommendation: "Chapter 11",
    theme: "faith",
    mood_tags: ["anxious", "confused", "waiting"],
    share_quote: "Faith removes all obstacles."
  },
  {
    id: 9,
    title: "Wait for Some Time",
    main_message: "Wait for some time. Do not make any hasty decisions right now. Have patience (Saburi). The right time will come soon.",
    practical_action: "Read Sai Satcharitra daily.",
    mantra: "Om Shri Sai Nathaya Namah",
    chapter_recommendation: "Chapter 19",
    theme: "patience",
    mood_tags: ["impatient", "stressed", "seeking"],
    share_quote: "Patience brings the best results."
  },
  {
    id: 108,
    title: "Work Will Be Done",
    main_message: "Your work will be done successfully. Remember Sai Baba and start your work. You will get help from an unexpected source.",
    practical_action: "Donate food to the poor.",
    mantra: "Om Sai Rakshak Sharanam",
    chapter_recommendation: "Chapter 24",
    theme: "surrender",
    mood_tags: ["overwhelmed", "tired", "sad"],
    share_quote: "Sai Baba's help comes in unexpected ways."
  },
  {
    id: 720,
    title: "Auspicious Time",
    main_message: "This is an auspicious time for you. Whatever you start now will bring good results. Sai Baba's blessings are with you.",
    practical_action: "Light a lamp (Diya) in front of Baba.",
    mantra: "Om Sai Shanti",
    chapter_recommendation: "Chapter 51",
    theme: "growth",
    mood_tags: ["peaceful", "grateful", "seeking"],
    share_quote: "Auspicious beginnings lead to great endings."
  }
];

// Deterministic generator for the rest of the 720 answers
export function getSaiAnswer(id: number): SaiAnswer {
  const existing = SAMPLE_ANSWERS.find(a => a.id === id);
  if (existing) return existing as SaiAnswer;

  // Seeded pseudo-random generation based on ID
  const themeIndex = id % THEMES.length;
  const theme = THEMES[themeIndex];
  
  const titles = [
    "Do Not Worry", "Success is Yours", "Have Patience", "Good News Coming", 
    "Remember Sai", "Work Will Be Done", "Avoid Arguments", "Travel is Beneficial",
    "Health Will Improve", "Financial Gain", "Trust in Baba", "Help is Near"
  ];
  
  const messages = [
    "Do not worry. Your problem will be solved very soon. Keep faith in Sai Baba.",
    "You will get success in your endeavor. Proceed with confidence.",
    "Have patience (Saburi). The time is not right yet. Wait for a few days.",
    "You will receive good news soon. Your mind will be at peace.",
    "Remember Sai Baba before starting any new work. He will guide you.",
    "Your pending work will be completed successfully. Do not lose hope.",
    "Avoid arguments and conflicts today. Stay calm and peaceful.",
    "Travel will be beneficial for you. You will meet someone helpful.",
    "Your health or the health of your loved one will improve soon. Do not worry.",
    "You will experience financial gain. Use it wisely and donate a portion.",
    "Trust in Baba completely. Surrender your worries at His feet.",
    "Help will come to you from an unexpected person. Be grateful."
  ];

  const actions = [
    "Read Chapter 11 of Sai Satcharitra.",
    "Donate food to the poor or hungry.",
    "Offer Udi (sacred ash) and water to Baba.",
    "Chant 'Om Sai Ram' 108 times.",
    "Light a lamp (Diya) in your house.",
    "Feed a dog or a cow.",
    "Visit a nearby Sai Baba temple.",
    "Give some money in charity.",
    "Read Chapter 15 of Sai Satcharitra.",
    "Offer yellow flowers to Sai Baba.",
    "Distribute sweets to children.",
    "Keep a fast on Thursday."
  ];

  return {
    id,
    title: titles[id % titles.length],
    main_message: messages[(id * 3) % messages.length],
    practical_action: actions[(id * 7) % actions.length],
    mantra: "Om Sai Ram",
    chapter_recommendation: `Chapter ${(id % 50) + 1}`,
    theme,
    mood_tags: ["seeking", "faith"],
    share_quote: "Shraddha and Saburi (Faith and Patience)."
  };
}
