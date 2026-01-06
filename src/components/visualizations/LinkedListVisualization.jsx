import { useState, useEffect, useRef, useCallback } from 'react'
import './LinkedListVisualization.css'

const OPERATIONS = {
  traverse: {
    name: 'Traverse',
    description: 'Visiting each node from head to tail',
    steps: [
      { action: 'highlight', nodeIndex: 0, message: 'Start at head node (value: 10)', phase: 'start' },
      { action: 'move', nodeIndex: 1, prevIndex: 0, message: 'Follow next pointer to node (value: 20)', phase: 'traverse' },
      { action: 'move', nodeIndex: 2, prevIndex: 1, message: 'Follow next pointer to node (value: 30)', phase: 'traverse' },
      { action: 'move', nodeIndex: 3, prevIndex: 2, message: 'Follow next pointer to node (value: 40)', phase: 'traverse' },
      { action: 'move', nodeIndex: 4, prevIndex: 3, message: 'Follow next pointer to node (value: 50)', phase: 'traverse' },
      { action: 'complete', nodeIndex: null, message: 'Reached null — traversal complete. O(n) time', phase: 'complete' },
    ]
  },
  search: {
    name: 'Search',
    description: 'Finding node with value 30',
    steps: [
      { action: 'scan', nodeIndex: 0, message: 'Check head: 10 ≠ 30', phase: 'compare' },
      { action: 'scan', nodeIndex: 1, message: 'Check next: 20 ≠ 30', phase: 'compare' },
      { action: 'found', nodeIndex: 2, message: 'Check next: 30 = 30 — Found!', phase: 'found' },
      { action: 'complete', nodeIndex: 2, message: 'Node found at position 2. O(n) time', phase: 'complete' },
    ]
  },
  insertHead: {
    name: 'Insert Head',
    description: 'Adding node with value 5 at the beginning',
    steps: [
      { action: 'highlight', nodeIndex: 0, message: 'Current head is node with value 10', phase: 'identify' },
      { action: 'createNode', value: 5, message: 'Create new node with value 5', phase: 'create' },
      { action: 'linkNew', message: 'Set new node\'s next to current head', phase: 'link' },
      { action: 'insertHead', value: 5, message: 'Update head pointer to new node', phase: 'insert' },
      { action: 'complete', nodeIndex: 0, message: 'Insertion complete. O(1) time', phase: 'complete' },
    ]
  },
  insertTail: {
    name: 'Insert Tail',
    description: 'Adding node with value 60 at the end',
    steps: [
      { action: 'highlight', nodeIndex: 0, message: 'Start at head to find tail', phase: 'start' },
      { action: 'move', nodeIndex: 1, prevIndex: 0, message: 'Traverse: not at tail yet', phase: 'traverse' },
      { action: 'move', nodeIndex: 2, prevIndex: 1, message: 'Traverse: not at tail yet', phase: 'traverse' },
      { action: 'move', nodeIndex: 3, prevIndex: 2, message: 'Traverse: not at tail yet', phase: 'traverse' },
      { action: 'move', nodeIndex: 4, prevIndex: 3, message: 'Found tail node (next is null)', phase: 'traverse' },
      { action: 'createNode', value: 60, message: 'Create new node with value 60', phase: 'create' },
      { action: 'insertTail', value: 60, message: 'Link tail\'s next to new node', phase: 'insert' },
      { action: 'complete', nodeIndex: 5, message: 'Insertion complete. O(n) time for singly linked', phase: 'complete' },
    ]
  },
  insertAt: {
    name: 'Insert At',
    description: 'Insert value 25 at position 2',
    steps: [
      { action: 'highlight', nodeIndex: 0, message: 'Start at head, target position 2', phase: 'start' },
      { action: 'move', nodeIndex: 1, prevIndex: 0, message: 'At position 1, need position 2', phase: 'traverse' },
      { action: 'highlight', nodeIndex: 1, message: 'Found insertion point after this node', phase: 'identify' },
      { action: 'createNode', value: 25, message: 'Create new node with value 25', phase: 'create' },
      { action: 'insertAt', value: 25, position: 2, message: 'Link new node and update pointers', phase: 'insert' },
      { action: 'complete', nodeIndex: 2, message: 'Insertion complete. O(n) time', phase: 'complete' },
    ]
  },
  deleteHead: {
    name: 'Delete Head',
    description: 'Removing the first node',
    steps: [
      { action: 'highlight', nodeIndex: 0, message: 'Target: head node (value: 10)', phase: 'identify' },
      { action: 'markDelete', nodeIndex: 0, message: 'Mark node for deletion', phase: 'mark' },
      { action: 'deleteHead', message: 'Update head to point to second node', phase: 'delete' },
      { action: 'complete', nodeIndex: 0, message: 'Deletion complete. O(1) time', phase: 'complete' },
    ]
  },
  deleteTail: {
    name: 'Delete Tail',
    description: 'Removing the last node',
    steps: [
      { action: 'highlight', nodeIndex: 0, message: 'Start at head to find tail', phase: 'start' },
      { action: 'move', nodeIndex: 1, prevIndex: 0, message: 'Traverse: looking for second-to-last', phase: 'traverse' },
      { action: 'move', nodeIndex: 2, prevIndex: 1, message: 'Traverse: looking for second-to-last', phase: 'traverse' },
      { action: 'move', nodeIndex: 3, prevIndex: 2, message: 'Found second-to-last node', phase: 'traverse' },
      { action: 'markDelete', nodeIndex: 4, message: 'Mark tail node for deletion', phase: 'mark' },
      { action: 'deleteTail', message: 'Set second-to-last node\'s next to null', phase: 'delete' },
      { action: 'complete', nodeIndex: null, message: 'Deletion complete. O(n) time for singly linked', phase: 'complete' },
    ]
  },
  deleteValue: {
    name: 'Delete Value',
    description: 'Delete node with value 30',
    steps: [
      { action: 'scan', nodeIndex: 0, message: 'Check: 10 ≠ 30', phase: 'compare' },
      { action: 'scan', nodeIndex: 1, message: 'Check: 20 ≠ 30, but next node is target', phase: 'compare' },
      { action: 'markDelete', nodeIndex: 2, message: 'Found node with value 30, mark for deletion', phase: 'mark' },
      { action: 'deleteValue', nodeIndex: 2, message: 'Update previous node\'s next to skip deleted node', phase: 'delete' },
      { action: 'complete', nodeIndex: null, message: 'Deletion complete. O(n) time', phase: 'complete' },
    ]
  }
}

