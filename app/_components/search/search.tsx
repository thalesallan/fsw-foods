"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [searchText, search] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    search(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!searchText) return;

    router.push(`/restaurants?search=${searchText}`);
  };

  return (
    <form className="flex gap-4" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar"
        className="border-none"
        onChange={handleChange}
        value={searchText}
      />
      <Button size="icon" type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
