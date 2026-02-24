(function () {
    const Game = {
        name: "Memory Matrix",

        start: function (container, onWin) {
            container.innerHTML = '';

            const title = document.createElement('h2');
            title.textContent = "Memory Matrix";
            container.appendChild(title);

            const message = document.createElement('div');
            message.className = 'dt-game-message';
            message.textContent = "Memorize the pattern!";
            container.appendChild(message);

            const grid = document.createElement('div');
            grid.className = 'dt-memory-grid';
            container.appendChild(grid);

            // Create 3x3 grid
            const cells = [];
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.className = 'dt-memory-cell'; // Updated class name
                cell.dataset.index = i;
                grid.appendChild(cell);
                cells.push(cell);
            }

            // Generate pattern (4 random cells)
            const pattern = [];
            while (pattern.length < 4) {
                const idx = Math.floor(Math.random() * 9);
                if (!pattern.includes(idx)) pattern.push(idx);
            }

            // Show pattern
            setTimeout(() => {
                pattern.forEach(idx => cells[idx].classList.add('active'));

                // Hide pattern after 1.5s
                setTimeout(() => {
                    pattern.forEach(idx => cells[idx].classList.remove('active'));
                    message.textContent = "REPEAT THE PATTERN.";
                    enableInteraction();
                }, 1500);
            }, 500);

            let userPattern = [];

            function enableInteraction() {
                cells.forEach(cell => {
                    cell.onclick = function () {
                        const idx = parseInt(this.dataset.index);

                        // Ignore if already clicked or not in pattern (optional: immediate fail)
                        if (userPattern.includes(idx)) return;

                        this.classList.add('active');
                        userPattern.push(idx);

                        // Check validity immediately
                        if (!pattern.includes(idx)) {
                            this.classList.add('wrong'); // Updated class name
                            message.textContent = "WRONG. TRY AGAIN.";
                            message.className = 'dt-game-message feedback-error';
                            disableInteraction();
                            setTimeout(() => Game.start(container, onWin), 1000);
                            return;
                        }

                        // Check if complete
                        if (userPattern.length === pattern.length) {
                            message.textContent = "CORRECT";
                            message.className = 'dt-game-message feedback-success';
                            cells.forEach(c => {
                                if (pattern.includes(parseInt(c.dataset.index))) {
                                    c.classList.add('revealed');
                                }
                            });
                            setTimeout(onWin, 500);
                        }
                    };
                });
            }

            function disableInteraction() {
                cells.forEach(cell => cell.onclick = null);
            }
        }
    };

    if (window.DT_GameManager) {
        window.DT_GameManager.registerGame(Game);
    }
})();
