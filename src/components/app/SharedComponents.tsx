import { useState } from "react";
import Icon from "@/components/ui/icon";
import { COURSES, VIDEOS, Course, Video } from "@/lib/data";

export function SearchBar({ query, onChange }: { query: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
        <Icon name="Search" size={18} />
      </div>
      <input
        type="text"
        placeholder="Поиск курсов и материалов..."
        value={query}
        onChange={e => onChange(e.target.value)}
        className="search-input w-full glass rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white bg-transparent"
      />
      {query && (
        <button onClick={() => onChange("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
          <Icon name="X" size={16} />
        </button>
      )}
    </div>
  );
}

export function CourseCard({ course, delay = 0 }: { course: Course; delay?: number }) {
  const [saved, setSaved] = useState(course.saved);
  return (
    <div className="course-card glass rounded-2xl overflow-hidden cursor-pointer animate-fade-in" style={{ animationDelay: `${delay}ms`, opacity: 0 }}>
      <div className="relative h-32 overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-70`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">{course.emoji}</span>
        </div>
        <button onClick={e => { e.stopPropagation(); setSaved(!saved); }} className="absolute top-3 right-3 w-8 h-8 glass rounded-full flex items-center justify-center">
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
          <button className="w-full py-2 rounded-xl text-xs font-semibold font-display bg-gradient-to-r from-purple-600 to-blue-600 text-white">Начать курс</button>
        )}
      </div>
    </div>
  );
}

export function VideoCard({ video, delay = 0 }: { video: Video; delay?: number }) {
  const [saved, setSaved] = useState(video.saved);
  return (
    <div className="course-card flex gap-3 glass rounded-2xl overflow-hidden p-3 cursor-pointer animate-fade-in" style={{ animationDelay: `${delay}ms`, opacity: 0 }}>
      <div className="relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0">
        <img src={video.thumb} alt={video.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
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
      <button onClick={e => { e.stopPropagation(); setSaved(!saved); }} className="self-start mt-1 flex-shrink-0">
        <Icon name={saved ? "Bookmark" : "BookmarkPlus"} size={16} className={saved ? "text-yellow-400" : "text-white/30"} />
      </button>
    </div>
  );
}

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const filteredCourses = COURSES.filter(c => query && (c.title.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase())));
  const filteredVideos = VIDEOS.filter(v => query && (v.title.toLowerCase().includes(query.toLowerCase()) || v.course.toLowerCase().includes(query.toLowerCase())));
  return (
    <div className="absolute inset-0 z-50 bg-background animate-fade-in overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      <div className="px-5 pt-6 pb-4 flex items-center gap-3">
        <button onClick={onClose} className="text-white/60"><Icon name="ArrowLeft" size={22} /></button>
        <div className="flex-1"><SearchBar query={query} onChange={setQuery} /></div>
      </div>
      {!query && (
        <div className="px-5 py-8 text-center text-white/30">
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
            <div className="text-center py-16 text-white/30">
              <div className="text-5xl mb-3">😔</div>
              <p className="font-display text-sm">Ничего не найдено по запросу «{query}»</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
