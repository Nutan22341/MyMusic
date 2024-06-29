function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
const playlistparentContainer = document.getElementById("parent-of-song-container");

const songId = getQueryParam('query');

async function fetchSongData(id) {
    try {
        const response = await fetch(`https://saavn.dev/api/playlists?id=${id}`);
        const data = await response.json();

        if (!data.success || !data.data || data.data.length === 0) {
            throw new Error('No song data found');
        }

        return data
    } catch (error) {
        console.error('Error fetching playlist data:', error);
        throw error;
    }
}

async function updateSongContainer(songID) {
    try {
        const songData = await fetchSongData(songID);
        // returnign the data of the playlsit
        console.log(songData);

        const Data = songData.data.songs;
        console.log(Data);
        // const rightCardPara1 = document.querySelector('right-card-para1');
        // rightCardPara1.textContent = nameOfAlbum;
        Data.forEach( async (data) => {

            const songID = data.id;
            const response = await fetch(`https://saavn.dev/api/songs/${songID}`);
            const responseData = await response.json();
            if(!responseData.success){
                alert("Server Failed while fetching songs")
            }
            console.log(responseData);
            const songdata = responseData.data[0];
            const nameOfSong = songdata.name;
            console.log(nameOfSong);
            // const artistName = songdata.artists.primary.name;
            const primaryArtists = songdata.artists.primary;
            let artistNames = "";
            for (let i = 0; i < primaryArtists.length; i++) {
                if (i === primaryArtists.length - 1) {
                    artistNames += primaryArtists[i].name;
                } else {
                    artistNames += primaryArtists[i].name + ", ";
                }
            }

            const imageUrl = songdata.image[1].url;
            // console.log(imageUrl);
            const labelName= songdata.label; // Assuming the label represents the artist's name

            // console.log(`Song ID: ${song.id}, Name: ${nameOfSong}, LabelName: ${labelName}`);

            console.log(imageUrl);
            const songContainerHTML = `
                <div class="song-container">
                <div class="image-container">
                    <img src="${imageUrl}" alt="" class="image">
                    <svg onclick="clicked(event,'${songdata.id}')" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="right-card-play-svg" style="background-color: #1ed760"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                    </svg>
                </div>
                <div class="right" >
                    <p class="songName">${nameOfSong}</p>
                    <p class="artistName">${artistNames}</p>
                    <p class="labelName">${labelName}</p>
                </div>
            </div>`
            
            playlistparentContainer.innerHTML += songContainerHTML;
        });
    } catch (error) {
        console.error('Error updating playlist image:', error);
    }
}
updateSongContainer(songId);
function clicked(event,id){
    window.location.href = `/views/Songs.html?query=${id}`;
    console.log(id);
}