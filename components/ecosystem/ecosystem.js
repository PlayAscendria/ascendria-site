/**
 * Ecosystem Interactive Graph
 * 3 menus principais com submenus
 */

class EcosystemGraph {
    constructor(container) {
        this.container = container;
        this.graphView = null;
        this.detailView = null;
        this.currentModule = null;
        this.isAnimating = false;
        
        // 3 Menus principais
        this.modules = {
            rankings: {
                icon: '/assets/images/ecosystem/rankings.webp',
                label: 'RANKINGS',
                title: 'Rankings',
                hasSubmenu: false,
                content: `
                    <h3>RANKING SYSTEM</h3>
                    <p>Compete with players around the world to earn rewards in our rankings.</p>
                    <p>The rankings will be modified according to the current stage of our ecosystem. Below is an overview of what we have now and how we will pay out rewards.</p>
                    
                    <h3>🎯 CURRENT STAGE: IN SEARCH OF ASCENDRIA</h3>
                    <p>In the current stage, we understand that we need to build our great community. After all, we are a project that relies on the community to grow. Therefore, we will have a specific ranking for the social aspect of the game.</p>
                    
                    <h3>🌟 SOCIAL RANKING</h3>
                    <p>The Social Ranking will not take into account your skill as a player, but rather how much you have engaged with the community: if you have chatted on our Discord, if you have sought to achieve the conquests, complete the daily tasks, if you are boosting the community by watching our videos to generate capital for the project, and, of course, if you are building your base of allies.</p>
                    <p>Each user can invite 50 allies, and our system will only allow registration for those who have an ally code. In the end, we will all be connected as one big family.</p>
                    <p>When you have allies, <strong>10% of their development is also added to you</strong>, and it is your role to encourage your allies to keep progressing with you.</p>
                    <p>Cosmetic items will also help you gain social experience and even likes or dislikes. It's best to have your profile well-aligned so that other users can view it and leave likes. Only those who are in the ranking will have their profiles viewable.</p>
                    
                    <h4>💰 Social TOP 1000 Prizes (USDC)</h4>
                    <ul>
                        <li>Values invested in cosmetics in the Spark Store during the season</li>
                        <li>Part of the Primordial Mint Value</li>
                        <li>The largest part of the revenue collected via ADS (learn more in External Impulse)</li>
                    </ul>
                    <p>The first season will run from the launch of our ecosystem until the launch of Ascendria – Champions of Ascendria. The prize pool for the first season is expected to be substantially larger!</p>
                    
                    <h3>👥 ALLIES RANKING: COMMUNITY</h3>
                    <p>This is undoubtedly the most exciting ranking. After players invite their allies, they will compete among communities of allies, almost like a guild battle. The ranking will reward 10 communities, and everyone will receive the prize based on their collaboration.</p>
                    <p>This ranking will only generate points in the <strong>Idle Mines</strong> game.</p>
                    <h4>Prize sources:</h4>
                    <ul>
                        <li>The largest part of the Sale of Miners in the SPARK store</li>
                        <li>Part of the sale of Chests within the Idle Mines game</li>
                    </ul>
                    
                    <h3>🏅 SOLO RANKING</h3>
                    <p>This ranking will reward the <strong>TOP 100</strong> best solo miners. In-game activities will be counted towards the score.</p>
                    <h4>Prize sources:</h4>
                    <ul>
                        <li>Part of the sale of miners in the Spark store</li>
                        <li>The largest part of the sale of chests within the Idle Mines game</li>
                    </ul>
                    
                    <h3>⚔️ RANKINGS AFTER CHAMPIONS OF ASCENDRIA</h3>
                    <ul>
                        <li><strong>GUILDS RANKING:</strong> Rewards top 3 guilds</li>
                        <li><strong>SOLO RANKING:</strong> Rewards top 100 players</li>
                        <li><strong>SOCIAL CONTRIBUTION:</strong> Rewards the top 1000</li>
                        <li><strong>BOOSTER RANKING:</strong> Pays everyone who watches and scores within our platform!</li>
                    </ul>
                    
                    <h3>🔥 RANKINGS AFTER FORGES OF ASCENDRIA</h3>
                    <ul>
                        <li><strong>MARKETPLACE RANKING:</strong> Rewards the 100 best negotiators who buy and sell the most</li>
                    </ul>
                    
                    <h3>🌊 RANKINGS AFTER DEPTHS OF ASCENDRIA</h3>
                    <ul>
                        <li><strong>DISCOVERY RANKING:</strong> Rewards the 100 best discoverers of rare rewards</li>
                    </ul>
                    
                    <p><strong>These rankings are the DIRECT ways through which Ascendria will pay its best and most engaged players.</strong></p>
                    <p><em>Enjoy the journey!</em></p>
                `
            },
            ascendria: {
                icon: '/assets/images/ecosystem/ascendria.webp',
                label: 'ASCENDRIA',
                title: 'Ascendria Games',
                hasSubmenu: true,
                submenu: [
                    {
                        id: 'idlemines',
                        icon: '/assets/images/ecosystem/idle_mines.webp',
                        label: 'IDLE MINES',
                        title: 'Idle Mines',
                        content: `
                            <h3>⛏️ THE BEGINNING OF EVERYTHING</h3>
                            <p>Idle Mines is the beginning of our entire ecosystem. Here you will build a strong base of resource production to speed up your performance in Ascendria.</p>
                            
                            <h3>What you can do in Idle Mines:</h3>
                            <ul>
                                <li>Collect resources actively and inactively</li>
                                <li>Evolve your mine to increase its production power</li>
                                <li>Evolve your pickaxe to increase its extraction power</li>
                                <li>Evolve active and passive skills</li>
                                <li>Craft items that will help your progress in Ascendria</li>
                            </ul>
                            
                            <h3>🏆 Why Play Idle Mines?</h3>
                            <p>Playing IDLE MINES is the only way to achieve some of the most valuable conquests in the ecosystem and be recognized by the community.</p>
                            
                            <p>Playing IDLE MINES during the excavation to find Ascendria will allow the user to acquire a miner who, upon the launch of Ascendria, will become a <strong>sworn Genesis Ascender (Witness of the Fall)</strong> who will stand out in the global event <strong>The Return of Nihil</strong> by applying <strong>5% more damage to Nihil</strong>, the most coveted event in the ecosystem.</p>
                            
                            <p>Playing IDLE MINES will make you have <strong>up to 3x more energy</strong> than a casual player who does not invest in Idle Mines.</p>
                            
                            <p>Playing IDLE MINES enables you to find card pieces to create your competitive deck for <strong>Cardinal Rows</strong> (a competitive card game) and you will have the chance to win prizes in the championships that will be developed, with rewards of <strong>UNIQUE NFTs</strong> and even <strong>USDC</strong>.</p>
                            
                            <p>Playing IDLE MINES is participating in the beginning of a very great story that is just getting started!</p>
                            
                            <h3>⚡ Play Idle Mines and mine advantages for your journey!</h3>
                            
                            <p><em>Enjoy!</em></p>
                            
                            <p><strong>Note:</strong> Miners can only be acquired during the event "Toward Ascendria."</p>
                        `
                    },
                    {
                        id: 'cardinals',
                        icon: '/assets/images/ecosystem/cardnals_row.webp',
                        label: 'CARDINALS ROW',
                        title: 'Cardinals Row',
                        content: `
                            <p><strong>Cardinals Row</strong> is a competitive card game inspired by Triple Triad from the acclaimed Final Fantasy VIII. I, the developer and owner of the project, loved this game in my adolescence and wanted to bring this sweet memory to our ecosystem.</p>
                            
                            <p>Throughout the journey to Ascendria, we will have many, many championships with exclusive prizes to stir up the community!</p>
                            
                            <h3>How to Get Cards</h3>
                            <p>While mining in <strong>Idle Mines</strong>, you have a chance to acquire card pieces. For every <strong>4 card pieces</strong> found, you can take them to <strong>Jano, The Cartographer</strong>, and request a card repair. He will charge you <strong>1 Lumenstone</strong> for the service, and you will receive a card pack.</p>
                            
                            <p>Upon opening the pack, you will receive one of the <strong>50 cards</strong> from the initial collection. If you are very lucky, the cards can even come in maximum rarity levels — but that is very rare!</p>
                            
                            <h3>Card Evolution</h3>
                            <p>Cards can be upgraded with <strong>Jano, The Cartographer</strong>. You can use identical cards to evolve the card's rarity, with a <strong>50% chance of success</strong>. After all, not everything is perfect.</p>
                            
                            <h3>Trading & Future</h3>
                            <p>Card packs can be sold for <strong>SPARK</strong>, our premium currency, in an OFF-CHAIN marketplace through P2P negotiation.</p>
                            
                            <p>In the future, when <strong>Ascendria – Champions of Ascendria</strong> is launched and we implement the WEB3 mechanics, the cards can be transformed into <strong>NFTs</strong> and sold on the ON-CHAIN marketplace for real money!</p>
                            
                            <p><em>Enjoy the journey to Ascendria!</em></p>
                        `
                    },
                    {
                        id: 'champions',
                        icon: '/assets/images/ecosystem/champions.webp',
                        label: 'CHAMPIONS',
                        title: 'Champions of Ascendria',
                        content: `
                            <p>The launch of <strong>Champions of Ascendria</strong> will be a historic milestone in our ecosystem. It will bring with it all the <strong>WEB3 mechanics</strong>. From then on, it will be possible to transform your <strong>OFF-CHAIN items into ON-CHAIN items</strong>. Everything you have crafted can be transformed into an NFT and sold on the ON-CHAIN marketplace.</p>

                            <h3>🔥 THE OATH EVENT</h3>
                            <p>We will have the <strong>UNIQUE Oath Event</strong> where your miner will choose to follow the path of Light and defend Ascendria, and your miner will become a <strong>unique Genesis NFT</strong>! With a passive ability called <strong>"Witness of the Fall"</strong>!</p>

                            <h3>✨ PRIMORDIAL COLLECTION</h3>
                            <p>We will also have the mint of our <strong>PRIMORDIAL collection</strong>! Those who are already in the project will have advantages in acquiring it and perhaps getting ahead with a <strong>Mythic Ascender</strong>!</p>

                            <h3>🎫 STAKE SYSTEM</h3>
                            <p>We will implement <strong>Stake and Unstake</strong>. To play Ascendria, you will need to put your Ascender into Stake, and the Ascenders from the <strong>Genesis and Primordial collections</strong> will receive a number of Tickets for the monthly Raffle every 7 days of Staking. This number of tickets will correspond to the rarity of your Ascender NFT.</p>

                            <h3>📈 NFT EVOLUTION</h3>
                            <p>Ascender NFTs, even though they start at the lowest rarity level, can reach the <strong>Mythic rarity level</strong> where there is no maximum level limit, but it's a long journey until then! Ascendria is not a stroll, but a long journey of sweat, effort, conquests, and victories.</p>
                            <p>Your <strong>Ascender NFTs will be evolvable</strong>. This means you can also add value to them simply with your playtime, selling them later with a higher rarity or a higher level. The possibilities are endless.</p>

                            <h3>⚔️ PVP BATTLE SYSTEM</h3>
                            <p>Champions of Ascendria will bring with it a <strong>PVP format</strong>, both group and solo, where the battle system will be a <strong>top-down with Grid and turns</strong>. We will have RPG elements, and dice will be rolled to determine players' initiative.</p>
                            <p>The grid is fully walkable. The secret is that each cell has unique characteristics that can facilitate or hinder your movement, help you defend or dodge an attack, or recover some of your health. Many mechanics will be implemented to make the battles epic.</p>
                            <p>The maps will be <strong>procedurally generated</strong>, and players will spawn in random areas on the map. Furthermore, <strong>Nihil</strong> also appears after a specific number of rounds to consume the grid row by row until only one winning team, or a single player, remains on the board.</p>

                            <h3>🏆 RANKINGS & ECONOMY</h3>
                            <p>The game's economy will revolve around the <strong>ranking prizes</strong>, and no one will want to be left out. The one who plays the most and has good strategies is the one who will reach the highest level and get their hands on the pot of gold!</p>

                            <h3>🗡️ WEAPONS & ABILITIES</h3>
                            <p>When evolving your Ascenders (NFTs), you can define your strategy by choosing your character's attributes, but the abilities will be those your weapons possess. Each weapon has a set of <strong>random abilities</strong>, and you must rely on luck or persistence to get your desired ability kit for your favorite weapon.</p>
                            <p>We will have <strong>short, medium, and long-range weapons</strong> for all available archetypes. You are free to choose your path.</p>

                            <h3>👹 THE RETURN OF NIHIL</h3>
                            <p>Champions of Ascendria is also home to the global event <strong>The Return of Nihil</strong>, where Nihil the Devoured enters the gates of Ascendria when the seal is weakened, and then begins to drain and paralyze the entire economy of Ascendria. The Ascenders have no choice but to face him, but there is one catch: <strong>Nihil is very powerful and he absorbs your EXPERIENCE</strong> every time you attack him. However, there are great rewards for those who dare to attack him!</p>
                            <p>Those who attack Nihil will receive an <strong>EXP gain bonus for 24 hours</strong>, and every attack on Nihil has a chance to acquire <strong>Shining Fragments</strong>! (During the Return of Nihil, every Shining Fragment dropped is absorbed by Nihil.)</p>
                            <p>And for the one who delivers the <strong>final blow to Nihil</strong>, glory remains! This champion has a <strong>10% chance to acquire a Mythic card of Nihil the Devoured</strong>. The champion is also reserved <strong>20% of all EXP and Shining Fragments</strong> drained by Nihil. The rest is divided among everyone who attacked Nihil, and the reward is according to the percentage of damage dealt to him.</p>
                            <p><em>Note: Nihil returns 80% of everything he absorbed during the event after being killed; this 80% is what will be rewarded.</em></p>

                            <h3>🤖 HUMANOID AUTOMATA</h3>
                            <p>The NPCs from Idle Mines will be replaced by <strong>Humanoid Automata</strong>. The functions continue, but now the NPCs will inhabit Ascendria and receive new abilities.</p>

                            <h3>⚗️ CRAFTING & MARKETPLACE</h3>
                            <p>It will be possible to craft <strong>Energy Potions</strong> that can be sold on the ON-CHAIN market. Basically, everything created can be transformed into an NFT.</p>

                            <h3>💰 SUSTAINABLE ECONOMY</h3>
                            <p>All of Ascendria's currencies will be deposited from the Mint. There will be <strong>no currency inflation</strong> because the currencies will not be created out of thin air; as previously stated, they will be deposited into the reward pools. Therefore, everything within Ascendria will have intrinsic value, even if it's small in the most common currency, but your time and effort will always have value.</p>
                            <p>The economy will also be monitored by the <strong>Banker</strong>, who will manage the reward Pools, potentially even suspending better-paying missions until the Ecosystem returns to normalcy.</p>
                            <p>Our economy is <strong>100% cyclical</strong>. Currencies are always going to and returning from the pools. Our compensation system between the NPCs will balance the price of fees so that everyone can have their profits within the project without breaking it, and this is not just a dream—it is just good old math, with the help of economic simulators and a lot of time invested to make Ascendria a project different from the rest.</p>
                        `
                    },
                    {
                        id: 'forges',
                        icon: '/assets/images/ecosystem/forges.webp',
                        label: 'FORGES',
                        title: 'Forges of Ascendria',
                        content: `
                            <p>After the Discovery of Ascendria, the excavation did not end, and one of the miners found an <strong>advanced portal</strong> in a tunnel within the Mines. This portal led to another dimension, to safe and prosperous lands where it was possible to produce and create new things.</p>
                            <p>Each person who entered the portal went to a different environment, as if that environment were conducive: some were sent to lands rich in different ores used to produce things, others to places with fruits, others to lands with lakes, cotton fields, and so on.</p>

                            <h3>🏠 LAND OWNERSHIP</h3>
                            <p>This created a new economy in Ascendria. Now, in <strong>Forges of Ascendria</strong>, it is possible to own <strong>Lands</strong>, and each of these Lands produces something and gives you the opportunity to create and train in a profession.</p>
                            <p>Each account can have as many Lands as desired, but they need to be <strong>Staked</strong> to be used in the game. Upon entering the portal within Ascendria, an option will appear where you can choose which Land you wish to access.</p>

                            <h3>🛠️ PROFESSIONS</h3>
                            <p>The professions vary between creators of consumable resources and semi-durable resources. You can be:</p>
                            <ul>
                                <li>A creator of <strong>magic potions</strong></li>
                                <li>A cook of <strong>nutritious foods</strong></li>
                                <li>A <strong>Leather and Cotton Craftsman</strong></li>
                                <li>A <strong>Blacksmith</strong></li>
                            </ul>

                            <h3>🤖 MNEMON'S NEW ROLE</h3>
                            <p>With the emergence of Forges of Ascendria, <strong>Mnemon gains a new function</strong>. Now the player can hire a professional and pay them to be Mnemon's assistant during the creation of their items. The level of increase depends on the skill of each professional.</p>
                            <p>Now, in addition to being a warrior, our Ascenders can be professionals, because one cannot live only by fighting and battling one's whole life. Life must have other flavors, and Forges comes to add a lot of flavor.</p>
                            <p>Mnemon now stops selling weapon boxes and starts only <strong>producing weapons with the players</strong>.</p>

                            <h3>🏆 NEW RANKING</h3>
                            <p>With the arrival of Forges, we will have a <strong>new Ranking</strong> that will reward the biggest negotiators in the marketplace.</p>

                            <h3>⚔️ STRONGER WEAPONS</h3>
                            <p>With Forges, the weapons that will be used in the content of <strong>Ascendria – Champions of Ascendria</strong> will be much stronger; they will be weapons created by someone.</p>

                            <h3>🌟 RESOURCE PRODUCERS</h3>
                            <p>Forges comes to add another special layer to our ecosystem. It transforms players who previously only acquired and used the ecosystem's currencies into <strong>resource producers</strong>, now focused on players who enjoy farm and resource administration, and who can genuinely profit from their <strong>Land NFT</strong>.</p>
                            <p>Most importantly, the same NFT will have a <strong>different experience bar</strong> for the Forges module; here it will progress as it performs actions related to the chosen profession.</p>

                            <h3>🧪 CONSUMABLE ITEMS</h3>
                            <p>Energy potions to perform actions, life potions to recover health during a battle, foods that grant bonuses for a certain time. They are <strong>single-use</strong>, and the item is consumed.</p>

                            <h3>🗡️ SEMI-DURABLE ITEMS</h3>
                            <p><strong>Weapons and Armors, Runes and Gems</strong> (Runes and Gems will only be added in the final module, Depth). These items will have durability and can be restored, but they will eventually be destroyed at some point.</p>
                            <p>The level of durability and the chance of restoration are defined by the <strong>skill of the Player</strong> who created the item. Every created item receives the <strong>name of its creator</strong>.</p>

                            <h3>⭐ BE THE BEST CRAFTSMAN</h3>
                            <p>Increase your skill level and be sought after by grinders to craft weapons for them. <strong>Be the best!</strong></p>

                            <p><em>Note: Making decisions in Forges, just as in Champions, consumes base energy (the one that recharges), and creations depend on Energy Fluid to activate the creation platform. To add the Energy Fluid to the creation platform, simply add the necessary quantity of Energy Generators to create the item in question.</em></p>
                        `
                    },
                    {
                        id: 'depths',
                        icon: '/assets/images/ecosystem/depths.webp',
                        label: 'DEPTHS',
                        title: 'Depths of Ascendria',
                        content: `
                            <p>After a long time of excavation, the miners were going deeper and deeper, and one day, one of our miners felt a force resonate behind the stones at the touch of the pickaxe. Upon summoning others who came to help, a <strong>crack of reddish light</strong> emerged that illuminated the entire excavation tunnel—they had found another portal. This one now looked terrifying.</p>
                            <p><strong>King Aethernus</strong> and his entourage went to investigate, and upon entering the portal, they saw what it was: an <strong>underground kingdom</strong>, as if they were entering the Depths of Ascendria. This kingdom was the opposite of Ascendria; it was dark and somber while Ascendria radiated power like a great sun.</p>

                            <h3>⚔️ THE ULTIMATE CHALLENGE</h3>
                            <p>Opportunities open up for those who have trained, raised their Ascenders to the maximum level they could, strengthened their weapons and armor, and now have reached the <strong>Depths of Ascendria</strong>.</p>

                            <h3>💎 INDESTRUCTIBLE ITEMS</h3>
                            <p>With the arrival of Depth of Ascendria, many things will change. We will have <strong>unique and extraordinary items</strong>. For the first time in Ascendria, it will be possible to turn a perfected semi-durable item into an <strong>indestructible one</strong>!</p>
                            <p>For the first time, it will be possible to have that item you've searched for so long, with the ideal ability kit for your playstyle, <strong>forever</strong>!</p>

                            <h3>🔮 NEW CRAFTING: RUNES & GEMS</h3>
                            <p>New Crafting mechanics will be added to Forges:</p>
                            <ul>
                                <li><strong>Ancient Runes</strong> are found in the dungeons; they are used to enchant armors</li>
                                <li><strong>Gems</strong> can also be found; they enchant weapons</li>
                                <li><strong>Unique recipes</strong> for powerful abilities can now be enchanted onto your indestructible weapons and armors</li>
                            </ul>

                            <h3>🐾 PETs MECHANIC</h3>
                            <p>Everything changes. Depth of Ascendria brings the <strong>PETs mechanic</strong>, where this NFT will help you find more valuable items within the mines.</p>
                            <p>They say the chances of finding something in this dark world without the help of a pet are close to <strong>0</strong>! But there are those who may try anyway.</p>

                            <h3>🌟 THE COMPLETE ECOSYSTEM</h3>
                            <p>With Depth of Ascendria, our ecosystem will be <strong>complete</strong>. After the launch of this expansion, we can think about what comes next: more seasonal events? New expansions?</p>
                            <p><em>Forge your own path in Ascendria and live to tell your stories.</em></p>
                        `
                    }
                ]
            },
            community: {
                icon: '/assets/images/ecosystem/community.webp',
                label: 'COMMUNITY',
                title: 'Community Hub',
                hasSubmenu: true,
                submenu: [
                    {
                        id: 'external_impulse',
                        icon: '/assets/images/ecosystem/external_impulse.webp',
                        label: 'EXTERNAL IMPULSE',
                        title: 'External Impulse',
                        content: `
                            <p>After analyzing many projects, we saw that the majority seek external investment to boost their projects. This model has its pros and cons. At first, it is very good: the team can work smoothly with their salaries paid, prizes are offered to the community for participating in the project, instant events are created, among other benefits.</p>
                            <p>However, the price of this in the long term is heavy. Every investor wants to make a profit, and as time goes by, investors want their share of the project, thus beginning a <strong>cycle of intense extraction</strong> which consequently culminates in the end of the project in the overwhelming majority of cases.</p>

                            <h3>🌱 SUSTAINABLE MODEL</h3>
                            <p>In Ascendria, we opted for a more sustainable model where we will not have an extractive model, but we rely on the community to keep funds entering the project, even if new players do not join.</p>
                            <p>To this end, we created the <strong>External Impulse system</strong> where <strong>70% of the profits</strong> from ADS / YOUTUBE / TIKTOK will return to our reward pools and project maintenance.</p>

                            <h3>🎯 LONG-TERM VISION</h3>
                            <p>The team is interested in developing a project that lasts for <strong>years</strong>, and not just a few months as we have seen in the market. This model will ensure that Ascendria survives even in times of crisis, all with the support of the community just by watching ADS freely.</p>
                            <p>Everyone who watches will receive their payment based on what they produced within our platform. And they will also be able to compete for better prizes. We are not talking about making anyone rich with this system; it was created only to keep <strong>Ascendria's doors open</strong> and the reward Pools always well-stocked.</p>

                            <h3>📈 COMMUNITY-DRIVEN GROWTH</h3>
                            <p>The larger the community, and the greater the participation, the larger the prizes will be. We believe that <strong>sharing the profits</strong> with our community will make everyone feel like a participant in this ecosystem.</p>

                            <h3>❓ WHY 70%?</h3>
                            <p>We will have a team that will create content entirely for our platforms, which demands time and resources. This <strong>30%</strong> will be directed towards that.</p>

                            <h3>📊 TRANSPARENCY</h3>
                            <p>We will have a <strong>monthly report and balance sheet live</strong> regarding the revenues acquired via ADS.</p>
                            <p>The community will be fully aware of everything: values received, deductible taxes, and the value allocated to the reward pools and payment for individual contribution.</p>
                            <p>All revenue will be <strong>auditable</strong> and can be accessed later by members who hold the rank of <strong>Elder Council</strong> (lvl 100 on Discord).</p>

                            <p><em>In Ascendria, we are all one, and thus even competitiveness becomes healthy!</em></p>
                            <p><strong>Fight for first place! Let's move forward!</strong></p>
                        `
                    },
                    {
                        id: 'marketplace',
                        icon: '/assets/images/ecosystem/market_place.webp',
                        label: 'MARKETPLACE',
                        title: 'Marketplace',
                        content: `
                            <p>The Ascendria Ecosystem will feature <strong>2 Marketplace models</strong>.</p>

                            <h3>🔷 OFF-CHAIN MARKETPLACE</h3>
                            <p>Where crafted items can be sold for <strong>SPARKs</strong> from player to player.</p>

                            <h3>🔶 ON-CHAIN MARKETPLACE</h3>
                            <p>Where enchanted items can be sold on the official <strong>RONIN network</strong> marketplace.</p>

                            <h3>🎫 DIMENSIONAL PASS</h3>
                            <p>To access the Marketplaces, you need to own the <strong>Dimensional Pass</strong>, which will allow the transit of ecosystem items from Ascendria to the real world.</p>

                            <h3>💰 FEES</h3>
                            <ul>
                                <li><strong>OFF-CHAIN Marketplace:</strong> No fees on sales or ad placement</li>
                                <li><strong>ON-CHAIN Marketplace:</strong> Usual Ronin network fees + 5% (4% used to pay team's operational salaries after launch of Champions of Ascendria and 1% for monthly raffle.)</li>
                            </ul>

                            <p><em>Note: The on-chain marketplace will only be released with the launch of Ascendria – Champions of Ascendria, while the off-chain marketplace will be released with the Idle Mines module.</em></p>

                            <p><strong>Good business!</strong></p>
                        `
                    },
                    {
                        id: 'nfts',
                        icon: '/assets/images/ecosystem/nfts.webp',
                        label: 'NFTs',
                        title: 'NFT Collection',
                        content: `
                            <p>In our Ecosystem, we will have <strong>ERC-721 NFTs</strong> (ASCENDERS, LANDS, and PETS) and <strong>ERC-1155 NFTs</strong> (RESOURCES).</p>
                            <p>The WEB 3 systems will be added with the arrival of <strong>Ascendria – Champions of Ascendria</strong>. However, this does not mean you won't be monetizing your earnings from the start, because everything you create during the <strong>"Toward Ascendria" Event</strong> can be transformed into sellable NFTs with the arrival of Ascendria.</p>

                            <h3>⛏️CONVERSION FROM MINER TO SWORN ASCENDER</h3>
                            <p>The Miners can only be acquired during the "Toward Ascendria" event, and all their progress will be utilized. Depending on the evolution of your pickaxe, you can receive a Sworn Ascender NFT of up to <strong>EPIC</strong> level:</p>
                            <table style="width:100%; border-collapse: collapse; margin: 1rem 0;">
                                <tr style="background: rgba(0,0,0,0.1);"><th style="padding: 0.5rem; text-align: center; width: 50%;">Miner Rarity</th><th style="padding: 0.5rem; text-align: center; width: 50%;">Sworn Ascender Rarity</th></tr>
                                <tr><td style="padding: 0.5rem; text-align: center;">Mythic Pickaxe</td><td style="padding: 0.5rem; text-align: center;"><strong>Epic Oath Stone</strong></td></tr>
                                <tr><td style="padding: 0.5rem; text-align: center;">Legendary Pickaxe</td><td style="padding: 0.5rem; text-align: center;"><strong>Epic Oath Stone</strong></td></tr>
                                <tr><td style="padding: 0.5rem; text-align: center;">Epic Pickaxe</td><td style="padding: 0.5rem; text-align: center;"><strong>Rare Oath Stone</strong></td></tr>
                                <tr><td style="padding: 0.5rem; text-align: center;">Rare Pickaxe</td><td style="padding: 0.5rem; text-align: center;"><strong>Common Oath Stone</strong></td></tr>
                                <tr><td style="padding: 0.5rem; text-align: center;">Common Pickaxe</td><td style="padding: 0.5rem; text-align: center;"><strong>Common Oath Stone</strong></td></tr>
                            </table>

                            <h3>👑 GENESIS ASCENDERS</h3>
                            <p>The Sworn Ascenders can only be acquired by obtaining the miner during the "Toward Ascendria" event. When Champions of Ascendria arrives, the <strong>OATH function</strong> will be released at the King Aethernus NPC, and your off-chain asset will be transformed into a <strong>Genesis Ascender Crystal {rarity}</strong>.</p>
                            <p>Your Sworn Ascender NFT will have a passive buff called <strong>"Witness of the Fall"</strong>. Since your character is theoretically a member of the city of Aurelia that was destroyed by Nihil, you observed the dragon in action and know some of its weak points, guaranteeing you <strong>5% more damage to Nihil</strong>.</p>

                            <h3>🔷 ERC-1155 NFTs (Resources)</h3>
                            <ul>
                                <li>Cardinal Rows Cards</li>
                                <li>Repeated Relics</li>
                                <li>Capacitors</li>
                                <li>Lumenstone</li>
                                <li>Energy Generators</li>
                                <li>Ascension Stones</li>
                                <li>Weapons, Armor, Food, Potions, Recipes, Runes, and Gems</li>
                            </ul>

                            <h3>🔶 Native ERC-721 NFT Collections</h3>
                            <ul>
                                <li><strong>BASIC ASCENDERS Collection</strong> – Post-launch of Champions of Ascendria</li>
                                <li><strong>PRIMORDIAL ASCENDERS Collection</strong> – Launch of Champions of Ascendria</li>
                                <li><strong>GENESIS LANDS Collection</strong> – Launch of Forges of Ascendria</li>
                                <li><strong>GENESIS PETS Collection</strong> – Launch of Depth of Ascendria</li>
                            </ul>

                            <p>The ERC-721 NFTs will be eligible to participate in the <strong>monthly raffle</strong> when they are in Stake. (More details in the STAKE session).</p>

                            <p><em>This is what we have to share for now. The menus will be added as the ecosystem evolves. Be part of this journey!</em></p>
                        `
                    },
                    {
                        id: 'staking',
                        icon: '/assets/images/ecosystem/staking.webp',
                        label: 'STAKING',
                        title: 'Staking & Rewards',
                        content: `
                            <p>Staking will be an important tool in our ecosystem. For you to use the NFTs within our ecosystem, <strong>they must be in STAKE</strong>.</p>

                            <h3>🎫 MONTHLY RAFFLE SYSTEM</h3>
                            <p>All <strong>ERC-721 NFTs</strong> will be eligible to participate in the monthly raffle. For every <strong>7 uninterrupted days</strong> of Staking, you receive a quantity of numbers for the monthly raffle.</p>
                            <p>This quantity will be based on your NFT's <strong>Rarity + Level</strong>:</p>

                            <table style="width:100%; border-collapse: collapse; margin: 1rem 0;">
                                <tr style="background: rgba(0,0,0,0.1);"><th style="padding: 0.5rem; text-align: center; width: 50%;">NFT Rarity</th><th style="padding: 0.5rem; text-align: center; width: 50%;">Tickets Formula</th></tr>
                                <tr><td style="padding: 0.5rem; text-align: center;">Mythic NFT</td><td style="padding: 0.5rem; text-align: center;"><strong>Level × 3</strong></td></tr>
                                <tr><td style="padding: 0.5rem; text-align: center;">Legendary NFT</td><td style="padding: 0.5rem; text-align: center;"><strong>Level × 2</strong></td></tr>
                                <tr><td style="padding: 0.5rem; text-align: center;">Epic NFT</td><td style="padding: 0.5rem; text-align: center;"><strong>Level × 1.5</strong></td></tr>
                                <tr><td style="padding: 0.5rem; text-align: center;">Rare NFT</td><td style="padding: 0.5rem; text-align: center;"><strong>Level × 1</strong></td></tr>
                                <tr><td style="padding: 0.5rem; text-align: center;">Common NFT</td><td style="padding: 0.5rem; text-align: center;"><strong>Level × 0.5</strong></td></tr>
                            </table>

                            <h3>🏆 MONTHLY PRIZES</h3>
                            <p>Our monthly raffle will have varied prizes, and there will be <strong>100 winners every month</strong>.</p>
                            <p>After the launch of Champions of Ascendria, prizes may vary between:</p>
                            <ul>
                                <li><strong>USDC</strong></li>
                                <li><strong>NFTs</strong></li>
                                <li><strong>WLs from partner projects</strong></li>
                                <li>And more!</li>
                            </ul>

                            <h3>💰 PRIZE POOL</h3>
                            <p>The value that will be made available for the monthly raffle prize pool is <strong>1% of everything generated in marketplace fees</strong>.</p>
                            <p>Therefore, the more movement on the on-chain marketplace, the larger the prize pool, and the more users in our community, the larger the prize pool.</p>

                            <p><strong>Keep your special assets in Stake and compete for unique prizes!</strong></p>
                        `
                    }
                ]
            }
        };
        
        this.init();
    }
    
