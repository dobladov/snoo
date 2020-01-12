<script>
  export let comments;
  export let depth;
  export let baseUrl;
</script>

<style>
  ul {
    list-style-type: none;
    padding: 0;
    position: relative;
  }

  ul::before {
    background-color: #262c3c;
    position: absolute;
    content: "";
    width: 2px;
    height: 100%;
    top: 0;
    left: calc(-8px + calc(var(--depth) * -3px));
  }

  [data-depth="0"]::before {
    display: none;
  }

  li {
    margin-bottom: 20px;
  }

  .meta {
    color: grey;
    font-size: 0.9rem;
  }
</style>

<ul
  style={`margin-left: ${10 * depth}px; --depth: ${depth}`}
  data-depth={depth}>
  {#each comments as { data: comment } (comment.id)}
    {#if comment.body}
      <li>
        <div class="meta">
          <a target="_blank" href={`${baseUrl}/u/${comment.author}`}>
            {comment.author}
          </a>
          {comment.ups} {comment.ups === 1 ? 'point' : 'points'} &nbsp; - &nbsp;
          {new Date(comment.created).toDateString()}
        </div>
        {comment.body}
      </li>

      {#if comment.replies}
        <svelte:self
          {baseUrl}
          comments={comment.replies.data.children}
          depth={depth + 1} />
      {/if}
    {/if}
  {/each}
</ul>
