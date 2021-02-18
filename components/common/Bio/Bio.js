import clsx from "clsx";

import { Image } from "..";
import { getSiteMetaData } from "@utils/helpers";

export function Bio({ className }) {
  const { author, social } = getSiteMetaData();

  return (
    <div className={clsx(`flex items-center`, className)}>
      <Image
        className="flex-shrink-0 mb-0 mr-3 rounded-full w-14 h-14"
        src="https://github.com/jpbrab0.png"
        webpSrc="https://github.com/jpbrab0.png"
        previewSrc="https://github.com/jpbrab0.png"
        alt="Profile"
      />

      <p className="text-base leading-7">
        Written by <b className="font-semibold">{author.name}</b>{" "}
        <br></br>
        {author.summary}{" "}
        <br></br>
        <a href={`https://twitter.com/${social.twitter}`} className="w-12">
          <img src="https://upload.wikimedia.org/wikipedia/pt/thumb/3/3d/Twitter_logo_2012.svg/1200px-Twitter_logo_2012.svg.png" className="w-13 h-8"/>
        </a>
      </p>
    </div>
  );
}
