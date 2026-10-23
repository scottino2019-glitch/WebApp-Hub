// Dynamic Auto Scanner for HTML apps and Categories in /public/apps/
// Color-rich, eye-restful palette: No pitch black, no pure white, no beige, no dead gray

export interface DiscoveredApp {
  id: string;
  title: string;
  caption: string;
  category: string;
  path: string;
  tags: string[];
}

export interface CategoryTheme {
  id: string;
  name: string;
  accent: string;
  accentText: string;
  cardBg: string;
  cardBorder: string;
  badgeBg: string;
  badgeText: string;
  btnBg: string;
  sidebarActiveBg: string;
}

// Known category customizations: 100% distinct colors with crisp white cards for effortless reading
export const PREDEFINED_CATEGORIES: Record<string, Partial<CategoryTheme>> = {
  'editor-testi': {
    id: 'editor-testi',
    name: 'Editor e Testi',
    accent: '#2563eb', // Royal Blue
    accentText: '#1d4ed8',
    cardBg: 'bg-white',
    cardBorder: 'border-2 border-[#2563eb]',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
    btnBg: 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white',
    sidebarActiveBg: 'bg-blue-100/80 text-blue-900 border-l-4 border-l-[#2563eb]',
  },
  'html': {
    id: 'html',
    name: 'HTML',
    accent: '#ea580c', // Flame Orange (unmistakable from Blue, Green, Violet, Teal)
    accentText: '#c2410c',
    cardBg: 'bg-white',
    cardBorder: 'border-2 border-[#ea580c]',
    badgeBg: 'bg-orange-50',
    badgeText: 'text-orange-800',
    btnBg: 'bg-[#ea580c] hover:bg-[#c2410c] text-white',
    sidebarActiveBg: 'bg-orange-100/80 text-orange-900 border-l-4 border-l-[#ea580c]',
  },
  'lingue': {
    id: 'lingue',
    name: 'Lingue',
    accent: '#059669', // Emerald Green
    accentText: '#047857',
    cardBg: 'bg-white',
    cardBorder: 'border-2 border-[#059669]',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-800',
    btnBg: 'bg-[#059669] hover:bg-[#047857] text-white',
    sidebarActiveBg: 'bg-emerald-100/80 text-emerald-900 border-l-4 border-l-[#059669]',
  },
  'programmare': {
    id: 'programmare',
    name: 'App per Programmare',
    accent: '#7c3aed', // Purple / Violet
    accentText: '#6d28d9',
    cardBg: 'bg-white',
    cardBorder: 'border-2 border-[#7c3aed]',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-800',
    btnBg: 'bg-[#7c3aed] hover:bg-[#6d28d9] text-white',
    sidebarActiveBg: 'bg-purple-100/80 text-purple-900 border-l-4 border-l-[#7c3aed]',
  },
  'esempi-codice': {
    id: 'esempi-codice',
    name: 'Raccolta Esempi Codici',
    accent: '#0891b2', // Crisp Cyan / Teal - completely different from Orange HTML & Blue Editor
    accentText: '#0e7490',
    cardBg: 'bg-white',
    cardBorder: 'border-2 border-[#0891b2]',
    badgeBg: 'bg-cyan-50',
    badgeText: 'text-cyan-800',
    btnBg: 'bg-[#0891b2] hover:bg-[#0e7490] text-white',
    sidebarActiveBg: 'bg-cyan-100/80 text-cyan-900 border-l-4 border-l-[#0891b2]',
  }
};

// Rich palette for automatically discovered new categories (crisp white cards, distinctive accents)
const DYNAMIC_PALETTE = [
  { accent: '#e11d48', accentText: '#be123c', bg: 'bg-white', border: 'border-2 border-[#e11d48]', badge: 'bg-rose-50', text: 'text-rose-700', btn: 'bg-[#e11d48] hover:bg-[#be123c] text-white', sidebar: 'bg-rose-100/80 text-rose-900 border-l-4 border-l-[#e11d48]' },
  { accent: '#0d9488', accentText: '#0f766e', bg: 'bg-white', border: 'border-2 border-[#0d9488]', badge: 'bg-teal-50', text: 'text-teal-700', btn: 'bg-[#0d9488] hover:bg-[#0f766e] text-white', sidebar: 'bg-teal-100/80 text-teal-900 border-l-4 border-l-[#0d9488]' },
  { accent: '#4f46e5', accentText: '#4338ca', bg: 'bg-white', border: 'border-2 border-[#4f46e5]', badge: 'bg-indigo-50', text: 'text-indigo-700', btn: 'bg-[#4f46e5] hover:bg-[#4338ca] text-white', sidebar: 'bg-indigo-100/80 text-indigo-900 border-l-4 border-l-[#4f46e5]' },
  { accent: '#db2777', accentText: '#be185d', bg: 'bg-white', border: 'border-2 border-[#db2777]', badge: 'bg-pink-50', text: 'text-pink-700', btn: 'bg-[#db2777] hover:bg-[#be185d] text-white', sidebar: 'bg-pink-100/80 text-pink-900 border-l-4 border-l-[#db2777]' },
  { accent: '#ca8a04', accentText: '#a16207', bg: 'bg-white', border: 'border-2 border-[#ca8a04]', badge: 'bg-amber-50', text: 'text-amber-700', btn: 'bg-[#ca8a04] hover:bg-[#a16207] text-white', sidebar: 'bg-amber-100/80 text-amber-900 border-l-4 border-l-[#ca8a04]' },
];

