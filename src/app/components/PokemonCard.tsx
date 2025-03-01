import Link from "next/link";
import Image from "next/image";

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
}

export default function PokemonCard({ id, name, image }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${id}`} className="block bg-gray-200 rounded-lg p-4 text-center hover:shadow-lg transition">
      <Image src={image} alt={name} width={120} height={120} className="mx-auto" />
      <p className="capitalize mt-2 font-medium">{name}</p>
    </Link>
  );
}
