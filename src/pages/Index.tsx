import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

// ===== DATA =====
const COURSES = [
  {
    id: 1,
    title: "Python для начинающих",
    author: "Алексей Смирнов",
    category: "Программирование",
    duration: "24 ч",
    lessons: 48,
    rating: 4.9,
    students: 12400,
    progress: 65,
    color: "from-purple-600 to-blue-600",
    emoji: "🐍",
    image: "https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/215138b0-a1f6-4cfd-b3b4-bad1943c7de5.jpg",
    saved: true,
  },
  {
    id: 2,
    title: "Дизайн интерфейсов",
    author: "Мария Козлова",
    category: "Дизайн",
    duration: "18 ч",
    lessons: 32,
    rating: 4.8,
    students: 8200,
    progress: 30,
    color: "from-pink-600 to-orange-500",
    emoji: "🎨",
    image: "https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/130087a4-e65c-4d98-bd95-56f514fcd970.jpg",
    saved: false,
  },
  {
    id: 3,
    title: "Английский язык B2",
    author: "Джон Уотсон",
    category: "Языки",
    duration: "40 ч",
    lessons: 80,
    rating: 4.7,
    students: 21000,
    progress: 12,
    color: "from-cyan-500 to-teal-600",
    emoji: "🌍",
    image: "https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/33c14bac-9540-4121-8091-9a05be97ed91.jpg",
    saved: true,
  },
  {
    id: 4,
    title: "Маркетинг в соцсетях",
    author: "Ольга Петрова",
    category: "Маркетинг",
    duration: "12 ч",
    lessons: 24,
    rating: 4.6,
    students: 5800,
    progress: 0,
    color: "from-yellow-500 to-orange-600",
    emoji: "📱",
    image: "https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/130087a4-e65c-4d98-bd95-56f514fcd970.jpg",
    saved: false,
  },
];

const VIDEOS = [
  { id: 1, title: "Урок 12: Функции в Python", course: "Python для начинающих", duration: "18:32", views: 3200, thumb: "https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/215138b0-a1f6-4cfd-b3b4-bad1943c7de5.jpg", saved: true },
  { id: 2, title: "Цветовые теории в UI", course: "Дизайн интерфейсов", duration: "24:15", views: 1800, thumb: "https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/130087a4-e65c-4d98-bd95-56f514fcd970.jpg", saved: false },
  { id: 3, title: "Грамматика: Past Perfect", course: "Английский B2", duration: "31:07", views: 4100, thumb: "https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/33c14bac-9540-4121-8091-9a05be97ed91.jpg", saved: true },
  { id: 4, title: "SMM-стратегия 2024", course: "Маркетинг в соцсетях", duration: "42:00", views: 2700, thumb: "https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/130087a4-e65c-4d98-bd95-56f514fcd970.jpg", saved: false },
  { id: 5, title: "Алгоритмы сортировки", course: "Python для начинающих", duration: "15:45", views: 5900, thumb: "https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/215138b0-a1f6-4cfd-b3b4-bad1943c7de5.jpg", saved: false },
];

const CATEGORIES = ["Все", "Программирование", "Дизайн", "Языки", "Маркетинг", "Математика"];

const ACHIEVEMENTS = [
  { emoji: "🔥", title: "7 дней подряд", desc: "Серия обучения" },
  { emoji: "⭐", title: "Отличник", desc: "5 тестов на 100%" },
  { emoji: "🚀", title: "Быстрый старт", desc: "3 курса начато" },
];

