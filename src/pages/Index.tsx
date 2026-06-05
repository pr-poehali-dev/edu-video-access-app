import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { AuthContext, AuthScreen, useAuth } from "@/components/app/AuthContext";
import { SearchOverlay } from "@/components/app/SharedComponents";
import { HomeScreen, CatalogScreen, VideosScreen, SavedScreen, ProgressScreen, ProfileScreen } from "@/components/app/Screens";
import { login, register, logout, getToken, saveToken, clearToken, getProfile, User } from "@/lib/auth";

// ===== NAV =====
const NAV_ITEMS = [
  { id: "home", icon: "Home", label: "Главная" },
  { id: "catalog", icon: "Grid3x3", label: "Каталог" },
  { id: "videos", icon: "PlayCircle", label: "Видео" },
  { id: "saved", icon: "Bookmark", label: "Сохранено" },
  { id: "progress", icon: "TrendingUp", label: "Прогресс" },
  { id: "profile", icon: "User", label: "Профиль" },
];

// ===== MAIN APP =====
function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [showSearch, setShowSearch] = useState(false);

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
      <div className="relative w-full max-w-sm bg-background overflow-hidden flex flex-col" style={{ height: "100dvh", maxHeight: "900px" }}>
        <div className="fixed top-20 right-5 w-32 h-32 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
        <div className="fixed bottom-32 left-5 w-28 h-28 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none", paddingBottom: "80px" }}>
          {renderScreen()}
        </div>
        <div className="absolute bottom-0 left-0 right-0 glass-strong border-t border-white/5">
          <div className="flex items-center py-2 px-2">
            {NAV_ITEMS.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button key={item.id} onClick={() => setActiveTab(item.id)}
                  className={`flex-1 nav-item flex flex-col items-center py-1.5 gap-0.5 rounded-xl ${isActive ? "active" : ""}`}>
                  <div className={`relative transition-all duration-200 ${isActive ? "scale-110" : ""}`}>
                    {isActive && <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-md scale-150" />}
                    <Icon name={item.icon} size={isActive ? 22 : 20} className={`relative transition-colors ${isActive ? "text-purple-400" : "text-white/30"}`} />
                  </div>
                  <span className={`text-[9px] font-semibold font-display transition-colors ${isActive ? "text-purple-400" : "text-white/25"}`}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}
      </div>
    </div>
  );
}

// ===== ROOT WITH AUTH =====
export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const token = getToken();
    if (token) {
      getProfile(token).then(res => {
        if ("user" in res) setUser(res.user);
        else clearToken();
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
    return () => { document.body.style.overflow = ""; };
  }, []);

  const signIn = async (email: string, password: string): Promise<string | null> => {
    const res = await login(email, password);
    if ("error" in res) return res.error;
    saveToken(res.token);
    setUser(res.user);
    return null;
  };

  const signUp = async (name: string, email: string, password: string): Promise<string | null> => {
    const res = await register(name, email, password);
    if ("error" in res) return res.error;
    saveToken(res.token);
    setUser(res.user);
    return null;
  };

  const signOut = () => {
    const token = getToken();
    if (token) logout(token);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center animate-pulse-glow">
            <Icon name="GraduationCap" size={24} className="text-white" />
          </div>
          <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-400 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {user ? <App /> : <AuthScreen />}
    </AuthContext.Provider>
  );
}

export { useAuth };
