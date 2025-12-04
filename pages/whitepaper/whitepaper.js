/**
 * Whitepaper Interactive Menu
 * 6 menus principais com detalhamento de cada módulo
 */

class WhitepaperMenu {
    constructor(container) {
        this.container = container;
        this.menuView = null;
        this.detailView = null;
        this.currentModule = null;
        this.isAnimating = false;
        
        // 6 Menus principais do Whitepaper
        this.modules = {
            ascendria: {
                icon: '/assets/images/ecosystem/ascendria.webp',
                label: 'ASCENDRIA',
                title: 'Ascendria',
                content: `
                    <h3>1. Executive Summary</h3>
                    <p><strong>Ascendria</strong> is a modular ecosystem created for gamers, NFT collectors, and investors, unifying multiple interactive experiences around a gamified dashboard. Here, social activities, interconnected games, and a robust economy coexist under a single integrated financial system. The central goal is to provide an environment where fun, progression, and real benefits walk side by side, directly rewarding those who are active and participatory within the community.</p>
                    
                    <h4>1.1 Ecosystem Purpose</h4>
                    <p>Ascendria was conceived with the mission of building a broad and engaged community capable of:</p>
                    <ul>
                        <li><strong>Having fun</strong> through multiple independent yet connected games.</li>
                        <li><strong>Interacting socially</strong> on a living, customizable, and community-oriented dashboard.</li>
                        <li><strong>Being rewarded</strong> according to effort and participation.</li>
                    </ul>
                    <p>The proposal is simple and powerful: an ecosystem where everyone grows together, and where social activities, gameplay, and economy reinforce each other.</p>
                    
                    <h4>1.2 Fundamental Pillars of the Ascendria Ecosystem</h4>
                    <p><strong>Circular and Sustainable Economy</strong></p>
                    <ul>
                        <li>No arbitrary currency creation.</li>
                        <li>Based on burning, curation, and item integration between games.</li>
                        <li>Modeled to maintain internal value and avoid inflation.</li>
                    </ul>
                    <p><strong>Infinite Progression for Ascenders</strong></p>
                    <ul>
                        <li>Built for hardcore players seeking long-term goals.</li>
                        <li>Offers scalable and deep systems, with continuity across multiple modules.</li>
                    </ul>
                    <p><strong>Complete Social Ecosystem</strong></p>
                    <ul>
                        <li>Evolving profiles.</li>
                        <li>Social activities.</li>
                        <li>Engagement rewards.</li>
                        <li>Structured player communication via Discord.</li>
                        <li>Tools with real impact on the ecosystem.</li>
                    </ul>
                    <p><strong>Modularity and Interoperability</strong></p>
                    <ul>
                        <li>Persistent profiles.</li>
                        <li>Unified economy.</li>
                        <li>Interoperable resources.</li>
                        <li>Shared goals.</li>
                    </ul>
                    <p>This architecture allows for continuous expansions without resetting player progress.</p>
                    <p><strong>Transparency, Commitment, and Team Communicability</strong></p>
                    <ul>
                        <li>Transparency in the economy.</li>
                        <li>Active communication with the community.</li>
                        <li>Accountability.</li>
                        <li>Constant updates and open monitoring.</li>
                    </ul>
                    
                    <h4>1.3 Ascendria's Competitive Differentiators</h4>
                    <p>Ascendria stands out in the market by offering a set of independent, yet connected games including an Idle Game, a competitive TCG (Cardinals Row), and the main game divided into three modules:</p>
                    <ul>
                        <li><strong>Champions of Ascendria</strong> (PvP)</li>
                        <li><strong>Forges of Ascendria</strong> (Market + Craft)</li>
                        <li><strong>Depths of Ascendria</strong> (PvE)</li>
                    </ul>
                    <p><em>Each module has its own depth but reinforces the ecosystem as a whole.</em></p>
                    <p><strong>Social Gamification with Real Incentives:</strong></p>
                    <ul>
                        <li>Frequent and progressive awards for active members.</li>
                        <li>Social ranking system.</li>
                        <li>Fully player-customizable dashboard.</li>
                    </ul>
                    
                    <h4>1.4 Target Audience</h4>
                    <ul>
                        <li><strong>Hardcore Players:</strong> Seeking depth, progression, and competitiveness.</li>
                        <li><strong>Casual Players:</strong> Finding simple entry points via Idle and Social Panel.</li>
                        <li><strong>Collectors and NFT Enthusiasts:</strong> With NFTs that evolve and become even rarer.</li>
                        <li><strong>Investors:</strong> Seeking stability, scalability, and long-term sustainability.</li>
                    </ul>
                    
                    <h4>1.5 Promise to Investors</h4>
                    <ul>
                        <li>Multiple revenue sources dispersed across various modules.</li>
                        <li>Decentralized risk, with growth distributed among diverse products.</li>
                        <li>Stable economy, based on circularity and burning.</li>
                        <li>Engaged community with clear and transparent incentives.</li>
                        <li>Expandable ecosystem, prepared to receive new games, systems, and external integrations.</li>
                    </ul>
                    
                    <h3>2. Architecture of the Ascendria Ecosystem</h3>
                    <p>Ascendria was designed on a modular and interconnected architecture, where all modules share a single economy but offer independent experiences for different player profiles.</p>
                    <p>The central structure is composed of a social panel (<strong>Dashboard</strong>), an <strong>Idle mining game</strong>, the <strong>main game</strong> (Ascendria, divided into PvP, Craft & Trade, and PvE), and the competitive TCG <strong>Cardinals Row</strong>.</p>
                    
                    <h4>2.1 Shared Economy</h4>
                    <p>The technical heart of Ascendria is <strong>Idle Mines</strong>, responsible for generating all primary resources of the ecosystem.</p>

                    <p><strong>Primary Resources (Generated in Idle Mines):</strong></p>
                    <table>
                        <thead>
                            <tr>
                                <th>Resource</th>
                                <th>Main Function</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Old Alloy</td>
                                <td>Common Base Material</td>
                            </tr>
                            <tr>
                                <td>Silex Runic</td>
                                <td>Uncommon Base Material</td>
                            </tr>
                            <tr>
                                <td>Golden Core</td>
                                <td>Rare Base Material</td>
                            </tr>
                            <tr>
                                <td>Shining Fragments</td>
                                <td>Epic Base Material</td>
                            </tr>
                            <tr>
                                <td>Piece of Card</td>
                                <td>Create Card Packs and evolve Cardinals Row cards</td>
                            </tr>
                            <tr>
                                <td>Lost Relic</td>
                                <td>Collection Resource — 50 units complete the Compendium</td>
                            </tr>
                            <tr>
                                <td>Ascendrian Core</td>
                                <td>Evolve Pickaxe → when broken, generates shards (Crystalline, Murky, Black) used in the Skill Tree</td>
                            </tr>
                        </tbody>
                    </table>

                    <p><strong>Secondary Items (Produced from primary resources):</strong></p>
                    <table>
                        <thead>
                            <tr>
                                <th>Produced Item</th>
                                <th>Function</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Lumenstone</td>
                                <td>Fundamental material for advanced crafting</td>
                            </tr>
                            <tr>
                                <td><strong>Capacitor</strong></td>
                                <td><strong>Used to evolve common mines</strong></td>
                            </tr>
                            <tr>
                                <td><strong>Enhanced Capacitor</strong></td>
                                <td><strong>Used to evolve rare mines</strong></td>
                            </tr>
                            <tr>
                                <td><strong>Developed Capacitor</strong></td>
                                <td><strong>Used to evolve Epic mines</strong></td>
                            </tr>
                            <tr>
                                <td><strong>Advanced Capacitor</strong></td>
                                <td><strong>Used to evolve legendary mines</strong></td>
                            </tr>
                            <tr>
                                <td><strong>Quantum Capacitor</strong></td>
                                <td><strong>Used to evolve Mythic mines</strong></td>
                            </tr>
                            <tr>
                                <td>Energy Generator</td>
                                <td>Essential item that fuels Ascendria's actions</td>
                            </tr>
                            <tr>
                                <td>Card Pack</td>
                                <td>Contains 1 Cardinals Row card</td>
                            </tr>
                            <tr>
                                <td>*Crafted Items</td>
                                <td>Can be sold on the marketplace</td>
                            </tr>
                        </tbody>
                    </table>

                    <p>The economy is circular, featuring:</p>
                    <ul>
                        <li>No "out of thin air" currency generation</li>
                        <li>Curation via NPC for inflation control</li>
                        <li>Interchange of items and resources between all games</li>
                    </ul>
                    <p>This creates a sustainable ecosystem, with value preserved over the long term.</p>

                    <h4>2.2 The Social Dashboard as the Ecosystem Core</h4>
                    <p>The Social Dashboard functions as the central hub of the ecosystem, offering:</p>
                    <ul>
                        <li>Customizable profile.</li>
                        <li>History and progression display.</li>
                        <li>Global and module-specific rankings.</li>
                        <li>Inspection of other players' profiles.</li>
                        <li>Social gamification (activities, achievements, levels).</li>
                        <li>Integrated Bot monitoring Discord engagement.</li>
                    </ul>
                    <p>The Dashboard is the first point of contact for any player — from there they navigate between Idle Mines, Ascendria, and Cardinals Row.</p>
                    
                    <h4>2.3 Relationship Between the Games</h4>
                    <p>The connection between modules is not artificial — it is natural and built by the launch order and the way the ecosystem distributes resources, items, and advantages.</p>
                    <p>The games are:</p>
                    <ul>
                        <li><strong>Independent in Gameplay:</strong> Each works on its own and does not require the others.</li>
                        <li><strong>Interdependent in Progression and Economy:</strong> Participating in multiple modules expands advantages and access to resources, creating:
                            <ul>
                                <li>More strategic options</li>
                                <li>More build possibilities</li>
                                <li>More progression power</li>
                                <li>More reward opportunities</li>
                            </ul>
                        </li>
                    </ul>
                    <p>A player can choose to play only one module, but the ecosystem rewards those who participate in more.</p>
                    
                    <h4>2.4 Player Flow in the Ecosystem</h4>
                    <p>The architecture follows a circular model, where each module feeds another:</p>
                    <p><strong>1) Idle Mines → (resources) → Ascendria & Cardinals Row</strong></p>
                    <p>Idle generates: Resources for crafting, Piece of Cards, Cores and shards, Materials for progression. The Idle Game is the starting point of the economy.</p>
                    <p><strong>2) Forges of Ascendria → (items) → Champions of Ascendria</strong></p>
                    <p>Crafting creates: Weapons, Armor, Consumables, Energy, Lumenstones, Strategic items. These items are used directly in PvP.</p>
                    <p><strong>3) Depths of Ascendria → (rare materials) → Forges</strong></p>
                    <p>PvE generates: Rare recipes, Gems, Runes, Special materials. They allow for advanced crafting and high-tier items.</p>
                    <p><strong>4) Champions of Ascendria → (coins) → Cardinals Row</strong></p>
                    <p>PvP rewards the player with coins needed to play the TCG. This creates a cyclical relationship between action and strategy.</p>
                    <p><strong>5) Cardinals Row → (energy/items) → Champions of Ascendria</strong></p>
                    <p>The TCG provides: Bonus energy, Possibility of off-chain profits, Unique visual items.</p>
                    
                    <h4>2.5 Technical Interdependence Cycle</h4>
                    <p><strong>Flow:</strong> IDLE → CRAFT → PVP → TCG → PVP → PVE → CRAFT → IDLE</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Module</th>
                                <th>Technical Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Idle Mines</td>
                                <td>Primary resource source</td>
                            </tr>
                            <tr>
                                <td>Forges</td>
                                <td>Economic transformation (craft → items)</td>
                            </tr>
                            <tr>
                                <td>Champions</td>
                                <td>Competitiveness and skill expression</td>
                            </tr>
                            <tr>
                                <td>Cardinals Row</td>
                                <td>Strategy, collecting, parallel progression</td>
                            </tr>
                            <tr>
                                <td>Depths</td>
                                <td>Scaling and PvE endgame content</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>This cycle creates: Sustainability, Depth, Infinite progression, Multiple motivations for daily return.</p>

                    <h3>3. Ecosystem Modules (Full Documentation)</h3>
                    <p>To dive deeper into the mechanics and systems of each Ascendria module, consult the dedicated pages:</p>
                    <ul>
                        <li><strong>Idle Mines:</strong> Mechanics and Primary Economy</li>
                        <li><strong>Cardinals Row:</strong> Card System & Competitiveness</li>
                        <li><strong>Champions:</strong> Complete PvP Structure</li>
                        <li><strong>Forges:</strong> Crafting & Market Economy</li>
                        <li><strong>Depths:</strong> PvE and Advanced Progression</li>
                    </ul>
                    <p>Each page contains: Main loops, Metagame, Technical tables, Internal systems, Advanced flows.</p>
                    
                    <h3>4. Governance, Transparency, and Communication</h3>
                    <h4>4.1 Team Structure</h4>
                    <p>Ascendria is developed by a lean, integrated, and highly aligned team:</p>
                    <p><strong>Development:</strong> 2 developers responsible for frontend and backend, working directly on creating the dashboard, games, and internal integrations.</p>
                    <p><strong>Art:</strong> 2 artists dedicated to creating characters, scenarios, items, and social/visual elements of the dashboard. The visual team works synchronized with the technical team.</p>
                    <p><strong>Area Integration:</strong> The team operates fully integrated, with direct communication and joint decisions. The methodology favors agility, alignment between art and programming, rapid iteration, and solid ecosystem construction.</p>
                    <p><strong>Leadership:</strong> Ascendria's founder acts as lead developer, team organizer, and responsible for the ecosystem vision.</p>
                    <p><strong>Future Growth:</strong> As the community expands, Ascendria plans to expand with dedicated marketing team, content creation, community management, and more programmers.</p>
                    
                    <h4>4.2 Operational Transparency</h4>
                    <p>Transparency is one of Ascendria's fundamental pillars. The ecosystem is built on open communication, clear processes, and active community participation.</p>
                    <p><strong>Communication of Changes:</strong> All updates are communicated via Discord announcements, X (Twitter) posts, Devlogs, and Changelogs.</p>
                    <p><strong>Quarterly Reports:</strong> Official reports containing economy evolution, burning/creation of items, participation indicators, growth data, technical status, and updated Roadmap.</p>
                    <p><strong>Community Participation in Severe Changes:</strong> For major impact changes, the community participates via consultations, voting, open discussions, and shared analyses.</p>
                    <p><strong>Availability of Documentation:</strong> Internal audit documents and technical graphs/data will be available for players and investors to track crafting flow, internal economy, and market metrics.</p>
                    
                    <h4>4.3 Official Communication Channels</h4>
                    <p>Ascendria's communication is centralized in official channels:</p>
                    <ul>
                        <li><strong>Discord (Primary Channel):</strong> <a href="https://playascendria.com/discord" target="_blank" rel="noopener">playascendria.com/discord</a></li>
                        <li><strong>X (Twitter):</strong> <a href="https://x.com/PlayAscendria" target="_blank" rel="noopener">x.com/PlayAscendria</a></li>
                        <li><strong>YouTube:</strong> <a href="https://youtube.com/@PlayAscendria" target="_blank" rel="noopener">youtube.com/@PlayAscendria</a></li>
                        <li><strong>TikTok:</strong> <a href="https://tiktok.com/@playascendria" target="_blank" rel="noopener">tiktok.com/@playascendria</a></li>
                    </ul>
                    <p><strong>Discord: The Central Hub</strong> — Official announcements, changelogs, devlogs, structured discussions, support, community decisions, and Bot monitoring all happen here.</p>
                    
                    <h4>4.4 Communication Frequency and Standards</h4>
                    <p><strong>Devlogs Whenever Necessary:</strong> Published when there is something relevant to communicate — new systems, module advancements, ecosystem adjustments, new team members, infrastructure changes.</p>
                    <p><strong>Active Communication on Discord:</strong> With two dedicated Community Managers ensuring quick responses, direct support, constant moderation, and continuous engagement.</p>
                    <p><strong>Weekly Videos:</strong> 1 video per week on YouTube and TikTok with weekly bulletins, production advances, ecosystem news, and community highlights.</p>
                    <p><strong>Occasional Live Streams:</strong> Reserved for module launches, major updates, community events, and significant ecosystem changes.</p>
                    <p><strong>Public Roadmap:</strong> Available at <a href="https://playascendria.com" target="_blank" rel="noopener">playascendria.com</a>, updated as milestones are reached.</p>
                    
                    <h4>4.5 Community Participation in Decisions</h4>
                    <p>The community is an essential part of Ascendria's construction, influencing the ecosystem's direction through feedback, active participation, and voting.</p>
                    <p><strong>Active Participation:</strong> For significant changes, the community will be consulted, ensuring legitimacy, alignment with players, balanced decisions, and maximum transparency.</p>
                    <p><strong>Official Voting on Discord:</strong> Formal polls, voting on system adjustments, economy decisions, validation of proposals, and open discussions.</p>
                    <p><strong>Structured Feedback:</strong> Collection → Technical assessment → Internal discussion → Implementation if approved.</p>
                    <p><strong>Closed Beta:</strong> All Miner holders will have guaranteed access to the Ascendria closed beta, being the first to test mechanics, loops, economy, and functionalities.</p>
                    
                    <h4>4.6 Official Monitoring and Social Integration Bot</h4>
                    <p>Ascendria's official Bot connects Discord and the Social Dashboard, ensuring all community engagement is recorded, validated, and reflected in player's progress.</p>
                    <p><strong>Monitoring Essential Activities:</strong> User roles, message frequency, channel participation, community engagement, and Voices of Ascendria requests.</p>
                    <p><strong>Direct Rewards on Dashboard:</strong> Relevant interactions generate social progress, evolution is automatically recorded, achievements are validated in real-time.</p>
                    <p><strong>Automatic Achievement Confirmation:</strong> When the Bot identifies a completed achievement, XP is automatically added. Cycle: activity → validation → progression → social recognition.</p>
                    <p><strong>Non-Invasive Function:</strong> The Bot does NOT grant combat buffs, Idle Game bonuses, economy impact, or competitive benefits. It exists to monitor, authenticate, and inform.</p>
                    
                    <h4>4.7 Core Governance Values</h4>
                    <ul>
                        <li><strong>Transparency:</strong> All actions, changes, and decisions are communicated clearly and openly.</li>
                        <li><strong>Active Communication:</strong> Continuous dialogue through announcements, devlogs, videos, and Discord support.</li>
                        <li><strong>Responsibility:</strong> Every decision considers impact on the ecosystem, economy, and players.</li>
                        <li><strong>Ethics:</strong> Professional relationships and economic decisions follow solid ethical standards.</li>
                        <li><strong>Economic Stability:</strong> Circular economy, crafting, burning, and curation systems prevent inflation.</li>
                        <li><strong>Fairness among Players:</strong> Clear paths to progression with merit, effort, and strategy as main factors.</li>
                        <li><strong>Commitment to Community:</strong> Community opinion matters, participation shapes the future, engagement is rewarded.</li>
                        <li><strong>Data Security:</strong> Technical and ethical rigor to protect personal information.</li>
                        <li><strong>Professionalism:</strong> Every development stage follows serious, consistent, results-oriented standards.</li>
                        <li><strong>Long-Term Vision:</strong> Expandable, modular, and sustainable ecosystem — a constantly evolving universe.</li>
                        <li><strong>Consistent Deliveries:</strong> Updates and reports follow healthy cycles consistent with growth.</li>
                        <li><strong>Community Participation:</strong> Players influence decisions and have real role in system evolution.</li>
                        <li><strong>Continuous Growth:</strong> Investments, team expansion, new modules planned for longevity.</li>
                    </ul>
                    
                    <h3>5. Lore Portal and Expanded Universe</h3>
                    <p>Ascendria's narrative plays an essential role in building its universe, offering depth, context, and immersion. Although not mandatory for playing, the Lore expands the experience and strengthens the emotional bond with the world.</p>
                    
                    <h4>5.1 Official Lore Access</h4>
                    <p>All Ascendria Lore will be published on the Official Website → Menu: Lore. This will be the central repository for stories, chapters, narrative art, and expanded content.</p>
                    
                    <h4>5.2 Distribution in Chapters and Complementary Content</h4>
                    <p>The Official Lore will be released in chapter format, following a structured and canonical narrative.</p>
                    <p><strong>Filler Content (Weekly):</strong> Created to keep the community excited between chapters — keeping the universe alive and creating moments of fun.</p>
                    <p><strong>Community Participation:</strong> The community can suggest ideas, vote on themes, influence weekly content, and participate creatively in the universe.</p>
                    
                    <h4>5.3 The Lore and Its Relationship with Mechanics</h4>
                    <p>The narrative universe is respected and directly influences the mechanics. Lore elements justify resources, items, and materials. Certain ecosystem systems have a narrative origin. The Lore sustains the ecosystem — it is not just decoration.</p>
                    
                    <h4>5.4 Optional, Yet Highly Immersive Lore</h4>
                    <p>The Lore is completely optional. Players can play just for gameplay, focus only on systems, or explore the story for a deeper experience. Those who follow the Lore will experience Ascendria with much more meaning and involvement.</p>
                    
                    <h3>6. Community and Engagement</h3>
                    <p>The community is the heart of Ascendria. Players form a collective force responsible for bringing the ecosystem to life, participating in decisions, creating content, competing, collaborating, and building alongside the team.</p>
                    
                    <h4>6.1 Community Philosophy</h4>
                    <ul>
                        <li><strong>Welcoming:</strong> Everyone is welcome.</li>
                        <li><strong>Healthy Competitiveness:</strong> For challengers.</li>
                        <li><strong>Collaboration:</strong> Joint decisions and mutual help.</li>
                        <li><strong>Constant Progress:</strong> Social, technical, and narrative.</li>
                        <li><strong>Authentic Meritocracy:</strong> Achievements by effort, not favoritism.</li>
                    </ul>
                    <p>This foundation allows Ascendria to be vibrant, active, and resilient in the long term.</p>
                    
                    <h4>6.2 Social Rewards</h4>
                    <p>In addition to XP from the Bot and Dashboard progress, Ascendria offers special roles that recognize engagement, contribution, exemplary behavior, event participation, and ecosystem support. These roles represent social status and enhance belonging.</p>
                    
                    <h4>6.3 Official Community Events</h4>
                    <p><strong>Social Events:</strong> Internal activities, themed missions, engagement events, Filler Nights (extra lore episodes suggested by the community).</p>
                    <p><strong>Official Cardinals Row Tournaments:</strong> Seasonal tournaments, internal prizes, social recognition, external rankings, transmissions and community highlights.</p>
                    <p>These events keep the ecosystem active, strategic, and socially engaged.</p>
                    
                    <h4>6.4 Role of Community Leaders</h4>
                    <p>Community Managers and moderators organize official events, moderate Discord, mediate voting and decisions, answer questions, create social content, and reinforce ecosystem culture and values. They are the bridge between team and community.</p>
                    
                    <h4>6.5 Community Culture and Values</h4>
                    <ul>
                        <li><strong>Respect Above All:</strong> Toxic behaviors have no place within the ecosystem.</li>
                        <li><strong>Appreciation for the Project:</strong> Ascendria is a universe, an experience, and a community — not just for extractive returns.</li>
                        <li><strong>Balance Between Fun and Progress:</strong> The ecosystem rewards real effort, without becoming purely utilitarian.</li>
                    </ul>
                    
                    <h3>7. Monetization and Sustainability Model</h3>
                    <p>Ascendria's monetization is built upon three main pillars: Pay-to-Fast (never Pay-to-Win), Circular Economy with strong burning mechanism, and Real Sustainability through external revenue + internal economy control.</p>
                    
                    <h4>7.1 Official Monetization Sources</h4>
                    <p><strong>Main Revenue Sources:</strong></p>
                    <ul>
                        <li><strong>Cosmetic Items:</strong> Skins, visuals, effects, profile customizations.</li>
                        <li><strong>Dimensional Pass:</strong> Grants access to Off-chain Marketplace and unlocks sale of crafted items.</li>
                        <li><strong>Season Pass:</strong> Extra progression per season.</li>
                        <li><strong>Sale of Miners:</strong> Limited until the launch of Ascendria.</li>
                        <li><strong>Resource Boxes</strong></li>
                        <li><strong>Minting of Primordial NFTs</strong></li>
                    </ul>
                    <p><strong>General Philosophy:</strong> Pay-to-Fast model — those who pay accelerate, but do not gain unfair advantages. No purchase grants direct power impossible to obtain by playing.</p>
                    <p><strong>Pool Contribution:</strong> 80% of all profit returns to Project Pools, increasing longevity, reward capacity, and economic stability.</p>
                    
                    <h4>7.2 Circular Economy and Burning Mechanisms</h4>
                    <p><strong>Systems that Generate Burning:</strong> Crafting, Evolutions, Upgrades, Production of premium items, Processes for creating advanced items, Generation of Lumenstones and derivatives.</p>
                    <p><strong>Limited Resource Generation:</strong></p>
                    <table>
                        <thead>
                            <tr>
                                <th>Resource</th>
                                <th>Chance</th>
                                <th>Use</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Piece of Card</td>
                                <td>0.002% ~ 0.032%</td>
                                <td>Lumenstones Production</td>
                            </tr>
                             <tr>
                                <td>Ascendrian Core</td>
                                <td>0.001% ~ 0.016%</td>
                                <td>Pickaxe Evolution for the Miner</td>
                            </tr>
                            <tr>
                                <td>Lost Relic</td>
                                <td>0.00001% ~ 0.00004%</td>
                                <td>Compendium Completion → grants title + extremely rare NFT</td>
                            </tr>
                           
                        </tbody>
                    </table>
                    <p><strong>In-Development World Mechanic:</strong> There is a chance of failure in crafting, increasing need for resources, generating more burning, protecting item value, and keeping economy in motion.</p>
                    
                    <h4>7.3 Long-Term Sustainability</h4>
                    <p><strong>1. Dynamic Compensation System (Anti-Inflation):</strong> Daily evaluation of Lumenstones generated, coins paid, crafting flow, transaction volume, emissions and burning. NPC taxes automatically adjust, the Banker curates Pools, Orion releases missions with adjusted payments.</p>
                    <p><strong>2. External Revenue to Sustain Internal Pools:</strong> 70% of monetization from content (ads + views) returns to the Pools. The economy remains self-sustaining — players sustain the ecosystem by participating, and the ecosystem gives back in rewards.</p>
                    
                    <h4>7.4 Official Monetization Philosophy</h4>
                    <p><strong>Fundamental Principles:</strong> Never Pay-to-Win, Always Pay-to-Fast, Free Players access full experience, Paying Players accelerate progression and cosmetics, No purchase grants exclusive power, Focus on sustainability and integrity.</p>
                    <p><strong>Player Experience:</strong> Free Players can progress, evolve, and compete. Paying Players accelerate loops with more cosmetic options. The balance keeps community united.</p>
                    
                    <h4>7.5 Official Marketplace</h4>
                    <p><strong>Off-chain Marketplace (No Fees):</strong> Selling crafted items, trading resources, moving items between players. Requires active Dimensional Pass. 0% fees — total freedom for the player.</p>
                    <p><strong>On-chain Marketplace (With Fees):</strong> Tokenized items on Ronin blockchain. Fee: 5% + Ronin Fee. These fees protect on-chain economy, maintain sustainability, and strengthen ecosystem.</p>
                    <p><strong>Free Economy:</strong> The player owns their item. They can negotiate, sell, trade, or collect without artificial restrictions. No price limits or market control — only anti-exploit systems when necessary.</p>
                    
                    <h3>8. Official Ecosystem Roadmap</h3>
                    <p>The Roadmap presents the sequence of launches, structural milestones, and strategic vision. It reflects modular, organized, and sustainable development.</p>
                    
                    <h4>8.1 Global Ecosystem Milestones</h4>
                    <p><strong>Official Launch Order:</strong></p>
                    <ol>
                        <li>Social Dashboard + Official Website</li>
                        <li>Idle Mines</li>
                        <li>Cardinals Row</li>
                        <li>Champions of Ascendria (PvP)</li>
                        <li>Forges of Ascendria (Craft & Economy)</li>
                        <li>Depths of Ascendria (PvE)</li>
                    </ol>
                    <p><strong>Structural Milestones Already Completed:</strong></p>
                    <ul>
                        <li>Discord structure with categories, channels, systems, and moderation.</li>
                        <li>Complete GDDs for all main games.</li>
                        <li>Internal audit focused on process security and authentication.</li>
                    </ul>
                    <p><strong>Next Confirmed Milestones:</strong></p>
                    <ul>
                        <li>Social Dashboard and Website launch in 2025.</li>
                        <li>Progressive integration between Dashboard, Discord, and Bot.</li>
                    </ul>
                    <p><strong>Future Audits and Blockchain Infrastructure:</strong> After Ascendria game launch — Blockchain Integrations (Ronin), External WEB3 audits, Security reinforcement.</p>
                    
                    <h4>8.2 Roadmap by Module</h4>
                    <p><strong>Idle Mines:</strong> Technical base created. After Dashboard launch: fine balancing, internal testing, general polish. Art team producing Idle Mines ecosystem NPCs. This is the start of the journey.</p>
                    <p><strong>Cardinals Row:</strong> Complete GDD. Development begins after Idle Mines launch. Focus on card mechanics, interface, deckbuilding, matchmaking, competitive functionalities, rankings.</p>
                    <p><strong>Champions of Ascendria (PvP):</strong> GDD ready. Enters production after Cardinals Row. Primordial NFTs launch. Focus on weapons, arenas, builds, combat system, matchmaking, rankings.</p>
                    <p><strong>Forges of Ascendria:</strong> GDD defined. Developed after PvP. Lands NFTs. Crafting base designed with semi-durable NFTs and repair mechanics. Profession systems designed.</p>
                    <p><strong>Depths of Ascendria (PvE):</strong> Last module. Planning includes enemies, IA, biomes, scaled loot, procedural dungeons. Main endgame content and source of rare materials.</p>
                    
                    <h4>8.3 Future Expansions and Long-Term Vision</h4>
                    <p><strong>Future Modules:</strong> Currently, the 5 main modules perfectly compose the ecosystem. No plans for new modules to maintain focus and quality.</p>
                    <p><strong>Integration with External Projects:</strong> After consolidating strong community, Ascendria opens doors for external partnerships and collection integrations, respecting immersion and cohesion.</p>
                    <p><strong>Tournaments and Competitive Structures:</strong> Guild Tournaments, Seasonal Championships, Cardinals Row competitive events, special rankings, competitive seasons and leagues.</p>
                    
                    <h3>9. Contacts and Official Links</h3>
                    <p>Ascendria keeps all its official channels duly verified and centralized to ensure secure, transparent, and direct communication with the community, investors, and partners.</p>
                    
                    <h4>9.1 Official Website</h4>
                    <p><strong>Website:</strong> <a href="https://playascendria.com" target="_blank" rel="noopener">playascendria.com</a></p>
                    <p>This is the main destination for Dashboard Access, Public Roadmap, Lore Portal, and Institutional information.</p>
                    
                    <h4>9.2 Community and Communication</h4>
                    <ul>
                        <li><strong>Discord (Primary Channel):</strong> <a href="https://playascendria.com/discord" target="_blank" rel="noopener">playascendria.com/discord</a> — Official announcements, Changelogs, Devlogs, Support, Bot integration, Voting, Social events</li>
                        <li><strong>X (Twitter):</strong> <a href="https://x.com/PlayAscendria" target="_blank" rel="noopener">x.com/PlayAscendria</a> — Quick announcements, News, Official posts, Community polls</li>
                        <li><strong>YouTube:</strong> <a href="https://youtube.com/@PlayAscendria" target="_blank" rel="noopener">youtube.com/@PlayAscendria</a> — Weekly videos, Production updates, Informative content, Event coverage</li>
                        <li><strong>TikTok:</strong> <a href="https://tiktok.com/@playascendria" target="_blank" rel="noopener">tiktok.com/@playascendria</a> — Short dynamic content, Community highlights</li>
                    </ul>
                    
                    <h4>9.3 Support and Contact with the Team</h4>
                    <p><strong>Support:</strong> Via the official channel on Discord</p>
                    <p><strong>Professional Contact:</strong> Available on the official website</p>
                    
                    <p><em><strong>Welcome to Ascendria!</strong></em></p>
                `
            },
            idlemines: {
                icon: '/assets/images/ecosystem/idle_mines.webp',
                label: 'IDLE MINES',
                title: 'Idle Mines',
                content: `
                    <h3>1. Idle Mines Overview</h3>
                    <p><strong>Idle Mines</strong> is the starting point for the entire journey within the Ascendria ecosystem. Built with the core philosophy of valuing user time, the module serves as the economic foundation of the universe, allowing all progress made here to generate real advantages in subsequent stages — Cardinals Row, Champions of Ascendria, Forges, and Depths.</p>
                    <p>This is the module where the economy is born, where the player begins to shape their future, and where the first loop of persistent progression is established.</p>
                    
                    <h4>1.1 Nature of the Game</h4>
                    <p>Idle Mines is not just an "automatic resource generator." It operates as a hybrid system:</p>
                    <ul>
                        <li><strong>Free Players:</strong> Have access to manual mining, clicking to produce their own stones.</li>
                        <li><strong>Players with a purchased Miner:</strong> Receive a Manager-Miner, who mines automatically while the player focuses on other areas of the ecosystem.</li>
                    </ul>
                    <p>This structure creates: Fair progression for free players, Convenience and acceleration for players who invest, Sustainable economic balance (pay-to-fast, not pay-to-win).</p>
                    
                    <h4>1.2 The Miner — A Central Character of the Ecosystem</h4>
                    <p>The player can only acquire a <strong>single Miner per account</strong>. It is a unique figure in the narrative and a key piece within the economy:</p>
                    <ul>
                        <li>A witness to the fall of Aurelia.</li>
                        <li>A survivor alongside King Aeternus.</li>
                        <li>The first explorer in search of a new home: Ascendria.</li>
                    </ul>
                    <p>When Ascendria is discovered within the official story: The Miner collection will become the <strong>Genesis collection</strong> of the ecosystem and will receive a unique <strong>"Witness of the Fall"</strong> buff — all attacks against Nihil will be 5% stronger than other users.</p>
                    <p><em>Note: The Return of Nihil is the game's only global event and will be extremely important for progression within the Ascendria universe.</em></p>
                    <p>Each player who owns a Miner will receive a new ally: a <strong>Humanoid Automaton</strong>, which will take over the role of continuous production.</p>
                    
                    <h4>1.3 Main Goal within Idle Mines</h4>
                    <p>The player's big goal in Idle Mines is: <strong>Maximize their mines, pickaxe, and skill tree until the launch of Ascendria.</strong></p>
                    <p>Those who do this will have:</p>
                    <ul>
                        <li>Up to 3x more energy to use in Ascendria tasks.</li>
                        <li>Greater mining efficiency.</li>
                        <li>Early access to materials.</li>
                        <li>Stronger initial crafting.</li>
                        <li>More crafted resources to sell on the marketplace for SPARKS.</li>
                        <li>A huge advantage in the other modules of the ecosystem.</li>
                    </ul>
                    <p><strong>Idle Mines is the true strategic pre-game of Ascendria.</strong></p>
                    
                    <h4>1.4 Visual Structure of Idle Mines</h4>
                    <p>The module has three main environments:</p>
                    <p><strong>1) The Camp:</strong> The player's meeting point with NPCs, essential services, and utility interactions.</p>
                    <p><strong>2) The Grotto:</strong> The central area of progression — Miner's Tent, Repair Table (Pickaxe Repair), Toolbox (Skill Tree), Main Mine, Resource Counter, Light Pump.</p>
                    <p><strong>3) Mine Interior:</strong> The location where mining actually happens — Manual mining, Automatic mining (Manager-Miner), Collection animations and particles, Rare drops and loot effects.</p>
                    
                    <h3>2. Main Objectives of Idle Mines</h3>
                    <p>Idle Mines was created to be the strategic foundation of progression within the Ascendria ecosystem. It rewards invested time with real advantages, valuable materials, and exclusive bonuses that directly impact all other modules.</p>
                    <p>The objectives are divided into four main fronts: evolution, collection, long-term goals, and social competitiveness.</p>
                    
                    <h4>2.1 Evolution of Mines and Tools</h4>
                    <p>The primary goal is to strengthen the mining structure, maximizing the efficiency of mine and pickaxe:</p>
                    <ul>
                        <li><strong>Evolve the main mine:</strong> Old Alloy, Silex Runic, Golden Core, Shining Fragment. Evolution increases production rate and chances of rare drops.</li>
                        <li><strong>Upgrade the Pickaxe:</strong> Determines extraction speed and is fundamental for accelerating mining loops. The more evolved, the faster extraction, higher chance of limited resources, and better performance in events.</li>
                        <li><strong>Maximize the Toolbox (Skill Tree):</strong> Functions as the talent system. The player invests shards (Crystalline, Murky, and Black) to unlock mining improvements, resource optimizations, efficiency upgrades, and passive bonuses.</li>
                    </ul>
                    
                    <h4>2.2 Relic Collection and Achievements</h4>
                    <p>Another major goal is to find all <strong>50 Lost Relics</strong> and complete the Compendium. Each relic is extremely rare.</p>
                    <p><strong>Rewards upon completing the Compendium:</strong></p>
                    <ul>
                        <li>UNIQUE AND ULTRA RARE NFT with the Buff: "Mine Connoisseur" (equipable on the Miner/Automaton, significantly increasing the extraction of ALL ores).</li>
                        <li>Exclusive Discord Role.</li>
                        <li>Special Social Dashboard Role.</li>
                        <li>Recognition within Ascendria itself.</li>
                    </ul>
                    <p>This is considered one of the biggest personal milestones in the ecosystem.</p>
                    
                    <h4>2.3 Real Benefits for Other Modules</h4>
                    <p>Idle Mines is not an isolated mini-game — it literally shapes the player's strength within the entire ecosystem.</p>
                    <p><strong>Those who invest time in Idle Mines gain:</strong> Extra energy, Faster initial crafting, Essential materials for the 3 Ascendria modules, Resources to create Lumenstones and Ascension Stones, Access to Card Packs (Cardinals Row).</p>
                    <p><strong>Those who ignore the module will need to buy:</strong> Lumenstones, Ascension Stones, Energy Generators, Cards... from other players in the Marketplace.</p>
                    
                    <h4>2.4 Glorious Goals (Final Goal Before Ascendria)</h4>
                    <p>The biggest "epic" goal within Idle Mines is: <strong>Find all Relics and complete the Compendium.</strong></p>
                    <p>This grants: Exclusive title, Extremely rare NFT, Access to social rewards, Economic advantage, Permanent recognition in the ecosystem.</p>
                    
                    <h4>2.5 Competitiveness and Rankings</h4>
                    <p>Idle Mines has a strong social and competitive component with two main rankings:</p>
                    <ul>
                        <li><strong>Allies Tree Ranking:</strong> Score of all invited allies.</li>
                        <li><strong>Solo Ranking:</strong> Individual player score.</li>
                    </ul>
                    <p>Score is generated by mining — each resource has a specific value.</p>
                    <p><strong>Ranking Rewards:</strong> Payments in USDC, Social recognition, Dashboard highlight, Indirect advantages in the ecosystem.</p>
                    <p><em>Note: Idle Mines achievements count towards the social ranking.</em></p>
                    
                    <h3>3. Primary Resources of Idle Mines</h3>
                    <p>Idle Mines is the core resource generator for the Ascendria ecosystem. Each resource extracted here has a specific function within the economy, feeding systems such as crafting, evolution, card creation, energy production, and character progression.</p>
                    
                    <h4>3.1 Official List of Primary Resources</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Resources</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Common Resources</td>
                                <td>Old Alloy, Silex Runic, Golden Core</td>
                            </tr>
                            <tr>
                                <td>Special Resources</td>
                                <td>Shining Fragments, Piece of Card</td>
                            </tr>
                            <tr>
                                <td>Rare Resources</td>
                                <td>Piece of Card, Ascendrian Core, Lost Relic</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>These resources form the basis of the player's entire evolution system within Ascendria.</p>
                    
                    <h4>3.2 Location and Method of Obtaining</h4>
                    <p><strong>Mine:</strong> Automatically generates Old Alloy, Silex Runic, Golden Core, and Shining Fragment.</p>
                    <p><strong>Randomly Obtained Resources:</strong> Piece of Cards, Ascendrian Core, and Lost Relic can be obtained through pickaxe strikes.</p>
                    
                    <h4>3.3 Dependencies and Level Requirements</h4>
                    <ul>
                        <li><strong>Lost Relics:</strong> Only begin to appear when the player has Epic rarity in their mine. Ultra rare drop.</li>
                        <li><strong>Ascendrian Core:</strong> No initial rarity requirement. Fundamental for pickaxe evolution.</li>
                        <li><strong>Shining Fragments:</strong> Essential base for producing Lumenstones.</li>
                        <li><strong>Piece of Cards:</strong> Used for creating Cardinals Row card packs. Also necessary for card evolution.</li>
                    </ul>
                    
                    <h4>3.4 Function of Each Resource in the Ecosystem</h4>
                    <ul>
                        <li><strong>Old Alloy / Silex Runic / Golden Core / Shining Fragment:</strong> Used for crafting Lumenstones, the primary item of the Ascendrian economy.</li>
                        <li><strong>Piece of Cards:</strong> Create Cardinals Row Card Packs, evolve existing cards, and enhance TCG progression value.</li>
                        <li><strong>Ascendrian Core:</strong> Used to evolve the Pickaxe. When broken, generates Shards (Crystalline, Murky, Black). These Shards evolve the Toolbox (Skill Tree) and activate abilities.</li>
                        <li><strong>Engineer Contract:</strong> Used to Evolve and Repair the mines.</li>
                        <li><strong>Lost Relic:</strong> Ultra rare drop. Absolutely limited. Completing all 50 grants: Ultra rare NFT with "Mine Connoisseur" Buff, Special Discord Role, Special Social Dashboard Role, and Recognition within Ascendria.</li>
                    </ul>
                    <p><em>Note: Mine Connoisseur grants an 80% chance to extract 2 resources with each strike.</em></p>
                    
                    <h4>3.5 Seasonal Content and Temporary Items</h4>
                    <p>The module will feature seasonal events with limited items and special rewards. A small quantity of new items may be added during these events — and only the first players to find them will be rewarded.</p>
                    <p>This ensures: constant renewal, engagement, competitiveness, and a dynamic living economy.</p>
                    
                    <h3>4. Technical Operation of Idle Mines</h3>
                    <p>Idle Mines operates with a set of highly integrated systems, forming the economic heart of the Ascendria Ecosystem. Every resource, action, and evolution is calculated based on a production + extraction + storage engine, sustained by controlled RNGs and efficiency flows.</p>
                    
                    <h4>4.1 The Mine — The Production Machine</h4>
                    <p>The Mine automatically produces resources following 3 sequential steps:</p>
                    <p><strong>(1) RNG #1 – Resource Selection:</strong> The mine chooses only one resource per tick (once per second): Old Alloy, Silex Runic, Golden Core, Shining Fragment. Each with its own chance based on the mine's rarity.</p>
                    <p><strong>(2) RNG #2 – Quantity (Base up to Base × 2):</strong> The quantity produced depends on the Mine's level. Minimum Value = Base, Maximum Value = Base × 2. Example: Base = 10 → generates between 10 and 20 units.</p>
                    <p><strong>(3) Filter by Resource Rarity:</strong></p>
                    <table>
                        <thead>
                            <tr>
                                <th>Resource</th>
                                <th>Filter Chance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Old Alloy</td>
                                <td>100%</td>
                            </tr>
                            <tr>
                                <td>Silex Runic</td>
                                <td>70%</td>
                            </tr>
                            <tr>
                                <td>Golden Core</td>
                                <td>50%</td>
                            </tr>
                            <tr>
                                <td>Shining Fragment</td>
                                <td>20%</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>The resource's rarity determines how much of it will actually be generated.</p>
                    
                    <h4>4.1.1 Primary Storage — The Veins</h4>
                    <p>Each resource has an independent "Vein." The Vein functions as the primary production tank: If not full, it stores the resource. If full, the resource is lost (leakage). The player must use the Pickaxe to free up space. The higher the mine's level, the greater the capacity of the veins.</p>
                    
                    <h4>4.1.2 Illumination (Light Pump)</h4>
                    <p>The Mine produces 100% only when illuminated. Every 7 days, the Pump needs to be recharged with Energy Generators.</p>
                    <ul>
                        <li>With illumination → total production.</li>
                        <li>Without illumination → production reduced by 50%.</li>
                    </ul>
                    
                    <h4>4.1.3 Mine Evolution (Capacitors)</h4>
                    <p>The Mine levels up by consuming the Capacitor of its rarity:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Rarity</th>
                                <th>Capacitor Consumed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Common</td>
                                <td>Capacitor</td>
                            </tr>
                            <tr>
                                <td>Rare</td>
                                <td>Enhanced Capacitor</td>
                            </tr>
                            <tr>
                                <td>Epic</td>
                                <td>Developed Capacitor</td>
                            </tr>
                            <tr>
                                <td>Legendary</td>
                                <td>Advanced Capacitor</td>
                            </tr>
                            <tr>
                                <td>Mythic</td>
                                <td>Quantum Capacitor</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>Evolution increases: minimum production, maximum production, and the vein limit.</p>
                    
                    <h4>4.2 Works — Mine Rarity Evolution</h4>
                    <p>When the Mine reaches the maximum level of its current rarity, the option is released to <strong>Start Work</strong>.</p>
                    <p>Work requires: Engineer Contract (for allocation), Engineers (permanently consumed), Energy Generators.</p>
                    <p>Each rarity has a minimum and maximum number of engineers, and a base work time (reduced by the allocated quantity):</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Transition</th>
                                <th>Min. Eng.</th>
                                <th>Max. Eng.</th>
                                <th>Base Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Common → Rare</td>
                                <td>2</td>
                                <td>4</td>
                                <td>24h</td>
                            </tr>
                            <tr>
                                <td>Rare → Epic</td>
                                <td>4</td>
                                <td>8</td>
                                <td>48h</td>
                            </tr>
                            <tr>
                                <td>Epic → Legendary</td>
                                <td>8</td>
                                <td>16</td>
                                <td>6 days</td>
                            </tr>
                            <tr>
                                <td>Legendary → Mythic</td>
                                <td>16</td>
                                <td>32</td>
                                <td>24 days</td>
                            </tr>
                        </tbody>
                    </table>
                    <p><strong>Technical Calculation:</strong> Final Time = Base Time ÷ Engineers</p>
                    <p><em>Example: 24 days with 16 Engineers → 36 hours. 24 days with 32 Engineers → 18 hours.</em></p>
                    
                    <h4>4.3 The Pickaxe — Extraction System</h4>
                    <p>The Pickaxe extracts resources from the Veins, following the same logic as the Mine: RNG #1 selects the resource, RNG #2 defines the quantity (Base → Base × 2), Filter is applied (100/70/50/20), The state of the Vein is verified.</p>
                    
                    <h4>4.3.1 Vein Rules on Extraction</h4>
                    <ul>
                        <li><strong>Empty Vein:</strong> The player receives 0, but the rare RNG is still triggered.</li>
                        <li><strong>Vein with less than extracted quantity:</strong> The player receives only what is in the vein.</li>
                        <li><strong>Vein with sufficient quantity:</strong> Receives the total extraction value.</li>
                    </ul>
                    <p>After extraction, everything is sent to the Mine's Stock, which also has a limit and can leak.</p>
                    
                    <h4>4.3.2 Rare Item RNG (Priority Cascade)</h4>
                    <p>With each extraction, a cascade runs: Lost Relic (chance depends on Pickaxe level), Ascendrian Core, Piece of Card. Only 1 rare item can drop per click. These items do not depend on the state of the Vein or the Stock.</p>
                    
                    <h4>4.3.3 Pickaxe Evolution (Cores)</h4>
                    <p>The Pickaxe evolves using Ascendrian Cores: 50% → progress, 50% → failure (generates Shards).</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Levels</th>
                                <th>Cores per Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1–5</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>6–10</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>11–15</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>16–20</td>
                                <td>7</td>
                            </tr>
                            <tr>
                                <td>21–25</td>
                                <td>10</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <h4>4.3.4 Pickaxe Maintenance</h4>
                    <p>Requires maintenance every 7 days: Without maintenance → extraction reduced by 50%. Rare chances are maintained.</p>
                    
                    <h4>4.4 Toolbox (Skill Tree)</h4>
                    <p>The Toolbox represents the player's special abilities. It allows unlocking:</p>
                    <ul>
                        <li><strong>Passive Abilities:</strong> Improvements in extraction, efficiency, and small bonuses.</li>
                        <li><strong>Active Abilities (consume shards):</strong> Each active ability uses Shards generated when a Core fails. Offers temporary increases in extraction, strategic buffs, and utility effects.</li>
                    </ul>
                    
                    <h4>4.5 Idle Mines Crafting Systems</h4>
                    <p><strong>Lumenstone:</strong> 100 Shining Fragments, 500 Alloy, 350 Flint, 250 Core. 50% chance.</p>
                    <p><strong>Capacitors (all tiers):</strong> Used to evolve mines.</p>
                    <p><strong>Energy Generator:</strong> Made with 1 Quantum Capacitor and 2 Lumenstones. Uses: Mine Illumination, Maintenance, Ascendria Portal, Daily Ascendrian Energy.</p>
                    
                    <h4>4.6 Narrative and Progress Items</h4>
                    <p><strong>Lost Relics:</strong> 50 in total, extremely rare. Completing the Compendium grants: Rare NFT with Mine Connoisseur Buff, Social Titles.</p>
                    <p><em>Note: Mine Connoisseur grants an 80% chance to extract 2 resources with each strike.</em></p>
                    
                    <h4>4.7 Technical Summary</h4>
                    <p>Idle Mines operates with:</p>
                    <ul>
                        <li>Production System (Mine)</li>
                        <li>Extraction System (Pickaxe)</li>
                        <li>Storage System (Veins → Stock)</li>
                        <li>Evolution System (Capacitors + Cores)</li>
                        <li>Construction System (Works with Engineers)</li>
                        <li>Energy System (Generators)</li>
                        <li>Ability System (Toolbox)</li>
                        <li>Rare System (Independent Cascade)</li>
                    </ul>
                    <p>No part operates in isolation — all influence each other.</p>
                    <p><em><strong>Idle Mines is the beating heart of Ascendria! Join the journey now!</strong></em></p>
                `
            },
            cardinalsrow: {
                icon: '/assets/images/ecosystem/cardnals_row.webp',
                label: 'CARDINALS ROW',
                title: 'Cardinals Row',
                content: `
                    <h3>Cardinals Row</h3>
                    <p><strong>Cardinals Row</strong> is the competitive TCG (Trading Card Game) of the Ascendria ecosystem. A strategic card game where players build decks and compete in tactical battles using cards representing heroes, spells, and artifacts from the Ascendria universe.</p>
                    
                    <h3>Our Commitment to Creative Freedom and Development</h3>
                    <p>The Ascendria team has always reserved the right to creative freedom, which is why we are achieving objectives and improvements we hadn't initially considered.</p>
                    <p>At this moment, we have a complete overview of what we want the ecosystem to be, but we do not wish to be rigidly bound by early documentation. Restricting ourselves now would prevent us from exercising free creativity and implementing better mechanics in the future Ascendria modules.</p>
                    <p>Therefore, the detailed Whitepaper for <strong>Cardinals Row</strong> will be updated when we are dedicating ourselves solely and exclusively to its development.</p>
                    <p>Rest assured, nothing will deviate from the general context already established in the <strong>ASCENDRIA ECOSYSTEM WHITEPAPER</strong>. However, the specific methods by which items are acquired and the core mechanics within this module may evolve and vary as development progresses.</p>
                    
                    <h3>A Message from Our Team</h3>
                    <p>As a team, we felt it was important to share this feedback so that you, our community, understand that we are not hiding anything. We are simply reserving the right to create the project of our lives.</p>
                    <p>We are a small team that dreams big. Our inspiration comes from franchises like Final Fantasy, which started from absolute zero with just a dream and a lot of dedication.</p>
                    <p>That is exactly what you can expect from our team:</p>
                    <ul>
                        <li><strong>Dedication</strong></li>
                        <li><strong>Commitment</strong></li>
                        <li><strong>Responsibility</strong></li>
                        <li><strong>Transparency</strong></li>
                    </ul>
                    
                    <p><em><strong>Thank you for your interest in our ecosystem. Let's embark on this journey together!</strong></em></p>
                `
            },
            champions: {
                icon: '/assets/images/ecosystem/champions.webp',
                label: 'CHAMPIONS',
                title: 'Champions of Ascendria',
                content: `
                    <h3>Champions of Ascendria</h3>
                    <p><strong>Champions of Ascendria</strong> is the competitive PvP arena where players battle for glory, rewards, and legendary status using their customized champions.</p>
                    
                    <h3>Our Commitment to Creative Freedom and Development</h3>
                    <p>The Ascendria team has always reserved the right to creative freedom, which is why we are achieving objectives and improvements we hadn't initially considered.</p>
                    <p>At this moment, we have a complete overview of what we want the ecosystem to be, but we do not wish to be rigidly bound by early documentation. Restricting ourselves now would prevent us from exercising free creativity and implementing better mechanics in the future Ascendria modules.</p>
                    <p>Therefore, the detailed Whitepaper for <strong>Champions of Ascendria</strong> will be updated when we are dedicating ourselves solely and exclusively to its development.</p>
                    <p>Rest assured, nothing will deviate from the general context already established in the <strong>ASCENDRIA ECOSYSTEM WHITEPAPER</strong>. However, the specific methods by which items are acquired and the core mechanics within this module may evolve and vary as development progresses.</p>
                    
                    <h3>A Message from Our Team</h3>
                    <p>As a team, we felt it was important to share this feedback so that you, our community, understand that we are not hiding anything. We are simply reserving the right to create the project of our lives.</p>
                    <p>We are a small team that dreams big. Our inspiration comes from franchises like Final Fantasy, which started from absolute zero with just a dream and a lot of dedication.</p>
                    <p>That is exactly what you can expect from our team:</p>
                    <ul>
                        <li><strong>Dedication</strong></li>
                        <li><strong>Commitment</strong></li>
                        <li><strong>Responsibility</strong></li>
                        <li><strong>Transparency</strong></li>
                    </ul>
                    
                    <p><em><strong>Thank you for your interest in our ecosystem. Let's embark on this journey together!</strong></em></p>
                `
            },
            forges: {
                icon: '/assets/images/ecosystem/forges.webp',
                label: 'FORGES',
                title: 'Forges of Ascendria',
                content: `
                    <h3>Forges of Ascendria</h3>
                    <p><strong>Forges of Ascendria</strong> is the crafting and marketplace hub where players create, enhance, and trade valuable items across the ecosystem.</p>
                    
                    <h3>Our Commitment to Creative Freedom and Development</h3>
                    <p>The Ascendria team has always reserved the right to creative freedom, which is why we are achieving objectives and improvements we hadn't initially considered.</p>
                    <p>At this moment, we have a complete overview of what we want the ecosystem to be, but we do not wish to be rigidly bound by early documentation. Restricting ourselves now would prevent us from exercising free creativity and implementing better mechanics in the future Ascendria modules.</p>
                    <p>Therefore, the detailed Whitepaper for <strong>Forges of Ascendria</strong> will be updated when we are dedicating ourselves solely and exclusively to its development.</p>
                    <p>Rest assured, nothing will deviate from the general context already established in the <strong>ASCENDRIA ECOSYSTEM WHITEPAPER</strong>. However, the specific methods by which items are acquired and the core mechanics within this module may evolve and vary as development progresses.</p>
                    
                    <h3>A Message from Our Team</h3>
                    <p>As a team, we felt it was important to share this feedback so that you, our community, understand that we are not hiding anything. We are simply reserving the right to create the project of our lives.</p>
                    <p>We are a small team that dreams big. Our inspiration comes from franchises like Final Fantasy, which started from absolute zero with just a dream and a lot of dedication.</p>
                    <p>That is exactly what you can expect from our team:</p>
                    <ul>
                        <li><strong>Dedication</strong></li>
                        <li><strong>Commitment</strong></li>
                        <li><strong>Responsibility</strong></li>
                        <li><strong>Transparency</strong></li>
                    </ul>
                    
                    <p><em><strong>Thank you for your interest in our ecosystem. Let's embark on this journey together!</strong></em></p>
                `
            },
            depths: {
                icon: '/assets/images/ecosystem/depths.webp',
                label: 'DEPTHS',
                title: 'Depths of Ascendria',
                content: `
                    <h3>Depths of Ascendria</h3>
                    <p><strong>Depths of Ascendria</strong> is the PvE exploration-focused experience where players venture into mysterious dungeons to discover rare treasures and ancient secrets.</p>
                    
                    <h3>Our Commitment to Creative Freedom and Development</h3>
                    <p>The Ascendria team has always reserved the right to creative freedom, which is why we are achieving objectives and improvements we hadn't initially considered.</p>
                    <p>At this moment, we have a complete overview of what we want the ecosystem to be, but we do not wish to be rigidly bound by early documentation. Restricting ourselves now would prevent us from exercising free creativity and implementing better mechanics in the future Ascendria modules.</p>
                    <p>Therefore, the detailed Whitepaper for <strong>Depths of Ascendria</strong> will be updated when we are dedicating ourselves solely and exclusively to its development.</p>
                    <p>Rest assured, nothing will deviate from the general context already established in the <strong>ASCENDRIA ECOSYSTEM WHITEPAPER</strong>. However, the specific methods by which items are acquired and the core mechanics within this module may evolve and vary as development progresses.</p>
                    
                    <h3>A Message from Our Team</h3>
                    <p>As a team, we felt it was important to share this feedback so that you, our community, understand that we are not hiding anything. We are simply reserving the right to create the project of our lives.</p>
                    <p>We are a small team that dreams big. Our inspiration comes from franchises like Final Fantasy, which started from absolute zero with just a dream and a lot of dedication.</p>
                    <p>That is exactly what you can expect from our team:</p>
                    <ul>
                        <li><strong>Dedication</strong></li>
                        <li><strong>Commitment</strong></li>
                        <li><strong>Responsibility</strong></li>
                        <li><strong>Transparency</strong></li>
                    </ul>
                    
                    <p><em><strong>Thank you for your interest in our ecosystem. Let's embark on this journey together!</strong></em></p>
                `
            }
        };
        
        this.init();
    }
    
