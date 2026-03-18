import { useState } from "react";
import { XIcon, ChevronLeftIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UserProfileModal from "./UserProfileModal";
import ThemePicker from "./ThemePicker";

function ChatHeader() {
  const { selectedUser, setSelectedUser, chatTheme, setChatTheme } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  const [showProfile, setShowProfile] = useState(false);
  const [themePickerOpen, setThemePickerOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 max-h-[84px] p-4 md:p-6 flex-1">
        <div className="flex items-center space-x-3">
          {/* BACK BUTTON — mobile */}
          <button
            onClick={() => setSelectedUser(null)}
            className="md:hidden p-1 -ml-1 hover:bg-slate-700 rounded-full transition-colors"
          >
            <ChevronLeftIcon className="size-6 text-slate-400" />
          </button>

          {/* Clickable avatar + name → opens UserProfileModal */}
          <button
            className="flex items-center gap-3 group"
            onClick={() => setShowProfile(true)}
          >
            <div className={`avatar ${isOnline ? "online" : "offline"}`}>
              <div className="w-10 md:w-12 rounded-full shadow-lg overflow-hidden">
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt={selectedUser.fullName}
                  className="size-full object-cover group-hover:brightness-75 transition-all"
                />
              </div>
            </div>
            <div className="text-left">
              <h3 className="text-slate-200 font-medium text-sm md:text-base group-hover:text-cyan-300 transition-colors">
                {selectedUser.fullName}
              </h3>
              <p className="text-slate-400 text-xs md:text-sm">{isOnline ? "Online" : "Offline"}</p>
            </div>
          </button>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-1">
          {/* Theme Picker */}
          <ThemePicker
            open={themePickerOpen}
            onToggle={() => setThemePickerOpen((o) => !o)}
            currentTheme={chatTheme}
            onSelect={setChatTheme}
          />

          {/* Close chat */}
          <button
            onClick={() => setSelectedUser(null)}
            className="p-2 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-all"
          >
            <XIcon className="size-5" />
          </button>
        </div>
      </div>

      {/* User profile modal */}
      {showProfile && (
        <UserProfileModal user={selectedUser} onClose={() => setShowProfile(false)} />
      )}
    </>
  );
}

export default ChatHeader;
