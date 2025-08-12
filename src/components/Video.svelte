<script>
  export let video;
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|vi|e(?:mbed)?)\/|.*[?&]vi?=)|youtu\.be\/)([^"&?\/ ]{11})/;
  
  /**
   * @param {string} url
   * @param {RegExp} regex
   */
  const getQueryParam = (url, regex) =>
    regex.test(url) ? `&${url.match(regex)?.[0]}` : "";

  /**
   * @param {string} entites
   */
  const htmlDecode = entites => {
    const doc = new DOMParser().parseFromString(entites, "text/html");
    return doc.documentElement.textContent;
  };
</script>

<style>
  .video {
    grid-area: Video;
  }
  
  .youtube {
    padding-top: 56.25%;
    position: relative;
    max-height: 400px;
    min-height: 400px;
    max-height: 80%;
  }

  .vimeo {
    position: relative;
    max-width: 100%;
    min-height: 400px;
  }

  .image {
    object-fit: contain;
    width: 100%;
  }

  iframe {
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    border: 0;
    width: 100%;
    height: 100%;
    max-height: 100%;
  }

  .Twitter {
    display: flex;
    justify-content: center;
  }
</style>

<div class="video">
  {#if youtubeRegex.test(video.url)}
    <div class="youtube">
      <iframe
        title="youtube"
        width="100%"
        height="100%"
        allow="autoplay; encrypted-media"
        allowfullscreen
        src={`https://youtube.com/embed/${video.url.match(youtubeRegex)[1]}?autoplay=1&${getQueryParam(video.url, /start=(\d*)/)}${getQueryParam(video.url, /end=(\d*)/)}${getQueryParam(video.url, /[\&\?\;]t=(\d*)/)}`}>
      </iframe>
    </div>
  {:else if video.url.includes('vimeo.com')}
    <div class="vimeo">
      <iframe
        title="vimeo"
        width="100%"
        height="100%"
        frameborder="0"
        allowfullscreen
        src={`https://player.vimeo.com/video/${video.url.split('/').pop()}`}>
      </iframe>
    </div>
  {:else if video.url.includes('liveleak.com/')}
    <div class="vimeo">
      <iframe
        title="vimeo"
        width="100%"
        height="100%"
        frameborder="0"
        allowfullscreen
        allow="autoplay; encrypted-media"
        src={`https://www.liveleak.com/ll_embed?${video.url.split('view?')[1]}`} >
      </iframe>
    </div>
  {:else if video.url.includes('imgur.com')}
    {#if video.url.endsWith('.gifv')}
      <!-- svelte-ignore a11y_media_has_caption -->
      <video class="image" loop autoplay>
        <source type="video/mp4" src={video.url.replace('gifv', 'mp4')} />
      </video>
    {:else}
      <img
        class="image"
        src={`http://i.imgur.com/${video.url.split('/').pop()}.jpg`}
        alt={video.title} />
    {/if}
  {:else if /\.(jpg|png|gif|media1.giphy.com)/.test(video.url)}
    <img class="image" src={video.url} alt={video.url} />
  {:else if video.url.includes('gfycat.com/')}
    <div class="image">
      <!-- svelte-ignore a11y_media_has_caption -->
      <video
        poster={`https://thumbs.gfycat.com/${video.url
          .split('/')
          .pop()}-poster.jpg`}
        loop
        autoplay
        controls>
        <source
          id="webmSource"
          src={`https://giant.gfycat.com/${video.url.split('/').pop()}.webm`}
          type="video/webm" />
        <source
          id="mp4Source"
          src={`https://giant.gfycat.com/${video.url.split('/').pop()}.mp4`}
          type="video/mp4" />
      </video>
    </div>
  {:else if video.selftext_html}
    <div class="text">
      {@html new DOMParser().parseFromString(video.selftext_html, 'text/html').documentElement.textContent}
    </div>
  {:else if video.secure_media && video.secure_media.oembed && video.secure_media.oembed.html}
    <div class={video.secure_media.oembed.provider_name}>
      {#if video.secure_media.oembed.provider_name === 'Twitter'}
        <script src="https://platform.twitter.com/widgets.js" charset="utf-8">

        </script>
      {/if}
      {@html htmlDecode(video.secure_media.oembed.html)}
    </div>
  {:else}
    <div>
      This format is not supported, try the
      <a href={video.url} rel="noopener noreferrer" target="_blank">
        direct link
      </a>
      .
    </div>
  {/if}
</div>
