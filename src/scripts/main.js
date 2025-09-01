document.addEventListener('DOMContentLoaded', function() {
            // Selecionar elementos
            const cards = document.querySelectorAll('.shows__card');
            let activeCard = null;

            // Criar overlay dinamicamente
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            overlay.id = 'overlay';
            overlay.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                background: rgba(0,0,0,0.7) !important;
                z-index: 9998 !important;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease !important;
            `;
            document.body.appendChild(overlay);

            // Criar botão de fechar dinamicamente
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-btn';
            closeBtn.id = 'closeBtn';
            closeBtn.innerHTML = '&times;';
            closeBtn.style.cssText = `
                position: fixed !important;
                top: 20px !important;
                right: 20px !important;
                background: white !important;
                color: #333 !important;
                border: none !important;
                border-radius: 50% !important;
                width: 40px !important;
                height: 40px !important;
                font-size: 20px !important;
                cursor: pointer !important;
                z-index: 10000 !important;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
            `;
            document.body.appendChild(closeBtn);

            // Função para centralizar card
            function centerCard(card) {
                // Se já tem um card ativo, apenas troca
                if (activeCard) {
                    activeCard.classList.remove('centered');
                }
                
                // Adiciona classe centered no card clicado
                card.classList.add('centered');
                
                // Mostra overlay e botão de fechar
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
                closeBtn.style.opacity = '1';
                closeBtn.style.visibility = 'visible';
                
                // Guarda referência do card ativo
                activeCard = card;
                
                // Previne scroll do body
                document.body.style.overflow = 'hidden';
            }

            // Função para descentralizar card
            function uncenterCard() {
                if (activeCard) {
                    activeCard.classList.remove('centered');
                    activeCard = null;
                }
                
                // Esconde overlay e botão de fechar
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
                closeBtn.style.opacity = '0';
                closeBtn.style.visibility = 'hidden';
                
                // Permite scroll do body novamente
                document.body.style.overflow = 'auto';
            }

            // Event listeners para os cards
            cards.forEach(card => {
                card.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    // Se clicou no card que já está ativo, fecha
                    if (activeCard === card) {
                        uncenterCard();
                    } else {
                        // Caso contrário, centraliza o card
                        centerCard(card);
                    }
                });
            });

            // Event listener para o botão de fechar
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                uncenterCard();
            });

            // Event listener para o overlay (clicar fora fecha)
            overlay.addEventListener('click', uncenterCard);

            // Event listener para a tecla ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && activeCard) {
                    uncenterCard();
                }
            });
        });