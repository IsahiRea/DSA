import { useState, useEffect, useRef, useCallback } from 'react'
import './ArrayVisualization.css'

const OPERATIONS = {
  access: {
    name: 'Access',
    description: 'Accessing element at index 2',
    steps: [
      { action: 'highlight', index: 2, message: 'Calculate memory address: base + (index × size)', phase: 'calculate' },
      { action: 'select', index: 2, message: 'Direct access to arr[2]', phase: 'access' },
      { action: 'complete', index: 2, message: 'Value retrieved: 12 — O(1) time', phase: 'complete' },
    ]
  },
  search: {
    name: 'Search',
    description: 'Linear search for value 22',
    steps: [
      { action: 'scan', index: 0, message: 'Check index 0: 64 ≠ 22', phase: 'compare' },
      { action: 'scan', index: 1, message: 'Check index 1: 25 ≠ 22', phase: 'compare' },
      { action: 'scan', index: 2, message: 'Check index 2: 12 ≠ 22', phase: 'compare' },
      { action: 'found', index: 3, message: 'Check index 3: 22 = 22 — Found!', phase: 'found' },
      { action: 'complete', index: 3, message: 'Element found at index 3 — O(n) time', phase: 'complete' },
    ]
  },
  insert: {
    name: 'Insert',
    description: 'Insert value 17 at index 2',
    steps: [
      { action: 'highlight', index: 2, message: 'Target position: index 2', phase: 'target' },
      { action: 'shift', indices: [4, 3, 2], message: 'Shift elements right to make space', phase: 'shift' },
      { action: 'insert', index: 2, value: 17, message: 'Insert 17 at index 2', phase: 'insert' },
      { action: 'complete', index: 2, message: 'Insertion complete — O(n) time', phase: 'complete' },
    ]
  },
  delete: {
    name: 'Delete',
    description: 'Delete element at index 1',
    steps: [
      { action: 'highlight', index: 1, message: 'Target element: 25 at index 1', phase: 'target' },
      { action: 'remove', index: 1, message: 'Remove element from array', phase: 'remove' },
      { action: 'shiftLeft', indices: [2, 3, 4], message: 'Shift elements left to fill gap', phase: 'shift' },
      { action: 'complete', index: null, message: 'Deletion complete — O(n) time', phase: 'complete' },
    ]
  },
  update: {
    name: 'Update',
    description: 'Update value at index 3 to 99',
    steps: [
      { action: 'highlight', index: 3, message: 'Calculate memory address for index 3', phase: 'calculate' },
      { action: 'select', index: 3, message: 'Access arr[3] — current value: 22', phase: 'access' },
      { action: 'update', index: 3, value: 99, message: 'Write new value: 99', phase: 'update' },
      { action: 'complete', index: 3, message: 'Update complete — O(1) time', phase: 'complete' },
    ]
  }
}

const INITIAL_ARRAY = [64, 25, 12, 22, 11]

