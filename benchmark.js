var QuadTree = require("./");
var Benchmark = require("benchmark");

var suite = new Benchmark.Suite();

var hundredItems = [];
for (var i=0; i<100; ++i) {
  hundredItems.push({ x: 80*Math.random(), y: 80*Math.random(), w: 20*Math.random(), h: 20*Math.random(), i: i });
}

var filledTree = QuadTree(0, 0, 100, 100);
for (var i=0; i<1000; ++i) {
  filledTree.put({ x: 80*Math.random(), y: 80*Math.random(), w: 20*Math.random(), h: 20*Math.random(), i: i });
}

function noop () {}

suite
.add('put&delete 100 times', function() {
  var tree = QuadTree(0, 0, 100, 100);
  var i;
  for (i=0; i<100; ++i) {
    tree.put(hundredItems[i]);
  }
  for (i=50; i<100; ++i) {
    tree.remove(hundredItems[i]);
  }
  for (i=49; i>=0; --i) {
    tree.remove(hundredItems[i]);
  }
})
.add('get bound  100 times', function() {
  for (var i=0; i<20; ++i) {
    filledTree.get({ x: 60*Math.random(), y: 60*Math.random(), w: 40, h: 40 }, noop);
    filledTree.get({ x: 80*Math.random(), y: 80*Math.random(), w: 20, h: 20 }, noop);
    filledTree.get({ x: 90*Math.random(), y: 90*Math.random(), w: 10, h: 10 }, noop);
    filledTree.get({ x: 95*Math.random(), y: 95*Math.random(), w: 5, h: 5 }, noop);
    filledTree.get({ x: 99*Math.random(), y: 99*Math.random(), w: 1, h: 1 }, noop);
  }
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
// run async
.run();
