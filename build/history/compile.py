import importlib.util, glob, json, datetime

entries=[]
# Only entry files define E. Skip this compiler and any helper scripts
# (make-prompts.py etc) so they are not imported and executed as a side effect.
SKIP={'compile','make-prompts'}
for f in sorted(glob.glob('build/history/*.py')):
    n=f.split('/')[-1][:-3]
    if n in SKIP: continue
    s=importlib.util.spec_from_file_location(n,f); m=importlib.util.module_from_spec(s); s.loader.exec_module(m)
    if not hasattr(m,'E'): continue
    entries.extend(m.E)

def norm(e):
    e=list(e)
    while len(e)<9: e.append("story" if len(e)==7 else {})
    d,t,g,y,st,facts,art,kind,extra = e[:9]
    return {"date":d,"title":t,"genre":g,"year":y,"story":st,"facts":list(facts),
            "art":art,"kind":kind or "story","extra":extra or {}}

pool=[norm(e) for e in entries]
by_date={p["date"]:p for p in pool}

# Build a full 366-day calendar. Days with a written entry use it.
# Remaining days draw from the pool with a large stride so neighbours never repeat.
days=[]
d=datetime.date(2024,1,1)  # leap year -> 366 days
while d.year==2024:
    days.append(d.strftime("%m-%d")); d+=datetime.timedelta(days=1)

unused=[p for p in pool if True]
cal={}
stride=7   # coprime-ish walk through the pool
idx=0
for i,key in enumerate(days):
    if key in by_date:
        cal[key]=by_date[key]
    else:
        # deterministic pick that avoids landing on an entry owning a nearby date
        for _ in range(len(pool)):
            cand=pool[(idx*stride+i)%len(pool)]
            idx+=1
            cal[key]=cand
            break

out={"generatedAt":datetime.datetime.utcnow().isoformat()+"Z",
     "count":len(pool),
     "written":sorted(by_date.keys()),
     "calendar":cal}
with open('music-history.json','w') as f:
    json.dump(out,f,ensure_ascii=False,separators=(',',':'))
print("pool entries:",len(pool))
print("calendar days:",len(cal))
kinds={}
for p in pool: kinds[p["kind"]]=kinds.get(p["kind"],0)+1
print("kinds:",kinds)
gen={}
for p in pool: gen[p["genre"]]=gen.get(p["genre"],0)+1
print("genres:",dict(sorted(gen.items(),key=lambda x:-x[1])))
import os; print("file KB:",round(os.path.getsize('music-history.json')/1024,1))
