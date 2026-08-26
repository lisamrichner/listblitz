import { useState, useEffect, useRef } from "react";
import React from "react";

const STORE_KEY = "listblitz_v5";
const GEAR_IMG = "data:image/png;base64,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";

const PALETTE = [
  { id:"lavender", color:"#7C5CBF", light:"#F0EBF9", dark:"#5C3D8A", defaultEmoji:"🌸" },
  { id:"olive",    color:"#5A7A35", light:"#EBF2E0", dark:"#3D5018", defaultEmoji:"🌿" },
  { id:"rose",     color:"#B5475A", light:"#FAEBEE", dark:"#8A2D3D", defaultEmoji:"🎸" },
  { id:"slate",    color:"#4A6FA5", light:"#EAF0FA", dark:"#2E4D7A", defaultEmoji:"🦋" },
  { id:"amber",    color:"#B07800", light:"#FEF5E0", dark:"#7A5000", defaultEmoji:"🐝" },
  { id:"teal",     color:"#2A8A7A", light:"#E0F5F2", dark:"#1A5F54", defaultEmoji:"🤖" },
];

const EMOJIS = ["🌸","⚡","🔥","🌿","🦋","✨","🌊","🦄","🍀","🦁","🐝","🎸","🌙","🦊","🤖","🚀"];

function todayStr() { return new Date().toISOString().split("T")[0]; }
function parseDate(s) { if(!s)return null; const[y,m,d]=s.split("-"); return new Date(+y,+m-1,+d); }
function fmtDate(s) { if(!s)return null; return parseDate(s).toLocaleDateString("en-US",{month:"short",day:"numeric"}); }
function dueStatus(dueStr, done) {
  if(!dueStr||done)return null;
  const due=parseDate(dueStr); const now=new Date(); now.setHours(0,0,0,0);
  const diff=(due-now)/(1000*60*60*24);
  if(diff<0)return"overdue"; if(diff<=2)return"soon"; return"ok";
}
function avgMs(tasks) {
  const v=tasks.filter(t=>t.done&&t.completed&&t.added);
  if(!v.length)return null;
  return v.reduce((s,t)=>s+(t.completed-parseDate(t.added).getTime()),0)/v.length;
}
function fmtAvg(ms) {
  if(ms===null)return"—";
  const h=Math.round(ms/3600000);
  if(h<24)return h+"h"; return Math.floor(h/24)+"d";
}
function onTimePct(tasks) {
  const w=tasks.filter(t=>t.done&&t.due&&t.completed);
  if(!w.length)return null;
  const ok=w.filter(t=>{ const due=parseDate(t.due); const comp=new Date(t.completed); comp.setHours(0,0,0,0); return comp<=due; });
  return Math.round((ok.length/w.length)*100);
}
function getPalette(id) { return PALETTE.find(p=>p.id===id)||PALETTE[0]; }

