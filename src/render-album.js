const urlParams = new URLSearchParams(window.location.search);
const inputQuery = urlParams.get("album");
console.log(inputQuery);

const getAlbumData = async (inputQuery) => {
    const response = await fetch(`https://saavn.dev/api/albums?id=${inputQuery}`);
    const data = await response.json();
    if (!data.success) {
        alert("Server Failed to fetch the album!!!!");
    } else {
        const albumData = data.data;
        const nameOfAlbum = albumData.name;
        const description = albumData.description;
        const year = albumData.year;
        let artistName = "";
        const image = albumData.image[2].url;
        const primaryartists = albumData.artists.primary;
        for (let i = 0; i < primaryartists.length; i++) {
            if (i == primaryartists.length - 1) {
                let artist_name = primaryartists[i].name;
                artistName += artist_name;
            } else {
                let artist_name = primaryartists[i].name;
                artistName += artist_name + ", ";
            }
        }
        if (artistName.length > 40) {
            artistName = artistName.substring(0, 30) + " .....";
        }

        //add this data to the albums
        document.getElementById("album-img").src=image;
        document.getElementById("album-name").innerHTML=nameOfAlbum;
        document.getElementById("artist-name").innerHTML=artistName;
        document.getElementById("album-description").innerHTML=description;
        document.getElementById("album-year").innerHTML+=year;

        addSongs(albumData.songs);


    }
};


const addSongs= (songs)=>{
    //fetch the song parent conatainer
    const songContainer = document.getElementById("album-songs");
    songs.forEach(song => {
        const songName = song.name;
        const image = song.image[2].url;
        const primaryartists = song.artists.primary;
        let artistName="";
        for (let i = 0; i < primaryartists.length; i++) {
            if (i == primaryartists.length - 1) {
                let artist_name = primaryartists[i].name;
                artistName += artist_name;
            } else {
                let artist_name = primaryartists[i].name;
                artistName += artist_name + ", ";
            }
        }
        if (artistName.length > 40) {
            artistName = artistName.substring(0, 30) + " .....";
        }
        const div = `<div class="song-card">
                    <div class="img-container">
                        <img src="${image}" alt="img" />
                        <svg onclick="songClicked(event,'${song.id}')" class="song-card-svg" data-encore-id="icon"
                            role="img" aria-hidden="true" viewBox="0 0 24 24" style="background-color: #1ed760">
                            <path
                                d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                            </path>
                        </svg>
                    </div>
                    <p class="song-card-para1">${songName}</p>
                    <p class="song-card-para2">${artistName}</p>
                </div>`
        
        songContainer.innerHTML+=div;

        
    });
};

getAlbumData(inputQuery);

function songClicked(event,id){
    window.location.href = `/views/Songs.html?query=${id}`;
    console.log(id);
}