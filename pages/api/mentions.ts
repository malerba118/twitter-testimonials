// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { keyBy } from "lodash";

const totalPages = 20;

const getMentions = async () => {
  const tokens = new Set<string>();
  let currentPage = 1;
  let mentions: any[] = [];
  let nextPaginationToken = undefined;
  while (currentPage <= totalPages) {
    const res: any = await axios.get(
      `https://api.twitter.com/2/users/1212993847355002880/mentions`,
      {
        params: {
          max_results: 100,
          pagination_token: nextPaginationToken,
          expansions: "author_id",
          "tweet.fields": "referenced_tweets,text",
          "user.fields": "id,name,profile_image_url,username",
        },
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
        },
      }
    );
    nextPaginationToken = res.data.meta.next_token;
    if (!nextPaginationToken) {
      break;
    }
    const authorsById = keyBy(res.data.includes.users, "id");
    res.data.data.forEach(
      (mention: any) => (mention.author = authorsById[mention.author_id])
    );
    mentions = mentions.concat(res.data.data);
    currentPage++;
  }
  return mentions;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[]>
) {
  const mentions = await getMentions();
  res.status(200).json(mentions);
}
