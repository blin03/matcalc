import { Character, Weapon, CalculatedMaterial, LevelRequirement } from '../types';
import { getMaterialByName } from '../data/materials';

export const calculateMaterials = (
  item: Character | Weapon | null,
  currentLevel: number,
  targetLevel: number,
  type: 'ascension' | 'skill' | 'exp' | 'statNode' | 'inherentSkill'
): CalculatedMaterial[] => {
  if (!item || currentLevel >= targetLevel) return [];

  const requiredMaterials: { [key: string]: number } = {};
  let relevantRequirements: LevelRequirement[] = [];

  // Determine the relevant requirements based on the type
  switch (type) {
    case 'ascension':
      if ('ascensionMaterials' in item) {
        relevantRequirements = item.ascensionMaterials;
      }
      break;
    case 'exp':
      if ('expMaterials' in item) {
        relevantRequirements = item.expMaterials;
      }
      break;
    case 'skill':
      if ('skillMaterials' in item) {
        relevantRequirements = item.skillMaterials;
      }
      break;
    case 'statNode':
      if ('statNodeMaterials' in item) {
        relevantRequirements = item.statNodeMaterials;
      }
      break;
    case 'inherentSkill':
      if ('inherentSkillMaterials' in item) {
        relevantRequirements = item.inherentSkillMaterials;
      }
      break;
    default:
      return [];
  }

  // Filter requirements between current and target level
  const levelsToConsider = relevantRequirements.filter(req => {
    if (type === 'ascension') {
      // For ascension, only include costs if targetLevel strictly exceeds the ascension threshold
      return req.level > currentLevel && targetLevel > req.level;
    } else {
      return req.level > currentLevel && targetLevel >= req.level;
    }
  });

  levelsToConsider.forEach(req => {
    req.materials.forEach(mat => {
      requiredMaterials[mat.materialName] = (requiredMaterials[mat.materialName] || 0) + mat.quantity;
    });
  });

  return Object.entries(requiredMaterials).map(([name, quantity]) => ({
    material: getMaterialByName(name)!,
    quantity,
  }));
};