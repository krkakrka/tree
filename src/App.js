import React from 'react';
import logo from './logo.svg';
import './App.css';

function TreeRecursive({ node, onAddNode }) {
  return (
    <ul>
      <li>{node.content}</li>
      {node.children.length > 0
        ? node.children.map(child => <TreeRecursive node={child} />)
        : null
      }
      <li><button onClick={() => onAddNode(node)}>Add node</button></li>
    </ul>
  );
}

function TreeIterative({ node, onAddNode }) {
  let level = 0;
  const nodesStack = [];
  const nodesWithLevels = [];

  // nodesStack.push({ node, level });
  // while (nodesStack.length) {
  let currentNode = node;
  while (true) {
    while (currentNode) {

    }
    nodesStack.push(node.children[node.children.length - 1], node);
    // handle single child?
    node = node.children[0];

    node = nodesStack.pop();

    const { node, level } = nodesStack.pop();
    nodesWithLevels.push({ node, level });
    // nodesWithLevels.push(<ul><li>{node.content}</li></ul>);
    if (node.children.length > 0) {
      const childrenWithLevels = node.children.map(child => ({ node: child, level: level + 1 }))
      nodesStack.push(...childrenWithLevels);
    }
  }

  // const nodeToList = (node) => (
  //   <ul>
  //     <li>{node.content}</li>
  //     {node.children.length > 0 ? node.children : null}
  //   </ul>
  // );

  return (
    <ul>
      {nodesWithLevels.map(({ node, level }) => (
        <li style={{ marginLeft: `${level * 10}px` }}>{node.content}</li>
      ))}
    </ul>
  );
}

const testTree = {
  content: 'root',
  children: [
    { content: 'child1', children: [
      { content: 'child2', children: [
        { content: 'child3', children: []}
      ]}
    ]},
    { content: 'child1', children: []}
  ]
};

function App() {
  const [tree, setTree] = React.useState(testTree);
  const handleAddNode = (parentNode) => {
    const newNode = { content: Math.random(), children: [] };
  };

  return (
    <div className="App">
      {/* <TreeIterative node={tree} onAddNode={handleAddNode} /> */}
      <TreeRecursive node={tree} onAddNode={handleAddNode} />
    </div>
  );
}

export default App;
