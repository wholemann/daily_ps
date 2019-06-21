
class Queue {

  constructor() {
    this.enqueueStack = [];
    this.dequeueStack = [];
  }

  enqueue(value) {
    this.enqueueStack.push(value);
  }

  dequeue() {
    if (this.dequeueStack.length === 0) {
      this.transferValues();
    }
    const returnValue = this.dequeueStack.pop();
    return returnValue;
  }

  transferValues() {
    while (!(this.enqueueStack.length === 0)) {
      const value = this.enqueueStack.pop();
      this.dequeueStack.push(value);
    }
  }

  isEmpty() {
    return (this.dequeueStack.length === 0) && (this.enqueueStack.length === 0);
  }
}

class Graph {

  constructor() {
    this.edges = {};
    this.vertices = [];
  }

  addVertex(vertex) {
    this.vertices.push(vertex);
    this.edges[vertex] = [];
  }

  addEdge(vertex1, vertex2) {
    this.edges[vertex1].push(vertex2);
    this.edges[vertex2].push(vertex1);
  }

  addDirectedEdge(vertex1, vertex2) {
    this.edges[vertex1].push(vertex2);
  }

  printGraph() {
    return this.vertices
      .map(
        (vertex) => 
          `${vertex} => ${this.edges[vertex].join(' ')}`
        )
      .join('\n');
  }

  bfs(startVertex) {
    const queue = new Queue();
    const visited = new Set();
    const searchPath = [];
    queue.enqueue(startVertex);
    visited.add(startVertex);

    while (!queue.isEmpty()) {
      const vertex = queue.dequeue();
      searchPath.push(vertex);
      this.edges[vertex]
        .filter(v => !visited.has(v))
        .forEach(v => {
          visited.add(v);
          queue.enqueue(v);
        });
    }

    return searchPath.join(' ');
  }

  dfs(startVertex) {
    const stack = [];
    const visited = new Set();
    const searchPath = [];

    const traversalAdjacency = (vertex) => {
      this.edges[vertex]
      .filter(v => !visited.has(v))
      .forEach(v => {
        if (visited.has(v)) {
          return;
        }
        visited.add(v);
        stack.push(v);
        traversalAdjacency(v);
      });      
    }

    stack.push(startVertex);
    visited.add(startVertex);
    traversalAdjacency(startVertex);

    return stack.join(' ');
  }
}

describe('Graph', () => {
  let graph;

  beforeEach(() => {
    graph = new Graph();
  });

  test('graph is exist', () => {
    expect(graph).toBeDefined();
  });

  test('addVertex', () => {
    graph.addVertex('A');
    graph.addVertex('B');
    expect(graph.vertices.includes('A')).toBeTruthy();
    expect(graph.vertices.includes('B')).toBeTruthy();
  });

  test('AddEdge', () => {
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addEdge('A', 'B');

    expect(graph.edges['A'].includes('B')).toBeTruthy();
    expect(graph.edges['B'].includes('A')).toBeTruthy();
  });

  test('AddDirectedEdge', () => {
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addDirectedEdge('A', 'B');

    expect(graph.edges['A'].includes('B')).toBeTruthy();
    expect(graph.edges['B'].includes('A')).toBeFalsy();
  });

  test('printGraph() with UndirectedEdges', () => {
    const vertices = ['A', 'B', 'C', 'D', 'E'];
    vertices.forEach(vertex => {
      graph.addVertex(vertex);
    });

    const edges = [['A', 'B'], ['A', 'C'], ['A', 'E'], ['B', 'D'], ['C', 'D']];
    edges.forEach(edge => {
      graph.addEdge(...edge);
    });

    expect(graph.printGraph()).toEqual(
      `A => B C E
B => A D
C => A D
D => B C
E => A`
    );
  });

  test('printGraph() with DirectedEdges', () => {
    const vertices = ['A', 'B', 'C', 'D', 'E'];
    vertices.forEach(vertex => {
      graph.addVertex(vertex);
    });

    const edges = [['A', 'B'], ['A', 'C'], ['A', 'E'], ['B', 'D'], ['C', 'D']];
    edges.forEach(edge => {
      graph.addDirectedEdge(...edge);
    });

    expect(graph.printGraph()).toEqual(
      `A => B C E
B => D
C => D
D => 
E => `
    );
  });
});

describe('Queue', () => {
  const queue = new Queue();
  expect(queue).toBeDefined();

  queue.enqueue(1);
  queue.enqueue(2);
  expect(queue.dequeue()).toBe(1);
  expect(queue.dequeue()).toBe(2);

  expect(queue.isEmpty()).toBeTruthy();
});

describe('BFS', () => {
  let graph;

  beforeEach(() => {
    graph = new Graph();
  });

  it('should return A B C if graph is A -> B C', () => {
    const vertices = ['A', 'B', 'C'];
    vertices.forEach(vertex => {
      graph.addVertex(vertex);
    });

    const edges = [['A', 'B'], ['A', 'C']];
    edges.forEach(edge => {
      graph.addDirectedEdge(...edge);
    });

    expect(graph.bfs('A')).toEqual('A B C');
  });

  it('should return A B D E C F if vertices and edges as below', () => {
    const vertices = ['A', 'B', 'C', 'D', 'E', 'F'];
    vertices.forEach(vertex => {
      graph.addVertex(vertex);
    });

    const edges = [['A', 'B'], ['A', 'D'], ['A', 'E'], ['B', 'C'], ['D', 'E'], ['E', 'F'], ['E', 'C'], ['C', 'F']];
    edges.forEach(edge => {
      graph.addEdge(...edge);
    });

    expect(graph.bfs('A')).toEqual('A B D E C F');
  });
});

describe('DFS', () => {
  let graph;

  beforeEach(() => {
    graph = new Graph();
  });
  
  it('should return A B D C if graph is A -> B C, B -> D', () => {
    const vertices = ['A', 'B', 'C', 'D'];
    vertices.forEach(vertex => {
      graph.addVertex(vertex);
    });

    const edges = [['A', 'B'], ['A', 'C'], ['B', 'D']];
    edges.forEach(edge => {
      graph.addDirectedEdge(...edge);
    });

    expect(graph.dfs('A')).toEqual('A B D C');
  });

  it('should return A B C E D F if vertices and edges as below', () => {
    const vertices = ['A', 'B', 'C', 'D', 'E', 'F'];
    vertices.forEach(vertex => {
      graph.addVertex(vertex);
    });

    const edges = [['A', 'B'], ['A', 'D'], ['A', 'E'], ['B', 'C'], ['D', 'E'], ['E', 'F'], ['E', 'C'], ['C', 'F']];
    edges.forEach(edge => {
      graph.addEdge(...edge);
    });
    console.log(graph.printGraph());
    expect(graph.dfs('A')).toEqual('A B C E D F');
  });
});