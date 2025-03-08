import RPC from "discord-rpc";
const rpc = new RPC.Client({ transport: "ipc" });

export async function setActivity(State = "In Launcher") {
    if (!rpc) return;

    rpc.setActivity({
        details: State,
        state: "https://discord.gg/nkQHAjgmzv",
        startTimestamp: Date.now(),
        largeImageKey: "luna_new",
        largeImageText: "Luna",
        //smallImageKey: "luna_new",
        //smallImageText: "Luna",
        instance: false,
        buttons: [
            {
                label: "Join Discord",
                url: "https://discord.gg/nkQHAjgmzv",
            },
        ],
    });
}

export function StartRPC() {
    rpc.on("ready", () => {
        console.log("Discord RPC Connected!");
        //setActivity();
    });

    rpc.login(
        { 
            clientId: "1204822508373811282"
        }
    ).catch(console.error);

}