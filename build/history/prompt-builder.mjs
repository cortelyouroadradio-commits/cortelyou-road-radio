/**
 * Cortelyou Road Radio — image prompts for Today in Music History
 * ------------------------------------------------------------------
 * Turns one calendar entry into an image prompt that actually depicts THAT
 * entry's moment.
 *
 * WHY THIS EXISTS
 * The original prompts were assembled in make-prompts.py from two fields only:
 * `year` (which picked an era-appropriate room) and `art` (one of fifteen stock
 * scenes). The entry's own title and story were never read. So the Kings
 * Theatre reopening — an ornate 1929 Flatbush movie palace — was tagged
 * art:"crowd" and rendered as a generic packed club floor, and "Tupac studied
 * ballet and Shakespeare" rendered as a 1970s vocal booth. Every Brooklyn entry
 * in the calendar also drew the identical Victorian street, because the place
 * list was indexed with a hardcoded [0].
 *
 * HOW THIS WORKS INSTEAD
 * Rules are matched against the entry's title and story text and the first hit
 * wins, so ORDER IS THE DESIGN — specific and distinctive patterns must sit
 * above greedy ones. A few worked examples of why the order below looks the way
 * it does:
 *   - "escaping a contract" appears in the Lou Reed feedback story, so the
 *     feedback rule has to outrank the contract rule.
 *   - "recorded a heartbeat" is described as a "bass drum", so heartbeat has to
 *     outrank the bassline rule.
 *   - "the first commercial radio broadcast" contains "commercial", so radio
 *     has to outrank the jingles rule.
 * Era and lighting still come from the year, which is what made the original
 * images look good. If nothing matches we fall back to the old `art` keyword,
 * then to genre, so every date still resolves to something sensible.
 *
 * ON LIKENESSES: prompts describe rooms, instruments and objects — never a
 * named person's face. Entries about Tupac, Aretha or Prince get the room they
 * worked in, not a portrait. Figures stay unnamed, turned away or in shadow.
 * That keeps the cinematic look without generating a real person.
 */

/* Era room + lighting, from the entry's year. Unchanged from the original —
   this part was always the good bit. */
export function era(year) {
  const y = /^\d+$/.test(String(year)) ? Number(year) : 1970;
  if (y < 1930) return ["a 1920s acoustic-era room", "sepia tones, soft window light, visible dust in the air"];
  if (y < 1950) return ["a 1940s broadcast-era studio", "warm monochrome palette, hard key light, deep shadows"];
  if (y < 1960) return ["a 1950s recording studio", "tube amplifiers, muted teal and cream palette, single overhead lamp"];
  if (y < 1970) return ["a 1960s wood-panelled recording studio", "warm tungsten glow, tape machines, amber and walnut palette"];
  if (y < 1980) return ["a 1970s recording studio", "shag carpet, warm orange tungsten light, wood veneer, heavy analog gear"];
  if (y < 1990) return ["a 1980s recording studio", "large-format console, cool neon accents against warm lamps, VHS-era palette"];
  if (y < 2000) return ["a 1990s production room", "racks of samplers, gritty fluorescent and lamp mix, cluttered desk"];
  return ["a modern studio", "clean LED accents, dark room, screen glow"];
}

/**
 * Subject rules — FIRST MATCH WINS, so this list runs most distinctive first.
 *
 * Each scene must be something a camera could actually photograph. "The birth
 * of dub" is not a scene; a mixing desk with spring reverb tanks and tape delay
 * units is. Rules are written to generalise past the entry that prompted them,
 * so the whole 366-day calendar benefits, not just the next few weeks.
 *
 * `place` overrides the era room entirely when the scene is not a studio.
 */
