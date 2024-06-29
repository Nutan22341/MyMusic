const urlParams = new URLSearchParams(window.location.search);
const inputQuery = urlParams.get("artist");

const getArtistData = async () => {
    let response = await fetch(`https://saavn.dev/api/artists/${inputQuery}`);
    let data = await response.json();
    if (!data.success) {
        alert("Failed to fetch data Try Again after some time!!!");
    } else {
        const artistData = data.data;
        const nameOfartist = artistData.name;
        const image = artistData.image[2].url;
        const followers = artistData.followerCount;
        const fancount = artistData.fanCount;
        const type = artistData.type;
        const dominantType = artistData.dominantType;
        const dominantLang = artistData.dominantLanguage;
        //now add this data to the artist-data-box

        document.getElementById("artist-img").src = image;
        document.getElementById("artist-name").innerText = nameOfartist;
        document.getElementById("artist-type").innerText = type;
        document.getElementById("artist-follow-count").innerText += followers;
        document.getElementById("artist-fan-count").innerText += fancount;
        document.getElementById("artist-lang").innerText += dominantLang;
        document.getElementById("artist-dominant-type").innerText += dominantType;

        //now add the top songs , top albums , top singles
        addTopSongs(artistData.topSongs);
        addTopAlbums(artistData.topAlbums);
        addSingles(artistData.singles);
    }
};

const addTopSongs = (topSongs) => {
    if (topSongs.length < 1) {
        alert("Nothing in top songs");
    } else {
        //fetch the parent container
        const songContainer = document.getElementById("artist-top-songs");
        topSongs.forEach((song) => {
            let songName = song.name;
            let artistName = "";
            let image = song.image[2].url;
            const primaryartists = song.artists.primary;
            for (let i = 0; i < primaryartists.length; i++) {
                if (i == primaryartists.length - 1) {
                    let artist_name = primaryartists[i].name;
                    artistName += artist_name;
                } else {
                    let artist_name = primaryartists[i].name;
                    artistName += artist_name + ", ";
                }
            }
            if(artistName.length > 40){
                artistName=artistName.substring(0,30)+" .....";
            }
            let div = `<div class="top-card">
                    <img src="${image}" alt="img" />
                    <p class="top-card-para1">${songName}</p>
                    <p class="top-card-para2">${artistName}</p>
                    <svg onclick="songClicked(event,'${song.id}')" class= "top-card-svg" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                         style="background-color: #1ed760">
                        <path
                            d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                        </path>
                    </svg>
                </div>`;
            songContainer.innerHTML += div;
        });
    }
};

const addTopAlbums = (topAlbums) => {
    if (topAlbums.length < 1) {
        alert("Nothing in top albums");
    } else {
        //fetch the parent container
        const albumContainer = document.getElementById("artist-top-albums");
        topAlbums.forEach((album) => {
            let albumName = album.name;
            let artistName = "";
            let image = album.image[2].url;
            const primaryartists = album.artists.primary;
            const description = album.description;
            for (let i = 0; i < primaryartists.length; i++) {
                if (i == primaryartists.length - 1) {
                    let artist_name = primaryartists[i].name;
                    artistName += artist_name;
                } else {
                    let artist_name = primaryartists[i].name;
                    artistName += artist_name + ", ";
                }
            }
            if(artistName.length > 40){
                artistName=artistName.substring(0,40)+" .....";
            }
            let div = `<div class="top-card">
                    <img src="${image}" alt="img" />
                    <p class="top-card-para1">${albumName}</p>
                    <p class="top-card-para2">${artistName}</p>
                    <p class="top-card-para2">${description}</p>
                    <svg onclick="albumClicked(event,'${album.id}')" class= "top-card-svg" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                         style="background-color: #1ed760">
                        <path
                            d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                        </path>
                    </svg>
                </div>`;
            albumContainer.innerHTML += div;
        });
    }
};

const addSingles = (singles) => {
    if (singles.length < 1) {
        alert("Nothing to show in single section");
    } else {
        //fetch the parent container
        const albumContainer = document.getElementById("artist-top-singles");
        singles.forEach((album) => {
            if (album.type === "album") {
                let albumName = album.name;
                let artistName = "";
                let image = album.image[2].url;
                const primaryartists = album.artists.primary;
                const year = album.year;
                for (let i = 0; i < primaryartists.length; i++) {
                    if (i == primaryartists.length - 1) {
                        let artist_name = primaryartists[i].name;
                        artistName += artist_name;
                    } else {
                        let artist_name = primaryartists[i].name;
                        artistName += artist_name + ", ";
                    }
                }
                if(artistName.length > 40){
                    artistName=artistName.substring(0,40)+" .....";
                }
                let div = `<div class="top-card">
                    <img src="${image}" alt="img" />
                    <p class="top-card-para1">${albumName}</p>
                    <p class="top-card-para2">${artistName}</p>
                    <p class="top-card-para2">Year: ${year}</p>
                    <svg onclick="albumClicked(event,'${album.id}')" class= "top-card-svg" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                         style="background-color: #1ed760">
                        <path
                            d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                        </path>
                    </svg>
                </div>`;
                albumContainer.innerHTML += div;
            }
        });
    }
};

function songClicked(event, id) {
    window.location.href = `/views/Songs.html?query=${id}`;
    console.log(id);
}

function albumClicked(event, id) {
    window.location.href = `/views/Album.html?album=${id}`;
    console.log(id);
}

getArtistData();