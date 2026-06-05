export const COURSES = [
  { id: 1, title: "Python для начинающих", author: "Алексей Смирнов", category: "Программирование", duration: "24 ч", lessons: 48, rating: 4.9, students: 12400, progress: 65, color: "from-purple-600 to-blue-600", emoji: "🐍", image: "https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/215138b0-a1f6-4cfd-b3b4-bad1943c7de5.jpg", saved: true },
  { id: 2, title: "Дизайн интерфейсов", author: "Мария Козлова", category: "Дизайн", duration: "18 ч", lessons: 32, rating: 4.8, students: 8200, progress: 30, color: "from-pink-600 to-orange-500", emoji: "🎨", image: "https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/130087a4-e65c-4d98-bd95-56f514fcd970.jpg", saved: false },
  { id: 3, title: "Английский язык B2", author: "Джон Уотсон", category: "Языки", duration: "40 ч", lessons: 80, rating: 4.7, students: 21000, progress: 12, color: "from-cyan-500 to-teal-600", emoji: "🌍", image: "https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/33c14bac-9540-4121-8091-9a05be97ed91.jpg", saved: true },
  { id: 4, title: "Маркетинг в соцсетях", author: "Ольга Петрова", category: "Маркетинг", duration: "12 ч", lessons: 24, rating: 4.6, students: 5800, progress: 0, color: "from-yellow-500 to-orange-600", emoji: "📱", image: "https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/130087a4-e65c-4d98-bd95-56f514fcd970.jpg", saved: false },
];

export const VIDEOS = [
  { id: 1, title: "Урок 12: Функции в Python", course: "Python для начинающих", duration: "18:32", views: 3200, thumb: "https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/215138b0-a1f6-4cfd-b3b4-bad1943c7de5.jpg", saved: true },
  { id: 2, title: "Цветовые теории в UI", course: "Дизайн интерфейсов", duration: "24:15", views: 1800, thumb: "https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/130087a4-e65c-4d98-bd95-56f514fcd970.jpg", saved: false },
  { id: 3, title: "Грамматика: Past Perfect", course: "Английский B2", duration: "31:07", views: 4100, thumb: "https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/33c14bac-9540-4121-8091-9a05be97ed91.jpg", saved: true },
  { id: 4, title: "SMM-стратегия 2024", course: "Маркетинг в соцсетях", duration: "42:00", views: 2700, thumb: "https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/130087a4-e65c-4d98-bd95-56f514fcd970.jpg", saved: false },
  { id: 5, title: "Алгоритмы сортировки", course: "Python для начинающих", duration: "15:45", views: 5900, thumb: "https://cdn.poehali.dev/projects/30d348bc-9504-4030-a569-e04434a0fc03/files/215138b0-a1f6-4cfd-b3b4-bad1943c7de5.jpg", saved: false },
];

export const CATEGORIES = ["Все", "Программирование", "Дизайн", "Языки", "Маркетинг", "Математика"];

export const ACHIEVEMENTS = [
  { emoji: "🔥", title: "7 дней подряд", desc: "Серия обучения" },
  { emoji: "⭐", title: "Отличник", desc: "5 тестов на 100%" },
  { emoji: "🚀", title: "Быстрый старт", desc: "3 курса начато" },
];

export type Course = typeof COURSES[0];
export type Video = typeof VIDEOS[0];
