import { FirstAidGuide } from '../types';

export const FIRST_AID_GUIDES: FirstAidGuide[] = [
  {
    id: 'minor-burns',
    title: 'Minor Burns (1st & Superficial 2nd Degree)',
    category: 'Thermal & Burns',
    iconName: 'Flame',
    shortDesc: 'Immediate cooling and protective care for minor heat or scald burns without skin breaks.',
    severityWarning: 'If the burn covers a large area, faces/joints/genitals, or appears charred/white, seek immediate emergency care.',
    immediateSafety: [
      'Ensure the source of heat (fire, boiling liquid, steam) is removed and the area is safe.',
      'Do not touch or peel off melted clothing stuck directly to the burn.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cool with Cool Running Water',
        instruction: 'Hold the burned area under cool (not freezing or iced) running water for at least 15 to 20 minutes to stop tissue damage.'
      },
      {
        stepNumber: 2,
        title: 'Remove Constricting Items Early',
        instruction: 'Carefully remove rings, watches, tight clothes, or belts near the area before swelling begins.'
      },
      {
        stepNumber: 3,
        title: 'Cover Loosely with Clean Dressing',
        instruction: 'Apply a sterile, non-stick gauze or clean plastic wrap loosely over the burn to protect from dirt and bacteria.'
      },
      {
        stepNumber: 4,
        title: 'Manage Pain Safely',
        instruction: 'Over-the-counter pain relief such as Paracetamol can be taken if appropriate for the person.'
      }
    ],
    dos: [
      'Cool under running tap water for 15-20 minutes continuously',
      'Keep the burn clean and shielded with sterile non-adherent dressing',
      'Keep hydrated by drinking clean water'
    ],
    donts: [
      'DO NOT use ice, iced water, or frozen packets (causes tissue frostbite & shock)',
      'DO NOT apply toothpaste, butter, raw egg, soy sauce, or oil',
      'DO NOT burst blisters or peel peeled skin (blisters prevent infection)'
    ],
    whenToSeekEmergency: [
      'Burn is larger than 3 inches in diameter or the person is a baby / elderly',
      'Burn affects face, eyes, neck, hands, feet, joints, or groin',
      'Skin appears leathery, deep white, blackened, or completely painless (3rd degree nerve burn)',
      'Signs of infection develop: increasing redness, pus, or fever'
    ]
  },
  {
    id: 'cuts-wounds',
    title: 'Cuts, Lacerations & Bleeding',
    category: 'Wounds & Trauma',
    iconName: 'Scissors',
    shortDesc: 'Controlling bleeding and preventing infection for cuts, scrapes, and abrasions.',
    severityWarning: 'Spurting bright red blood indicates arterial bleeding: apply firm direct pressure and call 999 immediately!',
    immediateSafety: [
      'Wash your hands with soap or wear disposable gloves if available before touching the wound.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Apply Direct Firm Pressure',
        instruction: 'Place a clean gauze or clean cloth directly on the wound and press firmly for 5 to 10 minutes continuously without lifting.'
      },
      {
        stepNumber: 2,
        title: 'Elevate Above Heart Level',
        instruction: 'If the bleeding is on an arm or leg, keep it raised above heart level while maintaining steady pressure.'
      },
      {
        stepNumber: 3,
        title: 'Clean the Wound Gently',
        instruction: 'Once bleeding has stopped, rinse the wound gently with clean potable running water. Wash surrounding skin with mild soap.'
      },
      {
        stepNumber: 4,
        title: 'Apply Dressing',
        instruction: 'Apply an antibiotic ointment or petroleum jelly, then cover with a sterile adhesive bandage or gauze.'
      }
    ],
    dos: [
      'Maintain steady, uninterrupted direct pressure for at least 5-10 minutes',
      'Clean dirt around the wound with clean water and mild soap',
      'Check if the patient has received a Tetanus vaccine within the last 5-10 years'
    ],
    donts: [
      'DO NOT pull out deeply embedded objects (glass, knife, metal) — pack around it and seek ER immediately',
      'DO NOT remove the soaked cloth; add more clean cloth on top and keep pressing',
      'DO NOT apply harsh antiseptics like pure hydrogen peroxide or strong alcohol directly inside open flesh wounds'
    ],
    whenToSeekEmergency: [
      'Blood spurts rapidly or bleeding does not stop after 10-15 minutes of firm pressure',
      'Wound is deep, gaping, or exposes fat, muscle, tendon, or bone (requires stitches within 6 hours)',
      'Wound was caused by a dirty, rusty metal object or an animal bite'
    ]
  },
  {
    id: 'choking',
    title: 'Choking (Heimlich Maneuver)',
    category: 'Respiratory Emergencies',
    iconName: 'AlertTriangle',
    shortDesc: 'Crucial life-saving airway clearance protocol for a conscious choking person.',
    severityWarning: 'If the person cannot breathe, speak, cough, or turns blue, act immediately while shouting for someone to dial 999!',
    immediateSafety: [
      'Confirm the person is truly choking: ask "Are you choking? Can you speak or cough?"',
      'If they can cough forcefully, encourage coughing and do not interfere.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Deliver 5 Firm Back Blows',
        instruction: 'Stand slightly behind them. Support their chest with one hand and lean them forward. Deliver 5 sharp blows between the shoulder blades with the heel of your hand.'
      },
      {
        stepNumber: 2,
        title: 'Perform 5 Abdominal Thrusts (Heimlich)',
        instruction: 'Stand behind them. Wrap your arms around their waist. Make a fist with one hand and place the thumb side just above their navel (below ribs). Grasp fist with your other hand and pull sharply inward and upward.'
      },
      {
        stepNumber: 3,
        title: 'Alternate 5 and 5',
        instruction: 'Continue alternating between 5 back blows and 5 abdominal thrusts until the object is expelled.'
      },
      {
        stepNumber: 4,
        title: 'If Victim Becomes Unresponsive',
        instruction: 'Carefully lower them to the floor, call 999, begin CPR (chest compressions), and inspect mouth before rescue breaths.'
      }
    ],
    dos: [
      'Encourage forceful coughing if they can still make sound or breathe',
      'Lean the person forward so the expelled object falls out of the mouth, not back down',
      'Call 999 or rush to the nearest emergency room immediately'
    ],
    donts: [
      'DO NOT perform blind finger sweeps in the mouth (can push object further into trachea)',
      'DO NOT slap their back if they are standing fully upright (gravity will pull object down)',
      'DO NOT give water or liquids to a choking individual'
    ],
    whenToSeekEmergency: [
      'The person cannot make sound, cough, or breathe',
      'Lips, face, or fingernails turn blue or pale (cyanosis)',
      'The victim loses consciousness or collapses'
    ]
  },
  {
    id: 'nosebleeds',
    title: 'Nosebleeds (Epistaxis)',
    category: 'Common First Aid',
    iconName: 'Droplet',
    shortDesc: 'Proper positioning and pressure control to resolve nasal bleeding safely.',
    severityWarning: 'Never tilt the head backward: blood running down the airway can cause coughing, vomiting, and choking.',
    immediateSafety: [
      'Keep the person calm and seated upright.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Sit Upright and Lean Forward',
        instruction: 'Sit straight and lean slightly forward so blood drains out through the nose rather than down the back of the throat.'
      },
      {
        stepNumber: 2,
        title: 'Pinch the Soft Part of the Nose',
        instruction: 'Use your thumb and index finger to firmly pinch the soft fleshy part of both nostrils just below the bony bridge.'
      },
      {
        stepNumber: 3,
        title: 'Breathe Through Mouth for 10-15 Mins',
        instruction: 'Maintain continuous pinching for a full 10 to 15 minutes by the clock without releasing to check.'
      },
      {
        stepNumber: 4,
        title: 'Apply Cold Pack to Bridge',
        instruction: 'Place a cool cloth or wrapped ice pack over the bridge of the nose and forehead to help constrict blood vessels.'
      }
    ],
    dos: [
      'Lean forward slightly and spit out any blood that enters the mouth',
      'Pinch continuously for at least 10 minutes without letting go',
      'Rest quietly after bleeding stops; avoid blowing nose or bending over for a few hours'
    ],
    donts: [
      'DO NOT tilt your head backward or lie flat',
      'DO NOT stuff dirty cotton, paper towels, or napkins deep inside the nostrils',
      'DO NOT pick, blow, or rub the nose for several hours after bleeding stops'
    ],
    whenToSeekEmergency: [
      'Bleeding persists for more than 20 minutes despite continuous firm pressure',
      'Bleeding followed a severe blow or head injury (may indicate skull fracture)',
      'Patient feels dizzy, faint, lightheaded, or has difficulty breathing'
    ]
  },
  {
    id: 'sprains-strains',
    title: 'Sprains, Strains & Joint Injuries (R.I.C.E.)',
    category: 'Musculoskeletal',
    iconName: 'Activity',
    shortDesc: 'Standard R.I.C.E. protocol for ligament sprains, muscle strains, and swollen ankles/wrists.',
    immediateSafety: [
      'Stop any sport or physical movement immediately. Do not bear weight on the injured limb.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Rest',
        instruction: 'Immobilize the joint. Avoid walking on or moving the affected ankle, wrist, or knee.'
      },
      {
        stepNumber: 2,
        title: 'Ice',
        instruction: 'Apply an ice pack wrapped in a clean thin towel for 15 to 20 minutes every 2-3 hours during the first 48 hours.'
      },
      {
        stepNumber: 3,
        title: 'Compression',
        instruction: 'Wrap the area gently with an elastic bandage (crepe bandage) from distal to proximal. Keep it snug but never too tight.'
      },
      {
        stepNumber: 4,
        title: 'Elevation',
        instruction: 'Prop the injured limb on pillows above heart level to decrease swelling and fluid accumulation.'
      }
    ],
    dos: [
      'Follow the R.I.C.E protocol (Rest, Ice, Compression, Elevation)',
      'Wrap ice in a protective towel or cloth before applying',
      'Check circulation (fingers/toes should remain warm and pink)'
    ],
    donts: [
      'DO NOT apply ice directly on bare skin',
      'DO NOT apply heat packs, hot water, or massage vigorously within the first 48 hours (worsens swelling and internal bleeding)',
      'DO NOT force movement or attempt to "snap back" a deformed bone'
    ],
    whenToSeekEmergency: [
      'Joint appears visibly deformed, crooked, or bone penetrates the skin',
      'Completely unable to bear any weight or severe numbness/tingling below injury',
      'Extreme excruciating pain or rapid severe blue/black bruising'
    ]
  },
  {
    id: 'fainting-syncope',
    title: 'Fainting & Syncope (Temporary Loss of Consciousness)',
    category: 'Neurological & Circulatory',
    iconName: 'UserX',
    shortDesc: 'Proper recovery positioning and blood circulation restoration for sudden fainting.',
    severityWarning: 'If the person does not regain consciousness within 1 minute, call 999 and check breathing and pulse immediately.',
    immediateSafety: [
      'Ensure the person has not sustained a head trauma during the fall. Provide adequate fresh air.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Lay Flat and Elevate Legs',
        instruction: 'Position the person flat on their back and elevate their feet approximately 12 inches (30 cm) above the heart level to restore blood flow to the brain.'
      },
      {
        stepNumber: 2,
        title: 'Loosen Restrictive Clothing',
        instruction: 'Loosen tight neck collars, ties, belts, or tight chest wear.'
      },
      {
        stepNumber: 3,
        title: 'Recovery Position If Vomiting',
        instruction: 'If they feel nauseous or vomit, turn them onto their side (recovery position) to keep the airway clear.'
      },
      {
        stepNumber: 4,
        title: 'Gradual Return to Sitting',
        instruction: 'Once conscious, have them rest lying down for 10-15 minutes, then sit slowly before attempting to stand.'
      }
    ],
    dos: [
      'Elevate legs to encourage blood return to the brain',
      'Ensure plenty of ventilation and fresh air',
      'Turn onto side if they begin vomiting or make snoring sounds'
    ],
    donts: [
      'DO NOT throw cold water or slap their face',
      'DO NOT force them to sit up or stand up quickly immediately after waking',
      'DO NOT give liquids, food, or medications while still drowsy or unconscious'
    ],
    whenToSeekEmergency: [
      'The person does not wake up within 60 seconds',
      'Fainting occurred while sitting or lying down, or during strenuous exercise',
      'Associated with chest pain, palpitations, shortness of breath, or seizure-like convulsing',
      'Person is over 50 years old or has a known cardiac condition'
    ]
  },
  {
    id: 'heat-exhaustion',
    title: 'Heat Exhaustion & Heat Stroke',
    category: 'Environmental Emergencies',
    iconName: 'Sun',
    shortDesc: 'Cooling measures for overheating and identifying life-threatening heat stroke in hot climates.',
    severityWarning: 'Heat Stroke is a medical emergency: hot dry skin, confusion, delirium, or loss of consciousness requires 999 immediately!',
    immediateSafety: [
      'Immediately move the person out of the hot environment into a cool, air-conditioned or shaded area.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Active Rapid Cooling',
        instruction: 'Loosen clothing. Spray with cool water or apply wet cloths, especially to the neck, armpits, and groin.'
      },
      {
        stepNumber: 2,
        title: 'Increase Airflow',
        instruction: 'Fan the person vigorously while misting with cool water to facilitate evaporation.'
      },
      {
        stepNumber: 3,
        title: 'Offer Oral Rehydration (If Conscious)',
        instruction: 'If the person is fully alert and not vomiting, give cool water or oral rehydration solution (ORS / saline) in small sips.'
      }
    ],
    dos: [
      'Move to shade or air-conditioned room immediately',
      'Apply cool wet towels to neck, armpits, and groin',
      'Sip cool water or ORS solution slowly'
    ],
    donts: [
      'DO NOT give ice-cold water to gulp rapidly (causes stomach cramps)',
      'DO NOT give caffeinated drinks, soda, or heavy sugary beverages',
      'DO NOT give fluids if the person is confused, slurring speech, or drowsy'
    ],
    whenToSeekEmergency: [
      'Person is confused, agitated, slurs speech, or hallucinates (Heat Stroke)',
      'High core body temperature above 103°F (39.4°C)',
      'Vomiting repeatedly or cannot drink fluids'
    ]
  },
  {
    id: 'animal-bites',
    title: 'Animal & Snake Bites',
    category: 'Toxic & Biological',
    iconName: 'ShieldAlert',
    shortDesc: 'Rabies and venom precaution protocols following dog, cat, monkey, or snake exposure.',
    severityWarning: 'All dog, cat, or wild mammal bites require urgent Rabies Post-Exposure Prophylaxis (PEP). Snake bites require immediate hospital antivenom evaluation!',
    immediateSafety: [
      'Move away from the animal safely. Do not try to capture a venomous snake.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Wash Thoroughly with Soap and Water (Mammal Bites)',
        instruction: 'Immediately wash animal bite or scratch wounds vigorously with flowing clean water and laundry soap or bath soap for at least 15 continuous minutes.'
      },
      {
        stepNumber: 2,
        title: 'Disinfect with Povidone Iodine',
        instruction: 'Apply povidone-iodine (Betadine) antiseptic solution over the wound after thorough washing.'
      },
      {
        stepNumber: 3,
        title: 'For Snake Bites: Immobilize and Keep Calm',
        instruction: 'Keep the bitten limb still at or below heart level using a splint. Remove rings or tight bracelets before swelling starts. Rush to the nearest hospital with antivenom (such as KMCH).'
      }
    ],
    dos: [
      'Wash animal bites under running tap water with soap for a FULL 15 MINUTES (vital for neutralizing rabies virus)',
      'Keep calm and immobilize bitten limb in snake bite cases',
      'Visit hospital immediately for Rabies vaccine + immunoglobulin and Tetanus toxoid'
    ],
    donts: [
      'DO NOT cut the wound, suck out venom, or apply electric shock for snake bites',
      'DO NOT tie tight arterial tourniquets that stop all blood circulation (leads to limb gangrene)',
      'DO NOT apply lime, chili, herbal pastes, or acid onto animal or snake bites',
      'DO NOT stitch animal bite wounds immediately without medical protocol'
    ],
    whenToSeekEmergency: [
      'ANY suspected venomous snake bite (KMCH emergency room has dedicated venom management)',
      'Severe tissue tearing, arterial bleeding, or animal bite near head and neck',
      'Unknown, stray, or visibly rabid/aggressive animal bite'
    ]
  }
];

