"use client";
import { useEdges, useFields } from "@/store/useFormStore";
import { ReactFlow, Background, Controls, MarkerType } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export default function WorkflowPage() {
  const fields = useFields();
  const edges = useEdges();

  const nodes = fields.map((field, index) => ({
    id: field.id,
    position: { x: 0, y: index * 120 },
    data: { label: field.label },
  }));
  const rfEdges = edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.condition ? `${edge.condition.operator} ${edge.condition.value}` : undefined,
    markerEnd: { type: MarkerType.ArrowClosed },
  }));

  return (
    <div className="h-screen">
      <ReactFlow nodes={nodes} edges={rfEdges} colorMode="dark">
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
