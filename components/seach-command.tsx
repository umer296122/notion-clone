"use client ";
import { KeyboardEvent, useEffect, useState } from "react";
import { File } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/use-search";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
export const SearchCommand = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const documents = useQuery(api.documents.getSearch);
  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onclose = useSearch((store) => store.onClose);
  const onSelect = (id: string) => {
    router.push(`documents/${id}`);
    onclose();
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);
  if (!isMounted) return null;
  return (
    <CommandDialog open={isOpen} onOpenChange={onclose}>
      <CommandInput
        placeholder={`Search ${user?.firstName}'s notion...`}
      ></CommandInput>
      <CommandList>
        <CommandEmpty>No result found!</CommandEmpty>
        <CommandGroup heading="documents">
          {documents?.map((document) => (
            <CommandItem
              key={document._id}
              value={`${document._id}-${document.title}`}
              title={document.title}
              onSelect={onSelect}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px">{document.icon}</p>
              ) : (
                <File className="mr-2 w-4 h-4" />
              )}
              <span>{document.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