export function formatCategoryName(folderSlug: string): string {
  if (PREDEFINED_CATEGORIES[folderSlug]?.name) {
    return PREDEFINED_CATEGORIES[folderSlug].name!;
  }
  return folderSlug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
    .trim();
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function buildCategoryTheme(categoryId: string): CategoryTheme {
  const predefined = PREDEFINED_CATEGORIES[categoryId];
  if (predefined && predefined.name && predefined.accent && predefined.cardBg) {
    return predefined as CategoryTheme;
  }

  const name = formatCategoryName(categoryId);
  const colorIndex = hashString(categoryId) % DYNAMIC_PALETTE.length;
  const item = DYNAMIC_PALETTE[colorIndex];

  return {
    id: categoryId,
    name,
    accent: item.accent,
    accentText: item.accentText,
    cardBg: item.bg,
    cardBorder: item.border,
    badgeBg: item.badge,
    badgeText: item.text,
    btnBg: item.btn,
    sidebarActiveBg: item.sidebar,
  };
}

function formatTitleFromFilename(filename: string): string {
  const base = filename.replace(/\.html$/i, '');
  return base
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
    .trim();
}

function extractMeta(htmlContent: string, filename: string): { title: string; caption: string } {
  const titleMatch = htmlContent.match(/<title[^>]*>([^<]+)<\/title>/i);
  let title = titleMatch ? titleMatch[1].trim() : '';

  const descMatch = htmlContent.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  let caption = descMatch ? descMatch[1].trim() : '';

  if (!title) {
    title = formatTitleFromFilename(filename);
  }
  if (!caption) {
    const h1Match = htmlContent.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    const pMatch = htmlContent.match(/<p[^>]*>([^<]+)<\/p>/i);
    if (h1Match && h1Match[1].trim() !== title) {
      caption = h1Match[1].trim();
    } else if (pMatch) {
      caption = pMatch[1].trim().slice(0, 120);
    } else {
      caption = `Strumento HTML autonomo (${title})`;
    }
  }

  return { title, caption };
}

export function scanAppsAutomatically(): { apps: DiscoveredApp[]; categories: Record<string, CategoryTheme> } {
  const modules = import.meta.glob('/public/apps/**/*.html', { query: '?raw', eager: true }) as Record<string, string | { default: string }>;

  const apps: DiscoveredApp[] = [];
  const foundCategories = new Set<string>();

  for (const [rawPath, moduleContent] of Object.entries(modules)) {
    const content = typeof moduleContent === 'string' ? moduleContent : (moduleContent.default || '');
    const webPath = rawPath.replace(/^\/public/, '');
    
    const segments = rawPath.split('/').filter(Boolean);
    const filename = segments[segments.length - 1] || 'app.html';
    
    const category = segments.length >= 4 ? segments[segments.length - 2].toLowerCase() : 'generale';
    foundCategories.add(category);

    const id = filename.replace(/\.html$/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const { title, caption } = extractMeta(content, filename);

    const catName = formatCategoryName(category);
    const rawTags = [
      catName,
      category !== 'html' ? 'HTML' : 'Web App',
      filename.includes('tool') ? 'Tool' : 'Interattivo'
    ];
    const tags = Array.from(new Set(rawTags.filter(Boolean)));

    apps.push({
      id,
      title,
      caption,
      category,
      path: webPath,
      tags
    });
  }

  // Sort apps alphabetically
  apps.sort((a, b) => a.title.localeCompare(b.title));

  // Build categories map containing both predefined categories and any newly created folder!
  const categories: Record<string, CategoryTheme> = {};
  
  for (const key of Object.keys(PREDEFINED_CATEGORIES)) {
    categories[key] = buildCategoryTheme(key);
  }
  for (const catId of foundCategories) {
    if (!categories[catId]) {
      categories[catId] = buildCategoryTheme(catId);
    }
  }

  return { apps, categories };
}
