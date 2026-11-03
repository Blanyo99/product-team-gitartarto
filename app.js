const tabs=[...document.querySelectorAll('[data-tab]')];
function route(){const selected=location.hash==='#tervezes'?'process':location.hash==='#mellekletek'?'attachments':'home';for(const id of ['home','process','attachments'])document.getElementById(id).hidden=id!==selected;tabs.forEach(a=>{if(a.dataset.tab===selected)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});if(selected!=='home'||location.hash==='#fooldal')window.scrollTo(0,0);}
window.addEventListener('hashchange',route);route();
const input=document.getElementById('step-input');let viewerModule;
input.addEventListener('change',async()=>{const file=input.files[0];if(!file)return;const status=document.getElementById('model-status');if(!/\.(stp|step)$/i.test(file.name)){status.textContent='Kérlek, STEP vagy STP fájlt válassz.';return;}if(file.size>30*1024*1024){status.textContent='A böngészős előnézethez legfeljebb 30 MB-os fájlt válassz.';return;}status.textContent='A 3D megjelenítő betöltése…';input.disabled=true;try{viewerModule=viewerModule||await import('./viewer.js');await viewerModule.openStep(file);}catch(error){status.textContent='A modell nem nyitható meg. Ellenőrizd a STEP-fájlt és az internetkapcsolatot.';console.error(error);}finally{input.disabled=false;input.value='';}});

document.getElementById('open-step').addEventListener('click',()=>input.click());

// Add the finished recording as the src of #blanka-video; controls activate on metadata load.
const homeVideo=document.getElementById('blanka-video');
const filmFrame=document.getElementById('blanka-video-frame');
const filmPlay=document.getElementById('blanka-play');
const filmMute=document.getElementById('blanka-mute');
const filmFullscreen=document.getElementById('blanka-fullscreen');
homeVideo.controls=false;
const filmTime=value=>Number.isFinite(value)?Math.floor(value/60)+':'+String(Math.floor(value%60)).padStart(2,'0'):'--:--';
function updateFilmPlay(){const paused=homeVideo.paused;filmPlay.setAttribute('aria-label',paused?'Lejátszás':'Megállítás');filmPlay.innerHTML='<span aria-hidden="true">'+(paused?'▶':'Ⅱ')+'</span><span class="control-label">'+(paused?'Lejátszás':'Megállítás')+'</span>';}
function activateFilm(){const ready=homeVideo.readyState>=1;document.getElementById('blanka-time').textContent=filmTime(homeVideo.currentTime)+' / '+filmTime(homeVideo.duration);homeVideo.hidden=!ready;filmPlay.disabled=!ready;filmMute.disabled=!ready;if(ready){document.getElementById('blanka-video-waiting').hidden=true;document.getElementById('blanka-video-badge').textContent='BLANKA OTTHONRÓL';}updateFilmPlay();}
filmPlay.addEventListener('click',async()=>{if(homeVideo.paused){try{await homeVideo.play();}catch{document.getElementById('blanka-video-badge').textContent='A videó nem indítható el.';}}else homeVideo.pause();});
filmMute.addEventListener('click',()=>{homeVideo.muted=!homeVideo.muted;});
homeVideo.addEventListener('volumechange',()=>{filmMute.setAttribute('aria-pressed',String(homeVideo.muted));const label=homeVideo.muted?'Hang vissza':'Némítás';filmMute.setAttribute('aria-label',label);filmMute.querySelector('.control-label').textContent=label;});
for(const event of ['play','pause','ended'])homeVideo.addEventListener(event,updateFilmPlay);
for(const event of ['loadedmetadata','emptied'])homeVideo.addEventListener(event,activateFilm);
homeVideo.addEventListener('timeupdate',()=>{document.getElementById('blanka-time').textContent=filmTime(homeVideo.currentTime)+' / '+filmTime(homeVideo.duration);});
homeVideo.addEventListener('error',()=>{homeVideo.hidden=true;filmPlay.disabled=true;filmMute.disabled=true;document.getElementById('blanka-video-waiting').hidden=false;document.getElementById('blanka-video-badge').textContent='A videó nem érhető el.';});
function updateFilmFullscreen(){const expanded=document.fullscreenElement===filmFrame||filmFrame.classList.contains('is-expanded');filmFullscreen.setAttribute('aria-pressed',String(expanded));filmFullscreen.setAttribute('aria-label',expanded?'Kicsinyítés':'Teljes képernyő');filmFullscreen.querySelector('.control-label').textContent=expanded?'Kicsinyítés':'Nagyítás';}
function closeFilmFallback(){filmFrame.classList.remove('is-expanded');document.body.classList.remove('film-expanded');updateFilmFullscreen();filmFullscreen.focus();}
filmFullscreen.addEventListener('click',async()=>{if(document.fullscreenElement===filmFrame){await document.exitFullscreen();return;}if(filmFrame.classList.contains('is-expanded')){closeFilmFallback();return;}try{if(!filmFrame.requestFullscreen)throw Error('Use expanded view');await filmFrame.requestFullscreen();}catch{filmFrame.classList.add('is-expanded');document.body.classList.add('film-expanded');}updateFilmFullscreen();});
document.addEventListener('fullscreenchange',updateFilmFullscreen);
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&filmFrame.classList.contains('is-expanded'))closeFilmFallback();});
window.addEventListener('hashchange',()=>{if(location.hash==='#tervezes'||location.hash==='#mellekletek'){homeVideo.pause();if(filmFrame.classList.contains('is-expanded'))closeFilmFallback();if(document.fullscreenElement===filmFrame)document.exitFullscreen().catch(()=>{});}});

// Load the approved final model when its section comes into view.
const defaultModelViewer=document.getElementById('viewer');
let defaultModelStarted=false;
async function loadDefaultModel(){
 if(defaultModelStarted)return;
 defaultModelStarted=true;
 const status=document.getElementById('model-status');
 const openButton=document.getElementById('open-step');
 input.disabled=true;openButton.disabled=true;
 status.textContent='A 3D modell betöltése…';
 try{
  const response=await fetch('assets/gitartarto-vegleges.step?v=e6f3af5188');
  if(!response.ok)throw Error('STEP download failed');
  const modelFile=new File([await response.arrayBuffer()],'Gitártartó — végleges CAD-modell.step');
  viewerModule=viewerModule||await import('./viewer.js');
  await viewerModule.openStep(modelFile);
 }catch(error){
  status.textContent='A 3D nézet nem tölthető be. A STEP-fájl továbbra is letölthető.';
  console.error(error);
 }finally{input.disabled=false;openButton.disabled=false;}
}
input.addEventListener('change',()=>{defaultModelStarted=true;});
if('IntersectionObserver' in window){const modelObserver=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){modelObserver.disconnect();loadDefaultModel();}},{rootMargin:'200px'});modelObserver.observe(defaultModelViewer);}else loadDefaultModel();
