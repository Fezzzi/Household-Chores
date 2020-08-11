import { loadSettings } from 'clientSrc/effects/settingsEffects';

export const loadContent = async (category, tab) => loadSettings(category, tab);
