/**
 * financialmodel Interactive Timeline
 * Sistema de linha do tempo horizontal com nodes clicáveis e progresso baseado em data
 */

(function() {
'use strict';

class financialmodelTimeline {
  constructor() {
    this.container = document.querySelector('.financialmodel-container');
    if (!this.container) return;

    // Definição dos nodes da linha do tempo com datas
    // As datas determinam quando cada node é "alcançado" pela linha de progresso
    this.nodes = [
      { id: 'genesis', label: 'Genesis', icon: 'ascendria.webp', position: 'center', date: new Date('2025-12-04') }, // Data de lançamento
      { id: 'custom', label: 'Custom', icon: 'custom.png', position: 'top', date: new Date('2025-12-15') },
      { id: 'idle_mines', label: 'Idle Mines', icon: 'idle_mines.webp', position: 'bottom', date: new Date('2025-12-25') },
      { id: 'cardinals_row', label: 'Cardinals Row', icon: 'cardnals_row.webp', position: 'top', date: new Date('2026-01-25') },
      { id: 'championships', label: 'Championships', icon: 'championships.png', position: 'bottom', date: new Date('2026-02-25') },
      { id: 'champions', label: 'Champions', icon: 'champions.webp', position: 'top', date: new Date('2026-08-25') },
      { id: 'forges', label: 'Forges', icon: 'forges.webp', position: 'bottom', date: new Date('2027-02-25') },
      { id: 'depths', label: 'Depths', icon: 'depths.webp', position: 'top', date: new Date('2027-08-25') },
      { id: 'future', label: 'Future', icon: 'future.png', position: 'center', date: new Date('2030-12-25') }
    ];

    // Conteúdo dos módulos
    this.modules = {
      genesis: `
    <div class="roadmap-modal-content">
        <div style="border-bottom: 2px solid #8b5a2b; padding-bottom: 15px; margin-bottom: 20px; text-align: center;">
            <h3 style="margin: 0; color: #5c3d1e; font-size: 1.5em;">MANA WORKS</h3>
            <span style="font-size: 0.95em; color: #6b4423; letter-spacing: 1px;">THE FOUNDERS' MANIFESTO</span>
        </div>

        <p style="color: #5c3d1e; line-height: 1.7; font-size: 1.05em;">
            Ascendria is not a random project without foundation or purpose; it is the flagship endeavor of <strong>Mana Works</strong>.
        </p>
        
        <p style="color: #6b4423; line-height: 1.7; font-size: 1em;">
            Mana Works was born from a childhood dream: the desire to be a creator of universes. Throughout life, we realized that enduring projects must be built on solid ground. That is why Mana Works has been laboring since May 2025 on the Ascendria project.
        </p>
        
        <p style="color: #6b4423; line-height: 1.7; font-size: 1em;">
            Initially, the idea of an Ecosystem—a world of our own where people could have fun and even profit—seemed remote. So, we decided to do what we do best: work. After countless brainstorming sessions, the GDDs (Game Design Documents) began to turn into reality. However, building an Ecosystem is not simple; it depends on many variables. Even choosing the right tools took time and careful thought.
        </p>

        <h4 style="color: #5c3d1e; margin-top: 25px; margin-bottom: 10px; font-size: 1.15em;">The Strategic Pivot: Web 2.5</h4>
        <p style="color: #6b4423; font-size: 1em; line-height: 1.7;">
            We decided on a web-based architecture with a Unified Database, enabling item interoperability across our entire universe. Our initial idea was to launch directly as a pure Web3 project. However, we realized the costs to do so securely were prohibitively high for a bootstrapped team. We discarded that risk and focused on a <strong>Web 2.5 Hybrid Model</strong>—a project that shares its gains with the community until we have the conditions to launch our full Web3 structure with the quality and security everyone deserves.
        </p>
        
        <p style="color: #6b4423; font-size: 1em; line-height: 1.7;">
            <strong style="color: #5c3d1e;">Our Pillars:</strong> Integrity, Determination, Transparency, and Communication.
        </p>
        
        <p style="color: #6b4423; font-size: 1em; line-height: 1.7;">
            We believe that by focusing on a community-driven project, we must establish channels of transparency so that every step of the process can be monitored.
        </p>

        <h4 style="color: #5c3d1e; margin-top: 25px; margin-bottom: 10px; font-size: 1.15em;">Bootstrapping & The Call to Adventure</h4>
        <p style="color: #6b4423; font-size: 1em; line-height: 1.7;">
            Up to this point, we have paid for everything. It has been nearly 7 months of hard work funded entirely by the founders. We have carried the weight until now, but to continue, we need the community's support.
        </p>

        <div style="background: rgba(248, 250, 252, 0.7); border-left: 4px solid #166534; padding: 15px; margin: 20px 0; backdrop-filter: blur(4px);">
            <h4 style="margin: 0 0 10px 0; color: #166534; font-size: 1.15em;">Innovative Sustainability</h4>
            <p style="color: #6b4423; font-size: 1em; margin: 0;">
                We are introducing the <strong style="color: #166534;">"External Impulse"</strong>: a mechanism where the community helps us by engaging with our content (videos/ads) to generate external revenue.
            </p>
            <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #6b4423; font-size: 1em;">
                <li><strong style="color: #166534;">70%</strong> of this revenue returns directly to the Community Pool.</li>
                <li><strong style="color: #166534;">30%</strong> helps cover operational costs to keep the system running.</li>
            </ul>
            <p style="color: #6b4423; font-size: 1em; margin: 10px 0 0 0;">
                We have also designed a <strong style="color: #166534;">Non-Extractive Model</strong>. Post-launch, the team will receive only <strong style="color: #166534;">4%</strong> of marketplace fees. We believe in the power of the Web3 community: NFTs will appreciate, the cyclical system will function, and together—Community and Mana Works—we will profit in the long term.
            </p>
        </div>

        <h4 style="color: #5c3d1e; margin-top: 25px; margin-bottom: 10px; font-size: 1.15em;">The "Central Bank" Model (ACE)</h4>
        <p style="color: #6b4423; font-size: 1em; line-height: 1.7;">
            We are utilizing an economic model inspired by Central Banks. We will not arbitrarily mint coins. The Gold, Silver, and Bronze circulating in-game will have their values backed by <strong style="color: #5c3d1e;">USDC held in our Treasury</strong>.
        </p>
        <ul style="margin: 10px 0; padding-left: 20px; color: #6b4423; font-size: 1em;">
            <li>Every time the project pays Rankings in real money, in-game currency is burned.</li>
            <li>Conversely, every time revenue enters (Ads, New Players, Reinvestments), liquidity is created.</li>
            <li>The more activity in the ecosystem, the larger the Ranking Prizes.</li>
        </ul>

        <h4 style="color: #5c3d1e; margin-top: 25px; margin-bottom: 10px; font-size: 1.15em;">Longevity & Experience</h4>
        <p style="color: #6b4423; font-size: 1em; line-height: 1.7;">
            Our Project Manager brings extensive business experience. Ascendria is an ecosystem focused on profit distribution, carefully designed so that extractions do not exceed inputs—our NPCs will dynamically balance the marketplace to ensure stability.
        </p>
        <p style="color: #6b4423; font-size: 1em; line-height: 1.7;">
            The concept of an ecosystem strengthens Longevity. Members will have multiple ways to interact, preventing burnout: an Idle Game, a competitive TCG, a PvP Expansion, a Market/Management Expansion, and a PvE Expansion.
        </p>
        <p style="color: #6b4423; font-size: 1em; line-height: 1.7;">
            We have no interest in exhausting our members; we want you to feel reinvigorated and joyful for participating in something real.
        </p>

        <div style="margin-top: 30px; padding: 20px; background-color: rgba(241, 245, 249, 0.7); border-radius: 8px; text-align: center; backdrop-filter: blur(4px);">
            <p style="margin: 0; color: #1e3a8a; font-style: italic; font-weight: 600; font-size: 1.1em;">
                "We are just dreamers working hard to get somewhere. But with your support, we will go far. Alone we go fast, but together we are invincible."
            </p>
            <p style="margin-top: 15px; font-size: 1em; color: #1e3a8a;">
                Sincerely,
            </p>
            <p style="margin-top: 5px; font-size: 0.95em; color: #1e3a8a; font-weight: bold;">
                TEAM MANA WORKS
            </p>
        </div>
    </div>
      `,
      
      custom: `
    <div class="roadmap-modal-content">
        <div style="border-bottom: 2px solid #8b5a2b; padding-bottom: 15px; margin-bottom: 20px; text-align: center;">
            <h3 style="margin: 0; color: #5c3d1e; font-size: 1.5em;">PHASE 2: CUSTOM — IDENTITY & ALLOCATION</h3>
            <span style="font-size: 0.95em; color: #6b4423; font-weight: bold;">MILESTONE: PLATFORM LAUNCH — SITE + SOCIAL DASHBOARD</span>
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">1. The Product: Establishing Identity</h4>
        <p style="color: #6b4423; margin-bottom: 20px; font-size: 1em; line-height: 1.7;">
            Before the economy goes live, the community must establish itself. This phase marks the official launch of the <strong>Ascendria Social Dashboard</strong>.
            Users will secure their unique usernames, build persistent profiles, and acquire exclusive <strong>Social Skins</strong>.
            <br><em>This serves as the first stress test of our transactional infrastructure.</em>
        </p>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">2. The "Dual-Currency" Transparency Rule</h4>
        <p style="font-size: 1em; color: #6b4423; margin-bottom: 15px; line-height: 1.7;">
            To ensure ethical growth, we segregate funds to feed two distinct engines:
        </p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px;">
            <div style="background: rgba(248, 250, 252, 0.7); border-left: 4px solid #166534; padding: 15px; border-radius: 4px; backdrop-filter: blur(4px);">
                <strong style="color: #166534; display: block; margin-bottom: 5px;">💳 FIAT Revenue</strong>
                <span style="font-size: 1em; color: #6b4423;">
                    <strong style="color: #166534;">100% to Acceleration.</strong><br>
                    (Marketing, Servers, Team).<br>
                    <em>We use Fiat to bring new people in.</em>
                </span>
            </div>
            <div style="background: rgba(240, 253, 244, 0.7); border-left: 4px solid #166534; padding: 15px; border-radius: 4px; backdrop-filter: blur(4px);">
                <strong style="color: #166534; display: block; margin-bottom: 5px;">🔗 WEB3 Revenue</strong>
                <span style="font-size: 1em; color: #6b4423;">
                    <strong style="color: #166534;">100% to Prize Vault.</strong><br>
                    (Locked Reward Pools).<br>
                    <em>We use Crypto to reward those inside.</em>
                </span>
            </div>
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">3. The "Open Ledger" & Smart Routing</h4>
        <div style="background: rgba(255, 255, 255, 0.7); border: 1px solid #8b5a2b; padding: 15px; border-radius: 6px; margin-bottom: 20px; backdrop-filter: blur(4px);">
            <p style="color: #6b4423; font-size: 1em; margin: 0; line-height: 1.7;">
                We have no interest in hiding anything. Our vision is to operate today with the governance standards of a future public company (IPO).
                <br><br>
                <strong style="color: #5c3d1e;">Unified Ecosystem Advantage:</strong> Since all modules are interconnected, we track every cent. We use <strong style="color: #166534;">Smart Routing</strong> to ensure funds go to the correct Prize Pool based on user spending:
            </p>
            <ul style="margin-top: 10px; padding-left: 20px; color: #6b4423; font-size: 1em;">
                <li style="margin-bottom: 5px;"><strong style="color: #5c3d1e;">Social Spend:</strong> Sparks spent on Skins/Profiles → Added to the <strong style="color: #166534;">Social Ranking Pool</strong>.</li>
                <li style="margin-bottom: 5px;"><strong style="color: #5c3d1e;">Game Spend:</strong> Sparks spent on Game Modules → Added to that specific <strong style="color: #166534;">Module's Pool</strong>.</li>
            </ul>
            <div style="background: rgba(241, 245, 249, 0.7); padding: 10px; border-radius: 4px; margin-top: 15px; font-size: 1em; color: #6b4423;">
                <strong style="color: #5c3d1e;">Transparency Guarantee:</strong>
                <br>• Pools will be visible month-by-month until the <strong style="color: #166534;">"Road to Ascendria"</strong> (Season 1) payout.
                <br>• <strong style="color: #166534;">Monthly Reports</strong> will be published on Discord detailing all Fiat/Web3 inflows and outflows.
            </div>
        </div>

        <div style="margin-top: 30px; padding: 20px; background-color: rgba(241, 245, 249, 0.7); border-radius: 8px; text-align: center; backdrop-filter: blur(4px);">
            <p style="margin: 0; color: #1e3a8a; font-style: italic; font-weight: 600; font-size: 1.1em;">
                "We are just dreamers working hard to get somewhere, and with the support of God and the community, we will go far."
            </p>
            <p style="margin-top: 10px; font-size: 0.95em; color: #1e3a8a; font-weight: bold;">
                — Mana Works Team
            </p>
        </div>
    </div>
      `,
      
      idle_mines: `
    <div class="roadmap-modal-content">
        <div style="border-bottom: 2px solid #8b5a2b; padding-bottom: 15px; margin-bottom: 20px; text-align: center;">
            <h3 style="margin: 0; color: #5c3d1e; font-size: 1.5em;">PHASE 3: IDLE MINES — EXPANSION & PROTECTION</h3>
            <span style="font-size: 0.95em; color: #6b4423; font-weight: bold;">MILESTONE: MARKETPLACE, PASSES & REVENUE ALLOCATION</span>
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">1. Secure Trading: The Dimensional Pass</h4>
        <p style="color: #6b4423; font-size: 1em; margin-bottom: 10px; line-height: 1.7;">
            Idle Mines introduces the Off-Chain Marketplace. To protect the economy against bot extraction and ensure fair play, trading requires an active <strong>Dimensional Pass</strong>.
        </p>
        <table style="width: 100%; font-size: 1em; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #8b5a2b;">
            <tr style="background: rgba(255, 251, 235, 0.7);">
                <td style="padding: 8px; font-weight: bold; color: #166534;">50%</td>
                <td style="padding: 8px; color: #6b4423;">Trade Ranking Pool (Active Traders)</td>
            </tr>
            <tr style="background: rgba(248, 250, 252, 0.5);">
                <td style="padding: 8px; font-weight: bold; color: #5c3d1e;">20%</td>
                <td style="padding: 8px; color: #6b4423;">Raffle Pool (Holders)</td>
            </tr>
            <tr style="background: rgba(248, 250, 252, 0.5);">
                <td style="padding: 8px; font-weight: bold; color: #5c3d1e;">20%</td>
                <td style="padding: 8px; color: #6b4423;">Maintenance Pool</td>
            </tr>
            <tr style="background: rgba(248, 250, 252, 0.5);">
                <td style="padding: 8px; font-weight: bold; color: #5c3d1e;">10%</td>
                <td style="padding: 8px; color: #6b4423;">Security Pool</td>
            </tr>
        </table>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">2. The Monthly Season Pass</h4>
        <p style="color: #6b4423; font-size: 1em; margin-bottom: 10px; line-height: 1.7;">
            Offers boosts and exclusive skins. Revenue builds the <strong style="color: #166534;">"Road to Ascendria"</strong> Social Prize.
        </p>
        <table style="width: 100%; font-size: 1em; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #8b5a2b;">
            <tr style="background: rgba(239, 246, 255, 0.7);">
                <td style="padding: 8px; font-weight: bold; color: #166534;">50%</td>
                <td style="padding: 8px; color: #6b4423;">Social Ranking Pool (Top 1000 Payout)</td>
            </tr>
            <tr style="background: rgba(248, 250, 252, 0.5);">
                <td style="padding: 8px; font-weight: bold; color: #5c3d1e;">20%</td>
                <td style="padding: 8px; color: #6b4423;">Raffle Pool (Holders)</td>
            </tr>
            <tr style="background: rgba(248, 250, 252, 0.5);">
                <td style="padding: 8px; font-weight: bold; color: #5c3d1e;">20%</td>
                <td style="padding: 8px; color: #6b4423;">Maintenance Pool</td>
            </tr>
            <tr style="background: rgba(248, 250, 252, 0.5);">
                <td style="padding: 8px; font-weight: bold; color: #5c3d1e;">10%</td>
                <td style="padding: 8px; color: #6b4423;">Security Pool</td>
            </tr>
        </table>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">3. Premium Items Allocation (Smart Routing)</h4>
        <p style="color: #6b4423; font-size: 1em; margin-bottom: 10px; line-height: 1.7;">
            Direct capital injection into specific gameplay pools:
        </p>
        <div style="overflow-x: auto; margin-bottom: 20px;">
            <table style="width: 100%; font-size: 0.95em; border-collapse: collapse; text-align: center; border: 1px solid #8b5a2b;">
                <tr style="background: rgba(241, 245, 249, 0.7); color: #5c3d1e;">
                    <th style="padding: 6px; text-align: left; color: #5c3d1e;">Item Source</th>
                    <th style="padding: 6px; color: #5c3d1e;">Community Pools<br>(Allies/Solo)</th>
                    <th style="padding: 6px; color: #5c3d1e;">Maintenance<br>Pool</th>
                    <th style="padding: 6px; color: #5c3d1e;">Security</th>
                    <th style="padding: 6px; color: #5c3d1e;">Raffle</th>
                </tr>
                <tr style="background: rgba(255, 255, 255, 0.5);">
                    <td style="padding: 6px; text-align: left; border-bottom: 1px solid #8b5a2b;">
                        <strong style="color: #5c3d1e;">Suspicious Chest</strong>
                        <br><span style="color: #6b4423; font-size: 0.85em;">(Drops Random Capacitor)</span>
                    </td>
                    <td style="padding: 6px; border-bottom: 1px solid #8b5a2b; font-weight: bold; color: #166534;">70%</td>
                    <td style="padding: 6px; border-bottom: 1px solid #8b5a2b; color: #6b4423;">10%</td>
                    <td style="padding: 6px; border-bottom: 1px solid #8b5a2b; color: #6b4423;">10%</td>
                    <td style="padding: 6px; border-bottom: 1px solid #8b5a2b; color: #6b4423;">10%</td>
                </tr>
                <tr style="background: rgba(248, 250, 252, 0.5);">
                    <td style="padding: 6px; text-align: left; border-bottom: 1px solid #8b5a2b;"><strong style="color: #5c3d1e;">Miner (Promo)</strong></td>
                    <td style="padding: 6px; border-bottom: 1px solid #8b5a2b; font-weight: bold; color: #166534;">50%</td>
                    <td style="padding: 6px; border-bottom: 1px solid #8b5a2b; color: #6b4423;">40%</td>
                    <td style="padding: 6px; border-bottom: 1px solid #8b5a2b; color: #6b4423;">10%</td>
                    <td style="padding: 6px; border-bottom: 1px solid #8b5a2b; color: #6b4423;">-</td>
                </tr>
                <tr style="background: rgba(255, 255, 255, 0.5);">
                    <td style="padding: 6px; text-align: left; border-bottom: 1px solid #8b5a2b;"><strong style="color: #5c3d1e;">Miner (Standard)</strong></td>
                    <td style="padding: 6px; border-bottom: 1px solid #8b5a2b; font-weight: bold; color: #166534;">70%</td>
                    <td style="padding: 6px; border-bottom: 1px solid #8b5a2b; color: #6b4423;">20%</td>
                    <td style="padding: 6px; border-bottom: 1px solid #8b5a2b; color: #6b4423;">10%</td>
                    <td style="padding: 6px; border-bottom: 1px solid #8b5a2b; color: #6b4423;">-</td>
                </tr>
                <tr style="background: rgba(248, 250, 252, 0.5);">
                    <td style="padding: 6px; text-align: left;"><strong style="color: #5c3d1e;">Miner Skins</strong></td>
                    <td style="padding: 6px; font-weight: bold; color: #166534;">70%</td>
                    <td style="padding: 6px; color: #6b4423;">10%</td>
                    <td style="padding: 6px; color: #6b4423;">10%</td>
                    <td style="padding: 6px; color: #6b4423;">10%</td>
                </tr>
            </table>
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">4. The Monthly Holder Raffle</h4>
        <div style="background: rgba(240, 253, 244, 0.7); border: 1px solid #166534; padding: 15px; border-radius: 6px; margin-bottom: 20px; backdrop-filter: blur(4px); text-align: center;">
            <p style="color: #6b4423; font-size: 1em; margin-top: 0; line-height: 1.7;">
                Exclusive for <strong style="color: #166534;">Miner Owners</strong>. <strong style="color: #166534;">100 Winners</strong> per month.
            </p>
            
            <strong style="color: #166534; font-size: 1em; display: block; margin-bottom: 5px;">🎟️ Synergy System:</strong>
            <code style="background: rgba(255, 255, 255, 0.8); padding: 5px 10px; border-radius: 4px; border: 1px solid #166534; color: #166534; font-weight: bold; display: inline-block; margin-bottom: 15px;">
                Tickets = [ Pickaxe Multiplier ] x [ Social Level ]
            </code>

            <table style="width: 80%; margin: 0 auto 15px auto; font-size: 1em; border-collapse: collapse; border: 1px solid #166534;">
                <tr style="background: rgba(255, 255, 255, 0.5);">
                    <th style="padding: 8px; color: #5c3d1e; border-bottom: 1px solid #166534;" colspan="2">Pickaxe Multipliers</th>
                </tr>
                <tr style="background: rgba(255, 255, 255, 0.3);">
                    <td style="padding: 6px; color: #6b4423; border-bottom: 1px solid #166534;">Mythic</td>
                    <td style="padding: 6px; font-weight: bold; color: #166534; border-bottom: 1px solid #166534;">3.0x</td>
                </tr>
                <tr style="background: rgba(248, 250, 252, 0.3);">
                    <td style="padding: 6px; color: #6b4423; border-bottom: 1px solid #166534;">Legendary</td>
                    <td style="padding: 6px; font-weight: bold; color: #166534; border-bottom: 1px solid #166534;">2.0x</td>
                </tr>
                <tr style="background: rgba(255, 255, 255, 0.3);">
                    <td style="padding: 6px; color: #6b4423; border-bottom: 1px solid #166534;">Epic</td>
                    <td style="padding: 6px; font-weight: bold; color: #166534; border-bottom: 1px solid #166534;">1.5x</td>
                </tr>
                <tr style="background: rgba(248, 250, 252, 0.3);">
                    <td style="padding: 6px; color: #6b4423; border-bottom: 1px solid #166534;">Rare</td>
                    <td style="padding: 6px; font-weight: bold; color: #166534; border-bottom: 1px solid #166534;">1.0x</td>
                </tr>
                <tr style="background: rgba(255, 255, 255, 0.3);">
                    <td style="padding: 6px; color: #6b4423;">Common</td>
                    <td style="padding: 6px; font-weight: bold; color: #166534;">0.5x</td>
                </tr>
            </table>

            <div style="border-top: 1px dashed #166534; padding-top: 10px; font-size: 1em; color: #6b4423; text-align: center;">
                <strong style="color: #166534; display: block; margin-bottom: 10px;">Tiered Payout Structure:</strong>
                <div style="margin-bottom: 5px;">🥇 <strong style="color: #5c3d1e;">1st Place:</strong> 15% of Pool</div>
                <div style="margin-bottom: 5px;">🥈 <strong style="color: #5c3d1e;">2nd Place:</strong> 10% of Pool</div>
                <div style="margin-bottom: 5px;">🥉 <strong style="color: #5c3d1e;">3rd Place:</strong> 7.5% of Pool</div>
                <div>🎖️ <strong style="color: #5c3d1e;">4th-100th:</strong> Share remaining 67.5% in descending tiers.</div>
            </div>
            
            <div style="margin-top: 10px; font-size: 1em; color: #6b4423; background: rgba(220, 252, 231, 0.7); padding: 5px 10px; border-radius: 4px; text-align: left;">
                <strong style="color: #166534;">Single Win Protocol:</strong> No duplicate winners. Once a ticket wins, all other numbers from that player are removed for that draw.
            </div>
        </div>

        <div style="font-size: 1em; color: #6b4423; border-top: 1px dashed #8b5a2b; padding-top: 10px;">
            <strong style="color: #5c3d1e;">Infrastructure Definitions:</strong><br>
            • <strong style="color: #5c3d1e;">Maintenance Pool:</strong> Server costs, infrastructure expansion, marketing, and Mana Works team.<br>
            • <strong style="color: #5c3d1e;">Security Pool:</strong> Emergency Treasury Buffer.<br>
            • <strong style="color: #5c3d1e;">Raffle Pool:</strong> Exclusive rewards for Miner Owners.
        </div>
    </div>
      `,
      
      cardinals_row: `
    <div style="font-family: inherit;">
        <div style="border-bottom: 2px solid rgba(139, 90, 43, 0.3); padding-bottom: 15px; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #5c3d1e; font-size: 1.4em;">PHASE 4: CARDINALS ROW — STRATEGY & HIGH STAKES</h3>
            <span style="font-size: 0.9em; color: #6b4423; font-weight: bold;">MILESTONE: TCG LAUNCH, LIVE TOURNAMENTS & ELITE ECONOMY</span>
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">1. The "Gentleman's Duel" Wager Model</h4>
        <p style="color: #6b4423; font-size: 1em; margin-bottom: 15px; line-height: 1.7;">
            The TCG economy operates on a direct betting system where skill defines profit.
        </p>
        <div style="background: rgba(254, 242, 242, 0.7); border-left: 4px solid #b91c1c; padding: 15px; margin-bottom: 20px; border-radius: 6px; backdrop-filter: blur(4px);">
            <strong style="color: #991b1b; font-size: 1em;">The Mechanics (Example):</strong>
            <ul style="margin: 5px 0 0 0; padding-left: 20px; color: #6b4423; font-size: 1em; line-height: 1.8;">
                <li>Player A bets <strong style="color: #166534;">5</strong> + Player B bets <strong style="color: #166534;">5</strong> = <strong style="color: #166534;">Pot of 10</strong>.</li>
                <li>🏆 <strong style="color: #5c3d1e;">Winner:</strong> Takes <strong style="color: #166534;">9</strong> (90% of Pot).</li>
                <li>🏦 <strong style="color: #5c3d1e;">Reward Pool:</strong> Retains <strong style="color: #166534;">1</strong> (10% of Pot).</li>
            </ul>
            <div style="margin-top: 10px; font-size: 0.95em; color: #b91c1c; font-style: italic;">
                *Note: This reduced fee (10%) is exclusive to TCG to encourage high-volume strategic play.
            </div>
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">2. The Competitive Ranking (Top 100)</h4>
        <p style="color: #6b4423; font-size: 1em; margin-bottom: 10px; line-height: 1.7;">
            Beyond individual wagers, players accumulate points for the Season Ranking. The Top 100 strategists share the accumulated Pool following a <strong style="color: #166534;">Tiered Payout Structure</strong>:
        </p>
        <table style="width: 100%; font-size: 1em; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #8b5a2b; text-align: center;">
            <tr style="background: rgba(248, 250, 252, 0.7);">
                <td style="padding: 8px; border-bottom: 1px solid #8b5a2b; color: #5c3d1e;">🥇 <strong>1st Place</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #8b5a2b; font-weight: bold; color: #166534;">15% of Pool</td>
            </tr>
            <tr style="background: rgba(255, 255, 255, 0.5);">
                <td style="padding: 8px; border-bottom: 1px solid #8b5a2b; color: #5c3d1e;">🥈 <strong>2nd Place</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #8b5a2b; font-weight: bold; color: #166534;">10% of Pool</td>
            </tr>
            <tr style="background: rgba(248, 250, 252, 0.7);">
                <td style="padding: 8px; border-bottom: 1px solid #8b5a2b; color: #5c3d1e;">🥉 <strong>3rd Place</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #8b5a2b; font-weight: bold; color: #166534;">7.5% of Pool</td>
            </tr>
            <tr style="background: rgba(255, 255, 255, 0.5);">
                <td style="padding: 8px; color: #5c3d1e;">🎖️ <strong>4th - 100th</strong></td>
                <td style="padding: 8px; color: #6b4423;">Share remaining 67.5% in descending tiers.</td>
            </tr>
        </table>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">3. Monetary Evolution (Spark → Silver)</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
            <div style="background: rgba(255, 255, 255, 0.7); border: 1px solid #8b5a2b; padding: 12px; border-radius: 6px; backdrop-filter: blur(4px);">
                <strong style="color: #d97706; font-size: 1em;">Stage 1: Elite (Pre-Season)</strong>
                <p style="font-size: 1em; color: #6b4423; margin: 8px 0 0 0; line-height: 1.6;">
                    Bets exclusively in <strong style="color: #166534;">SPARK</strong>. Creates a "High Stakes" environment for early adopters and engaged strategists.
                </p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.7); border: 1px solid #8b5a2b; padding: 12px; border-radius: 6px; backdrop-filter: blur(4px);">
                <strong style="color: #64748b; font-size: 1em;">Stage 2: Mass (Post-Launch)</strong>
                <p style="font-size: 1em; color: #6b4423; margin: 8px 0 0 0; line-height: 1.6;">
                    With <em>Champions</em> launch, betting migrates to <strong style="color: #166534;">SILVER</strong>, making the game accessible to all for mass resource farming.
                </p>
            </div>
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">4. Event: "Road to Ascendria"</h4>
        <p style="color: #6b4423; font-size: 1em; margin-bottom: 15px; line-height: 1.7;">
            During the Elite phase, we transform the game into a community spectacle.
        </p>
        <ul style="font-size: 1em; color: #6b4423; padding-left: 20px; margin-bottom: 20px; line-height: 1.8;">
            <li style="margin-bottom: 8px;"><strong style="color: #5c3d1e;">Official Championships:</strong> Organized by Mana Works with <strong style="color: #166534;">Live Broadcasts</strong> for the entire community.</li>
            <li><strong style="color: #5c3d1e;">Entry Fees:</strong> Paid in SPARK, directly feeding the Top 3 Prize Pool.</li>
        </ul>

        <div style="border-top: 1px dashed #8b5a2b; padding-top: 15px; font-size: 1em; color: #6b4423;">
            <strong style="color: #5c3d1e;">5. The Casual Economy (Pack Suppliers):</strong><br>
            <span style="color: #6b4423; font-size: 1em; line-height: 1.7;">
            Even those who don't compete in "High Stakes" profit. Idle Mines players craft <strong style="color: #166534;">Card Packs</strong> and sell them on the Marketplace. Elite competitors buy these packs (in Spark) to strengthen their decks.
            <br><em style="color: #1e3a8a;">The casual player supplies the ammunition for the elite's war.</em>
            </span>
        </div>
    </div>
      `,
      
      championships: `
    <div style="font-family: inherit;">
        <div style="border-bottom: 2px solid rgba(139, 90, 43, 0.3); padding-bottom: 15px; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #5c3d1e; font-size: 1.4em;">PHASE 5: CHAMPIONSHIPS — THE ESPORTS PLATFORM</h3>
            <span style="font-size: 0.9em; color: #6b4423; font-weight: bold;">MILESTONE: USDC TOURNAMENTS & PROFESSIONAL LEAGUES</span>
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">1. The "Hard Currency" Standard</h4>
        <p style="color: #6b4423; font-size: 1em; margin-bottom: 15px; line-height: 1.7;">
            Unlike casual arenas, Official Championships do not use internal currencies. We introduce the <strong style="color: #166534;">Ascendria Competitive Platform</strong>, dedicated to high performance.
        </p>
        <div style="background: rgba(240, 253, 244, 0.7); border-left: 4px solid #16a34a; padding: 15px; margin-bottom: 20px; border-radius: 6px; backdrop-filter: blur(4px);">
            <ul style="margin: 0; padding-left: 20px; color: #6b4423; font-size: 1em; line-height: 1.8;">
                <li style="margin-bottom: 5px;"><strong style="color: #5c3d1e;">Entry Fee (Buy-in):</strong> Paid directly in <strong style="color: #166534;">USDC</strong>.</li>
                <li><strong style="color: #5c3d1e;">Prize Pool:</strong> Paid directly in <strong style="color: #166534;">USDC</strong>.</li>
            </ul>
            <div style="margin-top: 10px; font-size: 0.95em; color: #166534; font-style: italic;">
                *This attracts pro players and guilds seeking stable financial returns without volatility risk.
            </div>
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">2. Competitive Roadmap</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px;">
            <div style="background: rgba(255, 255, 255, 0.7); border: 1px solid #8b5a2b; padding: 12px; border-radius: 6px; backdrop-filter: blur(4px);">
                <strong style="color: #b91c1c; font-size: 1em;">Stage 1: Launch</strong>
                <p style="font-size: 1em; color: #6b4423; margin: 8px 0 0 0; line-height: 1.6;">
                    <strong style="color: #5c3d1e;">Cardinals Row Focus.</strong> The TCG is the perfect environment to stress-test the 1v1 tournament infrastructure.
                </p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.7); border: 1px solid #8b5a2b; padding: 12px; border-radius: 6px; backdrop-filter: blur(4px);">
                <strong style="color: #1e40af; font-size: 1em;">Stage 2: Expansion</strong>
                <p style="font-size: 1em; color: #6b4423; margin: 8px 0 0 0; line-height: 1.6;">
                    <strong style="color: #5c3d1e;">Ascendria Champions.</strong> Unlocks "Solo Combat" and the ecosystem pinnacle: <strong style="color: #166534;">Guild Wars</strong>.
                </p>
            </div>
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">3. Simulation: "The Ascension Major"</h4>
        <p style="color: #6b4423; font-size: 1em; margin-bottom: 10px; line-height: 1.7;">
            A projection of a medium-sized tournament to illustrate potential returns:
        </p>
        
        <table style="width: 100%; font-size: 1em; border-collapse: collapse; margin-bottom: 15px; border: 1px solid #8b5a2b; text-align: center;">
            <tr style="background: rgba(255, 251, 235, 0.7);">
                <td style="padding: 8px; color: #5c3d1e; border-bottom: 1px solid #8b5a2b;"><strong>Format</strong></td>
                <td style="padding: 8px; color: #5c3d1e; border-bottom: 1px solid #8b5a2b;"><strong>Players</strong></td>
                <td style="padding: 8px; color: #5c3d1e; border-bottom: 1px solid #8b5a2b;"><strong>Ticket</strong></td>
                <td style="padding: 8px; color: #166534; font-weight: bold; border-bottom: 1px solid #8b5a2b;">TOTAL POT</td>
            </tr>
            <tr style="background: rgba(255, 255, 255, 0.5);">
                <td style="padding: 8px; color: #6b4423;">Cardinals Row</td>
                <td style="padding: 8px; color: #6b4423;">200</td>
                <td style="padding: 8px; color: #6b4423;">$15 USDC</td>
                <td style="padding: 8px; color: #166534; font-weight: bold;">$3,000 USDC</td>
            </tr>
        </table>

        <div style="background: rgba(255, 255, 255, 0.7); border: 1px solid #8b5a2b; padding: 15px; border-radius: 6px; margin-bottom: 20px; backdrop-filter: blur(4px);">
            <strong style="color: #5c3d1e; font-size: 1em;">Distribution Rule (90/10):</strong>
            <ul style="margin: 10px 0 0 0; padding-left: 20px; font-size: 1em; color: #6b4423; line-height: 1.8;">
                <li style="margin-bottom: 8px;">
                    🏆 <strong style="color: #5c3d1e;">90% ($2,700): Players' Payout (Top 32).</strong>
                    <br><span style="color: #166534;">The Champion takes ~$675 (45x ROI).</span>
                </li>
                <li>
                    🏦 <strong style="color: #5c3d1e;">10% ($300): Organization Fee.</strong>
                    <br>Covers platform operations and Live Broadcast costs.
                </li>
            </ul>
        </div>

        <div style="text-align: center; border-top: 1px dashed #8b5a2b; padding-top: 15px;">
            <p style="margin: 0; color: #1e3a8a; font-weight: 600; font-size: 1.05em; font-style: italic;">
                "Ascendria is Strategy. The one who pays more doesn't win; the one who thinks better wins."
            </p>
        </div>
    </div>
      `,
      
      champions: `
    <div style="font-family: inherit;">
        <div style="border-bottom: 2px solid rgba(139, 90, 43, 0.3); padding-bottom: 15px; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #5c3d1e; font-size: 1.4em;">PHASE 6: CHAMPIONS — THE WEB3 AWAKENING</h3>
            <span style="font-size: 0.9em; color: #6b4423; font-weight: bold;">MILESTONE: BLOCKCHAIN INTEGRATION, STAKING & ON-CHAIN MARKET</span>
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">1. The Great Transition: From Workers to Legends</h4>
        <p style="color: #6b4423; font-size: 1em; margin-bottom: 15px; line-height: 1.7;">
            Genesis Miners leave the mines to become <strong style="color: #166534;">"The Sworn"</strong> (First ERC-721 Collection).
        </p>
        <ul style="font-size: 1em; color: #6b4423; padding-left: 20px; margin-bottom: 20px; line-height: 1.8;">
            <li style="margin-bottom: 5px;"><strong style="color: #5c3d1e;">Staking Required:</strong> NFTs must be staked in the Dimensional Portal to be active.</li>
            <li><strong style="color: #5c3d1e;">The Replacement:</strong> Players acquire <strong style="color: #166534;">Automatons</strong> (Non-NFTs) to continue resource production in the mines.</li>
        </ul>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">2. Guilds: The Power of Unity</h4>
        <div style="background: rgba(253, 244, 255, 0.7); border-left: 4px solid #7e22ce; padding: 15px; margin-bottom: 20px; border-radius: 6px; backdrop-filter: blur(4px);">
            <p style="color: #6b4423; font-size: 1em; margin: 0; line-height: 1.7;">
                Guilds become a reality. The game rewards social cohesion:
            </p>
            <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #6b4423; font-size: 1em; line-height: 1.8;">
                <li style="margin-bottom: 5px;"><strong style="color: #5c3d1e;">Teamwork Bonus:</strong> Groups earn <strong style="color: #166534;">EXP Bonuses</strong> and access higher profit (and danger) zones.</li>
                <li><strong style="color: #5c3d1e;">Solo Progression:</strong> Possible, but significantly slower.</li>
            </ul>
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">3. Asset Materialization (ERC-1155)</h4>
        <p style="color: #6b4423; font-size: 1em; margin-bottom: 10px; line-height: 1.7;">
            NPC <strong style="color: #166534;">Silas, the Enchanter</strong> opens his shop. Players can mint hard-earned items into tradable NFTs.
        </p>
        <div style="font-size: 1em; color: #6b4423; background: rgba(248, 250, 252, 0.7); padding: 12px; border-radius: 6px; margin-bottom: 20px; border: 1px solid #8b5a2b; backdrop-filter: blur(4px);">
            <strong style="color: #5c3d1e;">Mintable Items:</strong> Lumenstones, Capacitors, Cards, Ascension Stones, Duplicate Relics, Energy Generators.<br>
            <strong style="color: #5c3d1e;">Cost:</strong> Silver Fee + Gas.
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">4. The Economy of War (Sinks & Balance)</h4>
        <p style="color: #6b4423; font-size: 1em; margin-bottom: 15px; line-height: 1.7;">
            To maintain value, we implement strong sinks and difficulty curves:
        </p>
        <ul style="font-size: 1em; color: #6b4423; padding-left: 20px; margin-bottom: 20px; line-height: 1.8;">
            <li style="margin-bottom: 8px;">
                <strong style="color: #5c3d1e;">Mnemon's Starter Gear:</strong> Sold for GOLD. These are Non-NFT, low-value items. When durability hits 0, they are <strong style="color: #b91c1c;">destroyed</strong>. (Massive Gold Sink).
            </li>
            <li>
                <strong style="color: #5c3d1e;">Crafting Difficulty:</strong> Most creations have a <strong style="color: #166534;">50% Success Rate</strong>. This failure mechanic controls the inflation of materials generated in the mines.
            </li>
        </ul>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">5. On-Chain Market & Sustainability</h4>
        <p style="color: #6b4423; font-size: 1em; margin-bottom: 10px; line-height: 1.7;">
            We launch on the Ronin Network. Secondary sales fees (5%) are the first direct revenue source for the team:
        </p>
        <table style="width: 100%; font-size: 1em; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #8b5a2b; text-align: center;">
            <tr style="background: rgba(240, 249, 255, 0.7);">
                <td style="padding: 10px; font-weight: bold; color: #1e40af; border-bottom: 1px solid #8b5a2b;">4%</td>
                <td style="padding: 10px; color: #5c3d1e; border-bottom: 1px solid #8b5a2b;">Mana Works (Company Sustainability)</td>
            </tr>
            <tr style="background: rgba(255, 255, 255, 0.5);">
                <td style="padding: 10px; font-weight: bold; color: #166534;">1%</td>
                <td style="padding: 10px; color: #5c3d1e;">Raffle Pool (Holder Injection)</td>
            </tr>
        </table>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">6. ACE 2.0: Stability Protocols</h4>
        <div style="border: 1px dashed #8b5a2b; padding: 15px; border-radius: 6px; font-size: 1em; color: #6b4423; background: rgba(255, 255, 255, 0.5); backdrop-filter: blur(4px);">
            <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
                <li style="margin-bottom: 8px;"><strong style="color: #5c3d1e;">3-Day Rule:</strong> NPCs analyze the last 3 days of activity to adjust exchange rates for the 4th day.</li>
                <li style="margin-bottom: 8px;"><strong style="color: #5c3d1e;">The 80% Safety Net:</strong> Ranking Pools never pay out 100% of the pot. Payouts are capped at <strong style="color: #166534;">80% of accumulated value</strong> to ensure the next season starts with liquidity.</li>
                <li><strong style="color: #5c3d1e;">New Raffle:</strong> Based on Staking Power (Level x Rarity). Requires <strong style="color: #166534;">7 days</strong> of uninterrupted staking.</li>
            </ul>
        </div>

        <h4 style="color: #d97706; margin-bottom: 10px; font-size: 1.15em;">7. The Battle Pass (Competitive Edge)</h4>
        <div style="background: rgba(255, 251, 235, 0.7); border-left: 4px solid #d97706; padding: 15px; border-radius: 6px; backdrop-filter: blur(4px);">
            <p style="color: #6b4423; font-size: 1em; margin: 0 0 10px 0; line-height: 1.7;">
                For warriors seeking maximum efficiency, the Battle Pass provides essential operational bonuses:
            </p>
            <ul style="margin: 0; padding-left: 20px; color: #6b4423; font-size: 1em; line-height: 1.8;">
                <li style="margin-bottom: 5px;">⚡ <strong style="color: #5c3d1e;">+15% Energy Regeneration:</strong> Allows for more battles and resource gathering per day.</li>
                <li>📈 <strong style="color: #5c3d1e;">+15% Experience Gain:</strong> Accelerates level progression for Guild Wars readiness.</li>
            </ul>
        </div>
    </div>
      `,
      
      forges: `
    <div style="font-family: inherit;">
        <div style="border-bottom: 2px solid rgba(139, 90, 43, 0.3); padding-bottom: 15px; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #5c3d1e; font-size: 1.4em;">PHASE 7: FORGES — THE INDUSTRIAL REVOLUTION</h3>
            <span style="font-size: 0.9em; color: #6b4423; font-weight: bold;">MILESTONE: PROFESSIONS, LANDS & 100% PLAYER-DRIVEN ECONOMY</span>
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">1. The Profession System (Specialization)</h4>
        <p style="color: #6b4423; font-size: 1em; margin-bottom: 10px; line-height: 1.7;">
            The ecosystem matures. The economy shifts from NPC-sustained to Player-Driven. Players become essential specialists:
        </p>
        <ul style="font-size: 1em; color: #6b4423; padding-left: 20px; margin-bottom: 20px; line-height: 1.8;">
            <li style="margin-bottom: 5px;"><strong style="color: #5c3d1e;">Blacksmith:</strong> Forges war equipment (Weapons/Armor).</li>
            <li style="margin-bottom: 5px;"><strong style="color: #5c3d1e;">Alchemist:</strong> Creates vital potions for survival in <strong style="color: #166534;">Battles</strong>.</li>
            <li><strong style="color: #5c3d1e;">Cook:</strong> Transforms ingredients into stat buffs.</li>
        </ul>
        <div style="font-size: 1em; color: #c2410c; background: rgba(255, 247, 237, 0.7); padding: 12px; border-radius: 6px; margin-bottom: 20px; border: 1px solid #c2410c; backdrop-filter: blur(4px);">
            <strong>Economic Impact:</strong> Interdependence enforces trade. The Warrior needs the Blacksmith, who needs the Cook.
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">2. Lands: The Supply Chain</h4>
        <p style="color: #6b4423; font-size: 1em; margin-bottom: 15px; line-height: 1.7;">
            We introduce <strong style="color: #166534;">Productive Lands</strong>. Crafting requires organic raw materials not found in mines.
        </p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
            <div style="background: rgba(248, 250, 252, 0.7); border: 1px solid #8b5a2b; padding: 12px; border-radius: 6px; backdrop-filter: blur(4px);">
                <strong style="color: #5c3d1e; font-size: 1em;">Resources</strong>
                <ul style="margin: 8px 0 0 0; padding-left: 15px; font-size: 1em; color: #6b4423; line-height: 1.6;">
                    <li>Special Ores</li>
                    <li>Livestock (Leather)</li>
                    <li>Farming (Food)</li>
                </ul>
            </div>
            <div style="background: rgba(248, 250, 252, 0.7); border: 1px solid #8b5a2b; padding: 12px; border-radius: 6px; backdrop-filter: blur(4px);">
                <strong style="color: #5c3d1e; font-size: 1em;">Business Model</strong>
                <p style="margin: 8px 0 0 0; font-size: 1em; color: #6b4423; line-height: 1.6;">
                    Land Owners become the market's wholesale suppliers.
                </p>
            </div>
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">3. Mnemon's Retirement (End of Faucet)</h4>
        <div style="border-left: 4px solid #b91c1c; padding: 12px; background: rgba(254, 242, 242, 0.7); margin-bottom: 20px; border-radius: 6px; backdrop-filter: blur(4px);">
            <p style="margin: 0; color: #6b4423; font-size: 1em; line-height: 1.7;">
                <strong style="color: #991b1b;">The Change:</strong> NPC Mnemon stops selling disposable weapon boxes.
                <br>
                From now on, <strong style="color: #166534;">100% of equipment</strong> in circulation must be crafted by players. This immensely values the Crafter.
            </p>
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">4. Item Lifecycle (Salvage & Repair)</h4>
        <p style="color: #6b4423; font-size: 1em; margin-bottom: 10px; line-height: 1.7;">
            Weapons break, but they are not trash. We implement the <strong style="color: #166534;">Scrap System</strong> to solve inflation.
        </p>
        <div style="background: rgba(240, 253, 244, 0.7); border: 1px solid #16a34a; padding: 15px; border-radius: 6px; margin-bottom: 20px; backdrop-filter: blur(4px);">
            <strong style="color: #166534; font-size: 1em;">The Repair Equation:</strong>
            <p style="font-size: 1.05em; color: #166534; margin: 10px 0; text-align: center; font-weight: bold;">
                Repair Cost = [ Weapon Scraps ] + [ SILVER Fee ]
            </p>
            <ul style="font-size: 1em; color: #6b4423; margin: 0; padding-left: 20px; line-height: 1.8;">
                <li><strong style="color: #5c3d1e;">The Cycle:</strong> Players must dismantle (burn) broken/inferior weapons to get Scraps.</li>
                <li><strong style="color: #5c3d1e;">The Sink:</strong> Silver is drained from the system as a service cost.</li>
            </ul>
        </div>

        <div style="border-top: 1px dashed #8b5a2b; padding-top: 15px; font-size: 1em; color: #6b4423;">
            <strong style="color: #5c3d1e;">5. On-Chain Market (Real Profit):</strong><br>
            <span style="color: #6b4423; font-size: 1em; line-height: 1.7;">
            Gold buys raw materials → Skill creates the Item → Item is sold for USDC/Token.
            <br><em style="color: #1e3a8a;">Massive microtransaction volume generates the fees that fatten the Ascendria Vaults (Pools).</em>
            </span>
        </div>
    </div>
      `,
      
      depths: `
    <div style="font-family: inherit;">
        <div style="border-bottom: 2px solid rgba(139, 90, 43, 0.3); padding-bottom: 15px; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #5c3d1e; font-size: 1.4em;">PHASE 8: DEPTHS — THE PVE ENDGAME</h3>
            <span style="font-size: 0.9em; color: #6b4423; font-weight: bold;">MILESTONE: DUNGEONS, PET SYSTEM & UNBREAKABLE ITEMS</span>
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">1. Scaled Dungeons & Rewards</h4>
        <p style="color: #6b4423; font-size: 1em; margin-bottom: 10px; line-height: 1.7;">
            The final challenge against the environment. Here, exploration defines profit. Rewards are scaled by difficulty, creating distinct economic tiers:
        </p>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 20px; text-align: center;">
            <div style="background: rgba(255, 247, 237, 0.7); border: 1px solid #fdba74; padding: 12px; border-radius: 6px; backdrop-filter: blur(4px);">
                <strong style="color: #c2410c; font-size: 1em;">Beginner</strong>
                <br><span style="color: #9a3412; font-size: 0.95em;">Pays in BRONZE</span>
            </div>
            <div style="background: rgba(241, 245, 249, 0.7); border: 1px solid #8b5a2b; padding: 12px; border-radius: 6px; backdrop-filter: blur(4px);">
                <strong style="color: #5c3d1e; font-size: 1em;">Intermediate</strong>
                <br><span style="color: #6b4423; font-size: 0.95em;">Pays in SILVER</span>
            </div>
            <div style="background: rgba(254, 252, 232, 0.7); border: 1px solid #facc15; padding: 12px; border-radius: 6px; backdrop-filter: blur(4px);">
                <strong style="color: #a16207; font-size: 1em;">Hardcore</strong>
                <br><span style="color: #854d0e; font-size: 0.95em;">Pays in GOLD</span>
            </div>
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">2. Pets: The Loot Companions</h4>
        <div style="background: rgba(240, 253, 244, 0.7); border-left: 4px solid #16a34a; padding: 15px; margin-bottom: 20px; border-radius: 6px; backdrop-filter: blur(4px);">
            <p style="color: #166534; font-size: 1em; margin: 0; line-height: 1.7;">
                <strong>Official Launch of Pets.</strong> They don't just look cute; they are essential for economic efficiency.
            </p>
            <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #6b4423; font-size: 1em; line-height: 1.8;">
                <li><strong style="color: #5c3d1e;">Mechanic:</strong> While you focus on survival and combat, your Pet scours the area for hidden treasures.</li>
                <li><strong style="color: #5c3d1e;">Impact:</strong> Without a Pet, you win the battle but miss the rare drops. They maximize Dungeon ROI.</li>
            </ul>
        </div>

        <h4 style="color: #5c3d1e; margin-bottom: 10px; font-size: 1.15em;">3. The Enhancement Economy</h4>
        <p style="color: #6b4423; font-size: 1em; margin-bottom: 10px; line-height: 1.7;">
            Dungeons are the sole source of components vital for Forging and the Market:
        </p>
        <ul style="font-size: 1em; color: #6b4423; padding-left: 20px; margin-bottom: 20px; line-height: 1.8;">
            <li><strong style="color: #5c3d1e;">Runes:</strong> To imbue armor with special powers.</li>
            <li><strong style="color: #5c3d1e;">Jewels:</strong> To socket into weapons.</li>
            <li><strong style="color: #5c3d1e;">Single-Use Recipes:</strong> The fuel for Blacksmiths and Alchemists. <em style="color: #166534;">(Without PvE drops, the Forge stops).</em></li>
        </ul>

        <h4 style="color: #b91c1c; margin-bottom: 10px; font-size: 1.15em;">4. The Supreme Drop: "Sealed Fate"</h4>
        <div style="border: 1px dashed #b91c1c; padding: 15px; border-radius: 6px; background: rgba(255, 245, 245, 0.7); backdrop-filter: blur(4px);">
            <strong style="color: #991b1b; font-size: 1em;">Effect: Makes an NFT Unbreakable.</strong>
            <p style="font-size: 1em; color: #6b4423; margin: 8px 0 0 0; line-height: 1.7;">
                This extremely rare scroll alters the fundamental rule of item destruction.
                <br>
                <strong style="color: #5c3d1e;">The Balance (Gold Sink):</strong> The item is immune to total destruction, but its maintenance cost increases. It still requires constant repairs, ensuring the Gold Sink remains active while protecting the player's investment.
            </p>
        </div>
        
        <p style="margin-top: 20px; text-align: center; color: #1e3a8a; font-size: 1em; font-style: italic;">
            "This concludes the foundation. From here, the universe expands into the infinite Future."
        </p>
    </div>
      `,
      
      future: `
    <div style="font-family: inherit;">
        <div style="border-bottom: 2px solid rgba(139, 90, 43, 0.3); padding-bottom: 15px; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #5c3d1e; font-size: 1.4em;">THE FUTURE — BEYOND THE HORIZON</h3>
            <span style="font-size: 0.9em; color: #6b4423; font-weight: bold;">THE JOURNEY CONTINUES...</span>
        </div>

        <div style="background: rgba(240, 253, 244, 0.7); border: 1px solid #166534; padding: 20px; border-radius: 8px; margin-bottom: 25px; backdrop-filter: blur(4px); text-align: center;">
            <p style="color: #6b4423; font-size: 1.1em; margin: 0; line-height: 1.8; font-style: italic;">
                "The future belongs to God, but we believe that after the ecosystem closes, it will be time to work on <strong style="color: #166534;">special and seasonal events</strong>, focus more on <strong style="color: #166534;">championships</strong>, and <strong style="color: #166534;">boost the economy</strong>."
            </p>
        </div>

        <div style="background: rgba(254, 252, 232, 0.7); border: 1px solid #8b5a2b; padding: 25px; border-radius: 8px; text-align: center; backdrop-filter: blur(4px);">
            <p style="color: #5c3d1e; font-size: 1.15em; margin: 0 0 15px 0; line-height: 1.7;">
                Thank you for joining us this far.
            </p>
            <p style="color: #166534; font-size: 1.3em; margin: 0; font-weight: bold;">
                ✨ Gratitude from the entire Mana Works team ✨
            </p>
        </div>
    </div>
      `
    };

    this.currentView = 'timeline';
    this.wasDragging = false; // Inicializa antes de qualquer evento
    this.init();
  }

  init() {
    this.renderTimeline();
    this.renderDetailView();
    this.bindEvents();
    this.updateProgress();
    
    // Verificação de segurança - garantir que timeline está visível
    this.ensureVisibility();
  }
  
  ensureVisibility() {
    const timeline = this.container.querySelector('.financialmodel-timeline');
    const detail = this.container.querySelector('.financialmodel-detail');
    
    if (timeline && this.currentView === 'timeline') {
      timeline.classList.remove('hidden');
      timeline.style.opacity = '';
      timeline.style.visibility = '';
    }
    
    if (detail && this.currentView !== 'detail') {
      detail.classList.remove('active');
    }
  }

  /**
   * Calcula a porcentagem de progresso baseada na data atual
   */
  calculateProgress() {
    const today = new Date();
    const startDate = this.nodes[0].date; // Genesis
    const endDate = this.nodes[this.nodes.length - 1].date; // Future
    
    // Se ainda não começou
    if (today < startDate) return 0;
    
    // Se já passou do fim
    if (today >= endDate) return 100;
    
    // Calcula progresso proporcional
    const totalTime = endDate.getTime() - startDate.getTime();
    const elapsedTime = today.getTime() - startDate.getTime();
    
    return (elapsedTime / totalTime) * 100;
  }

  /**
   * Determina quais nodes já foram alcançados
   */
  getReachedNodes() {
    const today = new Date();
    return this.nodes.filter(node => today >= node.date).map(node => node.id);
  }

  /**
   * Atualiza a linha de progresso e estado dos nodes
   */
  updateProgress() {
    const progressPercent = this.calculateProgress();
    const reachedNodes = this.getReachedNodes();
    
    // Atualiza a barra de progresso
    const progressBar = this.container.querySelector('.timeline-progress');
    if (progressBar) {
      progressBar.style.width = `${progressPercent}%`;
    }
    
    // Atualiza o estado visual dos nodes
    this.container.querySelectorAll('.timeline-node').forEach(nodeEl => {
      const nodeId = nodeEl.dataset.module;
      if (reachedNodes.includes(nodeId)) {
        nodeEl.classList.add('reached');
      } else {
        nodeEl.classList.remove('reached');
      }
    });
  }

  renderTimeline() {
    const timelineHTML = `
      <div class="financialmodel-timeline">
        <div class="timeline-wrapper">
          <div class="timeline-inner">
            <div class="timeline-line"></div>
            <div class="timeline-progress"></div>
            <div class="timeline-nodes">
              ${this.nodes.map(node => `
                <div class="timeline-node position-${node.position}" data-module="${node.id}">
                  <img src="/assets/images/ecosystem/${node.icon}" alt="${node.label}" class="node-icon">
                  <span class="node-label">${node.label}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
    
    this.container.innerHTML = timelineHTML;
  }

  renderDetailView() {
    const detailHTML = `
      <div class="financialmodel-detail">
        <button class="detail-home" aria-label="Return to timeline">
          <img src="/assets/images/ecosystem/home.webp" alt="Home">
        </button>
        <div class="detail-header">
          <img src="" alt="" class="detail-icon">
          <h2 class="detail-title"></h2>
        </div>
        <div class="detail-content"></div>
      </div>
    `;
    
    this.container.insertAdjacentHTML('beforeend', detailHTML);
  }

  bindEvents() {
    // Node clicks - usando mousedown/mouseup para controlar melhor
    this.container.querySelectorAll('.timeline-node').forEach(node => {
      let nodeStartX = 0;
      let nodeStartY = 0;
      
      node.addEventListener('mousedown', (e) => {
        nodeStartX = e.clientX;
        nodeStartY = e.clientY;
      });
      
      node.addEventListener('mouseup', (e) => {
        const deltaX = Math.abs(e.clientX - nodeStartX);
        const deltaY = Math.abs(e.clientY - nodeStartY);
        
        // Só abre se não moveu mais que 5px (foi um clique, não um drag)
        if (deltaX < 5 && deltaY < 5) {
          const moduleId = node.dataset.module;
          this.showDetail(moduleId);
        }
      });
    });

    // Home button
    const homeBtn = this.container.querySelector('.detail-home');
    if (homeBtn) {
      homeBtn.addEventListener('click', () => {
        this.showTimeline();
      });
    }

    // Drag to scroll
    this.initDragScroll();
  }

  /**
   * Inicializa o sistema de arrastar para scrollar
   */
  initDragScroll() {
    const wrapper = this.container.querySelector('.timeline-wrapper');
    if (!wrapper) return;

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    wrapper.addEventListener('mousedown', (e) => {
      // Ignora se o clique foi em um node (deixa o node processar)
      if (e.target.closest('.timeline-node')) {
        return;
      }
      
      isDragging = true;
      wrapper.classList.add('dragging');
      startX = e.pageX - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('mouseleave', () => {
      isDragging = false;
      wrapper.classList.remove('dragging');
    });

    wrapper.addEventListener('mouseup', () => {
      isDragging = false;
      wrapper.classList.remove('dragging');
    });

    wrapper.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const x = e.pageX - wrapper.offsetLeft;
      const walk = (x - startX) * 2; // Multiplicador de velocidade
      wrapper.scrollLeft = scrollLeft - walk;
    });

    // Touch support para mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;

    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX - wrapper.offsetLeft;
      touchScrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX - wrapper.offsetLeft;
      const walk = (x - touchStartX) * 2;
      wrapper.scrollLeft = touchScrollLeft - walk;
    });
  }

  showDetail(moduleId) {
    const node = this.nodes.find(n => n.id === moduleId);
    if (!node || !this.modules[moduleId]) return;

    const timeline = this.container.querySelector('.financialmodel-timeline');
    const detail = this.container.querySelector('.financialmodel-detail');
    
    if (!timeline || !detail) return;
    
    const detailIcon = detail.querySelector('.detail-icon');
    const detailTitle = detail.querySelector('.detail-title');
    const detailContent = detail.querySelector('.detail-content');

    // Update detail content
    detailIcon.src = `/assets/images/ecosystem/${node.icon}`;
    detailIcon.alt = node.label;
    detailTitle.textContent = node.label;
    detailContent.innerHTML = this.modules[moduleId];

    // Animate transition - garantir que os estados estejam corretos
    timeline.classList.add('hidden');
    
    setTimeout(() => {
      detail.classList.add('active');
    }, 300);

    this.currentView = 'detail';
  }

  showTimeline() {
    const timeline = this.container.querySelector('.financialmodel-timeline');
    const detail = this.container.querySelector('.financialmodel-detail');

    if (!timeline || !detail) return;

    detail.classList.remove('active');
    
    setTimeout(() => {
      timeline.classList.remove('hidden');
    }, 300);

    this.currentView = 'timeline';
  }
}

