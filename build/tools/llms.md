# AI-Assisted Development

Source: https://docs.oasis.io/build/tools/llms

Oasis documentation is available in LLM-optimized formats so AI coding
assistants can reference accurate, up-to-date Oasis docs instead of relying on
training data. There are two approaches: feed raw `llms.txt` files directly, or
set up the [Context7] MCP server for persistent IDE integration.

## llms.txt

The [llms.txt] standard provides a structured, Markdown-based summary of the
entire Oasis documentation site optimized for LLM consumption.

Two files are available:

| File                                  | Description                                               |
| ------------------------------------- | --------------------------------------------------------- |
| [`llms.txt`][llms.txt-file]           | Curated index with page titles, descriptions, and URLs    |
| [`llms-full.txt`][llms-full.txt-file] | Complete documentation content inlined into a single file |

### Usage

Paste the URLs directly into any LLM chat or you can also add the URL as project
context in tools that support it (e.g. Cursor's `@docs` feature, or Claude/Codex
project knowledge, CLAUDE.md/AGENTS.md).

**Tip**:

Use `llms.txt` when you need a quick overview or are working within tight
context limits. Use `llms-full.txt` when you need the agent to have access to
the complete documentation.

## Context7 MCP

[Context7] is an MCP server that indexes documentation and serves it on demand
to AI coding assistants. It supports [40+ clients][all-clients] including Claude
Code, Cursor, VS Code, and JetBrains.

The Oasis documentation is indexed and available at:

```
Library ID: llmstxt/oasis_io_llms_txt
```

**Info**:

Use the library ID `llmstxt/oasis_io_llms_txt` in your prompts to ensure you
get the complete Oasis documentation. Other Oasis-related libraries on Context7
may be incomplete.

### Claude Code

Add the Context7 MCP server:

```shell
claude mcp add --transport http context7 https://mcp.context7.com/mcp
```

Verify the server is registered:

```shell
claude mcp list
```

### Cursor

Add the following to your `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp"
    }
  }
}
```

### Other Clients

Context7 supports 40+ clients including VS Code, JetBrains, Windsurf, Zed,
and more. See the [full client list][all-clients] for setup instructions
specific to your tool.

### Example Prompts

Once the MCP server is configured, use prompts like:

```
Use context7 MCP to fetch Oasis Sapphire quickstart docs.
Use library ID: llmstxt/oasis_io_llms_txt
```

```
Using context7, show me how to implement encrypted events on Sapphire.
Use library ID: llmstxt/oasis_io_llms_txt
```

### Auto-Invocation

To avoid specifying "use context7" in every prompt, add a rule to your agent's
configuration:

* **Claude Code:** Add to your project's `CLAUDE.md`:

  ```
  Always use Context7 MCP with library ID llmstxt/oasis_io_llms_txt when you
  need Oasis documentation.
  ```

* **Cursor:** Add to Settings → Rules for AI:

  ```
  Always use Context7 MCP with library ID llmstxt/oasis_io_llms_txt when you
  need Oasis documentation.
  ```

[Context7]: https://context7.com

[all-clients]: https://context7.com/docs/resources/all-clients

[llms.txt]: https://llmstxt.org

[llms.txt-file]: https://docs.oasis.io/llms.txt

[llms-full.txt-file]: https://docs.oasis.io/llms-full.txt

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
