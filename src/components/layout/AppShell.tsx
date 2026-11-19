import { Logo } from "@/components/ui/Logo";

/**
 * Moldura visual da aplicação: um cabeçalho escuro com o logo e a área de conteúdo.
 * Sem barra lateral e sem perfil de usuário — nesta etapa o usuário ainda está
 * se credenciando e não tem acesso a outras áreas do sistema.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh flex-col">
      <header className="flex h-16 shrink-0 items-center bg-navy-900 px-4 sm:px-6">
        <Logo />
      </header>
      <main className="min-h-0 flex-1 px-3 pb-3 sm:px-4 sm:pb-4 lg:px-6 lg:pb-6">{children}</main>
    </div>
  );
}
