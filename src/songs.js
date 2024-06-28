// ids of some famous songs
const array = ["vHNA1Gtr", "NQHF6I59", "Ap1mYWUe", "24nCWVjY", "UJ0dGLpm", "XoNWyaL6","MMELyze6","tQHG-WQ3","3sqO4eZy","lULDgPcz","ItrQFPke","kVGYhq-r","tD4RoIPl"];
//insertion of cards will happen here
const SongparentContainer = document.getElementById("right-cards-songs");

try {
  //iterate over the songs array and make cards for each of them
  array.forEach(async (songID) => {
    const response = await fetch(`https://saavn.dev/api/songs/${songID}`);
    const responseData = await response.json();
    if(!responseData.success){
      alert("Server Failed while fetching songs")
    }
    const songData = responseData.data[0];
    const nameOfSong = songData.name;
    const primaryartists = songData.artists.primary;
    let artistNames= "";
    for(let i=0;i<primaryartists.length;i++){
      if(i==primaryartists.length-1){
        let artist_name = primaryartists[i].name;
        artistNames+=artist_name;
      }
      else{
        let artist_name = primaryartists[i].name;
        artistNames+=artist_name+ ", "
      }
    }
    if(artistNames.length > 40){
      artistNames=artistNames.substring(0,40)+" .....";
    }
    
    const image = songData.image[2];
    const imageURL = image.url;


    const songDiv = `<div class="right-card">
                        <img src="${imageURL}" alt="img">
                        <p class="right-card-para1">${nameOfSong}</p>
                        <p class="right-card-para2">${artistNames}</p>
                        <svg onclick="clicked(event,'${songID}')" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="right-card-play-svg" style="background-color: #1ed760;"  ><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" ></path></svg>
                    </div>`
    SongparentContainer.innerHTML += songDiv;
    
  });
} catch (error) {}

function clicked(event,id){
  window.location.href = `/views/Songs.html?query=${id}`;
  console.log(id);
}
