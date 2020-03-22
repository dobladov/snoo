<script>
  import { onMount } from "svelte";
  import subReddits from "../subReddits";
  import List from "./List.svelte";
  import Comments from "./Comments.svelte";
  import Video from "./Video.svelte";
  import chveronUpIcon from "feather-icons/dist/icons/chevron-up.svg";

  import cornerDownRightLogo from "feather-icons/dist/icons/corner-down-right.svg";
  import linkLogo from "feather-icons/dist/icons/link.svg";
  import messageIcon from "feather-icons/dist/icons/message-square.svg";

  const baseUrl = "https://www.reddit.com";
  let videos;
  let comments;
  let showComments =
    localStorage.getItem("showComments") === null
      ? window.innerWidth > 900
      : JSON.parse(localStorage.getItem("showComments"));

  const [, sub] = (window.location.pathname &&
    window.location.pathname.match(/\/r\/(..*)/)) || [, null];
  const hash = window.location.hash;
  let selected = sub || "videos";
  let current;
  let subRedditInput;
  let after;
  let asideScroll = 0;

  const navigate = e => {
    window.location.href = selected ? `/r/${selected}` : "/";
  };

  const setCurrent = num => {
    current = videos[num].data;

    if (history.pushState) {
      history.pushState(null, null, `#${current.id}`);
    } else {
      location.hash = `#${current.id}`;
    }
    getComments(current.permalink);
  };

  const getComments = async url => {
    const res = await fetch(`${baseUrl}${url}.json`);
    comments = (await res.json())[1].data.children;
  };

  const loadMore = async id => {
    after = "loading";
    const res = await fetch(`${baseUrl}/r/${selected}/.json?after=${id}`);
    const json = await res.json();
    videos = videos.concat(json.data.children);
    after = json.data.after;
  };

  onMount(async () => {
    subRedditInput.focus();
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
  });
</script>

<style>
  main {
    padding: 10px;
  }

  section {
    flex: 2;
    overflow: hidden;
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
    margin: 40px 0;
  }

  .title h2 {
    font-weight: 100;
    font-size: 2.5rem;
    line-height: 3rem;
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
    bottom: 10px;
    right: 30px;
    padding: 10px 20px;
  }

  @media (min-width: 900px) {
    main {
      display: flex;
      padding: 20px;
    }

    section {
      margin-right: 20px;
    }

    aside {
      max-height: 90vh;
      overflow: auto;
      position: sticky;
      top: calc(10px + 1.1rem);
      scrollbar-width: none;
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

  <section>
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
          {@html linkLogo}
        </a>
      </div>

      {#if comments}
        <button
          class="toggleComments"
          on:click={() => {
            showComments = !showComments;
            localStorage.setItem('showComments', showComments);
          }}>
          {@html messageIcon}
          &nbsp; {showComments ? 'Hide comments' : 'Show comments'}
        </button>
        {#if showComments}
          <Comments {baseUrl} {comments} depth={0} />
        {/if}
      {/if}
    {/if}
  </section>

  <aside
    on:scroll={e => {
      asideScroll = e.target.scrollTop;
    }}>

    <div>
      <form on:submit|preventDefault={navigate}>
        <label for="subRedditInput">/r/</label>
        <input
          bind:this={subRedditInput}
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

    {#if asideScroll > 100}
      <button
        type="button"
        class="goUp btn"
        on:click={() => {
          subRedditInput.scrollIntoView({ behavior: 'smooth' });
        }}>
        {@html chveronUpIcon}
      </button>
    {/if}
  </aside>

</main>
