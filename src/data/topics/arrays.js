const arrays = {
  meta: {
    slug: 'arrays',
    name: 'Arrays',
    category: 'Data Structures',
    icon: '[ ]',
    complexity: {
      time: 'O(1) access',
      space: 'O(n)'
    },
    description: 'Contiguous memory storage for sequential data'
  },

  overview: {
    what: `An array is a fundamental data structure that stores elements in contiguous memory locations. Each element can be accessed directly using an index, making arrays incredibly efficient for random access operations. Arrays form the backbone of most programming languages and are the building blocks for more complex data structures.`,

    why: `Arrays provide O(1) constant-time access to any element when you know its index. This predictable performance makes them ideal for scenarios requiring fast lookups. They also have excellent cache locality since elements are stored adjacently in memory, leading to faster iteration compared to linked structures.`,

    realWorld: [
      'Image pixels stored as 2D arrays of RGB values',
      'Database tables storing rows of records',
      'Audio samples in digital signal processing',
      'Game boards and grid-based simulations',
      'Browser DOM element collections',
      'Stock price history for financial analysis'
    ]
  },

  operations: [
    {
      name: 'Access',
      description: 'Retrieve an element at a specific index. Direct memory address calculation allows instant access.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      code: {
        javascript: `// Access element at index
const arr = [10, 20, 30, 40, 50];
const element = arr[2];  // 30

// Access first and last elements
const first = arr[0];           // 10
const last = arr[arr.length - 1]; // 50`,
        python: `# Access element at index
arr = [10, 20, 30, 40, 50]
element = arr[2]  # 30

# Access first and last elements
first = arr[0]    # 10
last = arr[-1]    # 50 (Python supports negative indexing)`
      }
    },
    {
      name: 'Search',
      description: 'Find an element in the array. Linear search checks each element sequentially until found.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      code: {
        javascript: `// Linear search
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;  // Return index if found
    }
  }
  return -1;  // Not found
}

const arr = [10, 20, 30, 40, 50];
linearSearch(arr, 30);  // Returns 2
linearSearch(arr, 35);  // Returns -1`,
        python: `# Linear search
def linear_search(arr, target):
    for i, element in enumerate(arr):
        if element == target:
            return i  # Return index if found
    return -1  # Not found

arr = [10, 20, 30, 40, 50]
linear_search(arr, 30)  # Returns 2
linear_search(arr, 35)  # Returns -1`
      }
    },
    {
      name: 'Insert',
      description: 'Add an element at a specific position. Elements after the insertion point must shift right.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      code: {
        javascript: `// Insert at specific index
const arr = [10, 20, 40, 50];
arr.splice(2, 0, 30);  // Insert 30 at index 2
// arr is now [10, 20, 30, 40, 50]

// Insert at beginning (worst case)
arr.unshift(5);  // [5, 10, 20, 30, 40, 50]

// Insert at end (best case - O(1) amortized)
arr.push(60);    // [5, 10, 20, 30, 40, 50, 60]`,
        python: `# Insert at specific index
arr = [10, 20, 40, 50]
arr.insert(2, 30)  # Insert 30 at index 2
# arr is now [10, 20, 30, 40, 50]

# Insert at beginning (worst case)
arr.insert(0, 5)  # [5, 10, 20, 30, 40, 50]

# Insert at end (best case - O(1) amortized)
arr.append(60)    # [5, 10, 20, 30, 40, 50, 60]`
      }
    },
    {
      name: 'Delete',
      description: 'Remove an element at a specific position. Elements after the deletion point must shift left.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      code: {
        javascript: `// Delete at specific index
const arr = [10, 20, 30, 40, 50];
arr.splice(2, 1);  // Remove element at index 2
// arr is now [10, 20, 40, 50]

// Delete from beginning (worst case)
arr.shift();  // [20, 40, 50]

// Delete from end (best case - O(1))
arr.pop();    // [20, 40]`,
        python: `# Delete at specific index
arr = [10, 20, 30, 40, 50]
del arr[2]  # Remove element at index 2
# arr is now [10, 20, 40, 50]

# Delete from beginning (worst case)
arr.pop(0)  # [20, 40, 50]

# Delete from end (best case - O(1))
arr.pop()   # [20, 40]`
      }
    },
    {
      name: 'Update',
      description: 'Modify an element at a specific index. Direct access makes this operation very efficient.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      code: {
        javascript: `// Update element at index
const arr = [10, 20, 30, 40, 50];
arr[2] = 35;  // Change 30 to 35
// arr is now [10, 20, 35, 40, 50]

// Conditional update
if (arr[3] > 30) {
  arr[3] = arr[3] * 2;  // Double if > 30
}
// arr is now [10, 20, 35, 80, 50]`,
        python: `# Update element at index
arr = [10, 20, 30, 40, 50]
arr[2] = 35  # Change 30 to 35
# arr is now [10, 20, 35, 40, 50]

# Conditional update
if arr[3] > 30:
    arr[3] = arr[3] * 2  # Double if > 30
# arr is now [10, 20, 35, 80, 50]`
      }
    }
  ],

  codeExamples: {
    javascript: `class DynamicArray {
  constructor(capacity = 10) {
    this.data = new Array(capacity);
    this.length = 0;
    this.capacity = capacity;
  }

  // Access element at index - O(1)
  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds');
    }
    return this.data[index];
  }

  // Update element at index - O(1)
  set(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds');
    }
    this.data[index] = value;
  }

  // Add element at end - O(1) amortized
  push(value) {
    if (this.length === this.capacity) {
      this._resize(this.capacity * 2);
    }
    this.data[this.length] = value;
    this.length++;
  }

  // Remove element from end - O(1)
  pop() {
    if (this.length === 0) {
      throw new Error('Array is empty');
    }
    const value = this.data[this.length - 1];
    this.data[this.length - 1] = undefined;
    this.length--;
    return value;
  }

  // Insert at specific index - O(n)
  insertAt(index, value) {
    if (index < 0 || index > this.length) {
      throw new Error('Index out of bounds');
    }
    if (this.length === this.capacity) {
      this._resize(this.capacity * 2);
    }
    // Shift elements right
    for (let i = this.length; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[index] = value;
    this.length++;
  }

  // Delete at specific index - O(n)
  deleteAt(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds');
    }
    const value = this.data[index];
    // Shift elements left
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.data[this.length - 1] = undefined;
    this.length--;
    return value;
  }

  // Linear search - O(n)
  find(value) {
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] === value) {
        return i;
      }
    }
    return -1;
  }

  // Resize internal array - O(n)
  _resize(newCapacity) {
    const newData = new Array(newCapacity);
    for (let i = 0; i < this.length; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
    this.capacity = newCapacity;
  }

  // Convert to string for display
  toString() {
    let result = '[';
    for (let i = 0; i < this.length; i++) {
      result += this.data[i];
      if (i < this.length - 1) result += ', ';
    }
    return result + ']';
  }
}

// Usage example
const arr = new DynamicArray(4);
arr.push(10);
arr.push(20);
arr.push(30);
arr.insertAt(1, 15);
console.log(arr.toString());  // [10, 15, 20, 30]
console.log(arr.get(2));      // 20
arr.deleteAt(1);
console.log(arr.toString());  // [10, 20, 30]`,

    python: `class DynamicArray:
    def __init__(self, capacity=10):
        self.data = [None] * capacity
        self.length = 0
        self.capacity = capacity

    # Access element at index - O(1)
    def get(self, index):
        if index < 0 or index >= self.length:
            raise IndexError('Index out of bounds')
        return self.data[index]

    # Update element at index - O(1)
    def set(self, index, value):
        if index < 0 or index >= self.length:
            raise IndexError('Index out of bounds')
        self.data[index] = value

    # Add element at end - O(1) amortized
    def push(self, value):
        if self.length == self.capacity:
            self._resize(self.capacity * 2)
        self.data[self.length] = value
        self.length += 1

    # Remove element from end - O(1)
    def pop(self):
        if self.length == 0:
            raise IndexError('Array is empty')
        value = self.data[self.length - 1]
        self.data[self.length - 1] = None
        self.length -= 1
        return value

    # Insert at specific index - O(n)
    def insert_at(self, index, value):
        if index < 0 or index > self.length:
            raise IndexError('Index out of bounds')
        if self.length == self.capacity:
            self._resize(self.capacity * 2)
        # Shift elements right
        for i in range(self.length, index, -1):
            self.data[i] = self.data[i - 1]
        self.data[index] = value
        self.length += 1

    # Delete at specific index - O(n)
    def delete_at(self, index):
        if index < 0 or index >= self.length:
            raise IndexError('Index out of bounds')
        value = self.data[index]
        # Shift elements left
        for i in range(index, self.length - 1):
            self.data[i] = self.data[i + 1]
        self.data[self.length - 1] = None
        self.length -= 1
        return value

    # Linear search - O(n)
    def find(self, value):
        for i in range(self.length):
            if self.data[i] == value:
                return i
        return -1

    # Resize internal array - O(n)
    def _resize(self, new_capacity):
        new_data = [None] * new_capacity
        for i in range(self.length):
            new_data[i] = self.data[i]
        self.data = new_data
        self.capacity = new_capacity

    def __str__(self):
        elements = [str(self.data[i]) for i in range(self.length)]
        return '[' + ', '.join(elements) + ']'


# Usage example
arr = DynamicArray(4)
arr.push(10)
arr.push(20)
arr.push(30)
arr.insert_at(1, 15)
print(arr)           # [10, 15, 20, 30]
print(arr.get(2))    # 20
arr.delete_at(1)
print(arr)           # [10, 20, 30]`
  },

  useCases: [
    {
      title: 'Lookup Tables',
      description: 'When you need O(1) access by index, arrays are unbeatable. Hash tables use arrays internally for this exact reason.'
    },
    {
      title: 'Buffer Storage',
      description: 'Audio/video streaming buffers, keyboard input buffers, and network packet buffers all use arrays for sequential data storage.'
    },
    {
      title: 'Matrix Operations',
      description: 'Scientific computing, image processing, and machine learning rely on multi-dimensional arrays for efficient numerical operations.'
    },
    {
      title: 'Cache-Friendly Iteration',
      description: 'When processing all elements sequentially, arrays outperform linked structures due to CPU cache optimization from contiguous memory.'
    }
  ],

  commonMistakes: [
    {
      mistake: 'Inserting at the beginning frequently',
      correction: 'Use a deque or linked list if you need frequent insertions at both ends. Array unshift/shift operations are O(n).'
    },
    {
      mistake: 'Not considering resize costs',
      correction: 'Dynamic arrays have amortized O(1) append, but individual appends during resize are O(n). Pre-allocate capacity if size is known.'
    },
    {
      mistake: 'Using arrays for frequent deletions in the middle',
      correction: 'Consider a linked list or mark-and-sweep approach if you frequently remove elements from arbitrary positions.'
    },
    {
      mistake: 'Off-by-one errors with indices',
      correction: 'Remember: arrays are 0-indexed. The last element is at index length-1, not length.'
    }
  ],

  relatedTopics: ['linked-lists', 'stacks', 'queues', 'sorting', 'searching'],

  visualization: {
    initialData: [64, 25, 12, 22, 11],
    operations: ['access', 'search', 'insert', 'delete', 'update']
  }
}

export default arrays
