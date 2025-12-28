# Topic Detail Page Architecture

## Overview

This document outlines the architecture for individual DSA topic pages. Each topic page provides comprehensive coverage of a data structure or algorithm with interactive visualizations.

## Design Decisions

### Data Storage
- **Local JS objects** — Content stored in `src/data/topics/` as JavaScript modules
- No database required for static educational content
- Each topic file exports a structured object following a consistent schema

### Dynamic Routing
- Single `TopicDetail.jsx` component handles all topics
- Route: `/topics/:slug` where slug matches topic (e.g., `arrays`, `linked-lists`)
- Content loaded based on URL parameter

### Code Examples
- JavaScript and Python implementations only
- Display-only code blocks (no in-browser execution)
- Syntax highlighting with language tabs

### Visualizations
- Predefined examples (user input to be added later)
- SVG-based for simple structures, Canvas for complex ones
- Step-through controls: play, pause, step forward/back, reset, speed control

## Topic Data Schema

```javascript
{
  meta: {
    slug: string,           // URL-friendly identifier
    name: string,           // Display name
    category: string,       // 'Data Structures' | 'Algorithms'
    icon: string,           // Icon character
    complexity: {
      time: string,         // e.g., 'O(1) access'
      space: string         // e.g., 'O(n)'
    },
    description: string     // Brief description
  },

  overview: {
    what: string,           // What it is
    why: string,            // Why it matters
    realWorld: string[]     // Real-world examples
  },

  operations: [
    {
      name: string,         // e.g., 'Access'
      description: string,
      timeComplexity: string,
      spaceComplexity: string,
      code: {
        javascript: string,
        python: string
      },
      visualization: {
        steps: []           // Animation step definitions
      }
    }
  ],

  codeExamples: {
    javascript: string,     // Full implementation
    python: string
  },

  useCases: [
    {
      title: string,
      description: string
    }
  ],

  commonMistakes: [
    {
      mistake: string,
      correction: string
    }
  ],

  relatedTopics: string[],  // Slugs of related topics

  visualization: {
    initialState: any,      // Starting data for visualization
    controls: string[]      // Available control actions
  }
}
```

## File Structure

```
src/
├── data/
│   └── topics/
│       ├── index.js              # Topic registry and lookup
│       └── arrays.js             # Arrays topic data
├── components/
│   ├── TopicDetail/
│   │   ├── TopicDetail.jsx       # Main page component
│   │   ├── TopicDetail.css
│   │   ├── TopicOverview.jsx     # Overview section
│   │   ├── TopicOperations.jsx   # Operations table
│   │   ├── CodeBlock.jsx         # Syntax-highlighted code
│   │   └── LanguageTabs.jsx      # JS/Python switcher
│   └── visualizations/
│       └── ArrayVisualization.jsx
├── pages/
│   └── TopicDetail.jsx           # Route handler (or in components)
```

## Page Sections

1. **Header** — Topic name, category badge, complexity badges
2. **Overview** — What, why, real-world applications
3. **Visualization** — Interactive step-through demonstration
4. **Operations** — Table with complexity + expandable code/visualization
5. **Full Implementation** — Complete code with JS/Python tabs
6. **Use Cases** — Practical applications
7. **Common Mistakes** — Pitfalls and corrections
8. **Related Topics** — Links to connected concepts

## Visualization Controls

- Play/Pause — Auto-advance through steps
- Step Forward/Back — Manual navigation
- Reset — Return to initial state
- Speed — Adjust animation speed (0.5x, 1x, 2x)

## Future Enhancements

- [ ] User data input for visualizations
- [ ] Runnable code blocks
- [ ] Progress tracking
- [ ] Practice problems
- [ ] Search across topics
