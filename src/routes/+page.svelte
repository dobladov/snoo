<script>
  /**
   * @import {Video as VideoType, Comment} from './interfaces'
  */
  import { onMount } from "svelte";
  import subReddits from "../subReddits";
  import List from "../components/List.svelte";
  import Comments from "../components/Comments.svelte";
  import Video from "../components/Video.svelte";
  import { ChevronUpIcon, CornerDownRightIcon, LinkIcon, MessageSquareIcon} from "svelte-feather-icons";

  const baseUrl = "https://www.reddit.com";

  /** @type {VideoType[]} */
  let videos = $state([]);
  /** @type {Comment[]} */
  let comments = $state([]);
  let showComments = $state(false);
  let selected = $state("videos")
  /** @type {VideoType["data"] | null} */
  let current = $state(null);
  /** @type {string} */
  let after = $state("");
  let asideScroll = $state(0);
  let mainScroll = $state(0);

  const navigate = () => {
    if (selected) {
      const url = new URL(window.location.href);
      url.searchParams.set('r', selected);
      url.hash = '';
      history.replaceState({}, '', url.href);
      
      loadInitialData()
    }
  };

  /**
   * @param {number} num
   */
  const setCurrent = (num) => {
    current = videos[num].data;

    if (history.pushState) {
      history.pushState(null, "", `#${current.id}`);
    } else {
      location.hash = `#${current.id}`;
    }
    getComments(current.permalink);
  };

  /**
   * @param {string} url
   */
  const getComments = async (url) => {
    const res = await fetch(`${baseUrl}${url}.json`);
    comments = (await res.json())[1].data.children;
  };

  /**
   * @param {string} id
   */
  const loadMore = async id => {
    after = "loading";
    const res = await fetch(`${baseUrl}/r/${selected}/.json?after=${id}`);
    const json = await res.json();
    videos = videos.concat(json.data.children);
    after = json.data.after;
  };

  const loadInitialData = async () => {
    document.getElementById('subRedditInput')?.focus();
    const res = await fetch(`${baseUrl}/r/${selected}/.json`);
    const json = await res.json();
    const hash = window.location.hash.replace("#", "");
    videos = json.data.children;
    after = json.data.after;
    current = videos[0].data;

    // Find the id on the list and make the video the current one
    // or query his data if not on the list.
    const found = hash && videos.find(v => v.data.id === hash);
    if (found) {
      current = found.data;
    }

    if (!found && hash) {
      const res = await fetch(`${baseUrl}/comments/${hash}/.json`);
      const json = await res.json();
      current = json[0].data.children[0].data;
      videos = [json[0].data.children[0], ...videos];
      comments = json[1].data.children;
    } else {
      getComments(current.permalink);
    }
  }

  onMount(() => {
    const search = new URLSearchParams(window.location.search);
    selected = search.get('r') || "videos";

    const storedShowComments = JSON.parse(localStorage.getItem("showComments") || 'null');
    showComments = storedShowComments !== null
      ? storedShowComments
      : window.innerWidth > 900

    const onWindowScroll = () => {
      mainScroll = window.scrollY;
    };
    window.addEventListener('scroll', onWindowScroll);

    loadInitialData();

    return () => {
      window.removeEventListener('scroll', onWindowScroll);
    };
  });
</script>

<style>
  main {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem 2rem; 
  }

  aside {
    flex: 1;
    grid-area: List;
  }

  form {
    display: flex;
    justify-content: space-between;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  label {
    display: inline-block;
    border-bottom: 3px solid #262c3c;
  }

  input[type="text"] {
    width: 100%;
    padding-left: 5px;
    flex: 1;
    background-color: transparent;
    border: none;
    border-bottom: 3px solid #262c3c;
    color: white;
  }

  button[type="submit"] {
    background-color: #262c3c;
    border: 3px solid #262c3c;
    border-top: none;
    border-left: none;
    color: white;
    border-radius: 20px 6px 10px 0;
    box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.15) inset;
    padding-left: 15px;
  }

  .title {
    grid-area: Title;
  }

  .comments {
    grid-area: Comments;
  }

  .title h2 {
    font-weight: 100;
    font-size: 1.5rem;
    line-height: 2rem;
    color: white;
    display: inline;
  }

  .toggleComments {
    background-color: #262c3c;
    box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.15) inset;
    display: flex;
    align-items: center;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
  }

  .goUp {
    display: none;
    position: fixed;
    z-index: 3;
    bottom: 1rem;
    right: 1rem;
    padding: .5rem 1rem;
  }

 @media (min-width: 900px) {
  .title h2 {
    font-size: 1.9rem;
    line-height: 2.5rem;
  }

    aside {
      max-height: 90vh;
      overflow: auto;
      position: sticky;
      top: 0;
      scrollbar-width: none;
      padding-top: 3px;
      padding-right: 3px;
    }

    main {
      display: grid;
      grid-template-columns: 1fr .5fr; 
      grid-template-rows: auto auto 1fr; 
      align-items: start;
      grid-template-areas: 
        "Video List"
        "Title List"
        "Comments List"; 
    }

    input[type="text"] {
      font-size: 2rem;
    }

    .goUp {
      display: block;
    }
  }
</style>

<main>
    {#if current}
      <Video video={current} />

      <div class="title">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${baseUrl}${current.permalink}`}>
          <h2>{current.title}</h2>
        </a>
        &nbsp;
        <a target="_blank" rel="noopener noreferrer" href={current.url}>
           <LinkIcon/>
        </a>
      </div>

  <aside
      onscroll={(e) => {
        asideScroll = e?.target?.scrollTop;
      }} 
  >
    <div>
      <form onsubmit={navigate}>
        <label for="subRedditInput">/r/</label>
        <input
          type="text"
          id="subRedditInput"
          bind:value={selected}
          list="subReddits"
          placeholder="subreddit" />
        <datalist id="subReddits">
          {#each subReddits as subReddit}
            <option value={subReddit.toLowerCase().replace(/\s/g, '')}>
              {subReddit}
            </option>
          {/each}
        </datalist>
        <button type="submit">
          <CornerDownRightIcon/>
        </button>
      </form>
    </div>

    {#if videos}
      <List
        {videos}
        {baseUrl}
        {setCurrent}
        currentId={current.id}
        {after}
        {loadMore} />
    {:else}
      <p>...loading</p>
    {/if}

    {#if asideScroll > 200 || mainScroll > 200}
    <button
      type="button"
      class="goUp btn"
      onclick={() => {
        document.getElementById('subRedditInput')?.scrollIntoView({ behavior: 'smooth' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}>
      <ChevronUpIcon />
    </button>
    {/if}
  </aside>

      {#if comments.length}
      <div class="comments">
          <button
            class="toggleComments"
            onclick={() => {
              showComments = !showComments;
              localStorage.setItem('showComments', String(showComments));
            }}>
            <MessageSquareIcon/>
            &nbsp; {showComments ? 'Hide comments' : 'Show comments'}
          </button>
          {#if showComments}
            <Comments {baseUrl} {comments} depth={0} />
          {/if}
        </div>
      {/if}
    {/if}

</main>
