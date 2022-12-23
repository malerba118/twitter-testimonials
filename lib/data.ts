import { tweets } from "../data/tweets";
import { mentions } from "../data/mentions";

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
    this.tweets = params.tweets.map(
      (data) => new Tweet({ data, dataset: this })
    );
    this.mentions = params.mentions.map(
      (data) => new Mention({ data, dataset: this })
    );
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
    return this.data.text;
  }
}

export const dataset = new Dataset({ tweets, mentions });
