import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
    ArrowLeftIcon, CameraIcon, CheckIcon, PencilIcon,
    UserIcon, MailIcon, FileTextIcon, XIcon
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function ProfilePage() {
    const { authUser, updateProfile } = useAuthStore();
    const navigate = useNavigate();

    const [selectedImg, setSelectedImg] = useState(null);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [fullName, setFullName] = useState(authUser?.fullName || "");
    const [bio, setBio] = useState(authUser?.bio || "");
    const [isUpdating, setIsUpdating] = useState(false);

    const fileInputRef = useRef(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            setIsUpdating(true);
            await updateProfile({ profilePic: base64Image });
            setIsUpdating(false);
        };
    };

    const handleNameSave = async () => {
        if (!fullName.trim() || fullName === authUser?.fullName) {
            setIsEditingName(false);
            setFullName(authUser?.fullName || "");
            return;
        }
        setIsUpdating(true);
        await updateProfile({ fullName: fullName.trim() });
        setIsEditingName(false);
        setIsUpdating(false);
    };

    const handleBioSave = async () => {
        if (bio === authUser?.bio) {
            setIsEditingBio(false);
            return;
        }
        setIsUpdating(true);
        await updateProfile({ bio: bio.trim() });
        setIsEditingBio(false);
        setIsUpdating(false);
    };

    const currentProfilePic = selectedImg || authUser?.profilePic || "/avatar.png";

    return (
        <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4">
            {/* Background decorators */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
            <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
            <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

            <div className="relative w-full max-w-md">
                <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-cyan-500/20 to-pink-500/20 p-4 flex items-center gap-3 border-b border-slate-700/50">
                        <button
                            onClick={() => navigate("/")}
                            className="p-2 rounded-full hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all"
                        >
                            <ArrowLeftIcon className="size-5" />
                        </button>
                        <h1 className="text-slate-100 font-semibold text-lg tracking-wide">Profile</h1>
                    </div>

                    {/* Profile Picture */}
                    <div className="flex flex-col items-center pt-10 pb-6 px-6">
                        <div className="relative group">
                            <div className="size-32 rounded-full overflow-hidden ring-4 ring-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                                <img src={currentProfilePic} alt="Profile" className="size-full object-cover" />
                            </div>
                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer"
                            >
                                <CameraIcon className="size-7 text-white mb-1" />
                                <span className="text-white text-xs font-medium">Change</span>
                            </button>
                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="absolute bottom-1 right-1 bg-cyan-500 hover:bg-cyan-400 p-2 rounded-full shadow-lg transition-colors"
                            >
                                <CameraIcon className="size-4 text-white" />
                            </button>
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                        </div>
                        <p className="text-slate-400 text-xs mt-3">Tap the photo to change your profile picture</p>
                        {isUpdating && (
                            <div className="mt-2 flex items-center gap-2 text-cyan-400 text-xs">
                                <span className="inline-block size-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                                Updating...
                            </div>
                        )}
                    </div>

                    <div className="mx-6 border-t border-slate-700/50" />

                    <div className="p-6 space-y-4">
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">Account Info</p>

                        {/* Full Name */}
                        <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-700/50">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="p-2 bg-cyan-500/10 rounded-lg shrink-0">
                                        <UserIcon className="size-4 text-cyan-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-slate-500 mb-1">Full Name</p>
                                        {isEditingName ? (
                                            <input
                                                type="text"
                                                value={fullName}
                                                autoFocus
                                                onChange={(e) => setFullName(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") handleNameSave();
                                                    if (e.key === "Escape") { setIsEditingName(false); setFullName(authUser?.fullName || ""); }
                                                }}
                                                className="w-full bg-slate-800/60 border border-cyan-500/40 rounded-lg px-3 py-1.5 text-slate-100 text-sm outline-none focus:border-cyan-400 transition-all"
                                                maxLength={40}
                                            />
                                        ) : (
                                            <p className="text-slate-200 text-sm font-medium truncate">{authUser?.fullName}</p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => isEditingName ? handleNameSave() : setIsEditingName(true)}
                                    disabled={isUpdating}
                                    className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all disabled:opacity-50"
                                >
                                    {isEditingName ? <CheckIcon className="size-4 text-cyan-400" /> : <PencilIcon className="size-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-pink-500/10 rounded-lg">
                                    <MailIcon className="size-4 text-pink-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Email</p>
                                    <p className="text-slate-200 text-sm font-medium">{authUser?.email}</p>
                                </div>
                                <span className="ml-auto text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded-full">Read-only</span>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-700/50">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                    <div className="p-2 bg-violet-500/10 rounded-lg shrink-0 mt-0.5">
                                        <FileTextIcon className="size-4 text-violet-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-slate-500 mb-1">Bio</p>
                                        {isEditingBio ? (
                                            <>
                                                <textarea
                                                    value={bio}
                                                    autoFocus
                                                    onChange={(e) => setBio(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Escape") { setIsEditingBio(false); setBio(authUser?.bio || ""); }
                                                    }}
                                                    rows={3}
                                                    maxLength={150}
                                                    placeholder="Write something about yourself…"
                                                    className="w-full bg-slate-800/60 border border-violet-500/40 rounded-lg px-3 py-2 text-slate-100 text-sm outline-none focus:border-violet-400 transition-all resize-none"
                                                />
                                                <p className="text-right text-xs text-slate-500 mt-1">{bio.length}/150</p>
                                            </>
                                        ) : (
                                            <p className={`text-sm ${authUser?.bio ? "text-slate-200" : "text-slate-500 italic"}`}>
                                                {authUser?.bio || "Add a bio…"}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => isEditingBio ? handleBioSave() : setIsEditingBio(true)}
                                    disabled={isUpdating}
                                    className="p-2 rounded-lg text-slate-400 hover:text-violet-400 hover:bg-violet-400/10 transition-all disabled:opacity-50"
                                >
                                    {isEditingBio ? <CheckIcon className="size-4 text-violet-400" /> : <PencilIcon className="size-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Member since */}
                        <div className="text-center pt-2">
                            <p className="text-xs text-slate-600">
                                Member since{" "}
                                {authUser?.createdAt
                                    ? new Date(authUser.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
                                    : "—"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
