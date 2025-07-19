import React, { useState, useEffect } from 'react';
import { characters } from './data/characters';
import { weapons } from './data/weapons';
import { calculateMaterials } from './utils/calculator';
import { LevelSlider } from './components/LevelSlider';
import { LevelCheckbox } from './components/LevelCheckbox';
import { Icon } from './components/Icon';
import { CalculatedMaterial, Character, Material } from './types';
import { getMaterialByName, BossMaterial, EnemyMaterial, SpecialtyMaterial, ForgeryMaterial, ExpMaterial, Currency, WeeklyBossMaterial } from './data/materials';
import * as materialSets from './data/materialSets';
import { CollapsiblePanel } from './components/CollapsiblePanel';
import { Dropdown } from './components/Dropdown';
import { MaterialInputField } from './components/MaterialInputField';
import { getWaveplateCost } from './data/waveplateCosts';

// Helper function to determine a material's source type based on its name
const getMaterialSource = (material: Material): string => {
  if (Object.values(BossMaterial).includes(material.name as any)) return 'BossMaterial';
  if (Object.values(EnemyMaterial).includes(material.name as any)) return 'EnemyMaterial';
  if (Object.values(SpecialtyMaterial).includes(material.name as any)) return 'SpecialtyMaterial';
  if (Object.values(ForgeryMaterial).includes(material.name as any)) return 'ForgeryMaterial';
  if (Object.values(WeeklyBossMaterial).includes(material.name as any)) return 'WeeklyBossMaterial';
  if (Object.values(ExpMaterial).includes(material.name as any)) return 'ExpMaterial';
  if (Object.values(Currency).includes(material.name as any)) return 'Currency';
  return 'Other';
};

// Helper function to get a unique identifier for a material set
const getMaterialSetId = (material: Material): string | null => {
  for (const key in materialSets) {
    const materialSet = (materialSets as any)[key];
    if (Array.isArray(materialSet) && materialSet.includes(material.name as any)) {
      return key;
    }
  }
  return null;
};

// Define display names for material sources
const materialSourceDisplayNames: { [key: string]: string } = {
  BossMaterial: 'Boss Ascension Materials',
  ExpMaterial: 'EXP Materials',
  SpecialtyMaterial: 'World Specialties',
  ForgeryMaterial: 'Forgery Materials',
  EnemyMaterial: 'Enemy Materials',
  WeeklyBossMaterial: 'Weekly Skill Materials',
  Currency: 'Currencies',
  Other: 'Other Materials',
};

