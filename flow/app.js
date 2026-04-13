var MANIFEST='manifest.json';
var allPosts=[];
var allLoaded=false;
function loadManifest(){return fetch(MANIFEST+'?t='+Date.now()+'&r=Math.random()').then(function(r){return r.json();}).then(function(d){return d.posts||[];});}
function formatDate(iso){var d=new Date(iso);var pad=function(n){return String(n).padStart(2,'0');};return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());}
function escapeHtml(text){return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function formatBody(text){
var placeholders=[];
var idx=0;
text=text.replace(/<([^>]+)>/g,function(m){var ph='\x00'+idx+'\x00';placeholders.push({ph:ph,orig:m});idx++;return ph;});
text=escapeHtml(text);
text=text.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
text=text.replace(/\*(.+?)\*/g,'<em>$1</em>');
text=text.replace(/`(.+?)`/g,'<code>$1</code>');
for(var i=0;i<placeholders.length;i++){text=text.replace(placeholders[i].ph,placeholders[i].orig);}
var paras=text.split(/\n\n+/);
if(paras.length>1){var out='';for(var j=0;j<paras.length;j++){out+='<p>'+paras[j].replace(/\n/g,'<br>')+'</p>';}return out;}
return text.replace(/\n/g,'<br>');
}
function flipCard(card,e){e.stopPropagation();card.classList.toggle('flipped');}
function renderCard(post,index){
var card=document.createElement('div');card.className='card';
var dateStr=formatDate(post.created);
var catTag=post.category?'<span class="tag tag-cat">'+escapeHtml(post.category)+'</span>':'';
var contentTags='';if(post.contentTags){var ts=post.contentTags.slice(0,3);for(var k=0;k<ts.length;k++){contentTags+='<span class="tag tag-content">'+escapeHtml(ts[k])+'</span>';}}
var frontHTML='<div class="card-content-wrap"><div class="card-meta"><span class="card-date">'+dateStr+'</span><div class="card-tags">'+catTag+contentTags+'</div></div><div class="card-body">'+formatBody(post.content)+'</div><div class="card-flip-hint"><svg class="flip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>Tap to see original</div></div>';
var origC=post.originalContent||post.content;
var backHTML='<div class="card-back-content"><div class="card-back-label">Original</div><div class="card-back-body">'+formatBody(origC)+'</div>';
if(post.question){backHTML+='<div class="card-back-question"><strong>Question:</strong> '+escapeHtml(post.question)+'</div>';}
backHTML+='</div>';
card.innerHTML='<div class="card-inner"><div class="card-front">'+frontHTML+'</div><div class="card-back">'+backHTML+'</div></div>';
card.addEventListener('click',function(e){flipCard(card,e);});
setTimeout(function(){card.classList.add('visible');card.style.animation='cardEntrance .55s '+(index*70)+'ms forwards';},10);
return card;
}
function showSkeletons(n){var feed=document.getElementById('feed');for(var i=0;i<n;i++){var s=document.createElement('div');s.className='skeleton-card';s.innerHTML='<div style="height:10px;width:28%;margin-bottom:16px;background:var(--surface-2);border-radius:4px"></div><div style="height:17px;width:100%;margin-bottom:9px;background:var(--surface-2);border-radius:4px"></div><div style="height:17px;width:75%;margin-bottom:9px;background:var(--surface-2);border-radius:4px"></div><div style="height:17px;width:60%;background:var(--surface-2);border-radius:4px"></div>';feed.appendChild(s);}}
function clearSkeletons(){var ss=document.querySelectorAll('.skeleton-card');for(var i=0;i<ss.length;i++)ss[i].remove();}
function loadPosts(){if(allLoaded)return;allLoaded=true;showSkeletons(3);loadManifest().then(function(posts){allPosts=posts;clearSkeletons();if(allPosts.length===0){document.getElementById('endMarker').style.display='block';document.getElementById('endMarker').textContent='NO POSTS YET';return;}var sorted=allPosts.slice();var feed=document.getElementById('feed');for(var i=0;i<sorted.length;i++){feed.appendChild(renderCard(sorted[i],i));}document.getElementById('endMarker').style.display='block';}).catch(function(e){clearSkeletons();console.error('Failed to load posts:',e);});}
window.allLoaded=false;loadPosts();
