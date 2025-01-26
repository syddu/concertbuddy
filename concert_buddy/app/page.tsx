"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [songInfo, setSongInfo] = useState({
    title: "",
    isCover: false,
    genre: "",
    instruments: [],
    funFact: "",
    tempo: "",
    key: "",
    analysis: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch("http://localhost:5000/api/song_title"),
          fetch("http://localhost:5000/api/song_type"),
          fetch("http://localhost:5000/api/song_genre"),
          fetch("http://localhost:5000/api/song_instruments"),
          fetch("http://localhost:5000/api/song_fun_fact"),
          fetch("http://localhost:5000/api/song_tempo"),
          fetch("http://localhost:5000/api/song_key"),
          fetch("http://localhost:5000/api/song_analysis"),
        ]);

        const data = await Promise.all(responses.map(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        }));

        setSongInfo({
          title: data[0].title,
          isCover: data[1].isCover,
          genre: data[2].genre,
          instruments: data[3].instruments,
          funFact: data[4].funFact,
          tempo: data[5].tempo,
          key: data[6].key,
          analysis: data[7].analysis
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8 bg-gradient-to-b from-purple-500 to-blue-500 text-white font-[family-name:var(--font-geist-sans)] overflow-y-auto">
      <h1 className="text-4xl font-bold mb-8">🎶 Music Finder 🎶</h1>

      {/* Large Round Record Button */}
      <div className="flex justify-center items-center my-10">
        <button className="bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full w-32 h-32 flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-105">
          <span className="text-white text-4xl font-bold">●</span>
        </button>
      </div>

      {/* Song Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
        <div className="p-4 border rounded shadow bg-white text-black h-64 flex flex-col items-center justify-center">
          <h2 className="font-bold text-lg">Title</h2>
          <p>{songInfo.title}</p>
        </div>
        <div className="p-4 border rounded shadow bg-white text-black h-64 flex flex-col items-center justify-center">
          <h2 className="font-bold text-lg">Type</h2>
          <p>{songInfo.isCover ? "Cover" : "Original"}</p>
        </div>
        <div className="p-4 border rounded shadow bg-white text-black h-64 flex flex-col items-center justify-center">
          <h2 className="font-bold text-lg">Genre</h2>
          <p>{songInfo.genre}</p>
        </div>
        <div className="p-4 border rounded shadow bg-white text-black h-64 flex flex-col items-center justify-center">
          <h2 className="font-bold text-lg">Instruments</h2>
          <p>{songInfo.instruments.join(", ")}</p>
        </div>
        <div className="p-4 border rounded shadow bg-white text-black h-64 flex flex-col items-center justify-center">
          <h2 className="font-bold text-lg">Fun Fact</h2>
          <p>{songInfo.funFact}</p>
        </div>
        <div className="p-4 border rounded shadow bg-white text-black h-64 flex flex-col items-center justify-center">
          <h2 className="font-bold text-lg">Tempo & Key</h2>
          <p>{songInfo.tempo} in {songInfo.key}</p>
        </div>
        <div className="p-4 border rounded shadow bg-white text-black h-96 flex flex-col items-center justify-center">
          <h2 className="font-bold text-lg">Analysis Summary</h2>
          <textarea
            className="w-full h-full p-2 border rounded"
            value={songInfo.analysis}
            readOnly
          />
        </div>
      </div>

      <footer className="flex gap-6 flex-wrap items-center justify-center mt-10">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-lg">Read our docs</span>
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-lg">Examples</span>
        </a>
      </footer>
    </div>
  );
}
