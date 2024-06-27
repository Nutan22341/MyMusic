// ids of some famous songs
const array = ["Indie",  "Rock", "Sad", "Relaxing", "Hip-hop"];
//insertion of cards will happen here
const parentContainer = document.getElementById("right-cards-playlists");
async function fetchAndDisplayPlaylist(songID) {
    try {
      const response = await fetch(`https://saavn.dev/api/search/playlists/${songID}`);
      const responseData = await response.json();
  
      if (!responseData.success) {
        alert("Can't Load Songs Data!");
        return;
      }
  
      const songData = responseData.data.results[0];
      if (!songData) {
        console.error("No song data found for query:", songID);
        return;
      }
  
      const nameOfSong = songData.name;
      console.log(nameOfSong);
      const image = songData.image[2]; 
      const imageURL = image ? image.url : "default_image_url";  
  
      const songDiv = document.createElement("div");
      songDiv.className = "right-card";
      songDiv.innerHTML = `
        <img src="${imageURL}" alt="img">
        <p class="right-card-para1">${nameOfSong}</p>
        <p class="right-card-para2">Playlist</p>
        <svg onclick="clicked(event, '${songData.id}')" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="right-card-play-svg" style="background-color: #1ed760;">
          <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
        </svg>
      `;
      parentContainer.appendChild(songDiv);
  
    } catch (error) {
      console.error("Error fetching playlist data:", error);
    }
  }
  
  array.forEach(fetchAndDisplayPlaylist);
  
//   function clicked(event, id) {
//     window.location.href = `/index2.html?query=${id}`;
//     console.log(id);
//   }