const INITIAL_LIST = [
  { id: 0, value: 10 },
  { id: 1, value: 20 },
  { id: 2, value: 30 },
  { id: 3, value: 40 },
  { id: 4, value: 50 }
]

function LinkedListVisualization() {
  const [listType, setListType] = useState('singly')
  const [currentOperation, setCurrentOperation] = useState('traverse')
  const [stepIndex, setStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [nodes, setNodes] = useState([...INITIAL_LIST])
  const [highlightedIndex, setHighlightedIndex] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [scannedIndices, setScannedIndices] = useState([])
  const [deletingIndex, setDeletingIndex] = useState(null)
  const [newNode, setNewNode] = useState(null)
  const [phase, setPhase] = useState(null)
  const intervalRef = useRef(null)

  const operation = OPERATIONS[currentOperation]
  const currentStep = operation.steps[stepIndex]
  const isLastStep = stepIndex === operation.steps.length - 1

  const resetVisualization = useCallback(() => {
    setStepIndex(0)
    setNodes([...INITIAL_LIST])
    setHighlightedIndex(null)
    setSelectedIndex(null)
    setScannedIndices([])
    setDeletingIndex(null)
    setNewNode(null)
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
        setHighlightedIndex(step.nodeIndex)
        setSelectedIndex(null)
        setScannedIndices([])
        setDeletingIndex(null)
        setNewNode(null)
        break

      case 'move':
        // Add previous highlighted index to scanned indices before moving
        if (step.prevIndex !== undefined) {
          setScannedIndices(prev => {
            const newIndices = [...prev]
            if (step.prevIndex !== null && !newIndices.includes(step.prevIndex)) {
              newIndices.push(step.prevIndex)
            }
            return newIndices
          })
        }
        setHighlightedIndex(step.nodeIndex)
        break

      case 'scan':
        setScannedIndices(prev => [...prev, step.nodeIndex])
        setHighlightedIndex(step.nodeIndex)
        break

      case 'found':
        setHighlightedIndex(null)
        setSelectedIndex(step.nodeIndex)
        break

      case 'createNode':
        setNewNode({ value: step.value, visible: true })
        break

      case 'linkNew':
        // Visual indication that new node is being linked
        break

      case 'insertHead':
        setNodes(prev => [{ id: Date.now(), value: step.value }, ...prev])
        setNewNode(null)
        setSelectedIndex(0)
        setHighlightedIndex(null)
        break

      case 'insertTail':
        setNodes(prev => {
          const newArr = [...prev, { id: Date.now(), value: step.value }]
          // Set selected index to the last position (new node)
          setSelectedIndex(newArr.length - 1)
          return newArr
        })
        setNewNode(null)
        setHighlightedIndex(null)
        break

      case 'insertAt':
        setNodes(prev => {
          const newArr = [...prev]
          newArr.splice(step.position, 0, { id: Date.now(), value: step.value })
          return newArr
        })
        setNewNode(null)
        setSelectedIndex(step.position)
        setHighlightedIndex(null)
        break

      case 'markDelete':
        setDeletingIndex(step.nodeIndex)
        setHighlightedIndex(null)
        break

      case 'deleteHead':
        setNodes(prev => prev.slice(1))
        setDeletingIndex(null)
        break

      case 'deleteTail':
        setNodes(prev => prev.slice(0, -1))
        setDeletingIndex(null)
        break

      case 'deleteValue':
        setNodes(prev => prev.filter((_, i) => i !== step.nodeIndex))
        setDeletingIndex(null)
        break

      case 'complete':
        if (step.nodeIndex !== null) {
          setSelectedIndex(step.nodeIndex)
        }
        setHighlightedIndex(null)
        setDeletingIndex(null)
        break

      default:
        break
    }
  }, [])

  const goToStep = useCallback((index) => {
    resetVisualization()
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
      setNodes([...INITIAL_LIST])
      setHighlightedIndex(null)
      setSelectedIndex(null)
      setScannedIndices([])
      setDeletingIndex(null)
      setNewNode(null)
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

  // Calculate node width based on list type
  const nodeWidth = listType === 'doubly' ? 110 : 80
  const nodeSpacing = 50
  const totalNodeWidth = nodeWidth + nodeSpacing

  return (
    <div className="linked-list-viz">
      <div className="linked-list-viz__header">
        <div className="linked-list-viz__title">
          <span className="linked-list-viz__icon">{'[->]'}</span>
          <span>Interactive Visualization</span>
        </div>

        <div className="linked-list-viz__type-toggle">
          <button
            className={`linked-list-viz__type-btn ${listType === 'singly' ? 'linked-list-viz__type-btn--active' : ''}`}
            onClick={() => { setListType('singly'); resetVisualization(); }}
          >
            Singly
          </button>
          <button
            className={`linked-list-viz__type-btn ${listType === 'doubly' ? 'linked-list-viz__type-btn--active' : ''}`}
            onClick={() => { setListType('doubly'); resetVisualization(); }}
          >
            Doubly
          </button>
        </div>

        <div className="linked-list-viz__operation-select">
          {Object.entries(OPERATIONS).map(([key, op]) => (
            <button
              key={key}
              className={`linked-list-viz__op-btn ${currentOperation === key ? 'linked-list-viz__op-btn--active' : ''}`}
              onClick={() => handleOperationChange(key)}
            >
              {op.name}
            </button>
          ))}
        </div>
      </div>

      <div className="linked-list-viz__canvas">
        <div className="linked-list-viz__memory-label">
          <span className="linked-list-viz__memory-icon">◈</span>
          <span>{listType === 'doubly' ? 'Doubly Linked List' : 'Singly Linked List'}</span>
        </div>

        <div className="linked-list-viz__svg-container">
          <svg
            className="linked-list-viz__svg"
            viewBox={`0 0 ${Math.max(800, (nodes.length + 1) * totalNodeWidth + 100)} 180`}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Head pointer */}
            <g className="linked-list-viz__head-pointer">
              <text x="35" y="25" className="linked-list-viz__pointer-label">head</text>
              <line x1="45" y1="35" x2="45" y2="55" className="linked-list-viz__pointer-line" />
              <polygon points="40,50 50,50 45,60" className="linked-list-viz__pointer-arrow" />
            </g>

            {/* New node being created (floating above) */}
            {newNode && newNode.visible && (
              <g className="linked-list-viz__new-node" transform="translate(200, 0)">
                <rect
                  x="0"
                  y="0"
                  width={nodeWidth}
                  height="40"
                  rx="6"
                  className="linked-list-viz__node-rect linked-list-viz__node-rect--new"
                />
                <text x={nodeWidth / 2} y="25" className="linked-list-viz__node-value">
                  {newNode.value}
                </text>
                <text x={nodeWidth / 2} y="-10" className="linked-list-viz__new-label">new</text>
              </g>
            )}

            {/* Render nodes */}
            {nodes.map((node, index) => {
              const x = 20 + index * totalNodeWidth
              const y = 70
              const isHighlighted = highlightedIndex === index
              const isSelected = selectedIndex === index
              const isScanned = scannedIndices.includes(index) && !isHighlighted && !isSelected
              const isDeleting = deletingIndex === index

              return (
                <g
                  key={node.id}
                  className={`linked-list-viz__node
                    ${isHighlighted ? 'linked-list-viz__node--highlighted' : ''}
                    ${isSelected ? 'linked-list-viz__node--selected' : ''}
                    ${isScanned ? 'linked-list-viz__node--scanned' : ''}
                    ${isDeleting ? 'linked-list-viz__node--deleting' : ''}
                  `}
                  transform={`translate(${x}, ${y})`}
                >
                  {/* Prev pointer section (doubly only) */}
                  {listType === 'doubly' && (
                    <>
                      <rect
                        x="0"
                        y="0"
                        width="30"
                        height="50"
                        rx="6"
                        className="linked-list-viz__node-section linked-list-viz__node-section--prev"
                      />
                      {index > 0 && (
                        <text x="15" y="30" className="linked-list-viz__section-symbol">←</text>
                      )}
                      {index === 0 && (
                        <text x="15" y="30" className="linked-list-viz__section-null">∅</text>
                      )}
                    </>
                  )}

                  {/* Value section */}
                  <rect
                    x={listType === 'doubly' ? 30 : 0}
                    y="0"
                    width="50"
                    height="50"
                    rx="6"
                    className="linked-list-viz__node-section linked-list-viz__node-section--value"
                  />
                  <text
                    x={listType === 'doubly' ? 55 : 25}
                    y="32"
                    className="linked-list-viz__node-value"
                  >
                    {node.value}
                  </text>

                  {/* Next pointer section */}
                  <rect
                    x={listType === 'doubly' ? 80 : 50}
                    y="0"
                    width="30"
                    height="50"
                    rx="6"
                    className="linked-list-viz__node-section linked-list-viz__node-section--next"
                  />
                  {index < nodes.length - 1 ? (
                    <text
                      x={listType === 'doubly' ? 95 : 65}
                      y="30"
                      className="linked-list-viz__section-symbol"
                    >
                      →
                    </text>
                  ) : (
                    <text
                      x={listType === 'doubly' ? 95 : 65}
                      y="30"
                      className="linked-list-viz__section-null"
                    >
                      ∅
                    </text>
                  )}

                  {/* Arrow to next node */}
                  {index < nodes.length - 1 && (
                    <g className="linked-list-viz__arrow">
                      <line
                        x1={nodeWidth}
                        y1="25"
                        x2={nodeWidth + nodeSpacing - 5}
                        y2="25"
                        className="linked-list-viz__arrow-line"
                      />
                      <polygon
                        points={`${nodeWidth + nodeSpacing - 10},20 ${nodeWidth + nodeSpacing},25 ${nodeWidth + nodeSpacing - 10},30`}
                        className="linked-list-viz__arrow-head"
                      />
                    </g>
                  )}

                  {/* Prev arrow (doubly only) */}
                  {listType === 'doubly' && index > 0 && (
                    <g className="linked-list-viz__arrow linked-list-viz__arrow--prev">
                      <line
                        x1="-5"
                        y1="35"
                        x2={-nodeSpacing + 5}
                        y2="35"
                        className="linked-list-viz__arrow-line linked-list-viz__arrow-line--prev"
                      />
                      <polygon
                        points={`${-nodeSpacing + 10},30 ${-nodeSpacing},35 ${-nodeSpacing + 10},40`}
                        className="linked-list-viz__arrow-head linked-list-viz__arrow-head--prev"
                      />
                    </g>
                  )}

                  {/* Index label */}
                  <text
                    x={listType === 'doubly' ? 55 : 25}
                    y="70"
                    className="linked-list-viz__index-label"
                  >
                    [{index}]
                  </text>

                  {/* Checkmark for completed selection */}
                  {isSelected && phase === 'complete' && (
                    <g className="linked-list-viz__checkmark">
                      <circle cx={nodeWidth - 5} cy="-5" r="10" />
                      <text x={nodeWidth - 5} y="-1">✓</text>
                    </g>
                  )}
                </g>
              )
            })}

            {/* Null terminator */}
            <g transform={`translate(${20 + nodes.length * totalNodeWidth}, 70)`}>
              <text x="15" y="32" className="linked-list-viz__null-label">null</text>
            </g>

            {/* Tail pointer (doubly only) */}
            {listType === 'doubly' && nodes.length > 0 && (
              <g className="linked-list-viz__tail-pointer" transform={`translate(${20 + (nodes.length - 1) * totalNodeWidth + nodeWidth / 2}, 140)`}>
                <line x1="0" y1="-10" x2="0" y2="-25" className="linked-list-viz__pointer-line" />
                <polygon points="-5,-15 5,-15 0,-5" className="linked-list-viz__pointer-arrow" />
                <text x="0" y="5" className="linked-list-viz__pointer-label">tail</text>
              </g>
            )}
          </svg>
        </div>

        <div className="linked-list-viz__message">
          <span className="linked-list-viz__message-indicator"></span>
          <span>{currentStep?.message || operation.description}</span>
        </div>
      </div>

      <div className="linked-list-viz__controls">
        <div className="linked-list-viz__playback">
          <button
            className="linked-list-viz__ctrl-btn"
            onClick={resetVisualization}
            aria-label="Reset"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
          </button>

          <button
            className="linked-list-viz__ctrl-btn"
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
            className="linked-list-viz__ctrl-btn linked-list-viz__ctrl-btn--play"
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
            className="linked-list-viz__ctrl-btn"
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

        <div className="linked-list-viz__speed">
          <span className="linked-list-viz__speed-label">Speed:</span>
          <div className="linked-list-viz__speed-btns">
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                className={`linked-list-viz__speed-btn ${speed === s ? 'linked-list-viz__speed-btn--active' : ''}`}
                onClick={() => setSpeed(s)}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        <div className="linked-list-viz__progress">
          <span className="linked-list-viz__step-count">
            Step {stepIndex + 1} / {operation.steps.length}
          </span>
          <div className="linked-list-viz__progress-bar">
            <div
              className="linked-list-viz__progress-fill"
              style={{ width: `${((stepIndex + 1) / operation.steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinkedListVisualization
