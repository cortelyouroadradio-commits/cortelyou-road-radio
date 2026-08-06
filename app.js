/* ============================================================
   Cortelyou Road Radio — player + content engine
   ============================================================ */
const RADIO_STATUS = "https://public.radio.co/stations/s82969a5e0/status";
const ART = (name) => `./assets/${name}.svg`;

/* ---------- Content pools (fallback / built-in) ---------- */
const pools = {
  music: [
    {
      tag: "Cover Story",
      title: "Why the cleanest read on the week still comes from the songs people replay",
      summary: "Three artists, three temperatures, and a better sense of what listeners carry from one day into the next.",
      art: "editorial-music-pulse",
      bodyParagraphs: [
        "Every music week produces two different stories. The first is the launch story — the release-day numbers, the announcement posts, the chart debut. It is loud, it is easy to report, and it is almost always front-loaded. The second story takes about ten days longer to appear, and it is the one that actually decides what a station plays in three months: which of those songs people went back to on their own.",
        "That second number has a name in the industry. Analysts watch the week-two hold — what percentage of first-week streams a song keeps once the launch push stops. A record that holds most of its opening week is behaving like a habit. A record that drops off a cliff was an event, and events do not survive a rotation. You can feel the difference on air long before it shows up in a chart: habit songs get requested, event songs get recognized.",
        "The interesting part is that the two categories rarely look different on paper. Both can debut high. Both can trend. What separates them tends to be structural — how quickly the hook arrives, whether the arrangement leaves any air in it, whether the second verse gives you a reason to stay. Songs built for a fifteen-second clip peak fast. Songs built for a full listen peak slowly and then refuse to leave.",
        "So when this page names three artists, it is not ranking them by volume. It is asking a narrower question: which of these will still sound right at 7pm on a Thursday, coming out of something older, in a room where nobody chose the playlist? That is the only test a radio station really has.",
      ],
    },
    {
      tag: "Artist Watch",
      title: "The records landing now feel lighter on their feet than the headlines suggest",
      summary: "More playable in a daily station mix than the louder release-cycle noise implies.",
      art: "editorial-artist",
      bodyParagraphs: [
        "Read a week of music coverage and you would think everything arriving right now is maximal — bigger features, denser production, more of everything. Put the same records into an actual sequence and the opposite turns out to be true. A lot of what is landing well is comparatively spare: fewer layers, more space around the vocal, arrangements that resolve instead of piling up.",
        "There is a practical reason for that. Most listening now happens on small speakers — a phone on a kitchen counter, a single Bluetooth puck, laptop speakers at work. Dense mixes collapse on those systems. Everything competes for the same narrow midrange and the result is mush. Producers have adapted by clearing room: cutting low end that nobody's speaker can reproduce anyway, pushing the vocal forward, letting one or two elements carry a section instead of six.",
        "That restraint is exactly what makes a record useful to a station. A song with air in it can sit next to almost anything. It follows a seventies soul cut without sounding thin and it follows a modern rap record without sounding polite. Songs that are maxed out in every frequency band can only follow other songs that are maxed out, which is why they tend to cluster in playlists and disappear from mixed rotations.",
        "None of this is a knock on ambition. It is a note about durability. The records that keep earning spins are usually the ones a programmer can move around freely, and lightness — real lightness, the kind that comes from choosing what to leave out — is what buys that freedom.",
      ],
    },
    {
      tag: "On Air",
      title: "What a good transition sounds like when a station trusts its room",
      summary: "The small art of moving from groove to groove without losing the room.",
      art: "editorial-station",
      bodyParagraphs: [
        "A transition is the shortest piece of editorial a station ever publishes. It lasts maybe four seconds and it makes an argument: these two records belong next to each other. Get it right and the listener never consciously notices — they just stay. Get it wrong and they reach for their phone without quite knowing why.",
        "The mechanics are less mysterious than they sound. Tempo is the coarse control: a jump of more than roughly ten percent reads as a break rather than a move, which is fine if you want a break and jarring if you do not. Key matters next — records a fourth or fifth apart tend to slide together, records a half-step apart tend to fight. And energy is the one people underrate. Two songs can match in tempo and key and still clash because one is winding up and the other is winding down.",
        "Then there is the option most automated systems never take: leaving a gap. A half-second of near-silence between a big outro and a quiet intro does more work than any crossfade. It resets the ear. Old radio hands used to call it letting the record breathe, and it is the clearest sign that a human is making the decisions.",
        "That is really the whole tell. Algorithmic sequencing optimizes each next song against your history. A person sequencing a room optimizes the shape of the next twenty minutes. The second one occasionally plays something you would not have picked, and that is the point — it is the only way a station stays capable of surprising you.",
      ],
    },
    {
      tag: "Scene Notes",
      title: "The quieter songs that still carry enough shape to stop the scroll",
      summary: "Texture and immediacy tend to outlast a fast viral spike.",
      art: "editorial-music-business",
      bodyParagraphs: [
        "Quiet does not mean small. Some of the most durable records ever cut are barely above a whisper — the vocal is close, the drums are brushed or programmed low, and almost nothing happens loudly. What they have instead of volume is shape: a clear arc from first bar to last, so a listener always knows where they are inside the song.",
        "Shape is what separates a quiet record from an ambient one. You can usually hear it in the arrangement's arithmetic. Something enters around the eight-bar mark. Something drops out before the second chorus so the return lands harder. The bridge removes an element rather than adding one. None of these moves are loud, but each one is an event, and events are what keep attention from drifting.",
        "This is also why texture matters more in a sparse mix than a dense one. When there are only four things happening, the character of each becomes structural — the specific grain of a Rhodes, tape hiss left in on purpose, a room mic that puts you at a distance from the drums. In a maximal record those details get buried. In a quiet one they are the architecture.",
        "For a station, these records do a job nothing else does. They are the reset button between two big moments, and they are frequently the songs listeners write in about, because a quiet record that lands feels like it was played for you specifically rather than at a crowd.",
      ],
    },
    {
      tag: "Artist Radar",
      title: "The artists people want to argue about and replay at the same time",
      summary: "Volatility, presence, and repeat-listen curiosity — exactly what a daily desk rewards.",
      art: "editorial-music-pulse",
      bodyParagraphs: [
        "There is a specific kind of artist worth watching: the one who generates disagreement and repeat listens from the same audience. Those two things usually pull apart. Comfortable music gets replayed and not discussed. Provocative music gets discussed and rarely replayed. The artists who manage both are the ones whose catalogs age well.",
        "The mechanism is not mystery. Records that reward argument tend to have a decision inside them that a listener can point at — an unusual structure, a vocal choice that reads as either brave or overdone, a production idea that refuses to be background. That decision is what gives people something to say. And because it is a real feature of the record rather than a marketing angle, it is still there on the tenth listen, which is what keeps the song from wearing out.",
        "This matters for a station because those are the records that build a room's identity. Playing only consensus music produces a pleasant, forgettable station. Playing only difficult music produces a small one. The overlap — songs with a point of view that people also want to hear again — is where an audience actually forms, because listeners start associating the station with having taste rather than having a playlist.",
        "So Artist Radar is not a popularity read. It is a search for the artists whose next record you would genuinely want to hear before you knew anything about it. That instinct is hard to fake and it is the single best predictor of a long career.",
      ],
    },
  ],
  chart: [
    {
      tag: "Chart Pulse",
      title: "The record still popping up in group chats, car rides, and quick replays",
      summary: "A tighter read on what feels biggest right now, without losing the station's taste.",
      art: "editorial-music-pulse",
      bodyParagraphs: [
        "It helps to remember what a chart position actually measures. The Hot 100 is a blend — streaming activity, radio airplay reaching a measured audience, and paid downloads, weighted and combined into a single number. It is a good instrument, but it is measuring three different behaviors at once and reporting them as one, which means two songs can share a rank while behaving nothing alike.",
        "One might be enormous on streaming and invisible on radio, which usually describes a record with a young, concentrated, very online audience. Another might be modest on streaming and heavy on airplay, which usually describes a record that has crossed into general circulation — waiting rooms, supermarkets, car radios. The second kind is less exciting and considerably more durable.",
        "Then there is the thing no chart captures at all: whether a song is being sent between people. A record that shows up in a group chat has passed a test that streaming counts cannot see, because someone put their own taste behind it. Those songs tend to convert into long tails, and they are disproportionately the ones a station gets asked about.",
        "So this slot reads the chart as evidence rather than verdict. The number tells you something got big. The more useful question is which of the three behaviors got it there, because that is what tells you whether it will still be around next season.",
      ],
    },
    {
      tag: "Popular Now",
      title: "Familiar enough to hit fast, strong enough to keep the station moving",
      summary: "There's a difference between overexposed and genuinely replayable.",
      art: "editorial-artist",
      bodyParagraphs: [
        "Familiarity is the most powerful and most dangerous tool in programming. Research on music preference has consistently found a mere-exposure effect: within limits, people rate a song higher simply because they have heard it before. Recognition feels like enjoyment. That is why a new record built on a familiar chord movement can land on first listen — the ear thinks it already knows it.",
        "The limit is the important half of that sentence. The same research finds an inverted-U shape. Liking rises with exposure, plateaus, and then declines, and the decline is steeper for simple material than for complex material. A song with a lot going on can absorb many more plays before it turns; a song that is one idea repeated wears out fast and then becomes actively irritating.",
        "This has a direct programming consequence. Overexposure is not a function of how many times a station plays a record — it is a function of how many times a record can survive being played. Two songs at the same chart position can have wildly different ceilings, and burning one out is a real cost, because listeners do not blame the song. They blame the station.",
        "So the standard for this slot is narrow: familiar enough to hit immediately, complicated enough to still be interesting on the fortieth spin. Records that clear both bars are rarer than the chart makes them look.",
      ],
    },
    {
      tag: "High Rotation",
      title: "The tracks holding on because they keep sounding better in context",
      summary: "What continues to work once the first spike of attention passes.",
      art: "editorial-music-business",
      bodyParagraphs: [
        "Rotation is the oldest idea in radio and still the least understood from outside. A high-rotation record is not simply the station's favorite song. It is a record that has proven it can appear several times a day, at different hours, next to different material, without ever feeling like a mistake. That is a much harder qualification than being good.",
        "Context sensitivity is what disqualifies most candidates. Some records only work at night. Some only work as an opener. Some are so strongly associated with one mood that placing them after the wrong song makes both records worse. Those songs still get played — they just get played deliberately, in specific slots, rather than carried in the core rotation.",
        "The records that survive heavy rotation tend to share a few traits. They start clearly, so they can follow anything. They have a stable energy level rather than a dramatic arc, so they do not fight what comes next. And they have some element — a tone, a phrase, a rhythmic quirk — that stays interesting even when the rest has become wallpaper. That last detail is what keeps a familiar record from turning into noise.",
        "Which is why this rail is not a ranking. It is a list of records that have already been tested against the actual conditions of a broadcast day and kept working.",
      ],
    },
    {
      tag: "Street Temperature",
      title: "Where broad attention and local curiosity overlap",
      summary: "The records that feel both current and socially useful.",
      art: "editorial-station",
      bodyParagraphs: [
        "National charts describe an average listener who does not exist anywhere in particular. That average is useful for the industry and close to useless for a neighborhood. What a station on one Brooklyn avenue needs to know is narrower: of everything that is currently big, which part of it is big here?",
        "The gap between those two is often large. Regional taste has always been real — genres break in specific cities before they travel, and long after national exposure, certain records keep a hold in some places and vanish in others. Streaming was supposed to flatten that and mostly did not. City-level charts still look meaningfully different from the national picture, especially in neighborhoods with strong immigrant communities and deep local scenes.",
        "Flatbush and Ditmas Park are exactly that kind of place. Caribbean music is not a niche here, it is ambient — it comes out of car windows, storefronts, and open apartment windows in summer. A record's national rank tells you almost nothing about whether it will register on this stretch of Cortelyou Road, and a record that never charts nationally can be inescapable within ten blocks.",
        "So this slot looks for overlap rather than authority: songs with real national momentum that also have a reason to exist locally. That intersection is small, and it is the most honest description of what a neighborhood station is actually for.",
      ],
    },
  ],
  newReleases: [
    {
      tag: "Fresh Drop",
      title: "New releases built for repeat listens, not just reaction",
      summary: "Not every release deserves a slot; these feel like they could live on the station.",
      art: "editorial-music-business",
      bodyParagraphs: [
        "Almost everything new arrives on a Friday, and that is not a coincidence. Since 2015 the industry has used a coordinated global release day, moving most of the world onto Friday at midnight local time. The stated reasons were piracy and chart alignment. The practical effect is a weekly flood: a huge share of the year's music enters the world in the same few hours, competes for the same weekend attention, and is largely gone by Tuesday.",
        "That structure rewards noise and punishes patience. A record with a marketing budget can dominate Friday. A record without one can be objectively better and simply never surface, because the window in which anyone is looking is about seventy-two hours wide. Whole scenes have adapted by releasing off-cycle just to be visible.",
        "A station's job in that environment is not to keep up. Keeping up is impossible and, more to the point, it is not useful — nobody needs another list of everything that came out. The job is to be a filter with a memory: to pull the handful of records that seem likely to matter in a month and to be willing to go back for the ones that were buried on arrival.",
        "So this rail is deliberately short. Fewer picks, held longer, chosen because they sound like they could live in a rotation rather than because they landed this week. A release deserves a slot here when it has already survived the second listen.",
      ],
    },
    {
      tag: "Release Radar",
      title: "The songs worth leaving on long enough to understand",
      summary: "New music should feel like discovery rather than inventory.",
      art: "editorial-music-pulse",
      bodyParagraphs: [
        "Skip behavior is one of the more unsettling things streaming revealed about listening. A large share of plays end within the first thirty seconds, and a meaningful chunk end within five. Whatever else that measures, it means most songs are being judged on their intro alone, before a single structural idea has had time to arrive.",
        "Artists responded rationally. Intros got shorter or disappeared. Hooks moved earlier, sometimes to the very first bar. Average song length has been drifting down for years. None of this is decadence — it is a sensible adaptation to an environment where the first five seconds are the entire audition.",
        "The cost is that a specific kind of record has gotten harder to make: the one that needs ninety seconds to explain itself. Songs that establish a mood before revealing their idea, songs whose second half reframes the first, songs where the payoff is structural rather than immediate. Those records still exist and they are still frequently the best thing on an album, but they lose the audition every time.",
        "This rail exists to hold those in place a little longer. The instruction is simple and slightly countercultural: leave it on. Give a record the two minutes it was built for and a surprising number of them turn out to have been doing something the intro never advertised.",
      ],
    },
    {
      tag: "Album Cut",
      title: "The cuts that sound better once the release-cycle noise dies down",
      summary: "Fresh songs that hold up away from launch-day hype.",
      art: "editorial-artist",
      bodyParagraphs: [
        "The album is a stranger format than it looks. Its length was set by physical constraints — roughly twenty minutes a side on a twelve-inch LP, then about seventy-four minutes on a CD — and every generation of artists has written into whatever container they were handed. The result is that album sequencing became a real craft: openers, side-two starts, the deliberate dip before a closer.",
        "Streaming dissolved the container without replacing the craft. Records now arrive as playlists of themselves, sorted by play count within days, and the tracks that get front-loaded attention are the ones the label pushed. The rest are structurally invisible even to people who liked the album.",
        "That is where the interesting material tends to be. Singles are optimized for immediate legibility, so they are usually the most conventional thing an artist made that year. Deep cuts are where the odd instrumentation, the long form, the risky vocal, and the actual point of view survive — because nobody was watching that closely when they were approved.",
        "A station has an advantage here that a chart does not: it can just play track seven. This rail is for the cuts that only make sense after the launch week has gone quiet, when a record stops being a news event and goes back to being an album.",
      ],
    },
    {
      tag: "First Listen",
      title: "Immediate, cleaner than expected, and easy to put back on",
      summary: "A more human version of new-music discovery.",
      art: "editorial-rewind",
      bodyParagraphs: [
        "There is a real difference between recommendation and discovery, and most of what gets called discovery is the first one. An algorithm recommending music is running a similarity search on your history — it is very good at finding the adjacent thing and structurally incapable of finding the thing you had no reason to look for. Over time that produces a listening life with a narrowing radius.",
        "Human curation fails differently. A person picking records is biased, inconsistent, and occasionally wrong in ways no system would be. But their misses are interesting, because they come from a point of view rather than a probability. That is the whole trade: you accept a worse hit rate in exchange for the possibility of a genuine surprise.",
        "First Listen is built around that trade. The bar is not whether a record resembles what you already play. It is whether it does something on first contact — a texture that stops you, a vocal that sounds like a person rather than a format, an arrangement that goes somewhere you did not predict in bar nine.",
        "Not every pick will land, and that is the honest deal. But the ones that do tend to stay, because a record you found for yourself gets attached to a moment, and records attached to moments are the ones people still play a decade later.",
      ],
    },
  ],
  artist: [
    {
      tag: "Brooklyn Artist Watch",
      title: "The most visually alive artist in the room right now",
      summary: "Work rooted enough to feel nearby, polished enough to travel.",
      art: "editorial-artist",
      bodyParagraphs: [
        "Brooklyn has produced more distinct musical eras than most countries, and they rarely resemble each other. Bed-Stuy and Brownsville shaped a decade of rap. Williamsburg's loft scene rewrote indie rock in the early 2000s. Flatbush and East Flatbush carry one of the largest Caribbean communities outside the islands, and the soca, dancehall, and reggae that circulate here are not revival music — they are current, local, and continuous.",
        "What links those scenes is not a sound. It is a working condition: cheap-enough space, dense enough population to build an audience on foot, and proximity to an industry that will eventually come looking. When the first of those disappears, the scene relocates. That has already happened several times, which is why the borough's musical center of gravity keeps moving south and east.",
        "Artist Watch tries to catch people at the point where that geography is still audible in the work. Not artists who mention Brooklyn, but artists whose records could only have been assembled here — the specific collision of church, sound system, jazz training, and rap that a kid growing up between Church Avenue and Prospect Park absorbs without deciding to.",
        "The polish matters too, honestly. An artist has to look like someone worth opening. But the reason to watch is what happens after you press play: whether there is a place inside the record, and whether that place is one you can walk to.",
      ],
    },
    {
      tag: "Brooklyn Artist Watch",
      title: "An artist with room to travel block to block",
      summary: "A local radar rail with actual editorial intent.",
      art: "editorial-music-pulse",
      bodyParagraphs: [
        "The old path from local to national ran through a small number of gates: a college radio add, a regional retail buyer, a supportive club promoter, eventually a label. It was slow and unfair, but it had a useful property — an artist had to convince their own neighborhood first, and that early audience shaped the work.",
        "The gates are gone and the sequence inverted. It is now entirely possible to have a hundred thousand monthly listeners spread thinly across the world and no room anywhere that would sell out. Those artists exist in large numbers and their careers are precarious, because there is no local base to fall back on when the algorithm's attention moves.",
        "The artists who last still tend to build the old way, just with new tools. They play repeatedly in a few rooms until those rooms are theirs. They collaborate locally, which compounds — every feature is a small merger of two audiences within walking distance of each other. And they treat the neighborhood as a constituency rather than a backdrop.",
        "That is what this rail is scanning for: not reach, but density. An artist who can fill a room in Flatbush has something an artist with scattered streams does not, and it is usually the thing that survives the next platform shift.",
      ],
    },
    {
      tag: "Brooklyn Artist Watch",
      title: "Knows how to make a polished image feel useful",
      summary: "Artists who still sound like they know where they're from.",
      art: "editorial-station",
      bodyParagraphs: [
        "Every artist now runs a small media operation whether they want to or not — the photos, the short video, the release-day rollout, the visual identity that has to survive being cropped to a square. It is a genuine skill and it consumes time that used to go into records. Pretending otherwise is nostalgia.",
        "The useful distinction is not polished versus raw. It is whether the image is doing the same work as the music or a different job entirely. When an artist's visual language comes out of the same place the songs do — the same palette, the same references, the same specific streets — the presentation deepens the record. When it is borrowed from whatever is currently performing well, it flattens it, and listeners register the mismatch even if they cannot name it.",
        "Local artists have an advantage here that they frequently waste. Specificity is legible. A video shot on an actual block, in actual light, with people who actually live there, reads as true in a way that a rented aesthetic does not, and it costs less. The instinct to make it look like everything else is the expensive mistake.",
        "So the criterion for this slot is simple. The image should make you more curious about the record, not substitute for it, and after listening you should feel like the two came from the same person.",
      ],
    },
  ],
  ditmas: [
    {
      tag: "Neighborhood",
      title: "Avenue coffee lines, stoop chatter, and the early pulse on Cortelyou",
      summary: "The neighborhood is at its best when small routines become shared atmosphere.",
      art: "editorial-ditmas-neighborhood",
      bodyParagraphs: [
        "Cortelyou Road runs east-west through the middle of a neighborhood that was designed, unusually for New York, as a suburb. In the years around 1900 developers laid out Prospect Park South and the blocks near it as a planned community of freestanding wood-frame houses with lawns and porches — Dean Alvord's Prospect Park South is the best known — marketed to Manhattan professionals who could reach the city by train.",
        "That original plan is why the streets still feel the way they do. Detached houses on generous lots, mature trees meeting overhead, and porches set close enough to the sidewalk that a conversation can happen without anyone getting up. Much of it is protected — the Ditmas Park and Prospect Park South historic districts were designated in the early 1980s, which is a large part of why the housing stock survived a century of pressure to replace it.",
        "The commercial strip is the counterweight. Cortelyou near the Q station is dense, Caribbean- and immigrant-owned in large part, and busiest in the two windows that bracket the workday. Morning is a line of people who see each other every day without necessarily knowing each other's names. Evening is slower and louder, with the sidewalk doing the work a plaza would do somewhere else.",
        "That combination — porch-scale residential blocks feeding one busy avenue — produces a specific kind of daily texture. It is not events. It is recognition, repeated, which is the raw material a neighborhood station is actually made of.",
      ],
    },
    {
      tag: "Community Board",
      title: "The week ahead in Ditmas Park feels especially full of local energy",
      summary: "School events, live sets, and sidewalk conversations that spill into the evening.",
      art: "editorial-public-space",
      bodyParagraphs: [
        "Ditmas Park sits in Brooklyn Community District 14, served by Community Board 14, which covers Flatbush, Midwood, and the surrounding blocks. Community boards are advisory rather than binding, but they are where land use, liquor licenses, street changes, and budget priorities get argued in public first, and their meetings are open to anyone who shows up.",
        "That is a genuinely underused piece of local infrastructure. Most decisions that visibly change a neighborhood — a curb cut, a rezoning, whether a stretch of street gets closed to cars on Sundays — pass through a room that is rarely full. The people who do attend end up with disproportionate influence, not through any conspiracy but through attendance.",
        "The rest of the week's calendar comes from a small number of reliable institutions: the public schools and their fundraisers, the libraries, a handful of churches with active programs, the greenmarket, and whichever bars and restaurants on Cortelyou are booking live music that month. It is not a large list, and that is exactly what makes it followable.",
        "So the aim of this rail is relevance rather than volume. Five things worth knowing beats forty things scraped from a listings feed, because a neighborhood calendar is only useful if a person can actually hold it in their head.",
      ],
    },
    {
      tag: "Street Rhythm",
      title: "What people are talking about between Stratford and Marlborough",
      summary: "Transit timing, store windows, and neighborhood plans shape the mood before breakfast ends.",
      art: "editorial-ditmas-neighborhood",
      bodyParagraphs: [
        "The named streets that cross Cortelyou — Stratford, Westminster, Argyle, Rugby, Marlborough — are a leftover of the original marketing. Developers gave the blocks English place names to signal a certain kind of respectability to buyers arriving from Manhattan. The names stuck long after the pitch stopped mattering, and they are now one of the clearest ways to tell where you are without looking at a sign.",
        "The daily rhythm here is organized around the Q. The Cortelyou Road station sits on the old Brighton Line, which has been carrying people between this area and downtown Brooklyn since the nineteenth century, first as a steam railroad to Coney Island. Almost everything about the avenue's timing — when the coffee line forms, when the sidewalk fills again, which stores stay open late — is downstream of that train's schedule.",
        "What people actually talk about tends to be the friction points: service changes, a storefront that has been papered over for months, whether a new place is going to be good, and rent. Those conversations are the neighborhood's real information network, and they move faster and more accurately than any official channel.",
        "Local media works best when it takes that seriously — treating the emotional weather of a place as reportable, not just the facts that happen to have a press release attached.",
      ],
    },
    {
      tag: "Local Voices",
      title: "Neighbors keep asking for more shared cultural space",
      summary: "Playlist calls, events, and shout-outs are becoming part of the local rhythm.",
      art: "editorial-station",
      bodyParagraphs: [
        "The request that comes up most often is not for another venue. It is for somewhere to be that does not require spending money. Brooklyn has a lot of commercial third places and comparatively few free ones, and the difference matters most for teenagers, older residents, and anyone whose apartment is too small to host in.",
        "The existing free infrastructure is better than people assume and thinner than it should be. Branch libraries do enormous work as de facto community centers — programming, meeting rooms, air conditioning, wifi, and a staff that knows the neighborhood. Parks and schoolyards carry the rest. When any one of those loses hours or funding, the gap shows up immediately in who is on the street and where.",
        "Radio occupies an odd position in that ecology. It is not a room, but it functions like one: something shared, free at the point of use, that different people encounter at the same time. That is most of what a public space actually does, minus the walls, which is why community stations have historically clustered in neighborhoods with strong local identity and limited institutional coverage.",
        "So the loop this station is trying to build is straightforward. Neighbors send playlists, requests, and shout-outs; those go out over the air; and the neighborhood hears its own taste played back to it. That exchange is small, but it is the difference between broadcasting at a place and broadcasting from one.",
      ],
    },
  ],
  brooklyn: [
    {
      tag: "Featured Event",
      title: "Tonight's borough calendar leans intimate, local, and low-friction",
      summary: "Small rooms and neighborhood stages are carrying the city's best energy right now.",
      art: "editorial-brooklyn-culture",
      bodyParagraphs: [
        "Brooklyn's live music economy is unusually bottom-heavy. There are a few large rooms — Barclays Center, Kings Theatre in Flatbush, the amphitheater at Coney Island — and then a long tail of spaces holding somewhere between fifty and six hundred people. Almost all of the borough's actual musical life happens in that tail, and almost none of it gets covered.",
        "Small rooms are also where the economics are hardest. A venue that size runs on thin margins, depends on bar sales rather than tickets, and is acutely vulnerable to rent increases and residential development next door. The list of Brooklyn venues that have closed in the last fifteen years is long enough that scene histories now get organized around which room you came up in.",
        "What those spaces offer in exchange is the thing large venues structurally cannot: proximity. You can hear an unamplified voice. You can talk to the person who booked the night. An artist can try something that has not worked yet, in front of two hundred people, and adjust. Every performer who eventually fills a big room learned how in a small one.",
        "So a featured pick here is not chosen by size. It is chosen by whether showing up would actually be worth the trip — a real room, a real bill, and a night you could not have had at home.",
      ],
    },
    {
      tag: "Brooklyn Notes",
      title: "What feels worth crossing the parkway for this week",
      summary: "A short list of happenings aligned with the station's taste and pace.",
      art: "editorial-public-space",
      bodyParagraphs: [
        "Brooklyn is roughly seventy square miles and about two and a half million people — larger than most American cities on its own, and organized as a set of neighborhoods that do not always feel connected. Getting from Ditmas Park to Greenpoint can take longer than getting to Manhattan, which is why borough-wide recommendation lists tend to be less useful than they look.",
        "The subway map explains most of it. The lines run overwhelmingly north-south, funneling toward Manhattan, because that is the geometry they were built for a century ago. Crosstown travel within Brooklyn is the weak link, historically handled by buses. That is exactly the gap newer crosstown service has been aimed at, and it is why a show three miles east can feel further away than one across the river.",
        "So distance is a real editorial factor, not a footnote. A recommendation that ignores travel time is an aspirational list rather than a usable one, and most people quietly stop reading those.",
        "The filter for this rail is therefore practical: is it good, and is it reachable on a weeknight without the trip becoming the main event? A short list that passes both tests is worth more than a comprehensive calendar nobody acts on.",
      ],
    },
    {
      tag: "Community Culture",
      title: "Brooklyn's best public moments still happen at human scale",
      summary: "Often it's not the biggest event that sticks — it's the one closest to home.",
      art: "editorial-brooklyn-culture",
      bodyParagraphs: [
        "The borough's most durable cultural traditions were mostly not planned by institutions. The West Indian American Day Carnival on Eastern Parkway grew out of Harlem gatherings before moving to Brooklyn in the 1960s, and it now draws crowds on a scale few official events reach. It runs on mas camps, sound systems, and a year of volunteer labor spread across Flatbush, Crown Heights, and East Flatbush.",
        "The same pattern repeats at smaller scale all over the borough — block parties, church concerts, park drum circles, sound systems set up on a sidewalk in August. These are self-organized, locally funded, and largely invisible to anyone looking at an official calendar, which is precisely why they carry more weight with the people who attend them.",
        "Institutions matter too, and Brooklyn has serious ones. But the relationship works best when the institution is porous — when the museum's late nights or the library's programming pull in the same people who would be on the block anyway, rather than importing a separate audience for the evening.",
        "That is the instinct behind this rail. The measure of a public moment is not attendance. It is whether the people there would describe it as theirs.",
      ],
    },
    {
      tag: "Weekend Ahead",
      title: "The event mix is strongest when music and neighborhood life overlap",
      summary: "Markets, park gatherings, and sets with personality are what people remember.",
      art: "editorial-public-space",
      bodyParagraphs: [
        "Prospect Park is the organizing fact of a Brooklyn weekend for a large part of the borough. Olmsted and Vaux designed it after Central Park and generally considered it the better of the two — they had more room to work and fewer compromises forced on the plan. Its five hundred-odd acres sit within walking distance of Ditmas Park, Flatbush, Park Slope, Windsor Terrace, and Crown Heights, which is why it functions as the borough's shared backyard rather than any one neighborhood's.",
        "That geography produces a specific weekend shape. The park absorbs the daytime — drum circles near the Nethermead, barbecues on the east side, the greenmarket at Grand Army Plaza on Saturdays, joggers and cyclists on the loop from early morning. Then it empties into the surrounding avenues in the evening, and the bars and small rooms pick up the same crowd a few hours later.",
        "The best weekend planning follows that flow instead of fighting it. Something outdoors and free in the daylight, something with a roof and a soundtrack after dark, ideally within a mile of each other. That sequence is why an afternoon in the park followed by a set on Cortelyou feels like one day rather than two errands.",
        "Which is the real criterion for this rail: not the biggest thing happening, but the combination that would make a Saturday feel like it belonged to the neighborhood.",
      ],
    },
  ],
  weekend: [
    {
      tag: "Weekend Pick",
      title: "A low-friction night out that still feels worth leaving home for",
      summary: "A small room, a good crowd, and enough atmosphere to make the trip count.",
      art: "editorial-brooklyn-culture",
      bodyParagraphs: [
        "The hardest part of a night out is not the night. It is the decision. Anyone who has spent forty minutes scrolling listings and then stayed in knows the failure mode: too many options, none of them clearly better, and the cost of choosing wrong feels higher than the cost of not going. Psychologists have a tidy name for it — more choice reliably produces more deliberation and, past a point, less satisfaction with whatever gets picked.",
        "Recommendation is mostly a defense against that. A good pick is not necessarily the best available event; it is the one specific enough to act on. One room, one time, one reason, no comparison shopping required. That is why a short list from someone whose taste you have calibrated beats a comprehensive calendar every time.",
        "Friction is the other half. Every additional step between the couch and the door — a transfer, an advance ticket, a dress code, an unclear start time — measurably reduces the odds anyone goes. The picks that succeed are usually the ones where the answer to how do I get there is one sentence long.",
        "So the standard here is narrow on purpose: close enough to reach without planning, good enough that the trip pays for itself, and described clearly enough that you can decide in about ten seconds.",
      ],
    },
    {
      tag: "Weekend Pick",
      title: "One borough plan that feels social without feeling overpacked",
      summary: "A cultural pick with the station's pacing and mood in mind.",
      art: "editorial-public-space",
      bodyParagraphs: [
        "There is a difference between an event you attend and an event you can arrive at. The first has a start time, an implied commitment, and a social cost if you leave early. The second is ongoing — a market, an outdoor set, a long afternoon in a park — and you can join it for twenty minutes or four hours without anyone tracking which.",
        "Open-ended gatherings do something structured ones cannot: they let unplanned conversation happen. That is most of what people are actually looking for when they go out. The reason the greenmarket, the park, and the block party keep outperforming ticketed programming as social experiences is that none of them require you to sit facing forward in silence.",
        "This also makes them easier to say yes to. An event with no fixed end has almost no downside — if it is not working you leave, and nobody registers it. The perceived risk of committing an evening is what kills most plans before they start.",
        "So this pick leans toward the joinable: something with a wide window, a low floor, and enough happening that showing up alone is comfortable. Those are the plans people remember, mostly because they are the ones people actually keep.",
      ],
    },
    {
      tag: "Weekend Pick",
      title: "A music-first pick that still leaves room for the rest of the day",
      summary: "A recommendation designed around real life, not a full-day commitment.",
      art: "editorial-music-pulse",
      bodyParagraphs: [
        "Most people's weekends are not empty. There is laundry, someone's kid, a shift, a family obligation, and a genuine need to do nothing for a couple of hours. Recommendations written as though the reader has an unclaimed twelve-hour block are the main reason event coverage gets ignored — the advice is fine and the premise is wrong.",
        "Music has an advantage here because it scales down cleanly. A set is ninety minutes. An outdoor performance can be caught in the middle. A record store listening session takes as long as you give it. Almost nothing about live music requires the whole day unless the format insists on it, which is largely a festival problem rather than a music problem.",
        "The picks that work, then, are the ones with a clear shape and a defined end. Doors at eight, done by eleven. Two sets in a park between three and five. Something you could put after an ordinary afternoon without rearranging anything, which means it competes with staying home instead of competing with your entire schedule.",
        "That is the design constraint for this slot: music first, but sized for a real weekend. The recommendation you can actually take is worth more than the one you would have loved in a different life.",
      ],
    },
  ],
  nowSpinning: [
    {
      tag: "Fresh Drop",
      title: "New releases built for repeat listens, not reaction",
      summary: "Selective by design — playable and memorable.",
      art: "editorial-music-pulse",
      bodyParagraphs: [
        "Something on the order of a hundred thousand tracks are now uploaded to streaming services every day. Whatever the exact figure this quarter, the shape of it is not in dispute: no human being, no editorial team, and no station can hear even a rounding error of what gets released. Comprehensiveness stopped being an option some time ago.",
        "That changes what a music page is for. When supply was limited, the value was access — telling you a record existed. When supply is effectively infinite, the value is refusal. The useful service is not the list of everything; it is a small number of picks from someone willing to leave things out and be accountable for the choice.",
        "The criterion this rail uses is playability rather than novelty. Could this record actually live in a rotation? Does it survive being followed by something twenty years older? Is there a second listen in it, or was the whole idea audible the first time? Those questions eliminate most of a given week, which is the point.",
        "What is left is short, and short is the feature. A handful of new records chosen because they earned it beats a scroll of everything that happened to come out, and it is the only version of new-music coverage that respects a listener's time.",
      ],
    },
    {
      tag: "Throwback",
      title: "Vote: which rewind should hit the station harder today?",
      summary: "A little memory, a little participation.",
      art: "editorial-rewind",
      bodyParagraphs: [
        "Musical memory is not evenly distributed across a life. The songs people bond most strongly to cluster around adolescence and early adulthood — researchers call the effect the reminiscence bump, and it shows up consistently: the music you heard between roughly twelve and twenty-two stays more vivid, and more emotionally charged, than anything you encounter later.",
        "The reasons are partly neurological and partly social. Those years involve a dense run of first experiences, and memory encodes novelty strongly. They are also the period when taste becomes identity — what you listen to is how you signal who you are and who you are with. A song absorbed under those conditions gets filed with the people and places attached to it, which is why hearing it again returns more than the melody.",
        "Radio has always used this deliberately, and it can be used cynically. Nostalgia programming that treats the past as a comfort product flattens everything into the same warm blur. The alternative is to treat old records as records — played because they are good, in sequence with new music, without the audio equivalent of a sepia filter.",
        "A vote is the honest version of that. It puts the choice with the people who carry the memory, and it turns a rewind into something the room decided rather than something the station imposed.",
      ],
    },
    {
      tag: "Decade Favorite",
      title: "90s favorites that still carry a whole room",
      summary: "The records that remain instantly communal.",
      art: "editorial-rewind",
      bodyParagraphs: [
        "Decades are a convenient lie and a useful one. Nothing changed on January 1, 1990, and the music people file under the nineties actually spans several distinct movements that had little to do with each other — the sampling era in hip-hop, a golden run in R&B, house and jungle developing on separate tracks, and guitar music going briefly mainstream and then not.",
        "What those scenes did share was a technological moment. Samplers had become affordable but storage was still expensive, which forced short loops and hard choices. Recording was mostly still analog or hybrid. And crucially, sample clearance law had just tightened after the early-nineties court decisions, so the free-for-all collage of the late eighties gave way to fewer, more deliberate, more cleared sources. You can hear that constraint in the records.",
        "Constraint is a decent explanation for why so much of it still works in a room. Limited tracks meant arrangements had to be decisive. Expensive studio time meant songs got finished. And the dominance of the dancefloor and the radio single meant records were tested in public before they were released, rather than optimized in private against a chart model.",
        "So a decade rail is not a nostalgia bin. It is a way of organizing memory without flattening it — playing records that were built under different rules, and noticing which of those rules produced something we lost.",
      ],
    },
  ],
  history: [
    {
      tag: "Daily Fact",
      title: "Radio DJs once broke records block by block before charts caught up",
      summary: "Local stations moved songs through neighborhoods long before national momentum formed.",
      art: "editorial-station",
      bodyParagraphs: [
        "For most of the twentieth century a hit was assembled city by city. A record would be worked in one market, then another, and national success meant a long sequence of local decisions made by individual disc jockeys who could simply choose to play something. That power was real enough that the industry built an entire shadow economy around influencing it.",
        "Which is what the payola hearings were about. In 1959 and 1960 Congress investigated undisclosed payments to DJs for airplay, and the fallout ended Alan Freed's career while leaving the broader practice intact in modified form. The lasting consequence was structural: programming authority moved away from individual DJs and toward program directors and, eventually, consultants and centralized playlists.",
        "The trade was consistency for surprise. Tight formats made stations more predictable and more sellable, and they made it dramatically harder for a single person's enthusiasm to move a record. By the time consolidation accelerated in the late nineties, a large share of American commercial radio was running playlists set well above the level of the local station.",
        "Which is why the older model is worth remembering rather than romanticizing. It was corruptible and it was arbitrary. It was also the last arrangement in which a neighborhood's taste could travel outward on its own strength, and that is the part community radio is still trying to hold onto.",
      ],
    },
    {
      tag: "Daily Fact",
      title: "Neighborhood record stores used to work like live editorial feeds",
      summary: "New arrivals, staff picks, and requests created a real-time cultural signal.",
      art: "editorial-rewind",
      bodyParagraphs: [
        "Before there was any way to measure listening, the record store counter was the measurement. Shop staff knew what had come in, what was moving, what people were asking for by humming it, and what had been returned. Labels sent promo copies to specific stores precisely because those staff were the fastest available signal about whether something was working.",
        "That signal was local by construction. A store in Flatbush and a store in Bay Ridge would report different weeks, and both were correct. The information was also two-way: a customer walked in with a question and walked out with a recommendation, which meant taste was transmitted in conversation rather than inferred from behavior.",
        "The infrastructure that formalized this was retail reporting — a network of stores whose sales were used to build charts, which was accurate in principle and gameable in practice until barcode scanning replaced it in the early nineties. That shift made the numbers honest and quietly deleted the human layer that had been generating the context around them.",
        "Cortelyou Road Radio borrows the older idea rather than the older technology. Selection with a point of view, made by people who are actually in the neighborhood, offered as a recommendation rather than a ranking. It is a smaller signal than a chart and a considerably more specific one.",
      ],
    },
  ],
};

