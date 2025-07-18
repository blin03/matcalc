import { Material } from '../types';

// Enum for Character Ascension Boss Materials
export enum BossMaterial {
  // v1.0
  ELEGY_TACET_CORE = "Elegy Tacet Core",
  GOLD_DISSOLVING_FEATHER = "Gold-Dissolving Feather",
  GROUP_ABOMINATION_TACET_CORE = "Group Abomination Tacet Core",
  HIDDEN_THUNDER_TACET_CORE = "Hidden Thunder Tacet Core",
  MYSTERIOUS_CODE = "Mysterious Code",
  RAGE_TACET_CORE = "Rage Tacet Core",
  ROARING_ROCK_FIST = "Roaring Rock Fist",
  SOUND_KEEPING_TACET_CORE = "Sound-Keeping Tacet Core",
  STRIFE_TACET_CORE = "Strife Tacet Core",
  THUNDERING_TACET_CORE = "Thundering Tacet Core",

  // v1.3
  TOPOLOGICAL_CONFINEMENT = "Topological Confinement",

  // v2.0
  BLAZING_BONE = "Blazing Bone",
  CLEANSING_CONCH = "Cleansing Conch",
  PLATINUM_CORE = "Platinum Core",

  // v2.4
  UNFADING_GLORY = "Unfading Glory",

  // v2.5
  PHROLOVA_MAT = "TBA"
}

// Enum for Common Enemy Materials
export enum EnemyMaterial {
  LF_HOWLER_CORE = "LF Howler Core",
  MF_HOWLER_CORE = "MF Howler Core",
  HF_HOWLER_CORE = "HF Howler Core",
  FF_HOWLER_CORE = "FF Howler Core",

  LF_POLYGON_CORE = "LF Polygon Core",
  MF_POLYGON_CORE = "MF Polygon Core",
  HF_POLYGON_CORE = "HF Polygon Core",
  FF_POLYGON_CORE = "FF Polygon Core",

  LF_TIDAL_RESIDUUM = "LF Tidal Residuum",
  MF_TIDAL_RESIDUUM = "MF Tidal Residuum",
  HF_TIDAL_RESIDUUM = "HF Tidal Residuum",
  FF_TIDAL_RESIDUUM = "FF Tidal Residuum",

  LF_WHISPERIN_CORE = "LF Whisperin Core",
  MF_WHISPERIN_CORE = "MF Whisperin Core",
  HF_WHISPERIN_CORE = "HF Whisperin Core",
  FF_WHISPERIN_CORE = "FF Whisperin Core",

  CRUDE_RING = "Crude Ring",
  BASIC_RING = "Basic Ring",
  IMPROVED_RING = "Improved Ring",
  TAILORED_RING = "Tailored Ring"
}

// Enum for Skill/Weapon Forgery Materials
export enum ForgeryMaterial {
  // Sword
  INERT_METALLIC_DRIP = "Inert Metallic Drip",
  REACTIVE_METALLIC_DRIP = "Reactive Metallic Drip",
  POLARIZED_METALLIC_DRIP = "Polarized Metallic Drip",
  HETERIZED_METALLIC_DRIP = "Heterized Metallic Drip",

  // Pistol
  IMPURE_PHLOGISTON = "Impure Phlogiston",
  EXTRACTED_PHLOGISTON = "Extracted Phlogiston",
  REFINED_PHLOGISTON = "Refined Phlogiston",
  FLAWLESS_PHLOGISTON = "Flawless Phlogiston",

  // Rectifier
  LENTO_HELIX = "Lento Helix",
  ADAGIO_HELIX = "Adagio Helix",
  ANDANTE_HELIX = "Andante Helix",
  PRESTO_HELIX = "Presto Helix",

  // Broadblade
  WAVEWORN_RESIDUE_210 = "Waveworn Residue 210",
  WAVEWORN_RESIDUE_226 = "Waveworn Residue 226",
  WAVEWORN_RESIDUE_235 = "Waveworn Residue 235",
  WAVEWORN_RESIDUE_239 = "Waveworn Residue 239",