    init() {
        this.createStructure();
        this.bindEvents();
        
        // Verificação de segurança - garantir que menu está visível
        this.ensureVisibility();
    }
    
    ensureVisibility() {
        if (this.menuView && !this.currentModule) {
            this.menuView.classList.remove('hidden');
            this.menuView.style.opacity = '';
            this.menuView.style.visibility = '';
            this.menuView.style.maskImage = '';
            this.menuView.style.webkitMaskImage = '';
        }
        
        if (this.detailView && !this.currentModule) {
            this.detailView.classList.remove('active');
            this.detailView.style.maskImage = '';
            this.detailView.style.webkitMaskImage = '';
        }
    }
    
    createStructure() {
        // Menu View com os 6 módulos
        this.menuView = document.createElement('div');
        this.menuView.className = 'whitepaper-menu';
        
        // Grid de menus
        const menuGrid = document.createElement('div');
        menuGrid.className = 'whitepaper-grid';
        
        // Criar os 6 nós de menu
        Object.keys(this.modules).forEach(key => {
            const module = this.modules[key];
            const node = document.createElement('div');
            node.className = 'whitepaper-item';
            node.dataset.module = key;
            node.innerHTML = `
                <img class="whitepaper-icon" src="${module.icon}" alt="${module.label}" />
            `;
            menuGrid.appendChild(node);
        });
        
        this.menuView.appendChild(menuGrid);
        
        // Detail View
        this.detailView = document.createElement('div');
        this.detailView.className = 'whitepaper-detail';
        this.detailView.innerHTML = `
            <div class="detail-header">
                <img class="detail-icon" src="" alt="" />
                <h2 class="detail-title"></h2>
            </div>
            <div class="detail-content"></div>
        `;
        
        // Criar botão Home (volta para os 6 menus principais)
        this.homeButton = document.createElement('button');
        this.homeButton.className = 'detail-home';
        this.homeButton.setAttribute('aria-label', 'Voltar ao menu');
        this.homeButton.setAttribute('type', 'button');
        this.homeButton.innerHTML = `<img src="/assets/images/ecosystem/home.webp" alt="Home" />`;
        this.detailView.insertBefore(this.homeButton, this.detailView.firstChild);
        
        // Adicionar ao container
        this.container.appendChild(this.menuView);
        this.container.appendChild(this.detailView);
    }
    
