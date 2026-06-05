import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/components/app/AuthContext";
import { SearchBar, CourseCard, VideoCard } from "@/components/app/SharedComponents";
import { COURSES, VIDEOS, CATEGORIES, ACHIEVEMENTS } from "@/lib/data";

export function HomeScreen({ onSearch }: { onSearch: () => void }) {
  const { user } = useAuth();
  const inProgress = COURSES.filter(c => c.progress > 0);
  const firstName = user?.name?.split(" ")[0] || "Привет";

  return (
    <div className="animate-tab-switch">
      <div className="relative px-5 pt-6 pb-8 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-purple-600/20 blur-3xl animate-blob" />
        <div className="absolute -bottom-5 -left-5 w-36 h-36 rounded-full bg-cyan-500/15 blur-2xl" />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/50 text-sm mb-0.5">Добро пожаловать 👋</p>
              <h1 className="font-display text-xl font-bold text-white">Привет, {firstName}!</h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-sm font-bold font-display text-white animate-pulse-glow">
              {user?.avatar_letter || "?"}
            </div>
          </div>
          <div onClick={onSearch}><SearchBar query="" onChange={() => {}} /></div>
        </div>
      </div>

      <div className="px-5 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Курсов", value: String(user?.courses_started ?? 4), color: "text-purple-400" },
            { label: "Часов", value: String(user?.hours_studied ?? "12.4"), color: "text-cyan-400" },
            { label: "Серия", value: `${user?.streak_days ?? 7}🔥`, color: "text-orange-400" },
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
          <div className="px-5 flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {inProgress.map((c, i) => (
              <div key={c.id} className="min-w-[200px]"><CourseCard course={c} delay={i * 100} /></div>
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
        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
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

export function CatalogScreen() {
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
      <div className="px-5 mb-4 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
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

export function VideosScreen() {
  const [query, setQuery] = useState("");
  const filtered = VIDEOS.filter(v => v.title.toLowerCase().includes(query.toLowerCase()) || v.course.toLowerCase().includes(query.toLowerCase()));
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
            <div className="w-14 h-14 rounded-full glass-strong flex items-center justify-center animate-pulse-glow">
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

export function SavedScreen() {
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
        {savedCourses.length > 0
          ? <div className="grid grid-cols-1 gap-4">{savedCourses.map((c, i) => <CourseCard key={c.id} course={c} delay={i * 80} />)}</div>
          : <div className="glass rounded-2xl p-8 text-center text-white/30"><div className="text-3xl mb-2">📚</div><p className="text-sm">Нет сохранённых курсов</p></div>
        }
      </section>
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Video" size={16} className="text-cyan-400" />
          <h2 className="font-display text-sm font-bold text-white">Видео</h2>
          <span className="ml-auto text-xs text-white/35">{savedVideos.length}</span>
        </div>
        {savedVideos.length > 0
          ? <div className="space-y-3">{savedVideos.map((v, i) => <VideoCard key={v.id} video={v} delay={i * 80} />)}</div>
          : <div className="glass rounded-2xl p-8 text-center text-white/30"><div className="text-3xl mb-2">🎬</div><p className="text-sm">Нет сохранённых видео</p></div>
        }
      </section>
    </div>
  );
}

export function ProgressScreen() {
  const { user } = useAuth();
  return (
    <div className="animate-tab-switch px-5 pt-6 pb-8">
      <h1 className="font-display text-xl font-bold text-white mb-6">Мой прогресс</h1>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "Курсов начато", value: String(user?.courses_started ?? 4), icon: "BookOpen", gradient: "from-purple-600 to-blue-600" },
          { label: "Часов изучено", value: String(user?.hours_studied ?? "12.4"), icon: "Clock", gradient: "from-cyan-500 to-teal-500" },
          { label: "Видео просмотрено", value: String(user?.videos_watched ?? 38), icon: "Play", gradient: "from-pink-500 to-rose-600" },
          { label: "Дней подряд", value: String(user?.streak_days ?? 7), icon: "Flame", gradient: "from-orange-500 to-yellow-500" },
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
      <div className="glass rounded-2xl p-4 mb-6 animate-fade-in" style={{ animationDelay: "200ms", opacity: 0 }}>
        <h2 className="font-display text-sm font-bold text-white mb-4">Активность за неделю</h2>
        <div className="flex items-end gap-2 h-20">
          {[40, 70, 55, 90, 65, 80, 100].map((h, i) => {
            const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
            const isToday = i === 6;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full relative" style={{ height: "60px" }}>
                  <div className={`absolute bottom-0 w-full rounded-t-lg progress-bar ${isToday ? "bg-gradient-to-t from-purple-600 to-cyan-400" : "bg-white/15"}`}
                    style={{ "--progress-width": "100%", height: `${h}%` } as React.CSSProperties} />
                </div>
                <span className={`text-[10px] font-semibold ${isToday ? "text-purple-400" : "text-white/30"}`}>{days[i]}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="glass rounded-2xl p-4 animate-fade-in" style={{ animationDelay: "300ms", opacity: 0 }}>
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
                <span className={`text-sm font-bold font-display ${c.progress > 0 ? "text-purple-400" : "text-white/25"}`}>{c.progress}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                {c.progress > 0 && (
                  <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full progress-bar" style={{ "--progress-width": `${c.progress}%` } as React.CSSProperties} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProfileScreen() {
  const { user, signOut } = useAuth();
  return (
    <div className="animate-tab-switch pb-8">
      <div className="relative px-5 pt-8 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="relative flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-400 flex items-center justify-center text-3xl font-display font-bold text-white mb-3 animate-pulse-glow animate-float">
            {user?.avatar_letter || "?"}
          </div>
          <h1 className="font-display text-lg font-bold text-white">{user?.name || "—"}</h1>
          <p className="text-white/50 text-sm mt-0.5">{user?.email || "—"}</p>
          <div className="mt-2">
            <span className="text-xs text-cyan-400 font-semibold font-display">🎓 {user?.level || "Начинающий"}</span>
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
          { icon: "User", label: "Редактировать профиль", color: "text-purple-400", action: null as (() => void) | null },
          { icon: "Bell", label: "Уведомления", color: "text-cyan-400", action: null as (() => void) | null },
          { icon: "Shield", label: "Безопасность", color: "text-green-400", action: null as (() => void) | null },
          { icon: "CreditCard", label: "Подписка и оплата", color: "text-yellow-400", action: null as (() => void) | null },
          { icon: "HelpCircle", label: "Помощь и поддержка", color: "text-blue-400", action: null as (() => void) | null },
          { icon: "LogOut", label: "Выйти из аккаунта", color: "text-red-400", action: signOut as (() => void) | null },
        ].map((item, i) => (
          <button key={i} onClick={() => item.action?.()} className="w-full glass rounded-2xl px-4 py-3.5 flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${i * 60}ms`, opacity: 0 }}>
            <Icon name={item.icon} size={18} className={item.color} />
            <span className="text-sm font-medium text-white flex-1 text-left">{item.label}</span>
            <Icon name="ChevronRight" size={16} className="text-white/20" />
          </button>
        ))}
      </div>
    </div>
  );
}
