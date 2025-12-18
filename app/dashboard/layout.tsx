export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="p-10 flex flex-col gap-8">
        { children }
    </div>;
}