// ===== COMPONENTS =====
function SearchBar({ query, onChange }: { query: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
        <Icon name="Search" size={18} />
      </div>
      <input
        type="text"
        placeholder="Поиск курсов и материалов..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="search-input w-full glass rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white bg-transparent"
      />
      {query && (
        <button onClick={() => onChange("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
          <Icon name="X" size={16} />
        </button>
      )}
    </div>
  );
}

function CourseCard({ course, delay = 0 }: { course: typeof COURSES[0]; delay?: number }) {
  const [saved, setSaved] = useState(course.saved);
  return (
    <div className="course-card glass rounded-2xl overflow-hidden cursor-pointer animate-fade-in" style={{ animationDelay: `${delay}ms`, opacity: 0 }}>
      <div className="relative h-32 overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-70`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">{course.emoji}</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); setSaved(!saved); }} className="absolute top-3 right-3 w-8 h-8 glass rounded-full flex items-center justify-center">
          <Icon name={saved ? "Bookmark" : "BookmarkPlus"} size={14} className={saved ? "text-yellow-400" : "text-white/70"} />
        </button>
        <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full glass text-white/90">{course.category}</span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-sm font-semibold text-white mb-1 leading-tight">{course.title}</h3>
        <p className="text-xs text-white/50 mb-3">{course.author}</p>
        <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
          <span className="flex items-center gap-1"><Icon name="Clock" size={11} />{course.duration}</span>
          <span className="flex items-center gap-1"><Icon name="PlayCircle" size={11} />{course.lessons} уроков</span>
          <span className="flex items-center gap-1 text-yellow-400">★ {course.rating}</span>
        </div>
        {course.progress > 0 ? (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white/40">Прогресс</span>
              <span className="text-purple-400 font-semibold">{course.progress}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full progress-bar" style={{ "--progress-width": `${course.progress}%` } as React.CSSProperties} />
            </div>
          </div>
        ) : (
          <button className="w-full py-2 rounded-xl text-xs font-semibold font-display bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            Начать курс
          </button>
        )}
      </div>
    </div>
  );
}

