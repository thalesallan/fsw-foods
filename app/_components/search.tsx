"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [searchText, search] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    search(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (!searchText) return;

    router.push(`/restaurants?search=${searchText}`);
  };

  return (
    <div className="flex gap-4">
      <Input
        placeholder="Buscar"
        className="border-none"
        onChange={handleChange}
        value={searchText}
      />
      <Button size="icon" onClick={handleSearchSubmit}>
        <SearchIcon size={20} />
      </Button>
    </div>
  );
};

export default Search;
