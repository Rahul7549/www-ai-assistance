"use client";

import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { useConversation } from "@/app/lib/conversation-context";
import { AVATARS, VOICES } from "@/app/lib/endpoints";

const PERSONALITIES = [
  { value: "FRIENDLY", label: "Friendly" },
  { value: "PROFESSIONAL", label: "Professional" },
  { value: "WITTY", label: "Witty" },
  { value: "CONCISE", label: "Concise" },
  { value: "CREATIVE", label: "Creative" },
] as const;

/**
 * Deferred personalization. Instead of forcing avatar / personality / voice
 * during sign-up, we invite the user to set them in-context after their first
 * exchange. Shown once per assistant, then remembered as dismissed.
 */
export default function PersonalizeCard({ visible }: { visible: boolean }) {
  const { assistant, updateAssistant } = useConversation();

  const [dismissed, setDismissed] = useState(true); // hidden until storage check
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);

  const [avatar, setAvatar] = useState<string>(AVATARS[0].name);
  const [name, setName] = useState("");
  const [personality, setPersonality] = useState<string>("FRIENDLY");
  const [voiceId, setVoiceId] = useState<string>(VOICES[0]);

  const storageKey = assistant ? `pai:personalize:dismissed:${assistant.id}` : null;

  useEffect(() => {
    if (!storageKey || !assistant) return;
    setDismissed(localStorage.getItem(storageKey) === "1");
    setName(assistant.name ?? "");
    if (assistant.avatar && assistant.avatar !== "default") setAvatar(assistant.avatar);
    if (assistant.personality) setPersonality(assistant.personality);
    if (assistant.voiceId) setVoiceId(assistant.voiceId);
  }, [storageKey, assistant]);

  if (!assistant || !visible || dismissed) return null;

  const close = () => {
    if (storageKey) localStorage.setItem(storageKey, "1");
    setDismissed(true);
  };

  const handlePrimary = async () => {
    if (!expanded) {
      setExpanded(true);
      return;
    }
    setSaving(true);
    try {
      await updateAssistant({
        name: name.trim() || assistant.name,
        avatar,
        personality,
        voiceId,
      });
      close();
    } catch (err) {
      console.error("Failed to personalize assistant:", err);
      setSaving(false);
    }
  };

  return (
    <div className="fixed bottom-28 right-4 md:right-6 z-40 w-[min(340px,calc(100vw-2rem))] animate-[fadeInUp_0.35s_ease] rounded-2xl border border-white/10 bg-[#0b1120] p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-base font-semibold text-white">
          <Sparkles size={16} className="text-indigo-400" />
          Make {assistant.name} yours
        </h4>
        <button
          onClick={close}
          aria-label="Dismiss"
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
        Pick a look, a name, a personality and a voice — or skip and do it later in Settings.
      </p>

      {/* Avatars */}
      <div className="mt-4 flex gap-2">
        {AVATARS.map((av) => (
          <button
            key={av.name}
            onClick={() => setAvatar(av.name)}
            title={av.name}
            className={`h-11 w-11 overflow-hidden rounded-xl border bg-black/40 transition-all cursor-pointer ${
              avatar === av.name ? "border-indigo-500 ring-2 ring-indigo-500/60" : "border-white/10 hover:border-white/25"
            }`}
          >
            <img src={av.src} alt={av.name} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Expanded options */}
      {expanded && (
        <div className="mt-4 flex flex-col gap-3">
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[2px] text-gray-500">
              Assistant name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aura"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[2px] text-gray-500">
              Personality
            </label>
            <div className="flex flex-wrap gap-1.5">
              {PERSONALITIES.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setPersonality(p.value)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-all cursor-pointer ${
                    personality === p.value
                      ? "border-indigo-500 bg-indigo-500/15 text-white"
                      : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[2px] text-gray-500">
              Voice
            </label>
            <select
              value={voiceId}
              onChange={(e) => setVoiceId(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#0b1120] px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {VOICES.map((v) => (
                <option key={v} value={v} className="bg-[#0b1120] text-white">{v}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex gap-2.5">
        <button
          onClick={close}
          className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-gray-400 hover:bg-white/5 transition-colors cursor-pointer"
        >
          Skip
        </button>
        <button
          onClick={handlePrimary}
          disabled={saving}
          className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 transition-colors cursor-pointer"
        >
          {saving ? "Saving…" : expanded ? "Save assistant" : "Personalize"}
        </button>
      </div>
    </div>
  );
}
