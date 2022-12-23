import { tweets } from "../data/tweets";
import { mentions } from "../data/mentions";

const blacklists = {
  tweets: new Set([
    "1570109407194750977",
    "1551664278624735232",
    "1553048018814996482",
    "1517891024999391234",
    "1552375538500702210",
    "1525570518128246784",
    "1290259772042670080",
    "1590078739588984832",
    "1598770162265882624",
    "1527691612846972929",
    "1512585647344832518",
    "1520128733360832512",
    "1600542882309578752",
  ]),
  mentions: new Set([
    "1522306545979166722",
    "1521759620003508225",
    "1536699272221143040",
    "1536614322327134208",
    "1536346859538554885",
    "1562023920907190272",
    "1556938834264203264",
    "1556889235398856704",
    "1516807031512092680",
    "1588115141937217539",
    "1587808077251756032",
    "1587768417335099392",
    "1587683662421643264",
    "1587614362692370432",
    "1587464609979473921",
    "1587461348493086726",
    "1558346160586252288",
    "1558562716935196672",
    "1597440544703406081",
    "1597296423883898880",
    "1598009496429015041",
    "1597820279526678528",
    "1603444724387356672",
    "1563232482874429442",
    "1545547535397359618",
    "1525133204969115648",
    "1573626414716313600",
    "1539280901405908997",
  ]),
};

export type RawMedia = {
  type: string;
  media_url_https: string;
  variants?: { url: string };
};

export type RawUrl = {
  expanded_url: string;
};

export type RawMediaExtended = {
  video_info?: {
    variants: Array<{ url: string }>;
  };
};

export type RawTweet = {
  tweet: {
    id: string;
    full_text: string;
    favorite_count: string;
    in_reply_to_screen_name?: string;
    in_reply_to_status_id?: string;
    in_reply_to_user_id?: string;
    created_at: string;
    entities: {
      urls: RawUrl[];
      media?: RawMedia[];
    };
    extended_entities?: {
      media?: RawMedia[];
    };
  };
};

export type RawMention = {
  id: string;
  text: string;
  referenced_tweets?: Array<{ type: string; id: string }>;
  author: any;
};

export interface DatasetParams {
  tweets: RawTweet[];
  mentions: RawMention[];
}

export class Dataset {
  public tweets: Tweet[];
  public mentions: Mention[];
  public mentionsByTweetId: Record<string, Mention[]> = {};

  constructor(params: DatasetParams) {
    this.tweets = params.tweets
      .map((data) => new Tweet({ data, dataset: this }))
      .filter((t) => !blacklists.tweets.has(t.id));
    this.mentions = params.mentions
      .map((data) => new Mention({ data, dataset: this }))
      .filter((m) => !blacklists.mentions.has(m.id));
    this.mentions.forEach((mention) => {
      mention.referencedTweetIds.forEach((tweetId) => {
        if (!this.mentionsByTweetId[tweetId]) {
          this.mentionsByTweetId[tweetId] = [];
        }
        this.mentionsByTweetId[tweetId].push(mention);
      });
    });
  }
}

export interface TweetParams {
  data: RawTweet;
  dataset: Dataset;
}

interface MediaParams {
  data: RawMedia;
  dataset: Dataset;
}

export class MediaItem {
  data: RawMedia;
  dataset: Dataset;

  constructor(params: MediaParams) {
    this.data = params.data;
    this.dataset = params.dataset;
  }

  get type() {
    return this.data.type;
  }

  get sources() {
    if (this.data.type === "video") {
      // @ts-ignore
      return this.data.video_info.variants?.map((v) => ({
        url: v.url,
        content_type: v.content_type,
      }));
    } else {
      return [{ url: this.data.media_url_https, content_type: "image/jpeg" }];
    }
  }
}

export class Tweet {
  dataset: Dataset;
  data: RawTweet;
  medias: MediaItem[];

  constructor(params: TweetParams) {
    this.data = params.data;
    this.dataset = params.dataset;
    this.medias = [];
    this.data.tweet.entities.media?.forEach((media) => {
      this.medias.push(new MediaItem({ data: media, dataset: this.dataset }));
    });
    this.data.tweet.extended_entities?.media?.forEach((media) => {
      this.medias.push(new MediaItem({ data: media, dataset: this.dataset }));
    });
  }

  get id() {
    return this.data.tweet.id;
  }

  get text() {
    return this.data.tweet.full_text;
  }

  get urls() {
    return this.data.tweet.entities.urls;
  }

  get isReply() {
    return !!(
      this.data.tweet.in_reply_to_screen_name ||
      this.data.tweet.in_reply_to_status_id ||
      this.data.tweet.in_reply_to_user_id
    );
  }

  get hasMedia() {
    return this.medias.length > 0;
  }

  get primaryMedia() {
    const video = this.medias.find((media) => media.type === "video");
    if (video) {
      return video;
    } else {
      return this.medias[0];
    }
  }

  get replies() {
    return this.dataset.mentionsByTweetId[this.id] || [];
  }

  get likes() {
    return Number(this.data.tweet.favorite_count);
  }

  get codesandboxUrl() {
    return this.data.tweet.entities.urls
      .map((u) => u.expanded_url)
      .find((url) => url.includes("codesandbox"));
  }

  get createdAt() {
    return new Date(this.data.tweet.created_at);
  }
}

export interface MentionParams {
  data: RawMention;
  dataset: Dataset;
}

export class Mention {
  data: RawMention;
  dataset: Dataset;

  constructor(params: MentionParams) {
    this.data = params.data;
    this.dataset = params.dataset;
  }

  get id() {
    return this.data.id;
  }

  get referencedTweetIds() {
    return this.data.referenced_tweets?.map((t) => t.id) ?? [];
  }

  get author() {
    return this.data.author;
  }

  get text() {
    const segments = this.data.text.split(" ");
    while (typeof segments[0] === "string" && segments[0].startsWith("@")) {
      segments.shift();
    }
    return segments.join(" ");
  }
}

export const dataset = new Dataset({ tweets, mentions });
