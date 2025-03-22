type Props = {
  children: React.ReactNode;
};

export const Card = ({ children }: Props) => {
  return (
    <div className="mb-8 bg-white/60 p-5 rounded-lg border border-black/25">
      {children}
    </div>
  );
};
