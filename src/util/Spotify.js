let accessToken = '';
let expiresIn = 0;
const clientId = 'd03016ee8cbf40b5abc53e05dc91ec11';
const redirectURI = 'http://localhost:3000/';
let authURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`; //retrieve access token
let responseURL = ''; //should contain access token
let usersId = '';
let playlistId = '';

export const Spotify = {
  getAccessToken() {
    if(accessToken)
      return accessToken;

    responseURL = window.location.href;
    accessToken = responseURL.match(/access_token=([^&]*)/);
    if (accessToken) {
      expiresIn = responseURL.match(/expires_in=([^&]*)/);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }

    window.location = authURL;
  },

  search(term) {
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message))
    .then(
      jsonResponse => {
        if (jsonResponse.tracks) {
          console.log(jsonResponse.tracks);
          return jsonResponse.tracks.map(track => {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            URI: track.uri
          });
        }
        return [];
      }
    );
  },

  savePlaylist(name, tracks) {
    if (!name || !tracks) {
      return;
    }
    fetch('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
    .then(response => response.json()).then(jsonResponse => usersId = jsonResponse.id);
    fetch(`https://api.spotify.com/v1/users/${usersId}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name
      })
    }).then(response => response.json()).then(jsonResponse => playlistId = jsonResponse.id);
  }
};















