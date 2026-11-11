/**
 * The twelve service areas. Each one powers:
 *   /areas/<slug>/                    — the area page
 *   /services/<service>/<slug>/       — one local page per service
 *
 * `angles` holds a short, unique paragraph for every service in every area,
 * so no two local pages read the same.
 */
import type { ServiceSlug } from "./services";

export interface Location {
  slug: string;
  /** "Corinth" */
  name: string;
  /** "Corinth, MS" — used in headings and page titles */
  full: string;
  /** "Corinth, Mississippi" */
  long: string;
  kind: "city" | "county" | "region";
  county: string;
  /** One line for cards */
  blurb: string;
  about: string[];
  knownFor: string[];
  communities: string[];
  angles: Record<ServiceSlug, string>;
}

export const locations: Location[] = [
  {
    slug: "north-mississippi",
    name: "North Mississippi",
    full: "North Mississippi",
    long: "North Mississippi",
    kind: "region",
    county: "North Mississippi",
    blurb: "From DeSoto County to the Tennessee River hills — the whole northern end of the state.",
    about: [
      "North Mississippi runs from the fast-growing Memphis suburbs of DeSoto County, across the hill country of Marshall, Tippah, Union and Lafayette counties, to the Tennessee River corner in Tishomingo County. It is tied together by I-22, I-55, US 45 and US 72, and anchored by hubs like Tupelo, Oxford, Corinth and Southaven.",
      "It is a region of family-owned shops, manufacturers, clinics, farms, churches and schools — businesses built on reputation. Myers Group Media has been helping those businesses get found online, look professional and run on technology that works since 2008.",
    ],
    knownFor: ["Tupelo, Oxford, Corinth and Southaven", "The I-22 and US 45 corridors", "Family-owned businesses and manufacturing", "Ole Miss, community colleges and strong local schools"],
    communities: ["Corinth", "Ripley", "New Albany", "Booneville", "Tupelo", "Oxford", "Holly Springs", "Iuka", "Pontotoc", "Southaven", "Olive Branch", "Hernando"],
    angles: {
      "web-design": "Across North Mississippi, customers look a business up online before they ever pick up the phone. We build websites for companies from Southaven to Iuka that load fast on a phone, answer the obvious questions and make it easy to call.",
      "web-hosting": "A website for a North Mississippi business should be hosted by someone you can actually reach. We host and look after sites for companies across the region, with support that answers to a local phone number.",
      "app-development": "North Mississippi businesses, schools and media outlets are putting themselves on their customers' home screens. We have built apps used across the state, and we build them for organizations throughout the northern counties.",
      "it-services": "Most North Mississippi businesses do not have an IT department, and they should not need one. We set up and support computers, networks, email and backups for offices across the region, remotely and on-site.",
      "digital-marketing": "Whether you serve one town or the whole northern half of the state, marketing decides who gets the call. We run local SEO, Google ads and online marketing for businesses across North Mississippi, town by town.",
      "social-media-marketing": "North Mississippi lives on Facebook, and increasingly on Instagram and TikTok. We create and manage social media for businesses across the region that want their community to see them, remember them and buy from them.",
      "graphic-design": "From a storefront in a courthouse-square downtown to a fleet of trucks on Highway 45, your brand is seen all over North Mississippi. We design logos, signs, print and digital graphics that make it look established everywhere it appears.",
      "custom-software": "Manufacturers, distributors, clinics and service companies across North Mississippi run on processes no boxed software quite fits. We build custom web applications, dashboards and automations around the way those businesses actually work.",
    },
  },
  {
    slug: "corinth-ms",
    name: "Corinth",
    full: "Corinth, MS",
    long: "Corinth, Mississippi",
    kind: "city",
    county: "Alcorn County",
    blurb: "The Crossroads city and seat of Alcorn County.",
    about: [
      "Corinth is the seat of Alcorn County and the long-time crossroads of northeast Mississippi, where US 72 meets US 45 just south of the Tennessee line. Its historic downtown, Civil War sites and the annual Slugburger Festival draw visitors, while Magnolia Regional Health Center, manufacturers and locally owned shops drive the everyday economy.",
      "Corinth businesses pull customers from Alcorn County and from across the state line, which makes being easy to find online especially valuable. We work with Corinth companies that want to look as established on the web as they are in town.",
    ],
    knownFor: ["The crossroads of US 72 and US 45", "Historic downtown and Civil War heritage", "Magnolia Regional Health Center", "The Slugburger Festival"],
    communities: ["Kossuth", "Farmington", "Glen", "Rienzi", "Biggersville"],
    angles: {
      "web-design": "Corinth shops, restaurants and service companies draw customers from all over Alcorn County and across the Tennessee line. A fast, mobile-friendly website makes sure those customers find you first, whether they are downtown or searching from thirty miles away.",
      "web-hosting": "If your Corinth business website is slow, or you cannot get your current host on the phone, we can move it to fast, secure hosting — with help that is a local call away.",
      "app-development": "For Corinth businesses with loyal repeat customers, an app keeps you one tap away. We design and build iPhone, Android and web apps for Alcorn County organizations that want ordering, booking or updates in their customers' pockets.",
      "it-services": "From medical and professional offices near the hospital to the retailers and manufacturers along Highway 72, Corinth businesses depend on technology that works. We handle computers, networks, email and backups so your staff can get on with the job.",
      "digital-marketing": "Corinth sits where two major highways meet, and so does the competition. We use local SEO and Google ads to put Corinth businesses at the top when people in Alcorn County and nearby Tennessee search for what you offer.",
      "social-media-marketing": "Corinth is a town that shows up for local events and local businesses. We create social media content that gets shared around Alcorn County and keeps your business part of the conversation.",
      "graphic-design": "In a downtown as distinctive as Corinth's, your sign and your logo are part of the streetscape. We design brands, signage artwork and print materials that fit the Crossroads city and stand out in it.",
      "custom-software": "Corinth manufacturers, distributors and healthcare offices often run on spreadsheets and software that has not kept up. We build custom tools that match the way your Alcorn County operation really works.",
    },
  },
  {
    slug: "ripley-ms",
    name: "Ripley",
    full: "Ripley, MS",
    long: "Ripley, Mississippi",
    kind: "city",
    county: "Tippah County",
    blurb: "County seat of Tippah County and home of First Monday Trade Days.",
    about: [
      "Ripley is the seat of Tippah County, at the junction of Highways 15 and 4. It is known across the South for First Monday Trade Days, one of the oldest outdoor markets in the country, and for a courthouse-square downtown full of locally owned businesses.",
      "Ripley is home. Our office is at 112 E Jefferson St, and our work here includes RCTV19, the Cardinal Ripley community publication and The Gathering Porch — and we work with Ripley businesses that want the same attention to detail.",
    ],
    knownFor: ["First Monday Trade Days", "The courthouse square downtown", "Highways 15 and 4", "Locally owned shops and manufacturers"],
    communities: ["Blue Mountain", "Walnut", "Falkner", "Dumas", "Tiplersville"],
    angles: {
      "web-design": "We have built websites for Ripley businesses and organizations, including The Gathering Porch and the Cardinal Ripley community publication. If you do business in Ripley, we build you a site that looks right at home here and gets found well beyond the square.",
      "web-hosting": "Ripley businesses should not have to call a help desk in another country when their website goes down. We host sites for Ripley companies on fast, secure servers and handle the technical side for you.",
      "app-development": "We have built media and streaming platforms with Ripley roots, including work for RCTV19. If your Ripley business or organization needs an app, you have an experienced team close at hand.",
      "it-services": "Ripley offices, shops and manufacturers need computers and networks that simply work. We provide IT support in Ripley, on-site and remote, for businesses that do not have an IT person on staff.",
      "digital-marketing": "First Monday brings thousands of visitors to Ripley every month, and Highway 15 brings more every day. We use local SEO and online ads to make sure those customers, and your neighbors in Tippah County, find your business.",
      "social-media-marketing": "In Ripley, word travels fast — and most of it now travels on Facebook. We manage social media for Ripley businesses so the town sees your specials, your events and your good work.",
      "graphic-design": "We have designed for Ripley businesses and organizations, including Cardinal Ripley and The Gathering Porch. From logos to menus to banners for First Monday, we make your Ripley business look sharp.",
      "custom-software": "Ripley manufacturers and service businesses often outgrow spreadsheets and paper long before they notice. We build custom software that takes the busywork off your team's plate.",
    },
  },
  {
    slug: "new-albany-ms",
    name: "New Albany",
    full: "New Albany, MS",
    long: "New Albany, Mississippi",
    kind: "city",
    county: "Union County",
    blurb: "Union County's seat, on I-22 and the Tanglefoot Trail.",
    about: [
      "New Albany is the seat of Union County, sitting on I-22 between Tupelo and Memphis where the Tallahatchie River runs past a lively downtown. It is the birthplace of William Faulkner and the northern trailhead of the Tanglefoot Trail, and its mix of boutiques, restaurants, healthcare and manufacturing makes it one of the busiest small towns in the region.",
      "With visitors coming off the interstate and the trail, and steady growth across Union County, New Albany businesses have a lot to gain from being easy to find online. We help them do exactly that.",
    ],
    knownFor: ["Birthplace of William Faulkner", "The Tanglefoot Trail", "A thriving downtown on the Tallahatchie River", "I-22 between Tupelo and Memphis"],
    communities: ["Myrtle", "Blue Springs", "Ingomar", "West Union", "Etta"],
    angles: {
      "web-design": "New Albany's downtown boutiques and restaurants win customers from the Tanglefoot Trail, I-22 and all of Union County. We build websites that show off what makes your New Albany business worth the stop.",
      "web-hosting": "A slow website costs a New Albany business customers before they ever walk through the door. We provide fast, secure hosting and handle the updates, backups and domain details for you.",
      "app-development": "Whether it is a loyalty app for a downtown New Albany shop or a tool for a Union County manufacturer's crew, we design and build apps that are simple to use and built to last.",
      "it-services": "New Albany clinics, offices and manufacturers cannot afford downtime. We keep computers, networks, email and backups running for Union County businesses, with support by phone, remote session or on-site.",
      "digital-marketing": "Travelers on I-22 and riders coming off the Tanglefoot Trail search their phones for where to eat, shop and stay. Our local SEO and ads put New Albany businesses in front of them, and in front of Union County residents year-round.",
      "social-media-marketing": "New Albany has one of the most active downtowns in North Mississippi, and its social media feeds show it. We create content that helps your New Albany business stand out in a town that loves to shop local.",
      "graphic-design": "A downtown as polished as New Albany's sets a high bar. We design logos, signage artwork and print pieces that fit right in — and get noticed.",
      "custom-software": "Union County's manufacturers and growing companies run on processes that boxed software rarely fits. We build custom dashboards, portals and automations for New Albany businesses ready to work smarter.",
    },
  },
  {
    slug: "booneville-ms",
    name: "Booneville",
    full: "Booneville, MS",
    long: "Booneville, Mississippi",
    kind: "city",
    county: "Prentiss County",
    blurb: "Prentiss County's seat and home of Northeast Mississippi Community College.",
    about: [
      "Booneville is the seat of Prentiss County, set along US 45 between Corinth and Tupelo. It is home to Northeast Mississippi Community College, a historic downtown and a base of manufacturers, healthcare providers and family businesses that serve the whole county.",
      "Booneville businesses compete for attention with larger towns twenty minutes in either direction. A strong online presence helps keep local customers shopping at home, and we help Booneville companies build one.",
    ],
    knownFor: ["Northeast Mississippi Community College", "The US 45 corridor", "A historic downtown", "Prentiss County manufacturing"],
    communities: ["Baldwyn", "Marietta", "Jumpertown", "Wheeler", "New Site"],
    angles: {
      "web-design": "Booneville businesses compete with Corinth and Tupelo for the same customers. A professional, easy-to-use website helps keep Prentiss County dollars at home by showing people what they can get right here in town.",
      "web-hosting": "We host websites for Booneville businesses that want speed, security and a real person to call. We take care of SSL, backups and updates, and you never have to log in to a control panel.",
      "app-development": "From student-focused ideas near Northeast to tools for Prentiss County employers, we turn app ideas into working iPhone, Android and web apps for Booneville organizations.",
      "it-services": "Booneville offices, clinics and shops need dependable technology without the cost of a full-time IT hire. We provide IT support across Prentiss County — networks, computers, email, security and backups.",
      "digital-marketing": "When someone in Booneville searches for a service, are they finding you or a company up the highway? Our local SEO and advertising put Prentiss County businesses at the top of local results.",
      "social-media-marketing": "Booneville supports its own, from Northeast ball games to downtown events. We manage social media that keeps your business in front of Prentiss County families every week.",
      "graphic-design": "Whether you are opening a new shop downtown or refreshing a family business that has been here for decades, we design logos, print and signage artwork that give Booneville businesses a professional edge.",
      "custom-software": "Prentiss County manufacturers and service companies lose hours every week to re-typing and manual paperwork. We build custom software that gives Booneville businesses those hours back.",
    },
  },
  {
    slug: "desoto-county-ms",
    name: "DeSoto County",
    full: "DeSoto County, MS",
    long: "DeSoto County, Mississippi",
    kind: "county",
    county: "DeSoto County",
    blurb: "Southaven, Olive Branch, Horn Lake and Hernando.",
    about: [
      "DeSoto County is the most populous county in North Mississippi and one of the fastest-growing in the state. Southaven, Olive Branch, Horn Lake and Hernando sit just south of Memphis along I-55, I-22 and I-269, with an economy built on logistics, healthcare, retail and new housing.",
      "That growth means more customers and far more competition, including from Memphis businesses across the state line. We help DeSoto County companies stand out online and get chosen.",
    ],
    knownFor: ["Southaven, Olive Branch, Horn Lake and Hernando", "Part of the Memphis metro area", "Logistics and distribution along I-55 and I-269", "One of Mississippi's fastest-growing counties"],
    communities: ["Southaven", "Olive Branch", "Horn Lake", "Hernando", "Walls", "Nesbit", "Lewisburg"],
    angles: {
      "web-design": "In DeSoto County you are competing with Memphis businesses as well as your neighbors in Southaven, Olive Branch and Hernando. We build websites that look the part and convert the steady stream of new residents searching for someone local.",
      "web-hosting": "DeSoto County's growth means more traffic to your site and less patience for slow pages. We host websites for Southaven, Olive Branch, Horn Lake and Hernando businesses on fast, secure infrastructure with hands-on support.",
      "app-development": "From Southaven retailers to the logistics companies along I-55 and I-269, DeSoto County businesses use apps to serve customers and move faster. We design and build them for iPhone, Android and the web.",
      "it-services": "Growing DeSoto County businesses add staff, locations and devices quickly, and technology has to keep up. We set up and support networks, computers, email and security for offices from Hernando to Olive Branch.",
      "digital-marketing": "New families move into DeSoto County every week, and nearly all of them search online for the services they need. Our local SEO and advertising put your business in front of them before a Memphis competitor gets there.",
      "social-media-marketing": "DeSoto County neighborhoods are highly active in local Facebook groups and on Instagram. We build social media that reaches Southaven, Olive Branch, Horn Lake and Hernando customers by town and by interest.",
      "graphic-design": "In a market as crowded as DeSoto County, a forgettable brand gets passed over. We design logos, brand identities and print materials that help your business stand out along Goodman Road and beyond.",
      "custom-software": "DeSoto County's distribution, logistics and service companies run on speed and accuracy. We build custom software, integrations and dashboards that take manual steps out of the process.",
    },
  },
  {
    slug: "tupelo-ms",
    name: "Tupelo",
    full: "Tupelo, MS",
    long: "Tupelo, Mississippi",
    kind: "city",
    county: "Lee County",
    blurb: "The business hub of Northeast Mississippi.",
    about: [
      "Tupelo is the seat of Lee County and the commercial center of Northeast Mississippi. Known worldwide as the birthplace of Elvis Presley, it is also a regional hub for healthcare, banking, retail and furniture manufacturing, sitting where I-22 crosses US 45 beside the Natchez Trace Parkway.",
      "As the largest market in the area, Tupelo is also the most competitive. Businesses here need a website, a brand and a marketing plan that hold up against regional and national names. That is the work we do.",
    ],
    knownFor: ["Birthplace of Elvis Presley", "North Mississippi Medical Center", "The region's retail and banking hub", "Furniture manufacturing and the Natchez Trace"],
    communities: ["Saltillo", "Verona", "Guntown", "Plantersville", "Belden", "Mooreville"],
    angles: {
      "web-design": "Tupelo is the most competitive market in Northeast Mississippi, and customers here compare businesses online before they choose. We build Tupelo websites that are fast, polished and designed to win that comparison.",
      "web-hosting": "A Tupelo business with regional customers cannot afford a site that drags or goes dark. We provide fast, secure, fully managed hosting — and you can reach us without opening a support ticket.",
      "app-development": "Tupelo's healthcare, retail and manufacturing companies are large enough to benefit from an app and practical enough to want it done right. We design and build mobile and web apps that earn their place on a phone.",
      "it-services": "From medical practices near the hospital to offices downtown and plants around Lee County, Tupelo businesses depend on reliable technology. We provide IT setup, support, security and backups without big-firm pricing.",
      "digital-marketing": "Ranking in Tupelo means outranking everyone else who wants the biggest market in the region. We bring local SEO experience that dates back to 2008, along with Google ads, to help Tupelo businesses claim the top spots.",
      "social-media-marketing": "Tupelo audiences are large, active and constantly advertised to. We create social media content and ads that cut through the noise and bring Lee County customers through your door.",
      "graphic-design": "Tupelo businesses stand alongside regional and national brands. We design logos, branding and marketing materials that let a locally owned Tupelo company look every bit as professional.",
      "custom-software": "Tupelo's manufacturers, distributors and healthcare groups have complex operations that off-the-shelf software handles poorly. We build custom applications and integrations around the way your Lee County business runs.",
    },
  },
  {
    slug: "tippah-county-ms",
    name: "Tippah County",
    full: "Tippah County, MS",
    long: "Tippah County, Mississippi",
    kind: "county",
    county: "Tippah County",
    blurb: "Ripley, Walnut, Blue Mountain, Falkner and Dumas.",
    about: [
      "Tippah County sits on the Tennessee line in the hill country of North Mississippi. Ripley is the county seat, joined by Walnut on US 72, Blue Mountain — home of Blue Mountain Christian University — and the communities of Falkner, Dumas and Tiplersville.",
      "Tippah County businesses are built on relationships, and many have served the same families for generations. We help them carry that reputation online, where the next generation of customers is looking.",
    ],
    knownFor: ["Ripley and First Monday Trade Days", "Walnut on the US 72 corridor", "Blue Mountain Christian University", "Hill country on the Tennessee line"],
    communities: ["Ripley", "Walnut", "Blue Mountain", "Falkner", "Dumas", "Tiplersville", "Chalybeate"],
    angles: {
      "web-design": "From Walnut to Blue Mountain to the Ripley square, Tippah County businesses run on reputation. We build websites that carry that reputation online — clear, honest and easy to use on any phone.",
      "web-hosting": "We host websites for businesses, churches and organizations across Tippah County. You get fast, secure hosting and a team that knows where Falkner and Dumas are.",
      "app-development": "Tippah County schools, media outlets and businesses are finding that an app keeps their community connected. We have built media and streaming platforms with roots right here, and we can build your app too.",
      "it-services": "Reliable IT help can be hard to find in a rural county. We support businesses across Tippah County — Ripley, Walnut, Blue Mountain and beyond — with computers, networks, email, security and backups.",
      "digital-marketing": "Tippah County customers search online just like everyone else, and people passing through on Highways 15, 4 and 72 do too. Our local SEO makes sure a search for what you do turns up your business.",
      "social-media-marketing": "In Tippah County, Facebook is the community bulletin board. We manage social media for local businesses so your news, specials and events reach families across the county.",
      "graphic-design": "A professional logo and clean signage help a Tippah County business look as dependable as it is. We design brands, print pieces and digital graphics for businesses across the county.",
      "custom-software": "Tippah County manufacturers, farms and service companies each have their own way of working. We build custom software that fits those processes, so your team is not forced to work around someone else's.",
    },
  },
  {
    slug: "holly-springs-ms",
    name: "Holly Springs",
    full: "Holly Springs, MS",
    long: "Holly Springs, Mississippi",
    kind: "city",
    county: "Marshall County",
    blurb: "Marshall County's historic seat on I-22.",
    about: [
      "Holly Springs is the seat of Marshall County, on I-22 between Memphis and New Albany. It is known for its antebellum homes and annual Pilgrimage, for Rust College, and as the birthplace of Ida B. Wells-Barnett. The courthouse square anchors a community that is seeing new industrial growth across the county.",
      "With Memphis-area growth pushing east into Marshall County, Holly Springs businesses have new customers to reach. We help them get found online and make a strong first impression.",
    ],
    knownFor: ["Antebellum homes and the annual Pilgrimage", "Rust College", "Birthplace of Ida B. Wells-Barnett", "The historic courthouse square"],
    communities: ["Byhalia", "Potts Camp", "Red Banks", "Mount Pleasant", "Waterford"],
    angles: {
      "web-design": "Holly Springs draws heritage tourists, college families and new residents moving out from the Memphis area. We build websites that help Holly Springs businesses welcome all of them.",
      "web-hosting": "Holly Springs businesses and organizations deserve hosting that is fast, secure and backed by someone local enough to care. We handle the servers, SSL, backups and domains.",
      "app-development": "From tourism and events to tools for Marshall County's growing industrial employers, we design and build apps for Holly Springs organizations ready to put their services on a phone.",
      "it-services": "As Marshall County grows, Holly Springs offices and shops need technology that keeps pace. We provide IT support — networks, computers, email, security and backups — for businesses around the square and across the county.",
      "digital-marketing": "Visitors planning a trip to Holly Springs, and newcomers settling in Marshall County, start with a search. Our local SEO and advertising make sure they find your business.",
      "social-media-marketing": "Holly Springs has stories worth telling — history, events, food and people. We create social media content that tells yours and brings Marshall County customers in.",
      "graphic-design": "In a town with as much character as Holly Springs, design matters. We create logos, signage artwork and print materials that respect the setting and still stand out on the square.",
      "custom-software": "Marshall County's new industrial and logistics operations, along with long-standing Holly Springs businesses, often need tools built to their exact process. We design and build that software.",
    },
  },
  {
    slug: "iuka-ms",
    name: "Iuka",
    full: "Iuka, MS",
    long: "Iuka, Mississippi",
    kind: "city",
    county: "Tishomingo County",
    blurb: "Tishomingo County's seat, near Pickwick Lake.",
    about: [
      "Iuka is the seat of Tishomingo County, in the northeast corner of Mississippi near both the Alabama and Tennessee lines. Sitting on US 72 close to Pickwick Lake, J.P. Coleman State Park and the Tennessee-Tombigbee Waterway, it draws lake visitors and outdoor enthusiasts along with a loyal local customer base.",
      "Iuka businesses serve residents and visitors alike, and visitors find businesses with their phones. We help Iuka companies show up when it counts.",
    ],
    knownFor: ["Pickwick Lake and J.P. Coleman State Park", "The Tennessee-Tombigbee Waterway", "Historic mineral springs", "US 72 near the Alabama and Tennessee lines"],
    communities: ["Burnsville", "Belmont", "Tishomingo", "Golden", "Dennis"],
    angles: {
      "web-design": "Lake visitors headed to Pickwick look up Iuka restaurants, marinas, shops and services on their phones. We build mobile-first websites that make sure your Iuka business is what they find.",
      "web-hosting": "We provide fast, secure hosting for Iuka and Tishomingo County businesses, and we take care of the technical side so you never have to wonder whether your site is up.",
      "app-development": "Whether it is a guide for lake visitors or a working tool for a Tishomingo County business, we design and build apps for iPhone, Android and the web.",
      "it-services": "Iuka businesses should not have to wait days for IT help to arrive from a bigger town. We support Tishomingo County offices and shops with remote help and scheduled on-site visits.",
      "digital-marketing": "Iuka sits at the corner of three states, and customers come from all of them. Our local SEO and advertising help Iuka businesses reach residents, lake traffic and travelers on US 72.",
      "social-media-marketing": "Summer on Pickwick brings a wave of visitors, and Tishomingo County locals keep businesses going all year. We build social media that speaks to both.",
      "graphic-design": "From a storefront sign in downtown Iuka to a banner at the lake, we design logos and materials that give Tishomingo County businesses a clean, professional look.",
      "custom-software": "Tishomingo County manufacturers and marine and service businesses often need software that fits how they work. We build custom tools that replace spreadsheets and paper.",
    },
  },
  {
    slug: "pontotoc-ms",
    name: "Pontotoc",
    full: "Pontotoc, MS",
    long: "Pontotoc, Mississippi",
    kind: "city",
    county: "Pontotoc County",
    blurb: "Pontotoc County's seat, between Tupelo and Oxford.",
    about: [
      "Pontotoc is the seat of Pontotoc County, set between Tupelo and Oxford where Highways 15, 6 and 9 come together. Its name comes from a Chickasaw phrase often translated as “land of hanging grapes.” The town is known for the Bodock Festival, the Tanglefoot Trail and a strong furniture-manufacturing base.",
      "Pontotoc businesses sit between two larger markets, and that is an opportunity. We help them keep local customers at home and reach new ones in both directions.",
    ],
    knownFor: ["The Bodock Festival", "The Tanglefoot Trail", "Furniture manufacturing", "Midway between Tupelo and Oxford"],
    communities: ["Ecru", "Algoma", "Sherman", "Thaxton", "Toccopola", "Randolph"],
    angles: {
      "web-design": "Pontotoc sits between Tupelo and Oxford, and your website decides whether local customers stay in town or drive past. We build sites that give them every reason to choose a Pontotoc business.",
      "web-hosting": "We host websites for Pontotoc businesses that want reliability without the hassle — fast pages, SSL, backups and updates, all handled for you.",
      "app-development": "From Pontotoc County manufacturers who need shop-floor tools to local businesses that want a customer app, we design and build software for phones, tablets and browsers.",
      "it-services": "Pontotoc's manufacturers, offices and retailers need technology that stays up. We provide IT support for Pontotoc County businesses — networking, computers, email, security and backups.",
      "digital-marketing": "Customers in Pontotoc County can just as easily drive to Tupelo or Oxford. Our local SEO and ads keep your business at the top of their search results, so they do not have to.",
      "social-media-marketing": "Pontotoc turns out for the Bodock Festival, for Friday night ball games and for local businesses. We manage social media that keeps you part of what the town is talking about.",
      "graphic-design": "We design logos, signage artwork and print materials that help Pontotoc businesses look polished on Main Street, at community events and online.",
      "custom-software": "Pontotoc County's furniture and manufacturing companies run complex operations on tight margins. We build custom dashboards, tracking tools and automations that cut waste and save time.",
    },
  },
  {
    slug: "oxford-ms",
    name: "Oxford",
    full: "Oxford, MS",
    long: "Oxford, Mississippi",
    kind: "city",
    county: "Lafayette County",
    blurb: "Home of Ole Miss, the Square and Lafayette County's seat.",
    about: [
      "Oxford is the seat of Lafayette County and home of the University of Mississippi. The historic Square, William Faulkner's Rowan Oak, the Double Decker Arts Festival and SEC game days bring visitors from across the country, and a fast-growing population supports restaurants, retail, real estate, healthcare and professional services.",
      "Oxford customers are online, design-conscious and have plenty of choices. Businesses here need a brand and a website that match the standard the town sets. We build both.",
    ],
    knownFor: ["The University of Mississippi", "The historic Square", "Rowan Oak and a deep literary heritage", "The Double Decker Arts Festival"],
    communities: ["Abbeville", "Taylor", "College Hill", "Water Valley", "Batesville"],
    angles: {
      "web-design": "Oxford customers — students, alumni, visitors and locals — expect a business to look good online. We design websites that match the standard of the Square and turn game-weekend traffic into year-round customers.",
      "web-hosting": "When a football weekend sends a surge of traffic to your Oxford business, your website needs to hold up. We provide fast, secure hosting that is ready for your busiest days.",
      "app-development": "Oxford is full of ideas, from student startups to restaurants and retailers who want mobile ordering and loyalty rewards. We turn those ideas into working iPhone, Android and web apps.",
      "it-services": "Oxford's professional offices, clinics, property managers and retailers depend on technology every hour of the day. We provide IT support, networking, security and backups for Lafayette County businesses.",
      "digital-marketing": "Oxford is one of the most competitive small markets in Mississippi. Our local SEO and paid advertising help your business show up for residents, students, parents and the visitors who fill town on big weekends.",
      "social-media-marketing": "Oxford runs on Instagram. We create social media content and ads built for a town full of students, alumni and visitors who decide where to eat, shop and stay from their feeds.",
      "graphic-design": "Oxford has a look, and customers notice when a business gets it right. We design logos, brand identities, menus and marketing materials that belong on the Square.",
      "custom-software": "From property management and hospitality to startups coming out of the university, Oxford businesses need software that fits. We build custom web apps, portals and integrations to match.",
    },
  },
];

