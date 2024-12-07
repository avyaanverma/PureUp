document.addEventListener('DOMContentLoaded', () => {
            const plantOfDay = document.querySelector('.plant-of-day');
            const suggestedPlant = document.querySelector('.suggested-plant');
            const expandArrow = document.querySelector('.expand-arrow');
            const settingsBtn = document.querySelector('.settings-btn');
            const settingsDialog = document.querySelector('.settings-dialog');

            // Toggle sections
            expandArrow.addEventListener('click', () => {
                plantOfDay.classList.toggle('expanded');
                suggestedPlant.classList.toggle('compressed');
                expandArrow.textContent = plantOfDay.classList.contains('expanded') ? '↑' : '↓';
            });

            // Toggle settings dialog
            settingsBtn.addEventListener('click', () => {
                settingsDialog.style.display = 
                    settingsDialog.style.display === 'none' ? 'block' : 'none';
            });

            // Close settings dialog when clicking outside
            document.addEventListener('click', (e) => {
                if (!settingsBtn.contains(e.target) && 
                    !settingsDialog.contains(e.target)) {
                    settingsDialog.style.display = 'none';
                }
            });
        });