const RULES = [
  // === Tier 1: distinctive title forms ======================================
  {
    // "Which 'X' wins: A or B?" — a recurring format on the calendar. Has to
    // sit at the very top: these stories describe both versions and would
    // otherwise match whatever instrument they happen to mention.
    when: /^which .*wins|face.?off|two versions|the only .* version/i,
    scene: "two vintage microphones facing each other across a split studio floor, one side lit warm from a lamp, the other cool from a window",
  },

  // === Tier 2: named venues and places ======================================
  {
    // The Kings Theatre appears twice on the calendar — once dark, once
    // reopened — and each story mentions the other state. Matching the full
    // text picks the wrong one every time, so these two read the TITLE only.
    on: "title",
    when: /sat dark|dark for \d|decay|abandoned|shuttered|closed in \d{4}/i,
    place: "an abandoned 1920s movie palace",
    scene: "a decayed auditorium, peeling gilt and water-stained plaster, daylight falling through a broken roof onto seats under dust sheets",
  },
  {
    on: "title",
    when: /reopen|restor|revival of (the )?(theatre|palace)/i,
    place: "a restored 1920s Brooklyn movie palace",
    scene: "the auditorium seen from the rear stalls, ornate gilded plasterwork and a domed ceiling above deep rows of red velvet seats, house lights low and the stage lit",
  },
  {
    when: /bandshell|celebrate brooklyn|free outdoor|outdoor festival|prospect park/i,
    place: "a city park at dusk",
    scene: "an open-air bandshell seen from across the lawn, stage lights just coming up, blankets and folding chairs scattered over the grass, trees dark behind",
  },
  {
    when: /block part(y|ies)|sound.?system|speaker stack|street closure|cortelyou|rugby road/i,
    place: "a residential Brooklyn street at dusk",
    scene: "a block party on a closed street, stacked speaker cabinets on the sidewalk, string lights strung between porches of Victorian houses, folding tables along the curb",
  },
  {
    when: /record shop|record store|fulton|white labels|milk crates/i,
    place: "an independent record shop",
    scene: "crowded racks of twelve-inch singles with handwritten card dividers, a listening turntable at the counter, posters layered on the wall",
  },
  {
    when: /roof(top)?\b/i,
    place: "a flat city rooftop",
    scene: "a live performance set up on the roof of an office building, amplifiers and a drum kit on the tar paper, chimney stacks and a grey winter sky beyond",
  },
  {
    when: /church|gospel|preacher|choir|sanctuary/i,
    place: "an empty church sanctuary",
    scene: "a wooden choir stand and organ pipes above the pulpit, morning light coming through stained glass onto empty pews",
  },
  {
    when: /kingston|jamaica|peace concert/i,
    place: "an outdoor stage at night in the tropics",
    scene: "stacked speaker cabinets flanking an empty stage, a single microphone stand centre, palm trees caught in the edge of the lights",
  },
  {
    when: /salon|chopin|drawing room|few dozen/i,
    place: "a candlelit nineteenth-century salon",
    scene: "a small grand piano with its lid raised, a handful of empty chairs drawn close in a half circle, sheet music on the stand",
  },
  {
    when: /new orleans|j&m|matassa/i,
    place: "a cramped 1950s New Orleans studio",
    scene: "an upright piano against an acoustic-tiled wall, a single microphone slung over the soundboard, a stool pushed back",
  },
  {
    when: /bedroom studio|home recording|private studio|label-owned/i,
    place: "a small home studio in a domestic room",
    scene: "a mixing desk pushed against a bedroom wall under a window, monitors either side, cables gathered along the skirting board",
  },
  {
    when: /boombox|stoop|summer street/i,
    place: "a summer stoop in Brooklyn",
    scene: "a boombox sitting on the front steps of a Victorian house, the street beyond in soft focus, late golden light",
  },

  // === Tier 3: training, craft, process =====================================
  {
    when: /ballet|shakespeare|school for the arts|drama|rehearsal/i,
    place: "an empty performing-arts rehearsal studio",
    scene: "a ballet barre along a mirrored wall above a worn sprung wooden floor, a script and a pair of shoes left on a stool, light from high windows",
  },
  {
    when: /oblique strateg|cards with instructions|wrote rules|writer'?s block/i,
    scene: "a deck of printed instruction cards fanned across a studio desk beside an open notebook, a cold mug and a pencil",
  },
  {
    // Above the contract rule: "Metal Machine Music" is described as a possible
    // contract escape, but the story is about feedback.
    when: /feedback|unlistenable|metal machine|wall of noise/i,
    scene: "two guitar amplifiers turned to face each other across an empty studio floor, a guitar propped against one, cables everywhere",
  },
  {
    // Above the vocoder/homemade rule: "Change the Beat" is a vocoder record
    // but the story is about it being the most-scratched sample in DJ history.
    when: /scratch|most.?scratched|cutting between|two turntables|turntablis/i,
    scene: "two turntables and a battered mixer on a road case, a crate of records open alongside, a headphone cup resting on the platter",
  },
  {
    // Above the bassline rule: a heartbeat here is literally a treated bass drum.
    when: /heartbeat|pulse\b|unborn/i,
    scene: "a bass drum photographed close in a darkened studio, one microphone inches from the head, cabling coiled across the floor",
  },
  {
    // Above the jingles rule: "the first commercial radio broadcast".
    when: /radio (broadcast|play|station)|broadcast|airtime|on air|airplay/i,
    scene: "a radio broadcast booth with the ON AIR lamp lit, a microphone on a boom arm over the desk, shelves of transcription discs behind glass",
  },
  {
    // Above the saxophone rule: scat is about imitating horns, not playing one.
    when: /scat|imitating (trumpet|horns|a horn)|turning her voice/i,
    scene: "a jazz bandstand between sets, a microphone at the lip of the stage, trumpet and saxophone left on stands behind it",
  },
  {
    when: /jingle|singing commercials|backing vocal|session singer|sweet inspirations/i,
    scene: "a session vocal booth with three microphones on stands at working height, lyric sheets clipped to music stands, tape boxes stacked beside",
  },
  {
    when: /contract|label dispute|escape a deal|changed (his|her|their) name|'slave'|unpronounceable/i,
    scene: "a thick contract open on a desk under a single lamp, a pen laid across the signature page, a guitar case leaning in the shadow behind",
  },
  {
    when: /never wrote .* down|improvised|first take|nothing notated|writing nothing down|held .* in his head/i,
    scene: "a music stand holding blank manuscript paper in a tracking room, an instrument resting on a chair beside it, everything else in shadow",
  },
  {
    when: /practi[cs]ed|lips bled|twelve hours|12 hours a day|obsession/i,
    scene: "a small practice room at night, an instrument case open on the floor, a chair, a music stand and a single lamp, condensation on the window",
  },

  // === Tier 3b: recurring subjects across the archive =======================
  // These sit above the instrument rules because they are more specific than
  // the instrument a story happens to name.
  {
    when: /car speaker|car radio|dashboard|test\w* .* in a car/i,
    place: "a parked car at night",
    scene: "a dashboard and door speaker lit by streetlight through the windscreen, a cassette half out of the deck",
  },
  {
    when: /requiem|messiah|symphony|concerto|manuscript|composed|wrote .* in \d+ days|orphanage|court composer/i,
    place: "a composer's writing room",
    scene: "a manuscript score covered in ink corrections on a slanted desk, a quill and inkwell, candle burned low",
  },
  {
    when: /fort greene|bed.?stuy|marcy|clinton hill|brownsville|crown heights|east new york|brooklyn's .* (block|scene|shops)/i,
    place: "a Brooklyn street",
    scene: "a block of brownstone stoops in low evening light, a corner store awning at the end, fire escapes above",
  },
  {
    when: /vault|unreleased|archive of tapes|left behind .* recordings/i,
    place: "a climate-controlled tape vault",
    scene: "steel shelving stacked with labelled tape boxes receding into the dark, one aisle lit",
  },
  {
    when: /autotune|auto-tune|pitch correction|oil industry|invented by an engineer|seismic/i,
    place: "an engineering lab",
    scene: "an oscilloscope and a rack of prototype signal processors on a bench, a waveform frozen on the screen",
  },
  {
    when: /theremin/i,
    scene: "a theremin on a stand with its two antennas in an otherwise empty room, one lamp behind it",
  },
  {
    when: /sitar|tabla|raga|indian classical/i,
    scene: "a sitar resting on a patterned rug beside floor cushions, incense smoke in a shaft of light",
  },
  {
    when: /conga|bongo|timbales|percussionist|salsa|fania/i,
    scene: "congas and timbales set up in a small club, a microphone angled low over the heads, chairs stacked behind",
  },
  {
    when: /no instruments|a cappella|only his voice|beatbox|vocal(s)? alone|used no instruments/i,
    scene: "a bare vocal booth with a single microphone on a stand, acoustic panels on every wall, nothing else in the room",
  },
  {
    when: /arrang\w+ for|conductor|wrote for specific players|big band|orchestrat/i,
    scene: "a conductor's score open on a stand facing empty orchestra chairs and music stands, hall lights half up",
  },
  {
    when: /protest song|no label would touch|banned|refused to release|censor/i,
    scene: "a single microphone in an empty nightclub under one spotlight, a small table and a glass at the edge of the light",
  },
  {
    when: /loud war|dynamic range|master(ing|ed)|compress/i,
    scene: "a mastering room with meters pinned near the top, a waveform stretched across a screen, monitors either side",
  },
  {
    when: /woke up with|came to (him|her) in a dream|hummed it|melody in (his|her) head/i,
    scene: "a bedside table with an open notebook, a pencil and a small cassette recorder, grey early light through the curtain",
  },
  {
    when: /wrote (two )?(standards|songs)|songwrit|lyrics|co-wrote|notebook/i,
    scene: "handwritten lyric sheets spread across a piano lid, crossings-out and a pencil, a mug at the corner",
  },
  {
    when: /played \d+ instruments|multi-instrumentalist|one-man|every instrument/i,
    scene: "a studio floor ringed with instruments — drums, bass, guitar, keys — and a single empty chair at the centre",
  },
  {
    when: /ran out of a|independent label|small label|started a label/i,
    place: "a converted domestic room used as a record label office",
    scene: "boxes of singles stacked against the wall, a telephone and a ledger on a desk, a wall calendar marked up",
  },
  {
    when: /day job|factory|toilet seats|assembly line|before (he|she) was signed/i,
    place: "a factory floor at the end of a shift",
    scene: "a workbench with a lunch pail and a notebook open beside a set of tools, machines still under strip lighting",
  },
  {
    when: /2:\d\d songs|short songs|setlist|fit more into a set/i,
    scene: "a handwritten setlist taped to a stage floor beside a monitor wedge and a coil of cable",
  },
  {
    when: /juneteenth|road north|great migration|delta|travell?ing/i,
    place: "a rural road at dusk",
    scene: "telephone poles running to the horizon, a guitar case set down at the roadside, dust in the last light",
  },
  {
    when: /died|killed|passed away|memorial|posthumous/i,
    scene: "a record still turning on a turntable in an empty room, the tonearm run to the centre, lights low",
  },

  // === Tier 4: instruments and gear =========================================
  {
    when: /neve|console|mixing desk|mixing board|faders/i,
    scene: "a large-format analogue mixing console photographed low along its surface, faders lit from above, VU meters glowing in the dark",
  },
  {
    // "version" alone was far too greedy — it matched any two-version story.
    when: /\bdub\b|king tubby|stripping tracks|spring reverb|riddim/i,
    scene: "a dub mixing desk stacked with spring reverb tanks and tape delay units, faders pushed to the top, everything lit dim red",
  },
  {
    when: /tape|splic|razor|reel|bounc\w+ tape|overdub|layered .* times|wore thin/i,
    scene: "a tape editing bench, a reel-to-reel machine mid-run with a razor blade and splicing block beside it, cut lengths of tape hung on a peg",
  },
  {
    when: /\b808\b|drum machine|tr-\d/i,
    scene: "a classic analogue drum machine on a cluttered desk, its step buttons glowing, a single cable snaking away to a mixer",
  },
  {
    when: /fairlight|digital sampler|sampling workstation|light.?pen/i,
    scene: "an early digital sampling workstation with a green monochrome screen and full keyboard, in a wood-panelled room, manuals stacked beside it",
  },
  {
    when: /sampler|beat tape|dj premier|pete rock|large professor|\bmpc\b|sp-\d/i,
    scene: "a beat-making desk with a sampler and drum pads worn pale from use, labelled cassettes and stacked records beside it",
  },
  {
    when: /built (their|his|her) own|custom electronic|kling klang|vocoder|homemade|constructed/i,
    place: "an instrument workshop",
    scene: "a bench of homemade electronic instruments under a work lamp, exposed circuit boards, patch cables and knobs labelled by hand in marker",
  },
  {
    when: /synth|modular|moog|patch cable/i,
    scene: "a wall of modular synthesizer cabinets criss-crossed with patch cables, panel lamps glowing in a dark room",
  },
  {
    when: /turntable|\bdj\b|breakbeat/i,
    scene: "two turntables and a battered mixer on a road case, a crate of records open alongside, a headphone cup resting on the platter",
  },
  {
    when: /loudspeaker as a microphone|rattle radios|ken townsend/i,
    scene: "a loudspeaker cabinet rigged as a microphone facing a bass amplifier, cables taped down across the studio floor",
  },
  {
    when: /bass(line|ist)?\b|jamerson|babbitt|low end|octave apart/i,
    scene: "an electric bass guitar on a stand in a tracking room, flatwound strings catching the light, an amplifier behind it and headphones on the floor",
  },
  {
    when: /\bbreak\b|snare|drum intro|bongo|percussion break|apache/i,
    scene: "a drum kit isolated in a studio live room, baffles standing around the snare, lit hard from one side, sticks resting across the head",
  },
  {
    when: /saxophone|coltrane|\bhorn\b|trumpet|brass/i,
    scene: "a saxophone resting across a chair in a practice room, reeds and a polishing cloth on the music stand, late light through a slatted blind",
  },
  {
    when: /guitar|chuck\w+|riff|guitar figure/i,
    scene: "an electric guitar leaning against a vintage amplifier, its cable coiled on the floor, a strap hanging over the cabinet",
  },
  {
    when: /piano|pianist|triplet|\bkeys\b/i,
    scene: "a grand piano in a live room with the lid open, sheet music scattered across the stand and bench",
  },
  {
    when: /string section|violin|orchestra|arrangement/i,
    scene: "a string section mid-session, bows lifted together, music stands and warm hall lighting behind",
  },
  {
    when: /vinyl|shellac|78 ?rpm|gramophone|pressed|sold .* copies|outsold/i,
    scene: "a stack of shellac discs in paper sleeves beside a wind-up gramophone, one record on the platter, warm window light across them",
  },

  // === Tier 5: mood fallbacks ===============================================
  {
    when: /rain|storm|bad weather/i,
    scene: "a studio window streaked with heavy rain at night, a microphone soft in the foreground, city light smeared beyond the glass",
  },
  {
    when: /shot|wounded|gunmen|violence|threat/i,
    scene: "an empty stage moments before a show, a single microphone stand centre, a folding chair and a towel left at the edge of the lights",
  },
  {
    when: /crowd|sold.?out|packed|audience|hands up/i,
    scene: "a packed floor seen from the side of the stage, hands raised, haze hanging in the spotlight beams",
  },
];

