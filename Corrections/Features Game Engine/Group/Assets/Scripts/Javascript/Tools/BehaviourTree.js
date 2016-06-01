function Node(name, tree) {
	name: name,
	tree: tree;
	branch: [],
	condition: [],
	function addNode(node , condition) {
		if (node instanceof Node ) {
			this.branch.push(node);
			this.condition.push(condition);
			return true;
		}
		if (node instanceof Leaf ) {
			this.branch.push(node);
			this.condition.push(condition);
			return true;
		}
		return false;
	},
	function check() {
		for (var i = 0; i < this.condition.length; i++) {
			if (condition[i]) {
				this.tree.currentNode = this.branch[i];
				return true;
			}
		}
		return false;
	}
}

function Leaf(name, tree, sequence) {
	name: name,
	tree: tree;
	sequence: sequence || new Sequence(),
	function check() {
		this.sequence;
		this.tree.currentNode = this.tree.startingNode;
	}
}

function Sequence() {
	console.log('do something');
}

function BehaviourTree(name) {
	name: name,
	nodes: [],
	leafs : [],
	startingNode: null,
	currentNode: null,
	function createNode(name, isStarting) {
		isStarting = isStarting || false;
		var n = new Node(name, this);
		this.nodes.push(n);
		if (isStarting) {
			this.startingNode = n;
		}
		return n;
	},
	function createLeaf(name, tree, sequence) {
		var l = new Leaf(name, this, sequence);
		this.leafs.push(l);
		return l;
	},
	function addBranch(start,end,condition) {
		start.branch.push(end);
		start.condition.push(condition);
	},
	function explore() {
		this.currentNode.check();
	}
}
