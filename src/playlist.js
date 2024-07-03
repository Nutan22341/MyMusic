const playlistarray = ["82914609", "802336660", "112554488", "768134397", "116434841"];
const playlistparentContainer = document.getElementById("right-cards-playlists");

async function fetchPlaylistData(id) {
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

async function updatePlaylistImage(id) {
  try {
    const songData = await fetchPlaylistData(id);
    // returnign the data of the playlsit


    const nameOfSong = songData.data.name;
    const description = songData.data.description;


    // console.log(playlistDesc);
    // const imageUrl = songData.data.image.find(img => img.quality === '500x500').url;
    const image = songData.data.image[2];
    const imageURL = image.url;
    const nameOfAlbum = songData.data.name;
    const artistsName = songData.data.artists[0].name;

    // const rightCardPara1 = document.querySelector('right-card-para1');
    // rightCardPara1.textContent = nameOfAlbum;


    const playlistDiv = `<div class="right-card">
                          <img src="${imageURL}" alt="img" />
                          <p class="right-card-para1">${nameOfAlbum}</p>
                          <p class="right-card-para2">${artistsName}</p>
                          <svg onclick="clicked(event,'${id}')" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="right-card-play-svg" style="background-color: #1ed760"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                          </svg>
                        </div>`
    playlistparentContainer.innerHTML += playlistDiv;

  } catch (error) {
    console.error('Error updating playlist image:', error);
  }
}

// Function to handle click event
function clicked(event, id) {
  window.location.href = `/views/playlistsong.html?query=${id}`;
  console.log(id);
}

playlistarray.forEach(updatePlaylistImage);