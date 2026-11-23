async function init(){
  const grid=document.getElementById('appGrid');
  try{
    const res=await fetch('apps.json'); if(!res.ok) throw new Error('Could not load app directory');
    const data=await res.json();
    const developer=data.developer||{};
    const name=developer.name||'Privacy Center';
    document.getElementById('brandName').textContent=name;
    document.getElementById('footerName').textContent=name;
    const email=developer.email||'';
    const emailLink=document.getElementById('contactEmail');
    emailLink.href=email?'mailto:'+email:'#'; emailLink.textContent=email?'Email developer ↗':'Contact unavailable';
    const apps=data.apps||[];
    document.getElementById('appCount').textContent=apps.length+' '+(apps.length===1?'application':'applications');
    function render(query=''){
      const filtered=apps.filter(a=>(a.name+' '+a.description+' '+a.packageId).toLowerCase().includes(query.toLowerCase()));
      grid.innerHTML='';
      if(!filtered.length){grid.innerHTML='<div class="empty">No applications match your search.</div>';return;}
      filtered.forEach(app=>{
        const card=document.createElement('article');card.className='app-card';
        const icon=document.createElement('div');icon.className='app-icon';icon.textContent=(app.name||'A').trim().charAt(0).toUpperCase();
        const h=document.createElement('h3');h.textContent=app.name||'Application';
        const p=document.createElement('p');p.textContent=app.description||'Privacy policy and data practices.';
        const meta=document.createElement('div');meta.className='app-meta';
        const pkg=document.createElement('span');pkg.textContent=app.packageId||'';
        const link=document.createElement('a');link.href=app.policyPath||'#';link.textContent='Read policy →';
        meta.append(pkg,link);card.append(icon,h,p,meta);grid.append(card);
      });
    }
    render();
    document.getElementById('search').addEventListener('input',e=>render(e.target.value));
  }catch(err){grid.innerHTML='<div class="empty">Unable to load applications. Check that apps.json exists and contains valid JSON.</div>';}
}
init();
