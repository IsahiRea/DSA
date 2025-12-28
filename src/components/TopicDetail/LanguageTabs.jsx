import { useState } from 'react'
import CodeBlock from './CodeBlock'

function LanguageTabs({ code, languages = ['javascript', 'python'] }) {
  const [activeLanguage, setActiveLanguage] = useState(languages[0])

  const languageLabels = {
    javascript: 'JavaScript',
    python: 'Python'
  }

  return (
    <div className="language-tabs">
      <div className="language-tabs__header">
        {languages.map((lang) => (
          <button
            key={lang}
            className={`language-tabs__tab ${activeLanguage === lang ? 'language-tabs__tab--active' : ''}`}
            onClick={() => setActiveLanguage(lang)}
          >
            <span className="language-tabs__tab-indicator"></span>
            {languageLabels[lang] || lang}
          </button>
        ))}
      </div>
      <CodeBlock
        code={code[activeLanguage]}
        language={activeLanguage}
      />
    </div>
  )
}

export default LanguageTabs
