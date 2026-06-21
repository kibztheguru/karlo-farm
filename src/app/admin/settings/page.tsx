"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Settings = {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  about_text: string;
  phone: string;
  email: string;
  whatsapp: string;
  footer_text: string;
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  // FETCH SETTINGS
  const fetchSettings = async () => {
    const { data } = await supabase
      .from("website_settings")
      .select("*")
      .single();

    setSettings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!settings) return;

    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  // SAVE SETTINGS
  const saveSettings = async () => {
    if (!settings) return;

    await supabase
      .from("website_settings")
      .update({
        hero_title: settings.hero_title,
        hero_subtitle: settings.hero_subtitle,
        about_text: settings.about_text,
        phone: settings.phone,
        email: settings.email,
        whatsapp: settings.whatsapp,
        footer_text: settings.footer_text,
      })
      .eq("id", settings.id);

    alert("Settings updated successfully!");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-green-700">
        Website Settings
      </h1>

      <div className="bg-white p-4 rounded-xl shadow space-y-3">

        <input
          name="hero_title"
          value={settings?.hero_title || ""}
          onChange={handleChange}
          placeholder="Hero Title"
          className="border p-2 w-full rounded"
        />

        <input
          name="hero_subtitle"
          value={settings?.hero_subtitle || ""}
          onChange={handleChange}
          placeholder="Hero Subtitle"
          className="border p-2 w-full rounded"
        />

        <textarea
          name="about_text"
          value={settings?.about_text || ""}
          onChange={handleChange}
          placeholder="About Text"
          className="border p-2 w-full rounded"
        />

        <input
          name="phone"
          value={settings?.phone || ""}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 w-full rounded"
        />

        <input
          name="email"
          value={settings?.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full rounded"
        />

        <input
          name="whatsapp"
          value={settings?.whatsapp || ""}
          onChange={handleChange}
          placeholder="WhatsApp"
          className="border p-2 w-full rounded"
        />

        <textarea
          name="footer_text"
          value={settings?.footer_text || ""}
          onChange={handleChange}
          placeholder="Footer Text"
          className="border p-2 w-full rounded"
        />

        <button
          onClick={saveSettings}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Save Settings
        </button>

      </div>

    </div>
  );
}