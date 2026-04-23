import { LogOut, Mail, Trash2, User, UserRound, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import AccountInfoRow from "@/features/account/components/AccountInfoRow";

const managerEmails = [
  "joao.manager@empresa.com.br",
  "ana.coordenador@empresa.com.br",
  "carlos.director@empresa.com.br",
];

const Account = () => {
  return (
    <section className="flex w-full max-w-3xl flex-col items-center gap-7 px-4 pb-12 pt-4 text-center sm:px-0">
      <div className="flex flex-col items-center gap-5">
        <div className="flex size-24 items-center justify-center rounded-full bg-surface-subtle text-text-secondary shadow-avatar">
          <UserRound
            className="size-12"
            aria-hidden="true"
            strokeWidth={1.75}
          />
        </div>

        <h1 className="text-2xl font-semibold leading-9 text-text-primary">
          Jorge Silva
        </h1>
      </div>

      <div className="w-full rounded-lg border border-border-default bg-surface-primary p-6 text-left shadow-card">
        <h2 className="text-lg font-medium text-text-primary">
          Dados Pessoais
        </h2>

        <div className="mt-4 flex flex-col gap-6">
          <AccountInfoRow Icon={User} label="Nome Completo">
            Jorge Silva Santos
          </AccountInfoRow>

          <AccountInfoRow Icon={Mail} label="E-mail Pessoal">
            jorge.silva@empresa.com.br
          </AccountInfoRow>

          <AccountInfoRow Icon={Users} label="Gestores Vinculados aos Projetos">
            <div className="flex flex-col gap-2">
              {managerEmails.map((email) => (
                <div
                  key={email}
                  className="rounded-md bg-surface-subtle px-3 py-2 text-sm text-text-primary"
                >
                  {email}
                </div>
              ))}
            </div>
          </AccountInfoRow>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <Button
          variant="ghost"
          className="h-10 border border-border-default bg-surface-primary text-text-primary hover:bg-surface-subtle"
        >
          <Trash2 className="size-4" aria-hidden="true" strokeWidth={1.75} />
          <span>Excluir Conta</span>
        </Button>

        <Button className="h-10">
          <LogOut className="size-4" aria-hidden="true" strokeWidth={1.75} />
          <span>Sair da Conta</span>
        </Button>
      </div>
    </section>
  );
};

export default Account;
