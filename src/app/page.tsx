"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface PokemonListItem {
  name: string;
  url: string;
}

const getPokemonList = async (): Promise<PokemonListItem[]> => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();
  return data.results;
};

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getPokemonList().then(setPokemonList);
  }, []);

  const filteredPokemon = pokemonList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-black text-center">Pokémon Explorer</h1>

      <div className="mt-6 flex justify-center">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-gray-900 border border-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
        />
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredPokemon.map((p, index) => {
          const pokemonId = p.url.split("/").filter(Boolean).pop();
          return (
            <Link key={p.name} href={`/pokemon/${pokemonId}`}>
              <motion.div
                initial={{ opacity: 0, x:index % 2 === 0 ? -40 : 40, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.25 }}
                className="min-h-32 p-4 bg-gray-200 shadow-md rounded-lg text-center hover:scale-105 transition-transform border border-gray-300 hover:border-gray-700 will-change-transform"
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                  alt={p.name}
                  className="w-3/4 h-3/4 mx-auto object-contain"
                />
                <p className="mt-2 font-semibold capitalize text-gray-900 ">{p.name}</p>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
