/* ✏️ Optional: fill in the "From:" and "To:" lines on the red card */
var FROM = "";
var TO   = "";

function $(id){ return document.getElementById(id); }

function show(id){
  document.querySelectorAll('.screen').forEach(function(s){ s.classList.remove('on'); });
  var s = $(id); s.classList.add('on'); s.scrollTop = 0;
}

$('from').textContent = FROM;
$('to').textContent   = TO;

/* envelope -> red card */
$('envBtn').addEventListener('click', function(){
  var b = this;
  b.classList.add('open');
  setTimeout(function(){ show('s2'); b.classList.remove('open'); }, 420);
});

/* red card -> letter */
$('goBtn').addEventListener('click', function(){ show('s3'); });

/* draw the bunting flags across the top of the letter page */
(function(){
  var colors = ['#e8e4df','#3a8f8c','#d8d4cf','#2a6f72'];
  var n = 22, w = 800 / n, svg = '';
  svg += '<path d="M0 6 Q400 22 800 6" stroke="#f2cfcf" stroke-width="2" fill="none" vector-effect="non-scaling-stroke"/>';
  for (var i = 0; i < n; i++){
    var x = i * w + 4, y = 8 + 12 * Math.sin((i / n) * Math.PI);
    svg += '<path d="M'+x+' '+y+' L'+(x+w-8)+' '+(y+1)+' L'+(x+w/2-4)+' '+(y+30)+'Z" fill="'+colors[i % 4]+'" opacity=".92"/>';
  }
  $('flags').innerHTML = svg;
})();

/* ============ Screen 4 (scrapbook) ============ */
/* ✏️ Put the birthday person's name and age here */
var NAME = "Ella";  // the name shown on the paper and in the notes (empty = "love")
var AGE  = "21";    // two digits: the photo of his face goes between them

document.querySelectorAll('.nm').forEach(function(el){ el.textContent = NAME || "love"; });
if (AGE.length === 2){ $('ageA').textContent = AGE[0]; $('ageB').textContent = AGE[1]; }

$('moreBtn').addEventListener('click', function(){ show('s4'); startReveal(); });
$('replayBtn').addEventListener('click', function(){ show('s1'); });

/* fade things in as you scroll down */
var io;
function startReveal(){
  var items = document.querySelectorAll('#s4 .reveal');
  if (!('IntersectionObserver' in window)){ items.forEach(function(e){ e.classList.add('in'); }); return; }
  if (io) io.disconnect();
  io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { root: $('s4'), threshold: .12 });
  items.forEach(function(e){ e.classList.remove('in'); io.observe(e); });
}
