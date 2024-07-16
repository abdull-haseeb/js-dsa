
class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(0);
    this.count = size; // Initially, each item is its own component
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);

    if (rootX !== rootY) {
      // Union by rank
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX] += 1;
      }
      this.count--; // Reduce the number of components
    }
  }

  getCount() {
    return this.count;
  }
}

// Number of items
const size = 10;

// Initialize union-find structure
const uf = new UnionFind(size);

// Perform the union operations
const operations = [
  [1, 2],
  [3, 4],
  [5, 6],
  [7, 8],
  [7, 9],
  [2, 8],
  [0, 5],
  [1, 9]
];

for (const [x, y] of operations) {
  uf.union(x, y);
}

// Get the number of connected components
const connectedComponents = uf.getCount();

console.log(`Number of connected components: ${connectedComponents}`);
