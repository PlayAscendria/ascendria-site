/**
 * Ecosystem Interactive Graph
 * 3 menus principais com submenus
 */

class EcosystemGraph {
    constructor(container) {
        this.container = container;
        this.graphView = null;
        this.detailView = null;
        this.eraserCanvas = null;
        this.currentModule = null;
        this.isAnimating = false;
        
        // 3 Menus principais
        this.modules = {
            rankings: {
                icon: '/assets/images/ecosystem/rankings.png',
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
                icon: '/assets/images/ecosystem/ascendria.png',
                label: 'ASCENDRIA',
                title: 'Ascendria Games',
                hasSubmenu: true,
                submenu: [
                    {
                        id: 'idlemines',
                        icon: '/assets/images/ecosystem/idle_mines.png',
                        label: 'IDLE MINES',
                        title: 'Idle Mines',
                        content: `
                            <p>Idle Mines is a passive resource gathering game in the Ascendria ecosystem.</p>
                            <h3>How It Works</h3>
                            <ul>
                                <li>Deploy miners to extract valuable resources</li>
                                <li>Upgrade equipment for better yields</li>
                                <li>Collect resources even while offline</li>
                                <li>Trade resources on the marketplace</li>
                            </ul>
                            <p>Resources mined can be used across all Ascendria games or sold for tokens.</p>
                        `
                    },
                    {
                        id: 'cardinals',
                        icon: '/assets/images/ecosystem/cardnals_row.png',
                        label: 'CARDINALS ROW',
                        title: 'Cardinals Row',
                        content: `
                            <p>Cardinals Row is an exciting card-based strategy game within the Ascendria universe.</p>
                            <h3>Gameplay</h3>
                            <ul>
                                <li>Collect and trade unique character cards</li>
                                <li>Build powerful decks with synergies</li>
                                <li>Compete in ranked tournaments</li>
                                <li>Earn rewards and rare cards</li>
                            </ul>
                            <p>Strategic card battles with NFT integration. Your cards are truly yours!</p>
                        `
                    },
                    {
                        id: 'champions',
                        icon: '/assets/images/ecosystem/champions.png',
                        label: 'CHAMPIONS',
                        title: 'Champions of Ascendria',
                        content: `
                            <p>Champions of Ascendria is the flagship PvP battle arena.</p>
                            <h3>Features</h3>
                            <ul>
                                <li>Real-time strategic combat</li>
                                <li>Unique champion abilities</li>
                                <li>Ranked competitive seasons</li>
                                <li>Esports tournaments with prizes</li>
                            </ul>
                            <p>Choose your champion and fight for glory in the arena!</p>
                        `
                    },
                    {
                        id: 'forges',
                        icon: '/assets/images/ecosystem/forges.png',
                        label: 'FORGES',
                        title: 'Forges of Ascendria',
                        content: `
                            <p>Forges of Ascendria is the crafting and creation hub.</p>
                            <h3>Features</h3>
                            <ul>
                                <li>Craft powerful weapons and armor</li>
                                <li>Combine resources for rare items</li>
                                <li>Upgrade NFT equipment stats</li>
                                <li>Create unique cosmetic items</li>
                            </ul>
                            <p>Master the forges to create legendary equipment!</p>
                        `
                    },
                    {
                        id: 'depths',
                        icon: '/assets/images/ecosystem/depths.png',
                        label: 'DEPTHS',
                        title: 'Depths of Ascendria',
                        content: `
                            <p>Depths of Ascendria is the dungeon exploration experience.</p>
                            <h3>Features</h3>
                            <ul>
                                <li>Procedurally generated dungeons</li>
                                <li>Co-op multiplayer raids</li>
                                <li>Boss battles with rare drops</li>
                                <li>Progressive difficulty scaling</li>
                            </ul>
                            <p>Venture into the depths and claim legendary treasures!</p>
                        `
                    }
                ]
            },
            community: {
                icon: '/assets/images/ecosystem/community.png',
                label: 'COMMUNITY',
                title: 'Community Hub',
                hasSubmenu: true,
                submenu: [
                    {
                        id: 'external_impulse',
                        icon: '/assets/images/ecosystem/external_impulse.png',
                        label: 'EXTERNAL IMPULSE',
                        title: 'External Impulse (DAO)',
                        content: `
                            <p>Ascendria operates as a Decentralized Autonomous Organization.</p>
                            <h3>Voting Power</h3>
                            <ul>
                                <li>1 $ASCEND = 1 Vote</li>
                                <li>Staked tokens receive 1.5x voting power</li>
                                <li>Legendary NFT holders get proposal creation rights</li>
                            </ul>
                            <p>Shape the future of Ascendria with your vote!</p>
                        `
                    },
                    {
                        id: 'marketplace',
                        icon: '/assets/images/ecosystem/market_place.png',
                        label: 'MARKETPLACE',
                        title: 'Marketplace',
                        content: `
                            <p>A decentralized marketplace for trading NFTs, items, and resources.</p>
                            <h3>Features</h3>
                            <ul>
                                <li>Low transaction fees (2.5%)</li>
                                <li>Instant settlements on blockchain</li>
                                <li>Auction and fixed-price listings</li>
                                <li>Verified collections</li>
                            </ul>
                            <p>Trade with confidence using our escrow system!</p>
                        `
                    },
                    {
                        id: 'nfts',
                        icon: '/assets/images/ecosystem/nfts.png',
                        label: 'NFTs',
                        title: 'NFT Collection',
                        content: `
                            <p>True ownership of in-game assets, characters, and collectibles.</p>
                            <h3>NFT Types</h3>
                            <ul>
                                <li><strong>Characters:</strong> Unique heroes with special abilities</li>
                                <li><strong>Equipment:</strong> Weapons, armor, and accessories</li>
                                <li><strong>Land:</strong> Virtual territories in Aurélia</li>
                                <li><strong>Collectibles:</strong> Limited edition art and items</li>
                            </ul>
                        `
                    },
                    {
                        id: 'staking',
                        icon: '/assets/images/ecosystem/staking.png',
                        label: 'STAKING',
                        title: 'Staking & Rewards',
                        content: `
                            <p>Stake your tokens and NFTs to earn passive rewards.</p>
                            <h3>Staking Options</h3>
                            <ul>
                                <li><strong>Token Staking:</strong> Lock $ASCEND for APY rewards</li>
                                <li><strong>NFT Staking:</strong> Stake characters for daily bonuses</li>
                                <li><strong>LP Staking:</strong> Provide liquidity for enhanced yields</li>
                            </ul>
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
        this.homeButton.innerHTML = `<img src="/assets/images/ecosystem/home.png" alt="Home" />`;
        this.detailView.insertBefore(this.homeButton, this.detailView.firstChild);
        
        // Criar botão Back (volta para página anterior)
        this.backButton = document.createElement('button');
        this.backButton.className = 'detail-back';
        this.backButton.setAttribute('aria-label', 'Voltar');
        this.backButton.setAttribute('type', 'button');
        this.backButton.innerHTML = `<img src="/assets/images/ecosystem/back.png" alt="Voltar" />`;
        this.detailView.insertBefore(this.backButton, this.detailView.firstChild);
        
        // Eraser overlay para animação
        const eraserOverlay = document.createElement('div');
        eraserOverlay.className = 'eraser-overlay';
        this.eraserCanvas = document.createElement('canvas');
        eraserOverlay.appendChild(this.eraserCanvas);
        
        // Adicionar ao container
        this.container.appendChild(this.graphView);
        this.container.appendChild(this.detailView);
        this.container.appendChild(eraserOverlay);
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
        
        // Preencher conteúdo do detalhe
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
        
        // Animar borracha apagando
        await this.eraserAnimation('erase');
        
        // Trocar views
        this.graphView.classList.add('hidden');
        this.detailView.classList.add('active');
        
        // Animar borracha revelando
        await this.eraserAnimation('reveal');
        
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
            // Animar borracha apagando
            await this.eraserAnimation('erase');
            
            // Mostrar botão back quando em submenu item
            this.backButton.classList.add('visible');
            
            const detailIcon = this.detailView.querySelector('.detail-icon');
            detailIcon.src = foundItem.icon;
            detailIcon.alt = foundItem.label;
            this.detailView.querySelector('.detail-title').textContent = foundItem.title;
            this.detailView.querySelector('.detail-content').innerHTML = foundItem.content;
            
            // Animar borracha revelando
            await this.eraserAnimation('reveal');
        }
        
        this.isAnimating = false;
    }
    
    async goBackToSubmenu() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        const module = this.modules[this.currentModule];
        
        // Animar borracha apagando
        await this.eraserAnimation('erase');
        
        // Esconder botão back
        this.backButton.classList.remove('visible');
        
        // Preencher com o submenu
        const detailIcon = this.detailView.querySelector('.detail-icon');
        detailIcon.src = module.icon;
        detailIcon.alt = module.label;
        this.detailView.querySelector('.detail-title').textContent = module.title;
        this.detailView.querySelector('.detail-content').innerHTML = this.createSubmenuHTML(module.submenu);
        this.bindSubmenuEvents();
        
        // Animar borracha revelando
        await this.eraserAnimation('reveal');
        
        this.isAnimating = false;
    }
    
    async closeModule() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        // Animar borracha apagando
        await this.eraserAnimation('erase');
        
        // Trocar views
        this.detailView.classList.remove('active');
        this.graphView.classList.remove('hidden');
        
        // Animar borracha revelando
        await this.eraserAnimation('reveal');
        
        this.currentModule = null;
        this.isAnimating = false;
    }
    
    async eraserAnimation(mode) {
        return new Promise((resolve) => {
            const canvas = this.eraserCanvas;
            const ctx = canvas.getContext('2d');
            
            // Ajustar tamanho do canvas
            const rect = this.container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            
            // Criar degradê de azuis (cores do portal)
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#00e6ff');    // Cyan brilhante
            gradient.addColorStop(0.3, '#1a99e6');  // Azul médio
            gradient.addColorStop(0.6, '#0066b3');  // Azul
            gradient.addColorStop(1, '#004d80');    // Azul escuro
            
            // Diagonal: da esquerda superior para direita inferior
            const diagonal = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
            const angle = Math.atan2(canvas.height, canvas.width);
            
            if (mode === 'erase') {
                // Animação de APAGAR: linha diagonal varredura esquerda-superior → direita-inferior
                let progress = 0;
                const speed = 0.025;
                
                const animate = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    
                    // Calcular posição da "borracha" na diagonal
                    const sweepProgress = this.easeInOutCubic(progress);
                    const sweepX = sweepProgress * (canvas.width + canvas.height);
                    
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    
                    // Criar polígono que representa a área "apagada"
                    // Começa no canto superior esquerdo e varre diagonalmente
                    ctx.moveTo(0, 0);
                    
                    if (sweepX <= canvas.width) {
                        // Fase 1: a linha ainda não chegou na borda direita
                        ctx.lineTo(sweepX, 0);
                        ctx.lineTo(0, sweepX);
                    } else if (sweepX <= canvas.height) {
                        // Fase 2: a linha chegou na borda direita mas não na inferior
                        ctx.lineTo(canvas.width, 0);
                        ctx.lineTo(canvas.width, sweepX - canvas.width);
                        ctx.lineTo(0, sweepX);
                    } else if (sweepX <= canvas.width + canvas.height) {
                        // Fase 3: varrendo o canto inferior direito
                        ctx.lineTo(canvas.width, 0);
                        ctx.lineTo(canvas.width, Math.min(canvas.height, sweepX - canvas.width));
                        ctx.lineTo(Math.max(0, sweepX - canvas.height), canvas.height);
                        ctx.lineTo(0, canvas.height);
                    } else {
                        // Completo
                        ctx.lineTo(canvas.width, 0);
                        ctx.lineTo(canvas.width, canvas.height);
                        ctx.lineTo(0, canvas.height);
                    }
                    
                    ctx.closePath();
                    ctx.fill();
                    
                    // Adicionar efeito de "rastro de borracha" - linhas onduladas na borda
                    this.drawEraserEdge(ctx, sweepX, canvas.width, canvas.height, '#00e6ff');
                    
                    progress += speed;
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        // Preencher completamente
                        ctx.fillStyle = gradient;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        resolve();
                    }
                };
                
                animate();
            } else {
                // Animação de REVELAR: mesma direção, mas "escrevendo" (removendo a cobertura)
                const gradientReveal = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                gradientReveal.addColorStop(0, '#00e6ff');
                gradientReveal.addColorStop(0.3, '#1a99e6');
                gradientReveal.addColorStop(0.6, '#0066b3');
                gradientReveal.addColorStop(1, '#004d80');
                
                ctx.fillStyle = gradientReveal;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                let progress = 0;
                const speed = 0.025;
                
                const animate = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    
                    const sweepProgress = this.easeInOutCubic(progress);
                    const sweepX = sweepProgress * (canvas.width + canvas.height);
                    
                    ctx.fillStyle = gradientReveal;
                    ctx.beginPath();
                    
                    // Área que AINDA está coberta (inverso do erase)
                    // Começa do ponto atual da varredura até o canto inferior direito
                    
                    if (sweepX <= canvas.width) {
                        ctx.moveTo(sweepX, 0);
                        ctx.lineTo(canvas.width, 0);
                        ctx.lineTo(canvas.width, canvas.height);
                        ctx.lineTo(0, canvas.height);
                        ctx.lineTo(0, sweepX);
                    } else if (sweepX <= canvas.height) {
                        ctx.moveTo(canvas.width, sweepX - canvas.width);
                        ctx.lineTo(canvas.width, canvas.height);
                        ctx.lineTo(0, canvas.height);
                        ctx.lineTo(0, sweepX);
                    } else if (sweepX <= canvas.width + canvas.height) {
                        const bottomX = sweepX - canvas.height;
                        const rightY = sweepX - canvas.width;
                        
                        if (rightY < canvas.height && bottomX < canvas.width) {
                            ctx.moveTo(canvas.width, rightY);
                            ctx.lineTo(canvas.width, canvas.height);
                            ctx.lineTo(bottomX, canvas.height);
                        }
                    }
                    
                    ctx.closePath();
                    ctx.fill();
                    
                    // Efeito de borda na escrita
                    this.drawEraserEdge(ctx, sweepX, canvas.width, canvas.height, '#00e6ff');
                    
                    progress += speed;
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        resolve();
                    }
                };
                
                animate();
            }
        });
    }
    
    // Desenha efeito ondulado na borda da borracha
    drawEraserEdge(ctx, sweepX, width, height, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        
        // Calcular pontos da linha diagonal atual
        const points = [];
        const waveAmplitude = 5;
        const waveFrequency = 0.05;
        
        for (let i = 0; i <= Math.max(width, height); i += 10) {
            let x, y;
            
            if (sweepX <= width) {
                x = sweepX - i;
                y = i;
            } else {
                x = width - i;
                y = sweepX - width + i;
            }
            
            if (x >= 0 && x <= width && y >= 0 && y <= height) {
                // Adicionar ondulação
                const wave = Math.sin(i * waveFrequency + sweepX * 0.1) * waveAmplitude;
                points.push({ x: x + wave * 0.7, y: y + wave * 0.7 });
            }
        }
        
        if (points.length > 1) {
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.stroke();
        }
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
        
        // Checar posição inicial
        this.checkScroll();
        
        // Listener de scroll
        scrollContainer.addEventListener('scroll', () => this.checkScroll(), { passive: true });
        
        // Também checar no resize
        window.addEventListener('resize', () => this.checkScroll(), { passive: true });
    }
    
    checkScroll() {
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
