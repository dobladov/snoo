<script>
  export let video;
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|vi|e(?:mbed)?)\/|.*[?&]vi?=)|youtu\.be\/)([^"&?\/ ]{11})/;
</script>

<style>
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
</style>

<div>
  {#if youtubeRegex.test(video.url)}
    <div class="youtube">
      <iframe
        title="youtube"
        width="100%"
        height="100%"
        allow="autoplay; encrypted-media"
        allowfullscreen
        src={`https://youtube.com/embed/${video.url.match(youtubeRegex)[1]}?autoplay=1`} />
    </div>
  {:else if video.url.includes('vimeo.com')}
    <div class="vimeo">
      <iframe
        title="vimeo"
        width="100%"
        height="100%"
        frameborder="0"
        allowfullscreen
        autoplay
        src={`https://player.vimeo.com/video/${video.url.split('/').pop()}`} />
    </div>
  {:else if video.url.includes('imgur.com')}
    {#if video.url.endsWith('.gifv')}
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
  {/if}
</div>
