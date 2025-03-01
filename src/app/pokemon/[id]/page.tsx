"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Pokemon } from "../../utils/types";

const typeColors: Record<string, string> = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-500",
  psychic: "bg-purple-500",
  ice: "bg-cyan-400",
  dragon: "bg-indigo-600",
  dark: "bg-gray-700",
  fairy: "bg-pink-400",
  normal: "bg-gray-400",
  fighting: "bg-orange-700",
  flying: "bg-blue-300",
  poison: "bg-purple-700",
  ground: "bg-yellow-700",
  rock: "bg-gray-600",
  bug: "bg-green-600",
  ghost: "bg-indigo-800",
  steel: "bg-gray-500",
};

const PokemonPage = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchPokemon = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon(data);
    };
    fetchPokemon();
  }, [id]);

  if (!pokemon) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold text-black text-center">Pokémon Explorer</h1>


      <div className="mt-4 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 shadow-lg rounded-lg p-10 bg-gray-400">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-5xl font-bold capitalize mb-6 text-gray-200">{pokemon.name}</h1>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-80 h-80 object-contain bg-gray-200 rounded-xl shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gray-200 text-black p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold">Types</h2>
          <div className="mt-2 flex gap-3 flex-wrap">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className={`${typeColors[t.type.name] || "bg-gray-500"} text-white px-4 py-1 rounded-full text-sm capitalize shadow-md`}
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <h2 className="mt-6 text-2xl font-semibold">Stats</h2>
          <ul className="mt-2 space-y-2">
            {pokemon.stats.map((s) => (
              <li key={s.stat.name} className="flex justify-between items-center bg-black px-4 py-2 rounded-md shadow-sm">
                <span className="capitalize text-gray-200">{s.stat.name.replace("-", " ")}</span>
                <span className="font-bold text-gray-200">{s.base_stat}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-6 text-2xl font-semibold">Moves</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {pokemon.moves.slice(0, 10).map((m) => (
              <span
                key={m.move.name}
                className="bg-gray-300 text-black px-3 py-1 rounded-md text-sm shadow-sm capitalize"
              >
                {m.move.name.replace("-", " ")}
              </span>
            ))}
          </div>

          <a href="/" className="mt-6 inline-block text-blue-500 hover:underline text-lg">
            ← Back to Home
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default PokemonPage;
