// ids of some famous artist
const ArtistArray = ["459320","456323","455130","459633","455275","455125","485956","1546334","712878","468245","458918","464932","1970745","455917","455142","456102"];
//insertion of cards will happen here
const parentContainer = document.getElementById("left-box-artist-container");


try {
    //iterate over the songs array and make cards for each of them
    ArtistArray.forEach(async (artistID) => {
      const response = await fetch(`https://saavn.dev/api/artists/${artistID}`);
      const responseData = await response.json();

      /* 
      FOR TESTING PURPOSES
      if(!responseData.success){
          alert("Cant Load Artists Data!!!!! "+artistID);
      }
      */
      
      const artistData = responseData.data;
      const nameOfartist = artistData.name;
      
      const image = artistData.image[2];
      const imageURL = image.url;
      const artistType = artistData.type;

      const artistDiv = `<div class="left-card" onclick="Artistclicked(event,'${artistID}')">
                          <img src="${imageURL}" alt="img" class="artist-img" />
                          <div class="artist-desc">
                            <span class="left-card-para1">${nameOfartist}</span>
                            <span class="left-card-para2">${artistType}</span>
                          </div>
                        </div>`
      parentContainer.innerHTML += artistDiv;
      
    });
  } catch (error) {}
  
  function Artistclicked(event,id){
    const encodedMessage = encodeURIComponent(id);
    window.location.href = `/views/Artist.html?artist=${encodedMessage}`;
    console.log(id);
  }
  