export default function Footer() {
  return (
    <footer className="border-t border-hairline px-5 py-8">
      <div className="mx-auto max-w-[720px]">
        <p className="font-mono text-[12px] tracking-[0.04em] text-muted">
          © {new Date().getFullYear()} Vincent Munene
        </p>
      </div>
    </footer>
  );
}
