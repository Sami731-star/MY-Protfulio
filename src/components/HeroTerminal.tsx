import React, { useState } from 'react';
import { Terminal, Code2, Database, Sparkles, Check, Copy, Play, RefreshCw, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const HeroTerminal: React.FC = () => {
  const { personal } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'profile' | 'cpp' | 'stack' | 'cli'>('profile');
  const [copied, setCopied] = useState(false);
  const [cliOutput, setCliOutput] = useState<string[]>([]);
  const [activeCommand, setActiveCommand] = useState<string | null>(null);

  const profileJson = `{
  "name": "${personal.name}",
  "status": "Undergraduate Student",
  "university": "${personal.university}",
  "department": "${personal.department}",
  "location": "${personal.location}",
  "interests": [
    "Web Engineering",
    "Backend & MySQL",
    "Algorithmic Problem Solving",
    "Applied AI Systems"
  ],
  "learning": [
    "Modern React",
    "Full-Stack Architecture",
    "RESTful API Design"
  ]
}`;

  const cppCode = `// Problem Solving Foundation in C++
#include <iostream>
#include <vector>
#include <string>

struct Developer {
    std::string name = "${personal.name}";
    std::string university = "${personal.university}";
    bool is_passionate = true;

    void build() {
        std::cout << "Creating clean, functional software\\n";
    }
};

int main() {
    Developer sami;
    sami.build();
    return 0;
}`;

  const stackCode = `# Core Technical Matrix
languages:  [C, C++, PHP, JavaScript, SQL]
frontend:   [React, Tailwind CSS, Modern HTML/CSS]
backend:    [PHP, MySQL, REST APIs, Session Auth]
tools:      [Git, GitHub, VS Code, XAMPP]
mindset:    "Build practical software. Normalize schemas. Keep learning."`;

  const runCliCommand = (cmd: string) => {
    setActiveCommand(cmd);
    if (cmd === 'sami --status') {
      setCliOutput([
        '$ sami --status',
        '✓ Status: Active CSE Undergraduate Student',
        `✓ University: ${personal.university}`,
        `✓ Location: ${personal.location}`,
        '✓ Open to: Internship, Junior Roles & Open Source'
      ]);
    } else if (cmd === 'sami --skills') {
      setCliOutput([
        '$ sami --skills',
        '✓ Languages: C, C++, PHP, JavaScript, SQL',
        '✓ Frameworks: React, Tailwind CSS, Node.js',
        '✓ Databases: MySQL, Relational Schema Design',
        '✓ Focus: Problem Solving & Backend Engineering'
      ]);
    } else if (cmd === 'sami --contact') {
      setCliOutput([
        '$ sami --contact',
        `✓ Email: ${personal.email}`,
        `✓ GitHub: ${personal.github}`,
        '✓ Response Time: Within 24 hours'
      ]);
    } else if (cmd === 'clear') {
      setCliOutput([]);
      setActiveCommand(null);
    }
  };

  const getCurrentCode = () => {
    switch (activeTab) {
      case 'profile':
        return profileJson;
      case 'cpp':
        return cppCode;
      case 'stack':
        return stackCode;
      case 'cli':
        return cliOutput.join('\n');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-cyan-500/30 bg-[#0b0e14]/95 light:bg-slate-900 text-slate-300 shadow-2xl overflow-hidden font-mono text-xs sm:text-[13px] leading-relaxed transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-500/10">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-3 bg-[#07090e] border-b border-slate-800 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block shadow-sm" />
          </div>
          <span className="text-[11px] text-slate-400 font-sans tracking-wide ml-2 hidden sm:inline flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>sami@uttara-cse ~ workspace</span>
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-2.5 py-1 rounded text-[11px] transition-all ${
              activeTab === 'profile'
                ? 'bg-slate-800 text-cyan-400 font-medium shadow-sm border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            profile.json
          </button>
          <button
            onClick={() => setActiveTab('cpp')}
            className={`px-2.5 py-1 rounded text-[11px] transition-all ${
              activeTab === 'cpp'
                ? 'bg-slate-800 text-cyan-400 font-medium shadow-sm border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            main.cpp
          </button>
          <button
            onClick={() => setActiveTab('stack')}
            className={`px-2.5 py-1 rounded text-[11px] transition-all ${
              activeTab === 'stack'
                ? 'bg-slate-800 text-cyan-400 font-medium shadow-sm border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            stack.yml
          </button>
          <button
            onClick={() => {
              setActiveTab('cli');
              if (cliOutput.length === 0) {
                runCliCommand('sami --status');
              }
            }}
            className={`px-2.5 py-1 rounded text-[11px] transition-all flex items-center gap-1 ${
              activeTab === 'cli'
                ? 'bg-cyan-500/20 text-cyan-300 font-medium shadow-sm border border-cyan-400/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Play className="w-2.5 h-2.5 text-cyan-400" />
            <span>cli.sh</span>
          </button>

          <button
            onClick={handleCopy}
            className="ml-2 p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Copy code snippet"
            aria-label="Copy code snippet"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="p-4 sm:p-5 overflow-x-auto min-h-[300px] max-h-[390px] scrollbar-thin scrollbar-thumb-slate-800 bg-[#090c12]">
        <pre className="text-slate-300 font-mono text-xs sm:text-[13px] leading-relaxed">
          <code>
            {activeTab === 'profile' && (
              <>
                <span className="text-slate-600 select-none">1 </span> &#123;{'\n'}
                <span className="text-slate-600 select-none">2 </span>   <span className="text-cyan-400">"name"</span>: <span className="text-emerald-300">"{personal.name}"</span>,{'\n'}
                <span className="text-slate-600 select-none">3 </span>   <span className="text-cyan-400">"status"</span>: <span className="text-emerald-300">"Undergraduate CSE Student"</span>,{'\n'}
                <span className="text-slate-600 select-none">4 </span>   <span className="text-cyan-400">"institution"</span>: <span className="text-emerald-300">"{personal.university}"</span>,{'\n'}
                <span className="text-slate-600 select-none">5 </span>   <span className="text-cyan-400">"department"</span>: <span className="text-emerald-300">"{personal.department}"</span>,{'\n'}
                <span className="text-slate-600 select-none">6 </span>   <span className="text-cyan-400">"location"</span>: <span className="text-emerald-300">"{personal.location}"</span>,{'\n'}
                <span className="text-slate-600 select-none">7 </span>   <span className="text-cyan-400">"focus"</span>: [<span className="text-amber-300">"Web Systems"</span>, <span className="text-amber-300">"PHP/MySQL"</span>, <span className="text-amber-300">"React"</span>, <span className="text-amber-300">"Problem Solving"</span>],{'\n'}
                <span className="text-slate-600 select-none">8 </span>   <span className="text-cyan-400">"availableFor"</span>: <span className="text-emerald-300">"Software Projects &amp; Roles"</span>{'\n'}
                <span className="text-slate-600 select-none">9 </span> &#125;<span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-1 animate-pulse align-middle" />
              </>
            )}

            {activeTab === 'cpp' && (
              <>
                <span className="text-slate-600 select-none">1 </span> <span className="text-slate-500">// Problem Solving Foundation in C++</span>{'\n'}
                <span className="text-slate-600 select-none">2 </span> <span className="text-purple-400">#include</span> <span className="text-emerald-300">&lt;iostream&gt;</span>{'\n'}
                <span className="text-slate-600 select-none">3 </span> <span className="text-purple-400">#include</span> <span className="text-emerald-300">&lt;vector&gt;</span>{'\n'}
                <span className="text-slate-600 select-none">4 </span> <span className="text-purple-400">#include</span> <span className="text-emerald-300">&lt;string&gt;</span>{'\n'}
                <span className="text-slate-600 select-none">5 </span> {'\n'}
                <span className="text-slate-600 select-none">6 </span> <span className="text-blue-400">struct</span> <span className="text-amber-300">Developer</span> &#123;{'\n'}
                <span className="text-slate-600 select-none">7 </span>     std::string name = <span className="text-emerald-300">"{personal.name}"</span>;{'\n'}
                <span className="text-slate-600 select-none">8 </span>     std::string degree = <span className="text-emerald-300">"B.Sc. in CSE"</span>;{'\n'}
                <span className="text-slate-600 select-none">9 </span>     <span className="text-blue-400">bool</span> passionate = <span className="text-orange-400">true</span>;{'\n'}
                <span className="text-slate-600 select-none">10</span> {'\n'}
                <span className="text-slate-600 select-none">11</span>     <span className="text-cyan-400">void</span> <span className="text-blue-300">build</span>() &#123;{'\n'}
                <span className="text-slate-600 select-none">12</span>         std::cout &lt;&lt; <span className="text-emerald-300">"Writing clean, reliable code daily\\n"</span>;{'\n'}
                <span className="text-slate-600 select-none">13</span>     &#125;{'\n'}
                <span className="text-slate-600 select-none">14</span> &#125;;{'\n'}
                <span className="text-slate-600 select-none">15</span> {'\n'}
                <span className="text-slate-600 select-none">16</span> <span className="text-blue-400">int</span> <span className="text-cyan-400">main</span>() &#123;{'\n'}
                <span className="text-slate-600 select-none">17</span>     <span className="text-amber-300">Developer</span> sami;{'\n'}
                <span className="text-slate-600 select-none">18</span>     sami.build();{'\n'}
                <span className="text-slate-600 select-none">19</span>     <span className="text-purple-400">return</span> <span className="text-orange-400">0</span>;{'\n'}
                <span className="text-slate-600 select-none">20</span> &#125;<span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-1 animate-pulse align-middle" />
              </>
            )}

            {activeTab === 'stack' && (
              <>
                <span className="text-slate-600 select-none">1 </span> <span className="text-slate-500"># Core Technical Stack &amp; Architecture</span>{'\n'}
                <span className="text-slate-600 select-none">2 </span> <span className="text-cyan-400">languages:</span>  <span className="text-emerald-300">[C, C++, PHP, JavaScript, TypeScript, SQL]</span>{'\n'}
                <span className="text-slate-600 select-none">3 </span> <span className="text-cyan-400">frontend:</span>   <span className="text-emerald-300">[React, Tailwind CSS, Modern HTML/CSS]</span>{'\n'}
                <span className="text-slate-600 select-none">4 </span> <span className="text-cyan-400">backend:</span>    <span className="text-emerald-300">[PHP, MySQL, REST APIs, Session Auth]</span>{'\n'}
                <span className="text-slate-600 select-none">5 </span> <span className="text-cyan-400">tools:</span>      <span className="text-emerald-300">[Git, GitHub, VS Code, XAMPP, Figma]</span>{'\n'}
                <span className="text-slate-600 select-none">6 </span> <span className="text-cyan-400">location:</span>   <span className="text-amber-300">"Dhaka, Bangladesh"</span>{'\n'}
                <span className="text-slate-600 select-none">7 </span> <span className="text-cyan-400">degree:</span>     <span className="text-amber-300">"B.Sc. in CSE • Uttara University"</span>{'\n'}
                <span className="text-slate-600 select-none">8 </span> <span className="text-cyan-400">philosophy:</span> <span className="text-emerald-300">"Build practical tools. Solve real problems."</span><span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-1 animate-pulse align-middle" />
              </>
            )}

            {activeTab === 'cli' && (
              <div className="space-y-3">
                <div className="text-slate-400 text-xs">
                  <span className="text-emerald-400">guest@sami-portfolio</span>:<span className="text-cyan-400">~</span>$ Click a command to execute:
                </div>

                {/* Quick Interactive Command Buttons */}
                <div className="flex flex-wrap gap-2 pt-1 pb-2">
                  <button
                    onClick={() => runCliCommand('sami --status')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500/20 text-cyan-300 text-[11px] border border-slate-700 hover:border-cyan-400 transition-colors"
                  >
                    sami --status
                  </button>
                  <button
                    onClick={() => runCliCommand('sami --skills')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500/20 text-cyan-300 text-[11px] border border-slate-700 hover:border-cyan-400 transition-colors"
                  >
                    sami --skills
                  </button>
                  <button
                    onClick={() => runCliCommand('sami --contact')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500/20 text-cyan-300 text-[11px] border border-slate-700 hover:border-cyan-400 transition-colors"
                  >
                    sami --contact
                  </button>
                  <button
                    onClick={() => runCliCommand('clear')}
                    className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 text-[11px] border border-slate-800 transition-colors"
                  >
                    clear
                  </button>
                </div>

                {/* Output Terminal Stream */}
                {cliOutput.length > 0 && (
                  <div className="p-3 rounded-lg bg-black/60 border border-slate-800/80 space-y-1">
                    {cliOutput.map((line, i) => (
                      <div 
                        key={i} 
                        className={line.startsWith('$') ? 'text-cyan-400 font-bold' : line.includes('✓') ? 'text-emerald-300' : 'text-slate-300'}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center text-xs text-slate-400 pt-1">
                  <span className="text-emerald-400 mr-2">guest@sami-portfolio:~$</span>
                  <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse" />
                </div>
              </div>
            )}
          </code>
        </pre>
      </div>

      {/* Terminal Footer */}
      <div className="px-4 py-2.5 bg-[#07090e] border-t border-slate-800/90 flex items-center justify-between text-[11px] text-slate-400 select-none">
        <div className="flex items-center gap-3 font-mono">
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            LIVE COMPILED
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="text-cyan-400">Node.js + C++20</span>
        </div>
        <div className="text-slate-400 font-mono text-[11px]">
          {activeTab === 'cli' ? 'Click buttons to execute' : 'Interactive Dev Editor'}
        </div>
      </div>
    </div>
  );
};
