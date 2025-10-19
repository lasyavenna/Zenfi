"use client";

import { useState } from "react";
import { Settings, User, LogOut, Shield, ChevronRight, ArrowLeft } from "lucide-react";

interface SettingsPageProps {
  onClose?: () => void;
}

export default function SettingsPage({ onClose }: SettingsPageProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showParentalControls, setShowParentalControls] = useState(false);
  const [parentalProfiles, setParentalProfiles] = useState<{ name: string; email: string }[]>([]);
  const [newParentName, setNewParentName] = useState("");
  const [newParentEmail, setNewParentEmail] = useState("");

  const handleAddParentalProfile = () => {
    if (newParentName.trim() && newParentEmail.trim()) {
      setParentalProfiles([...parentalProfiles, { name: newParentName, email: newParentEmail }]);
      setNewParentName("");
      setNewParentEmail("");
    }
  };

  const handleLogout = () => {
    alert("Logging out...");
  };

  const handleClose = () => {
    setShowSettings(false);
    setShowParentalControls(false);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Floating Settings Icon */}
      {!showSettings && !showParentalControls && (
        <button
          onClick={() => setShowSettings(true)}
          className="fixed top-6 right-6 z-50 p-3 backdrop-blur-md bg-white/40 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <Settings className="w-6 h-6 text-black" />
        </button>
      )}

      {/* Settings Overlay */}
      {(showSettings || showParentalControls) && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md overflow-y-auto flex items-center justify-center p-6">
          <div className="w-full max-w-lg bg-white/70 rounded-3xl shadow-2xl p-6 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={showParentalControls ? () => setShowParentalControls(false) : handleClose}
                className="p-2 bg-white/50 rounded-full hover:shadow-lg transition-all"
              >
                <ArrowLeft className="w-6 h-6 text-black" />
              </button>
              <h1 className="text-3xl font-bold text-black">
                {showParentalControls ? "Parental Controls 🛡️" : "Settings ⚙️"}
              </h1>
            </div>

            {/* Settings Main */}
            {!showParentalControls && (
              <>
                {/* Profile */}
                <div className="backdrop-blur-md bg-white/60 rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-3xl font-bold">
                      JD
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-black">John Doe</h2>
                      <p className="text-black/60">john.doe@email.com</p>
                      <p className="text-sm text-black/50 mt-1">Member since Jan 2024</p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => setShowParentalControls(true)}
                    className="w-full backdrop-blur-md bg-white/50 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-purple-400/30">
                        <Shield className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-black">Parental Controls</h3>
                        <p className="text-sm text-black/60">Manage parental access</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-black/60" />
                  </button>

                  <button className="w-full backdrop-blur-md bg-white/50 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-blue-400/30">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-black">Edit Profile</h3>
                        <p className="text-sm text-black/60">Update your information</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-black/60" />
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full backdrop-blur-md bg-red-400/40 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-red-500/30">
                        <LogOut className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-black">LOG OUT</h3>
                        <p className="text-sm text-black/60">Sign out of your account</p>
                      </div>
                    </div>
                  </button>
                </div>
              </>
            )}

            {/* Parental Controls Page */}
            {showParentalControls && (
              <>
                <p className="text-black/70 mb-4">
                  Add parental profiles that will have access to view and manage your financial info.
                </p>

                <div className="space-y-3 mb-6">
                  <input
                    type="text"
                    value={newParentName}
                    onChange={(e) => setNewParentName(e.target.value)}
                    placeholder="Parent's Name"
                    className="w-full px-4 py-3 rounded-xl bg-white/70 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <input
                    type="email"
                    value={newParentEmail}
                    onChange={(e) => setNewParentEmail(e.target.value)}
                    placeholder="Parent's Email"
                    className="w-full px-4 py-3 rounded-xl bg-white/70 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <button
                    onClick={handleAddParentalProfile}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-400 to-[#fff157] text-white font-semibold hover:shadow-lg transition-all"
                  >
                    Add Parental Profile
                  </button>
                </div>

                {parentalProfiles.length > 0 ? (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-black">Authorized Parents</h3>
                    {parentalProfiles.map((profile, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white/50 rounded-xl flex items-center justify-between hover:bg-white/70 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                            {profile.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-black">{profile.name}</p>
                            <p className="text-sm text-black/60">{profile.email}</p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setParentalProfiles(parentalProfiles.filter((_, i) => i !== index))
                          }
                          className="px-4 py-2 rounded-lg bg-red-400/40 text-red-600 font-semibold hover:bg-red-400/60 transition-all"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-black/50">
                    <Shield className="w-16 h-16 mx-auto mb-3 opacity-50" />
                    <p>No parental profiles added yet</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
