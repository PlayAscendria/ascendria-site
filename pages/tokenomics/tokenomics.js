/**
 * Tokenomics Interactive Timeline
 * Sistema de linha do tempo horizontal com nodes clicáveis e progresso baseado em data
 */

class TokenomicsTimeline {
  constructor() {
    this.container = document.querySelector('.tokenomics-container');
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
        <h3>Genesis - The Beginning</h3>
        <p>The Genesis phase marks the foundation of Ascendria's economic ecosystem. This is where it all begins - the birth of our token and the establishment of the core tokenomics structure.</p>
        
        <h4>Initial Token Distribution</h4>
        <table>
          <thead>
            <tr>
              <th>Allocation</th>
              <th>Percentage</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Community Rewards</td>
              <td>40%</td>
              <td>Play-to-Earn, Staking, Events</td>
            </tr>
            <tr>
              <td>Development Fund</td>
              <td>20%</td>
              <td>Game Development & Infrastructure</td>
            </tr>
            <tr>
              <td>Team & Advisors</td>
              <td>15%</td>
              <td>Vesting over 24 months</td>
            </tr>
            <tr>
              <td>Treasury</td>
              <td>15%</td>
              <td>Strategic Partnerships & Growth</td>
            </tr>
            <tr>
              <td>Initial Liquidity</td>
              <td>10%</td>
              <td>DEX & CEX Listings</td>
            </tr>
          </tbody>
        </table>
        
        <p>The Genesis phase establishes the economic foundation that will support all future game expansions and ecosystem growth.</p>
      `,
      
      custom: `
        <h3>Custom - NFT Customization Economy</h3>
        <p>The Custom phase introduces the NFT customization system, allowing players to personalize their characters and assets with unique visual elements.</p>
        
        <h4>Customization Token Sinks</h4>
        <ul>
          <li>Character Skins & Outfits</li>
          <li>Weapon Visual Effects</li>
          <li>Mount Customizations</li>
          <li>Housing Decorations</li>
          <li>Exclusive Titles & Badges</li>
        </ul>
        
        <h4>Economic Impact</h4>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Token Cost Range</th>
              <th>Burn Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Common Skins</td>
              <td>100-500 $ASC</td>
              <td>50%</td>
            </tr>
            <tr>
              <td>Rare Skins</td>
              <td>500-2,000 $ASC</td>
              <td>60%</td>
            </tr>
            <tr>
              <td>Epic Skins</td>
              <td>2,000-10,000 $ASC</td>
              <td>70%</td>
            </tr>
            <tr>
              <td>Legendary Skins</td>
              <td>10,000+ $ASC</td>
              <td>80%</td>
            </tr>
          </tbody>
        </table>
      `,
      
      idle_mines: `
        <h3>Idle Mines - Passive Income Economy</h3>
        <p>Idle Mines introduces the passive income mechanics, allowing players to generate resources even when offline.</p>
        
        <h4>Mining Tiers</h4>
        <table>
          <thead>
            <tr>
              <th>Mine Level</th>
              <th>Investment</th>
              <th>Daily Yield</th>
              <th>ROI Period</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bronze Mine</td>
              <td>1,000 $ASC</td>
              <td>5 $ASC</td>
              <td>200 days</td>
            </tr>
            <tr>
              <td>Silver Mine</td>
              <td>5,000 $ASC</td>
              <td>30 $ASC</td>
              <td>167 days</td>
            </tr>
            <tr>
              <td>Gold Mine</td>
              <td>20,000 $ASC</td>
              <td>140 $ASC</td>
              <td>143 days</td>
            </tr>
            <tr>
              <td>Diamond Mine</td>
              <td>100,000 $ASC</td>
              <td>800 $ASC</td>
              <td>125 days</td>
            </tr>
          </tbody>
        </table>
        
        <h4>Upgrade System</h4>
        <p>Players can upgrade mines to increase efficiency, reduce cooldowns, and unlock special bonuses.</p>
      `,
      
      cardinals_row: `
        <h3>Cardinals Row - Strategic Card Game</h3>
        <p>Cardinals Row brings a competitive card game to Ascendria with its own economic layer.</p>
        
        <h4>Card Economy</h4>
        <table>
          <thead>
            <tr>
              <th>Rarity</th>
              <th>Minting Cost</th>
              <th>Trading Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Common</td>
              <td>50 $ASC</td>
              <td>2%</td>
            </tr>
            <tr>
              <td>Uncommon</td>
              <td>200 $ASC</td>
              <td>3%</td>
            </tr>
            <tr>
              <td>Rare</td>
              <td>1,000 $ASC</td>
              <td>4%</td>
            </tr>
            <tr>
              <td>Epic</td>
              <td>5,000 $ASC</td>
              <td>5%</td>
            </tr>
            <tr>
              <td>Legendary</td>
              <td>25,000 $ASC</td>
              <td>6%</td>
            </tr>
          </tbody>
        </table>
        
        <h4>Tournament Rewards</h4>
        <p>Weekly and monthly tournaments with prize pools funded by entry fees and treasury allocations.</p>
      `,
      
      championships: `
        <h3>Championships - Competitive Seasons</h3>
        <p>Championships introduces seasonal competitive play with substantial rewards for top performers.</p>
        
        <h4>Season Structure</h4>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Prize Pool %</th>
              <th>Exclusive Rewards</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Champion</td>
              <td>30%</td>
              <td>Unique Title + Legendary NFT</td>
            </tr>
            <tr>
              <td>Top 3</td>
              <td>20%</td>
              <td>Epic NFT Set</td>
            </tr>
            <tr>
              <td>Top 10</td>
              <td>15%</td>
              <td>Rare NFT</td>
            </tr>
            <tr>
              <td>Top 100</td>
              <td>20%</td>
              <td>Exclusive Badge</td>
            </tr>
            <tr>
              <td>Participants</td>
              <td>15%</td>
              <td>Season Token Rewards</td>
            </tr>
          </tbody>
        </table>
        
        <h4>Entry System</h4>
        <p>Stake tokens to enter ranked matches. Higher stakes = higher rewards potential.</p>
      `,
      
      champions: `
        <h3>Champions - Hero NFT System</h3>
        <p>Champions introduces collectible hero NFTs with unique abilities and earning potential.</p>
        
        <h4>Champion Tiers</h4>
        <table>
          <thead>
            <tr>
              <th>Tier</th>
              <th>Max Supply</th>
              <th>Base Earning Bonus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bronze Champion</td>
              <td>10,000</td>
              <td>+5%</td>
            </tr>
            <tr>
              <td>Silver Champion</td>
              <td>5,000</td>
              <td>+15%</td>
            </tr>
            <tr>
              <td>Gold Champion</td>
              <td>2,000</td>
              <td>+30%</td>
            </tr>
            <tr>
              <td>Platinum Champion</td>
              <td>500</td>
              <td>+50%</td>
            </tr>
            <tr>
              <td>Legendary Champion</td>
              <td>100</td>
              <td>+100%</td>
            </tr>
          </tbody>
        </table>
        
        <h4>Fusion System</h4>
        <p>Combine multiple Champions to create higher tier versions with enhanced abilities.</p>
      `,
      
      forges: `
        <h3>Forges - Crafting Economy</h3>
        <p>Forges enables item crafting with resource gathering and manufacturing mechanics.</p>
        
        <h4>Forge Levels</h4>
        <table>
          <thead>
            <tr>
              <th>Level</th>
              <th>Upgrade Cost</th>
              <th>Craft Speed</th>
              <th>Success Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic Forge</td>
              <td>Free</td>
              <td>1x</td>
              <td>70%</td>
            </tr>
            <tr>
              <td>Advanced Forge</td>
              <td>5,000 $ASC</td>
              <td>1.5x</td>
              <td>80%</td>
            </tr>
            <tr>
              <td>Master Forge</td>
              <td>25,000 $ASC</td>
              <td>2x</td>
              <td>90%</td>
            </tr>
            <tr>
              <td>Legendary Forge</td>
              <td>100,000 $ASC</td>
              <td>3x</td>
              <td>95%</td>
            </tr>
          </tbody>
        </table>
        
        <h4>Material Economy</h4>
        <p>Gather materials through gameplay, trade on marketplace, or purchase with tokens.</p>
      `,
      
      depths: `
        <h3>Depths - Dungeon Exploration</h3>
        <p>Depths introduces procedurally generated dungeons with risk-reward mechanics.</p>
        
        <h4>Dungeon Tiers</h4>
        <table>
          <thead>
            <tr>
              <th>Depth Level</th>
              <th>Entry Fee</th>
              <th>Avg. Reward</th>
              <th>Risk Factor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Shallow Depths</td>
              <td>100 $ASC</td>
              <td>150 $ASC</td>
              <td>Low</td>
            </tr>
            <tr>
              <td>Mid Depths</td>
              <td>500 $ASC</td>
              <td>900 $ASC</td>
              <td>Medium</td>
            </tr>
            <tr>
              <td>Deep Abyss</td>
              <td>2,000 $ASC</td>
              <td>4,500 $ASC</td>
              <td>High</td>
            </tr>
            <tr>
              <td>Void Realm</td>
              <td>10,000 $ASC</td>
              <td>30,000 $ASC</td>
              <td>Extreme</td>
            </tr>
          </tbody>
        </table>
        
        <h4>Boss Encounters</h4>
        <p>Special boss encounters with guaranteed NFT drops for successful completion.</p>
      `,
      
      future: `
        <h3>Future - Roadmap & Expansion</h3>
        <p>The Future phase outlines upcoming features and long-term economic sustainability plans.</p>
        
        <h4>Upcoming Features</h4>
        <ul>
          <li>Cross-chain Integration</li>
          <li>Governance Token Launch</li>
          <li>Land Ownership System</li>
          <li>Guild Wars Economy</li>
          <li>Mobile Platform Launch</li>
          <li>Esports League</li>
        </ul>
        
        <h4>Long-term Sustainability</h4>
        <table>
          <thead>
            <tr>
              <th>Mechanism</th>
              <th>Purpose</th>
              <th>Target</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Token Burns</td>
              <td>Deflationary Pressure</td>
              <td>2% monthly</td>
            </tr>
            <tr>
              <td>Staking Rewards</td>
              <td>Holder Incentives</td>
              <td>8-15% APY</td>
            </tr>
            <tr>
              <td>Treasury Growth</td>
              <td>Ecosystem Fund</td>
              <td>5% of fees</td>
            </tr>
            <tr>
              <td>Buyback Program</td>
              <td>Price Support</td>
              <td>1% revenue</td>
            </tr>
          </tbody>
        </table>
        
        <p>Our vision extends beyond gaming - building a sustainable digital economy for generations of players.</p>
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
    const timeline = this.container.querySelector('.tokenomics-timeline');
    const detail = this.container.querySelector('.tokenomics-detail');
    
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
      <div class="tokenomics-timeline">
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
      <div class="tokenomics-detail">
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

    const timeline = this.container.querySelector('.tokenomics-timeline');
    const detail = this.container.querySelector('.tokenomics-detail');
    
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
    const timeline = this.container.querySelector('.tokenomics-timeline');
    const detail = this.container.querySelector('.tokenomics-detail');

    if (!timeline || !detail) return;

    detail.classList.remove('active');
    
    setTimeout(() => {
      timeline.classList.remove('hidden');
    }, 300);

    this.currentView = 'timeline';
  }
}

