<script>
  import { DateTime } from "luxon";
  import {parse} from "marked";
  import micIcon from "bundle-text:feather-icons/dist/icons/mic.svg";

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
    position: absolute;
    content: "";
    width: 2px;
    height: 100%;
    top: 0;
    border-left: 1px dotted #262c3c;
    left: -20px;
  }

  ul:hover:before {
    border-left-style: solid;
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
    display: flex;
    align-items: center;
  }

  .meta span {
    margin-left: 10px;
  }
</style>

<ul style={`margin-left: ${20}px;`} data-depth={depth}>
  {#each comments as { data: comment } (comment.id)}
    {#if comment.body}
      <li>
        <div class="meta">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${baseUrl}/u/${comment.author}`}>
            {comment.author}
          </a>
          <span>
            {#if comment.is_submitter}
              {@html micIcon}
            {/if}
          </span>
          <span>
            {comment.ups} {comment.ups === 1 ? 'point' : 'points'} &nbsp; -
            &nbsp; {DateTime.fromSeconds(comment.created).toRelative()}
          </span>
        </div>
        {@html parse(comment.body)}
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
