//create a Node
function ListNode(val, next, prev) {
	this.val = val;
	this.next = next;
	this.prev = prev;
}

//create a LinkedList
function LinkedList(head, tail) {
	this.head = head;
	this.tail = tail;
	this.pushFront = function (val) {
		//create new node
		//add to front
		var node = new ListNode(val, this.head, null);
		if (this.head) {
			this.head.prev = node;
		} else {
			this.tail = node;
		}
		this.head = node;
		return node;
	};
	this.popFront = function () {
		//return value of first node
		//remove that node from list
		if (!this.head) {
			return null;
		}
		var node = this.head;
		this.head = this.head.next;
		if (this.head) {
			this.head.prev = null;
		} else {
			this.tail = null;
		}
		return node.val;
	};
	this.pushBack = function (val) {
		//create new node
		//add to back
		var node = new ListNode(val, null, this.tail);
		if (this.tail) {
			this.tail.next = node;
		} else {
			this.head = node;
		}
		this.tail = node;
		return node; 
	};
	this.popBack = function () {
		//return value from last node
		//remove that node from list
		if (!this.tail) {
			return null;
		}
		var node = this.tail;
		this.tail = this.tail.prev;
		if (this.tail) {
			this.tail.next = null;
		} else {
			this.head = null;
		}
		return node.val;
	};

	this.length = function (n1, n2) {
		//iterate through list until head points to tail with a counter
		//return 0 if head is null, meaning no nodes in list
		var i = 0;
		var temp = n1;
		if (temp == null) {
			return i;
		}
		while (temp != n2 && temp != null) {
			i++;
			temp = temp.next;
		}
		return i + 1;
	}

	this.get = function (index) {
		//ensure index is valid
		if (!this.head) {
			return "No integers in list";
		}
		if (index < 0 || index >= this.length(this.head, this.tail)) {
			return "Invalid index";
		} else {
			var i = 0;
			var temp = this.head;
			while (temp != null) {
				if (i == index) {
					return temp.val;
				}
				temp = temp.next;
				i++;
			}
		}
	}

	this.toString = function (node) {
		// return node.val;
		var stringResult = "";
		var temp = node;
		if (!temp) {
			return "";
		}
		while (temp != null) {
			stringResult += temp.val;
			stringResult += ", "
			temp = temp.next;
		}
		return stringResult.slice(0, -2);
	}

	this.restoreFromString = function (str) {
		var arr = str.split(",");
		//if length of array is 0, list with no elements
		if (arr.length == 0) {
			this.head;
		}
		this.head = new ListNode(parseInt(arr[0], 10), null, null);
		this.tail = new ListNode(parseInt(arr[arr.length - 1], 10), null, null);
		var temp = this.head;
		for (i = 1; i < arr.length - 1; i++) {
			temp.next = new ListNode(parseInt(arr[i], 10), null, temp);
			temp = temp.next;
		}
		temp.next = this.tail;
		return this.head;
	}

	this.getHead = function () {
		return this.head;
	}

	this.getTail = function () {
		return this.tail;
	}

	this.clear = function () {
		this.head = null;
		this.head = null;
	}

	this.sort = function (n1, n2, length) {
		//if 0 or 1 elements in list, no need to sort
		if (n1 == null || n1.next == null) {
			return n1;
		}
		//get pointer to middle node of list
		var middle = Math.floor(this.length(n1, n2) / 2);
		var left = n1;
		var leftPoint = n1;
		var right = null;
		var rightPoint = null;
		var j = 0;
		while (j < middle - 1) {
			j++;
			leftPoint = leftPoint.next;
		}

		var right = new LinkedList(leftPoint.next, n2);
		leftPoint.next.prev = null;
		leftPoint.next = null;
		//merge-sort on each half of linked list
		this.head = combineMerge(this.sort(left, leftPoint), this.sort(right.head, n2));
		var temp = this.head;
		while (temp.next != null) {
			temp = temp.next;
		}
		this.tail = temp;
		return this.head;
	}

	function combineMerge(n1, n2) {
		var result = new LinkedList(null, null);

		var resPoint = result.head;
		var onePoint = n1;
		var twoPoint = n2;

		while (onePoint && twoPoint) {
			var temp = null;
			if (onePoint.val > twoPoint.val) {
				temp = twoPoint.val;
				twoPoint = twoPoint.next;
			} else {
				temp = onePoint.val;
				onePoint = onePoint.next;
			}

			if (result.head == null) {
				result.head = new ListNode(temp, null, null);
				resPoint = result.head;
			} else {
				resPoint.next = new ListNode(temp, null, resPoint);
				resPoint = resPoint.next;
			}

		}

		while (onePoint != null) {
			resPoint.next = new ListNode(onePoint.val, null, resPoint);
			onePoint = onePoint.next;
			resPoint = resPoint.next;
		} 
		while (twoPoint != null) {
			resPoint.next = new ListNode(twoPoint.val, null, resPoint);
			twoPoint = twoPoint.next;
			resPoint = resPoint.next;
		}
		return result.head;
	}
}

