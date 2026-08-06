# Regenerates image-prompts.csv and the human-readable IMAGE-PROMPTS.md pack
# from music-history.json.
#
# NOTE ON THE `prompt` COLUMN — it is LEGACY and no longer used to generate
# artwork. prompt_for() below builds a prompt from only two fields, `year` and
# `art`, and never reads the entry's title or story. That is why the Kings
# Theatre reopening rendered as a generic club floor and every Brooklyn entry
# drew the identical Victorian street (see the hardcoded [0] in prompt_for).
#
# build/generate-images.mjs now derives prompts at generation time from each
# entry's own subject via build/history/prompt-builder.mjs. This column is kept
# only so the CSV shape stays stable; edit the .mjs builder instead.
import json, csv, datetime

d = json.load(open('music-history.json'))
cal = d['calendar']

# every calendar date gets a row, so the generator can look up any day
entries = [(k, cal[k]) for k in sorted(cal)]

def era(y):
    y = int(y) if str(y).isdigit() else 1970
    if y < 1930:  return ("a 1920s acoustic-era room", "sepia tones, soft window light, visible dust in the air")
    if y < 1950:  return ("a 1940s broadcast-era studio", "warm monochrome palette, hard key light, deep shadows")
    if y < 1960:  return ("a 1950s recording studio", "tube amplifiers, muted teal and cream palette, single overhead lamp")
    if y < 1970:  return ("a 1960s wood-panelled recording studio", "warm tungsten glow, tape machines, amber and walnut palette")
    if y < 1980:  return ("a 1970s recording studio", "shag carpet, warm orange tungsten light, wood veneer, heavy analog gear")
    if y < 1990:  return ("a 1980s recording studio", "large-format console, cool neon accents against warm lamps, VHS-era palette")
    if y < 2000:  return ("a 1990s production room", "racks of samplers, gritty fluorescent and lamp mix, cluttered desk")
    return ("a modern studio", "clean LED accents, dark room, screen glow")

SET = {
 "vinyl":"a listening room with a turntable mid-spin and records fanned across a low table",
 "turntable":"a DJ setup with two turntables, a battered mixer and milk crates of records",
 "tape":"a tape machine room, two reels turning, tape boxes hand-labelled in marker",
 "mixer":"a large mixing console seen at a low angle, faders lit from above, meters glowing",
 "synth":"a wall of modular synthesizer cabinets criss-crossed with patch cables",
 "mic":"a vocal booth with a large condenser microphone and pop filter, headphones hanging",
 "drums":"a drum room with baffles, a kit lit from one side, sticks resting on the snare",
 "piano":"a grand piano in a live room, lid open, sheet music scattered",
 "guitar":"a guitar leaning against a vintage amplifier, cables coiled on the floor",
 "horn":"a brass section in a live room, horns raised, music stands and chairs",
 "strings":"a string section mid-session, bows lifted, warm hall lighting",
 "sampler":"a beat-making desk with a drum machine and sampler, pads worn from use, records stacked beside",
 "crowd":"a packed club floor seen from the stage, hands up, haze in the spotlight beams",
 "radio":"a radio broadcast booth, ON AIR lamp lit, microphone on a boom arm",
 "boombox":"a summer stoop scene with a boombox on the steps and a street in soft focus",
}

BK = ("Brooklyn", "a Ditmas Park street of Victorian houses / Flatbush Avenue at dusk / the Kings Theatre marquee / the Coney Island boardwalk")

def prompt_for(e):
    place, light = era(e['year'])
    scene = SET.get(e['art'], SET['vinyl'])
    if e['genre'] == 'Brooklyn':
        scene = "a Brooklyn neighbourhood scene — " + BK[1].split(' / ')[0] + ", with " + scene
    return (
      f"Cinematic editorial photograph, {place}. {scene[0].upper()}{scene[1:]}. "
      f"{light}. Unnamed figures only — a singer at the microphone or a producer in headphones, "
      f"faces turned away or in shadow. Documentary feel, as if shot for a magazine. "
      f"35mm film, shallow depth of field, fine grain, 16:9 landscape. "
      f"No text, no logos, no watermarks, no captions."
    )

rows = []
for k, e in entries:
    rows.append({
        "save_as": f"assets/history/{k}.jpg",
        "date": k, "title": e['title'], "genre": e['genre'], "year": e['year'],
        "story": e['story'],
        "prompt": prompt_for(e),
    })

with open('build/history/image-prompts.csv','w',newline='',encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys())); w.writeheader(); w.writerows(rows)

# a readable markdown version, next 30 days first
today = datetime.date.today()
order = []
for i in range(400):
    kk = (today + datetime.timedelta(days=i)).strftime("%m-%d")
    m = [r for r in rows if r['date'] == kk]
    if m and m[0] not in order: order.append(m[0])
rest = [r for r in rows if r not in order]

with open('build/history/IMAGE-PROMPTS.md','w',encoding='utf-8') as f:
    f.write("# Music History — image prompt pack\n\n")
    f.write("One ready-to-paste prompt per entry. Generate at **1600x900 (16:9)**, save as the\n")
    f.write("`save_as` filename, drop it in `assets/history/` and it appears automatically.\n\n")
    f.write("Works in ChatGPT Images 2.0, Google Imagen / Gemini, Midjourney (add `--ar 16:9`),\n")
    f.write("or Adobe Firefly. Full machine-readable list: `image-prompts.csv`.\n\n")
    f.write("> **On likenesses:** these prompts describe the room, the gear and the era rather than\n")
    f.write("> a named artist. That gets the same cinematic look without generating a real person's\n")
    f.write("> face, which is where the legal risk sits. Add a likeness yourself if you decide to.\n\n---\n\n")
    f.write("## Coming up next\n\n")
    for r in order[:30]:
        f.write(f"### {r['date']} — {r['title']}\n")
        # Stories are now several paragraphs; the prompt pack only needs the lede.
        lede = r['story'].split("\n\n")[0]
        f.write(f"*{r['genre']} · {r['year']}* — {lede}\n\n")
        f.write(f"**Save as:** `{r['save_as']}`\n\n```\n{r['prompt']}\n```\n\n")
    f.write("---\n\n## Full archive\n\n")
    for r in rest:
        f.write(f"### {r['date']} — {r['title']}\n\n**Save as:** `{r['save_as']}`\n\n```\n{r['prompt']}\n```\n\n")

print("entries:", len(rows))
print("csv + md written")