function VideoCard({ video, delay = 0 }: { video: typeof VIDEOS[0]; delay?: number }) {
  const [saved, setSaved] = useState(video.saved);
  return (
    <div className="course-card flex gap-3 glass rounded-2xl overflow-hidden p-3 cursor-pointer animate-fade-in" style={{ animationDelay: `${delay}ms`, opacity: 0 }}>
      <div className="relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0">
        <img src={video.thumb} alt={video.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center video-play-btn">
            <Icon name="Play" size={12} className="text-white ml-0.5" />
          </div>
        </div>
        <span className="absolute bottom-1 right-1 text-white text-[10px] font-medium bg-black/60 px-1.5 py-0.5 rounded-md">{video.duration}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-white leading-tight mb-1 line-clamp-2">{video.title}</h4>
        <p className="text-xs text-white/40 mb-1">{video.course}</p>
        <div className="flex items-center gap-2 text-xs text-white/35">
          <Icon name="Eye" size={10} />
          <span>{(video.views / 1000).toFixed(1)}k просмотров</span>
        </div>
      </div>
      <button onClick={(e) => { e.stopPropagation(); setSaved(!saved); }} className="self-start mt-1 flex-shrink-0">
        <Icon name={saved ? "Bookmark" : "BookmarkPlus"} size={16} className={saved ? "text-yellow-400" : "text-white/30"} />
      </button>
    </div>
  );
}

// ===== SCREENS =====
function HomeScreen({ onSearch }: { onSearch: () => void }) {
  const [query, setQuery] = useState("");
  const inProgress = COURSES.filter(c => c.progress > 0);

  return (
    <div className="animate-tab-switch">
      <div className="relative px-5 pt-6 pb-8 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-purple-600/20 blur-3xl animate-blob" />
        <div className="absolute -bottom-5 -left-5 w-36 h-36 rounded-full bg-cyan-500/15 blur-2xl" />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/50 text-sm mb-0.5">Добро пожаловать 👋</p>
              <h1 className="font-display text-xl font-bold text-white">Привет, Алина!</h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-sm font-bold font-display text-white animate-pulse-glow">А</div>
          </div>
          <div onClick={onSearch}>
            <SearchBar query={query} onChange={setQuery} />
          </div>
        </div>
      </div>

      <div className="px-5 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Курсов", value: "4", color: "text-purple-400" },
            { label: "Часов", value: "12.4", color: "text-cyan-400" },
            { label: "Серия", value: "7🔥", color: "text-orange-400" },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl p-3 text-center animate-fade-in" style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}>
              <p className={`text-xl font-display font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {inProgress.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center justify-between px-5 mb-3">
            <h2 className="font-display text-base font-bold text-white">Продолжить обучение</h2>
            <button className="text-xs text-purple-400">Все</button>
          </div>
          <div className="px-5 flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {inProgress.map((c, i) => (
              <div key={c.id} className="min-w-[200px]">
                <CourseCard course={c} delay={i * 100} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="px-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-base font-bold text-white">Последние видео</h2>
          <button className="text-xs text-purple-400">Все</button>
        </div>
        <div className="space-y-3">
          {VIDEOS.slice(0, 3).map((v, i) => <VideoCard key={v.id} video={v} delay={i * 80} />)}
        </div>
      </section>

      <section className="px-5 mb-8">
        <h2 className="font-display text-base font-bold text-white mb-3">Достижения</h2>
        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} className="glass rounded-2xl p-4 flex-shrink-0 w-28 text-center animate-fade-in" style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}>
              <div className="text-2xl mb-1.5">{a.emoji}</div>
              <p className="text-xs font-semibold text-white leading-tight">{a.title}</p>
              <p className="text-[10px] text-white/40 mt-0.5">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CatalogScreen() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [query, setQuery] = useState("");
  const filtered = COURSES.filter(c => {
    const matchCat = activeCategory === "Все" || c.category === activeCategory;
    const matchQ = c.title.toLowerCase().includes(query.toLowerCase()) || c.author.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="animate-tab-switch">
      <div className="px-5 pt-6 mb-4">
        <h1 className="font-display text-xl font-bold text-white mb-4">Каталог курсов</h1>
        <SearchBar query={query} onChange={setQuery} />
      </div>
      <div className="px-5 mb-4 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold font-display transition-all ${activeCategory === cat ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "glass text-white/60"}`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="px-5">
        <p className="text-xs text-white/35 mb-4">{filtered.length} курсов найдено</p>
        <div className="grid grid-cols-1 gap-4 pb-8">
          {filtered.map((c, i) => <CourseCard key={c.id} course={c} delay={i * 80} />)}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-white/30 animate-fade-in">
              <div className="text-5xl mb-3">🔍</div>
              <p className="font-display text-sm">Ничего не найдено</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VideosScreen() {
  const [query, setQuery] = useState("");
  const filtered = VIDEOS.filter(v =>
    v.title.toLowerCase().includes(query.toLowerCase()) || v.course.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="animate-tab-switch">
      <div className="px-5 pt-6 mb-4">
        <h1 className="font-display text-xl font-bold text-white mb-4">Учебные видео</h1>
        <SearchBar query={query} onChange={setQuery} />
      </div>
      <div className="px-5 mb-6">
        <div className="relative rounded-3xl overflow-hidden h-44 cursor-pointer course-card">
          <img src="https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/33c14bac-9540-4121-8091-9a05be97ed91.jpg" alt="featured" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full glass-strong flex items-center justify-center video-play-btn animate-pulse-glow">
              <Icon name="Play" size={22} className="text-white ml-1" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[10px] text-cyan-400 font-semibold font-display uppercase tracking-wider">Рекомендуем</span>
            <h3 className="text-white font-display font-bold text-sm mt-0.5">Алгоритмы сортировки</h3>
            <p className="text-white/50 text-xs">Python для начинающих · 15:45</p>
          </div>
        </div>
      </div>
      <div className="px-5 mb-3">
        <h2 className="font-display text-base font-bold text-white">Все видео</h2>
        <p className="text-xs text-white/35 mt-0.5">{filtered.length} видео</p>
      </div>
      <div className="px-5 space-y-3 pb-8">
        {filtered.map((v, i) => <VideoCard key={v.id} video={v} delay={i * 60} />)}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/30 animate-fade-in">
            <div className="text-5xl mb-3">🎬</div>
            <p className="font-display text-sm">Видео не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SavedScreen() {
  const savedCourses = COURSES.filter(c => c.saved);
  const savedVideos = VIDEOS.filter(v => v.saved);

  return (
    <div className="animate-tab-switch px-5 pt-6 pb-8">
      <h1 className="font-display text-xl font-bold text-white mb-6">Сохранённое</h1>
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="BookOpen" size={16} className="text-purple-400" />
          <h2 className="font-display text-sm font-bold text-white">Курсы</h2>
          <span className="ml-auto text-xs text-white/35">{savedCourses.length}</span>
        </div>
        {savedCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">{savedCourses.map((c, i) => <CourseCard key={c.id} course={c} delay={i * 80} />)}</div>
        ) : (
          <div className="glass rounded-2xl p-8 text-center text-white/30"><div className="text-3xl mb-2">📚</div><p className="text-sm">Нет сохранённых курсов</p></div>
        )}
      </section>
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Video" size={16} className="text-cyan-400" />
          <h2 className="font-display text-sm font-bold text-white">Видео</h2>
          <span className="ml-auto text-xs text-white/35">{savedVideos.length}</span>
        </div>
        {savedVideos.length > 0 ? (
          <div className="space-y-3">{savedVideos.map((v, i) => <VideoCard key={v.id} video={v} delay={i * 80} />)}</div>
        ) : (
          <div className="glass rounded-2xl p-8 text-center text-white/30"><div className="text-3xl mb-2">🎬</div><p className="text-sm">Нет сохранённых видео</p></div>
        )}
      </section>
    </div>
  );
}

function ProgressScreen() {
  return (
    <div className="animate-tab-switch px-5 pt-6 pb-8">
      <h1 className="font-display text-xl font-bold text-white mb-6">Мой прогресс</h1>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "Курсов начато", value: "4", icon: "BookOpen", gradient: "from-purple-600 to-blue-600" },
          { label: "Часов изучено", value: "12.4", icon: "Clock", gradient: "from-cyan-500 to-teal-500" },
          { label: "Видео просмотрено", value: "38", icon: "Play", gradient: "from-pink-500 to-rose-600" },
          { label: "Дней подряд", value: "7", icon: "Flame", gradient: "from-orange-500 to-yellow-500" },
        ].map((s, i) => (
          <div key={i} className="glass rounded-2xl p-4 animate-fade-in" style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}>
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-2`}>
              <Icon name={s.icon} size={16} className="text-white" />
            </div>
            <p className="font-display text-xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-4 mb-6 animate-fade-in" style={{ animationDelay: '200ms', opacity: 0 }}>
        <h2 className="font-display text-sm font-bold text-white mb-4">Активность за неделю</h2>
        <div className="flex items-end gap-2 h-20">
          {[40, 70, 55, 90, 65, 80, 100].map((h, i) => {
            const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
            const isToday = i === 6;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full relative" style={{ height: '60px' }}>
                  <div className={`absolute bottom-0 w-full rounded-t-lg progress-bar ${isToday ? 'bg-gradient-to-t from-purple-600 to-cyan-400' : 'bg-white/15'}`}
                    style={{ "--progress-width": "100%", height: `${h}%` } as React.CSSProperties} />
                </div>
                <span className={`text-[10px] font-semibold ${isToday ? 'text-purple-400' : 'text-white/30'}`}>{days[i]}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass rounded-2xl p-4 animate-fade-in" style={{ animationDelay: '300ms', opacity: 0 }}>
        <h2 className="font-display text-sm font-bold text-white mb-4">Прогресс по курсам</h2>
        <div className="space-y-4">
          {COURSES.map((c, i) => (
            <div key={c.id} className="animate-fade-in" style={{ animationDelay: `${400 + i * 80}ms`, opacity: 0 }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{c.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{c.title}</p>
                  <p className="text-xs text-white/40">{c.lessons} уроков · {c.duration}</p>
                </div>
                <span className={`text-sm font-bold font-display ${c.progress > 0 ? 'text-purple-400' : 'text-white/25'}`}>{c.progress}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                {c.progress > 0 && (
                  <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full progress-bar"
                    style={{ "--progress-width": `${c.progress}%` } as React.CSSProperties} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="animate-tab-switch pb-8">
      <div className="relative px-5 pt-8 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="relative flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-400 flex items-center justify-center text-3xl font-display font-bold text-white mb-3 animate-pulse-glow animate-float">А</div>
          <h1 className="font-display text-lg font-bold text-white">Алина Новикова</h1>
          <p className="text-white/50 text-sm mt-0.5">alina.novikova@mail.ru</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-xs text-cyan-400 font-semibold font-display">🎓 Продвинутый</span>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-4 mb-6">
        <div className="glass rounded-2xl p-4">
          <h2 className="font-display text-sm font-bold text-white mb-3">Мои достижения</h2>
          <div className="flex gap-3">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} className="flex-1 text-center">
                <div className="text-2xl mb-1">{a.emoji}</div>
                <p className="text-xs font-semibold text-white leading-tight">{a.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 space-y-2">
        {[
          { icon: "User", label: "Редактировать профиль", color: "text-purple-400" },
          { icon: "Bell", label: "Уведомления", color: "text-cyan-400" },
          { icon: "Shield", label: "Безопасность", color: "text-green-400" },
          { icon: "CreditCard", label: "Подписка и оплата", color: "text-yellow-400" },
          { icon: "HelpCircle", label: "Помощь и поддержка", color: "text-blue-400" },
          { icon: "LogOut", label: "Выйти из аккаунта", color: "text-red-400" },
        ].map((item, i) => (
          <button key={i} className="w-full glass rounded-2xl px-4 py-3.5 flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${i * 60}ms`, opacity: 0 }}>
            <Icon name={item.icon} size={18} className={item.color} />
            <span className="text-sm font-medium text-white flex-1 text-left">{item.label}</span>
            <Icon name="ChevronRight" size={16} className="text-white/20" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ===== SEARCH OVERLAY =====
function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const filteredCourses = COURSES.filter(c =>
    query && (c.title.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase()))
  );
  const filteredVideos = VIDEOS.filter(v =>
    query && (v.title.toLowerCase().includes(query.toLowerCase()) || v.course.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="absolute inset-0 z-50 bg-background animate-fade-in overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
      <div className="px-5 pt-6 pb-4 flex items-center gap-3">
        <button onClick={onClose} className="text-white/60">
          <Icon name="ArrowLeft" size={22} />
        </button>
        <div className="flex-1">
          <SearchBar query={query} onChange={setQuery} />
        </div>
      </div>
      {!query && (
        <div className="px-5 py-8 text-center text-white/30 animate-fade-in">
          <div className="text-5xl mb-3">🔍</div>
          <p className="font-display text-sm">Начните вводить название курса или видео</p>
        </div>
      )}
      {query && (
        <div className="px-5 pb-8">
          {filteredCourses.length > 0 && (
            <section className="mb-5">
              <h3 className="font-display text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Курсы</h3>
              <div className="space-y-3">{filteredCourses.map((c, i) => <CourseCard key={c.id} course={c} delay={i * 50} />)}</div>
            </section>
          )}
          {filteredVideos.length > 0 && (
            <section>
              <h3 className="font-display text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Видео</h3>
              <div className="space-y-3">{filteredVideos.map((v, i) => <VideoCard key={v.id} video={v} delay={i * 50} />)}</div>
            </section>
          )}
          {filteredCourses.length === 0 && filteredVideos.length === 0 && (
            <div className="text-center py-16 text-white/30 animate-fade-in">
              <div className="text-5xl mb-3">😔</div>
              <p className="font-display text-sm">Ничего не найдено по запросу «{query}»</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ===== BOTTOM NAV =====
const NAV_ITEMS = [
  { id: "home", icon: "Home", label: "Главная" },
  { id: "catalog", icon: "Grid3x3", label: "Каталог" },
  { id: "videos", icon: "PlayCircle", label: "Видео" },
  { id: "saved", icon: "Bookmark", label: "Сохранено" },
  { id: "progress", icon: "TrendingUp", label: "Прогресс" },
  { id: "profile", icon: "User", label: "Профиль" },
];

// ===== MAIN APP =====
export default function Index() {
  const [activeTab, setActiveTab] = useState("home");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const renderScreen = () => {
    switch (activeTab) {
      case "home": return <HomeScreen onSearch={() => setShowSearch(true)} />;
      case "catalog": return <CatalogScreen />;
      case "videos": return <VideosScreen />;
      case "saved": return <SavedScreen />;
      case "progress": return <ProgressScreen />;
      case "profile": return <ProfileScreen />;
      default: return <HomeScreen onSearch={() => setShowSearch(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="relative w-full max-w-sm bg-background overflow-hidden flex flex-col" style={{ height: '100dvh', maxHeight: '900px' }}>
        {/* Background blobs */}
        <div className="fixed top-20 right-5 w-32 h-32 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
        <div className="fixed bottom-32 left-5 w-28 h-28 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none', paddingBottom: '80px' }}>
          {renderScreen()}
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 glass-strong border-t border-white/5">
          <div className="flex items-center py-2 px-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button key={item.id} onClick={() => setActiveTab(item.id)}
                  className={`flex-1 nav-item flex flex-col items-center py-1.5 gap-0.5 rounded-xl ${isActive ? 'active' : ''}`}>
                  <div className={`relative transition-all duration-200 ${isActive ? 'scale-110' : ''}`}>
                    {isActive && <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-md scale-150" />}
                    <Icon name={item.icon} size={isActive ? 22 : 20} className={`relative transition-colors ${isActive ? 'text-purple-400' : 'text-white/30'}`} />
                  </div>
                  <span className={`text-[9px] font-semibold font-display transition-colors ${isActive ? 'text-purple-400' : 'text-white/25'}`}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search overlay */}
        {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}
      </div>
    </div>
  );
}