var list = new LinkedList(null, null);

function addBack(value) {
	if (!Number.isInteger(parseInt(value))) {
		document.getElementById("addBackError").innerHTML = "Input must be a valid integer";
		return false;
	}

	var t0 = performance.now();
	list.pushBack(Math.round(value));
	var t1 = performance.now();

	document.getElementById("addBackError").innerHTML = "";
	document.getElementById("demo").innerHTML = "Current List: " + list.toString(list.getHead());
	document.getElementById("demo2").innerHTML = "List Length: " + list.length(list.getHead(),list.getTail());

	var table = document.getElementById("addBackTable");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = list.length(list.getHead(), list.getTail());
	cell2.innerHTML = t1 - t0;

	clearField("addBack");
	return;
}

function addFront(value) {
	if (!Number.isInteger(parseInt(value))) {
		document.getElementById("addFrontError").innerHTML = "Input must be a valid integer";
		return false;
	}

	var t0 = performance.now();
	list.pushFront(Math.round(value));
	var t1 = performance.now();

	document.getElementById("addFrontError").innerHTML = "";
	document.getElementById("demo").innerHTML = "Current List: " + list.toString(list.getHead());
	document.getElementById("demo2").innerHTML = "List Length: " + list.length(list.getHead(), list.getTail());

	var table = document.getElementById("addFrontTable");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = list.length(list.getHead(), list.getTail());
	cell2.innerHTML = t1 - t0;

	clearField("addFront");
	return;
}

function retrieveElement(value) {
	if (!Number.isInteger(parseInt(value))) {
		document.getElementById("getElementError").innerHTML = "Input must be a valid integer";
		return false;
	} if (parseInt(value) < 0 || parseInt(value) >= list.length(list.getHead(), list.getTail())) {
		document.getElementById("getElementError").innerHTML = "Input must be a valid index";
		return false;
	}

	var t0 = performance.now();
	var str = "Element at index " + value + ": " + list.get(parseInt(value));
	var t1 = performance.now();
	
	document.getElementById("getElementError").innerHTML = str.fontcolor("black");
	document.getElementById("demo").innerHTML = "Current List: " + list.toString(list.getHead());
	document.getElementById("demo2").innerHTML = "List Length: " + list.length(list.getHead(), list.getTail());

	var table = document.getElementById("getTable");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = list.length(list.getHead(), list.getTail());
	cell2.innerHTML = t1 - t0;

	clearField("getElement");
}

function removeBack() {
	var t0 = performance.now();
	list.popBack();
	var t1 = performance.now();

	document.getElementById("demo").innerHTML = "Current List: " + list.toString(list.getHead());
	document.getElementById("demo2").innerHTML = "List Length: " + list.length(list.getHead(), list.getTail());

	var table = document.getElementById("removeBackTable");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = list.length(list.getHead(), list.getTail());
	cell2.innerHTML = t1 - t0;

	return;
}

function removeFront() {
	var t0 = performance.now();
	list.popFront();
	var t1 = performance.now();

	list.popFront();
	document.getElementById("demo").innerHTML = "Current List: " + list.toString(list.getHead());
	document.getElementById("demo2").innerHTML = "List Length: " + list.length(list.getHead(), list.getTail());

	var table = document.getElementById("removeFrontTable");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = list.length(list.getHead(), list.getTail());
	cell2.innerHTML = t1 - t0;

	return;
}

function restoreList(str) {
	var t0 = performance.now();
	list.restoreFromString(str);
	var t1 = performance.now();

	document.getElementById("demo").innerHTML = "Current List: " + list.toString(list.getHead());
	document.getElementById("demo2").innerHTML = "List Length: " + list.length(list.getHead(), list.getTail());
	

	var table = document.getElementById("restoreTable");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = list.length(list.getHead(), list.getTail());
	cell2.innerHTML = t1 - t0;

	clearField("restoreList");
	return;
}

function sortList() {
	var t0 = performance.now();
	document.getElementById("demo").innerHTML = "Current List: " + list.toString(list.sort(list.getHead(), list.getTail()));
	var t1 = performance.now();


	var table = document.getElementById("sortTable");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = list.length(list.getHead(), list.getTail());
	cell2.innerHTML = t1 - t0;

	return;
}

function clearList() {
	document.getElementById("demo").innerHTML = "Current List: " + list.toString(list.clear());
	document.getElementById("demo2").innerHTML = "List Length: " + list.length(list.getHead(), list.getTail());
}

function clearField(id) {
	document.getElementById(id).value = "";
	return;
}