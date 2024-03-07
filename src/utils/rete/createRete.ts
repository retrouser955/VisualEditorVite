import { GetSchemes, ClassicPreset, NodeEditor } from "rete";
import { createRoot } from "react-dom/client";
import { Presets, ReactArea2D, ReactPlugin } from "rete-react-plugin";
import { AreaExtensions, AreaPlugin } from "rete-area-plugin";
import { ConnectionPlugin, Presets as ConnectionPresets } from "rete-connection-plugin";
import { ContextMenuExtra, ContextMenuPlugin, Presets as ContextMenuPresents } from "rete-context-menu-plugin";
import AddNode from "../../Nodes/AddNode";
import NumberNode from "../../Nodes/NumberNode";
import { ControlFlowEngine } from "rete-engine";

export type Schemes = GetSchemes<
    ClassicPreset.Node,
    ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;

// TODO: IMPLEMENT CODE GENERATION
export const reteEngine = new ControlFlowEngine()

export type ReactArea = ReactArea2D<Schemes> | ContextMenuExtra;

export async function createReteEditor(container: HTMLElement) {
    const render = new ReactPlugin<Schemes, ReactArea>({
        createRoot
    });
    const area = new AreaPlugin<Schemes, ReactArea>(container);
    const connection = new ConnectionPlugin<Schemes>()
    const editor = new NodeEditor<Schemes>()

    const menuPlugin = new ContextMenuPlugin<Schemes>({
        items: ContextMenuPresents.classic.setup([
            ["Add", () => new AddNode()],
            ["Number", () => new NumberNode()]
        ])
    })
    editor.use(area);

    area.use(menuPlugin);
    area.use(render);
    area.use(connection);

    render.addPreset(Presets.classic.setup())
    render.addPreset(Presets.contextMenu.setup())

    connection.addPreset(ConnectionPresets.classic.setup())

    AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
        accumulating: AreaExtensions.accumulateOnCtrl()
    })

    return {
        destroy: () => { area.destroy() },
        generateCode: async () => {
            // @ts-ignore
            const code = await CodePlugin.generate(reteEngine, editor.toJSON())

            return code as string
        },
        test: () => {
            return [
                editor.getConnections(),
                editor.getNodes()
            ]
        }
    }
}