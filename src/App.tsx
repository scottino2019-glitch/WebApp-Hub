import React, { useState, useMemo, useRef } from 'react';
import { 
  CATEGORIES, 
  APPS_LIST, 
  AppItem, 
  CategoryTheme,
  buildCategoryTheme 
} from './data/appsCatalog';
import { 
  FileText, 
  Code2, 
  Languages, 
  Terminal, 
  BookOpen, 
  Search, 
  X, 
  ArrowLeft, 
  RotateCw, 
  ExternalLink, 
  Maximize2, 
  Minimize2,
  Sparkles,
  Layers,
  ArrowUpRight,
  Play,
  LayoutGrid,
  Menu
} from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeApp, setActiveApp] = useState<AppItem | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const getCategoryIcon = (catId: string, className = "w-5 h-5") => {
    switch (catId) {
      case 'editor-testi': return <FileText className={className} />;
      case 'html': return <Code2 className={className} />;
      case 'lingue': return <Languages className={className} />;
      case 'programmare': return <Terminal className={className} />;
      case 'esempi-codice': return <BookOpen className={className} />;
      default: return <Layers className={className} />;
    }
  };

  const getCategoryTheme = (catId: string): CategoryTheme => {
    return CATEGORIES[catId] || buildCategoryTheme(catId);
  };

  // Filtered apps based on search & category selection
  const filteredApps = useMemo(() => {
    return APPS_LIST.filter(app => {
      if (selectedCategory !== 'all' && app.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = app.title.toLowerCase().includes(q);
        const matchesCaption = app.caption.toLowerCase().includes(q);
        const matchesCat = (CATEGORIES[app.category]?.name || '').toLowerCase().includes(q);
        const matchesTags = app.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCaption && !matchesCat && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const activeCategoryTheme: CategoryTheme | null = selectedCategory !== 'all' ? getCategoryTheme(selectedCategory) : null;

  const handleLaunchApp = (app: AppItem) => {
    setActiveApp(app);
    setIsMobileSidebarOpen(false);
  };

  const handleReloadIframe = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const currentCategoryApps = useMemo(() => {
    if (!activeApp) return [];
    return APPS_LIST.filter(a => a.category === activeApp.category);
  }, [activeApp]);

  return (
    <div className="h-screen w-screen overflow-hidden studio-grid-bg text-[#0f172a] flex font-sans antialiased">
      {/* ==============================================================
          LEFT SIDEBAR: Distinct Deep Midnight-Slate Panel (Zero Tono su Tono)
      ============================================================== */}
      {!isFullscreen && (
        <aside className={`
          fixed md:relative z-40 inset-y-0 left-0 w-80 bg-[#16202e] border-r border-slate-700/80 flex flex-col shrink-0 transition-transform duration-200 shadow-2xl
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          {/* Brand header with comfortable readable typography */}
          <div className="p-5 border-b border-slate-700/80 bg-[#111925] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h1 className="font-extrabold text-base text-white tracking-tight leading-snug">WebApps Studio</h1>
                <span className="text-xs text-slate-400 font-semibold">{APPS_LIST.length} applicazioni pronte</span>
              </div>
            </div>

            {/* Mobile close */}
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search box with dark console contrast */}
          <div className="p-3.5 border-b border-slate-700/80 bg-[#141d2a]">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cerca tra le applicazioni..."
                className="w-full pl-10 pr-8 py-2.5 bg-[#0b121b] border border-slate-700/90 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-400 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Tree with High Contrast & Clear Hierarchy */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
            {/* "Tutte le App" button */}
            <button
              onClick={() => { setSelectedCategory('all'); setActiveApp(null); setIsMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === 'all' && !activeApp
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-200 hover:bg-[#1f2d40] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutGrid className="w-5 h-5" />
                <span className="text-[14px]">Panoramica Completa</span>
              </div>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md border ${
                selectedCategory === 'all' && !activeApp
                  ? 'bg-indigo-700/80 text-white border-indigo-400'
                  : 'bg-[#0e1622] text-slate-300 border-slate-700'
              }`}>
                {APPS_LIST.length}
              </span>
            </button>

            {/* Categorized groups */}
            <div className="space-y-3 pt-1">
              {Object.values(CATEGORIES).map(cat => {
                const catApps = APPS_LIST.filter(a => a.category === cat.id);
                const isCatActive = selectedCategory === cat.id;
                const theme = getCategoryTheme(cat.id);

                return (
                  <div key={cat.id} className="space-y-1">
                    {/* Category Header Button (Comfortable 14px text) */}
                    <button
                      onClick={() => { setSelectedCategory(cat.id); setActiveApp(null); setIsMobileSidebarOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer group ${
                        isCatActive && !activeApp 
                          ? 'bg-[#1f2d40] text-white shadow-sm border-l-4' 
                          : 'text-slate-200 hover:bg-[#1f2d40] hover:text-white'
                      }`}
                      style={{
                        borderLeftColor: isCatActive && !activeApp ? theme.accent : undefined
                      }}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span 
                          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                          style={{ backgroundColor: theme.accent }}
                        ></span>
                        <span className="truncate">{theme.name}</span>
                      </div>
                      <span 
                        className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[#0e1622] border border-slate-700"
                        style={{ color: theme.accent }}
                      >
                        {catApps.length}
                      </span>
                    </button>

                    {/* App Sub-Items (Clean 13px-14px font size, comfortable padding) */}
                    <div className="pl-3.5 space-y-1 border-l-2 border-slate-700/80 ml-4">
                      {catApps.map(app => {
                        const isAppRunning = activeApp?.id === app.id;
                        return (
                          <button
                            key={app.id}
                            onClick={() => handleLaunchApp(app)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between group cursor-pointer ${
                              isAppRunning 
                                ? 'bg-[#25354b] font-bold text-white shadow-xs border border-slate-600' 
                                : 'text-slate-300 hover:text-white hover:bg-[#1f2d40]'
                            }`}
                            style={{
                              color: isAppRunning ? theme.accent : undefined
                            }}
                          >
                            <span className="truncate">{app.title}</span>
                            <Play className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ${isAppRunning ? 'opacity-100 text-indigo-400' : ''}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      )}

      {/* Mobile backdrop */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)} 
          className="fixed inset-0 z-30 bg-black/60 md:hidden backdrop-blur-xs"
        />
      )}

      {/* ==============================================================
          MAIN CENTER STAGE: User Grid Pattern Canvas & Clean Crisp Cards
      ============================================================== */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-transparent">
        {/* If an App is Running -> Full Stage Runner */}
        {activeApp ? (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Workbench Top Bar with Crisp White Separation */}
            <div className="h-14 bg-white/95 backdrop-blur-md border-b border-slate-300 px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0 shadow-xs">
              <div className="flex items-center gap-3.5 min-w-0">
                <button
                  onClick={() => setActiveApp(null)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-bold text-[#0f172a] bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer shadow-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Panoramica</span>
                </button>

                <div className="h-5 w-px bg-slate-300"></div>

                <div className="flex items-center gap-2.5 min-w-0">
                  <span 
                    className="w-3.5 h-3.5 rounded-full shrink-0"
                    style={{ backgroundColor: getCategoryTheme(activeApp.category).accent }}
                  ></span>
                  <span className="text-sm font-extrabold text-[#0f172a] truncate">
                    {activeApp.title}
                  </span>
                </div>
              </div>

              {/* Fast Category App Switcher Pills in Top Runner Bar */}
              <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-300">
                {currentCategoryApps.map(app => {
                  const isCurrent = app.id === activeApp.id;
                  const catTheme = getCategoryTheme(app.category);
                  return (
                    <button
                      key={app.id}
                      onClick={() => handleLaunchApp(app)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        isCurrent 
                          ? 'bg-white text-[#0f172a] shadow-xs border border-slate-300' 
                          : 'text-[#475569] hover:text-[#0f172a]'
                      }`}
                      style={{
                        color: isCurrent ? catTheme.accentText : undefined
                      }}
                    >
                      {app.title}
                    </button>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleReloadIframe}
                  className="p-2 text-[#334155] hover:text-[#0f172a] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-300"
                  title="Ricarica applicazione"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                <a
                  href={activeApp.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[#334155] hover:text-[#0f172a] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-300"
                  title="Apri in nuova scheda separata"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 text-[#334155] hover:text-[#0f172a] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-300"
                  title={isFullscreen ? 'Riduci' : 'A Tutto Schermo'}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setActiveApp(null)}
                  className="p-2 text-rose-700 hover:text-rose-900 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer ml-1"
                  title="Chiudi app"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Iframe Stage */}
            <div className="flex-1 p-2 relative">
              <iframe
                ref={iframeRef}
                src={activeApp.path}
                title={activeApp.title}
                className="w-full h-full rounded-xl border border-slate-300 bg-white shadow-md"
                sandbox="allow-scripts allow-forms allow-same-origin allow-modals allow-downloads"
              />
            </div>
          </div>
        ) : (
          /* When NO app is running -> Distinctly Color-Coded Showcase Grid */
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Top Bar for Stage (Crisp White Bar with Border) */}
            <div className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-300 px-5 sm:px-8 flex items-center justify-between gap-4 shrink-0 shadow-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="md:hidden p-2 text-[#334155] hover:text-[#0f172a] bg-slate-100 rounded-xl cursor-pointer border border-slate-300"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2.5">
                  {activeCategoryTheme ? (
                    <>
                      <span 
                        className="w-4 h-4 rounded-full shadow-xs"
                        style={{ backgroundColor: activeCategoryTheme.accent }}
                      ></span>
                      <h2 className="text-lg font-extrabold text-[#0f172a]">
                        {activeCategoryTheme.name}
                      </h2>
                    </>
                  ) : (
                    <>
                      <LayoutGrid className="w-5 h-5 text-indigo-700" />
                      <h2 className="text-lg font-extrabold text-[#0f172a]">
                        Tutte le Categorie ({APPS_LIST.length} applicazioni)
                      </h2>
                    </>
                  )}
                </div>
              </div>

              {/* Category Quick Filter Pills on top */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                    selectedCategory === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-[#334155] hover:text-[#0f172a] border border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Tutte
                </button>

                {Object.values(CATEGORIES).map(cat => {
                  const isCur = selectedCategory === cat.id;
                  const theme = getCategoryTheme(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border shadow-xs"
                      style={{
                        backgroundColor: isCur ? theme.accent : '#f1f5f9',
                        color: isCur ? '#ffffff' : theme.accentText,
                        borderColor: isCur ? theme.accent : '#cbd5e1',
                      }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: isCur ? '#ffffff' : theme.accent }}></span>
                      <span>{theme.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Stage Content with Distinct Colorful Cards on User Grid Canvas */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-10">
              {filteredApps.length === 0 ? (
                <div className="max-w-md mx-auto text-center py-16 px-6 bg-white/90 rounded-2xl border border-slate-300 space-y-3 shadow-md">
                  <p className="font-bold text-[#0f172a] text-base">Nessuna applicazione trovata</p>
                  <p className="text-sm text-[#475569]">Verifica i termini digitati o seleziona un&apos;altra categoria.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold cursor-pointer shadow-sm"
                  >
                    Azzera filtri
                  </button>
                </div>
              ) : selectedCategory === 'all' && !searchQuery.trim() ? (
                /* Grouped by Distinct Colors */
                <div className="space-y-12 max-w-6xl mx-auto">
                  {Object.values(CATEGORIES).map(cat => {
                    const catApps = APPS_LIST.filter(a => a.category === cat.id);
                    if (catApps.length === 0) return null;
                    const theme = getCategoryTheme(cat.id);

                    return (
                      <section key={cat.id} className="space-y-4">
                        {/* Section Header with colored badge */}
                        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-300">
                          <div className="flex items-center gap-3.5">
                            <div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm"
                              style={{ backgroundColor: theme.accent }}
                            >
                              {getCategoryIcon(cat.id, "w-5 h-5")}
                            </div>
                            <div>
                              <h3 className="text-xl font-extrabold text-[#0f172a] flex items-center gap-2.5">
                                <span>{theme.name}</span>
                                <span 
                                  className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-md border"
                                  style={{ 
                                    backgroundColor: '#ffffff', 
                                    color: theme.accentText,
                                    borderColor: '#cbd5e1'
                                  }}
                                >
                                  {catApps.length} app
                                </span>
                              </h3>
                            </div>
                          </div>

                          <button
                            onClick={() => setSelectedCategory(cat.id)}
                            className="text-sm font-bold hover:underline cursor-pointer flex items-center gap-1"
                            style={{ color: theme.accentText }}
                          >
                            <span>Filtra {theme.name}</span>
                            <span>→</span>
                          </button>
                        </div>

                        {/* Highly Colorful Cards Grid (Distinct colors per category) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          {catApps.map(app => (
                            <ColorfulAppCard
                              key={app.id}
                              app={app}
                              theme={theme}
                              onLaunch={() => handleLaunchApp(app)}
                              icon={getCategoryIcon(app.category, "w-6 h-6")}
                            />
                          ))}
                        </div>
                      </section>
                    );
                  })}
                </div>
              ) : (
                /* Filtered Cards Grid */
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredApps.map(app => {
                    const cat = getCategoryTheme(app.category);
                    return (
                      <ColorfulAppCard
                        key={app.id}
                        app={app}
                        theme={cat}
                        onLaunch={() => handleLaunchApp(app)}
                        icon={getCategoryIcon(app.category, "w-6 h-6")}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ==============================================================
// VISIBLY COLORFUL CARD COMPONENT: Distinct Colors, Restful, Legible
// ==============================================================
interface ColorfulAppCardProps {
  app: AppItem;
  theme: CategoryTheme;
  onLaunch: () => void;
  icon: React.ReactNode;
}

function ColorfulAppCard({ app, theme, onLaunch, icon }: ColorfulAppCardProps) {
  return (
    <div 
      className={`group relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 shadow-md ${theme.cardBg} ${theme.cardBorder} hover:-translate-y-1 hover:shadow-xl`}
    >
      <div>
        {/* Top Header on Card: Big Icon with Distinct Category Accent */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center font-bold shadow-xs bg-slate-50"
            style={{
              color: theme.accent,
              border: `2px solid ${theme.accent}`,
            }}
          >
            {icon}
          </div>

          <div className="flex items-center gap-2">
            <span 
              className={`text-xs font-bold px-3 py-1 rounded-full shadow-xs ${theme.badgeBg} ${theme.badgeText} border`}
              style={{ borderColor: `${theme.accent}40` }}
            >
              {theme.name}
            </span>

            <a
              href={app.path}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-[#64748b] hover:text-[#0f172a] rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="Apri in nuova scheda separata"
            >
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Card Title (Clear 18px text, dark slate for high legibility) */}
        <h4 className="font-extrabold text-[#0f172a] text-lg mb-2 leading-snug">
          {app.title}
        </h4>

        {/* Caption (Readable 14px text, restful contrast) */}
        <p className="text-sm text-[#334155] leading-relaxed line-clamp-2 mb-5 font-normal">
          {app.caption}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {app.tags.map((t, idx) => (
            <span 
              key={`${app.id}-${t}-${idx}`}
              className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 border"
              style={{
                borderColor: `${theme.accent}40`,
                color: theme.accentText,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button: Solid Category Color Button with comfortable 14px text */}
      <button
        onClick={onLaunch}
        className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm active:scale-98 ${theme.btnBg}`}
      >
        <Play className="w-4 h-4 fill-current" />
        <span>Avvia Strumento</span>
      </button>
    </div>
  );
}
