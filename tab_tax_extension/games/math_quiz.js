(function () {
    const Game = {
        name: "Math Quiz",

        start: function (container, onWin) {
            let streak = 0;
            const requiredStreak = 3;

            function renderProblem() {
                container.innerHTML = '';

                const title = document.createElement('h2');
                title.textContent = "Math Quiz";
                container.appendChild(title);

                const message = document.createElement('div');
                message.className = 'dt-game-message';
                message.textContent = `Solve ${requiredStreak} problems to pass. Streak: ${streak}/${requiredStreak}`;
                container.appendChild(message);

                // Generate problem
                const a = Math.floor(Math.random() * 20) + 1; // 1-20
                const b = Math.floor(Math.random() * 10) + 1; // 1-10
                const ops = ['+', '-', '*'];
                const op = ops[Math.floor(Math.random() * ops.length)];

                let answer;
                switch (op) {
                    case '+': answer = a + b; break;
                    case '-': answer = a - b; break;
                    case '*': answer = a * b; break;
                }

                const problemDisplay = document.createElement('div');
                problemDisplay.style.fontSize = '24px';
                problemDisplay.style.fontWeight = 'bold';
                problemDisplay.style.marginBottom = '15px';
                problemDisplay.textContent = `${a} ${op} ${b} = ?`;
                container.appendChild(problemDisplay);

                const input = document.createElement('input');
                input.type = 'number';
                input.style.width = '100px';
                input.style.padding = '10px';
                input.style.fontSize = '18px';
                input.style.textAlign = 'center';
                container.appendChild(input);

                const submitBtn = document.createElement('button');
                submitBtn.className = 'dt-btn';
                submitBtn.textContent = "Submit";
                container.appendChild(submitBtn);

                setTimeout(() => input.focus(), 100);

                function check() {
                    const val = parseInt(input.value);
                    if (val === answer) {
                        streak++;
                        if (streak >= requiredStreak) {
                            message.textContent = "PASSED";
                            message.className = 'dt-game-message feedback-success';
                            setTimeout(onWin, 500);
                        } else {
                            message.textContent = `CORRECT. ${requiredStreak - streak} MORE to go.`;
                            message.className = 'dt-game-message';
                            renderProblem(); // Re-render immediately for next Q
                            // Keep focus
                            setTimeout(() => {
                                const newInput = container.querySelector('input');
                                if (newInput) newInput.focus();
                            }, 50);
                        }
                    } else {
                        streak = 0;
                        message.textContent = "WRONG. STREAK RESET.";
                        message.className = 'dt-game-message feedback-error';
                        setTimeout(() => {
                            renderProblem();
                            const newInput = container.querySelector('input');
                            if (newInput) newInput.focus();
                        }, 1000);
                    }
                }

                submitBtn.addEventListener('click', check);
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') check();
                });
            }

            renderProblem();
        }
    };

    if (window.DT_GameManager) {
        window.DT_GameManager.registerGame(Game);
    }
})();