const briefing = {
  intro: "Today starts with live radio up front, neighborhood notes in the middle, and a few reasons to step out before the day hardens into routine.",
  bullets: [
    ["Music", "the mood stays warm, rhythmic, and listener-first."],
    ["Ditmas Park", "keep an eye on local conversations, storefronts, and community buzz."],
    ["Brooklyn", "there's enough happening tonight to make checking back worth it."],
    ["Station note", "we're looking for playlists from neighbors, shops, and local institutions."],
  ],
};

const fallbackRecent = [
  ["Young and Alive", "Bazzi"], ["Thank You", "Dido"],
  ["Redbone", "Childish Gambino"], ["Consider Me", "Allen Stone"], ["Underdog", "Alicia Keys"],
];

/* ---------- Daily rotation + live override ---------- */
const liveMeta = { generatedAt: null, livePools: new Set() };

async function loadLiveContent() {
  try {
    const res = await fetch("./content.json", { cache: "no-store" });
    if (!res.ok) return;
    const live = await res.json();
    Object.keys(live).forEach((k) => {
      if (Array.isArray(live[k]) && live[k].length) {
        pools[k] = live[k];
        liveMeta.livePools.add(k);
      }
    });
    liveMeta.generatedAt = live.generatedAt || null;
  } catch (e) { /* keep built-in pools */ }
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
function dayOffset() {
  return todayKey().split("-").reduce((s, n) => s + Number(n), 0);
}

/**
 * The pool a section actually renders from.
 *
 * Live pools (rebuilt from the feeds every morning) are shown newest-first and
 * as-is — they already turn over daily, so rotating them would only bury the
 * freshest story. The built-in editorial pools are evergreen and never change
 * on their own, so those still rotate by date to keep the page from looking
 * identical two days running.
 */
function poolFor(poolName) {
  const pool = pools[poolName] || [];
  if (!liveMeta.livePools.has(poolName)) return { list: pool, rotate: true };
  const fresh = pool.filter((it) => !isStale(it));
  // Only drop stale items when enough fresh ones remain to fill the rail.
  return { list: fresh.length >= Math.min(3, pool.length) ? fresh : pool, rotate: false };
}

function itemAt(poolName, index) {
  const { list, rotate } = poolFor(poolName);
  if (!list.length) return null;
  const i = rotate
    ? (((dayOffset() + index) % list.length) + list.length) % list.length
    : index % list.length;
  const it = list[i];
  return { ...it, poolName, index, artSrc: it.image?.src || ART(it.art || "editorial-station"), artAlt: it.image?.alt || it.title, artCredit: it.image?.credit || null };
}

function storyHref(poolName, index) {
  return `./story.html?section=${encodeURIComponent(poolName)}&index=${index}`;
}

/* ---------- Dates ----------
   Every card carries a dateline. It is the cheapest possible signal that the
   page is alive, and without it a reader has no way to tell today's rail from
   one that quietly stopped updating three weeks ago. Recent items read as
   "2h ago" so the freshness is unmissable; older ones get a real date. */
const MINUTE = 60000, HOUR = 3600000, DAY = 86400000;

function parseWhen(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function relativeDate(value) {
  const d = parseWhen(value);
  if (!d) return "";
  const diff = Date.now() - d.getTime();
  if (diff < 0) return absoluteDate(value);
  if (diff < 45 * MINUTE) {
    const m = Math.max(1, Math.round(diff / MINUTE));
    return `${m}m ago`;
  }
  if (diff < 22 * HOUR) return `${Math.round(diff / HOUR)}h ago`;
  if (diff < 2 * DAY) return "Yesterday";
  if (diff < 7 * DAY) return `${Math.round(diff / DAY)} days ago`;
  return absoluteDate(value);
}

function absoluteDate(value) {
  const d = parseWhen(value);
  if (!d) return "";
  const sameYear = d.getFullYear() === new Date().getFullYear();
  return d.toLocaleDateString("en-US", sameYear
    ? { month: "short", day: "numeric" }
    : { month: "short", day: "numeric", year: "numeric" });
}

/** True when an item is old enough that showing it undated would mislead. */
function isStale(item, maxDays = 30) {
  const d = parseWhen(item && item.publishedAt);
  return d ? Date.now() - d.getTime() > maxDays * DAY : false;
}

/* ---------- Card rendering ---------- */
function dateHTML(item) {
  const when = item.publishedAt;
  if (!when) return "";
  const d = parseWhen(when);
  if (!d) return "";
  const fresh = Date.now() - d.getTime() < 2 * DAY ? " is-fresh" : "";
  return `<time class="c-date${fresh}" datetime="${d.toISOString()}" title="${d.toLocaleString("en-US")}">${relativeDate(when)}</time>`;
}
function metaLine(item) {
  const via = item.source ? ` <span class="c-via">via ${item.source}</span>` : "";
  return `<div class="c-tag">${item.tag}${via}${dateHTML(item)}</div>`;
}
function thumbHTML(item) {
  const cred = item.artCredit ? `<span class="c-credit">${item.artCredit}</span>` : "";
  // Outlet CDNs occasionally 404 an old thumbnail. Swap in station artwork
  // rather than leaving a broken frame in the middle of the grid.
  const fallback = ART("editorial-station");
  const onerr = `this.onerror=null;this.src='${fallback}';this.closest('.c-thumb').classList.add('is-fallback')`;
  return `<div class="c-thumb"><img src="${item.artSrc}" alt="${item.artAlt}" loading="lazy" decoding="async" onerror="${onerr}" />${cred}</div>`;
}
function cardHTML(item, variant) {
  const href = item.externalUrl || storyHref(item.poolName, item.index);
  const ext = item.externalUrl ? 'target="_blank" rel="noreferrer"' : "";
  if (variant === "story") {
    return `<a class="c-story" href="${href}" ${ext}>${metaLine(item)}<h4>${item.title}</h4><p>${item.summary}</p></a>`;
  }
  if (variant === "mini") {
    return `<a class="c-mini" href="${href}" ${ext}>${thumbHTML(item)}<div>${metaLine(item)}<h4>${item.title}</h4></div></a>`;
  }
  const feat = variant === "feature" ? " c-feature" : "";
  return `<a class="c-card${feat}" href="${href}" ${ext}>${thumbHTML(item)}<div class="c-body">${metaLine(item)}<h3>${item.title}</h3><p>${item.summary}</p></div></a>`;
}

function renderPools() {
  document.querySelectorAll("[data-pool]").forEach((el) => {
    const name = el.dataset.pool;
    const count = Number(el.dataset.count || 1);
    const offset = Number(el.dataset.offset || 0);
    const variant = el.dataset.variant || "card";
    let html = "";
    for (let i = 0; i < count; i += 1) {
      const item = itemAt(name, offset + i);
      if (item) html += cardHTML(item, variant);
    }
    el.innerHTML = html;
  });
}

function renderBriefing() {
  const el = document.getElementById("briefing");
  if (!el) return;
  el.innerHTML = `<p style="color:var(--muted);margin-bottom:12px">${briefing.intro}</p>` +
    briefing.bullets.map(([k, v]) => `<p style="margin-bottom:6px"><strong style="color:var(--text)">${k}:</strong> <span style="color:var(--muted)">${v}</span></p>`).join("");
}

/* ---------- Live player ---------- */
const PROMO = /cortelyouroadradio|cortelyou road radio|crradio|dot com|\bid\b|stager|stinger|sweeper|jingle|liner|promo|samhsa|psa/i;
const isPromo = (t) => !t || PROMO.test(t);
function splitTrack(raw) {
  const t = String(raw || "").replace(/\s+/g, " ").trim();
  const i = t.indexOf(" - ");
  return i === -1 ? { artist: "", title: t } : { artist: t.slice(0, i).trim(), title: t.slice(i + 3).trim() };
}

const audio = document.getElementById("radioStream");
let playing = false;

function setPlaying(on) {
  playing = on;
  document.querySelectorAll(".js-listen-label").forEach((s) => { s.textContent = on ? "Pause" : "Listen Live"; });
  document.querySelectorAll(".eq").forEach((e) => e.classList.toggle("paused", !on));
  const st = document.getElementById("stickyStatus");
  if (st) st.textContent = on ? "Playing" : "Paused";
  const sp = document.getElementById("stickyPlayer");
  if (sp) sp.hidden = false;
}

async function togglePlay() {
  if (!audio) return;
  if (playing) { audio.pause(); return; }
  try { await audio.play(); } catch (e) { setPlaying(false); }
}

async function fetchMeta() {
  try {
    const res = await fetch(RADIO_STATUS, { mode: "cors" });
    if (!res.ok) throw new Error("meta");
    const data = await res.json();
    const raw = data.current_track?.title || "";
    const cur = isPromo(raw) ? { title: "Live on Cortelyou", artist: "Cortelyou Road Radio" } : splitTrack(raw);
    setText("npTitle", cur.title); setText("npArtist", cur.artist);
    setText("stickyTitle", cur.title); setText("stickyArtist", cur.artist);
    setText("heroNow", cur.artist ? `${cur.title} — ${cur.artist}` : cur.title);

    const hist = (data.history || [])
      .map((t) => t.title)
      .filter((raw) => !isPromo(raw))
      .map(splitTrack)
      .slice(0, 5);
    renderRecent(hist.length ? hist.map((t) => [t.title, t.artist]) : fallbackRecent);
  } catch (e) {
    renderRecent(fallbackRecent);
  }
}

function renderRecent(list) {
  const el = document.getElementById("recentList");
  if (!el) return;
  el.innerHTML = list.map(([title, artist]) => `<li><b>${title}</b><span>${artist || "On air"}</span></li>`).join("");
}

function setText(id, txt) { const el = document.getElementById(id); if (el && txt != null) el.textContent = txt; }
function setHTML(id, html) { const el = document.getElementById(id); if (el) el.innerHTML = html; }

/* ---------- Story page ---------- */
// A story's text can arrive three ways:
//   1. bodyParagraphs: []   - preferred; written or assembled as real paragraphs
//   2. body with blank-line breaks - hand-written multi-paragraph string
//   3. body as one blob     - legacy / thin RSS snippet
// This normalizes all three into an array of paragraphs.
function storyParagraphs(item) {
  if (Array.isArray(item.bodyParagraphs) && item.bodyParagraphs.length) {
    return item.bodyParagraphs.map((p) => String(p).trim()).filter(Boolean);
  }
  const raw = String(item.body || item.summary || "").trim();
  if (!raw) return [];
  const split = raw.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return split.length ? split : [raw];
}

function renderStory() {
  const p = new URLSearchParams(location.search);
  const name = p.get("section") || "music";
  const index = Number(p.get("index") || 0);
  // Use the same daily rotation the cards use, so a card always opens its own story.
  const item = itemAt(name, index);
  if (!item) return;
  const src = item.image?.src || ART(item.art || "editorial-station");
  setHTML("storyHero", `<img src="${src}" alt="${item.image?.alt || item.title}" />`);
  setText("storyTag", item.tag);
  // Datestamp the story itself, so a shared link is never undated.
  const tagEl = document.getElementById("storyTag");
  if (tagEl) {
    const old = tagEl.parentElement && tagEl.parentElement.querySelector(".c-date");
    if (old) old.remove();
    if (item.publishedAt) tagEl.insertAdjacentHTML("afterend", dateHTML(item));
  }
  setText("storyTitle", item.title);
  document.title = `${item.title} | Cortelyou Road Radio`;
  setText("storyDeck", item.summary);
  const credit = item.source
    ? `<p class="a-credit">Reporting by ${item.sourceUrl ? `<a href="${item.sourceUrl}" target="_blank" rel="noreferrer">${item.source}</a>` : item.source}. Summary written by Cortelyou Road Radio.</p>`
    : "";
  const photoCredit = item.image?.credit ? `<p class="a-credit">Photo: ${item.image.credit}.</p>` : "";

  // Body: stories are written (or assembled) as multiple paragraphs so a page
  // is a real 30-60 second read instead of a single orphan sentence.
  const paras = storyParagraphs(item);
  const bodyHTML = paras.map((p) => `<p>${p}</p>`).join("");

  // Reading time + share row + related stories keep readers on the page.
  const words = paras.join(" ").split(/\s+/).filter(Boolean).length;
  const secs = Math.max(15, Math.round((words / 230) * 60));
  setText("storyRead", secs < 60 ? `${secs} sec read` : `${Math.round(secs / 60)} min read`);

  const share = shareHTML(location.href, `${item.title} — Cortelyou Road Radio`);
  setHTML("storyBody", `${bodyHTML}${credit}${photoCredit}${share}`);

  // Related: other items from the same pool.
  const rel = document.getElementById("storyRelated");
  if (rel) {
    const out = [];
    for (let i = 1; i <= 3; i++) {
      const other = itemAt(name, index + i);
      if (other && other.title !== item.title) out.push(cardHTML(other, "card"));
    }
    rel.innerHTML = out.join("");
  }
  setupReveal();
}

/* ============================================================
   Today in Music History
   ============================================================ */
let HISTORY = null;

function histKey(d) {
  const dt = d || new Date();
  return String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
}
function histLongDate(key) {
  const M = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const [m, d] = key.split("-").map(Number);
  return M[m - 1] + " " + d;
}
async function loadHistory() {
  if (HISTORY) return HISTORY;
  const res = await fetch("./music-history.json", { cache: "no-cache" });
  HISTORY = await res.json();
  return HISTORY;
}
function histEntry(key) {
  if (!HISTORY || !HISTORY.calendar) return null;
  return HISTORY.calendar[key] || null;
}

/* --- Cinematic animated artwork: every entry gets its own scene --- */
function histHue(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  return h;
}
function histStill() {
  return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function histArt(theme, seed) {
  const s = seed || theme || "crr";
  const h = histHue(s);
  const u = "x" + Math.abs((h * 7919) % 99991).toString(36) + (s.length % 89).toString(36) + (s.charCodeAt(0) % 61).toString(36);
  const P  = `hsl(${h},88%,64%)`;
  const P2 = `hsl(${h},70%,44%)`;
  const S  = `hsl(${(h + 40) % 360},92%,58%)`;
  const D  = `hsl(${(h + 14) % 360},58%,13%)`;
  const EM = "#ff4d2b";
  const still = histStill();
  const AN = (x) => (still ? "" : x);
  const spin = (dur, cx, cy) => AN(`<animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="${dur}s" repeatCount="indefinite"/>`);
  const pulse = (attr, a, b, dur, begin) => AN(`<animate attributeName="${attr}" values="${a};${b};${a}" dur="${dur}s" begin="${begin || 0}s" repeatCount="indefinite"/>`);

  // equalizer bars used by several scenes
  const eqBars = (x0, y0, n, w, gap, maxH) =>
    Array.from({ length: n }, (_, i) => {
      const lo = 14 + ((i * 37) % Math.max(18, maxH - 30));
      const hi = 30 + ((i * 61) % maxH);
      const c = i % 4 === 0 ? EM : (i % 3 === 0 ? S : P);
      return `<rect x="${x0 + i * (w + gap)}" y="${y0 - lo}" width="${w}" height="${lo}" rx="${w / 2}" fill="${c}" opacity=".9">
        ${AN(`<animate attributeName="height" values="${lo};${hi};${Math.round(hi * 0.45)};${lo}" dur="${(1.1 + (i % 5) * 0.19).toFixed(2)}s" repeatCount="indefinite"/>`)}
        ${AN(`<animate attributeName="y" values="${y0 - lo};${y0 - hi};${y0 - Math.round(hi * 0.45)};${y0 - lo}" dur="${(1.1 + (i % 5) * 0.19).toFixed(2)}s" repeatCount="indefinite"/>`)}
      </rect>`;
    }).join("");

  const grooves = Array.from({ length: 13 }, (_, i) =>
    `<circle r="${68 + i * 7}" fill="none" stroke="#fff" stroke-opacity="${0.05 + (i % 3) * 0.018}" stroke-width="1"/>`).join("");

  const SCENES = {
    /* Spinning record with tonearm and a specular light sweep */
    vinyl: `
      <g transform="translate(430,258)">
        <ellipse cx="0" cy="186" rx="196" ry="20" fill="#000" opacity=".5"/>
        <circle r="176" fill="#0a0908" stroke="${P}" stroke-opacity=".22"/>
        <g>${spin(7, 0, 0)}
          <circle r="168" fill="#131111"/>
          ${grooves}
          <circle r="54" fill="${EM}"/>
          <path d="M-54 0 A54 54 0 0 1 54 0 Z" fill="#fff" opacity=".10"/>
          <circle r="7" fill="#070605"/>
          <rect x="-2" y="-168" width="4" height="26" fill="#fff" opacity=".18"/>
        </g>
        <path d="M-176 -40 A176 176 0 0 1 40 -172" fill="none" stroke="url(#sh${u})" stroke-width="34" opacity=".5">
          ${pulse("opacity", ".18", ".55", 3.6)}
        </path>
      </g>
      <g transform="translate(742,96)">
        <g>${AN(`<animateTransform attributeName="transform" attributeType="XML" type="rotate" values="-6;2;-6" dur="9s" repeatCount="indefinite"/>`)}
          <rect x="-9" y="-9" width="18" height="18" rx="4" fill="${P2}"/>
          <rect x="-4" y="0" width="8" height="212" rx="4" fill="#c9c2b8"/>
          <rect x="-16" y="206" width="32" height="24" rx="6" fill="${S}"/>
        </g>
      </g>`,

    /* DJ setup: platter, tonearm, moving crossfader */
    turntable: `
      <rect x="120" y="120" width="660" height="290" rx="22" fill="#111010" stroke="${P}" stroke-opacity=".2"/>
      <g transform="translate(320,266)">
        <circle r="118" fill="#0b0a09" stroke="${P}" stroke-opacity=".3"/>
        <g>${spin(4.5, 0, 0)}
          <circle r="110" fill="#161313"/>${grooves}
          <circle r="34" fill="${EM}"/><circle r="5" fill="#070605"/>
          <rect x="-1.5" y="-110" width="3" height="20" fill="#fff" opacity=".2"/>
        </g>
      </g>
      ${Array.from({length:12},(_,i)=>`<circle cx="${320+112*Math.cos(i*Math.PI/6)}" cy="${266+112*Math.sin(i*Math.PI/6)}" r="2.4" fill="${S}" opacity=".8"/>`).join("")}
      <g transform="translate(452,168)">
        <g>${AN(`<animateTransform attributeName="transform" attributeType="XML" type="rotate" values="14;24;14" dur="3.2s" repeatCount="indefinite"/>`)}
          <circle r="11" fill="${P2}"/><rect x="-3" y="0" width="6" height="150" rx="3" fill="#cfc8be"/>
          <rect x="-11" y="146" width="22" height="18" rx="5" fill="${EM}"/>
        </g>
      </g>
      <rect x="560" y="180" width="180" height="180" rx="12" fill="#0d0c0b" stroke="${P}" stroke-opacity=".18"/>
      ${eqBars(578, 330, 7, 14, 9, 110)}
      <rect x="560" y="372" width="180" height="12" rx="6" fill="#221e1b"/>
      <rect x="592" y="366" width="34" height="24" rx="6" fill="${EM}">
        ${AN(`<animate attributeName="x" values="574;676;574" dur="2.4s" repeatCount="indefinite"/>`)}
      </rect>`,

    /* Reel-to-reel tape machine */
    tape: `
      <rect x="110" y="96" width="680" height="318" rx="20" fill="#100f0e" stroke="${P}" stroke-opacity=".2"/>
      <path d="M300 300 C 380 372, 520 372, 600 300" fill="none" stroke="#e8e2d8" stroke-opacity=".5" stroke-width="5"/>
      ${[[300,242,96,6],[600,242,74,4.6]].map(([cx,cy,r,dur])=>`
        <g transform="translate(${cx},${cy})">
          <circle r="${r}" fill="#0b0a09" stroke="${P}" stroke-opacity=".35" stroke-width="2"/>
          <g>${spin(dur,0,0)}
            <circle r="${r-10}" fill="none" stroke="#3a332e" stroke-width="${r*0.5}"/>
            ${Array.from({length:6},(_,i)=>`<rect x="-3" y="-${r-6}" width="6" height="${r-24}" rx="3" fill="${i%2?S:P}" opacity=".85" transform="rotate(${i*60})"/>`).join("")}
            <circle r="12" fill="${EM}"/>
          </g>
        </g>`).join("")}
      <rect x="404" y="330" width="92" height="34" rx="7" fill="#070605" stroke="${P}" stroke-opacity=".3"/>
      ${eqBars(414, 358, 5, 10, 7, 26)}
      <circle cx="700" cy="360" r="9" fill="${EM}">${pulse("opacity",".35","1",1.6)}</circle>`,

    /* Mixing console with live meters */
    mixer: `
      <rect x="96" y="86" width="708" height="338" rx="18" fill="#100e0d" stroke="${P}" stroke-opacity=".2"/>
      ${Array.from({length:6},(_,i)=>{const x=150+i*106;const k=`<circle cx="${x}" cy="140" r="17" fill="#1b1815" stroke="${i%2?S:P}" stroke-width="2.5"/><rect x="${x-1.5}" y="126" width="3" height="12" rx="1.5" fill="#fff" opacity=".8" transform="rotate(${-40+i*22} ${x} 140)"/>`;
        return k+`<line x1="${x}" y1="186" x2="${x}" y2="372" stroke="#2a2521" stroke-width="4" stroke-linecap="round"/>
        <rect x="${x-17}" y="${230+((i*47)%110)}" width="34" height="17" rx="5" fill="${i%3===0?EM:"#d8d1c7"}">
          ${AN(`<animate attributeName="y" values="${230+((i*47)%110)};${196+((i*29)%150)};${230+((i*47)%110)}" dur="${(3.4+i*0.42).toFixed(1)}s" repeatCount="indefinite"/>`)}
        </rect>`;}).join("")}
      <rect x="700" y="186" width="72" height="186" rx="8" fill="#0a0908" stroke="${P}" stroke-opacity=".2"/>
      ${eqBars(712, 360, 3, 14, 10, 150)}`,

    /* Synth with animated oscilloscope */
    synth: `
      <rect x="110" y="110" width="680" height="286" rx="18" fill="#100f0e" stroke="${P}" stroke-opacity=".2"/>
      <rect x="140" y="140" width="380" height="122" rx="10" fill="#070c09" stroke="${S}" stroke-opacity=".35"/>
      <path fill="none" stroke="${S}" stroke-width="3.5" stroke-linecap="round" d="M150 201 Q 190 141 230 201 T 310 201 T 390 201 T 470 201 T 510 201">
        ${AN(`<animate attributeName="d" dur="2.6s" repeatCount="indefinite" values="
          M150 201 Q 190 141 230 201 T 310 201 T 390 201 T 470 201 T 510 201;
          M150 201 Q 190 246 230 201 T 310 201 T 390 201 T 470 201 T 510 201;
          M150 201 Q 190 161 230 201 T 310 201 T 390 201 T 470 201 T 510 201;
          M150 201 Q 190 141 230 201 T 310 201 T 390 201 T 470 201 T 510 201"/>`)}
      </path>
      ${Array.from({length:8},(_,i)=>`<circle cx="${566+ (i%4)*58}" cy="${164+Math.floor(i/4)*56}" r="18" fill="#1b1714" stroke="${i%3?P:EM}" stroke-width="2.5"/>
        <rect x="${564+(i%4)*58}" y="${150+Math.floor(i/4)*56}" width="3" height="12" rx="1.5" fill="#fff" opacity=".75" transform="rotate(${(i*47)%300} ${566+(i%4)*58} ${164+Math.floor(i/4)*56})"/>`).join("")}
      ${Array.from({length:18},(_,i)=>{const w=(i%7===2||i%7===4||i%7===6)?0:1;return w?`<rect x="${142+i*20}" y="288" width="18" height="92" rx="4" fill="#efe9df"/>`:`<rect x="${150+i*20}" y="288" width="12" height="58" rx="3" fill="#0d0b0a"/>`}).join("")}
      <circle cx="746" cy="356" r="7" fill="${EM}">${pulse("opacity",".3","1",1.1)}</circle>`,

    /* Studio condenser mic with expanding halo */
    mic: `
      <g transform="translate(450,236)">
        ${AN(`<circle r="96" fill="none" stroke="${P}" stroke-width="2" opacity=".5"><animate attributeName="r" values="96;188" dur="3.4s" repeatCount="indefinite"/><animate attributeName="opacity" values=".5;0" dur="3.4s" repeatCount="indefinite"/></circle>`)}
        ${AN(`<circle r="96" fill="none" stroke="${S}" stroke-width="2" opacity=".4"><animate attributeName="r" values="96;188" dur="3.4s" begin="1.7s" repeatCount="indefinite"/><animate attributeName="opacity" values=".4;0" dur="3.4s" begin="1.7s" repeatCount="indefinite"/></circle>`)}
        <ellipse cx="0" cy="168" rx="86" ry="13" fill="#000" opacity=".5"/>
        <rect x="-46" y="-116" width="92" height="176" rx="46" fill="#191614" stroke="${P}" stroke-width="3"/>
        <rect x="-34" y="-104" width="68" height="150" rx="34" fill="none" stroke="${P2}" stroke-width="1.6" opacity=".8"/>
        ${Array.from({length:9},(_,i)=>`<line x1="-34" y1="${-98+i*17}" x2="34" y2="${-98+i*17}" stroke="${P}" stroke-opacity=".35" stroke-width="2"/>`).join("")}
        <rect x="-13" y="60" width="26" height="48" rx="6" fill="#2a2420"/>
        <rect x="-40" y="108" width="80" height="14" rx="7" fill="${EM}"/>
        <rect x="-6" y="122" width="12" height="46" rx="5" fill="#39312c"/>
      </g>
      ${Array.from({length:9},(_,i)=>`<circle cx="${130+i*82}" cy="${90+((i*53)%300)}" r="${1.6+(i%3)}" fill="${i%2?P:S}" opacity=".55">${AN(`<animate attributeName="cy" values="${90+((i*53)%300)};${60+((i*53)%300)};${90+((i*53)%300)}" dur="${(5+i*0.6).toFixed(1)}s" repeatCount="indefinite"/>`)}</circle>`).join("")}`,

    /* Drum kit with impact rings on the beat */
    drums: `
      <g transform="translate(320,300)">
        <circle r="112" fill="#141110" stroke="${P}" stroke-width="4"/>
        <circle r="86" fill="none" stroke="${P2}" stroke-opacity=".55" stroke-width="2"/>
        <circle r="30" fill="${EM}"/>
        ${AN(`<circle r="112" fill="none" stroke="${EM}" stroke-width="3" opacity=".7"><animate attributeName="r" values="112;196" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" values=".7;0" dur="1.5s" repeatCount="indefinite"/></circle>`)}
      </g>
      <g transform="translate(556,214)">
        <ellipse rx="86" ry="16" fill="#241f1b"/>
        <ellipse rx="86" ry="16" fill="none" stroke="${S}" stroke-width="3"/>
        ${AN(`<animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0; 0 -7; 0 0" dur="0.9s" repeatCount="indefinite" additive="sum"/>`)}
      </g>
      <g transform="translate(672,330)">
        <circle r="62" fill="#141110" stroke="${P}" stroke-width="3.5"/>
        <circle r="42" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="1.6"/>
      </g>
      ${eqBars(120, 452, 24, 9, 8, 80)}`,

    /* Piano keys with a travelling light */
    piano: `
      <g transform="translate(96,168)">
        <rect x="-6" y="-22" width="716" height="20" rx="8" fill="${EM}"/>
        ${Array.from({length:17},(_,i)=>`<rect x="${i*42}" y="0" width="38" height="196" rx="6" fill="#f3ede3"/>`).join("")}
        ${Array.from({length:17},(_,i)=>((i%7===2||i%7===6)?"":`<rect x="${i*42+27}" y="0" width="24" height="120" rx="4" fill="#0b0a09"/>`)).join("")}
        <rect x="0" y="0" width="120" height="196" fill="url(#sh${u})" opacity=".85">
          ${AN(`<animate attributeName="x" values="-120;716;-120" dur="6.5s" repeatCount="indefinite"/>`)}
        </rect>
      </g>
      ${Array.from({length:7},(_,i)=>`<g opacity=".85" transform="translate(${170+i*88},${420})"><path d="M0 0 v-26 a7 7 0 1 0 5 6 v-24 l14 -5 v22 a7 7 0 1 0 5 6 v-34 z" fill="${i%3===0?EM:(i%2?P:S)}"/>
        ${AN(`<animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0; 0 -70; 0 0" dur="${(4.2+i*0.55).toFixed(1)}s" repeatCount="indefinite" additive="sum"/>`)}
        ${pulse("opacity",".2",".95",(4.2+i*0.55))}</g>`).join("")}`,

    /* Guitar with vibrating strings */
    guitar: `
      <g transform="translate(70,60)">
        <path d="M244 300 q-92 -14 -92 -92 t92 -92 q54 0 70 42 l190 -142" fill="none" stroke="${P}" stroke-width="9" stroke-linecap="round"/>
        <circle cx="244" cy="208" r="44" fill="#0a0908" stroke="${EM}" stroke-width="6"/>
        <circle cx="244" cy="208" r="60" fill="none" stroke="${P2}" stroke-opacity=".45" stroke-width="2"/>
        <path d="M504 16 l72 -44" stroke="${S}" stroke-width="14" stroke-linecap="round" fill="none"/>
        ${Array.from({length:5},(_,i)=>`<path d="M196 ${186+i*11} L 520 ${44+i*9}" stroke="#e8e2d8" stroke-opacity=".75" stroke-width="1.6">
          ${AN(`<animate attributeName="stroke-opacity" values=".75;.25;.75" dur="${(0.5+i*0.13).toFixed(2)}s" repeatCount="indefinite"/>`)}</path>`).join("")}
      </g>
      ${eqBars(120, 462, 22, 9, 9, 70)}`,

    /* Trumpet with radiating sound arcs */
    horn: `
      <g transform="translate(120,150)">
        <path d="M60 160 q140 -156 300 -122 t150 106" fill="none" stroke="${P}" stroke-width="13" stroke-linecap="round"/>
        <path d="M506 128 l104 -60 v138 z" fill="${EM}"/>
        <path d="M506 128 l104 -60 v138 z" fill="url(#sh${u})" opacity=".5"/>
        ${[0,1,2].map(i=>`<circle cx="${190+i*72}" cy="${92+i*6}" r="12" fill="#1c1815" stroke="${S}" stroke-width="3"/>`).join("")}
      </g>
      ${[0,1,2].map(i=>`<path d="M756 ${218} q46 ${40+i*26} 0 ${(40+i*26)*2}" fill="none" stroke="${S}" stroke-width="3" opacity=".6" transform="translate(${i*10},${-i*(20+i*10)})">
        ${pulse("opacity",".15",".7",2.2,i*0.5)}</path>`).join("")}
      ${eqBars(120, 468, 20, 10, 9, 60)}`,

    /* Violin with a moving bow */
    strings: `
      <g transform="translate(300,60)">
        <path d="M120 40 q-96 96 -62 214 t138 86 q104 -32 138 -86 t-62 -214 q-54 -34 -76 -34 t-76 34 z" fill="#1a1411" stroke="${P}" stroke-width="4"/>
        <path d="M150 168 c-26 6 -26 46 0 52 M262 168 c26 6 26 46 0 52" fill="none" stroke="${EM}" stroke-width="4"/>
        ${Array.from({length:4},(_,i)=>`<line x1="${186+i*13}" y1="52" x2="${186+i*13}" y2="320" stroke="#f0eae0" stroke-opacity=".8" stroke-width="1.5"/>`).join("")}
      </g>
      <g>${AN(`<animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0; 92 34; 0 0" dur="4.4s" repeatCount="indefinite"/>`)}
        <rect x="330" y="150" width="330" height="7" rx="3.5" fill="#d9d2c8" transform="rotate(19 330 150)"/>
      </g>
      ${eqBars(120, 470, 22, 9, 9, 56)}`,

    /* Sampler pads lighting in sequence */
    sampler: `
      <rect x="176" y="96" width="548" height="318" rx="20" fill="#100f0e" stroke="${P}" stroke-opacity=".22"/>
      ${Array.from({length:16},(_,i)=>{const x=212+(i%4)*128,y=132+Math.floor(i/4)*68;
        return `<rect x="${x}" y="${y}" width="112" height="54" rx="10" fill="#1b1714" stroke="${i%5===0?EM:P}" stroke-opacity=".5" stroke-width="2">
        ${AN(`<animate attributeName="fill" values="#1b1714;${i%5===0?EM:S};#1b1714" dur="4s" begin="${(i*0.24).toFixed(2)}s" repeatCount="indefinite"/>`)}</rect>`;}).join("")}
      ${eqBars(212, 400, 14, 12, 10, 44)}`,

    /* Crowd silhouettes under sweeping stage lights */
    crowd: `
      ${[0,1,2].map(i=>`<path d="M${180+i*250} -20 L${60+i*250} 470 L${330+i*250} 470 Z" fill="${i===1?EM:(i?S:P)}" opacity=".13">
        ${AN(`<animateTransform attributeName="transform" attributeType="XML" type="rotate" values="${-9+i*5} ${180+i*250} 0; ${9-i*4} ${180+i*250} 0; ${-9+i*5} ${180+i*250} 0" dur="${(6+i*1.7).toFixed(1)}s" repeatCount="indefinite"/>`)}
      </path>`).join("")}
      <rect y="392" width="900" height="114" fill="#050404"/>
      ${Array.from({length:26},(_,i)=>{const x=26+i*34,hh=30+((i*43)%34);
        return `<g><circle cx="${x}" cy="${400-hh}" r="13" fill="#0b0a09"/><path d="M${x-15} 420 q15 -${hh} 30 0 z" fill="#0b0a09"/>
        ${(i%4===0)?`<path d="M${x-14} ${398-hh} l-16 -34 M${x+14} ${398-hh} l16 -34" stroke="#0b0a09" stroke-width="7" stroke-linecap="round" fill="none"/>`:""}
        ${AN(`<animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0; 0 -${5+(i%4)*3}; 0 0" dur="${(1.1+(i%5)*0.21).toFixed(2)}s" repeatCount="indefinite"/>`)}</g>`;}).join("")}`,

    /* Radio dial with sweeping needle and broadcast arcs */
    radio: `
      <rect x="120" y="120" width="660" height="286" rx="22" fill="#12100f" stroke="${P}" stroke-opacity=".22"/>
      <rect x="152" y="158" width="392" height="118" rx="10" fill="#0a0d0b" stroke="${S}" stroke-opacity=".35"/>
      ${Array.from({length:26},(_,i)=>`<line x1="${168+i*14}" y1="${i%5===0?186:200}" x2="${168+i*14}" y2="246" stroke="${P}" stroke-opacity="${i%5===0?".8":".35"}" stroke-width="${i%5===0?2:1.2}"/>`).join("")}
      <rect x="300" y="170" width="4" height="92" rx="2" fill="${EM}">
        ${AN(`<animate attributeName="x" values="172;520;172" dur="7s" repeatCount="indefinite"/>`)}
      </rect>
      <g transform="translate(648,236)">
        <circle r="64" fill="#191512" stroke="${P}" stroke-width="3"/>
        <circle r="46" fill="none" stroke="${P2}" stroke-opacity=".5" stroke-width="2"/>
        <circle r="12" fill="${EM}"/>
        ${[1,2,3].map(i=>`<path d="M0 -${18+i*16} a ${18+i*16} ${18+i*16} 0 0 1 ${18+i*16} ${18+i*16}" fill="none" stroke="${S}" stroke-width="3" opacity=".55">${pulse("opacity",".12",".75",2.1,i*0.45)}</path>`).join("")}
      </g>
      ${eqBars(152, 380, 12, 12, 10, 76)}`,

    /* Boombox */
    boombox: `
      <rect x="120" y="150" width="660" height="240" rx="18" fill="#131110" stroke="${P}" stroke-opacity=".25"/>
      <path d="M210 150 l70 -66 M690 150 l-70 -66" stroke="${P2}" stroke-width="7" stroke-linecap="round" fill="none"/>
      ${[250,650].map((cx,i)=>`<g transform="translate(${cx},270)">
        <circle r="82" fill="#0b0a09" stroke="${P}" stroke-width="3"/>
        <circle r="58" fill="none" stroke="${S}" stroke-opacity=".45" stroke-width="2"/>
        <circle r="26" fill="${EM}">${pulse("r","24","32",(0.85+i*0.15))}</circle>
      </g>`).join("")}
      <rect x="366" y="196" width="168" height="76" rx="8" fill="#070605" stroke="${P}" stroke-opacity=".3"/>
      ${eqBars(380, 262, 8, 12, 8, 56)}
      ${eqBars(366, 360, 14, 10, 8, 52)}`,
  };

  const scene = SCENES[theme] || SCENES.vinyl;
  return `<svg viewBox="0 0 900 506" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${theme} illustration" preserveAspectRatio="xMidYMid slice">
<defs>
  <linearGradient id="bg${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${D}"/><stop offset="1" stop-color="#070605"/></linearGradient>
  <radialGradient id="ga${u}" cx="26%" cy="20%" r="58%"><stop offset="0" stop-color="${P}" stop-opacity=".50"/><stop offset="1" stop-color="${P}" stop-opacity="0"/></radialGradient>
  <radialGradient id="gb${u}" cx="80%" cy="84%" r="54%"><stop offset="0" stop-color="${S}" stop-opacity=".34"/><stop offset="1" stop-color="${S}" stop-opacity="0"/></radialGradient>
  <radialGradient id="vg${u}" cx="50%" cy="44%" r="74%"><stop offset="52%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".74"/></radialGradient>
  <linearGradient id="sh${u}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".26"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <pattern id="dt${u}" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#fff" opacity=".05"/></pattern>
  <pattern id="sc${u}" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="#000" opacity=".22"/></pattern>
</defs>
<rect width="900" height="506" fill="url(#bg${u})"/>
<rect width="900" height="506" fill="url(#ga${u})"><animate attributeName="opacity" values=".85;1;.85" dur="6s" repeatCount="indefinite"/></rect>
<rect width="900" height="506" fill="url(#gb${u})"/>
${scene}
<rect width="900" height="506" fill="url(#dt${u})"/>
<rect width="900" height="506" fill="url(#sc${u})" opacity=".5"/>
<rect width="900" height="506" fill="url(#vg${u})"/>
</svg>`;
}

/* --- Real imagery: drop a file in assets/history/ and it replaces the scene ---
   Naming convention: assets/history/MM-DD.jpg  (also .jpeg .png .webp)
   Or set "image": {"src": "...", "alt": "...", "credit": "..."} on the entry.
   If no file is found, the animated scene below stays visible. ------------- */
function histPhotoCandidates(key, entry) {
  if (entry && entry.image && entry.image.src) return [entry.image.src];
  return ["jpg", "jpeg", "png", "webp"].map((x) => `./assets/history/${key}.${x}`);
}
function histImgFallback(img) {
  let list = [];
  try { list = JSON.parse(img.dataset.rest || "[]"); } catch (e) {}
  if (list.length) { img.dataset.rest = JSON.stringify(list.slice(1)); img.src = list[0]; }
  else { img.remove(); }
}
function histPhotoHTML(key, entry) {
  const c = histPhotoCandidates(key, entry);
  const alt = (entry && entry.image && entry.image.alt) || (entry ? entry.title : "");
  return `<img class="hist-photo" src="${c[0]}" alt="${String(alt).replace(/"/g, "&quot;")}" loading="lazy"
    data-rest='${JSON.stringify(c.slice(1))}'
    onload="this.classList.add('in')" onerror="histImgFallback(this)" />`;
}
function histCreditHTML(entry) {
  const cr = entry && entry.image && entry.image.credit;
  return cr ? `<p class="hist-credit">Image: ${cr}</p>` : "";
}

/* --- Version face-off voting (stored on this device) --- */
function histVoteKey(date) { return "crr-vote-" + date; }
function histVote(date, side) {
  try { localStorage.setItem(histVoteKey(date), side); } catch (e) {}
  histPaintVotes(date);
}
function histPaintVotes(date) {
  let choice = null;
  try { choice = localStorage.getItem(histVoteKey(date)); } catch (e) {}
  document.querySelectorAll(".vs-btn").forEach((b) => {
    b.classList.toggle("picked", !!choice && b.dataset.side === choice);
  });
  const out = document.getElementById("vsResult");
  if (out) out.textContent = choice ? "You picked " + (choice === "a" ? "the original" : "the remake") + ". Tap the other to switch." : "";
}

function histKindLabel(k) {
  return { sample: "Sample story", versus: "Which version wins?", producer: "Behind the board", writer: "The writer", story: "Did you know" }[k] || "Did you know";
}

function histCardHTML(key, entry, opts) {
  if (!entry) return "";
  const o = opts || {};
  const art = histArt(entry.art, entry.date + entry.title);
  return `<a class="hist-card" href="./music-history.html?d=${key}">
    <div class="hist-art">${art}${histPhotoHTML(key, entry)}<span class="hist-kind">${histKindLabel(entry.kind)}</span></div>
    <div class="hist-card-body">
      <div class="hist-meta"><span>${histLongDate(key)}</span><span>${entry.genre}</span><span>${entry.year}</span></div>
      <h4>${entry.title}</h4>
    </div></a>`;
}

function histExtraHTML(entry) {
  if (entry.kind === "sample" && entry.extra && entry.extra.src) {
    const hits = (entry.extra.hits || []).map((x) => `<li>${x}</li>`).join("");
    return `<div class="hist-sample">
      <div class="hs-src"><span class="kicker">The original</span><b>${entry.extra.src}</b></div>
      <div class="hs-arrow" aria-hidden="true">↓</div>
      <div class="hs-hits"><span class="kicker">Turned into</span><ul>${hits}</ul></div>
    </div>`;
  }
  if (entry.kind === "versus" && entry.extra && entry.extra.a) {
    return `<div class="hist-versus">
      <button class="vs-btn" data-side="a" data-date="${entry.date}"><span class="kicker">Version A</span><b>${entry.extra.a}</b><span class="vs-pick">Pick this</span></button>
      <span class="vs-or">vs</span>
      <button class="vs-btn" data-side="b" data-date="${entry.date}"><span class="kicker">Version B</span><b>${entry.extra.b}</b><span class="vs-pick">Pick this</span></button>
    </div><p class="vs-result" id="vsResult"></p>`;
  }
  return "";
}

function shareHTML(url, text) {
  const u = encodeURIComponent(url), t = encodeURIComponent(text);
  return `<div class="share-row">
    <span class="share-label">Share</span>
    <a class="share-btn" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${u}" aria-label="Share on Facebook">Facebook</a>
    <a class="share-btn" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?url=${u}&text=${t}" aria-label="Share on X">X</a>
    <a class="share-btn" target="_blank" rel="noopener" href="https://wa.me/?text=${t}%20${u}" aria-label="Share on WhatsApp">WhatsApp</a>
    <button class="share-btn js-copy" data-url="${url}">Copy link</button>
  </div>`;
}

// History stories are written as several paragraphs separated by blank lines.
// Split them so the feature page reads properly; the teaser uses only the lede.
function histParagraphs(story) {
  return String(story || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

async function renderHistory() {
  const host = document.getElementById("historyMain");
  if (!host) return;
  try { await loadHistory(); } catch (e) { host.innerHTML = "<p class='c-none'>History archive unavailable right now.</p>"; return; }

  const p = new URLSearchParams(location.search);
  const key = /^\d{2}-\d{2}$/.test(p.get("d") || "") ? p.get("d") : histKey();
  const entry = histEntry(key);
  if (!entry) { host.innerHTML = "<p class='c-none'>Nothing filed for this date yet.</p>"; return; }

  const isToday = key === histKey();
  const url = location.origin + "/music-history?d=" + key;
  host.innerHTML = `
    <article class="hist-feature">
      <div class="hist-hero">${histArt(entry.art, entry.date + entry.title)}${histPhotoHTML(key, entry)}
        <span class="hist-kind big">${histKindLabel(entry.kind)}</span>
      </div>
      <div class="hist-lead">
        <div class="hist-meta"><span class="on">${isToday ? "Today" : histLongDate(key)}</span><span>${entry.genre}</span><span>${entry.year}</span></div>
        <h2>${entry.title}</h2>
        ${histParagraphs(entry.story).map((p, i) => `<p class="hist-story${i ? "" : " lede"}">${p}</p>`).join("")}
        ${histExtraHTML(entry)}
        <div class="hist-facts"><h3>Did you know</h3><ul>${entry.facts.map((f) => `<li>${f}</li>`).join("")}</ul></div>
        ${histCreditHTML(entry)}
        ${shareHTML(url, entry.title + " — Today in Music History on Cortelyou Road Radio")}
      </div>
    </article>`;

  // This week strip
  const strip = document.getElementById("historyWeek");
  if (strip) {
    const base = new Date();
    const out = [];
    for (let i = 1; i <= 4; i++) {
      const d = new Date(base); d.setDate(base.getDate() - i);
      const k = histKey(d); const e = histEntry(k);
      if (e) out.push(histCardHTML(k, e));
    }
    strip.innerHTML = out.join("");
  }
  histPaintVotes(entry.date);
  setupReveal();
}

async function renderHistoryTeaser() {
  const el = document.getElementById("historyTeaser");
  if (!el) return;
  try { await loadHistory(); } catch (e) { return; }
  const key = histKey();
  const entry = histEntry(key);
  if (!entry) return;
  el.innerHTML = `
    <a class="hist-teaser" href="./music-history.html">
      <div class="hist-art">${histArt(entry.art, entry.date + entry.title)}${histPhotoHTML(key, entry)}<span class="hist-kind">${histKindLabel(entry.kind)}</span></div>
      <div class="hist-teaser-body">
        <span class="kicker">Today in Music History · ${histLongDate(key)}</span>
        <h3>${entry.title}</h3>
        <p>${histParagraphs(entry.story)[0] || ""}</p>
        <span class="see">Read today's entry →</span>
      </div>
    </a>`;
}

/* ============================================================
   Schedule / on-air lineup  (edit schedule.json to change shows)
   ============================================================ */
let SCHEDULE = null;
const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

async function loadSchedule() {
  if (SCHEDULE) return SCHEDULE;
  const res = await fetch("./schedule.json", { cache: "no-cache" });
  SCHEDULE = await res.json();
  return SCHEDULE;
}
function minsNow() { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); }
function hhmmToMins(s) { const [h, m] = s.split(":").map(Number); return h * 60 + m; }
function fmtTime(s) {
  const [h, m] = s.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return hh + (m ? ":" + String(m).padStart(2, "0") : "") + " " + ap;
}
function slotsForDay(idx) {
  if (!SCHEDULE) return [];
  return (SCHEDULE.week && SCHEDULE.week[String(idx)]) || SCHEDULE.default || [];
}
function currentSlot() {
  const now = minsNow(), day = new Date().getDay();
  const slots = slotsForDay(day);
  for (const s of slots) {
    const a = hhmmToMins(s.start), b = hhmmToMins(s.end);
    if (b > a ? now >= a && now < b : now >= a || now < b) return s;
  }
  return null;
}
function nextSlot() {
  const now = minsNow(), day = new Date().getDay();
  const slots = slotsForDay(day).slice().sort((x, y) => hhmmToMins(x.start) - hhmmToMins(y.start));
  for (const s of slots) if (hhmmToMins(s.start) > now) return s;
  const tomorrow = slotsForDay((day + 1) % 7).slice().sort((x, y) => hhmmToMins(x.start) - hhmmToMins(y.start));
  return tomorrow[0] || null;
}

async function renderSchedule() {
  const nowEl = document.getElementById("onAirNow");
  const gridEl = document.getElementById("scheduleGrid");
  if (!nowEl && !gridEl) return;
  try { await loadSchedule(); } catch (e) { return; }

  if (nowEl) {
    const cur = currentSlot(), nxt = nextSlot();
    nowEl.innerHTML = `
      <div class="oa-now">
        <span class="kicker">On air now</span>
        <h3>${cur ? cur.name : "Cortelyou Road Radio"}</h3>
        <p>${cur ? cur.blurb : "Music around the clock from Ditmas Park."}</p>
        ${cur ? `<span class="oa-time">${fmtTime(cur.start)} – ${fmtTime(cur.end)}</span>` : ""}
      </div>
      ${nxt ? `<div class="oa-next"><span class="kicker">Up next</span><h4>${nxt.name}</h4><span class="oa-time">${fmtTime(nxt.start)}</span></div>` : ""}`;
  }

  if (gridEl) {
    const today = new Date().getDay();
    const cur = currentSlot();
    let html = "";
    for (let i = 0; i < 7; i++) {
      const d = (today + i) % 7;
      const slots = slotsForDay(d).slice().sort((x, y) => hhmmToMins(x.start) - hhmmToMins(y.start));
      html += `<div class="sch-day${i === 0 ? " is-today" : ""}">
        <h4>${i === 0 ? "Today" : DAY_NAMES[d]}</h4>
        <ul>${slots.map((s) => {
          const live = i === 0 && cur && cur.name === s.name && cur.start === s.start;
          return `<li class="${live ? "live" : ""}"><span class="sch-t">${fmtTime(s.start)}</span><span class="sch-n">${s.name}${live ? ' <em class="sch-live">On air</em>' : ""}</span></li>`;
        }).join("")}</ul></div>`;
    }
    gridEl.innerHTML = html;
  }
}

/* ---------- Init ---------- */
function setupReveal() {
  const els = document.querySelectorAll(".c-card, .c-mini, .c-story, .mix-feature");
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  els.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
  setTimeout(() => els.forEach((el) => el.classList.add("in")), 1600);
}

/* ---------- "Updated" stamps ----------
   Any element marked [data-updated] gets the build time of content.json, and
   any [data-updated="<pool>"] gets the newest item in that pool. The point is
   that a reader can see at a glance that the page was refreshed today rather
   than having to trust that it was. */
function renderUpdatedStamps() {
  document.querySelectorAll("[data-updated]").forEach((el) => {
    const pool = el.dataset.updated;
    let when = liveMeta.generatedAt;
    if (pool) {
      const list = (pools[pool] || [])
        .map((it) => parseWhen(it.publishedAt))
        .filter(Boolean)
        .sort((a, b) => b - a);
      if (list.length) when = list[0].toISOString();
    }
    const d = parseWhen(when);
    if (!d) { el.hidden = true; return; }
    el.hidden = false;
    const today = d.toDateString() === new Date().toDateString();
    el.innerHTML = `<span class="dot"></span>Updated ${today ? "today" : absoluteDate(when)}`;
    el.title = `Last refreshed ${d.toLocaleString("en-US")}`;
    el.classList.toggle("is-today", today);
  });
}

function renderAll() {
  const page = document.body.dataset.page;
  if (page === "story") renderStory();
  else if (page === "history") { renderHistory(); }
  else { renderPools(); renderBriefing(); renderHistoryTeaser(); renderSchedule(); setupReveal(); }
  renderUpdatedStamps();
}

/* ---------- In-place navigation (keeps the stream alive) ---------- */
// The <audio> element and header/footer/sticky-player live outside the swapped
// region, so internal links change the page content without a full reload and
// playback never stops. Any failure falls back to a normal page load.
function updateNavActive() {
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("nav.links a").forEach((a) => {
    const target = (a.getAttribute("href") || "").replace(/^\.\//, "").split(/[?#]/)[0].toLowerCase() || "index.html";
    if (target === page || (page === "" && target === "index.html")) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

async function spaNavigate(url, push) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("nav fetch failed");
  const doc = new DOMParser().parseFromString(await res.text(), "text/html");
  const newHeader = doc.querySelector("header");
  const newFooter = doc.querySelector("footer.site");
  const curHeader = document.querySelector("header");
  const curFooter = document.querySelector("footer.site");
  if (!newHeader || !newFooter || !curHeader || !curFooter) throw new Error("unexpected structure");

  let n = curHeader.nextSibling;
  while (n && n !== curFooter) { const next = n.nextSibling; n.remove(); n = next; }
  let m = newHeader.nextSibling;
  while (m && m !== newFooter) { const next = m.nextSibling; curFooter.parentNode.insertBefore(document.importNode(m, true), curFooter); m = next; }

  document.title = doc.title;
  document.body.dataset.page = doc.body.dataset.page || "home";
  if (doc.body.dataset.section) document.body.dataset.section = doc.body.dataset.section;
  else delete document.body.dataset.section;

  if (push) history.pushState({}, "", url);
  updateNavActive();
  renderAll();
  setPlaying(playing);
  fetchMeta();

  const hash = new URL(url, location.href).hash;
  const target = hash && document.querySelector(hash);
  if (target) target.scrollIntoView();
  else window.scrollTo(0, 0);
}

function isInternalPageLink(a) {
  if (!a || a.target === "_blank" || a.hasAttribute("download")) return false;
  const href = a.getAttribute("href") || "";
  if (!href || href.startsWith("#") || /^(mailto:|tel:)/i.test(href)) return false;
  let url;
  try { url = new URL(href, location.href); } catch (e) { return false; }
  if (url.origin !== location.origin) return false;
  // A page link is same-origin and either extensionless (Netlify clean URLs
  // like /music-news) or ends in .html. Skip links to other files (assets).
  const last = url.pathname.split("/").pop();
  if (last.includes(".") && !/\.html$/i.test(last)) return false;
  return true;
}

function setupNavigation() {
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (e.target.closest(".js-listen")) { e.preventDefault(); togglePlay(); return; }
    const vs = e.target.closest(".vs-btn");
    if (vs) { e.preventDefault(); histVote(vs.dataset.date, vs.dataset.side); return; }
    const cp = e.target.closest(".js-copy");
    if (cp) {
      e.preventDefault();
      const done = () => { const t = cp.textContent; cp.textContent = "Copied"; setTimeout(() => { cp.textContent = t; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(cp.dataset.url).then(done).catch(() => {});
      else done();
      return;
    }
    const a = e.target.closest("a");
    if (!isInternalPageLink(a)) return;
    const url = new URL(a.getAttribute("href"), location.href);
    if (url.pathname === location.pathname && url.hash) return; // same-page anchor
    e.preventDefault();
    spaNavigate(url.href, true).catch(() => { window.location.href = url.href; });
  });
  window.addEventListener("popstate", () => {
    spaNavigate(location.href, false).catch(() => { window.location.reload(); });
  });
}

async function init() {
  if (audio) {
    audio.addEventListener("play", () => setPlaying(true));
    audio.addEventListener("pause", () => setPlaying(false));
  }
  setupNavigation();
  setPlaying(false);

  // Render immediately from built-in content so sections are never empty.
  renderAll();

  // Then try to layer live daily content on top; re-render if it loads.
  try { await loadLiveContent(); renderAll(); } catch (e) { /* keep built-in */ }

  fetchMeta();
  setInterval(fetchMeta, 60000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
