import { PaletteIcon } from "lucide-react";

export const THEMES = [
    { id: "cyan", label: "Ocean", from: "from-cyan-600", to: "to-cyan-500", preview: "#0891b2" },
    { id: "rose", label: "Rose", from: "from-rose-600", to: "to-rose-500", preview: "#e11d48" },
    { id: "violet", label: "Violet", from: "from-violet-600", to: "to-violet-500", preview: "#7c3aed" },
    { id: "emerald", label: "Forest", from: "from-emerald-600", to: "to-emerald-500", preview: "#059669" },
    { id: "amber", label: "Amber", from: "from-amber-600", to: "to-amber-500", preview: "#d97706" },
    { id: "sky", label: "Sky", from: "from-sky-600", to: "to-sky-500", preview: "#0284c7" },
];

/**
 * ThemePicker — a small popover with colour swatches.
 * Props:
 *  - open: boolean
 *  - onToggle: () => void — toggles the popover
 *  - currentTheme: string  — the active theme id
 *  - onSelect: (themeId) => void
 */
function ThemePicker({ open, onToggle, currentTheme, onSelect }) {
    return (
        <div className="relative">
            <button
                onClick={onToggle}
                title="Change chat theme"
                className={`p-2 rounded-full transition-all ${open
                        ? "bg-slate-600 text-white"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                    }`}
            >
                <PaletteIcon className="size-5" />
            </button>

            {open && (
                <>
                    {/* Backdrop to close on outside click */}
                    <div className="fixed inset-0 z-10" onClick={onToggle} />

                    {/* Popover */}
                    <div className="absolute right-0 top-11 z-20 bg-slate-800 border border-slate-700/60 rounded-2xl p-4 shadow-2xl w-64 animate-fade-in">
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-3">
                            Chat Theme
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                            {THEMES.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => { onSelect(t.id); onToggle(); }}
                                    className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${currentTheme === t.id
                                            ? "bg-slate-700 ring-2 ring-white/30"
                                            : "hover:bg-slate-700/50"
                                        }`}
                                >
                                    {/* Swatch */}
                                    <span
                                        className="size-8 rounded-full shadow-lg ring-2 ring-white/10"
                                        style={{ background: t.preview }}
                                    />
                                    <span className="text-slate-300 text-[10px] font-medium">{t.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <style>{`
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(-6px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
            .animate-fade-in { animation: fade-in 0.18s ease both; }
          `}</style>
                </>
            )}
        </div>
    );
}

export default ThemePicker;
