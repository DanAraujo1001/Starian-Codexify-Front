// Projeto: Starian - Desenvolvido pelo Squad 07
// Tela: Cadastro de Projeto — Variação A (Dados do Gestor)

import { useState, FormEvent } from "react";
import {
  ArrowLeft,
  FolderPlus,
  GitBranch,
  FileText,
  Plus,
  ArrowRight,
  Info,
  User,
  Mail,
  FloppyDisk,
  EnvelopeSimple,
  CheckCircle,
} from "@phosphor-icons/react";

/* ── Types ─────────────────────────────────────────── */
interface FormData {
  nomeProjeto: string;
  repositorio: string;
  urlRepo: string;
  regraDeNegocio: string;
  gestor: {
    nome: string;
    email: string;
  };
}

interface FormErrors {
  nomeProjeto?: string;
  gestorNome?: string;
  gestorEmail?: string;
}

/* ── Component ─────────────────────────────────────── */
export default function CadastroProjetoGestor() {
  const [formData, setFormData] = useState<FormData>({
    nomeProjeto: "",
    repositorio: "",
    urlRepo: "",
    regraDeNegocio: "padrao",
    gestor: { nome: "", email: "" },
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showToast, setShowToast] = useState(false);

  /* ── Validation ── */
  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.nomeProjeto.trim())
      newErrors.nomeProjeto = "O nome do projeto é obrigatório.";

    if (!formData.gestor.nome.trim())
      newErrors.gestorNome = "O nome do gestor é obrigatório.";

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.gestor.email);
    if (!formData.gestor.email.trim() || !emailOk)
      newErrors.gestorEmail = "Informe um e-mail válido.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  /* ── Submit ── */
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) {
      console.warn("⚠️ [Starian / Squad 07] Formulário inválido.");
      return;
    }
    const payload = { ...formData, timestamp: new Date().toISOString() };
    console.log(
      "🚀 [Starian / Squad 07] POST /api/projects",
      JSON.stringify(payload, null, 2)
    );
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }

  /* ── Cancel ── */
  function handleCancel() {
    if (confirm("Deseja cancelar o cadastro? As alterações não serão salvas.")) {
      setFormData({
        nomeProjeto: "",
        repositorio: "",
        urlRepo: "",
        regraDeNegocio: "padrao",
        gestor: { nome: "", email: "" },
      });
      setErrors({});
    }
  }

  /* ── Input helper ── */
  const inputClass = (hasError?: string) =>
    `w-full bg-[#0d1626] border rounded-lg px-3.5 py-2.5 text-sm text-slate-100
     placeholder:text-[#344c66] outline-none transition-all duration-200
     focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25
     ${hasError
       ? "border-red-500 ring-2 ring-red-500/20"
       : "border-[#1c2d44] hover:border-[#26384f]"
     }`;

  return (
    <div
      className="min-h-screen bg-[#0b1120] text-slate-100 px-5 py-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.013) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.013) 1px,transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      <div className="max-w-[760px] mx-auto pb-20">

        {/* ── Back ── */}
        <button
          type="button"
          onClick={() => history.back()}
          className="flex items-center gap-1.5 text-slate-400 text-sm font-medium
                     hover:text-slate-100 transition-all duration-200 hover:-translate-x-0.5"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>

        {/* ── Page Header ── */}
        <header className="mt-6 mb-8">
          <h1 className="flex items-center gap-2.5 text-[1.7rem] font-bold leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}>
            <FolderPlus size={28} weight="duotone" className="text-blue-500" />
            Cadastro de Projeto
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            Configure seu novo projeto e defina as regras de negócio
          </p>
        </header>

        <form onSubmit={handleSubmit} noValidate>

          {/* ════════════════════════════════════════
              CARD 1 · Informações do Projeto
          ════════════════════════════════════════ */}
          <section className="bg-[#111827] border border-[#1c2d44] rounded-2xl p-6 mb-5
                              shadow-[0_4px_36px_rgba(0,0,0,.55)] hover:border-[#26384f]
                              transition-colors duration-200">
            <p className="font-bold text-base mb-0.5" style={{ fontFamily: "'Syne',sans-serif" }}>
              Informações do Projeto
            </p>
            <p className="text-xs text-slate-400 mb-5">Dados básicos e vínculo com repositório</p>

            {/* Nome */}
            <div className="mb-4">
              <label className="block text-[0.72rem] font-semibold text-slate-400
                                uppercase tracking-widest mb-2">
                Nome do Projeto <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.nomeProjeto}
                onChange={(e) => {
                  setFormData((p) => ({ ...p, nomeProjeto: e.target.value }));
                  if (errors.nomeProjeto) setErrors((p) => ({ ...p, nomeProjeto: undefined }));
                }}
                placeholder="Digite o nome do projeto"
                className={inputClass(errors.nomeProjeto)}
              />
              {errors.nomeProjeto && (
                <p className="text-xs text-red-400 mt-1.5">{errors.nomeProjeto}</p>
              )}
            </div>

            {/* Repositório */}
            <div className="mb-4">
              <p className="flex items-center gap-1.5 text-[0.72rem] font-semibold
                            text-slate-400 uppercase tracking-widest mb-2">
                <GitBranch size={14} className="text-[#344c66]" />
                Vincular Repositório
              </p>
              <div className="relative">
                <select
                  value={formData.repositorio}
                  onChange={(e) => setFormData((p) => ({ ...p, repositorio: e.target.value }))}
                  className="w-full bg-[#0d1626] border border-[#1c2d44] rounded-lg px-3.5 py-2.5
                             text-sm text-slate-100 outline-none appearance-none cursor-pointer
                             hover:border-[#26384f] focus:border-blue-500 focus:ring-2
                             focus:ring-blue-500/25 transition-all duration-200"
                >
                  <option value="">Selecione o tipo de repositório</option>
                  <option value="github">GitHub</option>
                  <option value="gitlab">GitLab</option>
                  <option value="bitbucket">Bitbucket</option>
                  <option value="azure">Azure DevOps</option>
                </select>
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2
                                 border-l-[5px] border-r-[5px] border-t-[5px]
                                 border-l-transparent border-r-transparent border-t-[#344c66]" />
              </div>
            </div>

            {/* URL */}
            <div>
              <label className="block text-[0.72rem] font-semibold text-slate-400
                                uppercase tracking-widest mb-2">URL</label>
              <input
                type="text"
                value={formData.urlRepo}
                onChange={(e) => setFormData((p) => ({ ...p, urlRepo: e.target.value }))}
                placeholder="github.com/usuario/projeto"
                className={inputClass()}
              />
            </div>
          </section>

          {/* ════════════════════════════════════════
              CARD 2 · Regras de Negócio
          ════════════════════════════════════════ */}
          <section className="bg-[#111827] border border-[#1c2d44] rounded-2xl p-6 mb-5
                              shadow-[0_4px_36px_rgba(0,0,0,.55)] hover:border-[#26384f]
                              transition-colors duration-200">
            <p className="font-bold text-base mb-0.5" style={{ fontFamily: "'Syne',sans-serif" }}>
              Regras de Negócio
            </p>
            <p className="text-xs text-slate-400 mb-5">Configure as regras que serão aplicadas no projeto</p>

            {/* Regras */}
            <div className="mb-4">
              <p className="flex items-center gap-1.5 text-[0.72rem] font-semibold
                            text-slate-400 uppercase tracking-widest mb-2">
                <FileText size={14} className="text-[#344c66]" />
                Regras Pré-cadastradas
              </p>
              <div className="relative">
                <select
                  value={formData.regraDeNegocio}
                  onChange={(e) => setFormData((p) => ({ ...p, regraDeNegocio: e.target.value }))}
                  className="w-full bg-[#0d1626] border border-[#1c2d44] rounded-lg px-3.5 py-2.5
                             text-sm text-slate-100 outline-none appearance-none cursor-pointer
                             hover:border-[#26384f] focus:border-blue-500 focus:ring-2
                             focus:ring-blue-500/25 transition-all duration-200"
                >
                  <option value="padrao">Regra Padrão</option>
                  <option value="custom">Regra Personalizada</option>
                  <option value="none">Nenhuma</option>
                </select>
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2
                                 border-l-[5px] border-r-[5px] border-t-[5px]
                                 border-l-transparent border-r-transparent border-t-[#344c66]" />
              </div>
            </div>

            <p className="text-sm text-slate-400 mb-3">Deseja gerenciar as regras cadastradas?</p>

            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {[
                { icon: <Plus size={15} />, label: "Nova Regra" },
                { icon: <ArrowRight size={15} />, label: "Ir para as regras" },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg
                             border border-[#1c2d44] text-slate-400 text-sm font-medium
                             hover:border-blue-500 hover:text-slate-100 hover:bg-blue-500/[.07]
                             transition-all duration-200"
                >
                  {icon} {label}
                </button>
              ))}
            </div>

            {/* Alert */}
            <div className="flex items-start gap-2.5 bg-blue-500/10 border border-blue-500/25
                            rounded-lg p-3 text-[0.8rem] text-blue-300 leading-relaxed">
              <Info size={15} weight="fill" className="flex-shrink-0 mt-0.5" />
              As regras selecionadas serão aplicadas automaticamente em todas as requisições do projeto.
            </div>
          </section>

          {/* ════════════════════════════════════════
              CARD 3 · Dados do Gestor
          ════════════════════════════════════════ */}
          <section className="bg-[#111827] border border-[#1c2d44] rounded-2xl p-6 mb-5
                              shadow-[0_4px_36px_rgba(0,0,0,.55)] hover:border-[#26384f]
                              transition-colors duration-200">
            <p className="font-bold text-base mb-0.5" style={{ fontFamily: "'Syne',sans-serif" }}>
              Dados do Gestor
            </p>
            <p className="text-xs text-slate-400 mb-5">Responsável por receber os relatórios do projeto</p>

            {/* Nome do Gestor */}
            <div className="mb-4">
              <label className="flex items-center gap-1.5 text-[0.72rem] font-semibold
                                text-slate-400 uppercase tracking-widest mb-2">
                <User size={13} className="text-[#344c66]" />
                Nome do Gestor <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.gestor.nome}
                onChange={(e) => {
                  setFormData((p) => ({ ...p, gestor: { ...p.gestor, nome: e.target.value } }));
                  if (errors.gestorNome) setErrors((p) => ({ ...p, gestorNome: undefined }));
                }}
                placeholder="Digite o nome completo do gestor"
                className={inputClass(errors.gestorNome)}
              />
              {errors.gestorNome && (
                <p className="text-xs text-red-400 mt-1.5">{errors.gestorNome}</p>
              )}
            </div>

            {/* Email do Gestor */}
            <div className="mb-5">
              <label className="flex items-center gap-1.5 text-[0.72rem] font-semibold
                                text-slate-400 uppercase tracking-widest mb-2">
                <Mail size={13} className="text-[#344c66]" />
                E-mail do Gestor <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={formData.gestor.email}
                onChange={(e) => {
                  setFormData((p) => ({ ...p, gestor: { ...p.gestor, email: e.target.value } }));
                  if (errors.gestorEmail) setErrors((p) => ({ ...p, gestorEmail: undefined }));
                }}
                placeholder="gestor@empresa.com.br"
                className={inputClass(errors.gestorEmail)}
              />
              {errors.gestorEmail && (
                <p className="text-xs text-red-400 mt-1.5">{errors.gestorEmail}</p>
              )}
            </div>

            {/* Notification card */}
            <div className="flex items-start gap-3 bg-[#0d1626]/70 border border-[#1c2d44]
                            rounded-lg p-4">
              <div className="w-9 h-9 rounded-lg bg-blue-500/[.18] flex items-center
                              justify-center flex-shrink-0">
                <EnvelopeSimple size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-100">Relatórios por E-mail</p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  O gestor receberá por e-mail todos os relatórios das requisições analisadas
                  no projeto, incluindo métricas, logs e alertas.
                </p>
              </div>
            </div>
          </section>

          {/* ── Footer ── */}
          <div className="flex justify-end items-center gap-3 pt-5
                          border-t border-[#1c2d44] mt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2.5 rounded-lg border border-[#1c2d44] text-slate-400
                         text-sm font-medium hover:border-[#3d5c80] hover:text-slate-100
                         transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600
                         text-white text-sm font-semibold hover:bg-blue-700
                         hover:-translate-y-px shadow-[0_4px_16px_rgba(37,99,235,.3)]
                         hover:shadow-[0_6px_22px_rgba(37,99,235,.4)]
                         transition-all duration-200 active:translate-y-0"
            >
              <FloppyDisk size={16} weight="bold" />
              Cadastrar Projeto
            </button>
          </div>

        </form>
      </div>

      {/* ── Toast ── */}
      <div
        className={`fixed bottom-6 right-6 flex items-center gap-2.5 px-4 py-3.5
                    bg-[#081a0f] border border-green-500 rounded-xl text-green-400
                    text-sm font-medium shadow-[0_8px_30px_rgba(0,0,0,.55)]
                    transition-all duration-300
                    ${showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"}`}
      >
        <CheckCircle size={18} weight="fill" />
        Projeto cadastrado com sucesso!
      </div>
    </div>
  );
}
