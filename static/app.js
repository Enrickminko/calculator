const $ = (s)=>document.querySelector(s);
const exprEl = $("#expr");
const resEl  = $("#result");
const errEl  = $("#error");
const histEl = $("#history");
const angleEl= $("#angle");
const precEl = $("#prec");

let lastResult = "0";

function insertText(text){
  const start = exprEl.selectionStart ?? exprEl.value.length;
  const end = exprEl.selectionEnd ?? start;
  const before = exprEl.value.slice(0, start);
  const after  = exprEl.value.slice(end);
  exprEl.value = before + text + after;
  const newPos = start + text.length;
  exprEl.setSelectionRange(newPos,newPos);
  exprEl.focus();
}

function setError(msg){ errEl.textContent = msg || ""; }
function setResult(v){
  resEl.textContent = v;
  if(v !== "Erreur" && v !== "") lastResult = v;
}

async function evaluateNow(){
  const expr = exprEl.value.trim();
  setError("");
  if(!expr){ setResult("0"); return; }
  setResult("…");

  const payload = {
    expr,
    angle: angleEl.value,
    precision: Number(precEl.value) || 24
  };

  try{
    const r = await fetch("/api/calc", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(payload)
    });
    const data = await r.json();
    if(data.ok){
      setResult(data.result);
      histEl.textContent = `${expr} = ${data.result}`;
    }else{
      setResult("Erreur");
      setError(data.error || "Erreur inconnue");
    }
  }catch(e){
    setResult("Erreur");
    setError("Problème réseau");
  }
}
document.addEventListener("click",(e)=>{
  const btn = e.target.closest("button[data-insert],button[data-fn]");
  if(!btn) return;

  const ins = btn.getAttribute("data-insert");
  const fn  = btn.getAttribute("data-fn");
  if(ins){
    const canon = ins
      .replace("×","*").replace("÷","/")
      .replace("x²","^2");
    insertText(canon);
    return;
  }
  if(fn === "clear"){ exprEl.value=""; setResult("0"); setError(""); return; }
  if(fn === "del"){
    const start = exprEl.selectionStart ?? exprEl.value.length;
    const end = exprEl.selectionEnd ?? start;
    if(start !== end){
      exprEl.value = exprEl.value.slice(0,start) + exprEl.value.slice(end);
      exprEl.setSelectionRange(start,start);
    }else if(start>0){
      exprEl.value = exprEl.value.slice(0,start-1) + exprEl.value.slice(start);
      exprEl.setSelectionRange(start-1,start-1);
    }
    exprEl.focus(); return;
  }
  if(fn === "eval"){ evaluateNow(); return; }
  if(fn === "neg"){
    const start = exprEl.selectionStart ?? 0;
    const end = exprEl.selectionEnd ?? exprEl.value.length;
    const before = exprEl.value.slice(0,start);
    const mid = exprEl.value.slice(start,end);
    const after = exprEl.value.slice(end);
    exprEl.value = before + "-(" + (mid || "0") + ")" + after;
    const newPos = before.length + 3 + (mid||"0").length;
    exprEl.setSelectionRange(newPos,newPos);
    exprEl.focus(); return;
  }
  if(fn === "ans"){ insertText(String(lastResult)); return; }
  if(fn === "percent"){
    const v = exprEl.value;
    const m = v.match(/^(.*?)([+\-*/])\s*([\d.]+)\s*%$/);
    if(m){
      const a = m[1].trim(), op = m[2], b = m[3];
      const repl = `${a}${op}${a}*(${b}/100)`;
      exprEl.value = repl;
    }else{
      insertText("/100");
    }
    return;
  }
})
exprEl.addEventListener("keydown",(e)=>{
  if(e.key === "Enter"){ e.preventDefault(); evaluateNow(); }
});
document.addEventListener("keydown",(e)=>{
  if(e.target === exprEl) return;
  if(e.key === "Enter"){ e.preventDefault(); evaluateNow(); }
});
angleEl.addEventListener("change", ()=>{ if(exprEl.value.trim()) evaluateNow(); });
precEl.addEventListener("change", ()=>{ if(exprEl.value.trim()) evaluateNow(); });
