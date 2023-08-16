async function fetchLeaderboard() {
    try {
      const response = await fetch('http://server.lrlr.fr/');
      const data = await response.json();

      const leaderboardDiv = document.getElementById('ranking-container');
      leaderboardDiv.innerHTML = ''; // Effacer le contenu précédent

      let userNumber = 1; // Initialiser le compteur

      data.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user-entry'); // Ajouter une classe CSS pour le style
        userDiv.innerHTML = `
        <img class="avatar" src="${user.avatarURL}" alt="PP de ${user.userName}">
        <div class="user-details">
          <p id="rank"><strong>#${userNumber}</strong></p> <!-- Numéro qui augmente -->
          <p><strong>Utilisateur:</strong> ${user.userName}</p>
          <p><strong>Niveau:</strong> ${user.level}</p>
          <p><strong>XP:</strong> ${user.xp}</p>
        </div>
        `;
        leaderboardDiv.appendChild(userDiv);
        userNumber++; // Incrémenter le compteur pour le prochain utilisateur
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  }

  const refreshButton = document.getElementById('refresh-button');
  refreshButton.addEventListener('click', fetchLeaderboard); // Ajouter le gestionnaire d'événements

  fetchLeaderboard(); // Appeler la fonction au chargement de la page
