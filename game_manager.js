window.DT_GameManager = {
    games: [],

    registerGame: function (game) {
        this.games.push(game);
    },

    startRandomGame: function (container, onWin) {
        if (this.games.length === 0) {
            container.textContent = "No games loaded!";
            return;
        }

        const randomGame = this.games[Math.floor(Math.random() * this.games.length)];
        console.log("Starting game:", randomGame.name);
        randomGame.start(container, onWin);
    }
};
