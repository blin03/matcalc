import { Character, CharacterSpecificMaterialMap } from '../types';
import {
  ASCENSION_TEMPLATES, EXP_TEMPLATES, SKILL_TEMPLATES, applyTemplate } from './templates';
import { BossMaterial, SpecialtyMaterial, ExpMaterial, Currency, WeeklyBossMaterial } from './materials';
import { FORGERY_SWORD, FORGERY_PISTOL, FORGERY_RECTIFIER, FORGERY_BROADBLADE, FORGERY_GAUNTLETS,
         ENEMY_WHISPERIN, ENEMY_HOWLER, ENEMY_POLYGON, ENEMY_TIDAL_RESIDUUM, ENEMY_RING } from './materialSets';

const DEFAULT_CHARACTER_ASCENSION_MAP: CharacterSpecificMaterialMap['ascension'] = {
  credits: Currency.SHELL_CREDITS,
};

const DEFAULT_CHARACTER_EXP_MAP: CharacterSpecificMaterialMap['exp'] = {
  xp: ExpMaterial.PREMIUM_RESONANCE_POTION,
  credits: Currency.SHELL_CREDITS,
};

const DEFAULT_CHARACTER_SKILL_MAP: CharacterSpecificMaterialMap['skill'] = {
  credits: Currency.SHELL_CREDITS,
};

const DEFAULT_CHARACTER_STAT_NODE_MAP: CharacterSpecificMaterialMap['statNode'] = {
  ...DEFAULT_CHARACTER_SKILL_MAP,
};

const DEFAULT_CHARACTER_INHERENT_SKILL_MAP: CharacterSpecificMaterialMap['inherentSkill'] = {
  ...DEFAULT_CHARACTER_SKILL_MAP,
};

/**
 * Creates a character object with materials generated from templates.
 * @param base - The base character object without material data.
 * @param overrides - Optional overrides for the default material maps.
 */
function createCharacter(
  base: Omit<Character, 'materialMap' | 'ascensionMaterials' | 'skillMaterials' | 'expMaterials' | 'statNodeMaterials' | 'inherentSkillMaterials'>,
  overrides?: Partial<CharacterSpecificMaterialMap>
): Character {
  const materialMap: CharacterSpecificMaterialMap = {
    ascension: { ...DEFAULT_CHARACTER_ASCENSION_MAP, ...(overrides?.ascension || {}) },
    exp: { ...DEFAULT_CHARACTER_EXP_MAP, ...(overrides?.exp || {}) },
    skill: { ...DEFAULT_CHARACTER_SKILL_MAP, ...(overrides?.skill || {}) },
    statNode: { ...DEFAULT_CHARACTER_STAT_NODE_MAP, ...(overrides?.statNode || {}) },
    inherentSkill: { ...DEFAULT_CHARACTER_INHERENT_SKILL_MAP, ...(overrides?.inherentSkill || {}) },
  };

  // Generate the default ascension materials first
  const ascensionMaterials = applyTemplate(ASCENSION_TEMPLATES.CHARACTER, materialMap.ascension);

  // Apply ascensionOverrides if they exist on the base character object
  if (base.ascensionOverrides) {
    for (const levelStr in base.ascensionOverrides) {
      const level = parseInt(levelStr, 10);
      const levelOverride = base.ascensionOverrides[level];
      
      // Find the corresponding entry in the generated ascension materials array
      const ascensionEntry = ascensionMaterials.find(item => item.level === level);

      if (ascensionEntry) {
        // Find the material to override or add it if it doesn't exist
        for (const materialName in levelOverride) {
          const newQuantity = levelOverride[materialName].quantity;
          const existingMaterial = ascensionEntry.materials.find(mat => mat.materialName === materialName);

          if (existingMaterial) {
            existingMaterial.quantity = newQuantity;
          } else {
            // If the material doesn't exist for this level, add it
            ascensionEntry.materials.push({ materialName, quantity: newQuantity });
          }
        }
      }
    }
  }

  return {
    ...base,
    materialMap,
    ascensionMaterials,
    skillMaterials: applyTemplate(SKILL_TEMPLATES.SKILL, materialMap.skill),
    expMaterials: applyTemplate(EXP_TEMPLATES.CHARACTER, materialMap.exp),
    statNodeMaterials: SKILL_TEMPLATES.STAT_NODE
      ? applyTemplate(SKILL_TEMPLATES.STAT_NODE, materialMap.statNode)
      : [],
    inherentSkillMaterials: SKILL_TEMPLATES.INHERENT
      ? applyTemplate(SKILL_TEMPLATES.INHERENT, materialMap.inherentSkill)
      : [],
  };
}


