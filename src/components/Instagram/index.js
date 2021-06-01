// import React from 'react';

// // Styles
// import './instagram.css';

// const token = `IGQVJWUW8zZA2szM3d0SUdsdWFYbGhfZAXE3VXcybXkwMlhVaU9DdHE1dkZApY2F6MnZAQUDVxclc2eWFJUU5POVNyZAkx3c1BBSG9vS1JlcEw2VHFMZAHBLZAG1nQ05QZAnpEMDNpZAnVTQ29CQnhFT0VONWFPNQZDZD`;
// export default class Instagram extends React.Component {
//   state = { photos: [], loading: true };

//   async componentDidMount() {
//     try {
//       // Hack from https://stackoverflow.com/a/47243409/2217533
//       // const response = await fetch(
//       //   `https://graph.instagram.com/me/media?fields=media_url,permalink,username,thumbnail_url&access_token=IGQVJVdDA5NWRtS2FBbER0eldRMXZAJVF84MU4tcnFqZAlQ1SHkxWlZArNklIQW9iX2hFTVZA2d080REVrUnVUS0o4c0xNY1R3Qi1ic1BMazdWeVNlZAER4T0dxbUNfVmttS0tFSGdXejVIVkRHV0d0eEU4dQZDZD`
//       // );
//       // const response = await fetch(
//       //   `https://api.instagram.com/oauth/authorize?client_id=4094412503950762&redirect_uri=https://milosjo-instagram.netlify.app&scope=user_profile,user_media&response_type=code`
//       // );
//       // const response = await fetch(
//       //   `https://api.instagram.com/oauth/authorize?client_id=4094412503950762&redirect_uri=https://milosjo-instagram.netlify.app&scope=user_profile,user_media&response_type=code`
//       // );
//       const response = await fetch(
//         `https://www.instagram.com/graphql/query/?query_hash=42323d64886122307be10013ad2dcc44&variables={"id":1264743931,"first":6}`,
//         {
//           mode: 'no-cors',
//           headers: {
//             'Access-Control-Allow-Origin': '*',
//           },
//         }
//       );
//       const { data } = await response.json();
//       console.log('data:', data);
//       const photos = data.map((photo) => {
//         const { id, media_url, username, permalink } = photo;
//         return {
//           id,
//           media_url,
//           username,
//           permalink,
//         };
//       });
//       this.setState({ photos, loading: false });
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   render() {
//     const { loading, photos } = this.state;

//     return (
//       <div className="post-wrapper">
//         {loading === true ? (
//           <div style={{ textAlign: 'center' }}>
//             <h1>Loading ...</h1>
//           </div>
//         ) : (
//           photos &&
//           photos.map(({ id, media_url, username, permalink }) => (
//             <a
//               href={permalink}
//               target="_blank"
//               className="post-item"
//               rel="noopener noreferrer"
//               key={id}
//             >
//               <img src={media_url} className="post-image" alt={username} />
//               {/*  */}
//               <div className="post-item-info">
//                 <ul>
//                   <li className="post-item-likes">
//                     <span role="img" aria-label="heart">
//                       <svg
//                         width="1em"
//                         height="1em"
//                         viewBox="0 0 24 24"
//                         fill="white"
//                         style={{
//                           fontSize: '14px',
//                           lineHeight: '1.45',
//                         }}
//                       >
//                         <path d="M12 4.435C10.011-.964 0-.162 0 8.003 0 12.071 3.06 17.484 12 23c8.94-5.516 12-10.929 12-14.997C24-.115 14-.996 12 4.435z" />
//                       </svg>
//                     </span>{' '}
//                   </li>
//                   <li className="post-item-comments">
//                     <span role="img" aria-label="speech-balloon">
//                       <svg
//                         width="1em"
//                         height="1em"
//                         viewBox="0 0 24 24"
//                         fill="white"
//                         style={{
//                           fontSize: '14px',
//                           lineHeight: '1.45',
//                         }}
//                       >
//                         <path d="M24 9.874C24 4.42 18.627 0 12 0S0 4.42 0 9.874c0 4.512 3.678 8.317 8.701 9.496L12 24l3.299-4.63C20.322 18.19 24 14.385 24 9.874z" />
//                       </svg>
//                     </span>{' '}
//                   </li>
//                 </ul>
//               </div>
//             </a>
//           ))
//         )}
//       </div>
//     );
//   }
// }
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Card = styled.img`
  justify-self: center;
  width: 300px;
  height: 300px;
  background-position: center;
  background-repeat: no-repeat;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
`;
const url = 'https://www.instagram.com/milosjovancevic/channel/?__a=1';
const Insta = () => {
  const [insta, setInsta] = useState([]);
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
          'Access-Control-Allow-Headers':
            'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
        },
      })
      .then((data) => data.json())
      .then((data) => {
        const photosArray = data.data.user.edge_owner_to_timeline_media.edges;
        setInsta(photosArray);
      });
  }, []);
  return (
    <Grid>
      {insta.map((photo) => (
        <Card src={photo.node.display_url} key={photo.node.id} />
      ))}
    </Grid>
  );
};
export default Insta;
