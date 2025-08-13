export interface Video {
  data: {
    permalink: string;
    title: string;
    url: string;
    id: string;
    thumbnail: string;
    over_18: boolean;
    spoiler: boolean;
    author: string;
    ups: number;
    downs: number;
    num_comments: number;
  };
}

export interface Comment {
  data: {
    body: string;
    ups: number;
    created: number;
    id: string;
    downs: number;
    author: string;
    is_submitter: boolean;
    replies: {
      data: {
        children: Comment;
      };
    };
  };
}
