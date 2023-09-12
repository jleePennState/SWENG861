const SEARCH_URL_PRE=" https://itunes.apple.com/search?term=";
const SEARCH_URL_POST=" &media=music&limit=5";

let loginForm = document.getElementById("userInput");
loginForm.addEventListener("submit", (e) => 
{
    e.preventDefault();

    let searchTerm = document.getElementById("searchTerm").value;
                             
    if (searchTerm == "") 
    {
        alert("Pleae enter artist name or key word to find music")
    } 
    else 
    {
        // As per iTunes ICD, replace " " with +
        searchTerm = searchTerm.replace(/\s/g, "+");
        
        // construct itunes webserach url
        let SearchURL = SEARCH_URL_PRE+searchTerm+SEARCH_URL_POST
        console.log(SearchURL)

        try
        {
            // fetch serch results from itunes API
            fetch(SearchURL) 
            // convert response to json format
            .then
            (
                function(response) 
                {
                    return response.json();
                }
            )
            // parse through jasonData
            .then          
            (
                function(jsonData)
                {
                    console.log(jsonData);

                    for (data in jsonData.results) 
                    {
                        // Artist Name
                        let artistName = jsonData.results[data].artistName;  
                        let artistNameElement = document.createElement("h5");
                        artistNameElement.innerHTML = "Artist Name is: " + artistName;
                        document.body.appendChild(artistNameElement);
                        
                        // Track Info (Song and Album)
                        let songName = jsonData.results[data].trackName;  
                        let albumName = jsonData.results[data].collectionName;  
                        let TrackInfoElement = document.createElement("h5");
                        TrackInfoElement.innerHTML = "Track: " + songName + " is from album: " + albumName;
                        document.body.appendChild(TrackInfoElement);

                        // Genre
                        let genre = jsonData.results[data].primaryGenreName;  
                        let genreElement = document.createElement("h5");
                        genreElement.innerHTML = "Genre: " + genre;
                        document.body.appendChild(genreElement);

                        // Release Date
                        let releaseDate = jsonData.results[data].releaseDate;  
                        let releaseDateElement = document.createElement("h5");
                        releaseDateElement.innerHTML = "Release Date: " + releaseDate;
                        document.body.appendChild(releaseDateElement);
                      
                        // Album Cover image
                        let albumCover = jsonData.results[data].artworkUrl60;
                        let albumCoverElement = document.createElement('img');
                        albumCoverElement.setAttribute('src', albumCover);
                        document.body.appendChild(albumCoverElement);   

                        // Audio sample
                        let audioSample = jsonData.results[data].previewUrl;
                        let audioSampleElement = document.createElement("audio");
                        audioSampleElement.setAttribute('src', audioSample);
                        audioSampleElement.setAttribute('type', "audio/x-m4a");
                        audioSampleElement.setAttribute("controls", "")
                        document.body.appendChild(audioSampleElement);

                    }
                }
            )
        }
        catch(ex)
        {
            console.error(ex);
        }     
    }
});