  // Gauntlets
  CADENCE_SEED = "Cadence Seed",
  CADENCE_BUD = "Cadence Bud",
  CADENCE_LEAF = "Cadence Leaf",
  CADENCE_BLOSSOM = "Cadence Blossom"
}

// Enum for Experience Materials
export enum ExpMaterial {
  BASIC_RESONANCE_POTION = "Basic Resonance Potion",
  MEDIUM_RESONANCE_POTION = "Medium Resonance Potion",
  ADVANCED_RESONANCE_POTION = "Advanced Resonance Potion",
  PREMIUM_RESONANCE_POTION = "Premium Resonance Potion",
  
  BASIC_ENERGY_CORE = "Basic Energy Core",
  MEDIUM_ENERGY_CORE = "Medium Energy Core",
  ADVANCED_ENERGY_CORE = "Advanced Energy Core",
  PREMIUM_ENERGY_CORE = "Premium Energy Core",
}

// Enum for Currencies
export enum Currency {
  SHELL_CREDITS = 'Shell Credits',
  WAVEPLATES = 'Waveplates',
}

// Enum for Weekly Boss Materials
export enum WeeklyBossMaterial {
  // v1.0
  DREAMLESS_FEATHER = "Dreamless Feather",
  MONUMENT_BELL = "Monument Bell",
  UNENDING_DESTRUCTION = "Unending Destruction",

  // v1.1
  SENTINELS_DAGGER = "Sentinel's Dagger",

  // v2.0
  THE_NETHERWORLDS_STARE = "The Netherworld's Stare",

  // v2.2
  WHEN_IRISES_BLOOM = "When Irises Bloom"
}

// Enum for Character Specialty Materials (local specialties)
export enum SpecialtyMaterial {
  // v1.0
  BELLE_POPPY = "Belle Poppy",
  CORIOLUS = "Coriolus",
  IRIS = "Iris",
  LANTERNBERRY = "Lanternberry",
  PECOK_FLOWER = "Pecok Flower",
  TERRASPAWN_FUNGUS = "Terraspawn Fungus",
  VIOLET_CORAL = "Violet Coral",
  WINTRY_BELL = "Wintry Bell",

  // v1.1
  LOONGS_PEARL = "Loong's Pearl",
  PAVO_PLUM = "Pavo Plum",

  // v1.3
  NOVA = "Nova",

  // v2.0
  FIRECRACKER_JEWELWEED = "Firecracker Jewelweed",
  GOLDEN_FLEECE = "Golden Fleece",
  SWORD_ACORUS = "Sword Acorus",

  // v2.2
  SEASIDE_CENDRELIS = "Seaside Cendrelis",

  // v2.4
  BAMBOO_IRIS = "Bamboo Iris",
  BLOODLEAF_VIBURNUM = "Bloodleaf Viburnum"
}


// Helper to generate icon paths with a subfolder
const getIconPath = (subfolder: string, name: string) => {
    const fileName = name.toLowerCase().replace(/ /g, '_').replace(/-/g, '_').replace(/\./g, '').replace(/_t(\d)/, '_t$1');
    return `/assets/icons/materials/${subfolder}/${fileName}.webp`;
};


