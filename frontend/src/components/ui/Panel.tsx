type Props = {
  children: React.ReactNode;
};

/**
 * Panel component
 */
export const Panel = ({ children }: Props) => {
  return (
    <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md border border-black/25 rounded-lg shadow-lg p-6 relative z-10 text-gray-900">
      {children}
    </div>
  );
};
