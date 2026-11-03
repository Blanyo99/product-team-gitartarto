const tabs=[...document.querySelectorAll('[data-tab]')];
function route(){const selected=location.hash==='#tervezes'?'process':location.hash==='#mellekletek'?'attachments':'home';for(const id of ['home','process','attachments'])document.getElementById(id).hidden=id!==selected;tabs.forEach(a=>{if(a.dataset.tab===selected)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});if(selected!=='home'||location.hash==='#fooldal')window.scrollTo(0,0);}
window.addEventListener('hashchange',route);route();
const input=document.getElementById('step-input');let viewerModule;
input.addEventListener('change',async()=>{const file=input.files[0];if(!file)return;const status=document.getElementById('model-status');if(!/\.(stp|step)$/i.test(file.name)){status.textContent='Kérlek, STEP vagy STP fájlt válassz.';return;}if(file.size>30*1024*1024){status.textContent='A böngészős előnézethez legfeljebb 30 MB-os fájlt válassz.';return;}status.textContent='A 3D megjelenítő betöltése…';input.disabled=true;try{viewerModule=viewerModule||await import('./viewer.js?v=1d08f81b40');await viewerModule.openStep(file);}catch(error){status.textContent='A modell nem nyitható meg. Ellenőrizd a STEP-fájlt és az internetkapcsolatot.';console.error(error);}finally{input.disabled=false;input.value='';}});

document.getElementById('open-step').addEventListener('click',()=>input.click());

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
  viewerModule=viewerModule||await import('./viewer.js?v=1d08f81b40');
  await viewerModule.openStep(modelFile);
 }catch(error){
  status.textContent='A 3D nézet nem tölthető be. A STEP-fájl továbbra is letölthető.';
  console.error(error);
 }finally{input.disabled=false;openButton.disabled=false;}
}
input.addEventListener('change',()=>{defaultModelStarted=true;});
if('IntersectionObserver' in window){const modelObserver=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){modelObserver.disconnect();loadDefaultModel();}},{rootMargin:'200px'});modelObserver.observe(defaultModelViewer);}else loadDefaultModel();
