
const urlParams = new URLSearchParams(window.location.search);
const inputQuery = urlParams.get("query")

console.log(inputQuery);

const heading = document.getElementById("search-heading")
heading.innerText+=inputQuery;


const addTopResults = (topresults)=>{
    const topObject = topresults[0];
    //fetch the parent container
    document.getElementById("top-result-heading").innerHTML+=topObject.type;
    const parentContainer = document.getElementById("top-result");
    //now find the type of the top result
    if(topObject.type==="song"){
        const image = topObject.image[2];
        const div = `<div class="content-card" id="top-song">
                    <img src="${image.url}" alt="img" />
                    <div class="top-card-info">
                        <p class="content-card-p-1">${topObject.title}</p>
                        <p class="content-card-p-2">${topObject.primaryArtists}e</p>
                        <p class="content-card-p-3">${topObject.album}</p>
                    </div>
                    <svg onclick="songClicked(event,'${topObject.id}')" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                        class="content-card-play-svg" style="background-color: #1ed760">
                        <path
                            d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                        </path>
                    </svg>
                </div>
                    `
        parentContainer.innerHTML+=div;
    }
    else if(topObject.type==="artist"){
        const image = topObject.image[2];
        const div = `<div class="content-card" id="top-artist">
                    <img src="${image.url}" alt="img" />
                    <div class="top-card-info">
                        <p class="content-card-p-1">${topObject.title}</p>
                        <p class="content-card-p-2">Artist</p>
                        <svg onclick="artistClicked(event,'${topObject.id}')" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                        class="content-card-play-svg" style="background-color: #1ed760">
                        <path
                            d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                        </path>
                    </svg>
                    </div>
                </div>`
        parentContainer.innerHTML+=div;
    }
    else if(topObject.type==="album"){
        const image = topObject.image[2];
        const div = `<div class="content-card" id="top-album">
                    <img src="${image.url}" alt="img" />
                    <div class="top-card-info">
                        <p class="content-card-p-1">${topObject.title}</p>
                        <p class="content-card-p-2">${topObject.primaryArtists}</p>
                        <p class="content-card-p-3">${topObject.description}</p>
                    </div>
                    <svg onclick="albumClicked(event,'${topObject.id}')" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                        class="content-card-play-svg" style="background-color: #1ed760">
                        <path
                            d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                        </path>
                    </svg>
                </div>`
        parentContainer.innerHTML+=div;

    }
    else if(topObject.type==="playlist"){
        const image = topObject.image[2];
        const div = `<div class="content-card" id="top-playlist">
                    <img src="${image.url}" alt="img" />
                    <div class="top-card-info">
                        <p class="content-card-p-1">${topObject.title}</p>
                        <p class="content-card-p-3">${topObject.description}</p>
                    </div>
                    <svg onclick="playlistClicked(event,'${topObject.id}')" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                        class="content-card-play-svg" style="background-color: #1ed760">
                        <path
                            d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                        </path>
                    </svg>
                </div>`
        parentContainer.innerHTML+=div;
        
    }

}

const addSongs=(songs)=>{
    const parentContainer = document.getElementById("songs")
    songs.forEach(songObject => {
        const image = songObject.image[2];
        const div = `<div class="category-card">
                        <img src="${image.url}" alt="img" />
                        <p class="category-card-para1">${songObject.title}</p>
                        <p class="category-card-para2">${songObject.primaryArtists}</p>
                        <svg onclick="songClicked(event,'${songObject.id}')" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                            class="category-card-play-svg" style="background-color: #1ed760">
                            <path
                                d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                            </path>
                        </svg>
                    </div>`
        parentContainer.innerHTML+=div; 
    });
}

const addArtists=(artists)=>{
    const parentContainer = document.getElementById("artists")
    artists.forEach(artistObject => {
        const image = artistObject.image[2];
        const div = `<div class="category-card artist-category-card" onclick="artistClicked(event,'${artistObject.id}')">
                        <img src="${image.url}" alt="img" />
                        <p class="category-card-para1">${artistObject.title}</p>
                        <p class="category-card-para2">Artist</p>
                    </div>`
        parentContainer.innerHTML+=div; 
    });
}

const addAlbums=(albums)=>{
    const parentContainer = document.getElementById("albums")
    albums.forEach(albumObject => {
        const image = albumObject.image[2];
        const div = `<div class="category-card">
                        <img src="${image.url}" alt="img" />
                        <p class="category-card-para1">${albumObject.title}</p>
                        <p class="category-card-para2">${albumObject.artist}</p>
                        <p class="category-card-para2">${albumObject.description}</p>
                        <svg onclick="albumClicked(event,'${albumObject.id}')" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                            class="category-card-play-svg" style="background-color: #1ed760">
                            <path
                                d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                            </path>
                        </svg>
                    </div>`
        parentContainer.innerHTML+=div; 
    });
}


const addPlaylists=(playlists)=>{
    const parentContainer = document.getElementById("playlists")
    playlists.forEach(playlistObject => {
        const image = playlistObject.image[2];
        const div = `<div class="category-card">
                        <img src="${image.url}" alt="img" />
                        <p class="category-card-para1">${playlistObject.title}</p>
                        <p class="category-card-para2">${playlistObject.description}</p>
                        <svg onclick="playlistClicked(event,'${playlistObject.id}')" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                            class="category-card-play-svg" style="background-color: #1ed760">
                            <path
                                d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                            </path>
                        </svg>
                    </div>`
        parentContainer.innerHTML+=div; 
    });
}

const getSearchResults = async ()=>{
    let response = await fetch(`https://saavn.dev/api/search?query=${inputQuery}`);
    let data = await response.json();
    if(!data.success){
        alert("Nothing to Show!!!");
    }
    else{
        const queryData = data.data;
        const topresults=queryData.topQuery.results;
        const songs = queryData.songs.results;
        const artists = queryData.artists.results;
        const playlists = queryData.playlists.results;
        const albums = queryData.albums.results;
        //now start dynamically adding this data
        if(topresults.length ===0){
            //nothing to display
            document.getElementById("top-not-found").style.display="block";
        }
        else{
            addTopResults(topresults);
        }
        if(songs.length ===0){
            document.getElementById("song-not-found").style.display="block";
        }
        else{
            addSongs(songs);
        }
        if(artists.length ===0){
            document.getElementById("artist-not-found").style.display="block";
        }
        else{
            addArtists(artists);
        }
        if(albums.length ===0){
            document.getElementById("album-not-found").style.display="block";
            alert("nothing to show in albums section");
        }
        else{
            addAlbums(albums);
        }
        if(playlists.length===0){
            document.getElementById("playlist-not-found").style.display="block";
        }
        else{
            addPlaylists(playlists);
        }

    }

}

getSearchResults()


function songClicked(event,id){
    window.location.href = `/views/Songs.html?query=${id}`;
    console.log(id);
}


function artistClicked(event,id){
    const encodedMessage = encodeURIComponent(id);
    window.location.href = `/views/Artist.html?artist=${encodedMessage}`;
    console.log(id);
}

function albumClicked(event,id){
    alert("album clicked with album id as: "+id)
    console.log(id);
}

function playlistClicked(event,id){
    alert("playlist clicked with playlist id as: "+id)
    console.log(id);
}