    bindEvents() {
        // Clique nos itens do menu
        this.container.querySelectorAll('.whitepaper-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const moduleKey = item.dataset.module;
                if (moduleKey && this.modules[moduleKey]) {
                    this.openModule(moduleKey);
                }
            });
        });
        
        // Botão Home - volta para os 6 menus principais
        if (this.homeButton) {
            this.homeButton.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeModule();
            };
        }
    }
    
    async openModule(moduleKey) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.currentModule = moduleKey;
        
        const module = this.modules[moduleKey];
        
        // Preencher conteúdo do detalhe ANTES da animação
        const detailIcon = this.detailView.querySelector('.detail-icon');
        detailIcon.src = module.icon;
        detailIcon.alt = module.label;
        this.detailView.querySelector('.detail-title').textContent = module.title;
        this.detailView.querySelector('.detail-content').innerHTML = module.content;
        
        try {
            // Animação: apaga menuView e revela detailView
            await this.transitionAnimation(this.menuView, this.detailView, () => {
                this.menuView.classList.add('hidden');
                this.detailView.classList.add('active');
            });
        } catch (e) {
            // Em caso de erro, garantir estados corretos
            this.menuView.classList.add('hidden');
            this.detailView.classList.add('active');
            this.clearMasks();
        }
        
        this.isAnimating = false;
    }
    
    async closeModule() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        try {
            // Animação: apaga detailView e revela menuView
            await this.transitionAnimation(this.detailView, this.menuView, () => {
                this.detailView.classList.remove('active');
                this.menuView.classList.remove('hidden');
            });
        } catch (e) {
            // Em caso de erro, garantir estados corretos
            this.detailView.classList.remove('active');
            this.menuView.classList.remove('hidden');
            this.clearMasks();
        }
        
        this.currentModule = null;
        this.isAnimating = false;
    }
    
    clearMasks() {
        // Limpar máscaras de ambos os elementos
        if (this.menuView) {
            this.menuView.style.maskImage = '';
            this.menuView.style.webkitMaskImage = '';
        }
        if (this.detailView) {
            this.detailView.style.maskImage = '';
            this.detailView.style.webkitMaskImage = '';
        }
    }
    
    async transitionAnimation(fromElement, toElement, onMiddle) {
        return new Promise((resolve) => {
            const duration = 1400; // ms
            const startTime = performance.now();
            
            const isSameElement = fromElement === toElement;
            
            if (toElement && !isSameElement) {
                toElement.style.maskImage = 'linear-gradient(135deg, transparent 0%, transparent 100%)';
                toElement.style.webkitMaskImage = 'linear-gradient(135deg, transparent 0%, transparent 100%)';
            }
            
            let middleCalled = false;
            let animationId = null;
            
            // Timeout de segurança - se a animação travar, limpar tudo
            const safetyTimeout = setTimeout(() => {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
                // Garantir que onMiddle foi chamado
                if (!middleCalled && onMiddle) {
                    onMiddle();
                }
                // Limpar máscaras
                if (fromElement) {
                    fromElement.style.maskImage = '';
                    fromElement.style.webkitMaskImage = '';
                }
                if (toElement) {
                    toElement.style.maskImage = '';
                    toElement.style.webkitMaskImage = '';
                }
                resolve();
            }, duration + 500); // 500ms de margem de segurança
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                let progress = Math.min(elapsed / duration, 1);
                
                const wavePos = progress * 200;
                
                if (isSameElement) {
                    if (wavePos < 100) {
                        const erasePos = wavePos;
                        fromElement.style.maskImage = `linear-gradient(135deg, transparent 0%, transparent ${erasePos - 10}%, rgba(0,0,0,1) ${erasePos}%, rgba(0,0,0,1) 100%)`;
                        fromElement.style.webkitMaskImage = `linear-gradient(135deg, transparent 0%, transparent ${erasePos - 10}%, rgba(0,0,0,1) ${erasePos}%, rgba(0,0,0,1) 100%)`;
                    } else {
                        if (!middleCalled && onMiddle) {
                            middleCalled = true;
                            onMiddle();
                        }
                        const revealPos = wavePos - 100;
                        fromElement.style.maskImage = `linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${revealPos - 10}%, transparent ${revealPos}%, transparent 100%)`;
                        fromElement.style.webkitMaskImage = `linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${revealPos - 10}%, transparent ${revealPos}%, transparent 100%)`;
                    }
                } else {
                    if (fromElement) {
                        const erasePos = Math.min(wavePos, 150);
                        fromElement.style.maskImage = `linear-gradient(135deg, transparent 0%, transparent ${erasePos - 20}%, rgba(0,0,0,1) ${erasePos}%, rgba(0,0,0,1) 100%)`;
                        fromElement.style.webkitMaskImage = `linear-gradient(135deg, transparent 0%, transparent ${erasePos - 20}%, rgba(0,0,0,1) ${erasePos}%, rgba(0,0,0,1) 100%)`;
                    }
                    
                    if (toElement) {
                        const revealStart = 50;
                        if (wavePos > revealStart) {
                            if (!middleCalled && onMiddle) {
                                middleCalled = true;
                                onMiddle();
                            }
                            const revealPos = Math.max(0, wavePos - revealStart);
                            toElement.style.maskImage = `linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${revealPos - 20}%, transparent ${revealPos}%, transparent 100%)`;
                            toElement.style.webkitMaskImage = `linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${revealPos - 20}%, transparent ${revealPos}%, transparent 100%)`;
                        }
                    }
                }
                
                if (progress < 1) {
                    animationId = requestAnimationFrame(animate);
                } else {
                    // Limpar timeout de segurança
                    clearTimeout(safetyTimeout);
                    // Limpar máscaras
                    if (fromElement) {
                        fromElement.style.maskImage = '';
                        fromElement.style.webkitMaskImage = '';
                    }
                    if (toElement) {
                        toElement.style.maskImage = '';
                        toElement.style.webkitMaskImage = '';
                    }
                    resolve();
                }
            };
            
            animationId = requestAnimationFrame(animate);
        });
    }
}

// Inicializar quando o DOM estiver pronto
function initWhitepaper() {
    const container = document.querySelector('.whitepaper-container');
    if (!container) {
        // Se o container não existir ainda, tentar novamente em 100ms
        setTimeout(initWhitepaper, 100);
        return;
    }
    
    // Verificar se já foi inicializado
    if (container.dataset.initialized === 'true') return;
    container.dataset.initialized = 'true';
    
    const menu = new WhitepaperMenu(container);
    
    // Listener para garantir visibilidade quando a página volta ao foco
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            menu.ensureVisibility();
        }
    });
}

// Tentar inicializar imediatamente se DOM já estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhitepaper);
} else {
    // DOM já está pronto
    initWhitepaper();
}
