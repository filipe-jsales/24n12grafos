function parseInput(input) {
    const edges = input.trim().split('\n').map(line => {
      const [u, v, weight] = line.split(' ');
      return { u, v, weight: parseFloat(weight) };
    });
  
    const setA = [...new Set(edges.map(edge => edge.u))];
    const setB = [...new Set(edges.map(edge => edge.v))];
  
    const costMatrix = Array(setA.length)
      .fill(0)
      .map(() => Array(setB.length).fill(Infinity));
  
    edges.forEach(({ u, v, weight }) => {
      const i = setA.indexOf(u);
      const j = setB.indexOf(v);
      costMatrix[i][j] = weight;
    });
  
    return { setA, setB, costMatrix };
  }
  
  function hungarianAlgorithm(costMatrix) {
    const n = costMatrix.length;
    const m = costMatrix[0].length;
  
    const u = Array(n).fill(0);
    const v = Array(m).fill(0);
    const p = Array(m).fill(-1);
  
    for (let i = 0; i < n; i++) {
      const links = Array(m).fill(-1);
      const mins = Array(m).fill(Infinity);
      const visited = Array(m).fill(false);
  
      let markedI = i;
      let markedJ = -1;
      let j = 0;
  
      while (true) {
        j = -1;
        for (let k = 0; k < m; k++) {
          if (!visited[k]) {
            const cur = costMatrix[markedI][k] - u[markedI] - v[k];
            if (cur < mins[k]) {
              mins[k] = cur;
              links[k] = markedJ;
            }
            if (j === -1 || mins[k] < mins[j]) {
              j = k;
            }
          }
        }
  
        const delta = mins[j];
        for (let k = 0; k < m; k++) {
          if (visited[k]) {
            u[p[k]] += delta;
            v[k] -= delta;
          } else {
            mins[k] -= delta;
          }
        }
        u[i] += delta;
        visited[j] = true;
        markedJ = j;
        markedI = p[j];
  
        if (markedI === -1) break;
      }
  
      while (links[j] !== -1) {
        p[j] = p[links[j]];
        j = links[j];
      }
      p[j] = i;
    }
  
    const result = Array(n).fill(-1);
    for (let j = 0; j < m; j++) {
      if (p[j] !== -1) {
        result[p[j]] = j;
      }
    }
  
    const totalCost = result.reduce((acc, r, i) => acc + costMatrix[i][r], 0);
  
    return { result, cost: totalCost };
  }
  
  export { parseInput, hungarianAlgorithm };
  