    init() {
        this.createStructure();
        this.bindEvents();
    }
    
    createStructure() {
        // Graph View com os nós principais
        this.graphView = document.createElement('div');
        this.graphView.className = 'ecosystem-graph';
        
        // Container para os 3 nós principais (triângulo)
        const nodesContainer = document.createElement('div');
        nodesContainer.className = 'eco-nodes-triangle';
        
        // Container para as setas
        const arrowsContainer = document.createElement('div');
        arrowsContainer.className = 'eco-arrows';
        arrowsContainer.innerHTML = `
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon class="eco-arrow-head" points="0 0, 10 3.5, 0 7" />
                    </marker>
                </defs>
                <!-- Rankings -> Community -->
                <line class="eco-arrow-line" x1="58" y1="28" x2="68" y2="48" marker-end="url(#arrowhead)" />
                <!-- Community -> Ascendria -->
                <line class="eco-arrow-line" x1="32" y1="62" x2="68" y2="62" marker-end="url(#arrowhead)" />
                <!-- Ascendria -> Rankings -->
                <line class="eco-arrow-line" x1="32" y1="48" x2="42" y2="28" marker-end="url(#arrowhead)" />
            </svg>
        `;
        nodesContainer.appendChild(arrowsContainer);
        
        // Criar apenas os 3 nós principais
        Object.keys(this.modules).forEach(key => {
            const module = this.modules[key];
            const node = document.createElement('div');
            node.className = 'eco-node';
            node.dataset.node = key;
            node.innerHTML = `
                <img class="eco-node-icon" src="${module.icon}" alt="${module.label}" />
            `;
            nodesContainer.appendChild(node);
        });
        
        this.graphView.appendChild(nodesContainer);
        
        // Detail View
        this.detailView = document.createElement('div');
        this.detailView.className = 'ecosystem-detail';
        this.detailView.innerHTML = `
            <div class="detail-header">
                <img class="detail-icon" src="" alt="" />
                <h2 class="detail-title"></h2>
            </div>
            <div class="detail-content"></div>
        `;
        
        // Criar botão Home (volta para os 3 menus principais)
        this.homeButton = document.createElement('button');
        this.homeButton.className = 'detail-home';
        this.homeButton.setAttribute('aria-label', 'Início');
        this.homeButton.setAttribute('type', 'button');
        this.homeButton.innerHTML = `<img src="/assets/images/ecosystem/home.webp" alt="Home" />`;
        this.detailView.insertBefore(this.homeButton, this.detailView.firstChild);
        
        // Criar botão Back (volta para página anterior)
        this.backButton = document.createElement('button');
        this.backButton.className = 'detail-back';
        this.backButton.setAttribute('aria-label', 'Voltar');
        this.backButton.setAttribute('type', 'button');
        this.backButton.innerHTML = `<img src="/assets/images/ecosystem/back.webp" alt="Voltar" />`;
        this.detailView.insertBefore(this.backButton, this.detailView.firstChild);
        
        // Adicionar ao container
        this.container.appendChild(this.graphView);
        this.container.appendChild(this.detailView);
    }
    
