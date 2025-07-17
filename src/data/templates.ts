import { LevelRequirement } from '../types';
import { getMaterialByName } from './materials';

export const ASCENSION_TEMPLATES = {
  CHARACTER: [
    { level: 20, ascension: 1, boss: 0, enemy: [4, 0, 0, 0], specialty: 0, credits: 5000 },
    { level: 40, ascension: 2, boss: 3, enemy: [0, 4, 0, 0], specialty: 4, credits: 10000 },
    { level: 50, ascension: 3, boss: 6, enemy: [0, 8, 0, 0], specialty: 8, credits: 15000 },
    { level: 60, ascension: 4, boss: 9, enemy: [0, 0, 4, 0], specialty: 12, credits: 20000 },
    { level: 70, ascension: 5, boss: 12, enemy: [0, 0, 8, 0], specialty: 16, credits: 40000 },
    { level: 80, ascension: 6, boss: 16, enemy: [0, 0, 0, 4], specialty: 20, credits: 80000 }
  ],

  WEAPON_5: [
    { level: 20, ascension: 1, forgery: [0, 0, 0, 0], enemy: [6, 0, 0, 0], credits: 10000 },
    { level: 40, ascension: 2, forgery: [6, 0, 0, 0], enemy: [0, 6, 0, 0], credits: 20000 },
    { level: 50, ascension: 3, forgery: [0, 8, 0, 0], enemy: [0, 0, 4, 0], credits: 40000 },
    { level: 60, ascension: 4, forgery: [0, 0, 6, 0], enemy: [0, 0, 6, 0], credits: 60000 },
    { level: 70, ascension: 5, forgery: [0, 0, 0, 8], enemy: [0, 0, 0, 4], credits: 80000 },
    { level: 80, ascension: 6, forgery: [0, 0, 0, 12], enemy: [0, 0, 0, 8], credits: 120000 },
  ],

  WEAPON_4: [
    { level: 20, ascension: 1, forgery: [0, 0, 0, 0], enemy: [5, 0, 0, 0], credits: 8000 },
    { level: 40, ascension: 2, forgery: [5, 0, 0, 0], enemy: [0, 5, 0, 0], credits: 16000 },
    { level: 50, ascension: 3, forgery: [0, 7, 0, 0], enemy: [0, 0, 4, 0], credits: 32000 },
    { level: 60, ascension: 4, forgery: [0, 0, 5, 0], enemy: [0, 0, 5, 0], credits: 48000 },
    { level: 70, ascension: 5, forgery: [0, 0, 0, 7], enemy: [0, 0, 0, 4], credits: 64000 },
    { level: 80, ascension: 6, forgery: [0, 0, 0, 10], enemy: [0, 0, 0, 7], credits: 96000 },
  ],
};

export const EXP_TEMPLATES = {
  CHARACTER: [
    { level: 20, xp: 33300, credits: 11655 },
    { level: 40, xp: 175500, credits: 61425 },
    { level: 50, xp: 188300, credits: 65905 },
    { level: 60, xp: 286600, credits: 100310 },
    { level: 70, xp: 413000, credits: 144550 },
    { level: 80, xp: 572400, credits: 200340 },
    { level: 90, xp: 768900, credits: 269115 }
  ],

  WEAPON_5: [
    { level: 20, xp: 38700, credits: 15480 },
    { level: 40, xp: 187400, credits: 74690 },
    { level: 50, xp: 199900, credits: 79960 },
    { level: 60, xp: 302400, credits: 120960 },
    { level: 70, xp: 432100, credits: 172840 },
    { level: 80, xp: 590700, credits: 236280 },
    { level: 90, xp: 941200, credits: 376480 }
  ],

  WEAPON_4: [
    { level: 20, xp: 36900, credits: 14760 },
    { level: 40, xp: 150800, credits: 60320 },
    { level: 50, xp: 150800, credits: 60320 },
    { level: 60, xp: 227900, credits: 91160 },
    { level: 70, xp: 333600, credits: 133440 },
    { level: 80, xp: 474800, credits: 189920 },
    { level: 90, xp: 914400, credits: 365760 }
  ]
};

