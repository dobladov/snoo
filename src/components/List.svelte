<script>
  import { fly } from "svelte/transition";
  import messageIcon from "feather-icons/dist/icons/message-square.svg";
  import thumbsUpIcon from "feather-icons/dist/icons/thumbs-up.svg";

  export let videos;
  export let baseUrl;
  export let setCurrent;
  export let currentId;
  export let after;
  export let loadMore;

  const getImage = video => {
    return (
      (video.secure_media &&
        video.secure_media.oembed &&
        video.secure_media.oembed.thumbnail_url) ||
      video.thumbnail
    );
  };
</script>

<style>
  .listContainer {
    max-height: 85vh;
    overflow: auto;
    position: sticky;
    top: 20px;
    scrollbar-width: none;
  }

  .listContainer::-webkit-scrollbar {
    display: none;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.15) inset;
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 20px;
    cursor: pointer;
    display: flex;
    position: relative;
    overflow: hidden;
    min-height: 100px;
  }

  li.current .overlay {
    background: linear-gradient(
      90deg,
      hsla(346, 71%, 58%, 1) 30%,
      hsla(346, 71%, 58%, 0.7) 60%,
      hsla(346, 71%, 58%, 0) 100%
    ) !important;
  }

  li.current a {
    color: #262c3c;
  }

  li.current a.title {
    color: white;
  }

  .content {
    z-index: 2;
  }

  .thumbnail {
    position: absolute;
    /* min-width: 100px;
    max-height: 160px; */
    /* overflow: hidden; */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.15) inset;
    transition: all 0.4s;
  }

  li:hover .overlay {
    opacity: 0.6;
  }

  img {
    margin-top: -45px;
    width: 100%;
    object-fit: cover;
    /* margin-top: -44px; */
  }

  a.title {
    color: white;
    font-size: 1.5rem;
  }

  .after {
    text-align: right;
  }

  .after button {
    box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.15) inset;
    background-color: hsl(346, 71%, 58%);
    color: white;
    border: none;
    padding: 20px 40px;
    border-radius: 2px;
    font-size: 1.5rem;
  }
</style>

<div class="listContainer">
  <ul>
    {#each videos as { data: video }, i (video.id)}
      <li
        in:fly={{ x: -100, duration: 400, delay: 200 }}
        on:click={() => {
          setCurrent(i);
        }}
        class:current={currentId === video.id}
        style={`background-color: hsl(${240 + i * 5}, 50%, 11%)`}>
        {#if video.thumbnail}
          <div class="thumbnail">
            <img src={getImage(video)} alt={video.title} />
            <div
              class="overlay"
              style={`background: linear-gradient(90deg, hsla(${240 + i * 5}, 50%, 11%, 1) 30%, hsla(${240 + i * 5}, 50%, 11%, .7) 60%,hsla(${240 + i * 5}, 50%, 11%, 0) 100%)`} />
          </div>
        {/if}

        <div class="content">
          <a
            class="title"
            on:click|preventDefault
            href={`${baseUrl}${video.permalink}`}>
            {video.title.replace(/\[\w*\]\s?/, '')}
          </a>

          <div>
            <span>
              Posted by /u/
              <a href={`${baseUrl}/u/${video.author}`}>{video.author}</a>
            </span>

            <span>
              {@html messageIcon}
              &nbsp;
              <a href={`${baseUrl}${video.permalink}#siteTable_t3_emy0l0`}>
                {video.num_comments}
              </a>
            </span>

            <span>
              &nbsp;-&nbsp;
              {@html thumbsUpIcon}
              &nbsp;
              <a href={`${baseUrl}${video.permalink}#siteTable_t3_emy0l0`}>
                {video.ups}
              </a>
            </span>

          </div>

        </div>
      </li>
    {/each}
  </ul>

  {#if after}
    <div class="after">
      <button type="button" on:click={() => loadMore(after)}>Load More</button>
    </div>
  {/if}
</div>