export const locationBySlug = (slug: string) => locations.find((l) => l.slug === slug)!;

/** Cities and counties only (everything except the region-wide entry). */
export const localAreas = locations.filter((l) => l.kind !== "region");

/** The kinds of businesses we typically work with in each area. */
export const localIndustries: Record<string, string[]> = {
  "north-mississippi": ["Local service companies", "Manufacturers and distributors", "Clinics and professional offices", "Restaurants and retailers", "Schools, churches and nonprofits"],
  "corinth-ms": ["Medical and dental practices", "Manufacturers and industrial suppliers", "Downtown shops and restaurants", "Contractors and home services", "Churches and nonprofits"],
  "ripley-ms": ["First Monday vendors and retailers", "Manufacturers", "Restaurants and gathering places", "Local media and community organizations", "Home service companies"],
  "new-albany-ms": ["Downtown boutiques and restaurants", "Clinics and healthcare providers", "Furniture and automotive suppliers", "Real estate and insurance offices", "Trail and tourism businesses"],
  "booneville-ms": ["Family-owned retailers", "Manufacturers", "Clinics and pharmacies", "Banks, insurance and professional offices", "Schools, churches and civic groups"],
  "desoto-county-ms": ["Logistics and distribution companies", "Home builders and contractors", "Medical and dental practices", "Restaurants and retailers", "Real estate teams and professional offices"],
  "tupelo-ms": ["Healthcare practices", "Furniture manufacturers and suppliers", "Banks and financial firms", "Retailers and restaurants", "Law firms and professional services"],
  "tippah-county-ms": ["Family-owned shops", "Manufacturers", "Farms and agricultural businesses", "Churches and schools", "Contractors and service companies"],
  "holly-springs-ms": ["Tourism and event venues", "Restaurants and shops on the square", "Industrial and logistics employers", "Churches, schools and nonprofits", "Contractors and home services"],
  "iuka-ms": ["Marinas and lake businesses", "Restaurants and lodging", "Manufacturers", "Retail shops", "Contractors and home services"],
  "pontotoc-ms": ["Furniture manufacturers", "Main Street shops and restaurants", "Farms and agricultural businesses", "Clinics and professional offices", "Contractors and home services"],
  "oxford-ms": ["Restaurants, bars and boutiques", "Real estate and property management", "Law, medical and professional offices", "Hotels and short-term rentals", "Startups and student-run businesses"],
};
