// ids of some famous songs
const albumArray = ["12293787", "38682222", "49986024", "1243478", "55303464","51864941","33135897","52647503","1045274","48438021"];
//insertion of cards will happen here
const AlbumparentContainer = document.getElementById("right-cards-albums");

try {
  //iterate over the songs array and make cards for each of them
  albumArray.forEach(async (albumID) => {
    const response = await fetch(`https://saavn.dev/api/albums?id=${albumID}`);
    const responseData = await response.json();
    if(!responseData.success){
      alert("Server Failed while fetching album")
    }
    const albumData = responseData.data;
    const nameOfalbum = albumData.name;
    const primaryartists = albumData.artists.primary;
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
    
    const image = albumData.image[2];
    const imageURL = image.url;

    const Div = `<div class="right-card">
                        <img src="${imageURL}" alt="img" />
                        <p class="right-card-para1">${nameOfalbum}</p>
                        <p class="right-card-para2">${artistNames}</p>
                        <svg onclick="albumclicked(event,'${albumData.id}')" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                            class="right-card-play-svg" style="background-color: #1ed760">
                            <path
                                d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                            </path>
                        </svg>
                    </div>`
    AlbumparentContainer.innerHTML += Div;
    
  });
} catch (error) {}

function albumclicked(event,id){
  alert("album clicked with id as :"+id);
  console.log(id);
}
