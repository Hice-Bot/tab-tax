(function () {
    const quotes = [
        "The only way to do great work is to love what you do.",
        "Focus on being productive instead of busy.",
        "Your time is limited, so don't waste it living someone else's life.",
        "It always seems impossible until it's done.",
        "Don't watch the clock; do what it does. Keep going."
    ];

    const Game = {
        name: "Typing Challenge",

        start: function (container, onWin) {
            container.innerHTML = '';

            const title = document.createElement('h2');
            title.textContent = "Typing Challenge";
            container.appendChild(title);

            const message = document.createElement('div');
            message.className = 'dt-game-message';
            message.textContent = "Type the text below exactly:";
            container.appendChild(message);

            const quote = quotes[Math.floor(Math.random() * quotes.length)];
            const quoteDisplay = document.createElement('div');
            quoteDisplay.style.fontSize = '18px';
            quoteDisplay.style.fontWeight = 'bold';
            quoteDisplay.style.marginBottom = '15px';
            quoteDisplay.style.fontStyle = 'italic';
            quoteDisplay.textContent = `"${quote}"`;
            container.appendChild(quoteDisplay);

            const input = document.createElement('input');
            input.type = 'text';
            input.style.width = '80%';
            input.style.padding = '10px';
            input.style.fontSize = '16px';
            input.placeholder = 'Type here...';
            container.appendChild(input);

            // Focus input
            setTimeout(() => input.focus(), 100);

            input.addEventListener('input', () => {
                if (input.value === quote) {
                    input.disabled = true;
                    input.style.borderColor = '#4dff4d';
                    message.textContent = "Perfect!";
                    message.style.color = '#4dff4d';
                    setTimeout(onWin, 500);
                }
            });

            // Prevent paste
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                message.textContent = "No pasting allowed!";
                message.style.color = '#ff4d4d';
                setTimeout(() => message.style.color = 'white', 1000);
            });
        }
    };

    if (window.DT_GameManager) {
        window.DT_GameManager.registerGame(Game);
    }
})();
