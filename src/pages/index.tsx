import * as React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/src/styles/Home.module.css';
import { useMovieSearch } from '../hooks/useMovieSearch';
import { trpc } from '../utils/trpc';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { input, setInput, movies } = useMovieSearch();
  const userQuery = trpc.user.all.useQuery();
  console.log('users', userQuery.data);
  // console.log('movies', movies);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>hello party people!</p>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div>
          {/* <button onClick={() => createUser()}>create peter shaw</button> */}
          {movies?.results?.map((movie: any) => (
            <div key={movie.id}>
              <img
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
                alt=''
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
