document.addEventListener('DOMContentLoaded', () => {
            const containerTop = document.querySelector('.container-top');
            const containerBottom = document.querySelector('.container-bottom');
            const suggestedPlant = document.querySelector('.suggested-plant');
            const expandArrow = document.querySelector('.expand-arrow');
            const compressArrow = document.querySelector('.compress-arrow');
            const suggestedPlantMore = document.querySelector('.suggested-plant-more');
            const settingsBtn = document.querySelector('.settings-btn');
            const settingsDialog = document.querySelector('.settings-dialog');

            // Toggle sections
            expandArrow.addEventListener('click', () => {
                containerTop.classList.toggle('movebottom');
                containerBottom.classList.toggle('movetop');
                suggestedPlant.classList.toggle('expand');
                compressArrow.classList.toggle('opacity-full');
                suggestedPlantMore.classList.toggle('suggested-plant-more-visible');
            });
            compressArrow.addEventListener('click', () => {
                containerTop.classList.toggle('movebottom');
                containerBottom.classList.toggle('movetop');
                suggestedPlant.classList.toggle('expand');
                compressArrow.classList.toggle('opacity-full');
                suggestedPlantMore.classList.toggle('suggested-plant-more-visible');
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