// ── Account Screen ─────────────────────────────────────────────────────────
function AccountScreen({ onBack }) {
  return (
    <div style={{ fontFamily:"var(--font-sans)", minHeight:600, padding:"0 0 48px" }}>
      <div style={{ padding:"28px 20px 20px", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={onBack} style={{ background:"transparent", border:"none", cursor:"pointer", color:"var(--color-text-secondary)", fontSize:20, padding:0, lineHeight:1 }}>←</button>
        <div style={{ fontSize:20, fontWeight:700, color:"var(--color-text-primary)" }}>Manage account</div>
      </div>
      <div style={{ padding:"0 16px", display:"flex", flexDirection:"column", gap:12 }}>
        <div style={{ background:"var(--color-background-secondary)", borderRadius:14, padding:"16px" }}>
          <div style={{ fontSize:13, color:"var(--color-text-secondary)", marginBottom:6, lineHeight:1.5 }}>Subscription status</div>
          <div style={{ fontSize:15, fontWeight:600, color:"var(--color-text-primary)" }}>Active — billed monthly</div>
        </div>
        <div style={{ fontSize:13, color:"var(--color-text-secondary)", lineHeight:1.5, padding:"0 4px" }}>
          Your subscription keeps List⚡Blitz running. We'd hate to see you go.
        </div>
        <button style={{ width:"100%", padding:"14px", borderRadius:12, border:"1px solid #E2A0A0", background:"#FEE8E8", color:"#C0392B", fontSize:14, fontWeight:500, cursor:"pointer", fontFamily:"inherit" }}>
          Cancel subscription
        </button>
        <div style={{ fontSize:11, color:"var(--color-text-secondary)", textAlign:"center" }}>
          You'll keep access until end of billing period
        </div>
      </div>
    </div>
  );
}

// ── Settings Screen ────────────────────────────────────────────────────────
function SettingsScreen({ players, onManagePlayers, onAccount, onBack }) {
  return (
    <div style={{ fontFamily:"var(--font-sans)", minHeight:600, padding:"0 0 48px" }}>
      <div style={{ padding:"28px 20px 20px", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={onBack} style={{ background:"transparent", border:"none", cursor:"pointer", color:"var(--color-text-secondary)", fontSize:20, padding:0, lineHeight:1 }}>←</button>
        <div style={{ fontSize:20, fontWeight:700, color:"var(--color-text-primary)" }}>Settings</div>
      </div>
      <div style={{ padding:"0 16px", display:"flex", flexDirection:"column", gap:10 }}>
        <button onClick={onManagePlayers} style={{ width:"100%", background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:14, padding:"18px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer", fontFamily:"inherit" }}>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontSize:15, fontWeight:600, color:"var(--color-text-primary)" }}>Manage players</div>
            <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginTop:2 }}>Add, edit or remove players</div>
          </div>
          <span style={{ fontSize:18, color:"var(--color-text-secondary)" }}>›</span>
        </button>
        <button onClick={onAccount} style={{ width:"100%", background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:14, padding:"18px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer", fontFamily:"inherit" }}>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontSize:15, fontWeight:600, color:"var(--color-text-primary)" }}>Manage account</div>
            <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginTop:2 }}>Subscription & billing</div>
          </div>
          <span style={{ fontSize:18, color:"var(--color-text-secondary)" }}>›</span>
        </button>
      </div>
    </div>
  );
}

