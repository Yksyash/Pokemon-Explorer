export interface PokemonListResponse {
    results: PokemonListItem[];
  }
  
  export interface PokemonListItem {
    name: string;
    url: string;
  }
  
  export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
      other: {
        'official-artwork': {
          front_default: string;
        };
      };
    };
    types: PokemonType[];
    stats: { 
      base_stat: number;
      stat: { name: string };
    }[];
    moves: { 
      move: { name: string };
    }[];
  }
  
  
  export interface PokemonType {
    type: {
      name: string;
    };
  }
  