<script>
  import { onMount } from "svelte";
  import subReddits from "../subReddits";
  import List from "./List.svelte";
  import Comments from "./Comments.svelte";
  import Video from "./Video.svelte";

  import cornerDownRightLogo from "feather-icons/dist/icons/corner-down-right.svg";
  import linkLogo from "feather-icons/dist/icons/link.svg";

  const baseUrl = "https://www.reddit.com";
  let videos;
  let comments;

  const [, sub] = (window.location.pathname &&
    window.location.pathname.match(/\/r\/(..*)/)) || [, null];
  const hash = window.location.hash;
  let selected = sub || "videos";
  let current;
  let subRedditInput;
  let after;

  const navigate = e => {
    window.location.href = selected ? `/r/${selected}` : "/";
  };

  const setCurrent = num => {
    current = videos[num].data;
    getComments(current.permalink);
  };

  const getComments = async url => {
    const res = await fetch(`${baseUrl}${url}.json`);
    comments = (await res.json())[1].data.children;
  };

  const loadMore = async id => {
    after = null;
    const res = await fetch(`${baseUrl}/r/${selected}/.json?after=${id}`);
    const json = await res.json();
    videos = videos.concat(json.data.children);
    after = json.data.after;
  };

  onMount(async () => {
    subRedditInput.focus();
    const res = await fetch(`${baseUrl}/r/${selected}/.json`);
    const json = await res.json();
    videos = json.data.children;
    after = json.data.after;
    current = videos[0].data;
    getComments(current.permalink);

    console.log(current);
  });
</script>

<style>
  main {
    padding: 20px;
    display: flex;
  }

  section {
    flex: 2;
    overflow: hidden;
    margin-right: 20px;
  }

  aside {
    flex: 1;
  }

  form {
    display: flex;
    justify-content: space-between;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  span {
    display: inline-block;
    border-bottom: 3px solid #262c3c;
  }

  input[type="text"] {
    font-size: 2rem;
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
  }

  .title {
    margin: 40px 0;
  }

  .title h2 {
    font-weight: 100;
    font-size: 2.5rem;
    line-height: 3rem;
    color: white;
    display: inline;
  }
</style>

<main>

  <section>
    {#if current}
      <Video video={current} />

      <div class="title">
        <a href={`${baseUrl}${current.permalink}`}>
          <h2>{current.title}</h2>
        </a>
        &nbsp;
        <a href={current.url}>
          {@html linkLogo}
        </a>
      </div>

      {#if comments}
        <Comments {comments} depth={0} />
      {/if}
    {/if}
  </section>

  <aside>

    <div>
      <form on:submit|preventDefault={navigate}>
        <span>/r/</span>
        <input
          bind:this={subRedditInput}
          type="text"
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
          {@html cornerDownRightLogo}
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
  </aside>

</main>
