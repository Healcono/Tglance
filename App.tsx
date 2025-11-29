import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home, Layers, Lightbulb, Map, Book, Gamepad2, 
  CheckSquare, MessageSquare, Link as LinkIcon, Info, 
  Menu, X, Search, Moon, Sun, ChevronDown, ExternalLink, Mail, Phone, Send
} from 'lucide-react';
import { THEORY_CATEGORIES, PLANNING_MODELS, QUIZ_DATA, GAME_QUESTIONS, SCENARIOS, FLASHCARDS, GLOSSARY } from './constants.ts';
import { SectionId } from './types.ts';
import Flashcards from './components/Flashcards.tsx';
import Quiz from './components/Quiz.tsx';
import Game from './components/Game.tsx';
import ScenarioChallenge from './components/Scenario.tsx';

// --- Reusable Components ---

const Card: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <div className={`bg-white dark:bg-slate-800 border-none shadow-sm rounded-2xl p-6 mb-6 ${className}`}>
    {title && <h3 className="text-xl font-bold mb-4 text-teal-700 dark:text-teal-400">{title}</h3>}
    {children}
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl font-bold mb-8 text-slate-800 dark:text-slate-100 flex items-center gap-2 tracking-tight">
    {children}
  </h2>
);

const NavLink: React.FC<{ 
  id: SectionId; 
  active: boolean; 
  icon: React.ReactNode; 
  label: string; 
  onClick: (id: SectionId) => void 
}> = ({ id, active, icon, label, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      active 
        ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 font-semibold shadow-sm' 
        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-teal-600 dark:hover:text-teal-400'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement<any>, { size: 20, strokeWidth: active ? 2.5 : 2 })}
    <span className="text-sm">{label}</span>
  </button>
);

// --- Main Component ---

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTheories, setExpandedTheories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheory = (key: string) => {
    setExpandedTheories(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredGlossary = useMemo(() => {
    if (!searchTerm) return GLOSSARY;
    return GLOSSARY.filter(item => 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const HighlightText: React.FC<{ text: string }> = ({ text }) => {
    if (!searchTerm) return <>{text}</>;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === searchTerm.toLowerCase() 
            ? <span key={i} className="bg-yellow-200 dark:bg-yellow-800/50 dark:text-yellow-100 rounded px-0.5">{part}</span> 
            : part
        )}
      </>
    );
  };

  const NavItems = () => (
    <nav className="space-y-1">
      <NavLink id="home" active={activeSection === 'home'} icon={<Home />} label="Home" onClick={id => { setActiveSection(id); setIsSidebarOpen(false); }} />
      <NavLink id="foundations" active={activeSection === 'foundations'} icon={<Layers />} label="Foundations" onClick={id => { setActiveSection(id); setIsSidebarOpen(false); }} />
      <NavLink id="keyTheories" active={activeSection === 'keyTheories'} icon={<Lightbulb />} label="Key Theories" onClick={id => { setActiveSection(id); setIsSidebarOpen(false); }} />
      <NavLink id="planningModels" active={activeSection === 'planningModels'} icon={<Map />} label="Planning Models" onClick={id => { setActiveSection(id); setIsSidebarOpen(false); }} />
      <NavLink id="quiz" active={activeSection === 'quiz'} icon={<CheckSquare />} label="Quiz" onClick={id => { setActiveSection(id); setIsSidebarOpen(false); }} />
      <NavLink id="game" active={activeSection === 'game'} icon={<Gamepad2 />} label="Theory Challenge" onClick={id => { setActiveSection(id); setIsSidebarOpen(false); }} />
      <NavLink id="scenarioChallenge" active={activeSection === 'scenarioChallenge'} icon={<CheckSquare />} label="Scenario Challenge" onClick={id => { setActiveSection(id); setIsSidebarOpen(false); }} />
      <NavLink id="flashcards" active={activeSection === 'flashcards'} icon={<Book />} label="Flashcards" onClick={id => { setActiveSection(id); setIsSidebarOpen(false); }} />
      <NavLink id="glossary" active={activeSection === 'glossary'} icon={<Book />} label="Glossary" onClick={id => { setActiveSection(id); setIsSidebarOpen(false); }} />
      <NavLink id="usefulSources" active={activeSection === 'usefulSources'} icon={<LinkIcon />} label="Useful Sources" onClick={id => { setActiveSection(id); setIsSidebarOpen(false); }} />
      <NavLink id="contactUs" active={activeSection === 'contactUs'} icon={<MessageSquare />} label="Contact Us" onClick={id => { setActiveSection(id); setIsSidebarOpen(false); }} />
      <NavLink id="about" active={activeSection === 'about'} icon={<Info />} label="About" onClick={id => { setActiveSection(id); setIsSidebarOpen(false); }} />
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex flex-col font-sans transition-colors duration-200 selection:bg-teal-200 dark:selection:bg-teal-900">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-slate-600 dark:text-slate-300" onClick={() => setIsSidebarOpen(true)}>
              <Menu />
            </button>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold tracking-tighter text-teal-700 dark:text-teal-400">Tglance</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="container mx-auto px-4 py-8 flex gap-8 relative max-w-7xl">
        
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:block w-72 shrink-0">
          <div className="sticky top-28">
            <div className="mb-6 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-sm transition-shadow"
              />
            </div>
            <div className="pr-2">
              <NavItems />
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
            <div className="relative w-4/5 max-w-xs bg-white dark:bg-slate-900 h-full shadow-2xl p-6 flex flex-col border-r border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-bold text-xl text-teal-700 dark:text-teal-400">Tglance</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="text-slate-500"><X /></button>
              </div>
              <div className="mb-6 relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                 <input 
                  type="text" 
                  placeholder="Search content..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm ring-1 ring-slate-200 dark:ring-slate-700"
                />
              </div>
              <div className="overflow-y-auto flex-1 -mx-2 px-2">
                <NavItems />
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 min-w-0 pb-16">
          
          {/* Section: Home */}
          {activeSection === 'home' && (
            <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
              <div className="bg-gradient-to-br from-teal-500 to-teal-700 dark:from-teal-800 dark:to-teal-900 rounded-3xl p-8 sm:p-12 mb-8 text-white shadow-lg shadow-teal-500/10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Welcome to Tglance</h2>
                <p className="text-lg sm:text-xl text-teal-50 mb-8 max-w-2xl leading-relaxed">
                  Your interactive, comprehensive guide to health promotion theories and planning models. Adapted for modern practitioners and students.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setActiveSection('keyTheories')}
                    className="px-6 py-3 bg-white text-teal-700 font-semibold rounded-xl hover:bg-teal-50 transition-colors shadow-sm"
                  >
                    Start Learning
                  </button>
                  <button 
                    onClick={() => setActiveSection('quiz')}
                    className="px-6 py-3 bg-teal-600 dark:bg-teal-700 text-white font-semibold rounded-xl hover:bg-teal-500 transition-colors shadow-sm ring-1 ring-white/20"
                  >
                    Take a Quiz
                  </button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card title="About the Guide" className="h-full">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    Navigate through foundational concepts, explore key theories, understand planning models, test your knowledge with quizzes, games, scenario challenges and flashcards.
                  </p>
                  <p className="text-sm text-slate-500">
                    Based on the National Cancer Institute's "Theory at a Glance."
                  </p>
                </Card>

                <Card title="Quick Search" className="h-full">
                  <p className="mb-4 text-sm text-slate-500">Need more details from the web?</p>
                  <form action="https://www.google.com/search" method="GET" target="_blank" className="flex gap-2">
                      <input type="text" name="q" placeholder="Search Google..." className="flex-grow p-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-teal-500/50 outline-none transition-all" />
                      <button type="submit" className="bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 text-white px-5 rounded-xl transition-colors">
                        <ExternalLink size={18} />
                      </button>
                  </form>
                </Card>
              </div>
            </div>
          )}

          {/* Section: Foundations */}
          {activeSection === 'foundations' && (
            <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
              <SectionTitle>Foundations of Theory</SectionTitle>
              <div className="grid gap-6">
                <Card title="Why is Theory Important?">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                    <HighlightText text="Effective public health and health promotion programs often require behavior change at multiple levels. Theory provides a roadmap for studying problems, developing appropriate interventions, and evaluating their success." />
                  </p>
                </Card>
                <Card title="What is Theory?">
                  <p className="mb-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                    <HighlightText text="A theory presents a systematic way of understanding events or situations. It explains or predicts these events by illustrating relationships between variables." />
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { t: 'Concepts', d: 'The building blocks or primary elements.' },
                      { t: 'Constructs', d: 'Concepts developed for a specific theory.' },
                      { t: 'Variables', d: 'Operational forms of constructs (measured).' },
                      { t: 'Models', d: 'Mixture of ideas taken from multiple theories.' }
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                        <span className="block font-semibold text-teal-700 dark:text-teal-400 mb-1">{item.t}</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">{item.d}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Section: Key Theories */}
          {activeSection === 'keyTheories' && (
            <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
              <SectionTitle>Key Theories & Models</SectionTitle>
              <p className="mb-8 text-slate-500 dark:text-slate-400 text-lg">Essential frameworks categorized by their level of influence.</p>
              
              <div className="space-y-4">
                {Object.entries(THEORY_CATEGORIES).map(([key, category]) => (
                  <div key={key} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => toggleTheory(key)}
                      className="w-full flex justify-between items-center p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                    >
                      <div>
                         <span className="block text-xl font-bold text-slate-800 dark:text-slate-200">{category.title}</span>
                         {!expandedTheories[key] && <span className="text-sm text-slate-500 mt-1 line-clamp-1">{category.description}</span>}
                      </div>
                      <ChevronDown className={`text-slate-400 transition-transform duration-300 ${expandedTheories[key] ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {expandedTheories[key] && (
                      <div className="px-6 pb-6 pt-0 animate-in slide-in-from-top-2">
                        <p className="text-slate-500 dark:text-slate-400 mb-6">{category.description}</p>
                        <div className="grid gap-4">
                          {category.items.map((item, idx) => (
                            <div key={idx} className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                              <h4 className="font-bold text-lg text-teal-700 dark:text-teal-400 mb-2"><HighlightText text={item.title} /></h4>
                              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed"><HighlightText text={item.description} /></p>
                              <div className="flex flex-wrap gap-2">
                                {item.concepts.map((concept, cIdx) => (
                                  <span key={cIdx} className="px-2.5 py-1 bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 text-xs font-medium rounded-lg border border-slate-100 dark:border-slate-700">
                                    <HighlightText text={concept} />
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Planning Models */}
          {activeSection === 'planningModels' && (
            <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
              <SectionTitle>Planning Models</SectionTitle>
              <div className="grid gap-6">
                {PLANNING_MODELS.map((model, idx) => (
                   <Card key={idx} title={model.title} className="hover:shadow-md transition-shadow duration-300">
                      <p className="mb-6 text-slate-600 dark:text-slate-300 leading-relaxed"><HighlightText text={model.description} /></p>
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
                        <strong className="block mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Key Concepts</strong>
                        <div className="flex flex-wrap gap-2">
                          {model.concepts.map((concept, cIdx) => (
                            <span key={cIdx} className="px-3 py-1.5 bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-400 text-sm font-medium rounded-lg shadow-sm">
                              <HighlightText text={concept} />
                            </span>
                          ))}
                        </div>
                      </div>
                   </Card>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Sections */}
          {activeSection === 'quiz' && (
            <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
              <SectionTitle>Test Your Knowledge</SectionTitle>
              <Quiz questions={QUIZ_DATA} />
            </div>
          )}

          {activeSection === 'game' && (
            <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
              <SectionTitle>Theory Challenge</SectionTitle>
              <Game questions={GAME_QUESTIONS} />
            </div>
          )}

          {activeSection === 'scenarioChallenge' && (
            <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
              <SectionTitle>Scenario Challenge</SectionTitle>
              <ScenarioChallenge scenarios={SCENARIOS} />
            </div>
          )}

          {activeSection === 'flashcards' && (
            <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
              <SectionTitle>Flashcards</SectionTitle>
              <div className="bg-slate-100 dark:bg-slate-800/50 rounded-3xl p-8 flex justify-center">
                  <Flashcards cards={FLASHCARDS} />
              </div>
            </div>
          )}

          {/* Section: Glossary */}
          {activeSection === 'glossary' && (
            <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
              <SectionTitle>Glossary</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredGlossary.length > 0 ? (
                  filteredGlossary.map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-700/50">
                      <h4 className="font-bold text-teal-700 dark:text-teal-400 mb-2 text-lg"><HighlightText text={item.term} /></h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed"><HighlightText text={item.definition} /></p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16 text-slate-400">No glossary terms match your search.</div>
                )}
              </div>
            </div>
          )}

          {/* Section: Useful Sources */}
          {activeSection === 'usefulSources' && (
            <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
              <SectionTitle>Useful Sources</SectionTitle>
              <Card>
                <ul className="space-y-4">
                  {[
                    { title: 'Health Promotion: Planning and Strategies', link: 'https://link.springer.com/book/10.1007/978-3-030-56417-9', desc: 'A comprehensive book on health promotion planning.' },
                    { title: 'WHO Global Health Sector Strategies', link: 'https://www.who.int/publications/i/item/9789240038349', desc: 'WHO strategic direction on key global health issues.' },
                    { title: 'The Role of Behavioral Science Theory', link: 'https://www.cceb.med.upenn.edu/sites/default/files/uploads/chbr/Glanz-BishopARPH31_399-418_2010.pdf', desc: 'Glanz & Bishop (2010) article on theory in health communication.' },
                  ].map((source, i) => (
                    <li key={i} className="group">
                      <a href={source.link} target="_blank" rel="noreferrer" className="block p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold mb-1 group-hover:underline">
                           {source.title} <ExternalLink size={14} />
                        </div>
                        <p className="text-sm text-slate-500">{source.desc}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}

          {/* Section: Contact Us */}
          {activeSection === 'contactUs' && (
            <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
              <SectionTitle>Contact Us</SectionTitle>
              <Card>
                <p className="mb-8 text-slate-600 dark:text-slate-300 text-lg">For inquiries related to this application or collaborations:</p>
                <div className="bg-teal-50 dark:bg-teal-900/10 p-8 rounded-2xl border border-teal-100 dark:border-teal-800/30">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-800/50 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider rounded-full">
                      Web App Developer
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-teal-800 dark:text-teal-300 mb-1">Dr. Fatemeh Zarei</h3>
                  <p className="text-teal-600 dark:text-teal-500 mb-8 font-medium">
                    Associate Professor in Health Education and Health Promotion<br/>
                    Tarbiat Modares University
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm text-teal-500"><Mail size={20} /></div>
                      <a href="mailto:f.zarei@modares.ac.ir" className="hover:text-teal-600 font-medium transition-colors">f.zarei@modares.ac.ir</a>
                    </div>
                    <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm text-teal-500"><Phone size={20} /></div>
                      <a href="tel:00982182884546" className="hover:text-teal-600 font-medium transition-colors">00982182884546</a>
                    </div>
                    <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm text-teal-500"><Send size={20} /></div>
                      <a href="https://t.me/healcono" target="_blank" rel="noreferrer" className="hover:text-teal-600 font-medium transition-colors">Healcono on Telegram</a>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Section: About */}
          {activeSection === 'about' && (
            <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
              <SectionTitle>About Tglance</SectionTitle>
              <Card>
                 <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                    <p>This "Tglance: Health Promotion Guide" is a simplified, interactive adaptation of content from seminal works in health promotion.</p>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border-l-4 border-teal-500">
                      <p className="font-semibold text-slate-900 dark:text-white">Theory at a Glance: A Guide For Health Promotion Practice (Second Edition)</p>
                      <p className="text-sm text-slate-500 mt-1">NIH Publication No. 05-3896 • Authors: Dr. Barbara K. Rimer and Dr. Karen Glanz</p>
                    </div>
                    <p><strong>Purpose:</strong> To provide a quick reference and learning tool for students, researchers, and practitioners in the field of health promotion.</p>
                    <p className="text-sm text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <strong>Disclaimer:</strong> This application summarizes key concepts for educational purposes. For comprehensive information, please refer to the full original publications.
                    </p>
                 </div>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-white dark:bg-slate-900 text-center text-slate-400 text-sm border-t border-slate-100 dark:border-slate-800">
        <p>Tglance: Health Promotion Guide | Adapted from "Theory at a Glance" (NIH Pub. No. 05-3896).</p>
      </footer>
    </div>
  );
}