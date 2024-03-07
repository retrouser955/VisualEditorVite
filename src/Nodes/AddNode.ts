import { ClassicPreset } from "rete";
import { CodeGen } from "../types/CodeGenerationTypes";

export default class AddNode extends ClassicPreset.Node {
    constructor() {
        super("Add")

        const socket = new ClassicPreset.Socket("testsocket")

        this.addInput("num1", new ClassicPreset.Input(socket, "Number 1"))
        this.addInput("num2", new ClassicPreset.Input(socket, "Number 2"))

        this.addOutput("outnum", new ClassicPreset.Output(socket, "Result"))
    }

    code(node: CodeGen['node'], inputs: CodeGen['inputs'], add: CodeGen['add']) {
        console.log(node, inputs)

        add(`console.log(${node.data.num1} + ${node.data.num2})`)
    }
}