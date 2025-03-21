document.addEventListener("DOMContentLoaded", () => {
    fetch("songs/songs.json")
        .then(response => response.json())
        .then(data => {
            displayCategories(data);
        })
        .catch(error => console.error("Error loading songs:", error));
});

function displayCategories(data) {
    const cardContainer = document.querySelector(".cardContainer");
    cardContainer.innerHTML = ""; // Clear existing content

    Object.keys(data).forEach(category => {
        const coverImage = `songs/${category}/cover.jpg`; // Assuming cover.jpg is present in each category folder

        // Create a category card
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${coverImage}" alt="${category}">
            <h3>${category.toUpperCase()}</h3>
            <p>Click to view songs</p>
        `;
        card.addEventListener("click", () => displaySongs(category, data[category])); // Click event
        cardContainer.appendChild(card);
    });
}

function displaySongs(category, songs) {
    const songList = document.querySelector(".songlist ul");
    songList.innerHTML = ""; // Clear previous songs

    songs.forEach(songFile => {
        const songName = songFile.replace(/\.[^/.]+$/, ""); // Remove file extension
        const songPath = `songs/${category}/${songFile}`; // Full path to song file

        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="info">
                <strong>${songName}</strong>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img src="./icon/play.svg" alt="Play">
            </div>
        `;

        listItem.addEventListener("click", () => playSong(songPath)); // Click to play song
        songList.appendChild(listItem);
    });
}

function playSong(songPath) {
    let audioPlayer = document.getElementById("audioPlayer");
    
    if (!audioPlayer) {
        audioPlayer = document.createElement("audio");
        audioPlayer.id = "audioPlayer";
        audioPlayer.controls = true;
        document.body.appendChild(audioPlayer);
    }

    audioPlayer.src = songPath;
    audioPlayer.play();
}
