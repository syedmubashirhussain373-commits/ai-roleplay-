/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CharacterAttributes {
  health: number;
  maxHealth: number;
  strain: number; // Aetheric Strain
  maxStrain: number;
  standing: number; // Social Standing
}

export interface LoreEntry {
  id: string;
  title: string;
  content: string;
  discovered: boolean;
}

export interface CharacterSheet {
  name: string;
  age: number;
  lineage: 'Noble' | 'Commoner' | 'Outcast';
  spark: string;
  location: string;
  attributes: CharacterAttributes;
}

export interface GameMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const OMNI_CHRONICLER_SYSTEM_PROMPT = `
You are the Omni-Chronicler for Aethelgard, a dark-fantasy world.

THE GREAT HOUSES:
- House Valerion: Masters of Kinetic Force and Metallurgy.
- House Malphas: Specialists in Demon-Grafting and Parasitology.
- House Thalassic: Experts in Biological Engineering and Fluid Dynamics.

DEMONS:
- Biological parasites that feed on cellular ATP. 
- They grant power but consume the host's humanity.

MAGIC PHYSICS (FLUX):
- Magic is "Flux." 
- Using it causes ionization, thermal shifts, and atomic strain on the physical body.
- Technical language is mandatory (e.g., "thermal expansion," "molecular destabilization").

TONE:
- Gritty, scientific, and high-stakes.

RULES:
1. NEVER speak for the user.
2. Describe the world's reaction to their molecular powers.
3. End every turn with a "Hook" — a development requiring a choice.
`;

export const INITIAL_LORE: LoreEntry[] = [
  {
    id: 'flux_01',
    title: 'The Nature of Flux',
    content: 'Flux is a gaseous subatomic particle that interacts with noble metals to produce kinetic energy.',
    discovered: true
  },
  {
    id: 'house_valerion',
    title: 'House Valerion',
    content: 'Known for their obsidian-forged armor and a philosophy of strength through industry.',
    discovered: false
  },
  {
    id: 'demon_parasites',
    title: 'The ATP Parasites',
    content: 'Demons attach to the host at a cellular level, hijacking mitochondria to convert biological energy into Flux.',
    discovered: false
  }
];
