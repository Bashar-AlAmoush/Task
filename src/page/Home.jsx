import React from 'react'
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
function Home() {


    
const [albums, setAlbums] = React.useState([]);

React.useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/albums')
    .then(response => response.json())
    .then(data => setAlbums(data));
}, []);

console.log(albums);


const people = [
    {
      name: 'Calvin Hawkins',
      email: 'calvin.hawkins@example.com',
      image:
        'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Kristen Ramos',
      email: 'kristen.ramos@example.com',
      image:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Ted Fox',
      email: 'ted.fox@example.com',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ]

  return (<>
    <section>
      <Hero/>

<h1 class="text-3xl font-bold underline red ">
    Hello world!
  </h1>

    <h2>Albums</h2>
    <ul>
      {albums.map(album => (
        <li key={album.id}>
          <Link to={`/albums/${album.id}/photos`}>{album.title}</Link>
        </li>
      ))}
    </ul>
  </section>
  </>
  )
}

export default Home