export const SKILL_TEMPLATES = {
  SKILL: [
    { level: 2, forgery: [2, 0, 0, 0], enemy: [2, 0, 0, 0], weekly: 0, credits: 1500 },
    { level: 3, forgery: [3, 0, 0, 0], enemy: [3, 0, 0, 0], weekly: 0, credits: 2000 },
    { level: 4, forgery: [0, 2, 0, 0], enemy: [0, 2, 0, 0], weekly: 0, credits: 4500 },
    { level: 5, forgery: [0, 3, 0, 0], enemy: [0, 3, 0, 0], weekly: 0, credits: 6000 },
    { level: 6, forgery: [0, 0, 3, 0], enemy: [0, 0, 2, 0], weekly: 0, credits: 16000 },
    { level: 7, forgery: [0, 0, 5, 0], enemy: [0, 0, 3, 0], weekly: 1, credits: 30000 },
    { level: 8, forgery: [0, 0, 0, 2], enemy: [0, 0, 0, 2], weekly: 1, credits: 50000 },
    { level: 9, forgery: [0, 0, 0, 3], enemy: [0, 0, 0, 3], weekly: 1, credits: 70000 },
    { level: 10, forgery: [0, 0, 0, 6], enemy: [0, 0, 0, 4], weekly: 1, credits: 100000 }
  ],

  STAT_NODE: [
    {level: 1, forgery: [0, 0, 3, 0], enemy: [0, 0, 3, 0], weekly: 0, credits: 50000},
    {level: 2, forgery: [0, 0, 0, 3], enemy: [0, 0, 0, 3], weekly: 1, credits: 100000}
  ],

  INHERENT: [
    {level: 1, forgery: [0, 3, 0, 0], enemy: [0, 3, 0, 0], weekly: 1, credits: 10000},
    {level: 2, forgery: [0, 0, 3, 0], enemy: [0, 0, 3, 0], weekly: 1, credits: 20000}
  ]
};


// A generic type representing a single entry in any of the templates.
type TemplateEntry = { level: number; [key: string]: number | number[] };


// A generic type for the material map, allowing for string or array of strings.
type MaterialMap = { [key: string]: string | string[] };


// Helper function to generate LevelRequirement from a template.
export function applyTemplate<T extends TemplateEntry>(
  template: T[],
  materialMap: MaterialMap
): LevelRequirement[] {
  return template.map(entry => {
    const materials: { materialName: string; quantity: number }[] = [];
    let ascensionValue: number | undefined;

    for (const key in entry) {
      if (key === 'level') {
        continue;
      }
      if (key === 'ascension' && typeof entry[key] === 'number') {
        ascensionValue = entry[key] as number;
        continue;
      }

      const value = entry[key];
      const mappedMaterial = materialMap[key];

      if (value !== undefined && mappedMaterial !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((quantity, index) => {
            if (quantity > 0) {
              const materialName = Array.isArray(mappedMaterial) ? mappedMaterial[index] : undefined;
              if (materialName) {
                materials.push({ materialName, quantity });
              } else {
                console.warn(`Material name not found for key '${key}' at index ${index}.`);
              }
            }
          });
        } else if (typeof value === 'number' && value > 0) {
          // Special handling for 'xp' key to calculate material counts from total XP
          if (key === 'xp') {
            const xpMaterialName = typeof mappedMaterial === 'string' ? mappedMaterial : '';
            const xpMaterial = getMaterialByName(xpMaterialName);

            if (xpMaterial && typeof xpMaterial.xpValue === 'number' && xpMaterial.xpValue > 0) {
              const totalXpRequired = value;
              const numMaterialsNeeded = Math.ceil(totalXpRequired / xpMaterial.xpValue);
              materials.push({ materialName: xpMaterialName, quantity: numMaterialsNeeded });
            } else {
              console.warn(`XP material '${xpMaterialName}' not found or has invalid xpValue.`);
            }
          } else {
            if (typeof mappedMaterial === 'string') {
              materials.push({ materialName: mappedMaterial, quantity: value });
            } else {
              console.warn(`Mapped material for '${key}' is not a string.`);
            }
          }
        }
      }
    }

    // Construct the LevelRequirement object
    const baseRequirement: LevelRequirement = { level: entry.level, materials };
    if (ascensionValue !== undefined) {
      (baseRequirement as any).ascension = ascensionValue;
    }
    
    return baseRequirement;
  });
}