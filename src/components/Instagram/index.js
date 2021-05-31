import React from 'react';

// Styles
import './instagram.css';

export default class Instagram extends React.Component {
  state = { photos: [], loading: true };

  async componentDidMount() {
    try {
      // Hack from https://stackoverflow.com/a/47243409/2217533
      // const response = await fetch(
      //   `https://graph.instagram.com/me/media?fields=media_url,permalink,username,thumbnail_url&access_token=IGQVJWV2NiUGNWeUw4a3NPSXdrRXFqZAUh2M3pjLUVEQnJNODhRNG1TcVZAvdFdBZAjN0Y2hhQVJTMU5QODYyRS1CcGI3NTJmd0d2TFA1UEFKTG1PRlp2RW1oT0k4WU5Ybmp0UUc5RVUzZA1dYLUpfRGtQRwZDZD`
      // );
      const response = await fetch(
        `https://api.instagram.com/oauth/authorize?client_id=4094412503950762&redirect_uri=https://milosjo-instagram.netlify.app&scope=user_profile,user_media&response_type=code`
      );
      const { data } = await response.json();
      console.log('data:', data);
      const photos = data.map((photo) => {
        const { id, media_url, username, permalink } = photo;
        return {
          id,
          media_url,
          username,
          permalink,
        };
      });
      this.setState({ photos, loading: false });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { loading, photos } = this.state;

    return (
      <div className="post-wrapper">
        {loading === true ? (
          <div style={{ textAlign: 'center' }}>
            <h1>Loading ...</h1>
          </div>
        ) : (
          photos &&
          photos.map(({ id, media_url, username, permalink }) => (
            <a
              href={permalink}
              target="_blank"
              className="post-item"
              rel="noopener noreferrer"
              key={id}
            >
              <img src={media_url} className="post-image" alt={username} />
              {/*  */}
              <div className="post-item-info">
                <ul>
                  <li className="post-item-likes">
                    <span role="img" aria-label="heart">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        fill="white"
                        style={{
                          fontSize: '14px',
                          lineHeight: '1.45',
                        }}
                      >
                        <path d="M12 4.435C10.011-.964 0-.162 0 8.003 0 12.071 3.06 17.484 12 23c8.94-5.516 12-10.929 12-14.997C24-.115 14-.996 12 4.435z" />
                      </svg>
                    </span>{' '}
                  </li>
                  <li className="post-item-comments">
                    <span role="img" aria-label="speech-balloon">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        fill="white"
                        style={{
                          fontSize: '14px',
                          lineHeight: '1.45',
                        }}
                      >
                        <path d="M24 9.874C24 4.42 18.627 0 12 0S0 4.42 0 9.874c0 4.512 3.678 8.317 8.701 9.496L12 24l3.299-4.63C20.322 18.19 24 14.385 24 9.874z" />
                      </svg>
                    </span>{' '}
                  </li>
                </ul>
              </div>
            </a>
          ))
        )}
      </div>
    );
  }
}
