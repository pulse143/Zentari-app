import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  val: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
  value: number;
}

const data = {
  nodes: [
    { id: 'UNICEF_04', group: 1, val: 20 },
    { id: 'REFOREST_G', group: 2, val: 15 },
    { id: 'EDU_CHAIN', group: 3, val: 12 },
    { id: 'GRID_STAB', group: 1, val: 18 },
    { id: 'WORLD_BANK', group: 4, val: 25 },
    { id: 'GREEN_PEACE', group: 2, val: 14 },
    { id: 'OXFAM_NODE', group: 3, val: 16 },
  ],
  links: [
    { source: 'UNICEF_04', target: 'WORLD_BANK', value: 2 },
    { source: 'REFOREST_G', target: 'GREEN_PEACE', value: 3 },
    { source: 'EDU_CHAIN', target: 'OXFAM_NODE', value: 2 },
    { source: 'GRID_STAB', target: 'WORLD_BANK', value: 4 },
    { source: 'WORLD_BANK', target: 'UNICEF_04', value: 2 },
    { source: 'GREEN_PEACE', target: 'REFOREST_G', value: 3 },
    { source: 'OXFAM_NODE', target: 'EDU_CHAIN', value: 2 },
    { source: 'UNICEF_04', target: 'GRID_STAB', value: 1 },
  ]
};

export const TrustGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400;
    const height = 400;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', [0, 0, width, height]);

    svg.selectAll('*').remove();

    const simulation = d3.forceSimulation<Node>(data.nodes as Node[])
      .force('link', d3.forceLink<Node, Link>(data.links as Link[]).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .attr('stroke', '#262626')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke-width', d => Math.sqrt(d.value));

    const node = svg.append('g')
      .attr('stroke', '#0A0A0A')
      .attr('stroke-width', 1.5)
      .selectAll('g')
      .data(data.nodes)
      .join('g');

    node.append('circle')
      .attr('r', d => d.val / 2)
      .attr('fill', d => d.group === 1 ? '#00FF41' : '#737373');

    node.append('text')
      .text(d => d.id)
      .attr('x', 12)
      .attr('y', 4)
      .attr('fill', '#737373')
      .attr('font-size', '8px')
      .attr('font-family', 'JetBrains Mono');

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, []);

  return (
    <div className="w-full h-[400px] bg-white/[0.01] border border-brand-border rounded-2xl overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10">
        <span className="mono-label">Trust Propagation Network</span>
      </div>
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};
