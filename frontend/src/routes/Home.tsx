import { useState } from 'preact/hooks';

interface Correction {
  original: string;
  corrected: string;
  timestamp: string;
}

export function Home() {
  const [inputText, setInputText] = useState<string>('');
  const [correctedText, setCorrectedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [corrections, setCorrections] = useState<Correction[]>([]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsLoading(true);
    setCorrectedText('');

    // Simulate AI processing delay
    setTimeout(() => {
      // Fake AI correction response
      const fakeCorrections: Correction[] = [
        {
          original: inputText,
          corrected: inputText.replace(/teh/g, 'the')
            .replace(/recieve/g, 'receive')
            .replace(/seperate/g, 'separate')
            .replace(/definately/g, 'definitely')
            .replace(/loose/g, 'lose')
            + (inputText.length > 50 ? ' This sentence has been improved for clarity and flow.' : ' Fixed common spelling errors.'),
          timestamp: new Date().toISOString()
        }
      ];

      const corrected = fakeCorrections[0].corrected;
      setCorrectedText(corrected);
      setCorrections(prev => [fakeCorrections[0], ...prev.slice(0, 4)]); // Keep last 5
      setIsLoading(false);
    }, 2000);
  };

  const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#2bb9e0] to-[#6ce3ff] py-8">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-black text-center">
            PolishPad
          </h1>
          <p className="text-xl text-black/80 text-center mt-4">
            AI-powered language correction for everyone
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Correction Interface */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Input Section */}
            <div className="bg-gradient-to-br from-[#b1d3e0]/10 to-[#6ce3ff]/5 backdrop-blur-sm border border-[#b1d3e0]/20 rounded-2xl p-6">
              <h3 className="text-2xl font-semibold text-[#6ce3ff] mb-4">
                Your Text
              </h3>
              <form onSubmit={handleSubmit}>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText((e.target as HTMLTextAreaElement).value)}
                  placeholder="Paste your text here to get AI corrections and improvements..."
                  className="w-full h-48 bg-black/50 border border-[#b1d3e0]/30 rounded-lg p-4 text-[#dcecf4] placeholder-[#dcecf4]/50 resize-none focus:outline-none focus:border-[#6ce3ff] transition-colors"
                />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-[#dcecf4]/60">
                    {inputText.length} characters
                  </span>
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isLoading}
                    className="bg-gradient-to-r from-[#2bb9e0] to-[#6ce3ff] hover:from-[#6ce3ff] hover:to-[#2bb9e0] disabled:from-gray-600 disabled:to-gray-700 text-black font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Processing...' : 'Polish Text'}
                  </button>
                </div>
              </form>
            </div>

            {/* Output Section */}
            <div className="bg-gradient-to-br from-[#b1d3e0]/10 to-[#6ce3ff]/5 backdrop-blur-sm border border-[#b1d3e0]/20 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-[#6ce3ff]">
                  Corrected Text
                </h3>
                {correctedText && (
                  <button
                    onClick={() => copyToClipboard(correctedText)}
                    className="text-[#6ce3ff] hover:text-[#2bb9e0] transition-colors"
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                )}
              </div>
              
              <div className="w-full h-48 bg-black/50 border border-[#b1d3e0]/30 rounded-lg p-4 text-[#dcecf4] overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#6ce3ff] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#6ce3ff] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-[#6ce3ff] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                ) : correctedText ? (
                  <p className="whitespace-pre-wrap">{correctedText}</p>
                ) : (
                  <p className="text-[#dcecf4]/50 italic">
                    Your corrected text will appear here...
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Recent Corrections */}
          {corrections.length > 0 && (
            <div className="bg-gradient-to-br from-[#b1d3e0]/10 to-[#6ce3ff]/5 backdrop-blur-sm border border-[#b1d3e0]/20 rounded-2xl p-6">
              <h3 className="text-2xl font-semibold text-[#6ce3ff] mb-6">
                Recent Corrections
              </h3>
              <div className="space-y-4">
                {corrections.map((correction, index) => (
                  <div key={index} className="bg-black/30 rounded-lg p-4 border border-[#b1d3e0]/10">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-[#6ce3ff] mb-2">Original:</h4>
                        <p className="text-[#dcecf4]/80 text-sm">{correction.original}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#6ce3ff] mb-2">Corrected:</h4>
                        <p className="text-[#dcecf4] text-sm">{correction.corrected}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#b1d3e0]/10">
                      <span className="text-xs text-[#dcecf4]/60">
                        {new Date(correction.timestamp).toLocaleString()}
                      </span>
                      <button
                        onClick={() => copyToClipboard(correction.corrected)}
                        className="text-xs text-[#6ce3ff] hover:text-[#2bb9e0] transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-[#b1d3e0]/5 border border-[#b1d3e0]/20 rounded-xl p-6 hover:bg-[#b1d3e0]/10 transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#6ce3ff] to-[#2bb9e0] rounded-lg mb-4 flex items-center justify-center mx-auto">
                <span className="text-black font-bold text-xl">🤖</span>
              </div>
              <h4 className="text-xl font-semibold text-[#6ce3ff] mb-3">AI-Powered</h4>
              <p className="text-[#dcecf4]/80">Advanced language models for accurate corrections.</p>
            </div>

            <div className="bg-[#b1d3e0]/5 border border-[#b1d3e0]/20 rounded-xl p-6 hover:bg-[#b1d3e0]/10 transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#6ce3ff] to-[#2bb9e0] rounded-lg mb-4 flex items-center justify-center mx-auto">
                <span className="text-black font-bold text-xl">⚡</span>
              </div>
              <h4 className="text-xl font-semibold text-[#6ce3ff] mb-3">Fast</h4>
              <p className="text-[#dcecf4]/80">Get corrections in seconds, not minutes.</p>
            </div>

            <div className="bg-[#b1d3e0]/5 border border-[#b1d3e0]/20 rounded-xl p-6 hover:bg-[#b1d3e0]/10 transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#6ce3ff] to-[#2bb9e0] rounded-lg mb-4 flex items-center justify-center mx-auto">
                <span className="text-black font-bold text-xl">🌍</span>
              </div>
              <h4 className="text-xl font-semibold text-[#6ce3ff] mb-3">Multi-Language</h4>
              <p className="text-[#dcecf4]/80">Support for multiple languages and dialects.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#b1d3e0]/5 border-t border-[#b1d3e0]/20 py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[#dcecf4]/60">
            Built with ❤️ using Preact and TailwindCSS
          </p>
        </div>
      </footer>
    </div>
  );
}