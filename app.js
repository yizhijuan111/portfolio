const projects = {
  content: {
    index: '01 / AI CONTENT WORKFLOW', title: '多平台 AI 内容工作台',
    intro: '面向需要重复改写内容的使用者，探索如何保留原始事实，同时适配不同平台的表达方式。',
    problem: '同一份素材在多个平台使用时，容易反复改写、遗漏关键事实，或新增原材料没有提供的信息。这个假设需要后续通过访谈与测试验证。',
    flow: '素材输入 → 事实提取 → 人工确认 → 分平台生成 → 检查与修改 → 导出',
    scope: ['第一版支持两种文案结构：小红书图文文案、公众号文章。','保留可编辑的事实清单，区分内容事实与表达方式。','设计日期、数字和承诺信息的检查，以及人工修改入口。'],
    plan: ['明确输入字段和验收条件，完成交互原型。','接入模型，跑通事实确认与文案生成流程。','准备测试素材，对比首版与迭代后的结果。'],
    evidence: '后续将补充：需求说明、原型、可运行 Demo、测试记录、失败案例与迭代复盘。',
  },
  meeting: {
    index: '02 / MEETING MEMORY', title: '会议决策追溯助手',
    intro: '以少量连续会议文本为起点，探索如何找到最终有效的决定，并让每个答案能够回到原文。',
    problem: '连续会议可能包含建议、条件、延期和取消。单次摘要未必能直接回答“最后到底决定了什么”。这是本项目计划验证的场景，不代表对现有产品缺陷的判断。',
    flow: '会议文本 → 事项提取 → 时间与变更梳理 → 用户查询 → 答案与原文证据',
    scope: ['第一版只处理少量文本，不包含实时参会或语音转写。','区分建议、确认决定与附加条件，记录来源编号。','支持查看日期变更、任务取消及对应原文。'],
    plan: ['准备明确标注的模拟会议，人工整理标准答案。','实现结构化提取、查询与原文展示。','检查负责人、日期、变更与引用是否正确。'],
    evidence: '后续将补充：模拟数据说明、信息结构、Demo、标准答案、错误分类及复测结果。',
  }
};
const dialog = document.querySelector('#project-dialog');
let lastTrigger;
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const p = projects[button.dataset.project];
    lastTrigger = button;
    document.querySelector('#dialog-index').textContent = p.index;
    document.querySelector('#dialog-content').innerHTML = `<span class="dialog-status">规划中 · 尚未完成开发与评测</span><h2 id="dialog-title">${p.title}</h2><p class="dialog-intro">${p.intro}</p><h3>希望解决的问题</h3><p>${p.problem}</p><h3>计划中的核心流程</h3><div class="flow">${p.flow}</div><h3>第一版的范围</h3><ul>${p.scope.map(x => `<li>${x}</li>`).join('')}</ul><h3>接下来怎么做</h3><ol>${p.plan.map(x => `<li>${x}</li>`).join('')}</ol><p class="dialog-notice">${p.evidence}<br>当前页面中的产品画面为概念示意，不是已上线功能，也不包含真实业务效果数据。</p>`;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('modal-open');
    document.querySelector('#close-dialog').focus();
  });
});
function closeProject(){dialog.close();}
document.querySelector('#close-dialog').addEventListener('click', closeProject);
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastTrigger?.focus();});
dialog.addEventListener('click', e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeProject();}});
document.querySelector('#dialog-contact').addEventListener('click',()=>{closeProject();document.querySelector('#contact').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});document.querySelector('.email-link').focus({preventScroll:true});});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  document.querySelectorAll('.project').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;});
}));
document.querySelector('#copy-email').addEventListener('click',async()=>{
  const button=document.querySelector('#copy-email');
  try{await navigator.clipboard.writeText('1477356214@qq.com');button.textContent='已复制 ✓';document.querySelector('#copy-status').textContent='邮箱已复制';setTimeout(()=>{button.innerHTML='复制邮箱 <span>⧉</span>';},2500);}
  catch{button.textContent='请长按或选中邮箱复制';document.querySelector('#copy-status').textContent='无法自动复制，请选中页面中的邮箱手动复制';}
});
const hero=document.querySelector('.hero');const canvas=document.querySelector('.hero-canvas');
if(canvas && matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches){
 let frame;
 hero.addEventListener('pointermove',e=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const r=hero.getBoundingClientRect();canvas.style.setProperty('--mx',`${(e.clientX-r.left-r.width/2)*.065}px`);canvas.style.setProperty('--my',`${(e.clientY-r.top-r.height/2)*.065}px`);});});
 hero.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);canvas.style.setProperty('--mx','0px');canvas.style.setProperty('--my','0px');});
}

const previews={content:{kicker:'01 / CONTENT WORKFLOW',copy:'<span class="syntax-tag">&lt;input&gt;</span> 一份原始素材。<br>保留事实，让表达适配<span class="preview-highlight">不同的场景。</span>',caption:'事实确认 → 分平台生成 → 检查与修改'},meeting:{kicker:'02 / MEETING MEMORY',copy:'<span class="syntax-tag">&lt;evidence&gt;</span> 不只记住说了什么。<br>沿着证据，找到<span class="preview-highlight">最后的决定。</span>',caption:'事项提取 → 变更追溯 → 回到原文'}};
const previewButtons=[...document.querySelectorAll('[data-preview]')];
function setPreview(button){const key=button.dataset.preview,p=previews[key];previewButtons.forEach(b=>{const selected=b===button;b.classList.toggle('selected',selected);b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;});document.querySelector('#preview-kicker').textContent=p.kicker;document.querySelector('#preview-copy').innerHTML=p.copy;document.querySelector('#preview-caption').textContent=p.caption;document.querySelector('#preview-open').dataset.project=key;document.querySelector('#preview-panel').setAttribute('aria-labelledby',button.id);}
previewButtons.forEach((b,i)=>{b.addEventListener('click',()=>setPreview(b));b.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%previewButtons.length;else if(e.key==='ArrowLeft')n=(i-1+previewButtons.length)%previewButtons.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=previewButtons.length-1;else return;e.preventDefault();setPreview(previewButtons[n]);previewButtons[n].focus();});});

const navLinks=[...document.querySelectorAll('nav [data-section]')];
const sections=navLinks.map(a=>document.getElementById(a.dataset.section)).filter(Boolean);
function updateNavigation(){let current=sections[0];const offset=document.querySelector('.nav').getBoundingClientRect().height+65;for(const section of sections){if(section.getBoundingClientRect().top<=offset)current=section;}navLinks.forEach(a=>{const active=a.dataset.section===current.id;a.classList.toggle('is-active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
let navFrame;window.addEventListener('scroll',()=>{if(navFrame)return;navFrame=requestAnimationFrame(()=>{updateNavigation();navFrame=null;});},{passive:true});window.addEventListener('resize',updateNavigation);updateNavigation();
