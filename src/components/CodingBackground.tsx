import React from 'react';

export const CodingBackground: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" 
      aria-hidden="true"
    >
      {/* Base Canvas: Clean light #f5f7ff or deep dark #0a0d14 */}
      <div className="absolute inset-0 bg-[#f5f7ff] dark:bg-[#0a0d14] transition-colors duration-300" />

      {/* Subtle Grid Accent (very faint, modern) */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#5658df08_1px,transparent_1px),linear-gradient(to_bottom,#5658df08_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]"
      />

      {/* Soft Ambient Radial Indigo/Violet Glow Nodes (matching shahjalalshohag.com) */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-[#5658df]/[0.08] dark:bg-[#5658df]/[0.12] rounded-full blur-[140px]" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-purple-600/[0.05] dark:bg-purple-600/[0.09] rounded-full blur-[160px]" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-indigo-500/[0.06] dark:bg-indigo-500/[0.1] rounded-full blur-[150px]" />
    </div>
  );
};