// Consolidated list of all materials as Material objects
export const allMaterials: Material[] = [
  // Boss Materials
  { name: BossMaterial.ELEGY_TACET_CORE, rarity: 4, type: 'character_ascension', icon: getIconPath('boss', BossMaterial.ELEGY_TACET_CORE) },
  { name: BossMaterial.GOLD_DISSOLVING_FEATHER, rarity: 4, type: 'character_ascension', icon: getIconPath('boss', BossMaterial.GOLD_DISSOLVING_FEATHER) },
  { name: BossMaterial.GROUP_ABOMINATION_TACET_CORE, rarity: 4, type: 'character_ascension', icon: getIconPath('boss', BossMaterial.GROUP_ABOMINATION_TACET_CORE) },
  { name: BossMaterial.HIDDEN_THUNDER_TACET_CORE, rarity: 4, type: 'character_ascension', icon: getIconPath('boss', BossMaterial.HIDDEN_THUNDER_TACET_CORE) },
  { name: BossMaterial.MYSTERIOUS_CODE, rarity: 4, type: 'character_ascension', icon: getIconPath('boss', BossMaterial.MYSTERIOUS_CODE) },
  { name: BossMaterial.RAGE_TACET_CORE, rarity: 4, type: 'character_ascension', icon: getIconPath('boss', BossMaterial.RAGE_TACET_CORE) },
  { name: BossMaterial.ROARING_ROCK_FIST, rarity: 4, type: 'character_ascension', icon: getIconPath('boss', BossMaterial.ROARING_ROCK_FIST) },
  { name: BossMaterial.SOUND_KEEPING_TACET_CORE, rarity: 4, type: 'character_ascension', icon: getIconPath('boss', BossMaterial.SOUND_KEEPING_TACET_CORE) },
  { name: BossMaterial.STRIFE_TACET_CORE, rarity: 4, type: 'character_ascension', icon: getIconPath('boss', BossMaterial.STRIFE_TACET_CORE) },
  { name: BossMaterial.THUNDERING_TACET_CORE, rarity: 4, type: 'character_ascension', icon: getIconPath('boss', BossMaterial.THUNDERING_TACET_CORE) },
  { name: BossMaterial.TOPOLOGICAL_CONFINEMENT, rarity: 4, type: 'character_ascension', icon: getIconPath('boss', BossMaterial.TOPOLOGICAL_CONFINEMENT) },
  { name: BossMaterial.BLAZING_BONE, rarity: 4, type: 'character_ascension', icon: getIconPath('boss', BossMaterial.BLAZING_BONE) },
  { name: BossMaterial.CLEANSING_CONCH, rarity: 4, type: 'character_ascension', icon: getIconPath('boss', BossMaterial.CLEANSING_CONCH) },
  { name: BossMaterial.PLATINUM_CORE, rarity: 4, type: 'character_ascension', icon: getIconPath('boss', BossMaterial.PLATINUM_CORE) },
  { name: BossMaterial.UNFADING_GLORY, rarity: 4, type: 'character_ascension', icon: getIconPath('boss', BossMaterial.UNFADING_GLORY) },
  { name: BossMaterial.PHROLOVA_MAT, rarity: 4, type: 'character_ascension', icon: getIconPath('boss', BossMaterial.PHROLOVA_MAT) },

  // Enemy Materials (Tiered Rarities, Character Ascension)
  // LF (Rarity 2) -> MF (Rarity 3) -> HF (Rarity 4) -> FF (Rarity 5)
  { name: EnemyMaterial.LF_HOWLER_CORE, rarity: 2, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.LF_HOWLER_CORE) },
  { name: EnemyMaterial.MF_HOWLER_CORE, rarity: 3, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.MF_HOWLER_CORE) },
  { name: EnemyMaterial.HF_HOWLER_CORE, rarity: 4, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.HF_HOWLER_CORE) },
  { name: EnemyMaterial.FF_HOWLER_CORE, rarity: 5, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.FF_HOWLER_CORE) },

  { name: EnemyMaterial.LF_POLYGON_CORE, rarity: 2, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.LF_POLYGON_CORE) },
  { name: EnemyMaterial.MF_POLYGON_CORE, rarity: 3, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.MF_POLYGON_CORE) },
  { name: EnemyMaterial.HF_POLYGON_CORE, rarity: 4, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.HF_POLYGON_CORE) },
  { name: EnemyMaterial.FF_POLYGON_CORE, rarity: 5, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.FF_POLYGON_CORE) },

  { name: EnemyMaterial.LF_TIDAL_RESIDUUM, rarity: 2, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.LF_TIDAL_RESIDUUM) },
  { name: EnemyMaterial.MF_TIDAL_RESIDUUM, rarity: 3, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.MF_TIDAL_RESIDUUM) },
  { name: EnemyMaterial.HF_TIDAL_RESIDUUM, rarity: 4, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.HF_TIDAL_RESIDUUM) },
  { name: EnemyMaterial.FF_TIDAL_RESIDUUM, rarity: 5, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.FF_TIDAL_RESIDUUM) },

  { name: EnemyMaterial.LF_WHISPERIN_CORE, rarity: 2, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.LF_WHISPERIN_CORE) },
  { name: EnemyMaterial.MF_WHISPERIN_CORE, rarity: 3, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.MF_WHISPERIN_CORE) },
  { name: EnemyMaterial.HF_WHISPERIN_CORE, rarity: 4, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.HF_WHISPERIN_CORE) },
  { name: EnemyMaterial.FF_WHISPERIN_CORE, rarity: 5, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.FF_WHISPERIN_CORE) },

  { name: EnemyMaterial.CRUDE_RING, rarity: 2, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.CRUDE_RING) },
  { name: EnemyMaterial.BASIC_RING, rarity: 3, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.BASIC_RING) },
  { name: EnemyMaterial.IMPROVED_RING, rarity: 4, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.IMPROVED_RING) },
  { name: EnemyMaterial.TAILORED_RING, rarity: 5, type: 'character_ascension', icon: getIconPath('enemy', EnemyMaterial.TAILORED_RING) },

  // Forgery Materials (Tiered Rarities, Weapon Ascension)
  // Sword
  { name: ForgeryMaterial.INERT_METALLIC_DRIP, rarity: 2, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.INERT_METALLIC_DRIP) },
  { name: ForgeryMaterial.REACTIVE_METALLIC_DRIP, rarity: 3, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.REACTIVE_METALLIC_DRIP) },
  { name: ForgeryMaterial.POLARIZED_METALLIC_DRIP, rarity: 4, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.POLARIZED_METALLIC_DRIP) },
  { name: ForgeryMaterial.HETERIZED_METALLIC_DRIP, rarity: 5, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.HETERIZED_METALLIC_DRIP) },

  // Pistol
  { name: ForgeryMaterial.IMPURE_PHLOGISTON, rarity: 2, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.IMPURE_PHLOGISTON) },
  { name: ForgeryMaterial.EXTRACTED_PHLOGISTON, rarity: 3, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.EXTRACTED_PHLOGISTON) },
  { name: ForgeryMaterial.REFINED_PHLOGISTON, rarity: 4, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.REFINED_PHLOGISTON) },
  { name: ForgeryMaterial.FLAWLESS_PHLOGISTON, rarity: 5, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.FLAWLESS_PHLOGISTON) },

  // Rectifier
  { name: ForgeryMaterial.LENTO_HELIX, rarity: 2, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.LENTO_HELIX) },
  { name: ForgeryMaterial.ADAGIO_HELIX, rarity: 3, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.ADAGIO_HELIX) },
  { name: ForgeryMaterial.ANDANTE_HELIX, rarity: 4, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.ANDANTE_HELIX) },
  { name: ForgeryMaterial.PRESTO_HELIX, rarity: 5, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.PRESTO_HELIX) },

  // Broadblade
  { name: ForgeryMaterial.WAVEWORN_RESIDUE_210, rarity: 2, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.WAVEWORN_RESIDUE_210) },
  { name: ForgeryMaterial.WAVEWORN_RESIDUE_226, rarity: 3, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.WAVEWORN_RESIDUE_226) },
  { name: ForgeryMaterial.WAVEWORN_RESIDUE_235, rarity: 4, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.WAVEWORN_RESIDUE_235) },
  { name: ForgeryMaterial.WAVEWORN_RESIDUE_239, rarity: 5, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.WAVEWORN_RESIDUE_239) },

  // Gauntlets
  { name: ForgeryMaterial.CADENCE_SEED, rarity: 2, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.CADENCE_SEED) },
  { name: ForgeryMaterial.CADENCE_BUD, rarity: 3, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.CADENCE_BUD) },
  { name: ForgeryMaterial.CADENCE_LEAF, rarity: 4, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.CADENCE_LEAF) },
  { name: ForgeryMaterial.CADENCE_BLOSSOM, rarity: 5, type: 'weapon_ascension', icon: getIconPath('forgery', ForgeryMaterial.CADENCE_BLOSSOM) },

  // Exp Materials (Assigned XP values and increasing rarities)
  // Character EXP Materials
  { name: ExpMaterial.BASIC_RESONANCE_POTION, rarity: 2, type: 'character_exp', xpValue: 1000, icon: getIconPath('exp', ExpMaterial.BASIC_RESONANCE_POTION) },
  { name: ExpMaterial.MEDIUM_RESONANCE_POTION, rarity: 3, type: 'character_exp', xpValue: 3000, icon: getIconPath('exp', ExpMaterial.MEDIUM_RESONANCE_POTION) },
  { name: ExpMaterial.ADVANCED_RESONANCE_POTION, rarity: 4, type: 'character_exp', xpValue: 8000, icon: getIconPath('exp', ExpMaterial.ADVANCED_RESONANCE_POTION) },
  { name: ExpMaterial.PREMIUM_RESONANCE_POTION, rarity: 5, type: 'character_exp', xpValue: 20000, icon: getIconPath('exp', ExpMaterial.PREMIUM_RESONANCE_POTION) },
  
  // Weapon EXP Materials
  { name: ExpMaterial.BASIC_ENERGY_CORE, rarity: 2, type: 'weapon_exp', xpValue: 1000, icon: getIconPath('exp', ExpMaterial.BASIC_ENERGY_CORE) },
  { name: ExpMaterial.MEDIUM_ENERGY_CORE, rarity: 3, type: 'weapon_exp', xpValue: 3000, icon: getIconPath('exp', ExpMaterial.MEDIUM_ENERGY_CORE) },
  { name: ExpMaterial.ADVANCED_ENERGY_CORE, rarity: 4, type: 'weapon_exp', xpValue: 8000, icon: getIconPath('exp', ExpMaterial.ADVANCED_ENERGY_CORE) },
  { name: ExpMaterial.PREMIUM_ENERGY_CORE, rarity: 5, type: 'weapon_exp', xpValue: 20000, icon: getIconPath('exp', ExpMaterial.PREMIUM_ENERGY_CORE) },

  // Currencies
  { name: Currency.SHELL_CREDITS, rarity: 3, type: 'currency', icon: getIconPath('currency', Currency.SHELL_CREDITS) },
  { name: Currency.WAVEPLATES, type: 'currency', icon: getIconPath('currency', Currency.WAVEPLATES) },

  // Weekly Boss Materials
  { name: WeeklyBossMaterial.DREAMLESS_FEATHER, rarity: 4, type: 'skill_material', icon: getIconPath('weekly', WeeklyBossMaterial.DREAMLESS_FEATHER) },
  { name: WeeklyBossMaterial.MONUMENT_BELL, rarity: 4, type: 'skill_material', icon: getIconPath('weekly', WeeklyBossMaterial.MONUMENT_BELL) },
  { name: WeeklyBossMaterial.UNENDING_DESTRUCTION, rarity: 4, type: 'skill_material', icon: getIconPath('weekly', WeeklyBossMaterial.UNENDING_DESTRUCTION) },
  { name: WeeklyBossMaterial.SENTINELS_DAGGER, rarity: 4, type: 'skill_material', icon: getIconPath('weekly', WeeklyBossMaterial.SENTINELS_DAGGER) },
  { name: WeeklyBossMaterial.THE_NETHERWORLDS_STARE, rarity: 4, type: 'skill_material', icon: getIconPath('weekly', WeeklyBossMaterial.THE_NETHERWORLDS_STARE) },
  { name: WeeklyBossMaterial.WHEN_IRISES_BLOOM, rarity: 4, type: 'skill_material', icon: getIconPath('weekly', WeeklyBossMaterial.WHEN_IRISES_BLOOM) },

  // Specialty Materials
  { name: SpecialtyMaterial.BELLE_POPPY, rarity: 1, type: 'character_ascension', icon: getIconPath('specialty', SpecialtyMaterial.BELLE_POPPY) },
  { name: SpecialtyMaterial.CORIOLUS, rarity: 1, type: 'character_ascension', icon: getIconPath('specialty', SpecialtyMaterial.CORIOLUS) },
  { name: SpecialtyMaterial.IRIS, rarity: 1, type: 'character_ascension', icon: getIconPath('specialty', SpecialtyMaterial.IRIS) },
  { name: SpecialtyMaterial.LANTERNBERRY, rarity: 1, type: 'character_ascension', icon: getIconPath('specialty', SpecialtyMaterial.LANTERNBERRY) },
  { name: SpecialtyMaterial.PECOK_FLOWER, rarity: 1, type: 'character_ascension', icon: getIconPath('specialty', SpecialtyMaterial.PECOK_FLOWER) },
  { name: SpecialtyMaterial.TERRASPAWN_FUNGUS, rarity: 1, type: 'character_ascension', icon: getIconPath('specialty', SpecialtyMaterial.TERRASPAWN_FUNGUS) },
  { name: SpecialtyMaterial.VIOLET_CORAL, rarity: 1, type: 'character_ascension', icon: getIconPath('specialty', SpecialtyMaterial.VIOLET_CORAL) },
  { name: SpecialtyMaterial.WINTRY_BELL, rarity: 1, type: 'character_ascension', icon: getIconPath('specialty', SpecialtyMaterial.WINTRY_BELL) },
  { name: SpecialtyMaterial.LOONGS_PEARL, rarity: 1, type: 'character_ascension', icon: getIconPath('specialty', SpecialtyMaterial.LOONGS_PEARL) },
  { name: SpecialtyMaterial.PAVO_PLUM, rarity: 1, type: 'character_ascension', icon: getIconPath('specialty', SpecialtyMaterial.PAVO_PLUM) },
  { name: SpecialtyMaterial.NOVA, rarity: 1, type: 'character_ascension', icon: getIconPath('specialty', SpecialtyMaterial.NOVA) },
  { name: SpecialtyMaterial.FIRECRACKER_JEWELWEED, rarity: 1, type: 'character_ascension', icon: getIconPath('specialty', SpecialtyMaterial.FIRECRACKER_JEWELWEED) },
  { name: SpecialtyMaterial.GOLDEN_FLEECE, rarity: 1, type: 'character_ascension', icon: getIconPath('specialty', SpecialtyMaterial.GOLDEN_FLEECE) },
  { name: SpecialtyMaterial.SWORD_ACORUS, rarity: 1, type: 'character_ascension', icon: getIconPath('specialty', SpecialtyMaterial.SWORD_ACORUS) },
  { name: SpecialtyMaterial.SEASIDE_CENDRELIS, rarity: 1, type: 'character_ascension', icon: getIconPath('specialty', SpecialtyMaterial.SEASIDE_CENDRELIS) },
  { name: SpecialtyMaterial.BAMBOO_IRIS, rarity: 1, type: 'character_ascension', icon: getIconPath('specialty', SpecialtyMaterial.BAMBOO_IRIS) },
  { name: SpecialtyMaterial.BLOODLEAF_VIBURNUM, rarity: 1, type: 'character_ascension', icon: getIconPath('specialty', SpecialtyMaterial.BLOODLEAF_VIBURNUM) },
];

// Helper to get material details by name
export const getMaterialByName = (name: string): Material | undefined => {
  return allMaterials.find(mat => mat.name === name);
};