// Helper function to abbreviate large numbers for display
const formatNumber = (num: number): string => {
  const roundedNum = Math.round(num); // Round the number first

  if (roundedNum >= 1000000) {
    return (roundedNum / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
  } else if (roundedNum >= 1000) {
    return (roundedNum / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return roundedNum.toString();
};

// Helper function to format Waveplate numbers (raw whole number)
const formatWaveplateNumber = (num: number): string => {
  return Math.round(num).toString();
};

const WAVEPLATE_ICON_PATH = getMaterialByName(Currency.WAVEPLATES)?.icon || '❓';
const GITHUB_ICON_PATH = '/assets/icons/other/github-mark-white.svg';


// Main App Component
const App: React.FC = () => {
  // LocalStorage caching
  const LOCAL_STORAGE_KEY = 'wuwaMaterialPlannerState';

  // Function to load state from localStorage
  const loadState = () => {
    try {
      const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.error("Could not load state from localStorage", err);
      return undefined;
    }
  };

  const savedState = loadState();


  // Initialization - load from saved state or use default values
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>(savedState?.selectedCharacterId || '');
  const [selectedWeaponId, setSelectedWeaponId] = useState<string>(savedState?.selectedWeaponId || '');
  const [filterWeaponsByType, setFilterWeaponsByType] = useState<boolean>(savedState?.filterWeaponsByType || true);

  const [charCurrentLevel, setCharCurrentLevel] = useState<number>(savedState?.charCurrentLevel || 1);
  const [charTargetLevel, setCharTargetLevel] = useState<number>(savedState?.charTargetLevel || 90);
  const [weaponCurrentLevel, setWeaponCurrentLevel] = useState<number>(savedState?.weaponCurrentLevel || 1);
  const [weaponTargetLevel, setWeaponTargetLevel] = useState<number>(savedState?.weaponTargetLevel || 90);

  const [skills, setSkills] = useState<number[]>(savedState?.skills || Array(5).fill(1));
  const [targetSkills, setTargetSkills] = useState<number[]>(savedState?.targetSkills || Array(5).fill(10));

  const [statNodeBooleans, setStatNodeBooleans] = useState<boolean[][]>(savedState?.statNodeBooleans || Array(4).fill([true, true]));
  const [inherentSkillBooleans, setInherentSkillBooleans] = useState<boolean[]>(savedState?.inherentSkillBooleans || [true, true]);

  const [materialInventory, setMaterialInventory] = useState<{ [materialName: string]: number }>(savedState?.materialInventory || {});

  // Recalculate from cached state
  const [allMaterials, setAllMaterials] = useState<CalculatedMaterial[]>([]);
  const [totalStamina, setTotalStamina] = useState<number>(0);

  // Effect to save state to localStorage whenever a persisted state value changes
  useEffect(() => {
    try {
      const stateToSave = {
        selectedCharacterId,
        selectedWeaponId,
        filterWeaponsByType,
        charCurrentLevel,
        charTargetLevel,
        weaponCurrentLevel,
        weaponTargetLevel,
        skills,
        targetSkills,
        statNodeBooleans,
        inherentSkillBooleans,
        materialInventory,
      };
      const serializedState = JSON.stringify(stateToSave);
      localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    } catch (err) {
      console.error("Could not save state to localStorage", err);
    }
  }, [
    selectedCharacterId,
    selectedWeaponId,
    filterWeaponsByType,
    charCurrentLevel,
    charTargetLevel,
    weaponCurrentLevel,
    weaponTargetLevel,
    skills,
    targetSkills,
    statNodeBooleans,
    inherentSkillBooleans,
    materialInventory,
  ]);

  const selectedCharacter: Character | undefined = characters.find(
    (char) => char.id === selectedCharacterId
  );
  const selectedWeapon = weapons.find((w) => w.id === selectedWeaponId);

  // Filtered weapons based on character type and toggle
  const filteredWeapons = selectedCharacter && filterWeaponsByType
    ? weapons.filter(weapon => weapon.type === selectedCharacter.type)
    : weapons;

  // Effect for calculating materials
  useEffect(() => {
    // Character Materials
    const characterAscensionMaterials = selectedCharacter ? calculateMaterials(selectedCharacter, charCurrentLevel, charTargetLevel, 'ascension') : [];
    const characterExpMaterials = selectedCharacter ? calculateMaterials(selectedCharacter, charCurrentLevel, charTargetLevel, 'exp') : [];
    const skillMaterials = selectedCharacter ? skills.flatMap((current, index) => calculateMaterials(selectedCharacter, current, targetSkills[index], 'skill')) : [];

    // Dynamically calculate current and target levels for stat nodes
    const statNodeMaterials = selectedCharacter ? statNodeBooleans.flatMap((levels) => {
      const [isL1Checked, isL2Checked] = levels;
      if (isL1Checked && isL2Checked) {
        return calculateMaterials(selectedCharacter, 0, 2, 'statNode');
      } else if (isL1Checked) {
        return calculateMaterials(selectedCharacter, 0, 1, 'statNode');
      } else if (isL2Checked) {
        return calculateMaterials(selectedCharacter, 1, 2, 'statNode');
      }
      return [];
    }) : [];

    // Dynamically calculate current and target levels for inherent skill
    const inherentSkillMaterials = selectedCharacter ? (() => {
      const [isL1Checked, isL2Checked] = inherentSkillBooleans;
      if (isL1Checked && isL2Checked) {
        return calculateMaterials(selectedCharacter, 0, 2, 'inherentSkill');
      } else if (isL1Checked) {
        return calculateMaterials(selectedCharacter, 0, 1, 'inherentSkill');
      } else if (isL2Checked) {
        return calculateMaterials(selectedCharacter, 1, 2, 'inherentSkill');
      }
      return [];
    })() : [];

    // Weapon Materials
    const weaponMaterials = selectedWeapon ? calculateMaterials(selectedWeapon, weaponCurrentLevel, weaponTargetLevel, 'ascension') : [];
    const weaponExpMaterials = selectedWeapon ? calculateMaterials(selectedWeapon, weaponCurrentLevel, weaponTargetLevel, 'exp') : [];

    // Aggregate all materials
    const tempAllMaterials = [
      ...characterAscensionMaterials,
      ...characterExpMaterials,
      ...skillMaterials,
      ...statNodeMaterials,
      ...inherentSkillMaterials,
      ...weaponMaterials,
      ...weaponExpMaterials,
    ];

    // Combine materials with the same name
    const consolidatedMaterials: { [key: string]: CalculatedMaterial } = {};
    tempAllMaterials.forEach(mat => {
      if (consolidatedMaterials[mat.material.name]) {
        consolidatedMaterials[mat.material.name].quantity += mat.quantity;
      } else {
        consolidatedMaterials[mat.material.name] = { ...mat };
      }
    });

    const finalMaterials = Object.values(consolidatedMaterials);
    setAllMaterials(finalMaterials);

    // Calculate total stamina for all materials needed (before accounting for inventory)
    const calculatedTotalStamina = finalMaterials.reduce((sum, mat) => {
      const neededToFarm = Math.max(0, mat.quantity - (materialInventory[mat.material.name] || 0));
      const materialDetails = getMaterialByName(mat.material.name);
      const materialSource = getMaterialSource(mat.material);
      const materialRarity = materialDetails?.rarity;

      const staminaPerUnit = getWaveplateCost(mat.material.name, materialSource, materialRarity);
      return sum + (neededToFarm * staminaPerUnit);
    }, 0);
    setTotalStamina(calculatedTotalStamina);
  }, [
    selectedCharacterId, selectedWeaponId,
    charCurrentLevel, charTargetLevel,
    weaponCurrentLevel, weaponTargetLevel,
    skills, targetSkills,
    statNodeBooleans,
    inherentSkillBooleans,
    materialInventory,
    selectedCharacter,
    selectedWeapon,
  ]);

  // Sort order based on material category
  const materialSourceOrder = [
    'BossMaterial',
    'ExpMaterial',
    'SpecialtyMaterial',
    'ForgeryMaterial',
    'EnemyMaterial',
    'WeeklyBossMaterial',
    'Currency',
    'Other',
  ];

  const sortMaterials = (a: CalculatedMaterial, b: CalculatedMaterial) => {
    const aSource = getMaterialSource(a.material);
    const bSource = getMaterialSource(b.material);
    const aSetId = getMaterialSetId(a.material);
    const bSetId = getMaterialSetId(b.material);

    // Primary sort by material source category (BossMaterial, ExpMaterial, etc.)
    const aIndex = materialSourceOrder.indexOf(aSource);
    const bIndex = materialSourceOrder.indexOf(bSource);

    if (aIndex !== bIndex) {
      return aIndex - bIndex;
    }

    // If sources are the same, apply specific set grouping for Enemy/Forgery Materials
    if ((aSource === 'EnemyMaterial' || aSource === 'ForgeryMaterial') &&
        (bSource === 'EnemyMaterial' || bSource === 'ForgeryMaterial')) {
        if (aSetId && bSetId) {
            if (aSetId === bSetId) {
                return (a.material.rarity || 0) - (b.material.rarity || 0);
            } else {
                return aSetId.localeCompare(bSetId);
            }
        }
    }

    // Secondary sort by rarity (for materials not covered by set grouping within source, or for other sources)
    if (a.material.rarity && b.material.rarity && a.material.rarity !== b.material.rarity) {
      return (a.material.rarity || 0) - (b.material.rarity || 0);
    }

    // Fallback sort alphabetical by name
    return a.material.name.localeCompare(b.material.name);
  };


  const sortedMaterials = [...allMaterials].sort(sortMaterials);

  // Filter materials that are still needed after accounting for inventory
  const remainingNeededMaterials = sortedMaterials.filter(mat => {
    const currentInventory = materialInventory[mat.material.name] || 0;
    return (mat.quantity - currentInventory) > 0;
  });

  // Helper function to group remaining materials by category and calculate total waveplate cost per category
  const groupMaterialsByCategory = (materials: CalculatedMaterial[]) => {
    const groups: { [key: string]: { materials: CalculatedMaterial[]; totalWaveplateCost: number } } = {};

    materials.forEach(mat => {
      const source = getMaterialSource(mat.material);
      if (!groups[source]) {
        groups[source] = { materials: [], totalWaveplateCost: 0 };
      }
      groups[source].materials.push(mat);

      const neededToFarm = Math.max(0, mat.quantity - (materialInventory[mat.material.name] || 0));
      const materialDetails = getMaterialByName(mat.material.name);
      const materialRarity = materialDetails?.rarity;

      const staminaPerUnit = getWaveplateCost(mat.material.name, source, materialRarity);
      groups[source].totalWaveplateCost += (neededToFarm * staminaPerUnit);
    });

    return groups;
  };

  // Function to distribute grouped materials to columns
  const distributeCategoriesToColumns = (groups: { [key: string]: { materials: CalculatedMaterial[]; totalWaveplateCost: number } }) => {
    const column1: { materials: CalculatedMaterial[]; totalWaveplateCost: number }[] = [];
    const column2: { materials: CalculatedMaterial[]; totalWaveplateCost: number }[] = [];

    const sortedCategories = Object.keys(groups).sort((a, b) => {
      const aIndex = materialSourceOrder.indexOf(a);
      const bIndex = materialSourceOrder.indexOf(b);
      return aIndex - bIndex;
    });

    let column1ItemCount = 0;
    let column2ItemCount = 0;

    sortedCategories.forEach(category => {
      const categoryGroup = groups[category];

      if (column1ItemCount <= column2ItemCount) {
        column1.push(categoryGroup);
        column1ItemCount += categoryGroup.materials.length;
      } else {
        column2.push(categoryGroup);
        column2ItemCount += categoryGroup.materials.length;
      }
    });

    return { column1, column2 };
  };


  const materialGroups = groupMaterialsByCategory(remainingNeededMaterials);
  const { column1: column1Remaining, column2: column2Remaining } = distributeCategoriesToColumns(materialGroups);

  const handleStatNodeChange = (index: number, level: 1 | 2) => (checked: boolean) => {
    setStatNodeBooleans(prev => {
      const newLevels = [...prev];
      const newLevelBooleans = [...newLevels[index]];
      if (level === 1) {
        newLevelBooleans[0] = checked;
      } else {
        newLevelBooleans[1] = checked;
      }
      newLevels[index] = newLevelBooleans;
      return newLevels;
    });
  };

  const handleInherentSkillChange = (level: 1 | 2) => (checked: boolean) => {
    setInherentSkillBooleans(prev => {
      const newBooleans = [...prev];
      if (level === 1) {
                      newBooleans[0] = checked;
      } else {
        newBooleans[1] = checked;
      }
      return newBooleans;
    });
  };

  const handleSkillChange = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<number[]>>
  ) => (level: number) => {
    setter(prev => {
      const newLevels = [...prev];
      newLevels[index] = level;
      return newLevels;
    });
  };

  // Handler for inventory input changes, passed to MaterialInputField
  const handleInventoryChange = (materialName: string) => (value: number) => {
    setMaterialInventory(prev => ({
      ...prev,
      [materialName]: value,
    }));
  };

  // Function to clear all material inventory entries
  const clearAllInventory = () => {
    setMaterialInventory({});
  };

  const skillLabels = ["Basic Attack", "Resonance Skill", "Forte Circuit", "Resonance Liberation", "Intro Skill"];
  const allowedLevels = [1, 20, 40, 50, 60, 70, 80, 90];

  // Get Stat Node names from selected character, else fall back to default 'Stat Node'
  const statNodeName1 = selectedCharacter?.statNodeNames?.[0] || 'Stat Node';
  const statNodeName2 = selectedCharacter?.statNodeNames?.[1] || 'Stat Node';

  // Helper function to get rarity glow class for icons
  const getRarityGlowClass = (rarity?: number) => {
    switch (rarity) {
      case 1:
        return 'drop-shadow-[0_0_12px_rgba(156,163,175,0.8)]';
      case 2:
        return 'drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]';
      case 3:
        return 'drop-shadow-[0_0_12px_rgba(96,165,250,0.8)]';
      case 4:
        return 'drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]';
      case 5:
        return 'drop-shadow-[0_0_12px_rgba(252,211,77,0.8)]';
      default:
        return '';
    }
  };

  // Helper function to get a consistent gray border class for containers
  const getContainerBorderClass = () => {
    return 'border-gray-700';
  };

  // Helper function to render a column with category headers and Waveplate costs
  const renderMaterialColumn = (
    materialGroups: { materials: CalculatedMaterial[]; totalWaveplateCost: number }[],
    columnKey: string
  ) => {
    return materialGroups.map((group, groupIndex) => {
      const displaySource = materialSourceDisplayNames[getMaterialSource(group.materials[0].material)] || getMaterialSource(group.materials[0].material);

      return (
        <React.Fragment key={`${columnKey}-group-${groupIndex}`}>
          <h4 className="text-lg font-semibold mt-4 mb-2 text-gray-300 border-b border-gray-600 pb-1 first:mt-0 flex items-center justify-between">
            <span>{displaySource}</span>
            {group.totalWaveplateCost > 0 && (
              <span className="flex items-center text-sm font-normal text-cyan-400">
                <Icon src={WAVEPLATE_ICON_PATH} alt="Waveplates" className="w-5 h-5 mr-1" />
                {formatWaveplateNumber(group.totalWaveplateCost)} Waveplates
              </span>
            )}
          </h4>
          {group.materials.map((mat) => {
            const materialDetails = getMaterialByName(mat.material.name);
            const iconSrc = materialDetails?.icon || '❓';
            const rarityGlowClass = getRarityGlowClass(materialDetails?.rarity);
            const currentInventory = materialInventory[mat.material.name] || 0;
            const neededToFarm = Math.max(0, mat.quantity - currentInventory);

            return (
              <div key={`${columnKey}-${mat.material.name}`} className="flex items-center justify-between gap-4 text-gray-200 py-2">
                {/* Material Icon & Name */}
                <div className="flex items-center flex-grow">
                  <Icon src={iconSrc} alt={mat.material.name} className={`w-10 h-10 mr-4 rounded-full border border-gray-500 ${rarityGlowClass}`} />
                  <span className="font-medium flex-grow truncate">{mat.material.name}</span>
                </div>
                {/* To Farm Quantity */}
                <div className="flex-shrink-0 text-right min-w-[60px]">
                  <span className={`text-xl font-extrabold text-gray-300`}>
                    x{neededToFarm}
                  </span>
                </div>
              </div>
            );
          })}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen p-8 font-sans">
      <div className="max-w-7xl mx-auto relative">
        {/* Header with Title and GitHub Link */}
        <div className="flex flex-col md:flex-row items-center justify-center relative mb-12">
          <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400 md:flex-grow leading-normal">
            Wuthering Waves Material Planner
          </h1>
          <div className="mt-4 md:mt-0 md:absolute md:top-1/2 md:-translate-y-9/20 md:right-0 flex items-center text-gray-300">
            <span className="text-sm mr-2 whitespace-nowrap">Feedback or issues?</span>
            <a
              href="https://github.com/blin03/matcalc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400"
            >
              <img src={GITHUB_ICON_PATH} alt="GitHub" className="w-10 h-10" />
            </a>
          </div>
        </div>

        {/* Top Bar for Character and Weapon Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
          {/* Character Dropdown */}
          <Dropdown
            label="Select Character"
            options={characters}
            selectedValue={selectedCharacterId}
            onSelect={setSelectedCharacterId}
            placeholder="-- Select a Character --"
          />

          {/* Weapon Dropdown */}
          <div className="relative">
            <Dropdown
              label="Select Weapon"
              options={filteredWeapons}
              selectedValue={selectedWeaponId}
              onSelect={setSelectedWeaponId}
              placeholder="-- Select a Weapon --"
            />
            <div className="absolute top-1.5 right-2 flex items-center"> {/* absolute positioning because idk how else to make this work */}
                <label htmlFor="filter-weapon-type" className="mr-3 text-gray-300 font-medium text-sm">
                  Filter by Character Type
                </label>
                <input
                  type="checkbox"
                  id="filter-weapon-type"
                  checked={filterWeaponsByType}
                  onChange={(e) => setFilterWeaponsByType(e.target.checked)}
                  className="
                    relative w-10 h-5
                    appearance-none bg-gray-600 rounded-full shadow-inner
                    cursor-pointer transition-colors duration-300 ease-in-out
                    hover:ring-2 hover:ring-[#d1d5db] hover:ring-opacity-100
                    before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:w-4 before:h-4 before:bg-white before:rounded-full before:shadow-md before:shadow-lg
                    before:transition-transform before:duration-300 before:ease-in-out
                    checked:bg-[#a78bfa] checked:before:translate-x-5
                "
                />
              </div>
          </div>
        </div>

        {/* Level and Progression Section */}
        {selectedCharacterId || selectedWeaponId ? (
          <div className={`bg-gray-800 p-8 rounded-2xl shadow-2xl mb-4 border ${getContainerBorderClass()}`}>
            <h2 className="text-3xl font-bold mb-6 text-white border-b-2 border-gray-700 pb-4">Progression</h2>
            <div className="flex flex-col gap-8">
              {/* Character and Weapon Level Panel */}
              {(selectedCharacterId || selectedWeaponId) && (
                <CollapsiblePanel title="Levels" defaultOpen={true} panelClassName={`bg-gray-900 border ${getContainerBorderClass()} rounded-xl`}>
                  <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {selectedCharacterId && (
                      <LevelSlider
                        label={selectedCharacter?.name || "Character"}
                        currentLevel={charCurrentLevel}
                        targetLevel={charTargetLevel}
                        allowedValues={allowedLevels}
                        onCurrentChange={setCharCurrentLevel}
                        onTargetChange={setCharTargetLevel}
                      />
                    )}
                    {selectedWeaponId && (
                      <LevelSlider
                        label={selectedWeapon?.name || "Weapon"}
                        currentLevel={weaponCurrentLevel}
                        targetLevel={weaponTargetLevel}
                        allowedValues={allowedLevels}
                        onCurrentChange={setWeaponCurrentLevel}
                        onTargetChange={setWeaponTargetLevel}
                      />
                    )}
                  </div>
                </CollapsiblePanel>
              )}


              {/* Skills, Stat Nodes, and Inherent Skills Panel*/}
              {selectedCharacterId && (
                <CollapsiblePanel title="Skills and Stats" defaultOpen={true} panelClassName={`bg-gray-900 border ${getContainerBorderClass()} rounded-xl`}>
                  <div className="p-5 space-y-6">
                    {/* Stat Nodes & Inherent Skill Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      <LevelCheckbox
                        label={statNodeName1}
                        isL1Checked={statNodeBooleans[0][0]}
                        isL2Checked={statNodeBooleans[0][1]}
                        onL1Change={handleStatNodeChange(0, 1)}
                        onL2Change={handleStatNodeChange(0, 2)}
                      />
                      <LevelCheckbox
                        label={statNodeName2}
                        isL1Checked={statNodeBooleans[1][0]}
                        isL2Checked={statNodeBooleans[1][1]}
                        onL1Change={handleStatNodeChange(1, 1)}
                        onL2Change={handleStatNodeChange(1, 2)}
                      />
                      <LevelCheckbox
                        label="Inherent Skills"
                        isL1Checked={inherentSkillBooleans[0]}
                        isL2Checked={inherentSkillBooleans[1]}
                        onL1Change={handleInherentSkillChange(1)}
                        onL2Change={handleInherentSkillChange(2)}
                      />
                      <LevelCheckbox
                        label={statNodeName2}
                        isL1Checked={statNodeBooleans[2][0]}
                        isL2Checked={statNodeBooleans[2][1]}
                        onL1Change={handleStatNodeChange(2, 1)}
                        onL2Change={handleStatNodeChange(2, 2)}
                      />
                      <LevelCheckbox
                        label={statNodeName1}
                        isL1Checked={statNodeBooleans[3][0]}
                        isL2Checked={statNodeBooleans[3][1]}
                        onL1Change={handleStatNodeChange(3, 1)}
                        onL2Change={handleStatNodeChange(3, 2)}
                      />
                    </div>
                    {/* Skills Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {skills.map((_, index) => (
                        <LevelSlider
                          key={`skill-input-${index}`}
                          label={skillLabels[index]}
                          currentLevel={skills[index]}
                          targetLevel={targetSkills[index]}
                          maxLevel={10}
                          minLevel={1}
                          onCurrentChange={handleSkillChange(index, setSkills)}
                          onTargetChange={handleSkillChange(index, setTargetSkills)}
                        />
                      ))}
                    </div>
                  </div>
                </CollapsiblePanel>
              )}
            </div>
          </div>
        ) : null}

        {/* Results Section */}
        <div className={`bg-gray-800 p-8 rounded-2xl shadow-2xl border ${getContainerBorderClass()}`}>
          <h2 className="text-3xl font-bold mb-6 text-white border-b-2 border-gray-700 pb-4">Materials</h2>
          {selectedCharacterId || selectedWeaponId ? (
            <>
              {/* Materials Needed Section */}
              {allMaterials.length > 0 && (
                <CollapsiblePanel
                  title="Materials Needed"
                  defaultOpen={true}
                  panelClassName={`bg-gray-900 border ${getContainerBorderClass()} rounded-xl mb-8`}
                >
                  <div className="p-5">
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {sortedMaterials.map((mat, index) => {
                        const iconSrc = mat.material.icon || '❓';
                        const rarityGlowClass = getRarityGlowClass(mat.material.rarity);
                        const currentInventory = materialInventory[mat.material.name] || 0;

                        return (
                          <li key={index} className={`flex flex-col items-center justify-center p-3 rounded-xl transition-transform duration-200 transform hover:scale-105 border ${getContainerBorderClass()} hover:border-purple-500`}>
                            <Icon src={iconSrc} alt={mat.material.name} className={`w-16 h-16 mb-2 ${rarityGlowClass}`} />
                            <div className="text-center">
                              <div className="w-full text-sm text-gray-300 font-medium truncate mb-1">
                                {mat.material.name}
                              </div>
                              <MaterialInputField
                                currentInventory={currentInventory}
                                totalRequired={mat.quantity}
                                onInventoryChange={handleInventoryChange(mat.material.name)}
                                formatNumber={formatNumber}
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={clearAllInventory}
                        className="text-sm bg-gray-700 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </CollapsiblePanel>
              )}

              {/* To Be Farmed Section */}
              {remainingNeededMaterials.length > 0 ? (
                <CollapsiblePanel title="To Be Farmed" defaultOpen={true} panelClassName={`bg-gray-900 border ${getContainerBorderClass()} rounded-xl`}>
                    {/* Total waveplate requirement display */}
                    {totalStamina > 0 && (
                      <div className="flex flex-col items-center justify-center text-xl font-bold text-cyan-300 py-3 border-b border-gray-700 bg-gray-800 rounded-t-xl">
                        <div className="flex items-center">
                          <Icon src={WAVEPLATE_ICON_PATH} alt="Waveplates" className="w-6 h-6 mr-2" />
                          <span className="mr-2">Total Waveplate Cost: {formatWaveplateNumber(totalStamina)}</span>
                          <span className="text-xl font-bold text-gray-400">({Math.ceil(totalStamina / 240)} Days)</span>
                        </div>
                        <p className="text-sm font-normal text-gray-400 mt-1">Estimations based on drop rate averages at UL70 and above.</p>
                      </div>
                    )}
                  <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Column 1 */}
                    <div>
                      {renderMaterialColumn(column1Remaining, 'remaining-col1')}
                    </div>

                    {/* Column 2 */}
                    <div>
                      {renderMaterialColumn(column2Remaining, 'remaining-col2')}
                    </div>
                  </div>
                </CollapsiblePanel>
              ) : (
                <p className="text-gray-400 text-center text-lg py-4">No materials needed! You have all the materials required.</p>
              )}
            </>
          ) : (
            <p className="text-gray-400 text-center text-lg py-12">Please select a character or weapon to begin your material calculation.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;