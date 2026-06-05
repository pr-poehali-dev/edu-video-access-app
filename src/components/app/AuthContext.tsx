import { useState, createContext, useContext } from "react";
import Icon from "@/components/ui/icon";
import { login, register, logout, getToken, saveToken, User } from "@/lib/auth";

// ===== AUTH CONTEXT =====
export interface AuthCtx {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (name: string, email: string, password: string) => Promise<string | null>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthCtx>({
  user: null,
  loading: true,
  signIn: async () => null,
  signUp: async () => null,
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

// ===== AUTH SCREEN =====
export function AuthScreen() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const submit = async () => {
    setError("");
    setLoading(true);
    let err: string | null = null;
    if (mode === "login") {
      err = await signIn(email, password);
    } else {
      err = await signUp(name, email, password);
    }
    setLoading(false);
    if (err) setError(err);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="relative w-full max-w-sm flex flex-col" style={{ height: "100dvh", maxHeight: "900px" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-0 w-48 h-48 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

        <div className="flex-1 flex flex-col justify-center px-6 relative">
          <div className="text-center mb-10 animate-fade-in" style={{ opacity: 0 }}>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <Icon name="GraduationCap" size={28} className="text-white" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white">LearnX</h1>
            <p className="text-white/40 text-sm mt-1">Учись без границ</p>
          </div>

          <div className="glass rounded-2xl p-1 flex mb-8 animate-fade-in" style={{ animationDelay: "80ms", opacity: 0 }}>
            <button
              onClick={() => { setMode("login"); setError(""); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold font-display transition-all ${mode === "login" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "text-white/40"}`}
            >
              Вход
            </button>
            <button
              onClick={() => { setMode("register"); setError(""); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold font-display transition-all ${mode === "register" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "text-white/40"}`}
            >
              Регистрация
            </button>
          </div>

          <div className="space-y-4 animate-fade-in" style={{ animationDelay: "160ms", opacity: 0 }}>
            {mode === "register" && (
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <Icon name="User" size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="search-input w-full glass rounded-2xl py-4 pl-11 pr-4 text-sm text-white bg-transparent"
                />
              </div>
            )}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                <Icon name="Mail" size={16} />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="search-input w-full glass rounded-2xl py-4 pl-11 pr-4 text-sm text-white bg-transparent"
              />
            </div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                <Icon name="Lock" size={16} />
              </div>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submit()}
                className="search-input w-full glass rounded-2xl py-4 pl-11 pr-12 text-sm text-white bg-transparent"
              />
              <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
                <Icon name={showPass ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm glass rounded-xl px-4 py-3">
                <Icon name="AlertCircle" size={14} />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={submit}
              disabled={loading}
              className="w-full py-4 rounded-2xl font-display font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 transition-all active:scale-95 disabled:opacity-60 mt-2"
              style={{ boxShadow: "0 8px 30px rgba(168,85,247,0.4)" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {mode === "login" ? "Входим..." : "Регистрируем..."}
                </span>
              ) : (
                mode === "login" ? "Войти" : "Создать аккаунт"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== AUTH PROVIDER HELPERS (used in Index.tsx) =====
export { login, register, logout, getToken, saveToken };