// Initialize when DOM is ready
function initTokenomics() {
  try {
    const container = document.querySelector('.tokenomics-container');
    if (!container) {
      console.warn('Tokenomics: container not found, retrying...');
      // Limite de tentativas para evitar loop infinito
      if (!window._tokenomicsRetries) window._tokenomicsRetries = 0;
      window._tokenomicsRetries++;
      if (window._tokenomicsRetries < 50) { // Máximo 5 segundos
        setTimeout(initTokenomics, 100);
      }
      return;
    }
    
    // Verificar se já foi inicializado
    if (container.dataset.initialized === 'true') return;
    container.dataset.initialized = 'true';
    
    console.log('Tokenomics: initializing...');
    const timeline = new TokenomicsTimeline();
    
    if (!timeline.container) {
      console.error('Tokenomics: failed to initialize timeline');
      return;
    }
    
    console.log('Tokenomics: initialized successfully');
    
    // Listener para garantir visibilidade quando a página volta ao foco
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        timeline.ensureVisibility();
      }
    });
  } catch (error) {
    console.error('Tokenomics: initialization error', error);
  }
}

// Tentar inicializar imediatamente se DOM já estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTokenomics);
} else {
  // DOM já está pronto
  initTokenomics();
}

// Fallback: tentar novamente após window.onload
window.addEventListener('load', () => {
  const container = document.querySelector('.tokenomics-container');
  if (container && container.dataset.initialized !== 'true') {
    initTokenomics();
  }
});
