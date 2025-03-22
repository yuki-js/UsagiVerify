type Props = {
  children: React.ReactNode;
};

export const Card = ({ children }: Props) => {
  return (
    <div className="mb-8 bg-white/5 p-5 rounded-lg border border-white/10">
      {children}
    </div>
  );
};