// --- Character Definitions ---
export const roverSpectro: Character = createCharacter(
  {
    id: 'rover_spectro',
    name: 'Rover (Spectro)',
    rarity: 5,
    icon: '/assets/icons/characters/rover.webp',
    statNodeNames: ['Spectro DMG+', 'ATK+'],
    ascensionOverrides: {
      40: { [BossMaterial.MYSTERIOUS_CODE]: { quantity: 1 } },
      50: { [BossMaterial.MYSTERIOUS_CODE]: { quantity: 1 } },
      60: { [BossMaterial.MYSTERIOUS_CODE]: { quantity: 1 } },
      70: { [BossMaterial.MYSTERIOUS_CODE]: { quantity: 1 } },
      80: { [BossMaterial.MYSTERIOUS_CODE]: { quantity: 1 } },
    },
  },
  {
    ascension: { boss: BossMaterial.MYSTERIOUS_CODE, enemy: ENEMY_WHISPERIN, specialty: SpecialtyMaterial.PECOK_FLOWER },
    skill: { forgery: FORGERY_SWORD, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
    statNode: { forgery: FORGERY_SWORD, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
    inherentSkill: { forgery: FORGERY_SWORD, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
  },
);

export const roverHavoc: Character = createCharacter(
  {
    id: 'rover_havoc',
    name: 'Rover (Havoc)',
    rarity: 5,
    icon: '/assets/icons/characters/rover.webp',
    statNodeNames: ['Havoc DMG+', 'ATK+'],
    ascensionOverrides: {
      40: { [BossMaterial.MYSTERIOUS_CODE]: { quantity: 1 } },
      50: { [BossMaterial.MYSTERIOUS_CODE]: { quantity: 1 } },
      60: { [BossMaterial.MYSTERIOUS_CODE]: { quantity: 1 } },
      70: { [BossMaterial.MYSTERIOUS_CODE]: { quantity: 1 } },
      80: { [BossMaterial.MYSTERIOUS_CODE]: { quantity: 1 } },
    },
  },
  {
    ascension: { boss: BossMaterial.MYSTERIOUS_CODE, enemy: ENEMY_WHISPERIN, specialty: SpecialtyMaterial.PECOK_FLOWER },
    skill: { forgery: FORGERY_SWORD, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.DREAMLESS_FEATHER },
    statNode: { forgery: FORGERY_SWORD, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.DREAMLESS_FEATHER },
    inherentSkill: { forgery: FORGERY_SWORD, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.DREAMLESS_FEATHER },
  }
);

export const calcharo: Character = createCharacter(
  {
    id: 'calcharo',
    name: 'Calcharo',
    rarity: 5,
    icon: '/assets/icons/characters/calcharo.webp',
    statNodeNames: ['Crit. DMG+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.THUNDERING_TACET_CORE, enemy: ENEMY_RING, specialty: SpecialtyMaterial.IRIS },
    skill: { forgery: FORGERY_BROADBLADE, enemy: ENEMY_RING, weekly: WeeklyBossMaterial.MONUMENT_BELL },
    statNode: { forgery: FORGERY_BROADBLADE, enemy: ENEMY_RING, weekly: WeeklyBossMaterial.MONUMENT_BELL },
    inherentSkill: { forgery: FORGERY_BROADBLADE, enemy: ENEMY_RING, weekly: WeeklyBossMaterial.MONUMENT_BELL },
  }
);

export const encore: Character = createCharacter(
  {
    id: 'encore',
    name: 'Encore',
    rarity: 5,
    icon: '/assets/icons/characters/encore.webp',
    statNodeNames: ['Fusion DMG+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.RAGE_TACET_CORE, enemy: ENEMY_WHISPERIN, specialty: SpecialtyMaterial.PECOK_FLOWER },
    skill: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
    statNode: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
    inherentSkill: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
  }
);

export const jianxin: Character = createCharacter(
  {
    id: 'jianxin',
    name: 'Jianxin',
    rarity: 5,
    icon: '/assets/icons/characters/jianxin.webp',
    statNodeNames: ['Crit. Rate+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.ROARING_ROCK_FIST, enemy: ENEMY_WHISPERIN, specialty: SpecialtyMaterial.LANTERNBERRY },
    skill: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
    statNode: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
    inherentSkill: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
  }
);

export const lingyang: Character = createCharacter(
  {
    id: 'lingyang',
    name: 'Lingyang',
    rarity: 5,
    icon: '/assets/icons/characters/lingyang.webp',
    statNodeNames: ['Glacio DMG+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.SOUND_KEEPING_TACET_CORE, enemy: ENEMY_WHISPERIN, specialty: SpecialtyMaterial.CORIOLUS },
    skill: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
    statNode: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
    inherentSkill: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
  }
);

export const verina: Character = createCharacter(
  {
    id: 'verina',
    name: 'Verina',
    rarity: 5,
    icon: '/assets/icons/characters/verina.webp',
    statNodeNames: ['Healing Bonus+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.ELEGY_TACET_CORE, enemy: ENEMY_HOWLER, specialty: SpecialtyMaterial.BELLE_POPPY },
    skill: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.MONUMENT_BELL },
    statNode: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.MONUMENT_BELL },
    inherentSkill: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.MONUMENT_BELL },
  }
);

export const jiyan: Character = createCharacter(
  {
    id: 'jiyan',
    name: 'Jiyan',
    rarity: 5,
    icon: '/assets/icons/characters/jiyan.webp',
    statNodeNames: ['Crit. Rate+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.ROARING_ROCK_FIST, enemy: ENEMY_HOWLER, specialty: SpecialtyMaterial.PECOK_FLOWER },
    skill: { forgery: FORGERY_BROADBLADE, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.MONUMENT_BELL },
    statNode: { forgery: FORGERY_BROADBLADE, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.MONUMENT_BELL },
    inherentSkill: { forgery: FORGERY_BROADBLADE, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.MONUMENT_BELL },
  }
);

export const yinlin: Character = createCharacter(
  {
    id: 'yinlin',
    name: 'Yinlin',
    rarity: 5,
    icon: '/assets/icons/characters/yinlin.webp',
    statNodeNames: ['Crit. Rate+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.GROUP_ABOMINATION_TACET_CORE, enemy: ENEMY_WHISPERIN, specialty: SpecialtyMaterial.CORIOLUS },
    skill: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.DREAMLESS_FEATHER },
    statNode: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.DREAMLESS_FEATHER },
    inherentSkill: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.DREAMLESS_FEATHER },
  }
);

export const aalto: Character = createCharacter(
  {
    id: 'aalto',
    name: 'Aalto',
    rarity: 4,
    icon: '/assets/icons/characters/aalto.webp',
    statNodeNames: ['Aero DMG+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.ROARING_ROCK_FIST, enemy: ENEMY_HOWLER, specialty: SpecialtyMaterial.WINTRY_BELL },
    skill: { forgery: FORGERY_PISTOL, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.MONUMENT_BELL },
    statNode: { forgery: FORGERY_PISTOL, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.MONUMENT_BELL },
    inherentSkill: { forgery: FORGERY_PISTOL, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.MONUMENT_BELL },
  }
);

export const baizhi: Character = createCharacter(
  {
    id: 'baizhi',
    name: 'Baizhi',
    rarity: 4,
    icon: '/assets/icons/characters/baizhi.webp',
    statNodeNames: ['Healing Bonus+', 'HP+'],
  },
  {
    ascension: { boss: BossMaterial.SOUND_KEEPING_TACET_CORE, enemy: ENEMY_HOWLER, specialty: SpecialtyMaterial.LANTERNBERRY },
    skill: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.MONUMENT_BELL },
    statNode: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.MONUMENT_BELL },
    inherentSkill: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.MONUMENT_BELL },
  }
);

export const chixia: Character = createCharacter(
  {
    id: 'chixia',
    name: 'Chixia',
    rarity: 4,
    icon: '/assets/icons/characters/chixia.webp',
    statNodeNames: ['Fusion DMG+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.RAGE_TACET_CORE, enemy: ENEMY_WHISPERIN, specialty: SpecialtyMaterial.BELLE_POPPY },
    skill: { forgery: FORGERY_PISTOL, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.MONUMENT_BELL },
    statNode: { forgery: FORGERY_PISTOL, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.MONUMENT_BELL },
    inherentSkill: { forgery: FORGERY_PISTOL, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.MONUMENT_BELL },
  }
);

export const danjin: Character = createCharacter(
  {
    id: 'danjin',
    name: 'Danjin',
    rarity: 4,
    icon: '/assets/icons/characters/danjin.webp',
    statNodeNames: ['Havoc DMG+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.STRIFE_TACET_CORE, enemy: ENEMY_RING, specialty: SpecialtyMaterial.BELLE_POPPY },
    skill: { forgery: FORGERY_SWORD, enemy: ENEMY_RING, weekly: WeeklyBossMaterial.DREAMLESS_FEATHER },
    statNode: { forgery: FORGERY_SWORD, enemy: ENEMY_RING, weekly: WeeklyBossMaterial.DREAMLESS_FEATHER },
    inherentSkill: { forgery: FORGERY_SWORD, enemy: ENEMY_RING, weekly: WeeklyBossMaterial.DREAMLESS_FEATHER },
  }
);

export const mortefi: Character = createCharacter(
  {
    id: 'mortefi',
    name: 'Mortefi',
    rarity: 4,
    icon: '/assets/icons/characters/mortefi.webp',
    statNodeNames: ['Fusion DMG+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.RAGE_TACET_CORE, enemy: ENEMY_WHISPERIN, specialty: SpecialtyMaterial.CORIOLUS },
    skill: { forgery: FORGERY_PISTOL, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.MONUMENT_BELL },
    statNode: { forgery: FORGERY_PISTOL, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.MONUMENT_BELL },
    inherentSkill: { forgery: FORGERY_PISTOL, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.MONUMENT_BELL },
  }
);

export const sanhua: Character = createCharacter(
  {
    id: 'sanhua',
    name: 'Sanhua',
    rarity: 4,
    icon: '/assets/icons/characters/sanhua.webp',
    statNodeNames: ['Glacio DMG+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.SOUND_KEEPING_TACET_CORE, enemy: ENEMY_WHISPERIN, specialty: SpecialtyMaterial.WINTRY_BELL },
    skill: { forgery: FORGERY_SWORD, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
    statNode: { forgery: FORGERY_SWORD, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
    inherentSkill: { forgery: FORGERY_SWORD, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
  }
);

export const taoqi: Character = createCharacter(
  {
    id: 'taoqi',
    name: 'Taoqi',
    rarity: 4,
    icon: '/assets/icons/characters/taoqi.webp',
    statNodeNames: ['Havoc DMG+', 'DEF+'],
  },
  {
    ascension: { boss: BossMaterial.GOLD_DISSOLVING_FEATHER, enemy: ENEMY_HOWLER, specialty: SpecialtyMaterial.IRIS },
    skill: { forgery: FORGERY_BROADBLADE, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.DREAMLESS_FEATHER },
    statNode: { forgery: FORGERY_BROADBLADE, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.DREAMLESS_FEATHER },
    inherentSkill: { forgery: FORGERY_BROADBLADE, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.DREAMLESS_FEATHER },
  }
);

export const yangyang: Character = createCharacter(
  {
    id: 'yangyang',
    name: 'Yangyang',
    rarity: 4,
    icon: '/assets/icons/characters/yangyang.webp',
    statNodeNames: ['Aero DMG+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.ROARING_ROCK_FIST, enemy: ENEMY_RING, specialty: SpecialtyMaterial.WINTRY_BELL },
    skill: { forgery: FORGERY_SWORD, enemy: ENEMY_RING, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
    statNode: { forgery: FORGERY_SWORD, enemy: ENEMY_RING, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
    inherentSkill: { forgery: FORGERY_SWORD, enemy: ENEMY_RING, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
  }
);

export const yuanwu: Character = createCharacter(
  {
    id: 'yuanwu',
    name: 'Yuanwu',
    rarity: 4,
    icon: '/assets/icons/characters/yuanwu.webp',
    statNodeNames: ['Electro DMG+', 'DEF+'],
  },
  {
    ascension: { boss: BossMaterial.HIDDEN_THUNDER_TACET_CORE, enemy: ENEMY_RING, specialty: SpecialtyMaterial.TERRASPAWN_FUNGUS },
    skill: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_RING, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
    statNode: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_RING, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
    inherentSkill: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_RING, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
  }
);

export const jinhsi: Character = createCharacter(
  {
    id: 'jinhsi',
    name: 'Jinhsi',
    rarity: 5,
    icon: '/assets/icons/characters/jinhsi.webp',
    statNodeNames: ['Crit. Rate+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.ELEGY_TACET_CORE, enemy: ENEMY_HOWLER, specialty: SpecialtyMaterial.LOONGS_PEARL },
    skill: { forgery: FORGERY_BROADBLADE, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.SENTINELS_DAGGER },
    statNode: { forgery: FORGERY_BROADBLADE, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.SENTINELS_DAGGER },
    inherentSkill: { forgery: FORGERY_BROADBLADE, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.SENTINELS_DAGGER },
  }
);

export const changli: Character = createCharacter(
  {
    id: 'changli',
    name: 'Changli',
    rarity: 5,
    icon: '/assets/icons/characters/changli.webp',
    statNodeNames: ['Crit. Rate+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.RAGE_TACET_CORE, enemy: ENEMY_RING, specialty: SpecialtyMaterial.PAVO_PLUM },
    skill: { forgery: FORGERY_SWORD, enemy: ENEMY_RING, weekly: WeeklyBossMaterial.SENTINELS_DAGGER },
    statNode: { forgery: FORGERY_SWORD, enemy: ENEMY_RING, weekly: WeeklyBossMaterial.SENTINELS_DAGGER },
    inherentSkill: { forgery: FORGERY_SWORD, enemy: ENEMY_RING, weekly: WeeklyBossMaterial.SENTINELS_DAGGER },
  }
);

export const zhezhi: Character = createCharacter(
  {
    id: 'zhezhi',
    name: 'Zhezhi',
    rarity: 5,
    icon: '/assets/icons/characters/zhezhi.webp',
    statNodeNames: ['Crit. Rate+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.SOUND_KEEPING_TACET_CORE, enemy: ENEMY_HOWLER, specialty: SpecialtyMaterial.LANTERNBERRY },
    skill: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.MONUMENT_BELL },
    statNode: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.MONUMENT_BELL },
    inherentSkill: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.MONUMENT_BELL },
  }
);

export const xiangliYao: Character = createCharacter(
  {
    id: 'xiangli_yao',
    name: 'Xiangli Yao',
    rarity: 5,
    icon: '/assets/icons/characters/xiangli_yao.webp',
    statNodeNames: ['Crit. DMG+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.HIDDEN_THUNDER_TACET_CORE, enemy: ENEMY_WHISPERIN, specialty: SpecialtyMaterial.VIOLET_CORAL },
    skill: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
    statNode: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
    inherentSkill: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.UNENDING_DESTRUCTION },
  }
);

export const shorekeeper: Character = createCharacter(
  {
    id: 'shorekeeper',
    name: 'Shorekeeper',
    rarity: 5,
    icon: '/assets/icons/characters/shorekeeper.webp',
    statNodeNames: ['Healing Bonus+', 'HP+'],
  },
  {
    ascension: { boss: BossMaterial.TOPOLOGICAL_CONFINEMENT, enemy: ENEMY_WHISPERIN, specialty: SpecialtyMaterial.NOVA },
    skill: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.SENTINELS_DAGGER },
    statNode: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.SENTINELS_DAGGER },
    inherentSkill: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.SENTINELS_DAGGER },
  }
);

export const youhu: Character = createCharacter(
  {
    id: 'youhu',
    name: 'Youhu',
    rarity: 4,
    icon: '/assets/icons/characters/youhu.webp',
    statNodeNames: ['Crit. Rate+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.TOPOLOGICAL_CONFINEMENT, enemy: ENEMY_RING, specialty: SpecialtyMaterial.VIOLET_CORAL },
    skill: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_RING, weekly: WeeklyBossMaterial.MONUMENT_BELL },
    statNode: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_RING, weekly: WeeklyBossMaterial.MONUMENT_BELL },
    inherentSkill: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_RING, weekly: WeeklyBossMaterial.MONUMENT_BELL },
  }
);

export const camellya: Character = createCharacter(
  {
    id: 'camellya',
    name: 'Camellya',
    rarity: 5,
    icon: '/assets/icons/characters/camellya.webp',
    statNodeNames: ['Crit. DMG+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.TOPOLOGICAL_CONFINEMENT, enemy: ENEMY_WHISPERIN, specialty: SpecialtyMaterial.NOVA },
    skill: { forgery: FORGERY_SWORD, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.DREAMLESS_FEATHER },
    statNode: { forgery: FORGERY_SWORD, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.DREAMLESS_FEATHER },
    inherentSkill: { forgery: FORGERY_SWORD, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.DREAMLESS_FEATHER },
  }
);

export const lumi: Character = createCharacter(
  {
    id: 'lumi',
    name: 'Lumi',
    rarity: 4,
    icon: '/assets/icons/characters/lumi.webp',
    statNodeNames: ['Crit. Rate+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.THUNDERING_TACET_CORE, enemy: ENEMY_HOWLER, specialty: SpecialtyMaterial.TERRASPAWN_FUNGUS },
    skill: { forgery: FORGERY_BROADBLADE, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.SENTINELS_DAGGER },
    statNode: { forgery: FORGERY_BROADBLADE, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.SENTINELS_DAGGER },
    inherentSkill: { forgery: FORGERY_BROADBLADE, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.SENTINELS_DAGGER },
  }
);

export const carlotta: Character = createCharacter(
  {
    id: 'carlotta',
    name: 'Carlotta',
    rarity: 5,
    icon: '/assets/icons/characters/carlotta.webp',
    statNodeNames: ['Crit. Rate+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.PLATINUM_CORE, enemy: ENEMY_POLYGON, specialty: SpecialtyMaterial.SWORD_ACORUS },
    skill: { forgery: FORGERY_PISTOL, enemy: ENEMY_POLYGON, weekly: WeeklyBossMaterial.THE_NETHERWORLDS_STARE },
    statNode: { forgery: FORGERY_PISTOL, enemy: ENEMY_POLYGON, weekly: WeeklyBossMaterial.THE_NETHERWORLDS_STARE },
    inherentSkill: { forgery: FORGERY_PISTOL, enemy: ENEMY_POLYGON, weekly: WeeklyBossMaterial.THE_NETHERWORLDS_STARE },
  }
);

export const roccia: Character = createCharacter(
  {
    id: 'roccia',
    name: 'Roccia',
    rarity: 5,
    icon: '/assets/icons/characters/roccia.webp',
    statNodeNames: ['Crit. DMG+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.CLEANSING_CONCH, enemy: ENEMY_TIDAL_RESIDUUM, specialty: SpecialtyMaterial.FIRECRACKER_JEWELWEED },
    skill: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_TIDAL_RESIDUUM, weekly: WeeklyBossMaterial.THE_NETHERWORLDS_STARE },
    statNode: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_TIDAL_RESIDUUM, weekly: WeeklyBossMaterial.THE_NETHERWORLDS_STARE },
    inherentSkill: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_TIDAL_RESIDUUM, weekly: WeeklyBossMaterial.THE_NETHERWORLDS_STARE },
  }
);

export const phoebe: Character = createCharacter(
  {
    id: 'phoebe',
    name: 'Phoebe',
    rarity: 5,
    icon: '/assets/icons/characters/phoebe.webp',
    statNodeNames: ['Crit. DMG+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.CLEANSING_CONCH, enemy: ENEMY_WHISPERIN, specialty: SpecialtyMaterial.FIRECRACKER_JEWELWEED },
    skill: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.SENTINELS_DAGGER },
    statNode: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.SENTINELS_DAGGER },
    inherentSkill: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_WHISPERIN, weekly: WeeklyBossMaterial.SENTINELS_DAGGER },
  }
);

export const brant: Character = createCharacter(
  {
    id: 'brant',
    name: 'Brant',
    rarity: 5,
    icon: '/assets/icons/characters/brant.webp',
    statNodeNames: ['Crit. Rate+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.BLAZING_BONE, enemy: ENEMY_TIDAL_RESIDUUM, specialty: SpecialtyMaterial.GOLDEN_FLEECE },
    skill: { forgery: FORGERY_SWORD, enemy: ENEMY_TIDAL_RESIDUUM, weekly: WeeklyBossMaterial.THE_NETHERWORLDS_STARE },
    statNode: { forgery: FORGERY_SWORD, enemy: ENEMY_TIDAL_RESIDUUM, weekly: WeeklyBossMaterial.THE_NETHERWORLDS_STARE },
    inherentSkill: { forgery: FORGERY_SWORD, enemy: ENEMY_TIDAL_RESIDUUM, weekly: WeeklyBossMaterial.THE_NETHERWORLDS_STARE },
  }
);

export const roverAero: Character = createCharacter(
  {
    id: 'rover_aero',
    name: 'Rover (Aero)',
    rarity: 5,
    icon: '/assets/icons/characters/rover.webp',
    statNodeNames: ['Healing Bonus+', 'ATK+'],
    ascensionOverrides: {
      40: { [BossMaterial.MYSTERIOUS_CODE]: { quantity: 1 } },
      50: { [BossMaterial.MYSTERIOUS_CODE]: { quantity: 1 } },
      60: { [BossMaterial.MYSTERIOUS_CODE]: { quantity: 1 } },
      70: { [BossMaterial.MYSTERIOUS_CODE]: { quantity: 1 } },
      80: { [BossMaterial.MYSTERIOUS_CODE]: { quantity: 1 } },
    },
  },
  {
    ascension: { boss: BossMaterial.MYSTERIOUS_CODE, enemy: ENEMY_TIDAL_RESIDUUM, specialty: SpecialtyMaterial.PECOK_FLOWER },
    skill: { forgery: FORGERY_SWORD, enemy: ENEMY_TIDAL_RESIDUUM, weekly: WeeklyBossMaterial.WHEN_IRISES_BLOOM },
    statNode: { forgery: FORGERY_SWORD, enemy: ENEMY_TIDAL_RESIDUUM, weekly: WeeklyBossMaterial.WHEN_IRISES_BLOOM },
    inherentSkill: { forgery: FORGERY_SWORD, enemy: ENEMY_TIDAL_RESIDUUM, weekly: WeeklyBossMaterial.WHEN_IRISES_BLOOM },
  }
);

export const cantarella: Character = createCharacter(
  {
    id: 'cantarella',
    name: 'Cantarella',
    rarity: 5,
    icon: '/assets/icons/characters/cantarella.webp',
    statNodeNames: ['Crit. Rate+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.CLEANSING_CONCH, enemy: ENEMY_POLYGON, specialty: SpecialtyMaterial.SEASIDE_CENDRELIS },
    skill: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_POLYGON, weekly: WeeklyBossMaterial.WHEN_IRISES_BLOOM },
    statNode: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_POLYGON, weekly: WeeklyBossMaterial.WHEN_IRISES_BLOOM },
    inherentSkill: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_POLYGON, weekly: WeeklyBossMaterial.WHEN_IRISES_BLOOM },
  }
);

export const zani: Character = createCharacter(
  {
    id: 'zani',
    name: 'Zani',
    rarity: 5,
    icon: '/assets/icons/characters/zani.webp',
    statNodeNames: ['Crit. Rate+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.PLATINUM_CORE, enemy: ENEMY_POLYGON, specialty: SpecialtyMaterial.SWORD_ACORUS },
    skill: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_POLYGON, weekly: WeeklyBossMaterial.THE_NETHERWORLDS_STARE },
    statNode: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_POLYGON, weekly: WeeklyBossMaterial.THE_NETHERWORLDS_STARE },
    inherentSkill: { forgery: FORGERY_GAUNTLETS, enemy: ENEMY_POLYGON, weekly: WeeklyBossMaterial.THE_NETHERWORLDS_STARE },
  }
);

export const ciaccona: Character = createCharacter(
  {
    id: 'ciaccona',
    name: 'Ciaccona',
    rarity: 5,
    icon: '/assets/icons/characters/ciaccona.webp',
    statNodeNames: ['Crit. DMG+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.BLAZING_BONE, enemy: ENEMY_TIDAL_RESIDUUM, specialty: SpecialtyMaterial.GOLDEN_FLEECE },
    skill: { forgery: FORGERY_PISTOL, enemy: ENEMY_TIDAL_RESIDUUM, weekly: WeeklyBossMaterial.WHEN_IRISES_BLOOM },
    statNode: { forgery: FORGERY_PISTOL, enemy: ENEMY_TIDAL_RESIDUUM, weekly: WeeklyBossMaterial.WHEN_IRISES_BLOOM },
    inherentSkill: { forgery: FORGERY_PISTOL, enemy: ENEMY_TIDAL_RESIDUUM, weekly: WeeklyBossMaterial.WHEN_IRISES_BLOOM },
  }
);

export const cartethyia: Character = createCharacter(
  {
    id: 'cartethyia',
    name: 'Cartethyia',
    rarity: 5,
    icon: '/assets/icons/characters/cartethyia.webp',
    statNodeNames: ['Crit. Rate+', 'HP+'],
  },
  {
    ascension: { boss: BossMaterial.UNFADING_GLORY, enemy: ENEMY_TIDAL_RESIDUUM, specialty: SpecialtyMaterial.BAMBOO_IRIS },
    skill: { forgery: FORGERY_SWORD, enemy: ENEMY_TIDAL_RESIDUUM, weekly: WeeklyBossMaterial.WHEN_IRISES_BLOOM },
    statNode: { forgery: FORGERY_SWORD, enemy: ENEMY_TIDAL_RESIDUUM, weekly: WeeklyBossMaterial.WHEN_IRISES_BLOOM },
    inherentSkill: { forgery: FORGERY_SWORD, enemy: ENEMY_TIDAL_RESIDUUM, weekly: WeeklyBossMaterial.WHEN_IRISES_BLOOM },
  }
);

export const lupa: Character = createCharacter(
  {
    id: 'lupa',
    name: 'Lupa',
    rarity: 5,
    icon: '/assets/icons/characters/lupa.webp',
    statNodeNames: ['Crit. Rate+', 'ATK+'],
  },
  {
    ascension: { boss: BossMaterial.UNFADING_GLORY, enemy: ENEMY_HOWLER, specialty: SpecialtyMaterial.BLOODLEAF_VIBURNUM },
    skill: { forgery: FORGERY_BROADBLADE, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.THE_NETHERWORLDS_STARE },
    statNode: { forgery: FORGERY_BROADBLADE, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.THE_NETHERWORLDS_STARE },
    inherentSkill: { forgery: FORGERY_BROADBLADE, enemy: ENEMY_HOWLER, weekly: WeeklyBossMaterial.THE_NETHERWORLDS_STARE },
  }
);

export const phrolova: Character = createCharacter(
  {
    id: 'phrolova',
    name: 'Phrolova',
    rarity: 5,
    icon: '/assets/icons/characters/phrolova.webp',
    statNodeNames: ['Crit. Rate+', 'ATK+'],
    prerelease: true,
  },
  {
    ascension: { boss: BossMaterial.TRUTH_IN_LIES, enemy: ENEMY_POLYGON, specialty: SpecialtyMaterial.AFTERLIFE },
    skill: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_POLYGON, weekly: WeeklyBossMaterial.THE_NETHERWORLDS_STARE },
    statNode: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_POLYGON, weekly: WeeklyBossMaterial.THE_NETHERWORLDS_STARE },
    inherentSkill: { forgery: FORGERY_RECTIFIER, enemy: ENEMY_POLYGON, weekly: WeeklyBossMaterial.THE_NETHERWORLDS_STARE },
  }
);

export const characters: Character[] = [
  // v1.0
  roverSpectro,
  roverHavoc,
  calcharo,
  encore,
  jianxin,
  lingyang,
  verina,
  jiyan,
  yinlin,
  aalto,
  baizhi,
  chixia,
  danjin,
  mortefi,
  sanhua,
  taoqi,
  yangyang,
  yuanwu,

  // v1.1
  jinhsi,
  changli,

  // v1.2
  zhezhi,
  xiangliYao,

  // v1.3
  shorekeeper,
  youhu,

  // v1.4
  camellya,
  lumi,

  // v2.0
  carlotta,
  roccia,

  // v2.1
  phoebe,
  brant,

  // v2.2
  roverAero,
  cantarella,

  // v2.3
  zani,
  ciaccona,

  // v2.4
  cartethyia,
  lupa,

  // v2.5
  phrolova,
]