/* Last-resort scenes, keyed by the old `art` column. Kept so any entry that
   matches no rule still lands somewhere reasonable rather than defaulting to a
   turntable for everything. */
const ART_FALLBACK = {
  vinyl: "a listening room with a turntable mid-spin and records fanned across a low table",
  turntable: "a DJ setup with two turntables, a battered mixer and milk crates of records",
  tape: "a tape machine room, two reels turning, tape boxes hand-labelled in marker",
  mixer: "a large mixing console seen at a low angle, faders lit from above, meters glowing",
  synth: "a wall of modular synthesizer cabinets criss-crossed with patch cables",
  mic: "a vocal booth with a large condenser microphone and pop filter, headphones hanging",
  drums: "a drum room with baffles, a kit lit from one side, sticks resting on the snare",
  piano: "a grand piano in a live room, lid open, sheet music scattered",
  guitar: "a guitar leaning against a vintage amplifier, cables coiled on the floor",
  horn: "a brass section in a live room, horns raised, music stands and chairs",
  strings: "a string section mid-session, bows lifted, warm hall lighting",
  sampler: "a beat-making desk with a drum machine and sampler, pads worn from use, records stacked beside",
  crowd: "a packed club floor seen from the stage, hands up, haze in the spotlight beams",
  radio: "a radio broadcast booth, ON AIR lamp lit, microphone on a boom arm",
  boombox: "a summer stoop scene with a boombox on the steps and a street in soft focus",
};