    bindEvents() {
        // Clique nos nós
        this.container.querySelectorAll('.eco-node').forEach(node => {
            node.addEventListener('click', (e) => {
                const nodeKey = node.dataset.node;
                if (nodeKey && this.modules[nodeKey]) {
                    this.openModule(nodeKey);
                }
            });
        });
        
        // Botão Home - volta para os 3 menus principais
        if (this.homeButton) {
            this.homeButton.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeModule();
            };
        }
        
        // Botão Back - volta para a página anterior (submenu -> menu principal)
        if (this.backButton) {
            this.backButton.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (this.currentModule) {
                    this.goBackToSubmenu();
                }
            };
        }
        
        // Recalcular linhas no resize
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {}, 200);
        });
    }
    
    async openModule(moduleKey) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.currentModule = moduleKey;
        
        const module = this.modules[moduleKey];
        
        // Esconder botão back no menu principal
        this.backButton.classList.remove('visible');
        
        // Preencher conteúdo do detalhe ANTES da animação
        const detailIcon = this.detailView.querySelector('.detail-icon');
        detailIcon.src = module.icon;
        detailIcon.alt = module.label;
        this.detailView.querySelector('.detail-title').textContent = module.title;
        
        // Se tem submenu, mostrar submenu. Senão, mostrar conteúdo
        if (module.hasSubmenu && module.submenu) {
            this.detailView.querySelector('.detail-content').innerHTML = this.createSubmenuHTML(module.submenu);
            this.bindSubmenuEvents();
        } else {
            this.detailView.querySelector('.detail-content').innerHTML = module.content;
        }
        
        // Animação única: apaga graphView e revela detailView simultaneamente
        await this.transitionAnimation(this.graphView, this.detailView, () => {
            // No meio da animação, trocar as classes
            this.graphView.classList.add('hidden');
            this.detailView.classList.add('active');
        });
        
        this.isAnimating = false;
    }
    
    createSubmenuHTML(submenu) {
        let html = '<div class="submenu-grid">';
        submenu.forEach(item => {
            html += `
                <div class="submenu-item" data-submenu="${item.id}">
                    <img class="submenu-icon" src="${item.icon}" alt="${item.label}" />
                </div>
            `;
        });
        html += '</div>';
        return html;
    }
    
    bindSubmenuEvents() {
        this.detailView.querySelectorAll('.submenu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const submenuId = item.dataset.submenu;
                this.openSubmenuItem(submenuId);
            });
        });
    }
    
    async openSubmenuItem(submenuId) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        // Encontrar o item no submenu
        let foundItem = null;
        Object.keys(this.modules).forEach(key => {
            const module = this.modules[key];
            if (module.submenu) {
                const item = module.submenu.find(s => s.id === submenuId);
                if (item) foundItem = item;
            }
        });
        
        if (foundItem) {
            // Criar elemento temporário com novo conteúdo
            const tempContent = document.createElement('div');
            tempContent.className = 'detail-content-inner';
            tempContent.innerHTML = `
                <img class="detail-icon" src="${foundItem.icon}" alt="${foundItem.label}" />
                <h2 class="detail-title">${foundItem.title}</h2>
                <div class="detail-content">${foundItem.content}</div>
            `;
            
            // Animação única no mesmo elemento (troca conteúdo no meio)
            await this.transitionAnimation(this.detailView, this.detailView, () => {
                // No meio da animação, trocar o conteúdo e mostrar back
                this.backButton.classList.add('visible');
                const detailIcon = this.detailView.querySelector('.detail-icon');
                detailIcon.src = foundItem.icon;
                detailIcon.alt = foundItem.label;
                this.detailView.querySelector('.detail-title').textContent = foundItem.title;
                this.detailView.querySelector('.detail-content').innerHTML = foundItem.content;
            });
        }
        
        this.isAnimating = false;
    }
    
    async goBackToSubmenu() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        const module = this.modules[this.currentModule];
        
        // Animação única no mesmo elemento (troca conteúdo no meio)
        await this.transitionAnimation(this.detailView, this.detailView, () => {
            // No meio da animação, trocar o conteúdo e esconder back
            this.backButton.classList.remove('visible');
            const detailIcon = this.detailView.querySelector('.detail-icon');
            detailIcon.src = module.icon;
            detailIcon.alt = module.label;
            this.detailView.querySelector('.detail-title').textContent = module.title;
            this.detailView.querySelector('.detail-content').innerHTML = this.createSubmenuHTML(module.submenu);
            this.bindSubmenuEvents();
        });
        
        this.isAnimating = false;
    }
    
    async closeModule() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        // Esconder botão back
        this.backButton.classList.remove('visible');
        
        // Animação única: apaga detailView e revela graphView simultaneamente
        await this.transitionAnimation(this.detailView, this.graphView, () => {
            // No meio da animação, trocar as classes
            this.detailView.classList.remove('active');
            this.graphView.classList.remove('hidden');
        });
        
        this.currentModule = null;
        this.isAnimating = false;
    }
    
    async transitionAnimation(fromElement, toElement, onMiddle) {
        return new Promise((resolve) => {
            const duration = 1400; // ms - suave mas responsivo
            const startTime = performance.now();
            
            // Verificar se é o mesmo elemento (transição interna)
            const isSameElement = fromElement === toElement;
            
            // Preparar o elemento de destino (invisível no início) - só se for diferente
            if (toElement && !isSameElement) {
                toElement.style.maskImage = 'linear-gradient(135deg, transparent 0%, transparent 100%)';
                toElement.style.webkitMaskImage = 'linear-gradient(135deg, transparent 0%, transparent 100%)';
            }
            
            let middleCalled = false;
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                let progress = Math.min(elapsed / duration, 1);
                
                // Movimento linear - velocidade constante
                // (sem easing, progress já é linear)
                
                // A "onda" vai de 0 a 200% (para cobrir toda a diagonal)
                const wavePos = progress * 200;
                
                if (isSameElement) {
                    // Transição no mesmo elemento: onda passa, troca conteúdo, onda volta revelando
                    if (wavePos < 100) {
                        // Primeira metade: onda apaga (de cima-esquerda para baixo-direita)
                        const erasePos = wavePos;
                        fromElement.style.maskImage = `linear-gradient(135deg, transparent 0%, transparent ${erasePos - 10}%, rgba(0,0,0,1) ${erasePos}%, rgba(0,0,0,1) 100%)`;
                        fromElement.style.webkitMaskImage = `linear-gradient(135deg, transparent 0%, transparent ${erasePos - 10}%, rgba(0,0,0,1) ${erasePos}%, rgba(0,0,0,1) 100%)`;
                    } else {
                        // Trocar conteúdo quando a onda chegar no meio
                        if (!middleCalled && onMiddle) {
                            middleCalled = true;
                            onMiddle();
                        }
                        // Segunda metade: onda revela (conteúdo novo aparece de cima-esquerda para baixo-direita)
                        const revealPos = wavePos - 100;
                        fromElement.style.maskImage = `linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${revealPos - 10}%, transparent ${revealPos}%, transparent 100%)`;
                        fromElement.style.webkitMaskImage = `linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${revealPos - 10}%, transparent ${revealPos}%, transparent 100%)`;
                    }
                } else {
                    // Transição entre elementos diferentes
                    // O elemento antigo vai desaparecendo conforme a onda passa
                    if (fromElement) {
                        const erasePos = Math.min(wavePos, 150);
                        fromElement.style.maskImage = `linear-gradient(135deg, transparent 0%, transparent ${erasePos - 20}%, rgba(0,0,0,1) ${erasePos}%, rgba(0,0,0,1) 100%)`;
                        fromElement.style.webkitMaskImage = `linear-gradient(135deg, transparent 0%, transparent ${erasePos - 20}%, rgba(0,0,0,1) ${erasePos}%, rgba(0,0,0,1) 100%)`;
                    }
                    
                    // O elemento novo vai aparecendo logo atrás da onda (com pequeno delay)
                    if (toElement) {
                        const revealPos = Math.max(0, wavePos - 50); // Começa um pouco depois
                        toElement.style.maskImage = `linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${revealPos - 20}%, transparent ${revealPos}%, transparent 100%)`;
                        toElement.style.webkitMaskImage = `linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${revealPos - 20}%, transparent ${revealPos}%, transparent 100%)`;
                    }
                    
                    // Executar callback no meio da animação (para trocar classes)
                    if (!middleCalled && progress >= 0.3 && onMiddle) {
                        middleCalled = true;
                        onMiddle();
                    }
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // Limpar máscaras no final
                    if (fromElement) {
                        fromElement.style.maskImage = '';
                        fromElement.style.webkitMaskImage = '';
                    }
                    if (toElement && !isSameElement) {
                        toElement.style.maskImage = '';
                        toElement.style.webkitMaskImage = '';
                    }
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }
    
    // Easing: começa RÁPIDO, desacelera no meio, termina suave
    easeOutInQuad(t) {
        if (t < 0.5) {
            // Primeira metade: easeOut (começa rápido, desacelera)
            return 2 * t * (2 - 2 * t);
        } else {
            // Segunda metade: easeIn (acelera suavemente até o fim)
            const t2 = t - 0.5;
            return 0.5 + 2 * t2 * t2;
        }
    }
    
    easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    destroy() {
        window.removeEventListener('resize', this.handleResize);
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

/**
 * Ecosystem Title Scroll Reveal
 * Revela o título "Ecosystem" conforme o usuário rola a página
 */
class EcosystemTitleReveal {
    constructor() {
        this.title = document.querySelector('.ecosystem-title');
        this.ecosystemSection = document.querySelector('#ecosystem');
        this.contentArea = document.querySelector('#content-area');
        this.hasRevealed = false;
        
        if (this.title && this.ecosystemSection) {
            this.init();
        }
    }
    
    init() {
        // Usar o #content-area como scroll container (ou window se não existir)
        const scrollContainer = this.contentArea || window;
        
        // Flag para requestAnimationFrame
        this.ticking = false;
        
        // Checar posição inicial
        this.checkScroll();
        
        // Listener de scroll com requestAnimationFrame para evitar forced reflow
        scrollContainer.addEventListener('scroll', () => this.requestCheck(), { passive: true });
        
        // Também checar no resize
        window.addEventListener('resize', () => this.requestCheck(), { passive: true });
    }
    
    requestCheck() {
        if (!this.ticking) {
            this.ticking = true;
            requestAnimationFrame(() => this.checkScroll());
        }
    }
    
    checkScroll() {
        this.ticking = false;
        const scrollContainer = this.contentArea || document.documentElement;
        const scrollTop = this.contentArea ? this.contentArea.scrollTop : window.scrollY;
        
        // Pegar a posição da seção ecosystem
        const sectionRect = this.ecosystemSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calcular quanto da seção está visível
        // O título aparece quando o topo da seção entra na viewport
        const triggerPoint = viewportHeight * 0.7; // Quando 30% da seção está visível
        
        if (sectionRect.top < triggerPoint) {
            // Revelar o título
            if (!this.hasRevealed) {
                this.title.classList.add('visible');
                this.hasRevealed = true;
            }
        } else {
            // Esconder novamente se voltar ao topo
            if (this.hasRevealed) {
                this.title.classList.remove('visible');
                this.hasRevealed = false;
            }
        }
    }
}

// Inicialização automática quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.ecosystem-container');
    if (container) {
        window.ecosystemGraph = new EcosystemGraph(container);
    }
    
    // Inicializar revelação do título
    window.ecosystemTitleReveal = new EcosystemTitleReveal();
});

// Export para uso como módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EcosystemGraph;
}
