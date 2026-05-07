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

    fixViewport();
    injectMobileCSS();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupHamburgerMenu);
    } else {
        setupHamburgerMenu();
    }
})();