function ArrayVisualization() {
  const [currentOperation, setCurrentOperation] = useState('access')
  const [stepIndex, setStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [arrayState, setArrayState] = useState([...INITIAL_ARRAY])
  const [highlightedIndices, setHighlightedIndices] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [scannedIndices, setScannedIndices] = useState([])
  const [shiftingIndices, setShiftingIndices] = useState([])
  const [phase, setPhase] = useState(null)
  const intervalRef = useRef(null)

  const operation = OPERATIONS[currentOperation]
  const currentStep = operation.steps[stepIndex]
  const isLastStep = stepIndex === operation.steps.length - 1

  const resetVisualization = useCallback(() => {
    setStepIndex(0)
    setArrayState([...INITIAL_ARRAY])
    setHighlightedIndices([])
    setSelectedIndex(null)
    setScannedIndices([])
    setShiftingIndices([])
    setPhase(null)
    setIsPlaying(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }, [])

  const executeStep = useCallback((step) => {
    setPhase(step.phase)

    switch (step.action) {
      case 'highlight':
        setHighlightedIndices([step.index])
        setSelectedIndex(null)
        setScannedIndices([])
        break
      case 'select':
        setHighlightedIndices([])
        setSelectedIndex(step.index)
        break
      case 'scan':
        setScannedIndices(prev => [...prev, step.index])
        setHighlightedIndices([step.index])
        break
      case 'found':
        setHighlightedIndices([])
        setSelectedIndex(step.index)
        break
      case 'shift':
        setShiftingIndices(step.indices)
        break
      case 'insert':
        setShiftingIndices([])
        setArrayState(prev => {
          const newArr = [...prev]
          newArr.splice(step.index, 0, step.value)
          return newArr
        })
        setSelectedIndex(step.index)
        setHighlightedIndices([])
        break
      case 'remove':
        setSelectedIndex(step.index)
        break
      case 'shiftLeft':
        setShiftingIndices(step.indices)
        setArrayState(prev => {
          const newArr = [...prev]
          newArr.splice(1, 1)
          return newArr
        })
        setSelectedIndex(null)
        break
      case 'update':
        setArrayState(prev => {
          const newArr = [...prev]
          newArr[step.index] = step.value
          return newArr
        })
        break
      case 'complete':
        setShiftingIndices([])
        if (step.index !== null) {
          setSelectedIndex(step.index)
        }
        break
      default:
        break
    }
  }, [])

  const goToStep = useCallback((index) => {
    resetVisualization()
    // Execute all steps up to and including the target index
    for (let i = 0; i <= index; i++) {
      executeStep(operation.steps[i])
    }
    setStepIndex(index)
  }, [resetVisualization, executeStep, operation.steps])

  const nextStep = useCallback(() => {
    if (stepIndex < operation.steps.length - 1) {
      const nextIndex = stepIndex + 1
      executeStep(operation.steps[nextIndex])
      setStepIndex(nextIndex)
    } else {
      setIsPlaying(false)
    }
  }, [stepIndex, operation.steps, executeStep])

  const prevStep = useCallback(() => {
    if (stepIndex > 0) {
      goToStep(stepIndex - 1)
    }
  }, [stepIndex, goToStep])

  useEffect(() => {
    if (isPlaying && !isLastStep) {
      intervalRef.current = setInterval(nextStep, 1500 / speed)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, isLastStep, nextStep, speed])

  const handleOperationChange = useCallback((key) => {
    if (key !== currentOperation) {
      setCurrentOperation(key)
      setStepIndex(0)
      setArrayState([...INITIAL_ARRAY])
      setHighlightedIndices([])
      setSelectedIndex(null)
      setScannedIndices([])
      setShiftingIndices([])
      setPhase(null)
      setIsPlaying(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentOperation])

  const togglePlay = () => {
    if (isLastStep) {
      resetVisualization()
      setIsPlaying(true)
    } else {
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="array-viz">
      <div className="array-viz__header">
        <div className="array-viz__title">
          <span className="array-viz__icon">{'[▶]'}</span>
          <span>Interactive Visualization</span>
        </div>
        <div className="array-viz__operation-select">
          {Object.entries(OPERATIONS).map(([key, op]) => (
            <button
              key={key}
              className={`array-viz__op-btn ${currentOperation === key ? 'array-viz__op-btn--active' : ''}`}
              onClick={() => handleOperationChange(key)}
            >
              {op.name}
            </button>
          ))}
        </div>
      </div>

      <div className="array-viz__canvas">
        <div className="array-viz__memory-label">
          <span className="array-viz__memory-icon">◈</span>
          <span>Memory Block</span>
        </div>

        <div className="array-viz__array-container">
          <div className="array-viz__indices">
            {arrayState.map((_, i) => (
              <div key={i} className="array-viz__index">
                {i}
              </div>
            ))}
          </div>

          <div className="array-viz__cells">
            {arrayState.map((value, i) => (
              <div
                key={`${i}-${value}`}
                className={`array-viz__cell
                  ${highlightedIndices.includes(i) ? 'array-viz__cell--highlighted' : ''}
                  ${selectedIndex === i ? 'array-viz__cell--selected' : ''}
                  ${scannedIndices.includes(i) && !highlightedIndices.includes(i) && selectedIndex !== i ? 'array-viz__cell--scanned' : ''}
                  ${shiftingIndices.includes(i) ? 'array-viz__cell--shifting' : ''}
                `}
              >
                <span className="array-viz__value">{value}</span>
                {selectedIndex === i && phase === 'complete' && (
                  <span className="array-viz__checkmark">✓</span>
                )}
              </div>
            ))}
          </div>

          <div className="array-viz__addresses">
            {arrayState.map((_, i) => (
              <div key={i} className="array-viz__address">
                0x{(1000 + i * 4).toString(16)}
              </div>
            ))}
          </div>
        </div>

        <div className="array-viz__message">
          <span className="array-viz__message-indicator"></span>
          <span>{currentStep?.message || operation.description}</span>
        </div>
      </div>

      <div className="array-viz__controls">
        <div className="array-viz__playback">
          <button
            className="array-viz__ctrl-btn"
            onClick={resetVisualization}
            aria-label="Reset"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
          </button>

          <button
            className="array-viz__ctrl-btn"
            onClick={prevStep}
            disabled={stepIndex === 0}
            aria-label="Previous step"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="19 20 9 12 19 4 19 20"></polygon>
              <line x1="5" y1="19" x2="5" y2="5"></line>
            </svg>
          </button>

          <button
            className="array-viz__ctrl-btn array-viz__ctrl-btn--play"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>

          <button
            className="array-viz__ctrl-btn"
            onClick={nextStep}
            disabled={isLastStep}
            aria-label="Next step"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" y1="5" x2="19" y2="19"></line>
            </svg>
          </button>
        </div>

        <div className="array-viz__speed">
          <span className="array-viz__speed-label">Speed:</span>
          <div className="array-viz__speed-btns">
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                className={`array-viz__speed-btn ${speed === s ? 'array-viz__speed-btn--active' : ''}`}
                onClick={() => setSpeed(s)}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        <div className="array-viz__progress">
          <span className="array-viz__step-count">
            Step {stepIndex + 1} / {operation.steps.length}
          </span>
          <div className="array-viz__progress-bar">
            <div
              className="array-viz__progress-fill"
              style={{ width: `${((stepIndex + 1) / operation.steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArrayVisualization
