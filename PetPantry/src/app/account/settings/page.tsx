// app/account/settings/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import Link from "next/link";

type Theme = "light" | "dark" | "system";
type Language = "en" | "es" | "fr";
type Timezone = string;

export default function SettingsPage() {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Theme settings
  const [theme, setTheme] = useState<Theme>("system");
  const [primaryColor, setPrimaryColor] = useState("#4C9085");

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotionalEmails, setPromotionalEmails] = useState(false);

  // Privacy settings
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [dataCollection, setDataCollection] = useState(true);

  // Other preferences
  const [language, setLanguage] = useState<Language>("en");
  const [timezone, setTimezone] = useState<Timezone>("America/New_York");
  const [currency, setCurrency] = useState("USD");

  // Initialize settings
  useEffect(() => {
    /*
    if (!user) {
      router.push("/login?redirect=/account/settings");
      return;
    }
    */
    // Load saved settings from localStorage or API
    const loadSettings = () => {
      setIsLoading(true);

      try {
        const savedTheme = (localStorage.getItem("theme") as Theme) || "system";
        const savedColor = localStorage.getItem("primaryColor") || "#4C9085";
        const savedEmailNotifications =
          localStorage.getItem("emailNotifications") !== "false";
        const savedPushNotifications =
          localStorage.getItem("pushNotifications") !== "false";

        setTheme(savedTheme);
        setPrimaryColor(savedColor);
        setEmailNotifications(savedEmailNotifications);
        setPushNotifications(savedPushNotifications);

        // Apply theme immediately
        applyTheme(savedTheme);
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [user, router]);

  // Apply theme to document
  const applyTheme = (selectedTheme: Theme) => {
    const isDark =
      selectedTheme === "dark" ||
      (selectedTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", selectedTheme);
  };

  // Handle theme change
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // Handle color change
  const handleColorChange = (color: string) => {
    setPrimaryColor(color);
    localStorage.setItem("primaryColor", color);
    // You could update CSS variables here
    document.documentElement.style.setProperty("--btn-primary", color);
  };

  // Reset to defaults
  const handleReset = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      localStorage.removeItem("theme");
      localStorage.removeItem("primaryColor");
      localStorage.removeItem("emailNotifications");
      localStorage.removeItem("pushNotifications");

      setTheme("system");
      setPrimaryColor("#4C9085");
      setEmailNotifications(true);
      setPushNotifications(true);
      setOrderUpdates(true);
      setPromotionalEmails(false);
      setProfileVisibility("public");
      setDataCollection(true);

      applyTheme("system");
    }
  };

  // Save all settings
  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem("theme", theme);
    localStorage.setItem("primaryColor", primaryColor);
    localStorage.setItem("emailNotifications", emailNotifications.toString());
    localStorage.setItem("pushNotifications", pushNotifications.toString());

    // In a real app, you'd save to your backend API here
    console.log("Saving settings:", {
      theme,
      primaryColor,
      emailNotifications,
      pushNotifications,
    });

    alert("Settings saved successfully!");
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-card rounded w-1/4"></div>
          <div className="h-64 bg-card rounded"></div>
        </div>
      </div>
    );
  }
  /*
  if (!user) {
    return <p>Redirecting...</p>;
  }
    */

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm mb-8 text-card-subtext">
        <Link href="/account" className="hover:text-sofwords transition-colors">
          Account
        </Link>
        <span>›</span>
        <span className="text-sofwords font-medium">Settings</span>
      </nav>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-card-title">Settings</h1>
          <p className="text-card-subtext mt-2">
            Customize your experience and privacy preferences
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-divider rounded-lg hover:bg-card transition-colors"
          >
            Reset All
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-btn-primary text-navbar-text rounded-lg hover:bg-btn-primary-hover transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-1">
            <a
              href="#appearance"
              className="block p-3 rounded-lg hover:bg-card transition-colors"
            >
              🎨 Appearance
            </a>
            <a
              href="#notifications"
              className="block p-3 rounded-lg hover:bg-card transition-colors"
            >
              🔔 Notifications
            </a>
            <a
              href="#privacy"
              className="block p-3 rounded-lg hover:bg-card transition-colors"
            >
              🔒 Privacy & Security
            </a>
            <a
              href="#preferences"
              className="block p-3 rounded-lg hover:bg-card transition-colors"
            >
              ⚙️ Preferences
            </a>
            <Link
              href="/account"
              className="block p-3 rounded-lg hover:bg-card transition-colors border-t border-divider mt-4"
            >
              ← Back to Account
            </Link>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Appearance Section */}
          <section
            id="appearance"
            className="bg-card border border-divider rounded-xl p-6"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-card-title">
              <span>🎨</span> Appearance
            </h2>

            {/* Theme Selection */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4 text-card-title">Theme</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(["light", "dark", "system"] as Theme[]).map((option) => (
                  <button
                    key={option}
                    onClick={() => handleThemeChange(option)}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      theme === option
                        ? "border-btn-primary bg-btn-primary/5"
                        : "border-divider hover:border-btn-primary"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-4 h-4 rounded-full border ${
                          theme === option
                            ? "border-btn-primary bg-btn-primary"
                            : "border-card-subtext"
                        }`}
                      ></div>
                      <span className="font-medium capitalize">{option}</span>
                    </div>
                    <p className="text-sm text-card-subtext">
                      {option === "light" && "Always use light theme"}
                      {option === "dark" && "Always use dark theme"}
                      {option === "system" && "Sync with system preference"}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4 text-card-title">
                Accent Color
              </h3>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <p className="font-medium">Primary Color</p>
                  <p className="text-sm text-card-subtext">
                    Used for buttons and highlights
                  </p>
                </div>
                <div className="ml-auto text-sm text-card-subtext">
                  {primaryColor}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                {["#4C9085", "#7DA7C0", "#EFA78B", "#F7D78D", "#800020"].map(
                  (color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        primaryColor === color
                          ? "border-white ring-2 ring-offset-2 ring-btn-primary"
                          : "border-divider"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                    />
                  ),
                )}
              </div>
            </div>

            {/* Font Size */}
            <div>
              <h3 className="font-semibold mb-4 text-card-title">Font Size</h3>
              <div className="flex items-center gap-4">
                <button className="p-2 border border-divider rounded-lg hover:bg-input">
                  A-
                </button>
                <div className="flex-1">
                  <input
                    type="range"
                    min="12"
                    max="20"
                    defaultValue="16"
                    className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <button className="p-2 border border-divider rounded-lg hover:bg-input">
                  A+
                </button>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section
            id="notifications"
            className="bg-card border border-divider rounded-xl p-6"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-card-title">
              <span>🔔</span> Notifications
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-card-title">
                    Email Notifications
                  </p>
                  <p className="text-sm text-card-subtext">
                    Receive updates via email
                  </p>
                </div>
                <ToggleSwitch
                  checked={emailNotifications}
                  onChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-card-title">
                    Push Notifications
                  </p>
                  <p className="text-sm text-card-subtext">
                    Browser notifications
                  </p>
                </div>
                <ToggleSwitch
                  checked={pushNotifications}
                  onChange={setPushNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-card-title">Order Updates</p>
                  <p className="text-sm text-card-subtext">
                    Shipping and delivery updates
                  </p>
                </div>
                <ToggleSwitch
                  checked={orderUpdates}
                  onChange={setOrderUpdates}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-card-title">
                    Promotional Emails
                  </p>
                  <p className="text-sm text-card-subtext">
                    Special offers and news
                  </p>
                </div>
                <ToggleSwitch
                  checked={promotionalEmails}
                  onChange={setPromotionalEmails}
                />
              </div>
            </div>
          </section>

          {/* Privacy Section */}
          <section
            id="privacy"
            className="bg-card border border-divider rounded-xl p-6"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-card-title">
              <span>🔒</span> Privacy & Security
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3 text-card-title">
                  Profile Visibility
                </h3>
                <select
                  value={profileVisibility}
                  onChange={(e) => setProfileVisibility(e.target.value)}
                  className="w-full p-3 border border-divider rounded-lg bg-input focus:outline-none focus:border-input-focus"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="friends">Friends Only</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-card-title">Data Collection</p>
                  <p className="text-sm text-card-subtext">
                    Allow anonymous usage data to improve the app
                  </p>
                </div>
                <ToggleSwitch
                  checked={dataCollection}
                  onChange={setDataCollection}
                />
              </div>

              <div>
                <h3 className="font-medium mb-3 text-card-title">
                  Data Export
                </h3>
                <button className="px-4 py-2 border border-divider rounded-lg hover:bg-input transition-colors">
                  Export All Data
                </button>
                <p className="text-sm text-card-subtext mt-2">
                  Download a copy of your personal data
                </p>
              </div>
            </div>
          </section>

          {/* Preferences Section */}
          <section
            id="preferences"
            className="bg-card border border-divider rounded-xl p-6"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-card-title">
              <span>⚙️</span> Preferences
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3 text-card-title">Language</h3>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full p-3 border border-divider rounded-lg bg-input focus:outline-none focus:border-input-focus"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              <div>
                <h3 className="font-medium mb-3 text-card-title">Timezone</h3>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full p-3 border border-divider rounded-lg bg-input focus:outline-none focus:border-input-focus"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">GMT (London)</option>
                </select>
              </div>

              <div>
                <h3 className="font-medium mb-3 text-card-title">Currency</h3>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full p-3 border border-divider rounded-lg bg-input focus:outline-none focus:border-input-focus"
                >
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                  <option value="CAD">Canadian Dollar (C$)</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// Toggle Switch Component
function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-btn-primary"></div>
    </label>
  );
}
