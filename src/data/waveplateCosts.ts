import { MaterialRarity } from '../types';
import { BossMaterial } from './materials';

export const STAMINA_COSTS_BY_CATEGORY: {
  [categoryIdentifier: string]: { [rarity: number]: number } | number;
} = {
  // Boss Materials: 60 waveplates, 4-5 drops
  'BOSS_MATERIAL_COST': 60 / 4.5,

  // Forgery Materials: 40 stamina, 50.9 drops converted to 2 star, each rarity adjusted for equivalence
  'FORGERY_MATERIAL_RARITY_COSTS': {
    [MaterialRarity.TWO_STAR]: 40 / (50.9 / 1),
    [MaterialRarity.THREE_STAR]: 40 / (50.9 / 3),
    [MaterialRarity.FOUR_STAR]: 40 / (50.9 / 9),
    [MaterialRarity.FIVE_STAR]: 40 / (50.9 / 27),
  },

  // Enemy Materials: Open world drops
  'ENEMY_MATERIAL_RARITY_COSTS': {
    [MaterialRarity.ONE_STAR]: 0,
    [MaterialRarity.TWO_STAR]: 0,
    [MaterialRarity.THREE_STAR]: 0,
    [MaterialRarity.FOUR_STAR]: 0,
  },

  // Weekly Boss Materials: 60 stamina, 3 drops, 3 weekly cap
  'WEEKLY_BOSS_MATERIAL_COST': 60 / 3,

  // Specialty Materials: Open world collection
  'SPECIALTY_MATERIAL_COST': 0,

  // EXP Materials: 40 stamina, 78600 xp, each rarity adjusted for equivalence
  'EXP_MATERIAL_RARITY_COSTS': {
    [MaterialRarity.TWO_STAR]: 40 / (78600 / 1000),
    [MaterialRarity.THREE_STAR]: 40 / (78600 / 3000),
    [MaterialRarity.FOUR_STAR]: 40 / (78600 / 8000),
    [MaterialRarity.FIVE_STAR]: 40 / (78600 / 20000), 
  },

  // Currencies: 40 stamina, 84000 shell credits
  'Shell Credits': 40 / 84000,
};

// Helper function to get the stamina cost for a given material
export const getWaveplateCost = (materialName: string, sourceType: string, rarity?: number): number => {
  // Handle categories with a single cost
  if (sourceType === 'BossMaterial' && materialName !== BossMaterial.MYSTERIOUS_CODE) { // Exclude Mysterious Code as it isn't obtained from waveplate
    return STAMINA_COSTS_BY_CATEGORY['BOSS_MATERIAL_COST'] as number;
  }
  if (sourceType === 'WeeklyBossMaterial') {
    return STAMINA_COSTS_BY_CATEGORY['WEEKLY_BOSS_MATERIAL_COST'] as number;
  }
  if (sourceType === 'SpecialtyMaterial') {
    return STAMINA_COSTS_BY_CATEGORY['SPECIALTY_MATERIAL_COST'] as number;
  }
  if (materialName === 'Shell Credits') {
    return STAMINA_COSTS_BY_CATEGORY['Shell Credits'] as number;
  }

  // Handle categories with rarity-based costs
  if (rarity !== undefined) {
    if (sourceType === 'ForgeryMaterial') {
      const costs = STAMINA_COSTS_BY_CATEGORY['FORGERY_MATERIAL_RARITY_COSTS'] as { [rarity: number]: number };
      if (costs && costs[rarity] !== undefined) {
        return costs[rarity];
      }
    }
    if (sourceType === 'ExpMaterial') {
      const costs = STAMINA_COSTS_BY_CATEGORY['EXP_MATERIAL_RARITY_COSTS'] as { [rarity: number]: number };
      if (costs && costs[rarity] !== undefined) {
        return costs[rarity];
      }
    }
  }

  return 0; // Default to 0 if no cost is defined for the material/category
};