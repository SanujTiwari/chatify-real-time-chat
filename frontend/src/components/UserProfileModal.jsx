import { XIcon, UserIcon, MailIcon, FileTextIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

/**
 * UserProfileModal — read-only slide-in panel showing another user's profile.
 * Props:
 *  - user: the selected user object { _id, fullName, email, bio, profilePic }
 *  - onClose: function to close the modal
 */
function UserProfileModal({ user, onClose }) {
    const { onlineUsers } = useAuthStore();
    const isOnline = onlineUsers.includes(user._id);

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={onClose}
            />

            {/* Slide-in panel */}
            <div className="fixed right-0 top-0 h-full w-80 max-w-full bg-slate-900 border-l border-slate-700/60 z-50 shadow-2xl flex flex-col animate-slide-in-right">
                {/* Header */}
                <div className="bg-gradient-to-r from-cyan-500/20 to-pink-500/20 p-4 flex items-center justify-between border-b border-slate-700/50 shrink-0">
                    <h2 className="text-slate-100 font-semibold text-base">Profile Info</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-full hover:bg-slate-700/60 text-slate-400 hover:text-white transition-all"
                    >
                        <XIcon className="size-5" />
                    </button>
                </div>

                {/* Avatar + name + status */}
                <div className="flex flex-col items-center py-8 px-6 border-b border-slate-700/50 shrink-0">
                    <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                        <div className="size-24 rounded-full overflow-hidden ring-4 ring-cyan-500/30 shadow-[0_0_24px_rgba(6,182,212,0.2)]">
                            <img
                                src={user.profilePic || "/avatar.png"}
                                alt={user.fullName}
                                className="size-full object-cover"
                            />
                        </div>
                    </div>

                    <h3 className="mt-4 text-slate-100 font-semibold text-xl text-center">
                        {user.fullName}
                    </h3>
                    <span
                        className={`mt-1 text-xs px-3 py-0.5 rounded-full font-medium ${isOnline
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-slate-700/50 text-slate-400"
                            }`}
                    >
                        {isOnline ? "Online" : "Offline"}
                    </span>
                </div>

                {/* Info rows */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {/* Email */}
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-pink-500/10 rounded-lg shrink-0">
                                <MailIcon className="size-4 text-pink-400" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-slate-500 mb-0.5">Email</p>
                                <p className="text-slate-200 text-sm font-medium truncate">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-violet-500/10 rounded-lg shrink-0 mt-0.5">
                                <FileTextIcon className="size-4 text-violet-400" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-slate-500 mb-0.5">Bio</p>
                                <p className={`text-sm leading-relaxed ${user.bio ? "text-slate-200" : "text-slate-500 italic"}`}>
                                    {user.bio || "No bio yet."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer note */}
                <div className="p-4 border-t border-slate-700/50 shrink-0">
                    <p className="text-center text-xs text-slate-600">You can only view this profile.</p>
                </div>
            </div>

            {/* Keyframe for slide-in animation */}
            <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.25s cubic-bezier(0.16,1,0.3,1) both;
        }
      `}</style>
        </>
    );
}

export default UserProfileModal;