// ── Player Setup ───────────────────────────────────────────────────────────
function PlayerSetup({ players: saved, onSave, isEditing, onBack }) {
  const [list, setList] = useState(saved.length ? saved : []);
  const [editing, setEditing] = useState(null);
  const nameRef = useRef(null);

  useEffect(() => {
    if (editing !== null && nameRef.current) setTimeout(() => nameRef.current?.focus(), 60);
  }, [editing]);

  function update(id, patch) { setList(l => l.map(p => p.id===id ? {...p,...patch} : p)); }

  function addPlayer() {
    if (list.length >= 4) return;
    const used = list.map(p => p.paletteId);
    const pal = PALETTE.find(p => !used.includes(p.id)) || PALETTE[list.length % PALETTE.length];
    const np = { id: Date.now(), name: "", emoji: pal.defaultEmoji, paletteId: pal.id };
    setList(l => [...l, np]);
    setEditing(np.id);
  }

  function removePlayer(id) {
    setList(l => l.filter(p => p.id !== id));
    if (editing === id) setEditing(null);
  }

  function canSave() { return list.length >= 2 && list.every(p => p.name.trim()); }

  const inputBase = (pal) => ({
    width:"100%", background:"var(--color-background-primary)",
    border:`0.5px solid ${pal.color}`, borderRadius:8,
    padding:"10px 12px", fontSize:14, color:"var(--color-text-primary)",
    outline:"none", fontFamily:"inherit", boxSizing:"border-box",
  });

  return (
    <div style={{ fontFamily:"var(--font-sans)", minHeight:600, padding:"0 0 48px" }}>
      <div style={{ padding:"36px 20px 28px", textAlign:"center", borderBottom:"0.5px solid var(--color-border-tertiary)", marginBottom:20, position:"relative" }}>
        {isEditing && (
          <button onClick={onBack} style={{ position:"absolute", left:16, top:36, background:"transparent", border:"none", cursor:"pointer", color:"var(--color-text-secondary)", fontSize:20, padding:0 }}>←</button>
        )}
        <div style={{ fontSize:13, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--color-text-secondary)", marginBottom:10 }}>
          {isEditing ? "Manage players" : "Welcome to"}
        </div>
        <div style={{ fontSize:38, fontWeight:800, letterSpacing:"-1.5px", color:"var(--color-text-primary)", lineHeight:1, marginBottom:10 }}>
          List<span style={{color:"#7C5CBF"}}>⚡</span>Blitz
        </div>
        {!isEditing && (
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#F0EBF9", borderRadius:20, padding:"6px 16px", fontSize:12, fontWeight:500, color:"#5C3D8A" }}>
            🏆 Complete to Compete
          </div>
        )}
      </div>

      <div style={{ padding:"0 16px", display:"flex", flexDirection:"column", gap:10 }}>
        {list.length === 0 && (
          <div style={{ textAlign:"center", padding:"16px 0 8px", color:"var(--color-text-secondary)", fontSize:13 }}>
            Add at least 2 players to get started
          </div>
        )}

        {list.map(player => {
          const pal = getPalette(player.paletteId);
          const isEd = editing === player.id;
          return (
            <div key={player.id} style={{ borderRadius:16, overflow:"hidden", border:`${isEd?"1.5px":"0.5px"} solid ${isEd?pal.color:"var(--color-border-tertiary)"}`, background:"var(--color-background-primary)", transition:"border 0.15s" }}>
              <div onClick={() => setEditing(isEd ? null : player.id)} style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 14px", cursor:"pointer", userSelect:"none" }}>
                <div style={{ width:42, height:42, borderRadius:12, background:pal.light, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{player.emoji}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:17, fontWeight:700, color:player.name?pal.dark:"var(--color-text-secondary)" }}>{player.name || ""}</div>
                </div>
                {isEd && <button onClick={e=>{e.stopPropagation();removePlayer(player.id);}} style={{ padding:"5px 11px", borderRadius:8, border:"0.5px solid #E2A0A0", background:"#FEE8E8", color:"#C0392B", fontSize:11, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap", flexShrink:0 }}>Remove</button>}
              </div>
              {isEd && (
                <div style={{ padding:"0 14px 14px", borderTop:`0.5px solid ${pal.color}33` }}>
                  <div style={{ fontSize:10, fontWeight:500, letterSpacing:"0.07em", textTransform:"uppercase", color:pal.dark, margin:"12px 0 6px" }}>Name</div>
                  <input ref={nameRef} value={player.name} onChange={e=>update(player.id,{name:e.target.value})}
                    onKeyDown={e=>{ if(e.key==="Enter"){e.preventDefault();if(player.name.trim())setEditing(null);} }}
                    placeholder="Enter name…" style={inputBase(pal)}/>
                  <div style={{ fontSize:10, fontWeight:500, letterSpacing:"0.07em", textTransform:"uppercase", color:pal.dark, margin:"12px 0 8px" }}>Emoji</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(8,1fr)", gap:5 }}>
                    {EMOJIS.map(em => (
                      <button key={em} onClick={()=>update(player.id,{emoji:em})} style={{ width:"100%", aspectRatio:"1", borderRadius:8, border:`1.5px solid ${player.emoji===em?pal.color:"var(--color-border-tertiary)"}`, background:player.emoji===em?pal.light:"var(--color-background-secondary)", cursor:"pointer", fontSize:17, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.1s", padding:0 }}>{em}</button>
                    ))}
                  </div>
                  <div style={{ fontSize:10, fontWeight:500, letterSpacing:"0.07em", textTransform:"uppercase", color:pal.dark, margin:"12px 0 8px" }}>Color</div>
                  <div style={{ display:"flex", gap:8 }}>
                    {PALETTE.map(p => (
                      <button key={p.id} onClick={()=>update(player.id,{paletteId:p.id,emoji:p.defaultEmoji})} style={{ width:30, height:30, borderRadius:"50%", background:p.color, border:`2.5px solid ${player.paletteId===p.id?"var(--color-text-primary)":"transparent"}`, cursor:"pointer", outline:"none", flexShrink:0, padding:0, boxShadow:player.paletteId===p.id?`0 0 0 1px ${p.color}`:"none" }}/>
                    ))}
                  </div>
                  <div style={{ display:"flex", gap:8, marginTop:14 }}>
                    <button onClick={()=>{ if(player.name.trim()) setEditing(null); }} style={{ flex:1, padding:"10px", borderRadius:10, background:player.name.trim()?pal.color:"var(--color-background-secondary)", border:`1.5px solid ${player.name.trim()?pal.color:"var(--color-border-secondary)"}`, color:player.name.trim()?"#fff":"var(--color-text-secondary)", fontSize:13, fontWeight:500, cursor:player.name.trim()?"pointer":"default", fontFamily:"inherit" }}>Save player</button>
                    <button onClick={()=>{ if(!player.name.trim()) removePlayer(player.id); else setEditing(null); }} style={{ padding:"10px 16px", borderRadius:10, background:"transparent", border:`1.5px solid var(--color-border-secondary)`, color:"var(--color-text-secondary)", fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {list.length < 4 && (
          <button onClick={addPlayer} style={{ width:"100%", padding:"13px", borderRadius:14, border:"1px dashed var(--color-border-secondary)", background:"transparent", color:"var(--color-text-secondary)", fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <span style={{fontSize:20,lineHeight:1}}>+</span> Add player
          </button>
        )}

        <button disabled={!canSave()} onClick={()=>canSave()&&onSave(list)} style={{ width:"100%", padding:"16px", borderRadius:14, marginTop:4, background:canSave()?"#7C5CBF":"var(--color-background-secondary)", border:"none", color:canSave()?"#fff":"var(--color-text-secondary)", fontSize:16, fontWeight:700, cursor:canSave()?"pointer":"default", fontFamily:"inherit", transition:"all 0.2s" }}>
          {canSave() ? "Let's go! 🏁" : list.length < 2 ? "Add at least 2 players" : "Name all players to continue"}
        </button>
      </div>
    </div>
  );
}

// ── Task Card ──────────────────────────────────────────────────────────────
function TaskCard({ task, onToggle, onDelete, player }) {
  const [tapped, setTapped] = useState(false);
  const pal = getPalette(player.paletteId);
  const ds = dueStatus(task.due, task.done);
  return (
    <div style={{ position:"relative", marginBottom:7 }}>
      <div onClick={()=>setTapped(t=>!t)} style={{ background:"var(--color-background-primary)", border:`0.5px solid var(--color-border-tertiary)`, borderRadius:12, borderLeft:`3px solid ${pal.color}`, padding:"10px 12px 10px 11px", opacity:task.done?0.45:1, transition:"all 0.15s", cursor:"pointer", userSelect:"none" }}>
        <div style={{ fontSize:13, fontWeight:500, lineHeight:1.35, color:task.done?"var(--color-text-secondary)":"var(--color-text-primary)", textDecoration:task.done?"line-through":"none", wordBreak:"break-word", marginBottom:(task.due||task.added)?5:0 }}>{task.title}</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:3 }}>
          {task.added&&<span style={{ fontSize:10, padding:"2px 7px", borderRadius:20, background:"var(--color-background-secondary)", color:"var(--color-text-secondary)" }}>+{fmtDate(task.added)}</span>}
          {task.due&&<span style={{ fontSize:10, padding:"2px 7px", borderRadius:20, background:ds==="overdue"?"#FEE8E8":ds==="soon"?"#FEF5E0":"var(--color-background-secondary)", color:ds==="overdue"?"#C0392B":ds==="soon"?"#B07800":"var(--color-text-secondary)" }}>Due {fmtDate(task.due)}{ds==="overdue"?" !":ds==="soon"?" ↑":""}</span>}
        </div>
      </div>
      {tapped&&(
        <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, zIndex:10, background:`${pal.light}E8`, borderRadius:12, borderLeft:`3px solid ${pal.color}`, padding:"10px 12px", display:"flex", alignItems:"center", justifyContent:"flex-end", gap:6 }}>
          <button onClick={e=>{e.stopPropagation();onToggle(task.id);setTapped(false);}} style={{ padding:"6px 11px", borderRadius:8, border:"none", background:pal.color, color:"#fff", fontSize:11, fontWeight:500, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap", flexShrink:0 }}>{task.done?"Undo":"✓ Complete"}</button>
          <button onClick={e=>{e.stopPropagation();onDelete(task.id);}} style={{ padding:"6px 11px", borderRadius:8, border:"none", background:"#FEE8E8", color:"#C0392B", fontSize:11, fontWeight:500, cursor:"pointer", fontFamily:"inherit", flexShrink:0 }}>Delete</button>
          <button onClick={e=>{e.stopPropagation();setTapped(false);}} style={{ padding:"6px 8px", borderRadius:8, border:"none", background:"transparent", color:"var(--color-text-secondary)", fontSize:11, cursor:"pointer", fontFamily:"inherit", flexShrink:0 }}>✕</button>
        </div>
      )}
    </div>
  );
}

// ── Inline Add ─────────────────────────────────────────────────────────────
function InlineAdd({ player, onAdd }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [noDue, setNoDue] = useState(false);
  const inputRef = useRef(null);
  const pal = getPalette(player.paletteId);
  useEffect(()=>{ if(open&&inputRef.current) setTimeout(()=>inputRef.current?.focus(),50); },[open]);
  function submit() {
    if(!title.trim())return;
    onAdd({ title:title.trim(), playerId:player.id, added:todayStr(), due:noDue?null:(due||null) });
    setTitle(""); setDue(""); setNoDue(false); setOpen(false);
  }
  const iStyle={ width:"100%", background:"var(--color-background-primary)", border:`0.5px solid ${pal.color}`, borderRadius:8, padding:"9px 11px", fontSize:13, color:"var(--color-text-primary)", outline:"none", fontFamily:"inherit", boxSizing:"border-box", WebkitAppearance:"none" };
  if(!open) return (
    <button onClick={()=>setOpen(true)} style={{ width:"100%", padding:"9px 12px", borderRadius:10, border:`1px dashed ${pal.color}`, background:"transparent", color:pal.color, fontSize:12, fontWeight:500, cursor:"pointer", display:"flex", alignItems:"center", gap:6, fontFamily:"inherit", marginTop:4, boxSizing:"border-box" }}>
      <span style={{fontSize:16,lineHeight:1}}>+</span> Add task
    </button>
  );
  return (
    <div style={{ background:pal.light, border:`1px solid ${pal.color}`, borderRadius:12, padding:"12px", marginTop:4 }}>
      <input ref={inputRef} value={title} onChange={e=>setTitle(e.target.value)}
        onKeyDown={e=>{ if(e.key==="Enter"){e.preventDefault();e.stopPropagation();submit();} if(e.key==="Escape")setOpen(false); }}
        placeholder="Task name…" enterKeyHint="done" style={{...iStyle,marginBottom:8}}/>
      {!noDue&&(
        <div style={{marginBottom:8}}>
          <div style={{ fontSize:10, fontWeight:500, letterSpacing:"0.06em", textTransform:"uppercase", color:pal.dark, marginBottom:5 }}>Due date</div>
          <input type="date" value={due} onChange={e=>setDue(e.target.value)} style={{...iStyle,color:due?pal.dark:"var(--color-text-secondary)"}}/>
        </div>
      )}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
        <input type="checkbox" id={`nd-${player.id}`} checked={noDue} onChange={e=>{ setNoDue(e.target.checked); if(e.target.checked)setDue(""); }} style={{ accentColor:pal.color, cursor:"pointer", width:16, height:16 }}/>
        <label htmlFor={`nd-${player.id}`} style={{ fontSize:12, color:pal.dark, cursor:"pointer" }}>No due date</label>
      </div>
      <div style={{display:"flex",gap:7}}>
        <button onClick={submit} style={{ flex:1, padding:"10px", borderRadius:8, background:pal.color, border:"none", color:"#fff", fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:"inherit" }}>Add</button>
        <button onClick={()=>{setOpen(false);setTitle("");setDue("");setNoDue(false);}} style={{ padding:"10px 14px", borderRadius:8, background:"transparent", border:`0.5px solid ${pal.color}`, color:pal.dark, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
      </div>
    </div>
  );
}

// ── Tasks Screen ───────────────────────────────────────────────────────────
function TasksScreen({ tasks, players, onToggle, onDelete, onAdd }) {
  return (
    <div style={{display:"flex",gap:10}}>
      {players.map(player=>{
        const pal=getPalette(player.paletteId);
        const ptasks=tasks.filter(t=>t.playerId===player.id);
        const pending=ptasks.filter(t=>!t.done);
        const done=ptasks.filter(t=>t.done);
        return (
          <div key={player.id} style={{flex:1,minWidth:0}}>
            {pending.length>0&&<>
              <div style={{ fontSize:9, letterSpacing:"0.07em", textTransform:"uppercase", color:"var(--color-text-secondary)", padding:"0 0 5px" }}>To do</div>
              {pending.map(t=><TaskCard key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} player={player}/>)}
            </>}
            {done.length>0&&<>
              <div style={{ fontSize:9, letterSpacing:"0.07em", textTransform:"uppercase", color:"var(--color-text-secondary)", padding:"6px 0 5px" }}>Complete</div>
              {done.map(t=><TaskCard key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} player={player}/>)}
            </>}
            <InlineAdd player={player} onAdd={onAdd}/>
          </div>
        );
      })}
    </div>
  );
}

// ── Leaderboard ────────────────────────────────────────────────────────────
function LeaderboardScreen({ tasks, players }) {
  const stats=players.map(p=>{ const pt=tasks.filter(t=>t.playerId===p.id); return { player:p, done:pt.filter(t=>t.done).length, ms:avgMs(pt), ot:onTimePct(pt) }; });
  const maxDone=Math.max(...stats.map(s=>s.done));
  const minMs=Math.min(...stats.filter(s=>s.ms!==null).map(s=>s.ms));
  const maxOt=Math.max(...stats.filter(s=>s.ot!==null).map(s=>s.ot));
  const anyMs=stats.some(s=>s.ms!==null);
  const anyOt=stats.some(s=>s.ot!==null);

  function StatRow({ label, getValue, winsCheck }) {
    return (
      <div style={{marginBottom:16}}>
        <div style={{ display:"grid", gridTemplateColumns:`repeat(${players.length},minmax(0,1fr))`, gap:8 }}>
          {stats.map(s=>{
            const pal=getPalette(s.player.paletteId);
            const wins=winsCheck(s);
            const val=getValue(s);
            return (
              <div key={s.player.id} style={{ background:pal.light, border:`${wins?"1.5px":"0.5px"} solid ${wins?pal.color:"var(--color-border-tertiary)"}`, borderRadius:12, padding:"10px 12px", position:"relative" }}>
                {wins&&<div style={{ position:"absolute", top:7, right:9, fontSize:12 }}>👑</div>}
                <div style={{ fontSize:22, fontWeight:700, lineHeight:1, color:pal.dark }}>{val}</div>
                <div style={{ fontSize:12, color:pal.dark, opacity:0.65, marginTop:3 }}>{label}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${players.length},minmax(0,1fr))`, gap:8, marginBottom:14 }}>
        {players.map(p=>{ const pal=getPalette(p.paletteId); return <div key={p.id} style={{ fontSize:12, fontWeight:500, letterSpacing:"0.07em", textTransform:"uppercase", color:pal.dark }}>{p.emoji} {p.name}</div>; })}
      </div>
      <StatRow label="all time completed" getValue={s=>s.done} winsCheck={s=>s.done>0&&s.done===maxDone}/>
      <StatRow label="average completion time" getValue={s=>fmtAvg(s.ms)} winsCheck={s=>anyMs&&s.ms!==null&&s.ms===minMs}/>
      <StatRow label="on-time rate" getValue={s=>s.ot===null?"—":s.ot+"%"} winsCheck={s=>anyOt&&s.ot!==null&&s.ot===maxOt}/>
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────
export default function App() {
  const [players,setPlayers]=useState([]);
  const [tasks,setTasks]=useState([]);
  const [tab,setTab]=useState("tasks");
  const [screen,setScreen]=useState("setup");

  useEffect(()=>{
    (async()=>{
      try{
        const r=await window.storage.get(STORE_KEY);
        if(r?.value){ const d=JSON.parse(r.value); if(d.players?.length){ setPlayers(d.players); setTasks(d.tasks||[]); setScreen("app"); } }
      }catch(e){}
    })();
  },[]);

  function save(p,t){ try{ window.storage.set(STORE_KEY,JSON.stringify({players:p,tasks:t})); }catch(e){} }
  function handleSetupSave(p){ setPlayers(p); save(p,tasks); setScreen("app"); }
  function addTask(data){ const t=[...tasks,{id:Date.now(),...data,done:false,completed:null}]; setTasks(t); save(players,t); }
  function toggleTask(id){ const t=tasks.map(x=>x.id===id?{...x,done:!x.done,completed:!x.done?Date.now():null}:x); setTasks(t); save(players,t); }
  function deleteTask(id){ const t=tasks.filter(x=>x.id!==id); setTasks(t); save(players,t); }

  if(screen==="setup") return <PlayerSetup players={players} onSave={handleSetupSave} isEditing={players.length>0} onBack={()=>setScreen(players.length?"settings":"setup")}/>;
  if(screen==="settings") return <SettingsScreen players={players} onManagePlayers={()=>setScreen("setup")} onAccount={()=>setScreen("account")} onBack={()=>setScreen("app")}/>;
  if(screen==="account") return <AccountScreen onBack={()=>setScreen("settings")}/>;

  const pendingCounts=players.map(p=>tasks.filter(t=>t.playerId===p.id&&!t.done).length);
  const totalPending=pendingCounts.reduce((a,b)=>a+b,0);
  const minPending=Math.min(...pendingCounts);

  return (
    <div style={{fontFamily:"var(--font-sans)",minHeight:600}}>
      <h2 className="sr-only">List Blitz</h2>
      <div style={{ padding:"20px 16px 14px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div style={{ fontSize:24, fontWeight:800, letterSpacing:"-0.5px", color:"var(--color-text-primary)" }}>List<span style={{color:"#7C5CBF"}}>⚡</span>Blitz</div>
          <div style={{ fontSize:11, letterSpacing:"0.05em", textTransform:"uppercase", color:"var(--color-text-secondary)", marginTop:2 }}>
            {new Date().toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"})}
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{ display:"flex", background:"var(--color-background-secondary)", borderRadius:10, padding:3, gap:3 }}>
            {[["tasks","Tasks"],["board","Leaderboard"]].map(([id,label])=>(
              <button key={id} onClick={()=>setTab(id)} style={{ padding:"7px 12px", borderRadius:8, border:"none", cursor:"pointer", fontSize:11, fontWeight:500, fontFamily:"inherit", transition:"all 0.2s", background:tab===id?"var(--color-background-primary)":"transparent", color:tab===id?"var(--color-text-primary)":"var(--color-text-secondary)", boxShadow:tab===id?"0 1px 3px rgba(0,0,0,0.08)":"none" }}>{label}</button>
            ))}
          </div>
          <button onClick={()=>setScreen("settings")} title="Settings" style={{ width:34, height:34, borderRadius:9, border:"0.5px solid var(--color-border-secondary)", background:"var(--color-background-secondary)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0 }}>
            <img src={GEAR_IMG} alt="Settings" style={{ width:18, height:18, opacity:0.5, filter:"var(--color-text-primary) brightness(0)" }}/>
          </button>
        </div>
      </div>

      {tab==="tasks"&&(
        <div style={{ padding:"0 16px 16px" }}>
          <div style={{ display:"grid", gridTemplateColumns:`repeat(${players.length},minmax(0,1fr))`, gap:8, marginBottom:6 }}>
            {players.map(p=>{ const pal=getPalette(p.paletteId); return <div key={p.id} style={{ fontSize:12, fontWeight:500, letterSpacing:"0.07em", textTransform:"uppercase", color:pal.dark }}>{p.emoji} {p.name}</div>; })}
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"stretch" }}>
            {players.map((p,i)=>{
              const pal=getPalette(p.paletteId);
              const count=pendingCounts[i];
              const win=totalPending>0&&count===minPending;
              return (
                <React.Fragment key={p.id}>
                  {i>0&&<div style={{ display:"flex", alignItems:"center", fontSize:11, fontWeight:500, color:"var(--color-text-secondary)", flexShrink:0 }}>VS</div>}
                  <div style={{ flex:1, borderRadius:14, padding:"13px 14px", background:pal.light, border:`${win?"1.5px":"0.5px"} solid ${win?pal.color:"var(--color-border-tertiary)"}`, position:"relative" }}>
                    {win&&<div style={{ position:"absolute", top:8, right:10, fontSize:13 }}>👑</div>}
                    <div style={{ fontSize:28, fontWeight:700, lineHeight:1, color:pal.dark }}>{count}</div>
                    <div style={{ fontSize:13, color:pal.dark, opacity:0.65, marginTop:3 }}>pending</div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      <div style={{padding:"0 16px 40px"}}>
        {tab==="tasks"&&<TasksScreen tasks={tasks} players={players} onToggle={toggleTask} onDelete={deleteTask} onAdd={addTask}/>}
        {tab==="board"&&<LeaderboardScreen tasks={tasks} players={players}/>}
      </div>
    </div>
  );
}
