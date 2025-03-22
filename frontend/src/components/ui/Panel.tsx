type Props = {
  children: React.ReactNode;
};

export const Panel = ({ children }: Props) => {
  return (
    <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg p-6 relative z-10">
      {children}
    </div>
  );
};