// Initialize when DOM is ready
function initfinancialmodel() {
  try {
    const container = document.querySelector('.financialmodel-container');
    if (!container) {
      console.warn('financialmodel: container not found, retrying...');
      // Limite de tentativas para evitar loop infinito
      if (!window._financialmodelRetries) window._financialmodelRetries = 0;
      window._financialmodelRetries++;
      if (window._financialmodelRetries < 50) { // Máximo 5 segundos
        setTimeout(initfinancialmodel, 100);
      }
      return;
    }
    
    // Verificar se já foi inicializado
    if (container.dataset.initialized === 'true') return;
    container.dataset.initialized = 'true';
    
    console.log('financialmodel: initializing...');
    const timeline = new financialmodelTimeline();
    
    if (!timeline.container) {
      console.error('financialmodel: failed to initialize timeline');
      return;
    }
    
    console.log('financialmodel: initialized successfully');
    
    // Listener para garantir visibilidade quando a página volta ao foco
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        timeline.ensureVisibility();
      }
    });
  } catch (error) {
    console.error('financialmodel: initialization error', error);
  }
}

// Tentar inicializar imediatamente se DOM já estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initfinancialmodel);
} else {
  // DOM já está pronto
  initfinancialmodel();
}

// Fallback: tentar novamente após window.onload
window.addEventListener('load', () => {
  const container = document.querySelector('.financialmodel-container');
  if (container && container.dataset.initialized !== 'true') {
    initfinancialmodel();
  }
});

})(); // End IIFE
