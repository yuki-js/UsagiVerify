type Props = {
  children: React.ReactNode;
};

/**
 * Screen component
 */
export const Screen = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-900 text-white p-4">
      {/* 背景効果 */}
      <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-blue-400 opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-indigo-300 opacity-20 blur-xl"></div>

      {/* メインコンテンツ */}
      {children}
    </div>
  );
};
