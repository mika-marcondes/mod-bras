(function () {
    'use strict';
    /**
     *  Remove a trava da viewport,
     *  permitindo que o flexbox se adapte 
     *  ao tamanho da tela.
     */
    function fixViewport() {
        const meta = document.querySelector('meta[name=viewport]');
        if (meta) {
            meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
    }
    
    /**
     * Injeta estilos CSS para corrigir a visualização
     * em dispositivos móveis. 
     */
    function injectMobileCSS() {
        const style = document.createElement('style');
        style.id = 'braslol-portrait-fix';
        style.textContent = `

            /* ── Hamburger Button ── */
            .hamburger-btn {
                display: none;
                position: fixed;
                top: 10px;
                left: 10px;
                z-index: 9998;
                background: var(--dash-sidebar);
                border: 1px solid var(--dash-border);
                color: #fff;
                font-size: 24px;
                width: 44px;
                height: 44px;
                border-radius: 8px;
                cursor: pointer;
                align-items: center;
                justify-content: center;
            }

            /* ── Sidebar Overlay (backdrop) ── */
            .sidebar-overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                z-index: 9996;
            }
            .sidebar-overlay.active {
                display: block;
            }

            @media (max-width: 768px) {

                /* Transform sidebar into slide-in drawer */
                .dash-sidebar-left {
                    position: fixed !important;
                    top: 0 !important;
                    left: -280px !important;
                    width: 260px !important;
                    height: 100vh !important;
                    z-index: 9997 !important;
                    flex-direction: column !important;
                    flex-wrap: nowrap !important;
                    border-right: 1px solid var(--dash-border) !important;
                    border-bottom: none !important;
                    padding: 20px 0 !important;
                    overflow-y: auto !important;
                    transition: left 0.3s ease !important;
                    background: var(--dash-sidebar) !important;
                }

                /* When open */
                .dash-sidebar-left.drawer-open {
                    left: 0 !important;
                }

                /* Restore menu item icons (they're hidden in the native 768px query) */
                .dash-sidebar-left.drawer-open .menu-icon-img {
                    display: inline !important;
                    width: 20px !important;
                    height: 20px !important;
                }

                .dash-sidebar-left.drawer-open .dash-menu-item {
                    font-size: 14px !important;
                    padding: 12px 20px !important;
                    margin: 2px 10px !important;
                    flex: unset !important;
                }

                /* Coach info back to vertical */
                .dash-sidebar-left.drawer-open .dash-coach-info {
                    flex-direction: column !important;
                    margin-top: auto !important;
                    padding: 20px !important;
                }

                /* Main area takes full width */
                .dash-main-area {
                    padding-top: 60px !important;
                }

                /* ── Issue #1: Hide original info cards ── */
                .dash-header-row {
                    display: none !important;
                }

                /* ── Issue #1: Season label below card ── */
                .season-label {
                    font-size: 12px;
                    color: var(--text-dim);
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    padding: 4px 4px 10px;
                }

                /* ── Issue #1: Collapsible info card ── */
                .info-card {
                    position: relative;
                    background: var(--dash-panel);
                    border: 1px solid var(--dash-border);
                    border-radius: 10px;
                    margin-bottom: 12px;
                    overflow: hidden;
                    cursor: pointer;
                    -webkit-tap-highlight-color: transparent;
                }
                .info-card-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 14px;
                    min-height: 44px;
                }
                .info-card-header img {
                    width: 24px;
                    height: 24px;
                    object-fit: contain;
                    border-radius: 4px;
                }
                .info-card-name {
                    font-weight: 800;
                    font-size: 14px;
                    color: #fff;
                }
                .info-card-money {
                    font-size: 13px;
                    font-weight: 700;
                    color: var(--dash-green);
                    margin-left: auto;
                }
                .info-card-week {
                    font-size: 11px;
                    color: var(--text-dim);
                    font-weight: 600;
                }
                .info-card-chevron {
                    font-size: 14px;
                    color: var(--text-dim);
                    transition: transform 0.3s ease;
                    margin-left: 4px;
                }
                .info-card.expanded .info-card-chevron {
                    transform: rotate(180deg);
                }

                /* Expandable body */
                .info-card-body {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease;
                    border-top: 0px solid transparent;
                }
                .info-card.expanded .info-card-body {
                    max-height: 300px;
                    border-top: 1px solid var(--dash-border);
                }
                .info-card-grid {
                    display: grid;
                    gap: 0;
                    padding: 12px 14px;
                }
                .info-card-grid-row {
                    display: grid;
                    gap: 8px;
                    padding: 8px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .info-card-grid-row:last-child {
                    border-bottom: none;
                }
                .info-card-grid-row.cols-3 {
                    grid-template-columns: 1fr 1fr 1fr;
                }
                .info-card-grid-row.cols-2 {
                    grid-template-columns: 1fr 1fr;
                }
                .info-card-stat-label {
                    font-size: 9px;
                    color: var(--text-dim);
                    text-transform: uppercase;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                    margin-bottom: 2px;
                }
                .info-card-stat-value {
                    font-size: 14px;
                    font-weight: 800;
                    color: #fff;
                }

                /* Raise dashboard above modals when drawer is open */
                #dashboard.drawer-active {
                    z-index: 10001 !important;
                }

                /* Fix #5: Hide hamburger behind sidebar when drawer is open */
                .hamburger-btn.drawer-open {
                    z-index: 99999 !important;
                    left: 215px !important;
                    background: transparent !important;
                    border: none !important;
                    font-size: 28px !important;
                }

                /* Fix #4: Setup screen scroll */
                #setup-screen {
                    overflow-y: auto !important;
                    -webkit-overflow-scrolling: touch !important;
                }

                /* Tooltips: constrain within viewport */
                .help-tooltip {
                    max-width: calc(100vw - 40px) !important;
                    width: 240px !important;
                    left: auto !important;
                    right: -10px !important;
                    transform: none !important;
                }
                .help-tooltip:after {
                    left: auto !important;
                    right: 15px !important;
                }

                /* Standings table: use full width */
                .dash-table {
                    display: table !important;
                    white-space: normal !important;
                    width: 100% !important;
                }
                .dash-table td,
                .dash-table th {
                    padding: 10px 8px !important;
                    font-size: 14px !important;
                }

                /* Transfer tabs: compact segmented control */
                .transfer-tabs {
                    display: flex !important;
                    gap: 0 !important;
                    padding: 4px !important;
                    background: #0a0a0c !important;
                    border: 1px solid var(--dash-border) !important;
                    border-radius: 8px !important;
                    border-bottom: none !important;
                    margin-bottom: 12px !important;
                }
                .tab-btn {
                    flex: 1 !important;
                    font-size: 11px !important;
                    padding: 8px 4px !important;
                    text-align: center !important;
                    border-radius: 6px !important;
                    border-bottom: none !important;
                    white-space: nowrap !important;
                }
                .tab-btn.active {
                    background: var(--dash-purple) !important;
                    color: #fff !important;
                    border-bottom: none !important;
                }

                /* ── Ver Times: Region buttons ── */
                #dash-teams-panel > div:first-child > div:last-child {
                    overflow-x: auto !important;
                    -webkit-overflow-scrolling: touch !important;
                    flex-wrap: nowrap !important;
                    margin-left: 0 !important;
                    padding-bottom: 4px !important;
                }
                .teams-region-btn {
                    white-space: nowrap !important;
                    flex-shrink: 0 !important;
                }

                /* ── Ver Times: Voltar button full width ── */
                #dash-teams-panel > div:first-child > button {
                    width: 100% !important;
                    text-align: center !important;
                    padding: 12px !important;
                    font-size: 14px !important;
                }

                /* ── Ver Times: Title contained ── */
                #dash-teams-panel > div:first-child > div:nth-child(2) {
                    overflow: hidden !important;
                    word-wrap: break-word !important;
                }
                #dash-teams-panel > div:first-child > div:nth-child(2) > div:first-child {
                    font-size: 16px !important;
                    white-space: normal !important;
                }

                /* ── Ver Times: Panel containment ── */
                #dash-teams-panel .dash-panel {
                    overflow: hidden !important;
                    max-width: 100% !important;
                }
                #dash-teams-panel .dash-panel > div > div:last-child {
                    overflow-x: auto !important;
                    max-width: 100% !important;
                }

                /* ── Ver Times: Team list + roster layout ── */
                #dash-teams-panel .dash-panel > div {
                    flex-direction: column !important;
                    gap: 12px !important;
                }
                #all-teams-list {
                    width: 100% !important;
                    flex-direction: row !important;
                    flex-wrap: nowrap !important;
                    overflow-x: auto !important;
                    -webkit-overflow-scrolling: touch !important;
                    max-height: none !important;
                    gap: 6px !important;
                    padding-bottom: 8px !important;
                }
                #all-teams-list > * {
                    flex-shrink: 0 !important;
                    min-width: 100px !important;
                    font-size: 11px !important;
                    padding: 6px 10px !important;
                }

                /* ── Ver Times: Player table scroll ── */
                #dash-teams-panel .dash-table {
                    display: block !important;
                    overflow-x: auto !important;
                    -webkit-overflow-scrolling: touch !important;
                    white-space: nowrap !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     *  Cria e controla a exibição e funcionalidade 
     *  do botão de menu hambúrguer
     */
    function setupHamburgerMenu() {
        // Botão
        const btn = document.createElement('button');
        btn.className = 'hamburger-btn';
        btn.innerHTML = '☰';
        btn.title = 'Menu';
        document.body.appendChild(btn);
        
        // Overlay (clica e fecha o menu) 
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);

        /**
         *  Atualiza e controla a visibilidade do botão.
         */
        function updateBtnVisibility() {
            const dash = document.getElementById('dashboard');
            const mainMenu = document.getElementById('main-menu');
            const setup = document.getElementById('setup-screen');

            const dashVisible = dash && !dash.classList.contains('hidden');
            const menuVisible = mainMenu && !mainMenu.classList.contains('hidden');
            const setupVisible = setup && !setup.classList.contains('hidden');

            const shouldShow = dashVisible && !menuVisible && !setupVisible;
            btn.style.display = shouldShow ? 'flex' : 'none';
        }

        // Observa por mudanças na tela
        const observer = new MutationObserver(updateBtnVisibility);
        const app = document.getElementById('app');
        if (app) {
            observer.observe(app, { subtree: true, attributes: true, attributeFilter: ['class'] });
        }
        updateBtnVisibility();

        /**
         *  Abre o menu hambúrguer e garante que fique por cima dos outros elementos.
         */
        function openDrawer() {
            const sidebar = document.querySelector('.dash-sidebar-left');
            const dash = document.getElementById('dashboard');
            if (sidebar) {
                sidebar.classList.add('drawer-open');
                overlay.classList.add('active');
                btn.innerHTML = '✕';
                btn.classList.add('drawer-open');
                if (dash) dash.classList.add('drawer-active');
            }
        }
        /**
         *  Fecha o menu hambúrguer.
         */
        function closeDrawer() {
            const sidebar = document.querySelector('.dash-sidebar-left');
            const dash = document.getElementById('dashboard');
            if (sidebar) {
                sidebar.classList.remove('drawer-open');
                overlay.classList.remove('active');
                btn.innerHTML = '☰';
                btn.classList.remove('drawer-open');
                if (dash) dash.classList.remove('drawer-active');
            }
        }
        
        // Fecha e abre o menu ao clicar no botão
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const sidebar = document.querySelector('.dash-sidebar-left');
            if (sidebar && sidebar.classList.contains('drawer-open')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });

        // Fecha o menu quando clicar fora da sidebar
        document.addEventListener('click', function (e) {
            const sidebar = document.querySelector('.dash-sidebar-left');
            if (!sidebar || !sidebar.classList.contains('drawer-open')) return;

            // Se o toque for dentro da sidebar, só fecha se for um item do menu
            if (e.target.closest('.dash-sidebar-left')) {
                if (e.target.closest('.dash-menu-item')) {
                    closeDrawer();
                }
                return;
            }

            // Fecha se clicar fora da sidebar
            closeDrawer();
        });
    }

    /**
     *  Abreviação de valores monetários.
     *  "R$ 4.500.000" → "R$ 4.5M"
     *  "R$ 144.549"   → "R$ 144K"
     */
    function abbreviateMoney(text) {
        if (!text) return 'R$ 0';
        const cleaned = text.replace(/[^\d]/g, '');
        const num = parseInt(cleaned, 10);
        if (isNaN(num)) return text;
        if (num >= 1000000) return 'R$ ' + (num / 1000000).toFixed(1).replace('.0', '') + 'M';
        if (num >= 1000) return 'R$ ' + (num / 1000).toFixed(0) + 'K';
        return 'R$ ' + num;
    }

    /**
     *  Cria o card compacto e sticky com informações do time.
     *  Substitui os 4 cards originais no mobile.
     */
    function setupInfoCard() {
        // CSS handles hiding on desktop via @media query

        const mainArea = document.querySelector('.dash-main-area');
        if (!mainArea) return;

        // ─── Card structure ───
        const card = document.createElement('div');
        card.className = 'info-card';
        card.innerHTML = `
            <div class="info-card-header">
                <img class="info-card-logo" src="" alt="">
                <span class="info-card-name"></span>
                <span class="info-card-money"></span>
                <span class="info-card-week"></span>
                <span class="info-card-chevron">▼</span>
            </div>
            <div class="info-card-body">
                <div class="info-card-grid">
                    <div class="info-card-grid-row cols-3">
                        <div>
                            <div class="info-card-stat-label">Torcida</div>
                            <div class="info-card-stat-value" id="ic-fans"></div>
                        </div>
                        <div>
                            <div class="info-card-stat-label">Felicidade</div>
                            <div class="info-card-stat-value" id="ic-satisfaction" style="color: var(--gold);"></div>
                        </div>
                        <div>
                            <div class="info-card-stat-label">Coach</div>
                            <div class="info-card-stat-value" id="ic-coach"></div>
                        </div>
                    </div>
                    <div class="info-card-grid-row cols-2">
                        <div>
                            <div class="info-card-stat-label">Saldo</div>
                            <div class="info-card-stat-value" id="ic-money" style="color: var(--dash-green);"></div>
                        </div>
                        <div>
                            <div class="info-card-stat-label">Orçamento</div>
                            <div class="info-card-stat-value" id="ic-salary"></div>
                        </div>
                    </div>
                    <div class="info-card-grid-row cols-3">
                        <div>
                            <div class="info-card-stat-label">Receita</div>
                            <div class="info-card-stat-value" id="ic-income" style="color: var(--dash-green); font-size: 12px;"></div>
                        </div>
                        <div>
                            <div class="info-card-stat-label">Despesa</div>
                            <div class="info-card-stat-value" id="ic-outcome" style="color: var(--red); font-size: 12px;"></div>
                        </div>
                        <div>
                            <div class="info-card-stat-label">Lucro</div>
                            <div class="info-card-stat-value" id="ic-profit" style="font-size: 12px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // ─── Season label below card ───
        const seasonLabel = document.createElement('div');
        seasonLabel.className = 'season-label';

        // Insert card + season label as first children of #dash-content-grid
        const grid = document.getElementById('dash-content-grid');
        if (grid) {
            grid.insertBefore(seasonLabel, grid.firstChild);
            grid.insertBefore(card, seasonLabel);
        } else {
            mainArea.appendChild(card);
            mainArea.appendChild(seasonLabel);
        }

        // ─── Data sync function ───
        function syncCardData() {
            const logo = document.getElementById('dash-my-logo');
            const name = document.getElementById('dash-my-name');
            const money = document.getElementById('dash-money-val');
            const season = document.getElementById('dash-season-val');
            const fans = document.getElementById('dash-fans-val');
            const satisfaction = document.getElementById('dash-satisfaction-num');
            const coach = document.getElementById('dash-coach-name');
            const salary = document.getElementById('dash-salary-val');
            const income = document.getElementById('fin-income');
            const outcome = document.getElementById('fin-outcome');
            const profit = document.getElementById('fin-profit');

            // Header (collapsed)
            const cardLogo = card.querySelector('.info-card-logo');
            const cardName = card.querySelector('.info-card-name');
            const cardMoney = card.querySelector('.info-card-money');
            const cardWeek = card.querySelector('.info-card-week');

            if (logo) cardLogo.src = logo.src;
            if (name) cardName.textContent = name.textContent;
            if (money) cardMoney.textContent = abbreviateMoney(money.textContent);

            // Parse season: "Fase de Pontos - Sem 1" → "Sem 1"
            if (season) {
                const parts = season.textContent.split('-');
                const weekPart = parts.length > 1 ? parts[parts.length - 1].trim() : season.textContent;
                cardWeek.textContent = weekPart;
                // Also refresh top label in case season changed
                updateSeasonLabel();
            }

            // Body (expanded)
            const icFans = document.getElementById('ic-fans');
            const icSatisfaction = document.getElementById('ic-satisfaction');
            const icCoach = document.getElementById('ic-coach');
            const icMoney = document.getElementById('ic-money');
            const icSalary = document.getElementById('ic-salary');
            const icIncome = document.getElementById('ic-income');
            const icOutcome = document.getElementById('ic-outcome');
            const icProfit = document.getElementById('ic-profit');

            if (fans && icFans) icFans.textContent = fans.textContent;
            if (satisfaction && icSatisfaction) icSatisfaction.textContent = satisfaction.textContent;
            if (coach && icCoach) icCoach.textContent = coach.textContent;
            if (money && icMoney) icMoney.textContent = money.textContent;
            if (salary && icSalary) icSalary.textContent = salary.textContent;
            if (income && icIncome) icIncome.textContent = income.textContent;
            if (outcome && icOutcome) icOutcome.textContent = outcome.textContent;
            if (profit && icProfit) icProfit.textContent = profit.textContent;
        }

        // Initial sync
        syncCardData();

        // ─── MutationObserver for data sync ───
        const watchIds = [
            'dash-my-name', 'dash-money-val', 'dash-season-val',
            'dash-fans-val', 'dash-satisfaction-num', 'dash-coach-name',
            'dash-salary-val', 'fin-income', 'fin-outcome', 'fin-profit'
        ];
        const observerConfig = { childList: true, characterData: true, subtree: true };
        watchIds.forEach(function (id) {
            const el = document.getElementById(id);
            if (el) {
                new MutationObserver(syncCardData).observe(el, observerConfig);
            }
        });

        // Watch logo src changes
        const logoEl = document.getElementById('dash-my-logo');
        if (logoEl) {
            new MutationObserver(syncCardData).observe(logoEl, { attributes: true, attributeFilter: ['src'] });
        }

        // ─── Tap to expand/collapse ───
        card.addEventListener('click', function () {
            card.classList.toggle('expanded');
        });


        // ─── Season label sync ───
        function updateSeasonLabel() {
            const season = document.getElementById('dash-season-val');
            if (season) {
                seasonLabel.textContent = season.textContent;
            }
        }
        updateSeasonLabel();

        // ─── Move card to active panel ───
        // Card lives in whichever panel is currently visible
        const subPanels = [
            'dash-roster-panel', 'dash-transfers-panel', 'dash-meta-panel',
            'dash-teams-panel', 'dash-bsi-panel', 'dash-brasworlds-panel'
        ];

        function relocateCard() {
            // Check if a sub-panel is active
            for (const id of subPanels) {
                const panel = document.getElementById(id);
                if (panel && !panel.classList.contains('hidden')) {
                    // Move card to top of this panel
                    if (card.parentElement !== panel) {
                        panel.insertBefore(card, panel.firstChild);
                    }
                    seasonLabel.style.display = 'none';
                    return;
                }
            }
            // Default: back to content grid
            if (grid && card.parentElement !== grid) {
                grid.insertBefore(card, grid.firstChild);
                if (seasonLabel.parentElement !== grid) {
                    grid.insertBefore(seasonLabel, card.nextSibling);
                }
            }
            seasonLabel.style.display = '';
        }

        const relocObserver = new MutationObserver(relocateCard);
        const appEl = document.getElementById('app');
        if (appEl) {
            relocObserver.observe(appEl, { subtree: true, attributes: true, attributeFilter: ['class'] });
        }
        relocateCard();
    }

    fixViewport();
    injectMobileCSS();

    function initComponents() {
        setupHamburgerMenu();
        setupInfoCard();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initComponents);
    } else {
        initComponents();
    }
})();