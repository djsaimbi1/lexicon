function $(i){return document.getElementById(i)}
function A(x,f){for(var i=0;i<x.length;i++)f(x[i],i)}
var store=(function(){var m={},ok=true;try{localStorage.setItem('_t','1');localStorage.removeItem('_t')}catch(e){ok=false}return{get:function(k){if(ok){try{return localStorage.getItem(k)}catch(e){}}return m[k]||null},set:function(k,v){if(ok){try{localStorage.setItem(k,v);return}catch(e){}}m[k]=v}}})();
var RAW=(typeof window.RAW!=='undefined')?window.RAW:[];
var POS={a:'adjective',n:'noun',v:'verb',r:'adverb'};
var W=[];A(RAW,function(l){var f=l.split('|');if(f.length>=7)W.push({w:f[0],p:f[1],t:POS[f[2]]||f[2],c:f[3],d:f[4],e:f[5],s:f[6].split(',')})});
if(!W.length)W=[{w:'Hope',p:'/həʊp/',t:'noun',c:'Emotion',d:'desire and expectation for good',e:'hope for a better year',s:['optimism','trust']}];
var CATS=[];A(W,function(w){if(CATS.indexOf(w.c)<0)CATS.push(w.c)});
var S={i:0,kn:{},sv:{},fl:false,qi:0,qs:0,qq:[],qa:false,qd:false,bc:'all',q:''};
function load(){try{var x=JSON.parse(store.get('lex_s'));if(x){S.kn=x.k||{};S.sv=x.v||{}}}catch(e){}}
function save(){store.set('lex_s',JSON.stringify({k:S.kn,v:S.sv}))}
function cnt(o){var n=0;for(var k in o)n++;return n}
function shuf(a){var b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t}return b}
function say(t){try{if(window.speechSynthesis){speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t);u.rate=.85;speechSynthesis.speak(u)}}catch(e){}}
$('sp').onclick=function(){this.className='off'};
function setT(d){document.documentElement.className=d?'dk':'';$('th').innerHTML=d?'&#9790;&#xFE0E;':'&#9728;&#xFE0E;';store.set('lex_th',d?'1':'')}
$('th').onclick=function(){setT(document.documentElement.className!=='dk')};
if(store.get('lex_th')==='1')setT(true);
var NV=[['nL','pL'],['nB','pB'],['nQ','pQ'],['nF','pF']];
function goP(p){A(NV,function(m){$(m[0]).className='nb'+(m[1]===p?' on':'');$(m[1]).className='pg'+(m[1]===p?' on':'')});if(p==='pB')rB();if(p==='pQ')sQ();if(p==='pF')rF();if(p==='pL')rL()}
A(NV,function(n){$(n[0]).onclick=function(){goP(n[1])}});
function goW(ix){S.i=ix;S.fl=true;$('fc').className='fl';rL();goP('pL')}
$('fc').onclick=function(e){var t=e.target;while(t&&t.nodeType===1){if(t.classList&&t.classList.contains('ib'))return;t=t.parentNode}S.fl=!S.fl;this.className=S.fl?'fl':''};
$('csp').onclick=function(e){e.stopPropagation();say(W[S.i].w)};
$('cfv').onclick=function(e){e.stopPropagation();tSv(W[S.i].w)};
$('bp').onclick=function(){S.i=(S.i-1+W.length)%W.length;S.fl=false;$('fc').className='';rL()};
$('bn').onclick=function(){S.i=(S.i+1)%W.length;S.fl=false;$('fc').className='';rL()};
$('bk').onclick=function(){var w=W[S.i].w;if(S.kn[w]){delete S.kn[w];save();rL()}else{S.kn[w]=1;save();S.i=(S.i+1)%W.length;S.fl=false;$('fc').className='';rL()}};
function tSv(w){if(S.sv[w])delete S.sv[w];else S.sv[w]=1;save();rL();rB()}
function rL(){var w=W[S.i];$('cw').textContent=w.w;$('cph').textContent=w.p;$('cpo').textContent=w.t;$('cdf').textContent=w.d;$('cex').textContent='\u201C'+w.e+'\u201D';$('csy').innerHTML=w.s.map(function(x){return '<span>'+x+'</span>'}).join('');$('cfv').innerHTML=S.sv[w.w]?'&#9829;&#xFE0E;':'&#9825;&#xFE0E;';$('cfv').className='ib'+(S.sv[w.w]?' fv':'');$('bk').textContent=S.kn[w.w]?'\u2713 Known':'I know this';$('bk').className='cb '+(S.kn[w.w]?'ks':'pr');$('pf').style.width=((S.i+1)/W.length*100)+'%';$('ptx').textContent=(S.i+1)+'/'+W.length;$('sL').textContent=cnt(S.kn);$('sT').textContent=W.length;$('sS').textContent=cnt(S.sv)}
$('bq').oninput=function(){S.q=this.value.toLowerCase();rB()};
function rB(){var h='<button class="cc'+(S.bc==='all'?' on':'')+'" data-c="all">All Categories</button>';A(CATS,function(c){h+='<button class="cc'+(S.bc===c?' on':'')+'" data-c="'+c+'">'+c+'</button>'});$('cbx').innerHTML=h;
var f=W.filter(function(w){if(S.q&&w.w.toLowerCase().indexOf(S.q)<0&&w.d.toLowerCase().indexOf(S.q)<0)return false;if(S.bc!=='all'&&w.c!==S.bc)return false;return true});
var g='';if(!f.length)g='<p style="color:var(--mu);font-size:.85rem;padding:1.5rem 0">No words match.</p>';
A(f,function(w){g+='<div class="wc" data-i="'+W.indexOf(w)+'">'+(S.kn[w.w]?'<div class="km">&#10003;</div>':'')+'<div class="w">'+w.w+'</div><div class="p">'+w.t+' &middot; '+w.c+'</div><div class="d">'+w.d+'</div></div>'});
$('gb').innerHTML=g;
A($('cbx').children,function(b){b.onclick=function(){S.bc=b.getAttribute('data-c');rB()}});
A($('gb').children,function(b){b.onclick=function(){goW(+b.getAttribute('data-i'))}})}
function sQ(){S.qi=0;S.qs=0;S.qd=false;S.qa=false;S.qq=shuf(W).slice(0,10).map(function(w){var wr=shuf(W.filter(function(x){return x.w!==w.w})).slice(0,3).map(function(x){return x.d});return{w:w,o:shuf([w.d].concat(wr)),c:w.d}});rQ()}
function rQ(){if(S.qd){var pc=Math.round(S.qs/S.qq.length*100);$('qb').innerHTML='<div class="qr"><h3 class="pt">Quiz Complete</h3><div class="pc">'+pc+'%</div><p class="ps">'+(pc>=70?'Outstanding! Your vocabulary shines.':'Keep practicing \u2014 every word counts.')+'</p><button class="qn" id="qa">Try Again</button></div>';$('qa').onclick=sQ;return}
var q=S.qq[S.qi];S.qa=false;
var h='<div class="qs"><div style="text-align:center"><div class="sn">'+S.qs+'</div><div class="sl">Score</div></div><div style="text-align:center"><div class="sn">'+(S.qi+1)+'/'+S.qq.length+'</div><div class="sl">Question</div></div></div><div class="qb"><div class="ql">What is the meaning of</div><div class="qw">'+q.w.w+'</div><div class="qp">'+q.w.p+'</div></div><div class="qo">';
A(q.o,function(o){h+='<button class="qi">'+o+'</button>'});
$('qb').innerHTML=h;
A($('qb').querySelectorAll('.qi'),function(b){b.onclick=function(){if(S.qa)return;S.qa=true;var ok=b.textContent===q.c;if(ok)S.qs++;A($('qb').querySelectorAll('.qi'),function(x){x.style.pointerEvents='none';if(x.textContent===q.c)x.className='qi ok';else if(x===b&&!ok)x.className='qi no'});var last=S.qi>=S.qq.length-1;var nb=document.createElement('button');nb.className='qn';nb.textContent=last?'See Results':'Next \u2192';nb.onclick=function(){if(last)S.qd=true;else S.qi++;rQ()};$('qb').appendChild(nb)}})}
function rF(){var f=W.filter(function(w){return !!S.sv[w.w]});if(!f.length){$('fb').innerHTML='<div class="fe">&#9825;&#xFE0E;<br>No saved words yet.<br>Tap the heart on a flashcard to save one.</div>';return}
var h='<div class="fg">';A(f,function(w){h+='<div class="fvi" data-w="'+w.w+'"><div><div class="fw">'+w.w+'</div><div class="fd">'+w.d+'</div></div><button class="fx" data-x="'+w.w+'">&#10005;</button></div>'});h+='</div>';$('fb').innerHTML=h;
A($('fb').querySelectorAll('.fvi'),function(it){it.onclick=function(e){if(e.target.classList&&e.target.classList.contains('fx'))return;for(var i=0;i<W.length;i++)if(W[i].w===it.getAttribute('data-w')){goW(i);break}}});
A($('fb').querySelectorAll('.fx'),function(b){b.onclick=function(e){e.stopPropagation();delete S.sv[b.getAttribute('data-x')];save();rF();rL()}})}
var arm=0;
$('rb').onclick=function(){var rb=this;if(arm){arm=0;S.kn={};S.sv={};S.i=0;S.fl=false;$('fc').className='';save();rL();rF();rb.innerHTML='&#8634;'}else{arm=1;rb.innerHTML='?';setTimeout(function(){arm=0;rb.innerHTML='&#8634;'},2500)}};
load();rL();