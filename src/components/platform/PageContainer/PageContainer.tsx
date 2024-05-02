export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="p-4 sm:p-8 w-full min-h-[calc(100dvh-56px)] bg-muted/50 flex flex-col gap-4 overflow-auto items-center">
      {children}
    </article>
  );
};
