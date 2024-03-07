import { ClassicPreset } from "rete";
import { CodeGen } from "../types/CodeGenerationTypes";

export default class NumberNode extends ClassicPreset.Node {
    constructor() {
        super("Number")

        const socket = new ClassicPreset.Socket("number")

        this.addControl("num", new ClassicPreset.InputControl("number"))
        this.addOutput("Number", new ClassicPreset.Output(socket))
    }

    code(node: CodeGen['node'], inputs: CodeGen['inputs'], add: CodeGen['add']) {
        console.log(node, inputs)

        add("num", node.data.num)
    }
}