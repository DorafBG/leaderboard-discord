function calculateAllXp(targetLevel) {
  let totalXp = 0;
  for (let level = 1; level < targetLevel; level++) {
      totalXp += (5 * (level ** 2)) + (50 * level) + 100;
  }

  if(targetLevel === 0){
    return totalXp;
  } else {
    return totalXp+100;
  }
 
}

async function fetchLeaderboard() {
    try {
      const response = await fetch('https://doraf.alwaysdata.net/');
      const data = await response.json();

      const leaderboardDiv = document.getElementById('ranking-container');
      leaderboardDiv.innerHTML = ''; // Effacer le contenu précédent

      let userNumber = 1; // Initialiser le compteur

      data.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user-entry'); // Ajouter une classe CSS pour le style
        const totalXpRequired = calculateAllXp(user.level) + user.xp;
        const totalXpString = totalXpRequired.toLocaleString();
        userDiv.innerHTML = `
        <img class="avatar" src="${user.avatarURL}" alt="PP de ${user.userName}">
        <div class="user-details">
          <p id="rank"><strong>#${userNumber}</strong></p> <!-- Numéro qui augmente -->
          <p><strong>Utilisateur:</strong> ${user.userName}</p>
          <p><strong>Niveau:</strong> ${user.level}</p>
          <p><strong>XP:</strong> ${user.xp}</p>
        </div>
        <div class="total-xp">
          <p><strong>${totalXpString} xp total</p>
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