/**
 * Genre fallback, used when no rule matches.
 *
 * This matters more than it looks: image-prompts.csv does not carry the `art`
 * column, so ART_FALLBACK above is effectively unreachable from the CSV and
 * every unmatched entry used to collapse onto the same turntable photograph.
 * Falling back by genre keeps an unmatched Jazz entry looking like jazz.
 */
const GENRE_FALLBACK = {
  "Hip-Hop": "a beat-making desk with a sampler, stacked twelve-inches and a pair of headphones over the corner of the mixer",
  "R&B": "a vocal booth with a large condenser microphone and pop filter, headphones hanging from the stand",
  Soul: "a live room set up for a rhythm section, bass amp, drum kit and a Wurlitzer, no players",
  Funk: "a clavinet and a bass rig side by side in a tracking room, cables snaked across the floor",
  Jazz: "a jazz bandstand between sets, a microphone at the lip of the stage, horns left on stands behind it",
  Blues: "a resonator guitar leaning against a wooden chair on a porch, an amplifier just inside the doorway",
  Rock: "an electric guitar leaning against a stack of amplifiers in an empty rehearsal room, cables coiled on the floor",
  Punk: "a small club stage from the floor, a single mic stand, gaffer tape and setlists stuck to the boards",
  Grunge: "a practice space in a basement, amplifiers on carpet squares, a drum kit under one bare bulb",
  "Art Rock": "an experimental studio bench of tape machines and effects units, patch leads draped between them",
  Electronic: "a wall of modular synthesizer cabinets criss-crossed with patch cables, panel lamps glowing",
  Disco: "a mirrorball above an empty dance floor, the DJ booth dark at the far end, light scattering across the boards",
  Reggae: "a dub mixing desk with spring reverb tanks and tape delay units, lit dim red",
  Latin: "congas and timbales set up in a small club, a microphone angled low over the heads",
  Country: "an acoustic guitar on a stand beside a stool and a lyric notebook, a single warm lamp",
  Classical: "a manuscript score covered in ink corrections on a slanted writing desk, quill and inkwell beside it",
  Pop: "a control room seen over the console toward the live room glass, monitors glowing",
  Production: "a large mixing console at a low angle, faders lit from above, meters glowing",
  Radio: "a radio broadcast booth, ON AIR lamp lit, microphone on a boom arm",
  Brooklyn: "a Ditmas Park block of freestanding Victorian houses with deep porches, Flatbush rooftops beyond, low evening light down the street",
};

