import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
    command: process.platform === 'win32' ? "hostinger-api-mcp.cmd" : "hostinger-api-mcp",
    args: [],
    env: {
        ...process.env,
        API_TOKEN: "UykLCBTSw6cVAPjJgaHCbAtPLUqGvhzXtqJXIJfB3a0ba601"
    }
});

const client = new Client({ name: "cli", version: "1.0.0" }, { capabilities: {} });

async function main() {
    await client.connect(transport);

    const addResult = await client.callTool({
        name: "DNS_updateDNSRecordsV1",
        arguments: {
            domain: "hicebot.live",
            overwrite: false,
            zone: [
                {
                    name: "tabtax",
                    type: "CNAME",
                    ttl: 300,
                    records: [{ content: "hice-bot.github.io" }]
                }
            ]
        }
    });

    console.log(JSON.stringify(addResult, null, 2));
    process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
