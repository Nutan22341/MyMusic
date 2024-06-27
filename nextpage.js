// Function to get the value of a query parameter by name
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}


const songId = getQueryParam('query');


async function fetchSongData(id) {
    const response = await fetch(`https://saavn.dev/api/songs/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (!data.success || !data.data || data.data.length === 0) {
        throw new Error('No song data found');
    }
    return data.data[0];
}


async function updateSongImage(id) {
    try {
        const songData = await fetchSongData(id);
        const imageUrl = songData.image.find(img => img.quality === '500x500').url;

        const leftContainer = document.querySelector('.left-container');
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = `Image for song ${songData.name}`;
        leftContainer.appendChild(imgElement);
    } catch (error) {
        console.error('Error fetching song data:', error);
    }
}

async function updateSongDesc(id){
    try{
        const songData = await fetchSongData(id);
        const songName = songData.name;

        const primaryArtists = songData.artists.primary;
        let artistNames = "";
        for (let i = 0; i < primaryArtists.length; i++) {
            if (i === primaryArtists.length - 1) {
                artistNames += primaryArtists[i].name;
            } else {
                artistNames += primaryArtists[i].name + ", ";
            }
        }


        const songNameElement = document.querySelector('h1');
        songNameElement.textContent = songName;

        const artistNamesElement = document.querySelector('.artist-names');
        artistNamesElement.textContent = `Artists: ${artistNames}`;

        const albumNameElement = document.createElement('p');
        const albumName = songData.album.name;
        albumNameElement.textContent = `Album: ${albumName}`;


        const Url = songData.downloadUrl[4].url;
        const playElement = document.getElementById('play')
        playElement.src = Url;
        document.getElementById('playsong').load();



        const songDescContainer = document.querySelector('.song-desc');
        songDescContainer.innerHTML = '';

        // Append elements to song-desc div
        const label = songData.label;
        const labelElement = document.createElement('p');
        labelElement.textContent = `Label: ${label}`;

        const playCount = songData.playCount;
        const playCountElement = document.createElement('p');
        playCountElement.textContent = `Play Count: ${playCount}`;
        

        const copyrightElement = document.createElement('p');
        copyrightElement.textContent = `Copyright: ${songData.copyright}`;
        
        songDescContainer.appendChild(songNameElement);
        songDescContainer.appendChild(artistNamesElement);
        songDescContainer.appendChild(albumNameElement);
        songDescContainer.appendChild(labelElement);
        songDescContainer.appendChild(playCountElement);
        songDescContainer.appendChild(copyrightElement);

        const albumUrl = songData.album.url;

    }catch(error){
        console.error('Error fetching song data', error);
    }
}
// Fetch the song data and update the image
updateSongImage(songId);
updateSongDesc(songId);
