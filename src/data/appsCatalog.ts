import { scanAppsAutomatically, DiscoveredApp, CategoryTheme, buildCategoryTheme } from './autoScanner';

export type AppItem = DiscoveredApp;
export type { CategoryTheme };

// Automatically scans all .html files inside /public/apps/
// AND automatically discovers any new folder created as a new category!
const { apps, categories } = scanAppsAutomatically();

export const APPS_LIST: AppItem[] = apps;
export const CATEGORIES: Record<string, CategoryTheme> = categories;
export { buildCategoryTheme };
