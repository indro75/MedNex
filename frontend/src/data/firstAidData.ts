import { FirstAidGuide } from '../types';

export const FIRST_AID_GUIDES: FirstAidGuide[] = [
  {
    id: 'minor-burns',
    title: 'Minor Burns (1st & Superficial 2nd Degree)',
    titleBn: 'সামান্য পোড়া (১ম ও পৃষ্ঠীয় ২য় ডিগ্রি)',
    category: 'Thermal & Burns',
    categoryBn: 'তাপ ও পোড়াজনিত জরুরি সেবা',
    iconName: 'Flame',
    shortDesc: 'Immediate cooling and protective care for minor heat or scald burns without skin breaks.',
    shortDescBn: 'চামড়া অক্ষত থাকা অবস্থায় আগুন, গরম পানি বা তাপে সামান্য পোড়ার দ্রুত শীতলীকরণ ও প্রাথমিক যত্ন।',
    severityWarning: 'If the burn covers a large area, faces/joints/genitals, or appears charred/white, seek immediate emergency care.',
    severityWarningBn: 'পোড়ার ক্ষত যদি শরীরের বড় অংশ, মুখমণ্ডল, অস্থিসন্ধি বা গোপনাঙ্গে হয় অথবা চামড়া কয়লার মতো বা সাদা হয়ে যায়, তবে অবিলম্বে জরুরি বিভাগে যান।',
    immediateSafety: [
      'Ensure the source of heat (fire, boiling liquid, steam) is removed and the area is safe.',
      'Do not touch or peel off melted clothing stuck directly to the burn.'
    ],
    immediateSafetyBn: [
      'তাপের উৎস (আগুন, ফুটন্ত পানি, বাষ্প) থেকে দ্রুত নিরাপদ দূরত্বে সরে যান।',
      'পোড়া ত্বকের সাথে কাপড়ের কোনো অংশ গলে লেগে থাকলে তা টেনে তোলার চেষ্টা করবেন না।'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cool with Cool Running Water',
        titleBn: 'স্বাভাবিক প্রবাহমান ঠান্ডা পানি ঢালুন',
        instruction: 'Hold the burned area under cool (not freezing or iced) running water for at least 15 to 20 minutes to stop tissue damage.',
        instructionBn: 'পোড়া অংশে কমপক্ষে ১৫ থেকে ২০ মিনিট স্বাভাবিক তাপমাত্রার ঠান্ডা প্রবাহমান পানি ঢালুন যাতে অভ্যন্তরীণ কলা ক্ষতিগ্রস্থ না হয়।'
      },
      {
        stepNumber: 2,
        title: 'Remove Constricting Items Early',
        titleBn: 'আংটি বা টাইট জিনিস খুলে ফেলুন',
        instruction: 'Carefully remove rings, watches, tight clothes, or belts near the area before swelling begins.',
        instructionBn: 'আক্রান্ত স্থান ফুলে ওঠার আগেই সাবধানে আংটি, ঘড়ি, টাইট পোশাক বা বেল্ট খুলে ফেলুন।'
      },
      {
        stepNumber: 3,
        title: 'Cover Loosely with Clean Dressing',
        titleBn: 'জীবাণুমুক্ত গজ বা ব্যান্ডেজ দিয়ে ঢেকে দিন',
        instruction: 'Apply a sterile, non-stick gauze or clean plastic wrap loosely over the burn to protect from dirt and bacteria.',
        instructionBn: 'ক্ষতের ওপর পরিষ্কার জীবাণুমুক্ত গজ বা পাতলা পরিষ্কার প্লাস্টিক র‍্যাপ আলতো করে জড়িয়ে দিন যেন ধুলাবালি ও জীবাণু না ঢোকে।'
      },
      {
        stepNumber: 4,
        title: 'Manage Pain Safely',
        titleBn: 'ব্যথানাশক ঔষধ গ্রহণ',
        instruction: 'Over-the-counter pain relief such as Paracetamol can be taken if appropriate for the person.',
        instructionBn: 'ব্যথা কমানোর জন্য চিকিৎসকের পরামর্শ বা নিয়ম মেনে প্যারাসিটামল সেবন করা যেতে পারে।'
      }
    ],
    dos: [
      'Cool under running tap water for 15-20 minutes continuously',
      'Keep the burn clean and shielded with sterile non-adherent dressing',
      'Keep hydrated by drinking clean water'
    ],
    dosBn: [
      'ট্যাপের স্বাভাবিক ঠান্ডা পানি টানা ১৫-২০ মিনিট পোড়া স্থানে ঢালুন',
      'পোড়া স্থান সবসময় পরিষ্কার ও জীবাণুমুক্ত ড্রেসিং দিয়ে হালকা ঢেকে রাখুন',
      'পর্যাপ্ত পরিমাণে বিশুদ্ধ খাবার পানি পান করুন'
    ],
    donts: [
      'DO NOT use ice, iced water, or frozen packets (causes tissue frostbite & shock)',
      'DO NOT apply toothpaste, butter, raw egg, soy sauce, or oil',
      'DO NOT burst blisters or peel peeled skin (blisters prevent infection)'
    ],
    dontsBn: [
      'কখনোই বরফ বা অতিরিক্ত হিমশীতল পানি ব্যবহার করবেন না (কোষের অপূরণীয় ক্ষতি হয়)',
      'টুথপেস্ট, মাখন, কাঁচা ডিম, তেল বা পাতার রস ক্ষতস্থানে লাগাবেন না',
      'পোড়ার ফোস্কা ফাটাবেন না বা আলগা চামড়া টেনে তুলবেন না (ফোস্কা জীবাণু সংক্রমণ প্রতিরোধ করে)'
    ],
    whenToSeekEmergency: [
      'Burn is larger than 3 inches in diameter or the person is a baby / elderly',
      'Burn affects face, eyes, neck, hands, feet, joints, or groin',
      'Skin appears leathery, deep white, blackened, or completely painless (3rd degree nerve burn)',
      'Signs of infection develop: increasing redness, pus, or fever'
    ],
    whenToSeekEmergencyBn: [
      'পোড়া অংশ যদি ৩ ইঞ্চির চেয়ে বড় হয় অথবা আক্রান্ত ব্যক্তি শিশু বা প্রবীণ হন',
      'পোড়া মুখ, চোখ, ঘাড়, হাত, পা, জোড় বা গোপনাঙ্গে হলে',
      'চামড়া যদি কালচে, ধবধবে সাদা হয়ে যায় বা অনুভূতিহীন হয়ে পড়ে (৩য় ডিগ্রি নার্ভ ধ্বংসকারী পোড়া)',
      'সংক্রমণের লক্ষণ যেমন লালচে ভাব বৃদ্ধি, পুঁজ বা জ্বর দেখা দিলে'
    ]
  },
  {
    id: 'cuts-wounds',
    title: 'Cuts, Lacerations & Bleeding',
    titleBn: 'কাটাছেঁড়া ও রক্তপাত নিয়ন্ত্রণ',
    category: 'Wounds & Trauma',
    categoryBn: 'ক্ষত ও ট্রমা ব্যবস্থাপনা',
    iconName: 'Scissors',
    shortDesc: 'Controlling bleeding and preventing infection for cuts, scrapes, and abrasions.',
    shortDescBn: 'কাটাছেঁড়া, আঁচড় ও সাধারণ ক্ষতে রক্তপাত বন্ধ করা এবং সংক্রমণ প্রতিরোধের প্রাথমিক উপায়।',
    severityWarning: 'Spurting bright red blood indicates arterial bleeding: apply firm direct pressure and call 999 immediately!',
    severityWarningBn: 'পিনকি দিয়ে উজ্জ্বল লাল রক্ত বের হওয়া ধমনী কেটে যাওয়ার লক্ষণ: শক্তভাবে চেপে ধরে অবিলম্বে ৯৯৯ এ কল করুন!',
    immediateSafety: [
      'Wash your hands with soap or wear disposable gloves if available before touching the wound.'
    ],
    immediateSafetyBn: [
      'ক্ষতে স্পর্শ করার আগে অবশ্যই সাবান দিয়ে হাত ধুয়ে নিন বা ডিসপোজেবল গ্লাভস পরিধান করুন।'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Apply Direct Firm Pressure',
        titleBn: 'ক্ষতের ওপর সরাসরি চাপ প্রয়োগ',
        instruction: 'Place a clean gauze or clean cloth directly on the wound and press firmly for 5 to 10 minutes continuously without lifting.',
        instructionBn: 'একটি পরিষ্কার গজ বা কাপড় সরাসরি ক্ষতের ওপর রেখে একটানা ৫ থেকে ১০ মিনিট শক্ত করে চেপে ধরে রাখুন।'
      },
      {
        stepNumber: 2,
        title: 'Elevate Above Heart Level',
        titleBn: 'হৃদপিণ্ডের চেয়ে উঁচুতে রাখুন',
        instruction: 'If the bleeding is on an arm or leg, keep it raised above heart level while maintaining steady pressure.',
        instructionBn: 'হাত বা পায়ে আঘাত হলে চাপ বজায় রেখেই ক্ষতস্থান হৃদপিণ্ডের উচ্চতার চেয়ে কিছুটা ওপরে তুলে রাখুন।'
      },
      {
        stepNumber: 3,
        title: 'Clean the Wound Gently',
        titleBn: 'ক্ষত সাবধানে পরিষ্কার করুন',
        instruction: 'Once bleeding has stopped, rinse the wound gently with clean potable running water. Wash surrounding skin with mild soap.',
        instructionBn: 'রক্ত বন্ধ হলে পরিষ্কার খাবার পানি দিয়ে ক্ষতের চারপাশ ধুয়ে ফেলুন। ক্ষতের চারপাশে মৃদু সাবান দিয়ে ধুতে পারেন।'
      },
      {
        stepNumber: 4,
        title: 'Apply Dressing',
        titleBn: 'ব্যান্ডেজ বা ড্রেসিং লাগান',
        instruction: 'Apply an antibiotic ointment or petroleum jelly, then cover with a sterile adhesive bandage or gauze.',
        instructionBn: 'অ্যান্টিবায়োটিক মলম বা পেট্রোলিয়াম জেলি লাগিয়ে জীবাণুমুক্ত ব্যান্ডেজ বা গজ দিয়ে ঢেকে রাখুন।'
      }
    ],
    dos: [
      'Maintain steady, uninterrupted direct pressure for at least 5-10 minutes',
      'Clean dirt around the wound with clean water and mild soap',
      'Check if the patient has received a Tetanus vaccine within the last 5-10 years'
    ],
    dosBn: [
      'কমপক্ষে ৫-১০ মিনিট বিরতিহীনভাবে ক্ষতের ওপর সরাসরি চাপ ধরে রাখুন',
      'ক্ষতের চারপাশের ময়লা পরিষ্কার পানি দিয়ে ধুয়ে নিন',
      'গত ৫-১০ বছরের মধ্যে ধনুষ্টংকার (টিটেনাস) টিকা নেওয়া হয়েছে কিনা যাচাই করুন'
    ],
    donts: [
      'DO NOT pull out deeply embedded objects (glass, knife, metal) — pack around it and seek ER immediately',
      'DO NOT remove the soaked cloth; add more clean cloth on top and keep pressing',
      'DO NOT apply harsh antiseptics like pure hydrogen peroxide or strong alcohol directly inside open flesh wounds'
    ],
    dontsBn: [
      'গভীরভাবে গেঁথে থাকা বস্তু (কাচ, ছুরি বা পেরেক) টেনে বের করবেন না — চারপাশ বেঁধে দ্রুত হাসপাতালে যান',
      'রক্তে ভিজে যাওয়া কাপড় তুলে ফেলবেন না; তার ওপরেই আরও পরিষ্কার কাপড় চেপে ধরে রাখুন',
      'খোলা কাঁচা ক্ষতের ভেতরে সরাসরি কড়া অ্যালকোহল বা হাইড্রোজেন পারক্সাইড ঢালবেন না'
    ],
    whenToSeekEmergency: [
      'Blood spurts rapidly or bleeding does not stop after 10-15 minutes of firm pressure',
      'Wound is deep, gaping, or exposes fat, muscle, tendon, or bone (requires stitches within 6 hours)',
      'Wound was caused by a dirty, rusty metal object or an animal bite'
    ],
    whenToSeekEmergencyBn: [
      'টানা ১০-১৫ মিনিট চেপে রাখার পরও যদি ফিনকি দিয়ে রক্ত বের হয় বা রক্তপাত না থামে',
      'ক্ষতটি গভীর হলে এবং ভেতরের চর্বি, পেশী বা হাড় দেখা গেলে (৬ ঘণ্টার মধ্যে সেলাই প্রয়োজন)',
      'মরিচা ধরা লোহা, নোংরা বস্তু বা পশুর কামড় থেকে ক্ষত সৃষ্টি হলে'
    ]
  },
  {
    id: 'choking',
    title: 'Choking (Heimlich Maneuver)',
    titleBn: 'গলায় কিছু আটকে যাওয়া (হাইমলিক পদ্ধতি)',
    category: 'Respiratory Emergencies',
    categoryBn: 'শ্বাসতন্ত্রের জরুরি অবস্থা',
    iconName: 'AlertTriangle',
    shortDesc: 'Crucial life-saving airway clearance protocol for a conscious choking person.',
    shortDescBn: 'সচেতন ব্যক্তির শ্বাসকষ্ট বা শ্বাসনালীতে খাদ্য আটকে গেলে জীবন রক্ষাকারী প্রাথমিক পদক্ষেপ।',
    severityWarning: 'If the person cannot breathe, speak, cough, or turns blue, act immediately while shouting for someone to dial 999!',
    severityWarningBn: 'ব্যক্তি যদি শ্বাস নিতে, কথা বলতে বা কাশতে না পারে এবং চেহারা নীল হয়ে আসে, তবে দ্রুত কাউকে ৯৯৯ এ ফোন দিতে বলুন এবং পদক্ষেপ নিন!',
    immediateSafety: [
      'Confirm the person is truly choking: ask "Are you choking? Can you speak or cough?"',
      'If they can cough forcefully, encourage coughing and do not interfere.'
    ],
    immediateSafetyBn: [
      'নিশ্চিত হোন ব্যক্তি সত্যিই বিষম খেয়েছেন কিনা: জিজ্ঞেস করুন "আপনি কি কথা বলতে পারছেন বা কাশতে পারছেন?"',
      'যদি তিনি জোরালোভাবে কাশতে পারেন, তবে তাকে কাশতে উৎসাহ দিন এবং পিঠে চাপ দেবেন না।'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Deliver 5 Firm Back Blows',
        titleBn: 'পিঠে ৫ বার জোরে থাপ্পড় দিন',
        instruction: 'Stand slightly behind them. Support their chest with one hand and lean them forward. Deliver 5 sharp blows between the shoulder blades with the heel of your hand.',
        instructionBn: 'ব্যক্তির পেছনে দাঁড়িয়ে এক হাত দিয়ে বুক ধরে তাকে কিছুটা সামনের দিকে ঝুঁকে দিন। হাতের তালু দিয়ে কাঁধের হাড় দুটির মাঝে ৫ বার জোরে আঘাত করুন।'
      },
      {
        stepNumber: 2,
        title: 'Perform 5 Abdominal Thrusts (Heimlich)',
        titleBn: 'পেটে ৫ বার ঊর্ধ্বমুখী চাপ দিন (হাইমলিক)',
        instruction: 'Stand behind them. Wrap your arms around their waist. Make a fist with one hand and place the thumb side just above their navel (below ribs). Grasp fist with your other hand and pull sharply inward and upward.',
        instructionBn: 'পেছন থেকে দুই হাত দিয়ে পেটের চারপাশ জড়িয়ে ধরুন। এক হাত মুষ্টিবদ্ধ করে নাভির ঠিক ওপরে রাখুন এবং অন্য হাত দিয়ে তা চেপে ধরে ভেতরের ও ওপরের দিকে ৫ বার তীব্র চাপ দিন।'
      },
      {
        stepNumber: 3,
        title: 'Alternate 5 and 5',
        titleBn: 'পর্যায়ক্রমে ৫ বার পিঠে ও ৫ বার পেটে চাপ',
        instruction: 'Continue alternating between 5 back blows and 5 abdominal thrusts until the object is expelled.',
        instructionBn: 'বস্তুটি মুখ দিয়ে বেরিয়ে না আসা পর্যন্ত ৫ বার পিঠে আঘাত ও ৫ বার পেটে ঊর্ধ্বমুখী চাপ পর্যায়ক্রমে চালিয়ে যান।'
      },
      {
        stepNumber: 4,
        title: 'If Victim Becomes Unresponsive',
        titleBn: 'ব্যক্তি অজ্ঞান হয়ে গেলে',
        instruction: 'Carefully lower them to the floor, call 999, begin CPR (chest compressions), and inspect mouth before rescue breaths.',
        instructionBn: 'সাবধানে মেঝেতে শুইয়ে দিন, অবিলম্বে ৯৯৯ এ কল করুন এবং বুকে কৃত্রিম চাপ (সিপিআর) দেওয়া শুরু করুন।'
      }
    ],
    dos: [
      'Encourage forceful coughing if they can still make sound or breathe',
      'Lean the person forward so the expelled object falls out of the mouth, not back down',
      'Call 999 or rush to the nearest emergency room immediately'
    ],
    dosBn: [
      'যদি ব্যক্তি শব্দ করতে পারেন তবে তাকে তীব্রভাবে কাশতে উৎসাহিত করুন',
      'ব্যক্তিকে সামনের দিকে ঝুঁকে রাখুন যাতে নির্গত বস্তু আবার শ্বাসনালীতে না ফিরে যায়',
      'দ্রুত ৯৯৯ এ কল করুন বা কাছের জরুরি বিভাগে নিয়ে যান'
    ],
    donts: [
      'DO NOT perform blind finger sweeps in the mouth (can push object further into trachea)',
      'DO NOT slap their back if they are standing fully upright (gravity will pull object down)',
      'DO NOT give water or liquids to a choking individual'
    ],
    dontsBn: [
      'না দেখে মুখের ভেতরে আঙ্গুল ঢুকিয়ে খোঁজাখুঁজি করবেন না (বস্তুটি আরও গভীরে চলে যেতে পারে)',
      'সোজা দাঁড়িয়ে থাকা অবস্থায় পিঠে চাপ দেবেন না (মাধ্যাকর্ষণে বস্তুটি নিচে নামতে পারে)',
      'গলায় খাবার আটকে থাকা ব্যক্তিকে পানি বা পানীয় পান করাবেন না'
    ],
    whenToSeekEmergency: [
      'The person cannot make sound, cough, or breathe',
      'Lips, face, or fingernails turn blue or pale (cyanosis)',
      'The victim loses consciousness or collapses'
    ],
    whenToSeekEmergencyBn: [
      'ব্যক্তি কোনো শব্দ করতে, কাশতে বা শ্বাস নিতে না পারলে',
      'ঠোঁট, মুখ বা নখের কোণা নীল বা ফ্যাকাশে হয়ে আসলে (অক্সিজেনের অভাব)',
      'ব্যক্তি হঠাৎ অচেতন হয়ে পড়লে বা ঢলে পড়লে'
    ]
  },
  {
    id: 'nosebleeds',
    title: 'Nosebleeds (Epistaxis)',
    titleBn: 'নাক দিয়ে রক্ত পড়া (এপিস্ট্যাক্সিস)',
    category: 'Common First Aid',
    categoryBn: 'সাধারণ প্রাথমিক চিকিৎসা',
    iconName: 'Droplet',
    shortDesc: 'Proper positioning and pressure control to resolve nasal bleeding safely.',
    shortDescBn: 'সঠিক ভঙ্গিতে বসে চাপ প্রয়োগের মাধ্যমে নাক থেকে রক্তপাত নিরাপদভাবে বন্ধ করার উপায়।',
    severityWarning: 'Never tilt the head backward: blood running down the airway can cause coughing, vomiting, and choking.',
    severityWarningBn: 'মাথা কখনোই পেছনের দিকে হেলাবেন না: রক্ত শ্বাসনালী বা পেটে গিয়ে বমি ও দমবন্ধ হওয়ার ঝুঁকি তৈরি করে।',
    immediateSafety: [
      'Keep the person calm and seated upright.'
    ],
    immediateSafetyBn: [
      'রোগীকে শান্ত রাখুন এবং সোজা বসিয়ে রাখুন।'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Sit Upright and Lean Forward',
        titleBn: 'সোজা হয়ে বসে সামনের দিকে ঝুঁকুন',
        instruction: 'Sit straight and lean slightly forward so blood drains out through the nose rather than down the back of the throat.',
        instructionBn: 'সোজা হয়ে বসুন এবং সামান্য সামনের দিকে ঝুঁকুন যাতে রক্ত গলার ভেতরে না গিয়ে নাক দিয়ে বাইরে ঝরে পড়ে।'
      },
      {
        stepNumber: 2,
        title: 'Pinch the Soft Part of the Nose',
        titleBn: 'নাকের নরম অংশ চেপে ধরুন',
        instruction: 'Use your thumb and index finger to firmly pinch the soft fleshy part of both nostrils just below the bony bridge.',
        instructionBn: 'নাকের শক্ত হাড়ের ঠিক নিচের নরম মাংসল অংশটি বৃদ্ধাঙ্গুলি ও তর্জনী দিয়ে শক্ত করে চেপে ধরে রাখুন।'
      },
      {
        stepNumber: 3,
        title: 'Breathe Through Mouth for 10-15 Mins',
        titleBn: '১০-১৫ মিনিট মুখ দিয়ে শ্বাস নিন',
        instruction: 'Maintain continuous pinching for a full 10 to 15 minutes by the clock without releasing to check.',
        instructionBn: 'ঘড়ি দেখে টানা ১০ থেকে ১৫ মিনিট মুখ দিয়ে শ্বাস নিন এবং বারবার ছেড়ে দিয়ে রক্ত পড়া বন্ধ হলো কিনা তা দেখতে যাবেন না।'
      },
      {
        stepNumber: 4,
        title: 'Apply Cold Pack to Bridge',
        titleBn: 'নাকের ডগায় বরফ বা ঠান্ডা সেঁক দিন',
        instruction: 'Place a cool cloth or wrapped ice pack over the bridge of the nose and forehead to help constrict blood vessels.',
        instructionBn: 'একটি পরিষ্কার কাপড়ে বরফ মুড়িয়ে নাকের ওপর ও কপালে ধরুন যাতে রক্তনালীগুলো সংকুচিত হয়।'
      }
    ],
    dos: [
      'Lean forward slightly and spit out any blood that enters the mouth',
      'Pinch continuously for at least 10 minutes without letting go',
      'Rest quietly after bleeding stops; avoid blowing nose or bending over for a few hours'
    ],
    dosBn: [
      'সামনের দিকে ঝুঁকে থাকুন এবং মুখে রক্ত এলে তা থুথু দিয়ে ফেলে দিন',
      'টানা কমপক্ষে ১০ মিনিট শক্ত করে নাকের নরম অংশ চেপে রাখুন',
      'রক্ত বন্ধ হওয়ার পর বিশ্রাম নিন; কয়েক ঘণ্টার মধ্যে নাক ঝাড়া বা মাথা নিচু করা এড়িয়ে চলুন'
    ],
    donts: [
      'DO NOT tilt your head backward or lie flat',
      'DO NOT stuff dirty cotton, paper towels, or napkins deep inside the nostrils',
      'DO NOT pick, blow, or rub the nose for several hours after bleeding stops'
    ],
    dontsBn: [
      'কখনোই মাথা পেছনের দিকে কাত করবেন না বা শুয়ে পড়বেন না',
      'নাকের ভেতরে নোংরা তুলা, টিস্যু পেপার বা কাপড় ঠুসে দেবেন না',
      'রক্ত বন্ধ হওয়ার কয়েক ঘণ্টার মধ্যে নাকে হাত দেওয়া বা নাক খোঁচাখুঁচি করবেন না'
    ],
    whenToSeekEmergency: [
      'Bleeding persists for more than 20 minutes despite continuous firm pressure',
      'Bleeding followed a severe blow or head injury (may indicate skull fracture)',
      'Patient feels dizzy, faint, lightheaded, or has difficulty breathing'
    ],
    whenToSeekEmergencyBn: [
      'টানা ২০ মিনিট চেপে ধরে রাখার পরও যদি রক্তপাত বন্ধ না হয়',
      'মাথায় বা মুখে প্রচণ্ড আঘাত পাওয়ার পর রক্তক্ষরণ হলে (মাথার খুলিতে ফ্র্যাকচারের ঝুঁকি)',
      'রোগী যদি মাথা ঘোরানো, দুর্বলতা অনুভব করেন বা শ্বাস নিতে কষ্ট হয়'
    ]
  },
  {
    id: 'sprains-strains',
    title: 'Sprains, Strains & Joint Injuries (R.I.C.E.)',
    titleBn: 'মচকে যাওয়া ও অস্থিসন্ধির আঘাত (R.I.C.E. পদ্ধতি)',
    category: 'Musculoskeletal',
    categoryBn: 'পেশী ও অস্থিসন্ধির চিকিৎসা',
    iconName: 'Activity',
    shortDesc: 'Standard R.I.C.E. protocol for ligament sprains, muscle strains, and swollen ankles/wrists.',
    shortDescBn: 'পা বা হাত মচকে গেলে, পেশীতে টান লাগলে এবং ফোলা কমাতে আন্তর্জাতিক R.I.C.E. নির্দেশিকা।',
    immediateSafety: [
      'Stop any sport or physical movement immediately. Do not bear weight on the injured limb.'
    ],
    immediateSafetyBn: [
      'তাত্ক্ষণিকভাবে খেলাধুলা বা হাঁটাচলা বন্ধ করুন। আহত অঙ্গের ওপর কোনো ভর দেবেন না।'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Rest',
        titleBn: 'বিশ্রাম (Rest)',
        instruction: 'Immobilize the joint. Avoid walking on or moving the affected ankle, wrist, or knee.',
        instructionBn: 'আহত হাত, পা বা জয়েন্ট সম্পূর্ণ বিশ্রামে রাখুন এবং কোনো প্রকার নড়াচড়া করা বন্ধ রাখুন।'
      },
      {
        stepNumber: 2,
        title: 'Ice',
        titleBn: 'বরফ সেঁক (Ice)',
        instruction: 'Apply an ice pack wrapped in a clean thin towel for 15 to 20 minutes every 2-3 hours during the first 48 hours.',
        instructionBn: 'প্রথম ৪৮ ঘণ্টার মধ্যে পাতলা তোয়ালেতে বরফ পেঁচিয়ে প্রতি ২-৩ ঘণ্টা পর পর ১৫-২০ মিনিট সেঁক দিন।'
      },
      {
        stepNumber: 3,
        title: 'Compression',
        titleBn: 'হালকা ব্যান্ডেজ (Compression)',
        instruction: 'Wrap the area gently with an elastic bandage (crepe bandage) from distal to proximal. Keep it snug but never too tight.',
        instructionBn: 'একটি ক্রেপ ব্যান্ডেজ দিয়ে আক্রান্ত অংশ হালকা চেপে পেঁচিয়ে নিন যাতে ফোলা কমে, তবে রক্ত চলাচল বন্ধ যেন না হয়।'
      },
      {
        stepNumber: 4,
        title: 'Elevation',
        titleBn: 'উঁচুতে রাখা (Elevation)',
        instruction: 'Prop the injured limb on pillows above heart level to decrease swelling and fluid accumulation.',
        instructionBn: 'বালিশের ওপর রেখে আক্রান্ত হাত বা পা হৃদপিণ্ডের উচ্চতার চেয়ে উঁচুতে তুলে রাখুন যাতে তরল জমে না ফুলে ওঠে।'
      }
    ],
    dos: [
      'Follow the R.I.C.E protocol (Rest, Ice, Compression, Elevation)',
      'Wrap ice in a protective towel or cloth before applying',
      'Check circulation (fingers/toes should remain warm and pink)'
    ],
    dosBn: [
      'সঠিকভাবে R.I.C.E (বিশ্রাম, বরফ সেঁক, ব্যান্ডেজ ও উঁচুতে রাখা) অনুসরণ করুন',
      'বরফ সরাসরি ত্বকে না লাগিয়ে অবশ্যই কাপড়ে মুড়িয়ে ব্যবহার করুন',
      'রক্ত চলাচল স্বাভাবিক আছে কিনা আঙুলের রঙ ও তাপমাত্রা দেখে যাচাই করুন'
    ],
    donts: [
      'DO NOT apply ice directly on bare skin',
      'DO NOT apply heat packs, hot water, or massage vigorously within the first 48 hours (worsens swelling and internal bleeding)',
      'DO NOT force movement or attempt to "snap back" a deformed bone'
    ],
    dontsBn: [
      'সরাসরি ত্বকের ওপর বরফ ঘষবেন না (ত্বকের ক্ষতি হতে পারে)',
      'প্রথম ৪৮ ঘণ্টায় গরম সেঁক বা জোরে মালিশ করবেন না (অভ্যন্তরীণ রক্তক্ষরণ ও ফোলা বেড়ে যায়)',
      'বাঁকা হয়ে যাওয়া হাড় বা জয়েন্ট নিজে নিজে সোজা করার চেষ্টা করবেন না'
    ],
    whenToSeekEmergency: [
      'Joint appears visibly deformed, crooked, or bone penetrates the skin',
      'Completely unable to bear any weight or severe numbness/tingling below injury',
      'Extreme excruciating pain or rapid severe blue/black bruising'
    ],
    whenToSeekEmergencyBn: [
      'জয়েন্ট বা হাড় যদি দৃশ্যমানভাবে বাঁকা দেখায় অথবা হাড় চামড়া ভেদ করে বেরিয়ে আসে',
      'পায়ে একেবারেই ভর দেওয়া না গেলে অথবা আঙুলে কোনো অনুভূতি না থাকলে বা অবশ হলে',
      'তীব্র অসহ্য ব্যথা অথবা দ্রুত পুরো অংশ কালচে বা নীল বর্ণ ধারণ করলে'
    ]
  },
  {
    id: 'fainting-syncope',
    title: 'Fainting & Syncope (Temporary Loss of Consciousness)',
    titleBn: 'হঠাৎ অচেতন বা অজ্ঞান হয়ে পড়া (সিনকোপ)',
    category: 'Neurological & Circulatory',
    categoryBn: 'স্নায়ু ও সংবহনতন্ত্রের জরুরি সেবা',
    iconName: 'UserX',
    shortDesc: 'Proper recovery positioning and blood circulation restoration for sudden fainting.',
    shortDescBn: 'মস্তিষ্কে রক্ত সঞ্চালন পুনরুদ্ধার ও হঠাৎ অজ্ঞান ব্যক্তির সঠিক প্রাথমিক পরিচর্যা।',
    severityWarning: 'If the person does not regain consciousness within 1 minute, call 999 and check breathing and pulse immediately.',
    severityWarningBn: 'ব্যক্তি যদি ১ মিনিটের মধ্যে জ্ঞান ফিরে না পান, তবে অবিলম্বে ৯৯৯ এ কল করুন এবং নাড়ি ও শ্বাস-প্রশ্বাস পরীক্ষা করুন।',
    immediateSafety: [
      'Ensure the person has not sustained a head trauma during the fall. Provide adequate fresh air.'
    ],
    immediateSafetyBn: [
      'পড়ে যাওয়ার সময় মাথায় কোনো গুরুতর আঘাত লেগেছে কিনা খেয়াল করুন এবং প্রচুর খোলা বাতাস নিশ্চিত করুন।'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Lay Flat and Elevate Legs',
        titleBn: 'মেঝেতে শুইয়ে পা উঁচুতে তুলুন',
        instruction: 'Position the person flat on their back and elevate their feet approximately 12 inches (30 cm) above the heart level to restore blood flow to the brain.',
        instructionBn: 'ব্যক্তিকে চিৎ করে সমতলে শুইয়ে দিন এবং তার পা প্রায় ১২ ইঞ্চি (৩০ সেমি) ওপরে তুলে রাখুন যাতে মস্তিষ্কে দ্রুত রক্ত সরবরাহ বাড়ে।'
      },
      {
        stepNumber: 2,
        title: 'Loosen Restrictive Clothing',
        titleBn: 'আঁটসাঁট পোশাক ঢিলে করুন',
        instruction: 'Loosen tight neck collars, ties, belts, or tight chest wear.',
        instructionBn: 'গলার কলার, টাই, বেল্ট বা টাইট পোশাকের বোতাম আলগা করে দিন।'
      },
      {
        stepNumber: 3,
        title: 'Recovery Position If Vomiting',
        titleBn: 'বমি ভাব হলে কাত করে দিন',
        instruction: 'If they feel nauseous or vomit, turn them onto their side (recovery position) to keep the airway clear.',
        instructionBn: 'বমি ভাব হলে বা বমি করলে ব্যক্তিকে একপাশে কাত করে (রিকভারি পজিশন) রাখুন যেন শ্বাসনালীতে কিছু না আটকায়।'
      },
      {
        stepNumber: 4,
        title: 'Gradual Return to Sitting',
        titleBn: 'জ্ঞান ফিরলে ধীরে ধীরে বসান',
        instruction: 'Once conscious, have them rest lying down for 10-15 minutes, then sit slowly before attempting to stand.',
        instructionBn: 'জ্ঞান ফেরার পর অন্তত ১০-১৫ মিনিট শুয়ে বিশ্রাম নিতে দিন, তারপর ধীরে ধীরে বসান; হুট করে দাঁড়াতে দেবেন না।'
      }
    ],
    dos: [
      'Elevate legs to encourage blood return to the brain',
      'Ensure plenty of ventilation and fresh air',
      'Turn onto side if they begin vomiting or make snoring sounds'
    ],
    dosBn: [
      'মস্তিষ্কে রক্তপ্রবাহ বাড়াতে পা দুটি উঁচুতে তুলে রাখুন',
      'চারপাশে ভিড় জমাবেন না এবং প্রচুর বাতাস চলাচলের ব্যবস্থা করুন',
      'বমি বা গোঙানির মতো শব্দ হলে রোগীকে একপাশে কাত করে দিন'
    ],
    donts: [
      'DO NOT throw cold water or slap their face',
      'DO NOT force them to sit up or stand up quickly immediately after waking',
      'DO NOT give liquids, food, or medications while still drowsy or unconscious'
    ],
    dontsBn: [
      'মুখে ঠান্ডা পানি ছিটাবেন না বা মুখে চড়-থাপ্পড় দেবেন না',
      'জ্ঞান ফেরার সাথে সাথে জোর করে বসাতে বা দাঁড় করাতে চেষ্টা করবেন না',
      'অচেতন বা অর্ধচেতন অবস্থায় মুখে পানি, খাবার বা কোনো ওষুধ ঢালবেন না'
    ],
    whenToSeekEmergency: [
      'The person does not wake up within 60 seconds',
      'Fainting occurred while sitting or lying down, or during strenuous exercise',
      'Associated with chest pain, palpitations, shortness of breath, or seizure-like convulsing',
      'Person is over 50 years old or has a known cardiac condition'
    ],
    whenToSeekEmergencyBn: [
      'ব্যক্তি যদি ৬০ সেকেন্ডের মধ্যে স্বাভাবিক জ্ঞান ফিরে না পান',
      'বসা বা শোয়া অবস্থায় হঠাৎ অজ্ঞান হয়ে গেলে অথবা ভারী ব্যায়ামের সময় অজ্ঞান হলে',
      'বুকে ব্যথা, অস্বাভাবিক বুক ধড়ফড়, শ্বাসকষ্ট বা হাত-পা কাঁপুনির (খিঁচুনি) সাথে ঘটলে',
      'ব্যক্তির বয়স ৫০ বছরের বেশি হলে অথবা পূর্ব থেকে হৃদরোগের ইতিহাস থাকলে'
    ]
  },
  {
    id: 'heat-exhaustion',
    title: 'Heat Exhaustion & Heat Stroke',
    titleBn: 'হিট এক্সহশন ও সানস্ট্রোক / হিট স্ট্রোক',
    category: 'Environmental Emergencies',
    categoryBn: 'পরিবেশগত ও তাপমাত্রা সংক্রান্ত জরুরি সেবা',
    iconName: 'Sun',
    shortDesc: 'Cooling measures for overheating and identifying life-threatening heat stroke in hot climates.',
    shortDescBn: 'গ্রীষ্মপ্রধান অঞ্চলে অতিরিক্ত তাপমাত্রায় শরীর ঠান্ডা করার উপায় ও হিট স্ট্রোকের প্রাথমিক চিকিৎসা।',
    severityWarning: 'Heat Stroke is a medical emergency: hot dry skin, confusion, delirium, or loss of consciousness requires 999 immediately!',
    severityWarningBn: 'হিট স্ট্রোক একটি প্রাণঘাতী জরুরি অবস্থা: ত্বক অতিরিক্ত গরম ও শুষ্ক হয়ে যাওয়া, প্রলাপ বকা বা অজ্ঞান হয়ে গেলে অবিলম্বে ৯৯৯ এ ফোন দিন!',
    immediateSafety: [
      'Immediately move the person out of the hot environment into a cool, air-conditioned or shaded area.'
    ],
    immediateSafetyBn: [
      'ব্যক্তিকে তাত্ক্ষণিকভাবে রোদ ও গরম স্থান থেকে সরিয়ে ছায়াযুক্ত, শীতল বা এসিযুক্ত স্থানে নিয়ে যান।'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Active Rapid Cooling',
        titleBn: 'দ্রুত শরীর ঠান্ডা করার ব্যবস্থা',
        instruction: 'Loosen clothing. Spray with cool water or apply wet cloths, especially to the neck, armpits, and groin.',
        instructionBn: 'পোশাক ঢিলে করে দিন। স্বাভাবিক ঠান্ডা পানি শরীরে ছিটিয়ে দিন বা ভেজা কাপড় ঘাড়, বগল ও কুঁচকিতে চেপে রাখুন।'
      },
      {
        stepNumber: 2,
        title: 'Increase Airflow',
        titleBn: 'বাতাস প্রবাহ বৃদ্ধি করুন',
        instruction: 'Fan the person vigorously while misting with cool water to facilitate evaporation.',
        instructionBn: 'শরীরে ভেজা পানি বা ভেজা তোয়ালে রেখে জোরে পাখা দিয়ে বাতাস করুন যাতে দ্রুত বাষ্পীভবনের মাধ্যমে তাপমাত্রা কমে।'
      },
      {
        stepNumber: 3,
        title: 'Offer Oral Rehydration (If Conscious)',
        titleBn: 'খাবার স্যালাইন বা পানি পান (জ্ঞান থাকলে)',
        instruction: 'If the person is fully alert and not vomiting, give cool water or oral rehydration solution (ORS / saline) in small sips.',
        instructionBn: 'ব্যক্তি যদি সম্পূর্ণ সচেতন থাকেন এবং বমি না করেন, তবে তাকে ধীরে ধীরে স্বাভাবিক ঠান্ডা পানি বা ওরাল স্যালাইন পান করান।'
      }
    ],
    dos: [
      'Move to shade or air-conditioned room immediately',
      'Apply cool wet towels to neck, armpits, and groin',
      'Sip cool water or ORS solution slowly'
    ],
    dosBn: [
      'তাত্ক্ষণিকভাবে শীতল ছায়া বা ফ্যান/এসিযুক্ত কক্ষে রোগীকে নিয়ে আসুন',
      'ঘাড়, বগল এবং কুঁচকিতে ঠান্ডা ভেজা গামছা বা কাপড় রাখুন',
      'ধীরে ধীরে খাবার স্যালাইন বা বিশুদ্ধ পানি পান করতে দিন'
    ],
    donts: [
      'DO NOT give ice-cold water to gulp rapidly (causes stomach cramps)',
      'DO NOT give caffeinated drinks, soda, or heavy sugary beverages',
      'DO NOT give fluids if the person is confused, slurring speech, or drowsy'
    ],
    dontsBn: [
      'একসাথে অতিরিক্ত বরফ ঠান্ডা পানি ঢকঢক করে গেলাবেন না (পেটে তীব্র খিঁচুনি হতে পারে)',
      'চা, কফি, কোমল পানীয় বা অতিরিক্ত চিনিযুক্ত শরবত দেবেন না',
      'অর্ধচেতন বা বিভ্রান্ত রোগীকে জোর করে পানি বা তরল গেলাবেন না'
    ],
    whenToSeekEmergency: [
      'Person is confused, agitated, slurs speech, or hallucinates (Heat Stroke)',
      'High core body temperature above 103°F (39.4°C)',
      'Vomiting repeatedly or cannot drink fluids'
    ],
    whenToSeekEmergencyBn: [
      'ব্যক্তি প্রলাপ বকলে, অসংলগ্ন কথা বললে বা মতিভ্রম দেখা দিলে (হিট স্ট্রোকের লক্ষণ)',
      'শরীরের তাপমাত্রা ১০৩° ফারেনহাইট (৩৯.৪° সেলসিয়াস)-এর ওপরে উঠে গেলে',
      'একটানা বমি হতে থাকলে অথবা কোনো তরল পান করতে না পারলে'
    ]
  },
  {
    id: 'animal-bites',
    title: 'Animal & Snake Bites',
    titleBn: 'পশুর কামড় ও সাপের দংশন',
    category: 'Toxic & Biological',
    categoryBn: 'বিষাক্ত ও প্রাণীজ জরুরি অবস্থা',
    iconName: 'ShieldAlert',
    shortDesc: 'Rabies and venom precaution protocols following dog, cat, monkey, or snake exposure.',
    shortDescBn: 'কুকুর, বিড়াল, বানরের কামড়ে জলাতঙ্ক প্রতিরোধ এবং সাপে কাটলে জরুরি জীবনরক্ষাকারী করণীয়।',
    severityWarning: 'All dog, cat, or wild mammal bites require urgent Rabies Post-Exposure Prophylaxis (PEP). Snake bites require immediate hospital antivenom evaluation!',
    severityWarningBn: 'কুকুর বা বিড়ালের কামড়ে অবিলম্বে জলাতঙ্ক ভ্যাকসিনের প্রয়োজন। সাপে কাটলে সময় নষ্ট না করে সরাসরি সরকারি হাসপাতালে (যেমন কেএমসিএইচ) নিয়ে যান!',
    immediateSafety: [
      'Move away from the animal safely. Do not try to capture a venomous snake.'
    ],
    immediateSafetyBn: [
      'পশু বা সাপের কাছ থেকে নিরাপদে সরে আসুন। বিষধর সাপ ধরার চেষ্টা করবেন না।'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Wash Thoroughly with Soap and Water (Mammal Bites)',
        titleBn: 'টানা ১৫ মিনিট সাবান-পানিতে ক্ষতের স্থান ধোয়া',
        instruction: 'Immediately wash animal bite or scratch wounds vigorously with flowing clean water and laundry soap or bath soap for at least 15 continuous minutes.',
        instructionBn: 'পশুর কামড় বা আঁচড়ের স্থানে ট্যাপের স্বাভাবিক পানি এবং কাপড় কাঁচা বা গোসলের ক্ষারযুক্ত সাবান দিয়ে একটানা কমপক্ষে ১৫ মিনিট ধুয়ে ফেলুন।'
      },
      {
        stepNumber: 2,
        title: 'Disinfect with Povidone Iodine',
        titleBn: 'পোভিডোন আয়োডিন বা অ্যান্টিসেপটিক লাগানো',
        instruction: 'Apply povidone-iodine (Betadine) antiseptic solution over the wound after thorough washing.',
        instructionBn: 'সাবান-পানি দিয়ে ধোয়ার পর পোভিডোন আয়োডিন (যেমন ভায়োডিন বা বেটাডিন) ক্ষতের ওপর ভালোভাবে লাগিয়ে দিন।'
      },
      {
        stepNumber: 3,
        title: 'For Snake Bites: Immobilize and Keep Calm',
        titleBn: 'সাপে কাটলে: আক্রান্ত অঙ্গ স্থির রাখা ও শান্ত থাকা',
        instruction: 'Keep the bitten limb still at or below heart level using a splint. Remove rings or tight bracelets before swelling starts. Rush to the nearest hospital with antivenom (such as KMCH).',
        instructionBn: 'আক্রান্ত হাত বা পা নাড়াচাড়া করবেন না, কাঠি বা স্কেল দিয়ে বেঁধে স্থির রাখুন। আংটি বা চুড়ি দ্রুত খুলে ফেলুন এবং কালক্ষেপণ না করে দ্রুত অ্যান্টিভেনম সমৃদ্ধ হাসপাতালে নিয়ে যান।'
      }
    ],
    dos: [
      'Wash animal bites under running tap water with soap for a FULL 15 MINUTES (vital for neutralizing rabies virus)',
      'Keep calm and immobilize bitten limb in snake bite cases',
      'Visit hospital immediately for Rabies vaccine + immunoglobulin and Tetanus toxoid'
    ],
    dosBn: [
      'পশুর কামড়ের ক্ষত পুরো ১৫ মিনিট সাবান পানি দিয়ে ধুয়ে ফেলুন (জলাতঙ্কের ভাইরাস ধ্বংসে এটি অত্যন্ত কার্যকরী)',
      'সাপে কাটলে রোগীকে পুরোপুরি শান্ত রাখুন এবং আক্রান্ত অঙ্গ সম্পূর্ণ স্থির রাখুন',
      'বিলম্ব না করে হাসপাতালে গিয়ে অ্যান্টি-র‌্যাবিস ভ্যাকসিন (ARV) ও টিটেনাস ইনজেকশন নিন'
    ],
    donts: [
      'DO NOT cut the wound, suck out venom, or apply electric shock for snake bites',
      'DO NOT tie tight arterial tourniquets that stop all blood circulation (leads to limb gangrene)',
      'DO NOT apply lime, chili, herbal pastes, or acid onto animal or snake bites',
      'DO NOT stitch animal bite wounds immediately without medical protocol'
    ],
    dontsBn: [
      'সাপে কাটা স্থান ব্লেড দিয়ে কাটবেন না, মুখ দিয়ে বিষ চুষে তোলার চেষ্টা করবেন না',
      'রশি বা তার দিয়ে এমন শক্ত গিঁট দেবেন না যাতে রক্ত চলাচল পুরোপুরি বন্ধ হয়ে অঙ্গ পচে যায় (গ্যাংগ্রিন)',
      'ক্ষতে চুন, মরিচ, গাছের পাতা, গোবর বা এসিড লাগাবেন না',
      'পশুর কামড়ের স্থানে ডাক্তারের অনুমতি ছাড়া তাৎক্ষণিক সেলাই করবেন না'
    ],
    whenToSeekEmergency: [
      'ANY suspected venomous snake bite (KMCH emergency room has dedicated venom management)',
      'Severe tissue tearing, arterial bleeding, or animal bite near head and neck',
      'Unknown, stray, or visibly rabid/aggressive animal bite'
    ],
    whenToSeekEmergencyBn: [
      'যেকোনো সাপের দংশন (খুলনা মেডিকেল কলেজ হাসপাতালের জরুরি বিভাগে সার্বক্ষণিক অ্যান্টিভেনম রয়েছে)',
      'মুখ বা ঘাড়ের কাছে পশুর কামড় লাগলে অথবা গভীর ক্ষতের সৃষ্টি হলে',
      'অপরিচিত বা বেওয়ারিশ পাগলা কুকুর বা হিংস্র প্রাণীর কামড়'
    ]
  }
];
