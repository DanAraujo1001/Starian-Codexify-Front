import { type FC } from "react";
import { Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";

interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const consequences = [
  "Todos os seus dados pessoais",
  "Acesso aos projetos vinculados",
  "Histórico de atividades",
  "Configurações personalizadas",
];

const DeleteUserModal: FC<DeleteUserModalProps> = ({ open, onClose, onConfirm }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-account-title"
        aria-describedby="delete-account-description"
        className="w-full max-w-xl rounded-2xl bg-surface-primary p-6 shadow-2xl ring-1 ring-border-default"
      >
        <div className="flex w-full items-center justify-center text-text-primary">
          <span className="text-lg font-semibold" id="delete-account-title">
            Excluir conta
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-text-secondary" id="delete-account-description">
          <strong className="font-semibold text-text-primary">Esta ação é irreversível.</strong> Ao excluir sua conta,
          você perderá acesso imediato aos dados e projetos vinculados.
        </p>

        <ul className="mt-6 space-y-3 text-sm text-text-secondary">
          {consequences.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="inline-block h-px w-4 rounded-full bg-current" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm font-medium text-text-primary">Tem certeza que deseja continuar?</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            className="h-11 w-full sm:w-auto px-6"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            className="h-11 w-full sm:w-auto px-6"
            onClick={onConfirm}
          >
            Confirmar Exclusão
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
