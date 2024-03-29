<script>
  import { fly } from "svelte/transition";
  import messageIcon from "bundle-text:feather-icons/dist/icons/message-square.svg";
  import thumbsUpIcon from "bundle-text:feather-icons/dist/icons/thumbs-up.svg";

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
    text-shadow: 1px 1px 1px #000000ba;
  }

  li.current .overlay {
    background: linear-gradient(
      90deg,
      hsla(346, 71%, 58%, 1) 30%,
      hsla(346, 71%, 58%, 0.7) 60%,
      hsla(346, 71%, 58%, 0) 100%
    ) !important;
  }

  li a {
    color: white;
    font-weight: bold;
  }

  li a.title {
    font-weight: 200;
    display: block;
    font-size: 2rem;
    text-decoration: none;
  }

  .content {
    z-index: 2;
    width: 100%;
  }

  .meta {
    justify-content: space-between;
    align-items: center;
  }

  .counters {
    display: flex;
    align-items: center;
  }

  .counters .separator {
    padding: 0 10px;
  }

  .thumbnail {
    position: absolute;
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
    width: 100%;
    object-fit: cover;
    height: 100%;
    text-shadow: none;
    color: transparent;
    transition: opacity 0.4s;
  }

  img.spoiler,
  img.adult {
    opacity: 0;
  }

  li:hover img.spoiler,
  li:hover img.adult {
    opacity: 1;
  }

  a.title {
    color: white;
    font-size: 1.5rem;
  }

  .after {
    text-align: right;
  }

  @media (min-width: 900px) {
    .meta {
      display: flex;
    }
  }

  @media (max-width: 900px) {
    li {
      margin-right: 20px;
      min-width: 350px;
    }

    ul {
      display: flex;
      overflow-x: auto;
      align-items: flex-start;
      overflow: auto;
      margin-bottom: 10px;
    }

    .tilte {
      font-size: 1rem;
    }
  }

  .warnning {
    font-weight: bold;
    margin-right: 10px;
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
            <img
              class:spoiler={video.spoiler}
              class:adult={video.over_18}
              src={getImage(video)}
              alt={video.title} />
            <div
              class="overlay"
              style={`background: linear-gradient(90deg, hsla(${240 + i * 5}, 50%, 11%, 1) 30%, hsla(${240 + i * 5}, 50%, 11%, .7) 60%,hsla(${240 + i * 5}, 50%, 11%, 0) 100%)`} />
          </div>
        {/if}

        <div class="content">
          <a
            class="title"
            on:click|preventDefault
            title={video.title}
            href={`${baseUrl}${video.permalink}`}>
            {video.title.replace(/\[\w*\]\s?/, '').length > 70 ? `${video.title
                  .replace(/\[\w*\]\s?/, '')
                  .slice(0, 70)}...` : video.title.replace(/\[\w*\]\s?/, '')}
          </a>

          <div class="meta">
            <div>
              By:
              <a
                on:click|stopPropagation
                target="_blank"
                rel="noopener noreferrer"
                href={`${baseUrl}/u/${video.author}`}>
                {video.author}
              </a>
            </div>

            <div class="counters">
              {#if video.over_18}
                <span class="warnning">[NSFW]</span>
              {/if}
              {#if video.spoiler}
                <span class="warnning">[SPOILER]</span>
              {/if}

              {@html messageIcon}
              &nbsp;
              <a
                href={`${baseUrl}${video.permalink}#siteTable_t3_emy0l0`}
                on:click|stopPropagation
                target="_blank"
                rel="noopener noreferrer">
                {video.num_comments}
              </a>
              <span class="separator">&ndash;</span>
              {@html thumbsUpIcon}
              &nbsp;
              <a
                on:click|stopPropagation
                target="_blank"
                rel="noopener noreferrer"
                href={`${baseUrl}${video.permalink}#siteTable_t3_emy0l0`}>
                {video.ups}
              </a>
            </div>
          </div>

        </div>
      </li>
    {/each}
  </ul>

  {#if after}
    <div class="after">
      <button
        disabled={after === 'loading'}
        type="button"
        class="btn"
        on:click={() => loadMore(after)}>
        {after === 'loading' ? 'Loading...' : 'Load More'}
      </button>
    </div>
  {/if}
</div>
