import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetNewsQuery } from "../../store/api/get-news-api";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { ApiCategories, NewsData } from "../../utils";
type FormValue = {
    search: string;
  };
function SearchArea() {
    const [searchedText, setSearchedText] = useState<string>("");
      const [category, setCategory] = useState<string>("");
      const { data } = useGetNewsQuery(searchedText) as {
        data: { articles: NewsData[] };
      };
      const { register, handleSubmit } = useForm<FormValue>();
      const onSubmit = (data: FormValue) => {
        if (searchedText && category) {
          setSearchedText(`everything?${category}&q=${data.search}`);
        } else {
          setSearchedText(`everything?q=${data.search}`);
        }
      };
      console.log(data);
    return (
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="container flex p-3 gap-5"
          >
            <div className="flex items-center w-full">
              <Input autoComplete="off" placeholder="Search" {...register("search")} />
              <Button>Search</Button>
            </div>
            <Select onValueChange={(a) => setCategory(a)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                {ApiCategories.map((category, inx) => (
                  <SelectItem key={inx} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </form>
          <div className="container grid grid-cols-3 gap-5">
            {data &&
              data.articles
                .filter((a) => a.author)
                .map((article, inx) => (
                  <a
                    href={article.url}
                    target="_blank"
                    key={inx}
                    className="relative flex flex-col justify-between overflow-hidden border rounded-md group"
                  >
                    <img
                      className="object-cover w-full h-full group-hover:scale-110 duration-300"
                      src={article.urlToImage}
                      alt=""
                    />
                    <p className="absolute px-2 text-xs font-bold text-black bg-white rounded-md top-2 right-2">
                      {article.source.name}
                    </p>
    
                    <div className="absolute bottom-0 left-0 w-full p-2 text-white bg-gradient-to-t from-black via-black/90 to-transparent">
                      <p className="my-3 text-xs font-medium text-white">
                        {article.author?.includes(",")
                          ? article.author.split(",")[0]
                          : article.author}
                      </p>
                      <p className="text-xl font-medium">{article.title}</p>
                    </div>
                  </a>
                ))}
          </div>
        </div>
      );
}

export default SearchArea