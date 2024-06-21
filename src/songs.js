// ids of some famous songs
const array = ["vHNA1Gtr", "NQHF6I59", "Ap1mYWUe", "24nCWVjY", "UJ0dGLpm"];
//insertion of cards will happen here
const parentContainer = document.getElementById("right-cards-songs");

try {
  //iterate over the songs array and make cards for each of them
  array.forEach(async (songID) => {
    const response = await fetch(`https://saavn.dev/api/songs/${songID}`);
    const responseData = await response.json();
    if(!responseData.success){
        alert("Cant Load Songs Data!!!!!");
    }
    const songData = responseData.data[0];
    const nameOfSong = songData.name;
    const primaryartists = songData.artists.primary;
    let artistNames= "";
    primaryartists.forEach((artistObject)=>{
        let artist_name = artistObject.name;
        artistNames+=artist_name+ ", "
    })
    const image = songData.image[2];
    const imageURL = image.url;


    const songDiv = `<div class="right-card">
                        <img src="${imageURL}" alt="img">
                        <p class="right-card-para1">${nameOfSong}</p>
                        <p class="right-card-para2">${artistNames}</p>
                        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="right-card-play-svg" style="background-color: #1ed760;"  ><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
                    </div>`
    parentContainer.innerHTML += songDiv;
    
  });
} catch (error) {}
