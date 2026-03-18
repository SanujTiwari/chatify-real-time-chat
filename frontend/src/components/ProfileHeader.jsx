import { useNavigate } from "react-router";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const navigate = useNavigate();

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        {/* Clicking avatar or name navigates to /profile */}
        <button
          className="flex items-center gap-3 group"
          onClick={() => navigate("/profile")}
        >
          {/* AVATAR */}
          <div className="avatar online">
            <div className="size-14 rounded-full overflow-hidden relative">
              <img
                src={authUser.profilePic || "/avatar.png"}
                alt="User image"
                className="size-full object-cover group-hover:brightness-75 transition-all"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full">
                <span className="text-white text-[10px] font-medium">Edit</span>
              </div>
            </div>
          </div>

          {/* USERNAME & ONLINE TEXT */}
          <div className="text-left">
            <h3 className="text-slate-200 font-medium text-base max-w-[140px] truncate group-hover:text-cyan-300 transition-colors">
              {authUser.fullName}
            </h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </button>

        {/* BUTTONS */}
        <div className="flex gap-4 items-center">
          {/* LOGOUT BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>

          {/* SOUND TOGGLE BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProfileHeader;
