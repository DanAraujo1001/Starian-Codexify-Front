import { useEffect, useId, useRef, useState } from "react";
import { Bell, Bot, Eye, EyeOff, Palette } from "lucide-react";
import SettingsRow from "@/features/settings/components/SettingsRow";
import SettingsSectionCard from "@/features/settings/components/SettingsSectionCard";
import SettingsSelectDropdown from "@/features/settings/components/SettingsSelectDropdown";
import SettingsSwitch from "@/features/settings/components/SettingsSwitch";
import { cn } from "@/utils/cn";

const THEME_OPTIONS = [
  { value: "light", label: "Claro" },
  { value: "dark", label: "Escuro" },
] as const;

const MODEL_OPTIONS = [
  { value: "gemini", label: "Gemini" },
  { value: "claude", label: "Claude" },
  { value: "copilot", label: "Copilot" },
] as const;

const isValidHttpUrl = (raw: string): boolean => {
  const trimmed = raw.trim();
  if (trimmed === "") {
    return true;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const clampScore = (value: string): string => {
  if (value === "") {
    return "";
  }
  const digits = value.replace(/\D/g, "");
  if (digits === "") {
    return "";
  }
  let n = Number.parseInt(digits, 10);
  if (Number.isNaN(n)) {
    return "";
  }
  n = Math.min(100, Math.max(1, n));
  return String(n);
};

const SettingsPage = () => {
  const themeListId = useId();
  const modelListId = useId();

  const [theme, setTheme] = useState<"light" | "dark">(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light",
  );

  const [model, setModel] = useState<string>("gemini");
  const [apiKey, setApiKey] = useState("sk-1234567890abcdef");
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [autoAnalysis, setAutoAnalysis] = useState(true);
  const [minScore, setMinScore] = useState("75");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [webhook, setWebhook] = useState("https://hooks.slack.com/...");
  const [webhookBlurred, setWebhookBlurred] = useState(false);
  const lastValidWebhookRef = useRef("https://hooks.slack.com/...");

  const webhookInvalid =
    webhookBlurred && webhook.trim() !== "" && !isValidHttpUrl(webhook);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("codexify-theme", theme);
    } catch {
      /* ignore storage errors */
    }
  }, [theme]);

  const inputBaseClass =
    "rounded-md border border-border-default bg-surface-primary px-3 py-2 text-sm text-text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary";

  return (
    <section className="flex w-full max-w-3xl flex-col gap-8 pb-12 pt-2 sm:gap-10 sm:pt-4">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Configurações
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
          Configure as integrações e preferências da ferramenta
        </p>
      </header>

      <SettingsSectionCard title="Aparência" icon={Palette}>
        <SettingsRow
          label="Tema"
          description="Escolha entre o modo claro ou escuro"
        >
          <SettingsSelectDropdown
            value={theme}

            options={THEME_OPTIONS}
            onChange={(v) => setTheme(v as "light" | "dark")}
            ariaLabel="Selecionar tema"
            listboxId={themeListId}
          />
        </SettingsRow>
      </SettingsSectionCard>

      <SettingsSectionCard title="Configuração da IA" icon={Bot}>
        <SettingsRow
          label="Modelo de IA"
          description="Modelo utilizado para análise de código"
        >
          <SettingsSelectDropdown
            value={model}
            options={MODEL_OPTIONS}
            onChange={setModel}
            ariaLabel="Selecionar modelo de IA"
            listboxId={modelListId}
          />
        </SettingsRow>

        <SettingsRow
          label="API Key"
          description="Chave da API do provedor de IA"
        >
          <div className="flex w-full items-center gap-2 sm:max-w-md">
            <input
              type={apiKeyVisible ? "text" : "password"}
              autoComplete="off"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className={cn(inputBaseClass, "min-w-0 flex-1 font-mono")}
            />
            <button
              type="button"
              aria-label={apiKeyVisible ? "Ocultar API Key" : "Mostrar API Key"}
              aria-pressed={apiKeyVisible}
              onClick={() => setApiKeyVisible((v) => !v)}
              className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border-default bg-surface-primary text-text-primary transition-all duration-200 hover:bg-surface-subtle/70 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              {apiKeyVisible ? (
                <EyeOff className="size-4" aria-hidden="true" strokeWidth={2} />
              ) : (
                <Eye className="size-4" aria-hidden="true" strokeWidth={2} />
              )}
            </button>
          </div>
        </SettingsRow>

        <SettingsRow
          label="Análise Automática"
          description="Analisar automaticamente novos MRs que serem criados"
        >
          <SettingsSwitch
            checked={autoAnalysis}
            onCheckedChange={setAutoAnalysis}
            ariaLabel="Ativar análise automática de novos merge requests"
          />
        </SettingsRow>

        <SettingsRow
          label="Score Mínimo para Aprovação"
          description="MRs com score abaixo deste valor serão sinalizados"
        >
          <input
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={minScore}
            onChange={(e) => setMinScore(clampScore(e.target.value))}
            onBlur={() => {
              if (minScore === "") {
                setMinScore("75");
              }
            }}
            className={cn(inputBaseClass, "w-20 text-center tabular-nums")}
            aria-label="Score mínimo entre 1 e 100"
          />
        </SettingsRow>
      </SettingsSectionCard>

      <SettingsSectionCard title="Notificações" icon={Bell}>
        <SettingsRow
          label="Notificações por E-mail"
          description="Receber análises concluídas por e-mail"
        >
          <SettingsSwitch
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
            ariaLabel="Receber notificações por e-mail"
          />
        </SettingsRow>

        <SettingsRow
          label="Webhook Slack/Discord"
          description="Notificar em canal do slack quando análises forem concluídas"
        >
          <div className="w-full sm:max-w-xl">
            <input
              type="url"
              autoComplete="off"
              value={webhook}
              onChange={(e) => {
                setWebhook(e.target.value);
                setWebhookBlurred(false);
              }}
              onBlur={() => {
                setWebhookBlurred(true);
                const trimmed = webhook.trim();
                if (trimmed === "") {
                  lastValidWebhookRef.current = "";
                  return;
                }
                if (!isValidHttpUrl(webhook)) {
                  setWebhook(lastValidWebhookRef.current);
                } else {
                  lastValidWebhookRef.current = trimmed;
                }
              }}
              aria-invalid={webhookInvalid}
              className={cn(
                inputBaseClass,
                "w-full",
                webhookInvalid && "border-red-500 focus:ring-red-500",
              )}
            />
          </div>
        </SettingsRow>
      </SettingsSectionCard>
    </section>
  );
};

export default SettingsPage;
