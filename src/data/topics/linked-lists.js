const linkedLists = {
  meta: {
    slug: 'linked-lists',
    name: 'Linked Lists',
    category: 'Data Structures',
    icon: '->',
    complexity: {
      time: 'O(n) access',
      space: 'O(n)'
    },
    description: 'Dynamic sequential data structure with pointer-based node connections'
  },

  overview: {
    what: `A linked list is a linear data structure where elements (nodes) are stored in non-contiguous memory locations. Each node contains data and a reference (pointer) to the next node in the sequence. In a singly linked list, each node points only to the next node. In a doubly linked list, each node also maintains a pointer to the previous node, enabling bidirectional traversal. The first node is called the head, and the last node points to null.`,

    why: `Linked lists provide O(1) insertion and deletion at known positions without shifting elements—a major advantage over arrays. They're ideal when the data size is unknown or changes frequently, as they don't require contiguous memory allocation. Unlike arrays, linked lists can grow and shrink dynamically without copying data to new memory locations. They form the foundation for more complex structures like stacks, queues, and graphs.`,

    realWorld: [
      'Browser history (back/forward navigation)',
      'Music playlist (next/previous track)',
      'Undo/Redo functionality in applications',
      'Memory allocation in operating systems',
      'Hash table collision resolution (chaining)',
      'LRU Cache implementation'
    ]
  },

  operations: [
    {
      name: 'Traverse',
      description: 'Visit each node sequentially by following next pointers from head to tail. Essential for printing, counting, or processing all elements.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      code: {
        javascript: `// Traverse linked list
function traverse(head) {
  let current = head;
  while (current !== null) {
    console.log(current.value);
    current = current.next;
  }
}

// Example usage
// List: 10 -> 20 -> 30 -> null
traverse(head);
// Output: 10, 20, 30`,
        python: `# Traverse linked list
def traverse(head):
    current = head
    while current is not None:
        print(current.value)
        current = current.next

# Example usage
# List: 10 -> 20 -> 30 -> None
traverse(head)
# Output: 10, 20, 30`
      }
    },
    {
      name: 'Search',
      description: 'Find a node containing a specific value by traversing from head. Returns the node if found, otherwise null.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      code: {
        javascript: `// Search for a value
function search(head, target) {
  let current = head;
  while (current !== null) {
    if (current.value === target) {
      return current;  // Found
    }
    current = current.next;
  }
  return null;  // Not found
}

// Example usage
const node = search(head, 20);
// Returns node with value 20`,
        python: `# Search for a value
def search(head, target):
    current = head
    while current is not None:
        if current.value == target:
            return current  # Found
        current = current.next
    return None  # Not found

# Example usage
node = search(head, 20)
# Returns node with value 20`
      }
    },
    {
      name: 'Insert at Head',
      description: 'Add a new node at the beginning. Create node, point it to current head, update head pointer. Fastest insertion.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      code: {
        javascript: `// Insert at head (beginning)
function insertAtHead(head, value) {
  const newNode = new Node(value);
  newNode.next = head;
  return newNode;  // New head
}

// Example
// Before: 20 -> 30 -> null
head = insertAtHead(head, 10);
// After: 10 -> 20 -> 30 -> null`,
        python: `# Insert at head (beginning)
def insert_at_head(head, value):
    new_node = Node(value)
    new_node.next = head
    return new_node  # New head

# Example
# Before: 20 -> 30 -> None
head = insert_at_head(head, 10)
# After: 10 -> 20 -> 30 -> None`
      }
    },
    {
      name: 'Insert at Tail',
      description: 'Add a new node at the end. Must traverse to find last node, then update its next pointer.',
      timeComplexity: 'O(n) singly / O(1) doubly',
      spaceComplexity: 'O(1)',
      code: {
        javascript: `// Insert at tail (end)
function insertAtTail(head, value) {
  const newNode = new Node(value);
  if (head === null) {
    return newNode;
  }

  let current = head;
  while (current.next !== null) {
    current = current.next;
  }
  current.next = newNode;
  return head;
}

// Example
// Before: 10 -> 20 -> null
head = insertAtTail(head, 30);
// After: 10 -> 20 -> 30 -> null`,
        python: `# Insert at tail (end)
def insert_at_tail(head, value):
    new_node = Node(value)
    if head is None:
        return new_node

    current = head
    while current.next is not None:
        current = current.next
    current.next = new_node
    return head

# Example
# Before: 10 -> 20 -> None
head = insert_at_tail(head, 30)
# After: 10 -> 20 -> 30 -> None`
      }
    },
    {
      name: 'Insert at Position',
      description: 'Add a new node at a specific index. Traverse to the position, update surrounding pointers to include new node.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      code: {
        javascript: `// Insert at specific position (0-indexed)
function insertAt(head, value, position) {
  const newNode = new Node(value);

  if (position === 0) {
    newNode.next = head;
    return newNode;
  }

  let current = head;
  for (let i = 0; i < position - 1 && current; i++) {
    current = current.next;
  }

  if (current) {
    newNode.next = current.next;
    current.next = newNode;
  }
  return head;
}

// Example: Insert 25 at position 2
// Before: 10 -> 20 -> 30 -> null
head = insertAt(head, 25, 2);
// After: 10 -> 20 -> 25 -> 30 -> null`,
        python: `# Insert at specific position (0-indexed)
def insert_at(head, value, position):
    new_node = Node(value)

    if position == 0:
        new_node.next = head
        return new_node

    current = head
    for _ in range(position - 1):
        if current is None:
            break
        current = current.next

    if current:
        new_node.next = current.next
        current.next = new_node
    return head

# Example: Insert 25 at position 2
# Before: 10 -> 20 -> 30 -> None
head = insert_at(head, 25, 2)
# After: 10 -> 20 -> 25 -> 30 -> None`
      }
    },
    {
      name: 'Delete from Head',
      description: 'Remove the first node. Simply update head to point to the second node. Fastest deletion.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      code: {
        javascript: `// Delete from head (beginning)
function deleteFromHead(head) {
  if (head === null) {
    return null;
  }
  return head.next;  // New head
}

// Example
// Before: 10 -> 20 -> 30 -> null
head = deleteFromHead(head);
// After: 20 -> 30 -> null`,
        python: `# Delete from head (beginning)
def delete_from_head(head):
    if head is None:
        return None
    return head.next  # New head

# Example
# Before: 10 -> 20 -> 30 -> None
head = delete_from_head(head)
# After: 20 -> 30 -> None`
      }
    },
    {
      name: 'Delete from Tail',
      description: 'Remove the last node. Traverse to second-to-last node, set its next to null.',
      timeComplexity: 'O(n) singly / O(1) doubly',
      spaceComplexity: 'O(1)',
      code: {
        javascript: `// Delete from tail (end)
function deleteFromTail(head) {
  if (head === null || head.next === null) {
    return null;
  }

  let current = head;
  while (current.next.next !== null) {
    current = current.next;
  }
  current.next = null;
  return head;
}

// Example
// Before: 10 -> 20 -> 30 -> null
head = deleteFromTail(head);
// After: 10 -> 20 -> null`,
        python: `# Delete from tail (end)
def delete_from_tail(head):
    if head is None or head.next is None:
        return None

    current = head
    while current.next.next is not None:
        current = current.next
    current.next = None
    return head

# Example
# Before: 10 -> 20 -> 30 -> None
head = delete_from_tail(head)
# After: 10 -> 20 -> None`
      }
    },
    {
      name: 'Delete by Value',
      description: 'Find and remove a node with a specific value. Update predecessor\'s next pointer to skip the deleted node.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      code: {
        javascript: `// Delete node by value
function deleteByValue(head, value) {
  if (head === null) return null;

  // If head has the value
  if (head.value === value) {
    return head.next;
  }

  let current = head;
  while (current.next !== null) {
    if (current.next.value === value) {
      current.next = current.next.next;
      return head;
    }
    current = current.next;
  }
  return head;  // Value not found
}

// Example: Delete node with value 20
// Before: 10 -> 20 -> 30 -> null
head = deleteByValue(head, 20);
// After: 10 -> 30 -> null`,
        python: `# Delete node by value
def delete_by_value(head, value):
    if head is None:
        return None

    # If head has the value
    if head.value == value:
        return head.next

    current = head
    while current.next is not None:
        if current.next.value == value:
            current.next = current.next.next
            return head
        current = current.next
    return head  # Value not found

# Example: Delete node with value 20
# Before: 10 -> 20 -> 30 -> None
head = delete_by_value(head, 20)
# After: 10 -> 30 -> None`
      }
    }
  ],

  codeExamples: {
    javascript: `// ============================================
// SINGLY LINKED LIST IMPLEMENTATION
// ============================================

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // Insert at head - O(1)
  insertAtHead(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
  }

  // Insert at tail - O(n)
  insertAtTail(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.length++;
  }

  // Insert at position - O(n)
  insertAt(value, position) {
    if (position < 0 || position > this.length) {
      throw new Error('Invalid position');
    }
    if (position === 0) {
      this.insertAtHead(value);
      return;
    }

    const newNode = new Node(value);
    let current = this.head;
    for (let i = 0; i < position - 1; i++) {
      current = current.next;
    }
    newNode.next = current.next;
    current.next = newNode;
    this.length++;
  }

  // Delete from head - O(1)
  deleteFromHead() {
    if (!this.head) return null;
    const value = this.head.value;
    this.head = this.head.next;
    this.length--;
    return value;
  }

  // Delete from tail - O(n)
  deleteFromTail() {
    if (!this.head) return null;
    if (!this.head.next) {
      const value = this.head.value;
      this.head = null;
      this.length--;
      return value;
    }

    let current = this.head;
    while (current.next.next) {
      current = current.next;
    }
    const value = current.next.value;
    current.next = null;
    this.length--;
    return value;
  }

  // Search - O(n)
  search(value) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  // Print list
  print() {
    const values = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    console.log(values.join(' -> ') + ' -> null');
  }
}

// ============================================
// DOUBLY LINKED LIST IMPLEMENTATION
// ============================================

class DoublyNode {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Insert at head - O(1)
  insertAtHead(value) {
    const newNode = new DoublyNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
  }

  // Insert at tail - O(1) with tail pointer!
  insertAtTail(value) {
    const newNode = new DoublyNode(value);
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  // Delete from head - O(1)
  deleteFromHead() {
    if (!this.head) return null;
    const value = this.head.value;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    this.length--;
    return value;
  }

  // Delete from tail - O(1) with tail pointer!
  deleteFromTail() {
    if (!this.tail) return null;
    const value = this.tail.value;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.length--;
    return value;
  }

  // Traverse forward
  printForward() {
    const values = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    console.log('Forward: ' + values.join(' <-> '));
  }

  // Traverse backward
  printBackward() {
    const values = [];
    let current = this.tail;
    while (current) {
      values.push(current.value);
      current = current.prev;
    }
    console.log('Backward: ' + values.join(' <-> '));
  }
}

// Usage Example
const sll = new SinglyLinkedList();
sll.insertAtTail(10);
sll.insertAtTail(20);
sll.insertAtTail(30);
sll.print();  // 10 -> 20 -> 30 -> null

const dll = new DoublyLinkedList();
dll.insertAtTail(10);
dll.insertAtTail(20);
dll.insertAtTail(30);
dll.printForward();   // Forward: 10 <-> 20 <-> 30
dll.printBackward();  // Backward: 30 <-> 20 <-> 10`,

    python: `# ============================================
# SINGLY LINKED LIST IMPLEMENTATION
# ============================================

class Node:
    def __init__(self, value):
        self.value = value
        self.next = None


class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.length = 0

    # Insert at head - O(1)
    def insert_at_head(self, value):
        new_node = Node(value)
        new_node.next = self.head
        self.head = new_node
        self.length += 1

    # Insert at tail - O(n)
    def insert_at_tail(self, value):
        new_node = Node(value)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
        self.length += 1

    # Insert at position - O(n)
    def insert_at(self, value, position):
        if position < 0 or position > self.length:
            raise IndexError('Invalid position')
        if position == 0:
            self.insert_at_head(value)
            return

        new_node = Node(value)
        current = self.head
        for _ in range(position - 1):
            current = current.next
        new_node.next = current.next
        current.next = new_node
        self.length += 1

    # Delete from head - O(1)
    def delete_from_head(self):
        if not self.head:
            return None
        value = self.head.value
        self.head = self.head.next
        self.length -= 1
        return value

    # Delete from tail - O(n)
    def delete_from_tail(self):
        if not self.head:
            return None
        if not self.head.next:
            value = self.head.value
            self.head = None
            self.length -= 1
            return value

        current = self.head
        while current.next.next:
            current = current.next
        value = current.next.value
        current.next = None
        self.length -= 1
        return value

    # Search - O(n)
    def search(self, value):
        current = self.head
        index = 0
        while current:
            if current.value == value:
                return index
            current = current.next
            index += 1
        return -1

    def __str__(self):
        values = []
        current = self.head
        while current:
            values.append(str(current.value))
            current = current.next
        return ' -> '.join(values) + ' -> None'


# ============================================
# DOUBLY LINKED LIST IMPLEMENTATION
# ============================================

class DoublyNode:
    def __init__(self, value):
        self.value = value
        self.prev = None
        self.next = None


class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.length = 0

    # Insert at head - O(1)
    def insert_at_head(self, value):
        new_node = DoublyNode(value)
        if not self.head:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node
        self.length += 1

    # Insert at tail - O(1) with tail pointer!
    def insert_at_tail(self, value):
        new_node = DoublyNode(value)
        if not self.tail:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node
        self.length += 1

    # Delete from head - O(1)
    def delete_from_head(self):
        if not self.head:
            return None
        value = self.head.value

        if self.head == self.tail:
            self.head = None
            self.tail = None
        else:
            self.head = self.head.next
            self.head.prev = None
        self.length -= 1
        return value

    # Delete from tail - O(1) with tail pointer!
    def delete_from_tail(self):
        if not self.tail:
            return None
        value = self.tail.value

        if self.head == self.tail:
            self.head = None
            self.tail = None
        else:
            self.tail = self.tail.prev
            self.tail.next = None
        self.length -= 1
        return value

    def print_forward(self):
        values = []
        current = self.head
        while current:
            values.append(str(current.value))
            current = current.next
        print('Forward: ' + ' <-> '.join(values))

    def print_backward(self):
        values = []
        current = self.tail
        while current:
            values.append(str(current.value))
            current = current.prev
        print('Backward: ' + ' <-> '.join(values))


# Usage Example
sll = SinglyLinkedList()
sll.insert_at_tail(10)
sll.insert_at_tail(20)
sll.insert_at_tail(30)
print(sll)  # 10 -> 20 -> 30 -> None

dll = DoublyLinkedList()
dll.insert_at_tail(10)
dll.insert_at_tail(20)
dll.insert_at_tail(30)
dll.print_forward()   # Forward: 10 <-> 20 <-> 30
dll.print_backward()  # Backward: 30 <-> 20 <-> 10`
  },

  useCases: [
    {
      title: 'Undo/Redo Systems',
      description: 'Doubly linked lists enable O(1) navigation between previous and next states in document editors, design tools, and IDEs. Each action is a node you can traverse bidirectionally.'
    },
    {
      title: 'Memory Management',
      description: 'Operating systems maintain free lists—linked lists of available memory blocks. When memory is allocated or freed, nodes are efficiently added or removed without shifting.'
    },
    {
      title: 'LRU Cache',
      description: 'Least Recently Used caches combine hash maps with doubly linked lists. The hash map provides O(1) key lookup, while the linked list maintains access order for O(1) eviction.'
    },
    {
      title: 'Music/Video Players',
      description: 'Playlists are naturally modeled as linked lists. Doubly linked lists allow next/previous track navigation, and circular variants enable continuous playback.'
    }
  ],

  commonMistakes: [
    {
      mistake: 'Losing reference to nodes when updating pointers',
      correction: 'Always save references before modifying pointers. For insertion: (1) create new node, (2) set new node\'s next, (3) then update previous node\'s next.'
    },
    {
      mistake: 'Not handling edge cases (empty list, single node)',
      correction: 'Always check if head is null before operations. Handle single-node deletion by setting both head and tail to null.'
    },
    {
      mistake: 'Forgetting to update prev pointers in doubly linked lists',
      correction: 'Every insert/delete operation on a doubly linked list requires updating both next AND prev pointers. Draw diagrams to verify.'
    },
    {
      mistake: 'Using linked lists when arrays would be faster',
      correction: 'If you need random access by index or cache-friendly iteration, arrays outperform linked lists. Use linked lists for frequent insertions/deletions at arbitrary positions.'
    }
  ],

  relatedTopics: ['arrays', 'stacks', 'queues', 'trees'],

  visualization: {
    initialData: [10, 20, 30, 40, 50],
    operations: ['traverse', 'search', 'insertHead', 'insertTail', 'insertAt', 'deleteHead', 'deleteTail', 'deleteValue']
  }
}

export default linkedLists