const LAST_RESORT = "a listening room with a turntable mid-spin and records fanned across a low table";

/**
 * First matching rule wins. A rule with `on: "title"` is tested against the
 * headline alone — needed when two entries cover the same subject in opposite
 * states and each story mentions the other.
 */
function matchRule(text, title) {
  for (const rule of RULES) {
    const hay = rule.on === "title" ? title : text;
    if (!rule.when.test(hay)) continue;
    if (rule.unless && rule.unless.test(hay)) continue;
    return rule;
  }
  return null;
}

/**
 * Build the image prompt for one calendar entry.
 * @param {{title:string, story?:string, genre?:string, year?:string|number, art?:string}} entry
 */
export function buildPrompt(entry) {
  const title = entry.title || "";
  const story = entry.story || "";
  // Match on the title plus the opening paragraph. Later paragraphs wander into
  // station commentary and produce false matches.
  const text = `${title}. ${story.split(/\n\s*\n/)[0] || ""}`;

  const [eraPlace, light] = era(entry.year);
  const hit = matchRule(text, title);

  let place = eraPlace;
  let scene;

  if (hit) {
    scene = hit.scene;
    if (hit.place) place = hit.place;
  } else {
    // No rule matched. Prefer the old art keyword when it is available, then
    // the genre, and only then the generic listening room.
    scene = ART_FALLBACK[entry.art] || GENRE_FALLBACK[entry.genre] || LAST_RESORT;
    if (!ART_FALLBACK[entry.art] && entry.genre === "Brooklyn") place = "a Brooklyn street";
  }

  const sentence = scene[0].toUpperCase() + scene.slice(1);

  return (
    `Cinematic editorial photograph, ${place}. ${sentence}. ` +
    `${light}. No recognisable people — any figure is unnamed, turned away or in shadow. ` +
    `Documentary feel, as if shot for a magazine. ` +
    `35mm film, shallow depth of field, fine grain, 16:9 landscape. ` +
    `No text, no logos, no watermarks, no captions.`
  );
}

export default buildPrompt;
